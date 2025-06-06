message_id=$1
if [ -z "$message_id" ]; then
  echo "Usage: $0 <message_id>"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DB_PATH="$SCRIPT_DIR/../db/database.db"

sqlite3 "$DB_PATH" <<EOF
DELETE FROM messages WHERE id = '$message_id';
EOF