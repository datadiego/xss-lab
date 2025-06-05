import Router from 'express'
// import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../models/users.js';
import { getMessages } from '../models/messages.js'

export const router = Router()

router.get('/', (req, res) => {
  console.log(req.session)
  res.render('home.njk', { title: 'Home', user: req.session.user || null })
})

router.get('/login', (req, res) => {
  res.render('login.njk', { title: 'Login' })
})

router.get('/register', (req, res) => {
  res.render('register.njk', { title: 'Register' })
})

router.get('/messages', (req, res) => {
  if (!req.session.user) {
    return res.status(401).render('error.njk', { message: 'You must be logged in to view messages.' })
  }
  const messages = getMessages()
  res.render('messages.njk', { title: 'Messages', user: req.session.user, messages })
});
