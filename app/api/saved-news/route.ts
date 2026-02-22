import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'saved_news.json');

// Ensure data directory exists
if (!fs.existsSync(path.dirname(DB_PATH))) {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
}

// Ensure DB file exists
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

export async function GET(request: Request) {
    try {
        const fileData = fs.readFileSync(DB_PATH, 'utf-8');
        const savedNews = JSON.parse(fileData);
        return NextResponse.json(savedNews);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch saved news' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const newsItem = await request.json();
        const fileData = fs.readFileSync(DB_PATH, 'utf-8');
        const savedNews = JSON.parse(fileData);

        // Check if already saved
        const exists = savedNews.some((item: any) => item.id === newsItem.id);
        if (exists) {
            return NextResponse.json({ message: 'Already saved' }, { status: 200 });
        }

        savedNews.push({ ...newsItem, savedAt: new Date().toISOString() });
        fs.writeFileSync(DB_PATH, JSON.stringify(savedNews, null, 2));

        return NextResponse.json({ message: 'News saved successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save news' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        const fileData = fs.readFileSync(DB_PATH, 'utf-8');
        let savedNews = JSON.parse(fileData);

        savedNews = savedNews.filter((item: any) => item.id !== id);
        fs.writeFileSync(DB_PATH, JSON.stringify(savedNews, null, 2));

        return NextResponse.json({ message: 'News removed successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to remove news' }, { status: 500 });
    }
}
