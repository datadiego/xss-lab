# XSS Lab

Este laboratorio está diseñado para que los usuarios puedan practicar y entender los ataques de *Cross-Site Scripting* (XSS) en un entorno controlado.

La aplicación es un chat con sockets que permite a diferentes usuarios registrarse y enviar mensajes. Sin embargo, no se realiza una validación adecuada de las entradas del usuario, lo que permite la inyección de scripts maliciosos.

La aplicación utiliza las siguientes tecnologías:

- Node.js
- Express
- Socket.io
- Nunjucks

**NO** despliegues esta aplicación en un entorno de producción real.

## Despliegue

Lanza el servidor localmente igual que cualquier aplicación de Node.js:

```bash
git clone https://github.com/datadiego/xss-lab.git
cd xss-lab
npm install
npm run dev
```

Luego, abre tu navegador y navega a `http://localhost:8000`.
