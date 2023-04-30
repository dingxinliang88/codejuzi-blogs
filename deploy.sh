git pull origin master

git add .
git commit -m "$1"
git ls-files | while read file; do touch -d "$(git log -1 --format="@%ct" "$file" | xargs -I{} date -d @{} +%Y%m%d%H%M.%S)" "$file"; done

git push origin master