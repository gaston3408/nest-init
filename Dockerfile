# 1. Usamos una imagen base de Node.js
FROM node:18-alpine

# 2. Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiamos el package.json y el package-lock.json (o yarn.lock si usas Yarn)
COPY package*.json ./

# 4. Instalamos las dependencias
RUN yarn install

# 5. Copiamos el resto de los archivos de la aplicación
COPY . .

# 6. Construimos la aplicación para producción
# RUN npm run build

# 7. Exponemos el puerto en el que corre la app
EXPOSE 8089

# 8. Comando por defecto para iniciar la aplicación
CMD ["yarn", "start:dev"]
