import { app, initializeApp } from './config.js'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { authMiddleware } from './middleware/auth.js'
import { getMessages, createMessage } from './models/messages.js'

// Routers
import { router as pagesRouter } from './routes/pages.js'
import { router as usersRouter } from './routes/users.js'
import { router as authRouter } from './routes/auth.js'

const server = createServer(app)
export const io = new Server(server)

app.use('/', pagesRouter)
app.use('/', usersRouter)
app.use('/', authRouter)

import { exec } from 'child_process'

app.get('/comando', (req, res) => {
  res.render('comando.njk', { title: 'Comando', 'description': 'Ejecuta comandos en el servidor' })
})

app.post('/execute', (req, res) => {
  const { command } = req.body
  console.log('Executing command:', command)

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`)
      return res.status(500).json({ success: false, message: `Error executing command: ${error.message}` })
    }
    if (stderr) {
      console.error(`Command stderr: ${stderr}`)
      return res.status(500).json({ success: false, message: `Command error: ${stderr}` })
    }
    console.log(`Command output: ${stdout}`)

    if (!stdout) {
      return res.status(200).json({ success: true, message: 'No hay datos de respuesta.' })
    }
    console.log(`Command executed successfully: ${stdout}`)
    return res.status(200).json({ success: true, message: 'Command executed successfully', output: stdout })
  })

})

app.get('/tools/figlet', (req, res) => {
  res.render('tool_figlet.njk', { title: 'Figlet Tool', description: 'Genera texto con Figlet' })
});
app.post('/tools/figlet', (req, res) => {
  const { command } = req.body
  console.log('Executing command:', command)

  exec(`./scripts/generate-figlet-min.sh "${command}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`)
      return res.status(500).type('text/plain').send(`Error executing command: ${error.message}`)
    }
    if (stderr) {
      console.error(`Command stderr: ${stderr}`)
      return res.status(500).type('text/plain').send(`Command error: ${stderr}`)
    }

    if (!stdout) {
      return res.status(200).type('text/plain').send('No hay datos de respuesta.')
    }
    console.log(`Command executed successfully: ${stdout}`)
    return res.status(200).type('text/plain').send(stdout)
  })
})

app.get('/profile', authMiddleware, (req, res) => {
  res.render('profile.njk', { title: 'Private Page', user: req.session.user })
})


io.on('connection', (socket) => {
  console.log('A user connected:', socket.id)
  socket.emit('messages', getMessages())

  socket.on('newMessage', async (data) => {
    console.log('New message received:', data)
    const id = createMessage({ user_id: data.user_id, content: data.content })
    const messages = getMessages()
    io.emit('messages', messages)
  })
})

const PORT = process.env.PORT || 8000
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`)
  initializeApp()
})