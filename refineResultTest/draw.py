import tkinter
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import json

from PIL import Image
import numpy as np

with open("./results/result.json") as f:
    result = json.load(f)

for i in range(len(result["result"])) :
    fileName = result["result"][i]["fileName"]

    fimage = Image.open("./images/" + fileName);

    image = np.array(fimage, dtype=np.uint8)
    fig, ax = plt.subplots(1)
    ax.imshow(image)

    maxWidth, maxHeight = fimage.size

    for j in range(len(result["result"][i]["result"]["refinedCoordinate"])) : 
        temp = result["result"][i]["result"]["refinedCoordinate"][j]
        x = temp["minX"] * maxWidth
        y = temp["minY"] * maxHeight

        width = (temp["maxX"] - temp["minX"]) * maxWidth
        height = (temp["maxY"] - temp["minY"]) * maxHeight
        rect = patches.Rectangle((x,y),width,height,linewidth=1,edgecolor='r',facecolor='none')
        ax.add_patch(rect)

    temp = result["result"][i]["result"]["expectedCoordinate"]

    x = temp["minX"] * maxWidth
    y = temp["minY"] * maxHeight

    width = (temp["maxX"] - temp["minX"]) * maxWidth
    height = (temp["maxY"] - temp["minY"]) * maxHeight
    rect = patches.Rectangle((x,y),width,height,linewidth=2,edgecolor='y',facecolor='none')
    ax.add_patch(rect)

    plt.show()
