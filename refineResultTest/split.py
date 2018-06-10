import os
from os import listdir
import os.path
import numpy as np
import random

print("start split train/valid set")

img_dir= "resized_images/"

img_list = listdir(img_dir)
N = len(img_list)
list_random = range(N)
random.shuffle(list_random)

valset = np.zeros(N, dtype=bool)
n_valset = int(round(N*0.3))
count = 0
random.shuffle(list_random)

for i in range(N):
    idx = list_random[i]
    valset[idx] = True
    count = count + 1
    if count == n_valset:
        break

train_f = open('random_train.txt','w')
val_f = open('random_val.txt','w')

for i in range(N):
    if valset[i]:
        val_f.write("%d\n" % (i + 1))
    else:
        train_f.write("%d\n" % (i + 1))

train_f.close()
val_f.close()

print("done")
