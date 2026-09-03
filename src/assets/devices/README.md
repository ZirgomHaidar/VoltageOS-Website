# Device renders

Drop one PNG per device here, named for its **lowercase codename** exactly as
it appears in `DEVICE_REGISTRY` (`src/lib/devices.ts`):

    raphael.png   ziti.png   sweet.png   z2_plus.png   x00t.png

`src/lib/devices.ts` picks these up with `import.meta.glob`, so adding a file
is a deploy — not a code change. A codename with no file renders the flat
`#333` placeholder block instead, so a missing image degrades rather than
breaking.

## Filename rules

- Lowercase, matching the registry key character for character. The lookup is
  a literal path join, so `Raphael.png` or `Z2_Plus.png` silently resolves to
  `undefined` and you get the placeholder with no error.
- `.png` only — the glob pattern is `*.png`.
- Underscores kept as-is: `z2_plus.png`, not `z2-plus.png`.

## Export spec

- **1356 x 966**, PNG, **transparent background** (do not bake in `#333` —
  the `<img>` already carries `bg-surface-active`, so transparency makes the
  swap from placeholder seamless).
- Device centred, portrait, scaled so top and bottom sit ~8% inside the
  canvas. Side transparency is expected: the frame is landscape 1.404, the
  device is not.
- Target <200 KB after `pngquant` / `oxipng`.

1356px covers the widest case, which is *not* the widest viewport: at 1023px
the grid is still single-column, so the image renders 724 CSS px — 1448px on a
DPR 2 tablet. Every other breakpoint downscales from there.

Exact dimensions are not a hard requirement. `object-contain` letterboxes an
off-ratio file rather than cropping it, and against `#333` the letterbox is
invisible. **Consistent framing across all devices matters far more than
resolution** — `object-contain` normalises size, not composition, so if one
render fills its frame and the next sits small the grid reads ragged at any
resolution.

## Multi-device codenames

Several codenames cover more than one phone (`veux` is four, `miatoll` five).
Render the first-named device and stay consistent; one image per codename is
all the glob supports.
