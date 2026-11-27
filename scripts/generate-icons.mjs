// Generates the raster favicons from the approved brand icon.
//
//   npm run icons
//
// Source: src/assets/brand/comitas-icon-square-dark.svg (used as is).
// Output (public/):
//   favicon.ico           16, 32 and 48px (PNG-compressed ICO)
//   apple-touch-icon.png  180px, corners filled with the icon background,
//                         because iOS applies its own mask and renders
//                         transparent pixels as black
//   icon-192.png          192px, for the web app manifest
//   icon-512.png          512px, for the web app manifest
//
// public/favicon.svg is a plain copy of the same source file.
import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const root = new URL("../", import.meta.url);
const source = new URL("src/assets/brand/comitas-icon-square-dark.svg", root);
const out = (name) => new URL(`public/${name}`, root);

const ICON_BACKGROUND = "#101010"; // fill of the square in the source SVG
const SOURCE_SIZE = 256; // viewBox of the source SVG

const svg = await readFile(source);

/** Rasterizes the SVG at `size` px, rendering above the target and downsampling. */
async function png(size, { flatten = false } = {}) {
  const density = Math.ceil((72 * size * 4) / SOURCE_SIZE);
  let image = sharp(svg, { density }).resize(size, size, {
    kernel: "lanczos3",
  });
  if (flatten) image = image.flatten({ background: ICON_BACKGROUND });
  return image.png({ compressionLevel: 9 }).toBuffer();
}

/** Packs PNG images into an ICO container (PNG entries, supported since Windows Vista). */
function ico(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);

  let offset = 6 + 16 * entries.length;
  const directory = entries.map(({ size, data }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette colors
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...directory, ...entries.map((e) => e.data)]);
}

const icoSizes = [16, 32, 48];
const icoEntries = await Promise.all(
  icoSizes.map(async (size) => ({ size, data: await png(size) })),
);

await Promise.all([
  writeFile(out("favicon.ico"), ico(icoEntries)),
  writeFile(out("apple-touch-icon.png"), await png(180, { flatten: true })),
  writeFile(out("icon-192.png"), await png(192)),
  writeFile(out("icon-512.png"), await png(512)),
]);

console.log("Icons written to public/.");
