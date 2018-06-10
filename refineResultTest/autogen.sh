#!/bin/sh
python3 crop.py
python3 resize.py
python split.py
python makedata.py
