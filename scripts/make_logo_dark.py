#!/usr/bin/env python3
"""
Create logo-dark.png from logo.png:
  - Pixels that are dark/black → white
  - Red pixels → kept as-is
  - Transparent pixels → kept transparent
"""
from PIL import Image
import sys, os

SRC = r"d:\TechDrive\frontend\public\logo.png"
DST = r"d:\TechDrive\frontend\public\logo-dark.png"

if not os.path.exists(SRC):
    print(f"ERROR: {SRC} not found. Save the transparent logo PNG there first.")
    sys.exit(1)

img = Image.open(SRC).convert("RGBA")
pixels = img.load()
w, h = img.size

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if a < 10:
            continue  # fully transparent — keep
        # Determine if pixel is "dark" (black / near-black)
        # Red pixels have high R, low G and B
        is_red  = r > 150 and g < 80 and b < 80
        is_dark = r < 80 and g < 80 and b < 80
        if is_dark:
            pixels[x, y] = (255, 255, 255, a)  # black → white
        # Red stays as-is, everything else stays as-is

img.save(DST, "PNG")
print(f"Saved: {DST}")
print(f"Size: {w}x{h}px")
