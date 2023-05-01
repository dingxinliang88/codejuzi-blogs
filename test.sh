# git ls-files | while read file; do touch -d $(git log -1 --format="@%ct" "$file") "$file"; done
docsify serve;