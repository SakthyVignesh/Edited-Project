import feedparser
import json
import os
from datetime import datetime, timedelta
from time import mktime

# RSS Feeds to crawl
# RSS Feeds to crawl
# Load from JSON configuration managed by Admin Module
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCES_FILE = os.path.join(BASE_DIR, "data", "sources.json")

def load_feeds():
    if os.path.exists(SOURCES_FILE):
        try:
            with open(SOURCES_FILE, "r") as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading sources: {e}")
            return {}
    return {}

FEEDS = load_feeds()

def fetch_news():
    news_items = []
    
    # Time threshold: 24 hours ago
    threshold_time = datetime.now() - timedelta(hours=24)
    print(f"Filtering news older than: {threshold_time}")

    for source_name, url in FEEDS.items():
        print(f"Fetching from {source_name}...")
        try:
            feed = feedparser.parse(url)
            
            # Using list to collect valid items, checking up to 10 items to find 5 valid ones if needed
            count = 0
            for entry in feed.entries:
                if count >= 5: # Limit to 5 valid items per source
                    break
                
                # Check date
                is_recent = False
                if hasattr(entry, 'published_parsed') and entry.published_parsed:
                    try:
                        # entry.published_parsed is a time.struct_time
                        published_dt = datetime.fromtimestamp(mktime(entry.published_parsed))
                        if published_dt >= threshold_time:
                            is_recent = True
                    except Exception as e:
                        # Fallback if conversion fails, assume it might be recent or skip?
                        # Let's be strict: if we can't parse, we rely on text matching or just keep it?
                        # User was complaining about old news, so probably safer to skip if unsure, or log.
                        # For now, if we can't parse date strictly, we might verify string.
                        # But feedparser usually works.
                        pass
                else:
                    # If no date provided at all, maybe keep it? Or skip?
                    # Most credible feeds allow date.
                    # Let's keep it but mark it.
                    # Actually, better to check if it has NO date, it might be ad or old.
                    pass

                if is_recent:
                    item = {
                        "id": entry.get("id", entry.get("link")),
                        "title": entry.get("title", ""),
                        "description": entry.get("summary", "")[:200] + "...",
                        "imageUrl": extract_image(entry),
                        "source": source_name,
                        "url": entry.get("link", ""),
                        "publishedAt": format_date(entry.get("published", ""))
                    }
                    news_items.append(item)
                    count += 1
        except Exception as e:
            print(f"Error fetching from {source_name}: {e}")
            
    return news_items

def extract_image(entry):
    # Try to find an image in the entry media content or links
    if "media_content" in entry:
        return entry.media_content[0]["url"]
    if "links" in entry:
        for link in entry.links:
            if "image" in link.get("type", ""):
                return link.href
    # Fallback image
    return "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000"

def format_date(date_str):
    try:
        dt = datetime.strptime(date_str, "%a, %d %b %Y %H:%M:%S %Z")
        return dt.strftime("%Y-%m-%d %H:%M:%S")
    except:
        return "Just now"

def save_news(items):
    output_dir = os.path.join(os.getcwd(), "data")
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    output_path = os.path.join(output_dir, "news_data.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(items, f, indent=4)
    print(f"Saved {len(items)} news items to {output_path}")

if __name__ == "__main__":
    items = fetch_news()
    save_news(items)
