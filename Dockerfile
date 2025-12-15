FROM node:18-slim

WORKDIR /usr/src/app
RUN apt-get update && \
    apt-get install -y python3 make g++ figlet git sqlite3 && \
    git clone https://github.com/xero/figlet-fonts.git /usr/share/figlet/xero-fonts && \
    cp /usr/share/figlet/xero-fonts/*.flf /usr/share/figlet/ && \
    cp /usr/share/figlet/xero-fonts/*.tlf /usr/share/figlet/ && \
    rm -rf /var/lib/apt/lists/*


# Copiar package.json y package-lock.json si existe
COPY package*.json ./
# Instalar todas las dependencias, incluidas las de desarrollo
RUN npm install --include=dev

COPY . .

EXPOSE 3000

CMD ["npm", "run", "serve"]