import feedparser
import time
from datetime import datetime
from time import mktime

url = "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en"
print(f"Testing URL: {url}")
feed = feedparser.parse(url)

print(f"Status: {feed.get('status')}")
if not feed.entries:
    print("No entries found")
else:
    print(f"Found {len(feed.entries)} entries")
    entry = feed.entries[0]
    print(f"Title: {entry.get('title')}")
    print(f"Published: {entry.get('published')}")
    print(f"Published parsed: {entry.get('published_parsed')}")
    
    if hasattr(entry, 'published_parsed') and entry.published_parsed:
        dt = datetime.fromtimestamp(mktime(entry.published_parsed))
        print(f"Datetime: {dt}")
    
    # Image check
    print("Media content:", entry.get('media_content'))
    print("Links:", entry.get('links'))
