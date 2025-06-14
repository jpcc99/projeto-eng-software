import os

PROJECT_NAME = "estoque_ai"

LIST_FILES = [
    "app.py",
    "init_setup.sh",
    "README.md",
    "LICENSE",
    "requirements.txt",
]

for file_path in LIST_FILES:
    file_dir, file_name = os.path.split(file_path)

    # fisrt make dir
    if file_dir != "":
        os.makedirs(file_dir, exist_ok=True)
        print(f"Creating Directory: {file_dir} for file: {file_name}")

    if (not os.path.exists(file_path)) or (os.path.getsize(file_path) == 0):
        with open(file_path, "w") as f:
            pass
            print(f"Creating an empty file: {file_path}")
    else:
        print(f"File already exists {file_path}")
