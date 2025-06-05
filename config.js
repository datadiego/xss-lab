import express from 'express'
import { createDatabase, getDatabase } from './db/createDatabase.js'
import session from 'express-session'
import SQLiteStoreFactory from 'connect-sqlite3'
import nunjucks from 'nunjucks'

export const app = express()

app.use(express.static('public'))

nunjucks.configure('views', {
  // autoescape: true,
  http: false,
  express: app
})
app.engine('njk', nunjucks.render)
app.set('view engine', 'njk')

const SQLiteStore = SQLiteStoreFactory(session)

const sessionMiddleware = session({
  store: new SQLiteStore({
    db: 'sessions.db',
    dir: './db'
  }),
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 5
  }
})

app.use(sessionMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Exporta la función de inicialización
export function initializeApp() {
  createDatabase()
  const db = getDatabase()
  process.on('SIGINT', () => {
    db.close()
    console.log('Database connection closed.')
    process.exit(0)
  })

  process.on('SIGTERM', () => {
    db.close()
    console.log('Database connection closed.')
    process.exit(0)
  })
  console.log('Database is ready to use.')
}