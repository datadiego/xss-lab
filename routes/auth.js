import Router from 'express'
import { loginUser } from '../models/users.js'

export const router = Router()

router.post('/login', (req, res) => {
  const { name, password } = req.body
  if (!name || !password) {
    return res.status(400).render('error.njk', { error: 'name and password are required.' })
  }
  console.log('Attempting to log in user:', name)
  const user = loginUser(name, password)
  if (!user) {
    console.log('Login failed for user:', name)
    return res.status(401).render('error.njk', { error: 'Invalid name or password.' })
  }
  console.log('Login successful for user:', name)
  req.session.user = { name } // Store user info in session
  res.status(200).redirect('/') // Redirect to private page after successful login
})

router.get('/logout', (req, res) => {
  console.log('Logging out user:', req.session.user ? req.session.user.name : 'Unknown')
  req.session.destroy(err => {
    if (err) {
      return res.status(500).render('error.njk', { error: 'Failed to log out.' })
    }
    res.status(200).redirect('/') // Redirect to home page after logout
  })
})
