import requests
import json
import os
import feedparser
from datetime import datetime
from bs4 import BeautifulSoup
import re
from concurrent.futures import ThreadPoolExecutor
import time

# --- CONFIGURATION ---
OPENROUTER_API_KEY = "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"
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PREFERENCES_PATH = os.path.join(BASE_DIR, "data", "user_preferences.json")
OUTPUT_PATH = os.path.join(BASE_DIR, "data", "news_data.json")

def clean_html(html_text):
    if not html_text:
        return ""
    try:
        soup = BeautifulSoup(html_text, "html.parser")
        return soup.get_text()
    except:
        return html_text

def get_ai_summary(title, context):
    """
    Uses OpenRouter (DeepSeek) to generate 3 engaging bullet points for the news.
    """
    try:
        prompt = f"""
        Article Title: {title}
        Raw Summary: {context}

        Task: Write a highly engaging, professional news paragraph for this story.
        Requirements:
        1. The content must be a single cohesive paragraph.
        2. It should take about 45-60 seconds to read thoughtfully.
        3. Start with a strong hook and cover the 3 most important aspects of the story.
        4. Maintain a premium, executive summary tone.
        5. Do NOT include any intro, outro text, or bullet points. Just the single paragraph text.
        """

        headers = {
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        }
        
        data = {
            "model": "deepseek/deepseek-r1:free", # Using DeepSeek R1 for high-quality engaging summaries
            "messages": [
                {"role": "system", "content": "You are a world-class news editor who writes engaging 60-second news digests."},
                {"role": "user", "content": prompt}
            ]
        }
        
        response = requests.post(OPENROUTER_URL, headers=headers, json=data, timeout=15)
        if response.status_code == 200:
            content = response.json()['choices'][0]['message']['content'].strip()
            # Basic cleanup of any thinking tags or extra whitespace
            content = re.sub(r'<thought>.*?</thought>', '', content, flags=re.DOTALL)
            return content
            
    except Exception as e:
        print(f"AI Summary failed: {e}")
        
    return f"• {title}\n• {context[:150]}...\n• Read more in the full article below."

def get_image_from_url(url, topic="News", title=""):
    """
    Attempts to fetch the actual news article and extract the Open Graph image.
    If fails, returns a topic-based Unsplash image.
    """
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    
    try:
        response = requests.get(url, headers=headers, timeout=8, allow_redirects=True)
        final_url = response.url
        
        if "google.com" in final_url and "rss/articles" in final_url:
             if 'url=' in response.text:
                 match = re.search(r'url="(.*?)"', response.text)
                 if match:
                     final_url = match.group(1)
                     response = requests.get(final_url, headers=headers, timeout=8)

        soup = BeautifulSoup(response.text, 'html.parser')
        
        selectors = [
            {"property": "og:image"},
            {"name": "twitter:image"},
            {"property": "twitter:image"},
            {"name": "og:image"},
            {"itemprop": "image"}
        ]
        
        for sel in selectors:
            tag = soup.find("meta", attrs=sel)
            if tag and tag.get("content"):
                img_url = tag["content"]
                if img_url.startswith("//"):
                    img_url = "https:" + img_url
                if not any(x in img_url.lower() for x in ["logo", "icon", "google", "default", "fallback", "avatar", "profile"]):
                    return img_url
        
    except Exception as e:
        print(f"Image scrape failure for {url}: {e}")
        
    # Unique high-quality fallback per title
    seed = abs(hash(title)) % 1000
    keyword = topic.replace(" ", "-").lower()
    return f"https://source.unsplash.com/featured/1200x800?{keyword}&sig={seed}"

def get_user_topics():
    try:
        if not os.path.exists(PREFERENCES_PATH):
            return ["World"]
        with open(PREFERENCES_PATH, "r") as f:
            data = json.load(f)
            return data.get("topics", ["World"])
    except Exception as e:
        print(f"Error reading preferences: {e}")
        return ["World"]

def fetch_rss_news(topic):
    print(f"Fetching unique news for: {topic}...")
    rss_url = f"https://news.google.com/rss/search?q={topic}&hl=en-US&gl=US&ceid=US:en"
    feed = feedparser.parse(rss_url)
    
    raw_items = []
    seen_ids = set()
    
    for entry in feed.entries:
        if len(raw_items) >= 10: # Reduced from 100 for significantly faster performance
            break
        if entry.id in seen_ids:
            continue
        raw_items.append(entry)
        seen_ids.add(entry.id)
        
    def process_entry(entry):
        clean_desc = clean_html(entry.summary)
        
        # Parallel: Image and AI Summary
        img_url = get_image_from_url(entry.link, topic=topic, title=entry.title)
        engaging_summary = get_ai_summary(entry.title, clean_desc)
        
        return {
            "id": entry.id,
            "title": entry.title,
            "description": engaging_summary,
            "imageUrl": img_url,
            "source": entry.source.get("title", "Google News") if hasattr(entry, "source") else "Google News",
            "url": entry.link,
            "publishedAt": entry.published
        }

    with ThreadPoolExecutor(max_workers=5) as executor:
        news_items = list(executor.map(process_entry, raw_items))
        
    return news_items

def main():
    topics = get_user_topics()
    all_news = []
    global_seen_ids = set()
    
    for topic in topics:
        topic_news = fetch_rss_news(topic)
        for item in topic_news:
            if item["id"] not in global_seen_ids:
                all_news.append(item)
                global_seen_ids.add(item["id"])
            
    if not all_news:
        print("No news found.")
        return

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(all_news, f, indent=4)
        
    print(f"Successfully saved {len(all_news)} unique items with AI summaries.")

if __name__ == "__main__":
    main()
