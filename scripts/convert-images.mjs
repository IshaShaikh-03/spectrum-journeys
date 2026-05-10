import sharp from 'sharp';
import { readdir, copyFile } from 'fs/promises';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __dir = fileURLToPath(new URL('..', import.meta.url));
const SRC  = join(__dir, 'assets', 'img', 'new-images');
const DEST = join(__dir, 'assets', 'img');

// Images that need multi-size WebP variants (srcset)
const MULTI = ['landing-page', 'luxury-mini-bus', 'innova-crysta', 'tempo-traveller'];
const SIZES = [400, 800, 1200];

// Images that are single-use (copy + one WebP)
const SINGLE = ['about-india-map', 'corporate-bg', 'leisure-bg'];

// social-preview: copy as jpg (rename .png → .jpg)
const SOCIAL = 'social-preview';

const files = await readdir(SRC);

for (const file of files) {
  const ext  = extname(file).toLowerCase();
  const name = basename(file, ext);
  const src  = join(SRC, file);

  if (!ext.match(/\.(png|jpg|jpeg|webp)$/i)) continue;

  if (name === SOCIAL) {
    // Copy as .jpg regardless of original extension
    const destJpg = join(DEST, 'social-preview.jpg');
    await sharp(src).jpeg({ quality: 90 }).toFile(destJpg);
    console.log(`social-preview.jpg ✓`);
    continue;
  }

  if (MULTI.includes(name)) {
    for (const w of SIZES) {
      const destFile = join(DEST, `${name}-${w}.webp`);
      await sharp(src)
        .resize(w, null, { withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(destFile);
      console.log(`${name}-${w}.webp ✓`);
    }
    // Also keep the PNG for reference (copy to dest)
    await copyFile(src, join(DEST, `${name}.png`));
    console.log(`${name}.png (source copy) ✓`);
    continue;
  }

  if (SINGLE.includes(name)) {
    // Single WebP at 1200 wide max, plus source copy
    await sharp(src)
      .resize(1200, null, { withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(join(DEST, `${name}-1200.webp`));
    await sharp(src)
      .resize(800, null, { withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(join(DEST, `${name}-800.webp`));
    await copyFile(src, join(DEST, `${name}.png`));
    console.log(`${name} WebP variants ✓`);
    continue;
  }

  console.log(`SKIPPED: ${file} (not in manifest)`);
}

console.log('\nAll done.');
