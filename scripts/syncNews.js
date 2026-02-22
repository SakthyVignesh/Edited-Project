const fs = require('fs');
const path = require('path');

const JSON_PATH = path.join(__dirname, '../data/news_data.json');
const TS_PATH = path.join(__dirname, '../lib/mockNews.ts');

function updateNews() {
    if (!fs.existsSync(JSON_PATH)) {
        console.error('Crawler data not found. Please run the crawler first.');
        return;
    }

    const newsData = JSON.parse(fs.readFileSync(JSON_PATH, 'utf-8'));

    const tsContent = `export interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  source: string;
  url: string;
  publishedAt: string;
}

export const mockNews: NewsItem[] = ${JSON.stringify(newsData, null, 2)};
`;

    fs.writeFileSync(TS_PATH, tsContent);
    console.log(`Successfully updated ${TS_PATH} with ${newsData.length} items.`);
}

updateNews();
