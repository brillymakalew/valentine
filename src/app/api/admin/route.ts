import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'config.json');

export async function GET() {
    try {
        const fileContent = await fs.readFile(dataFilePath, 'utf-8');
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error reading config:", error);
        // Return default if file missing
        return NextResponse.json({
            name: "Dian Firstiana",
            partnerName: "Brilly",
            hints: ["Hint 1", "Hint 2"],
            correctCode: "1234",
            photoUrl: ""
        });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        await fs.writeFile(dataFilePath, JSON.stringify(body, null, 2), 'utf-8');
        return NextResponse.json({ success: true, message: "Config saved successfully" });
    } catch (error) {
        console.error("Error saving config:", error);
        return NextResponse.json({ success: false, message: "Failed to save config" }, { status: 500 });
    }
}
