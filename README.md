# XSS Lab

Este laboratorio está diseñado para que los usuarios puedan practicar y entender los ataques de *Cross-Site Scripting* (XSS) en un entorno controlado.

La aplicación es un chat con sockets que permite a diferentes usuarios registrarse y enviar mensajes. Sin embargo, no se realiza una validación adecuada de las entradas del usuario, lo que permite la inyección de scripts maliciosos.

Además de esta vulnerabilidad, encontrarás otros problemas de seguridad intencionados en la aplicación, como:

1. Cookies sin `HttpOnly` y `Secure`, lo que permite el robo de cookies mediante XSS.
2. Falta de protección CSRF, lo que permite ataques de falsificación de solicitudes entre sitios.
3. Uso de `eval()` en el código del cliente, lo que puede llevar a la ejecución de código arbitrario.
4. Falta de políticas de seguridad de contenido (CSP), lo que facilita la explotación de vulnerabilidades XSS.
5. Las contraseñas de usuario se almacenan con `bcrypt`, pero no se implementan otras medidas de seguridad, como la limitación de intentos de inicio de sesión o la verificación de la fortaleza de las contraseñas.
6. El `secret` de la sesión está codificado en el código fuente, lo que puede comprometer la seguridad de las sesiones si el código fuente se expone.

La aplicación utiliza las siguientes tecnologías:

- Node.js
- Express
- Socket.io
- Nunjucks

**NO** despliegues esta aplicación en un entorno de producción real.

## Despliegue

Usa Docker:

```bash
git clone https://github.com/datadiego/xss-lab.git
cd xss-lab
docker-compose up --build
```


Luego, abre tu navegador y navega a `http://localhost:8000`.