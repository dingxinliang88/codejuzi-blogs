# git ls-files | while read file; do touch -d "$(git log -1 --format='%ad' --date=format-local:%Y%m%d%H%M.%S "$file")" "$file"; done
git ls-files -z | while IFS=$'\0' read -r -d '' file; do
  timestamp=$(git log -1 --format=%ct -- "$file")
  date=$(date -r "$timestamp" "+%Y%m%d%H%M.%S")
  touch -t "$date" "$file"
done

docsify serve;