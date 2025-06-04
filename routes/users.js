import { createUser } from '../models/users.js'
import Router from 'express'

export const router = Router()

router.post('/register', (req, res) => {
  const { name, password } = req.body
  console.log('Registering user:', name)
  if (!name || !password) {
    return res.status(400).json({ error: 'name and password are required.' })
  }

  try {
    createUser({ name, password })
    res.status(201).redirect('/login') // Redirect to login page after successful registration
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).redirect('/register')
  }
})
