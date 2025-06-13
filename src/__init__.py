from flask import Flask
import os
from src.config.config import Config
from dotenv import load_dotenv

# loading env vars
load_dotenv()

app = Flask(__name__)

config = Config().dev_config

app.env = config.ENV
