import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const NOTES_FILE_PATH = path.join(process.cwd(), 'data', 'user_notes.json');

// Ensure data directory exists
if (!fs.existsSync(path.dirname(NOTES_FILE_PATH))) {
    fs.mkdirSync(path.dirname(NOTES_FILE_PATH), { recursive: true });
}

// Helper to read notes
function getNotes() {
    if (!fs.existsSync(NOTES_FILE_PATH)) {
        return {};
    }
    const data = fs.readFileSync(NOTES_FILE_PATH, 'utf-8');
    try {
        return JSON.parse(data);
    } catch {
        return {};
    }
}

// Helper to save notes
function saveNotes(notes: any) {
    fs.writeFileSync(NOTES_FILE_PATH, JSON.stringify(notes, null, 4));
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const newsId = searchParams.get('id');

    if (!newsId) {
        return NextResponse.json({ error: 'News ID is required' }, { status: 400 });
    }

    const notes = getNotes();
    const note = notes[newsId] || '';

    return NextResponse.json({ note });
}

export async function POST(request: Request) {
    try {
        const { newsId, note } = await request.json();

        if (!newsId) {
            return NextResponse.json({ error: 'News ID is required' }, { status: 400 });
        }

        const notes = getNotes();
        notes[newsId] = note;
        saveNotes(notes);

        return NextResponse.json({ success: true, message: 'Note saved' });
    } catch (error) {
        console.error('Error saving note:', error);
        return NextResponse.json({ error: 'Failed to save note' }, { status: 500 });
    }
}
