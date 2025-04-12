# 🏡 Bienes Raíces - Proyecto Node.js

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![Sequelize](https://img.shields.io/badge/Sequelize-ORM-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC)

Plataforma web para gestión de propiedades inmobiliarias desarrollada con Node.js, Express y Sequelize.

## 📋 Tabla de Contenidos

- [Características](#características-principales)
- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura](#estructura-del-proyecto)
- [Licencia](#licencia)

## ✨ Características principales

- ✅ Sistema completo de autenticación (registro/login)
- ✅ Gestión de propiedades (CRUD)
- ✅ Búsqueda avanzada con múltiples filtros
- ✅ Panel de administración
- ✅ Envío de emails de confirmación
- ✅ Diseño responsive con TailwindCSS
- ✅ Protección CSRF y seguridad mejorada

## 📦 Requisitos

- Node.js v18+
- MySQL 8.x
- Git
- NPM 9.x+

## 🛠️ Instalación

```bash
# 1. Clonar repositorio
git clone https://github.com/OdaFra/bienesraices.git
cd BIENESRAICES

# 2. Instalar dependencias
npm install

# 3. Configurar entorno (copiar y editar)
Agregar el archivo .env con tus credenciales:

# Configuración de Base de Datos
DB=bienesraices
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost

# Configuración del Servidor
PORT=3000
BACKEND_URL=http://localhost:3000
JWT_SECRET=tu_secreto_jwt

# Configuración de Email
EMAIL_HOST=smtp.tu-servidor.com
EMAIL_PORT=587
EMAIL_USER=tu_email@dominio.com
EMAIL_PASS=tu_contraseña_email`
```

## 🚀 Uso

```bash
# Modo desarrollo
npm run dev

# Desarrollo con recarga automática
npm run dev:nodemon

# Compilar estilos CSS (Tailwind)
npm run css

# Producción (ejemplo)
NODE_ENV=production node src/index.js
```

## 📂 Estructura del proyecto

```
src/
├── controllers/    # Lógica de aplicación
├── database/       # Configuración DB
│   ├── config/     # Conexión DB
│   └── models/     # Modelos Sequelize
├── public/         # Assets (CSS/JS/IMG)
├── routes/         # Definición de rutas
├── utils/          # Helpers/Middlewares
├── views/          # Templates Pug
├── index.js        # Entrada principal
```
