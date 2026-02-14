import json
import os
import feedparser
from datetime import datetime, timedelta
from time import mktime

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
SOURCES_FILE = os.path.join(DATA_DIR, "sources.json")
OUTPUT_FILE = os.path.join(DATA_DIR, "admin_crawl_data.json")

def load_sources():
    if not os.path.exists(SOURCES_FILE):
        return {}
    with open(SOURCES_FILE, "r") as f:
        return json.load(f)

def format_date(date_str):
    try:
        dt = datetime.strptime(date_str, "%a, %d %b %Y %H:%M:%S %Z")
        return dt.strftime("%Y-%m-%d %H:%M:%S")
    except:
        return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def extract_image(entry):
    if "media_content" in entry:
        return entry.media_content[0]["url"]
    if "links" in entry:
        for link in entry.links:
            if "image" in link.get("type", ""):
                return link.href
    return "https://via.placeholder.com/800x400?text=News"

def crawl_news():
    sources = load_sources()
    print(f"Admin Crawler started. Found {len(sources)} sources.")
    
    news_items = []
    threshold_time = datetime.now() - timedelta(hours=24)
    
    for source_name, url in sources.items():
        print(f"Checking {source_name}...")
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries[:5]:
                # Date Check
                is_recent = False
                if hasattr(entry, 'published_parsed') and entry.published_parsed:
                    try:
                        published_dt = datetime.fromtimestamp(mktime(entry.published_parsed))
                        if published_dt >= threshold_time:
                            is_recent = True
                    except:
                        pass
                
                if is_recent:
                    news_items.append({
                        "title": entry.get("title", ""),
                        "link": entry.get("link", ""),
                        "source": source_name,
                        "publishedAt": format_date(entry.get("published", "")),
                        "imageUrl": extract_image(entry)
                    })
        except Exception as e:
            print(f"Failed to crawl {source_name}: {e}")

    # Save Results
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(news_items, f, indent=4)
    
    print(f"Crawl complete. Saved {len(news_items)} items to {OUTPUT_FILE}")

if __name__ == "__main__":
    crawl_news()
