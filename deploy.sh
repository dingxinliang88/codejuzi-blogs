git add .
git commit -m "$1"

git ls-files -z | while IFS=$'\0' read -r -d '' file; do
  timestamp=$(git log -1 --format=%ct -- "$file")
  date=$(date -r "$timestamp" "+%Y%m%d%H%M.%S")
  touch -t "$date" "$file"
done

git push origin master