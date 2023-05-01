git ls-files | while read file; do touch -d $(git log -1 --format="@%ct" "$file") "$file"; done

git add .
git commit -m "$1"

git pull origin master

git push origin master