import tkinter
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import json

from PIL import Image
import numpy as np

fileNames = ["./results/result.json", "./results/result1.json"]

print("start crop")

filecount = 1
for fn in fileNames :
    with open(fn) as f:
        result = json.load(f)

    for i in range(len(result["result"])) :
        fileName = result["result"][i]["fileName"]
    
        image = Image.open("./images/" + fileName);
    
        maxWidth, maxHeight = image.size
    
        temp = result["result"][i]["result"]["expectedCoordinate"]
    
        minx = int(temp["minX"] * maxWidth)
        miny = int(temp["minY"] * maxHeight)
        maxx = int(temp["maxX"] * maxWidth)
        maxy = int(temp["maxY"] * maxHeight)
    
        area = (minx, miny, maxx, maxy)
        cropped = image.crop(area)
        cropped.load()
    
        cropped.save("./cropped_images/" + fileName)
    
        print("done : " + fileName)
    
print("done")
