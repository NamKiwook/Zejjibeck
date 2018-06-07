import os
from os import listdir
import os.path
import numpy as np
import random

img_dir= "cropped_images/"

img_list = listdir(img_dir)
N = len(img_list)
list_random = range(N)
random.shuffle(list_random)

# assign validataion set
valset = np.zeros(N, dtype=bool)
n_valset = int(round(N*0.3))
count = 0
random.shuffle(list_random)

for i in range(N):
    idx = list_random[i]
    valset[idx]=True
    count = count + 1
    if count == n_valset:
        break

train_f = open('random_train.txt','w')
val_f = open('random_val.txt','w')

for i in range(N):
    if valset[i]:
        val_f.write("%d\n" % i)
    else:
        train_f.write("%d\n" % i)

train_f.close()
val_f.close()
