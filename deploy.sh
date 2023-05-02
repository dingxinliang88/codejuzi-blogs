# !/bin/bash

while getopts "t:" opt; do
  case ${opt} in
    t )
      message="$OPTARG"
      touch_files=true
      ;;
    \? )
      echo "Usage: deploy.sh [-t commit_message]" 1>&2
      exit 1
      ;;
    : )
      echo "Invalid option: $OPTARG requires an argument" 1>&2
      exit 1
      ;;
  esac
done

git add .
if [ -n "$1" ]; then
  git commit -m "$1"
fi

if [ "$touch_files" = true ]; then
  git ls-files -z | while IFS=$'\0' read -r -d '' file; do
    timestamp=$(git log -1 --format=%ct -- "$file")
    date=$(date -r "$timestamp" "+%Y%m%d%H%M.%S")
    touch -t "$date" "$file"
  done

  # git push origin master
fi
