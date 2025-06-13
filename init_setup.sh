#!/bin/bash

# Activate virtual enviroment
# works for mac and linux. But we'll use docker so...
source api_venv/bin/activate

# install packages in virtual enviroment
pip install -r requirements.txt
