import { getDatabase } from '../db/createDatabase.js'

export const getMessages = () => {
    const db = getDatabase()
    const sql = 'SELECT * FROM messages'
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
