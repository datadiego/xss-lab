import betterSql from 'better-sqlite3'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbPath = path.join(__dirname, '../db/database.db')
const dbExists = fs.existsSync(dbPath)
const schemaPath = path.join(__dirname, 'schema.sql')
export const createDatabase = () => {
  if (!dbExists) {
    const db = betterSql(dbPath)
    const schema = fs.readFileSync(schemaPath, 'utf8')
    db.exec(schema)
    db.close()
    console.log('Database created successfully.')
  } else {
    console.log('Database already exists.')
  }
}
export const getDatabase = () => {
  return betterSql(dbPath)
}
export const closeDatabase = (db) => {
  if (db) {
    db.close()
    console.log('Database connection closed.')
  }
}
