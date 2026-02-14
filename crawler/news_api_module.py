import requests
import json
import os
from datetime import datetime

# --- CONFIGURATION ---
# You can get clinical/free API key from https://newsapi.org/
API_KEY = os.getenv("ap key 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", "deepseek/deepseek-r1-0528:free")
BASE_URL = "https://newsapi.org/v2/everything"

def fetch_news_by_preferences(interests):
    """
    Fetches news articles from NewsAPI based on a list of user interests/topics.
    """
    if not interests:
        print("No interests provided. Fetching general top headlines...")
        interests = ["general"]

    # Combine interests into a query string for the API
    query = " OR ".join(interests)
    
    params = {
        "q": query,
        "sortBy": "publishedAt",
        "pageSize": 20,
        "apiKey": API_KEY,
        "language": "en"
    }

    try:
        print(f"Fetching personalized news for topics: {', '.join(interests)}...")
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()
        data = response.json()
        
        articles = data.get("articles", [])
        formatted_news = []
        
        for art in articles:
            # Map NewsAPI format to our app format
            item = {
                "id": art.get("url"),
                "title": art.get("title"),
                "description": art.get("description", "No description available."),
                "imageUrl": art.get("urlToImage") or "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000",
                "source": art.get("source", {}).get("name", "Unknown Source"),
                "url": art.get("url"),
                "publishedAt": art.get("publishedAt", "Just now")
            }
            formatted_news.append(item)
            
        return formatted_news

    except requests.exceptions.RequestException as e:
        print(f"Error fetching news: {e}")
        return []

def save_to_json(news_items, filename="news_data_api.json"):
    """
    Saves the fetched news items to a JSON file.
    """
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(news_items, f, indent=4)
    print(f"Successfully saved {len(news_items)} items to {filename}")

if __name__ == "__main__":
    # Example usage:
    my_interests = ["Technology", "Space", "AI"]
    
    if API_KEY == "YOUR_API_KEY_HERE":
        print("WARNING: Please set your NEWS_API_KEY in environment variables or editing the script.")
    
    news = fetch_news_by_preferences(my_interests)
    if news:
        save_to_json(news)
