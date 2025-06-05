SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DB_PATH="$SCRIPT_DIR/../db/database.db"

#find all messages starting with "<script>"
sqlite3 "$DB_PATH" <<EOF
DELETE FROM messages WHERE content LIKE '<script>%';
DELETE FROM messages WHERE content LIKE '%</script>';
DELETE FROM messages WHERE content LIKE '<iframe%';
DELETE FROM messages WHERE content LIKE '%<iframe%>';
DELETE FROM messages WHERE content LIKE '<object%';
DELETE FROM messages WHERE content LIKE '%<object%>';
DELETE FROM messages WHERE content LIKE '<embed%';
DELETE FROM messages WHERE content LIKE '%<embed%>';
DELETE FROM messages WHERE content LIKE '<link%';
DELETE FROM messages WHERE content LIKE '%<link%>';
DELETE FROM messages WHERE content LIKE '<style%';
DELETE FROM messages WHERE content LIKE '%<style%>';
DELETE FROM messages WHERE content LIKE '<svg%';
DELETE FROM messages WHERE content LIKE '%<svg%>';
DELETE FROM messages WHERE content LIKE '<img%';
DELETE FROM messages WHERE content LIKE '%<img%>';
DELETE FROM messages WHERE content LIKE '<video%';
DELETE FROM messages WHERE content LIKE '%<video%>';
DELETE FROM messages WHERE content LIKE '<audio%';
DELETE FROM messages WHERE content LIKE '%<audio%>';
DELETE FROM messages WHERE content LIKE '<form%';
DELETE FROM messages WHERE content LIKE '%<form%>';
DELETE FROM messages WHERE content LIKE '<input%';
DELETE FROM messages WHERE content LIKE '%<input%>';
DELETE FROM messages WHERE content LIKE '<button%';
DELETE FROM messages WHERE content LIKE '%<button%>';
DELETE FROM messages WHERE content LIKE '<script%';
DELETE FROM messages WHERE content LIKE '%<script%>';
DELETE FROM messages WHERE content LIKE '<!--%';
DELETE FROM messages WHERE content LIKE '%<!--%>';
EOF