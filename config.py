import os


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "secret-dev-key")
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URI", "postgresql://senha@localhost/estoque_ai"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
