import fs from "node:fs"
import path from "node:path"
import sharp from "sharp"

const DIRS = ["src/assets/devices", "public/images"]

async function optimize() {
  let count = 0
  for (const dir of DIRS) {
    const fullDir = path.resolve(dir)
    if (!fs.existsSync(fullDir)) continue

    const files = fs.readdirSync(fullDir)
    for (const file of files) {
      if (!file.toLowerCase().endsWith(".png")) continue

      const inPath = path.join(fullDir, file)
      const outPath = path.join(fullDir, file.replace(/\.png$/i, ".webp"))

      const oldSize = fs.statSync(inPath).size
      await sharp(inPath)
        .resize({ width: 1280, withoutEnlargement: true })
        .webp({ quality: 82, effort: 6 })
        .toFile(outPath)

      const newSize = fs.statSync(outPath).size
      fs.unlinkSync(inPath)
      count++

      console.log(
        `Optimized: ${file} (${(oldSize / 1024).toFixed(1)} KB -> ${(newSize / 1024).toFixed(1)} KB)`,
      )
    }
  }

  if (count === 0) {
    console.log("No unoptimized PNGs found in target directories.")
  } else {
    console.log(`Successfully converted and optimized ${count} image(s).`)
  }
}

optimize().catch((err) => {
  console.error("Optimization failed:", err)
  process.exit(1)
})
