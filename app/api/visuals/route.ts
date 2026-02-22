import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const VISUALS_FILE = path.join(process.cwd(), 'data', 'visual_settings.json');

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        if (!fs.existsSync(VISUALS_FILE)) {
            console.log("Visuals file not found, returning defaults");
            // Default settings if file doesn't exist
            return NextResponse.json({ theme: 'dark', layout: 'grid', accentColor: 'amber' });
        }
        const data = fs.readFileSync(VISUALS_FILE, 'utf-8');
        console.log("Reading visuals settings:", data);
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load settings' }, { status: 500 });
    }
}
