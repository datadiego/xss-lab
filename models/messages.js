import { getDatabase } from '../db/createDatabase.js'

export const getMessages = () => {
    const db = getDatabase()
    const sql = `
        SELECT messages.id, messages.user_id, users.name as user_name, messages.content, messages.timestamp
        FROM messages
        JOIN users ON messages.user_id = users.id
        ORDER BY messages.timestamp ASC
    `
    const messages = db.prepare(sql).all()
    db.close()
    return messages
}

export const createMessage = (message) => {
    const db = getDatabase()
    const sql = 'INSERT INTO messages (user_id, content) VALUES (?, ?)'
    const stmt = db.prepare(sql)
    const result = stmt.run(message.user_id, message.content)
    db.close()
    return result.lastInsertRowid
}