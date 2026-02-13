import os
import re
import subprocess
from pathlib import Path

REPO_ROOT = Path(".")
OLD_TEMPLATE = "templates"
NEW_TEMPLATE = "B_Templates"

# Regex patterns to remove basic TypeScript syntax
TS_PATTERNS = [
    r":\s*[A-Za-z0-9_<>\[\]\|\&]+",   # type annotations
    r"interface\s+\w+\s*{[^}]*}",   # interfaces
    r"type\s+\w+\s*=\s*[^;]+;",      # type aliases
    r"<[A-Za-z0-9_,\s]+>",            # generics (basic)
]

def clean_typescript(code: str) -> str:
    for pattern in TS_PATTERNS:
        code = re.sub(pattern, "", code)
    return code

def convert_file(file_path: Path):
    content = file_path.read_text(encoding="utf-8")

    content = clean_typescript(content)
    content = content.replace(".ts'", ".js'")
    content = content.replace(".tsx'", ".jsx'")

    # Determine new extension
    if file_path.suffix == ".ts":
        new_path = file_path.with_suffix(".js")
    elif file_path.suffix == ".tsx":
        new_path = file_path.with_suffix(".jsx")
    else:
        return

    new_path.write_text(content, encoding="utf-8")
    file_path.unlink()

def walk_and_convert(base_dir: Path):
    for path in base_dir.rglob("*"):
        if path.suffix in [".ts", ".tsx"]:
            convert_file(path)

def rename_templates():
    old_path = REPO_ROOT / OLD_TEMPLATE
    new_path = REPO_ROOT / NEW_TEMPLATE

    if old_path.exists():
        old_path.rename(new_path)
        print(f"✅ Renamed {OLD_TEMPLATE} → {NEW_TEMPLATE}")
    else:
        print("⚠️ templates folder not found, skipping rename")

def remove_ts_configs():
    ts_files = [
        "tsconfig.json",
        "tsconfig.node.json",
        "vite-env.d.ts"
    ]
    for file in ts_files:
        path = REPO_ROOT / file
        if path.exists():
            path.unlink()
            print(f"🗑 Removed {file}")

def git_commit_and_push():
    commands = [
        ["git", "add", "."],
        ["git", "commit", "-m", "refactor: migrate TypeScript to JavaScript and rename templates to B_Templates"],
        ["git", "push", "origin", "main"],
    ]

    for cmd in commands:
        subprocess.run(cmd, check=True)

def main():
    print("\n🚀 Starting TypeScript → JavaScript migration...\n")

    rename_templates()

    print("🔁 Converting frontend templates...")
    walk_and_convert(REPO_ROOT / "F_Templates")

    print("🔁 Converting backend templates...")
    walk_and_convert(REPO_ROOT / NEW_TEMPLATE)

    remove_ts_configs()

    print("\n📦 Committing & pushing to GitHub...")
    git_commit_and_push()

    print("\n✅ DONE!")
    print("🎉 Project successfully migrated to JavaScript and pushed to GitHub")

if __name__ == "__main__":
    main()
