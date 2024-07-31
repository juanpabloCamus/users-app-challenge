# User App Challenge

Este proyecto es una aplicación web simple que permite a los usuarios iniciar sesión y, una vez autenticados, gestionar un CRUD (Crear, Leer, Actualizar, Eliminar) de usuarios. La aplicación está desarrollada utilizando HTML, CSS, JavaScript y los frameworks Vue y Node.js, y utiliza MySQL como base de datos. El proyecto está organizado como un monorepositorio que contiene tanto el frontend como el backend en el mismo repositorio.

## Características

- **Formulario de Login**: Permite a los usuarios iniciar sesión en la aplicación.
- **Formulario de Registro**: Permite a los usuarios registrarse en la aplicación.
- **Autenticacion**: El manejo de la autenticacion esta desarollado usando JWT y cookies.
- **CRUD de Usuarios**: Los usuarios autenticados pueden:
  - **Listar** los usuarios existentes.
  - **Añadir** nuevos usuarios.
  - **Modificar** usuarios existentes.
  - **Eliminar** usuarios.

## Tecnologías Utilizadas

- **Frontend**:

  - **Vue.js**: Framework para la construcción de la interfaz de usuario.
  - **HTML/CSS**: Estructura y estilos de la aplicación.

- **Backend**:
  - **Node.js**: Entorno de ejecución para JavaScript en el servidor.
  - **Express.js**: Framework para el desarrollo del backend.
  - **MySQL**: Sistema de gestión de bases de datos relacional.

## Instalación

1. Clona este repositorio:

   ```sh
   git clone https://github.com/tu-usuario/users-app-challenge.git
   cd users-app-challenge
   ```

2. Instala las dependencias en la raíz del repositorio:
   ```sh
   npm install
   ```

## Iniciar el Backend

1. **Crear la Base de Datos:**

   - Primero, crea una base de datos en MySQL. Puedes usar una query similar a la siguiente para crearla:
     ```sql
     CREATE DATABASE users;
     ```
     Cambia el nombre `users` por el nombre que prefieras.
   - Luego, abre el archivo `./api/src/database/database.js` y actualiza las constantes con la configuración correspondiente para tu base de datos. Cuando se levante el servidor y establezca la conexion las tablas se generaran automaticamente.

2. **Configuración del Servidor:**
   - En el archivo `index.js`, encontrarás la constante `PORT`, que se utiliza para definir el puerto en el que se ejecutará el servidor.
   - También encontrarás la constante `ORIGIN`. Aquí debes especificar la URI donde se está ejecutando el frontend para que el backend pueda aceptar peticiones desde ese origen.

Para iniciar el servidor, ejecuta el siguiente comando en la raíz del repositorio:

```sh
npm run start:api
```

## Iniciar el Frontend

Para iniciar el cliente frontend, primero realiza el build con:

```sh
npm run client:build
```

Luego lo iniciaremos con

```sh
npm run client:start
```

Esto te proporcionará el origen que debes configurar en el backend en`./api/src/index.js`

El cliente se conectará al puerto especificado en `client/src/config.js` para hacer las peticiones al backend. Asegurate de que coinicida con el puerto establecido en `./api/src/index.js`
