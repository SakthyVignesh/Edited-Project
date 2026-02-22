import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const execPromise = promisify(exec);

export async function POST(request: Request) {
    try {
        const { topics } = await request.json();

        // 1. Save preferences
        const prefsPath = path.join(process.cwd(), 'data', 'user_preferences.json');
        const prefsDir = path.dirname(prefsPath);
        if (!fs.existsSync(prefsDir)) {
            fs.mkdirSync(prefsDir, { recursive: true });
        }
        fs.writeFileSync(prefsPath, JSON.stringify({ topics }, null, 4));

        // 2. Run Crawler
        const crawlerPath = path.join(process.cwd(), 'crawler', 'personalized_crawler.py');
        const crawlerCmd = `python "${crawlerPath}"`;

        console.log(`Running crawler: ${crawlerCmd}`);
        const { stdout: crawlerOut, stderr: crawlerErr } = await execPromise(crawlerCmd, {
            cwd: process.cwd()
        });

        if (crawlerErr && !crawlerErr.includes('notice')) {
            console.warn('Crawler warning/error:', crawlerErr);
        }

        // 3. Run Sync Script
        const syncPath = path.join(process.cwd(), 'scripts', 'syncNews.js');
        const syncCmd = `node "${syncPath}"`;

        console.log(`Running sync: ${syncCmd}`);
        const { stdout: syncOut, stderr: syncErr } = await execPromise(syncCmd, {
            cwd: process.cwd()
        });

        return NextResponse.json({
            success: true,
            message: 'Preferences updated and news synced.',
            crawlerOutput: crawlerOut,
            syncOutput: syncOut
        });

    } catch (error: any) {
        console.error('Sync error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
