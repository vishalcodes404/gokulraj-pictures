import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONFIG_PATH = path.join(process.cwd(), 'public', 'images', 'gallery', 'config.json');

// GET — return gallery config
export async function GET() {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
    const config = JSON.parse(raw);
    return NextResponse.json(config);
  } catch {
    return NextResponse.json({ error: 'Config not found' }, { status: 404 });
  }
}

// PUT — update a slot's title/category
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, category } = body;

    if (!id) {
      return NextResponse.json({ error: 'Slot id is required' }, { status: 400 });
    }

    const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
    const config = JSON.parse(raw);

    const slot = config.slots.find((s: { id: number }) => s.id === id);
    if (!slot) {
      return NextResponse.json({ error: 'Slot not found' }, { status: 404 });
    }

    if (title !== undefined) slot.title = title;
    if (category !== undefined) slot.category = category;

    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));

    return NextResponse.json({ success: true, slot });
  } catch {
    return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
  }
}
