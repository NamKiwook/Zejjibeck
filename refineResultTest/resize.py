from PIL import Image
from os import listdir
import os.path
import json

img_dir = "./cropped_images"
resized_img_dir = "./resized_images"

if not os.path.exists(resized_img_dir):
    os.makedirs(resized_img_dir)

fileNames = ["./results/result.json", "./results/result1.json"]

print("start resize images")

for fn in fileNames :
    with open(fn) as f:
        result = json.load(f)

    N = len(result["result"])

    count = 0

    for i in range(N) :
        fname = result["result"][i]["fileName"]
        image_path = os.path.join(img_dir,fname)
        resized_img_path = os.path.join(resized_img_dir,fname)
        img = Image.open(image_path).convert('RGB')
        resized_img = img.resize((224,224),Image.BILINEAR)
        resized_img.save(resized_img_path)
        count = count + 1
        print('resized :' + fname)

print("done")
