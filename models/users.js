import { getDatabase } from '../db/createDatabase.js'
import bcrypt from 'bcrypt'
export const getUsers = () => {
  const db = getDatabase()
  const sql = 'SELECT * FROM users'
  const users = db.prepare(sql).all()
  db.close()
  return users
}
export const getUserById = (id) => {
  const db = getDatabase()
  const sql = 'SELECT * FROM users WHERE id = ?'
  const user = db.prepare(sql).get(id)
  db.close()
  return user
}
export const createUser = (user) => {
  const db = getDatabase()
  const sql = 'INSERT INTO users (name, password) VALUES (?, ?)'
  const stmt = db.prepare(sql)
  const hashedPassword = bcrypt.hashSync(user.password, 10)
  const result = stmt.run(user.name, hashedPassword)
  db.close()
  return result.lastInsertRowid
}
export const updateUser = (id, user) => {
  const db = getDatabase()
  const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?'
  const stmt = db.prepare(sql)
  const result = stmt.run(user.name, user.email, id)
  db.close()
  return result.changes
}
export const deleteUser = (id) => {
  const db = getDatabase()
  const sql = 'DELETE FROM users WHERE id = ?'
  const stmt = db.prepare(sql)
  const result = stmt.run(id)
  db.close()
  return result.changes
}

export const loginUser = (name, password) => {
  const db = getDatabase()
  const sql = 'SELECT * FROM users WHERE name = ?'
  const user = db.prepare(sql).get(name)
  db.close()

  if (!user) {
    return null // User not found
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password)
  if (!isPasswordValid) {
    return null // Invalid password
  }

  return user // Return user if login is successful
}
