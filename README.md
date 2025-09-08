## 👨‍💻 Usuarios de Prueba

El sistema crea automáticamente los siguientes usuarios para que puedas probar los diferentes roles y permisos:

| Rol | Correo | Contraseña |
| :--- | :--- | :--- |
| 👑 **Administrador** | `admin@tours.com` | `admin` |
| 👁️ **Lector** | `viewer@tours.com` | `password123` |
| ✍️ **Creador** | `creator@tours.com` | `password123` |
| 🗑️ **Creador/Eliminador**| `creatordelete@tours.com`| `password123` |

---

# Tour Agency - Aplicación Full-Stack con Control de Acceso por Roles (RBAC)

Esta es una aplicación web completa construida para demostrar un sistema robusto de **Control de Acceso Basado en Roles (RBAC)**. Permite gestionar tours turísticos, donde las acciones que cada usuario puede realizar (crear, ver, editar, eliminar) están estrictamente controladas por el rol que se le ha asignado.

El proyecto está dividido en dos partes principales:
* **Backend:** Una API RESTful construida con **NestJS**, que maneja toda la lógica de negocio, autenticación y autorización.
* **Frontend:** Una Single-Page Application (SPA) construida con **React (Vite)**, que consume la API y renderiza la interfaz de usuario de forma dinámica según los permisos del usuario.

---

## ✨ Características Principales

* **Autenticación Segura:** Sistema de Login basado en **JSON Web Tokens (JWT)**.
* **Autorización granular:** Uso de **CASL (Control Access Support Library)** tanto en el frontend como en el backend para gestionar permisos complejos de forma declarativa.
* **Gestión de Entidades:** Operaciones **CRUD** (Crear, Leer, Actualizar, Borrar) completas para la gestión de Tours.
* **Interfaz Reactiva:** La UI se adapta en tiempo real, ocultando o mostrando botones y acciones según los permisos del rol del usuario logueado.
* **Base de Datos Relacional:** Persistencia de datos gestionada con **TypeORM** y **PostgreSQL**.
* **Estado Centralizado:** Manejo del estado en el frontend de forma eficiente con **Zustand**.
* **Base de Datos Pre-cargada:** Un sistema de *seeding* que crea automáticamente roles y usuarios de prueba al iniciar el servidor.

---

## 🛠️ Tecnologías Utilizadas

### Backend
* [NestJS](https://nestjs.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [PostgreSQL](https://www.postgresql.org/)
* [TypeORM](https://typeorm.io/)
* [Passport.js](http://www.passportjs.org/) (Estrategia JWT)
* [CASL](https://casl.js.org/)

### Frontend
* [React](https://reactjs.org/)
* [Vite](https://vitejs.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Zustand](https://github.com/pmndrs/zustand)
* [Tailwind CSS](https://tailwindcss.com/)
* [CASL](https://casl.js.org/)
* [Axios](https://axios-http.com/)

---

## 🚀 Instalación y Puesta en Marcha

Para ejecutar este proyecto localmente, sigue estos pasos:

### Prerrequisitos
* Node.js (v18 o superior)
* Un gestor de paquetes como `npm`, `yarn` o `pnpm` (recomendado `pnpm`)
* Una instancia de PostgreSQL en ejecución.

### 1. Configuración del Backend
```bash
# Navega a la carpeta del backend
cd backend

# Instala las dependencias
npm install

# IMPORTANTE: Configura la conexión a la base de datos
# Abre el archivo `src/app.module.ts` y modifica los datos de `TypeOrmModule.forRoot`
# para que coincidan con tu configuración de PostgreSQL.

# Inicia el servidor en modo de desarrollo
npm run start:dev
```
El servidor del backend estará corriendo en `http://localhost:3000`.

### 2. Configuración del Frontend
```bash
# Abre otra terminal y navega a la carpeta del frontend
cd frontend

# Instala las dependencias
npm install

# Inicia la aplicación de desarrollo
npm run dev
```
La aplicación de React estará disponible en `http://localhost:5173` (o el puerto que Vite indique).

---



## 📄 Licencia

Este proyecto está bajo la Licencia MIT.