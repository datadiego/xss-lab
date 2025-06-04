import { app } from './config.js'
import { authMiddleware } from './middleware/auth.js'

// Routers
import { router as pagesRouter } from './routes/pages.js'
import { router as usersRouter } from './routes/users.js'
import { router as authRouter } from './routes/auth.js'
app.use('/', pagesRouter)
app.use('/', usersRouter)
app.use('/', authRouter)

// Rutas de test
app.get('/profile', authMiddleware, (req, res) => {
  res.render('profile.njk', { title: 'Private Page', user: req.session.user })
})
