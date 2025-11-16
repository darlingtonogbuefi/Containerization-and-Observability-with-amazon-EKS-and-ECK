import os
import sys

sys.stdout.reconfigure(encoding='utf-8')  # 👈 Add this line

EXCLUDE_DIRS = {'.git', 'node_modules', 'venv', '__pycache__', 'dist', 'build', '.vscode'}
EXCLUDE_FILES = {'.DS_Store', 'Thumbs.db'}
MAX_DEPTH = 4

def tree(dir_path, prefix='', depth=0):
    if depth > MAX_DEPTH:
        return

    entries = sorted(os.listdir(dir_path))
    entries = [e for e in entries if e not in EXCLUDE_FILES and not e.startswith('.')]

    visible_entries = []
    for entry in entries:
        full_path = os.path.join(dir_path, entry)
        if os.path.isdir(full_path) and entry not in EXCLUDE_DIRS:
            visible_entries.append(entry)
        elif os.path.isfile(full_path):
            visible_entries.append(entry)

    for index, entry in enumerate(visible_entries):
        full_path = os.path.join(dir_path, entry)
        connector = '+-- ' if index == len(visible_entries) - 1 else '|-- '
        print(prefix + connector + entry)
        if os.path.isdir(full_path) and entry not in EXCLUDE_DIRS:
            extension = '    ' if index == len(visible_entries) - 1 else '|   '
            tree(full_path, prefix + extension, depth + 1)

if __name__ == '__main__':
    tree('.')
