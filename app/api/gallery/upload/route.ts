import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const GALLERY_DIR = path.join(process.cwd(), 'public', 'images', 'gallery');
const CONFIG_PATH = path.join(GALLERY_DIR, 'config.json');

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const slotId = formData.get('slotId') as string;
    const file = formData.get('file') as File;

    if (!slotId || !file) {
      return NextResponse.json(
        { error: 'slotId and file are required' },
        { status: 400 }
      );
    }

    const id = parseInt(slotId, 10);
    if (isNaN(id) || id < 1 || id > 25) {
      return NextResponse.json(
        { error: 'slotId must be between 1 and 25' },
        { status: 400 }
      );
    }

    // Get file extension from uploaded file
    const originalName = file.name;
    const ext = path.extname(originalName).toLowerCase() || '.jpg';
    const allowedExts = ['.jpg', '.jpeg', '.png', '.webp', '.avif', '.tiff', '.bmp'];

    if (!allowedExts.includes(ext)) {
      return NextResponse.json(
        { error: `Unsupported file type: ${ext}. Allowed: ${allowedExts.join(', ')}` },
        { status: 400 }
      );
    }

    // Remove old file(s) for this slot (any extension)
    const existingFiles = fs.readdirSync(GALLERY_DIR);
    for (const f of existingFiles) {
      const nameWithoutExt = path.parse(f).name;
      if (nameWithoutExt === String(id)) {
        fs.unlinkSync(path.join(GALLERY_DIR, f));
      }
    }

    // Write uploaded file
    const fileName = `${id}${ext}`;
    const filePath = path.join(GALLERY_DIR, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Update config.json with new image path
    const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
    const config = JSON.parse(raw);
    const slot = config.slots.find((s: { id: number }) => s.id === id);
    if (slot) {
      slot.image = `/images/gallery/${fileName}`;
    }
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));

    return NextResponse.json({
      success: true,
      slot: id,
      image: `/images/gallery/${fileName}`,
      size: buffer.length,
    });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}

// App Router segment config for large DSLR uploads
export const maxDuration = 60; // seconds
export const dynamic = 'force-dynamic';
