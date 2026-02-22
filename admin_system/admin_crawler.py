import json
import os
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
from email.utils import parsedate_to_datetime
from concurrent.futures import ThreadPoolExecutor, as_completed
import socket
import ssl

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
SOURCES_FILE = os.path.join(DATA_DIR, "sources.json")
OUTPUT_FILE = os.path.join(DATA_DIR, "admin_crawl_data.json")

# Timeout for requests
TIMEOUT = 10

def load_sources():
    if not os.path.exists(SOURCES_FILE):
        return {}
    with open(SOURCES_FILE, "r") as f:
        return json.load(f)

def parse_date(date_str):
    if not date_str or not isinstance(date_str, str):
        return None
    try:
        # RFC 822 (RSS)
        dt = parsedate_to_datetime(date_str)
        if dt:
             # Convert to naive datetime for comparison
             return dt.replace(tzinfo=None)
    except Exception:
        pass
    
    try:
        # ISO 8601 (Atom) - simple fallback
        # Remove Z and handle potential offsets roughly if needed, 
        # but fromisoformat requires Python 3.7+
        if isinstance(date_str, str):
            clean_date = date_str.replace("Z", "+00:00")
            dt = datetime.fromisoformat(clean_date)
            return dt.replace(tzinfo=None)
    except Exception:
        pass
        
    return None

def extract_image(item_element):
    # Try different locations for image
    # 1. <media:content> or <media:group>
    # 2. <enclosure>
    # 3. Simple heuristic matching
    
    # Iterate over all children to find image-like elements
    for child in item_element:
        tag = child.tag.lower()
        attrib = child.attrib
        
        # Check media:content or similar
        if 'content' in tag and 'media' in tag:
            if 'url' in attrib:
                return attrib['url']
        
        # Check enclosure
        if 'enclosure' in tag:
            if 'url' in attrib:
                # Check type if available
                mime = attrib.get('type', '')
                if 'image' in mime or attrib['url'].endswith(('.jpg', '.png', '.jpeg', '.gif')):
                    return attrib['url']
                    
    # Fallback placeholder
    return "https://via.placeholder.com/800x400?text=News"

def fetch_feed(source_name, url):
    # print(f"Checking {source_name}...")
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    news_items = []
    
    try:
        # Create unverified context to avoid SSL errors
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=TIMEOUT, context=ctx) as response:
            xml_data = response.read()
            
        try:
            root = ET.fromstring(xml_data)
        except ET.ParseError:
            print(f"Failed to parse XML for {source_name}")
            return []

        # Find items (RSS) or entries (Atom)
        items = root.findall('.//item')
        if not items:
            # Try Atom with namespace
            items = root.findall('.//{http://www.w3.org/2005/Atom}entry')
        if not items:
            # Try Atom without namespace wildcard
            items = root.findall('.//entry')
            
        threshold_time = datetime.now() - timedelta(hours=24)
        
        count = 0
        for item in items:
            if count >= 5: break # Limit to 5 per source
            
            title = "No Title"
            link = ""
            pub_date_str = ""
            
            # Extract basic fields
            for child in item:
                tag = child.tag.lower()
                # Remove namespace for easier matching
                clean_tag = tag.split('}')[-1] if '}' in tag else tag
                
                if clean_tag == 'title':
                    title = child.text
                elif clean_tag == 'link':
                    if child.text and isinstance(child.text, str) and child.text.strip():  # type: ignore
                        link = child.text
                    elif 'href' in child.attrib:
                        link = child.attrib['href']
                elif clean_tag in ('pubdate', 'published', 'updated'):
                    pub_date_str = child.text
            
            # Date filtering
            is_recent = False
            published_at_formatted = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            
            if pub_date_str:
                dt = parse_date(pub_date_str)
                if dt:
                    if dt >= threshold_time:
                        is_recent = True
                    published_at_formatted = dt.strftime("%Y-%m-%d %H:%M:%S")
                else:
                    # If we can't parse date, we can't verify it's recent. 
                    # Assuming mostly strictly recent news needed.
                    pass
            else:
                # If no date, maybe it's breaking news? 
                # Let's skip to be safe/clean.
                pass
            
            if is_recent:
                image_url = extract_image(item)
                
                news_items.append({
                    "title": title if title else "No Title",
                    "link": link if link else "",
                    "source": source_name,
                    "publishedAt": published_at_formatted,
                    "imageUrl": image_url
                })
                count += 1  # type: ignore
                
    except Exception as e:
        print(f"Failed to fetch/process {source_name}: {e}")
        
    return news_items

def crawl_news():
    sources = load_sources()
    print(f"Admin Crawler started. Found {len(sources)} sources.")
    
    all_news = []
    
    # Use ThreadPoolExecutor for parallel processing
    # This significantly speeds up crawling multiple sources
    with ThreadPoolExecutor(max_workers=10) as executor:
        future_to_source = {executor.submit(fetch_feed, name, url): name for name, url in sources.items()}  # type: ignore
        
        for future in as_completed(future_to_source):
            try:
                items = future.result()
                if items:
                    all_news.extend(items)
            except Exception as e:
                print(f"Thread error: {e}")

    # Save Results
    try:
        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            json.dump(all_news, f, indent=4)
        print(f"Crawl complete. Saved {len(all_news)} items to {OUTPUT_FILE}")
    except Exception as e:
        print(f"Error saving file: {e}")

if __name__ == "__main__":
    crawl_news()
