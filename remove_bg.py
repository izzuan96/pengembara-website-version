from PIL import Image
import os

# Absolute or correct relative path to your logo
input_path = os.path.join("public", "icons", "logo.png")  # relative if you run from project root
output_path = os.path.join("public", "icons", "logo_transparent.png")

print("Loading from:", os.path.abspath(input_path))
img = Image.open(input_path).convert("RGBA")

new_pixels = []
for r, g, b, a in img.getdata():
    # if nearly white, make transparent
    if r > 240 and g > 240 and b > 240:
        new_pixels.append((255, 255, 255, 0))
    else:
        new_pixels.append((r, g, b, a))

img.putdata(new_pixels)
img.save(output_path, "PNG")
print(f"Saved transparent logo to {output_path}")
