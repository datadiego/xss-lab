import { createUser } from '../models/users.js'
import Router from 'express'

export const router = Router()

router.post('/register', (req, res) => {
  const { name, password } = req.body
  console.log('Registering user:', name)
  if (!name || !password) {
    return res.status(400).render('register.njk', { error: 'El nombre y la contraseña son obligatorios.' })
  }

  try {
    createUser({ name, password })
    res.status(201).redirect('/login') // Redirect to login page after successful registration
  } catch (error) {
    console.error('Error creating user:', error)
    let errorMsg = 'Error al crear el usuario.'
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      errorMsg = 'El nombre de usuario ya existe.'
    }
    res.status(400).render('register.njk', { error: errorMsg })
  }
})
