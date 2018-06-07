import os
import json
import unicodedata
import numpy as np
import json
import random

random_train = "random_train.txt"
random_val = "random_val.txt"

def get_moderate_list(split_file):
    print("loading random split file")
    train_list = []
    zzanga = 0

    with open(split_file) as f:
        for line in f.readlines():
            idx = int(line) - 1
            if idx >= 20 :
                train_list.append([idx,0])

            else :
                train_list.append([idx,1])

    return train_list 

if __name__ == "__main__":
    with open("./results/result.json") as json_file:
        metadata = json.load(json_file)

    N = len(metadata)

    train_list = get_moderate_list(random_train)
    val_list = get_moderate_list(random_val)

    out_fname = 'train.json'
    with open(out_fname,'wb') as f:
        json.dump(train_list,f)

    out_fname = 'val.json'
    with open(out_fname,'wb') as f:
        json.dump(val_list,f)

    print("finished make train/val json file")
