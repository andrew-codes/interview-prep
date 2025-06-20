git diff --cached --name-only --diff-filter=ACMR | grep -E '\.md$' | while IFS= read -r file; do
    node _scripts/d2.js "$file"
    node _scripts/wiki-links-to-markdown.js "$file"
    git add "$file"
done

find . -type d -name assets -exec find {} -type f -name "*.png" -print0 \; | xargs -0 git add
