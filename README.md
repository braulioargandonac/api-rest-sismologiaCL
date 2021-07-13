# Proyecto Api-Rest-sismologiaCL
Aplicación para el uso de un microservicio REST, esta construido en NodeJS 10.19.0 y requiere una conexión a Base de datos (PostgreSQL)

## Entorno de desarrollo recomendado.
Para facilidad de desarrollo se aconseja usar Ubuntu 20.04 LTS. Los ejemplos asumen esta distribución.

## Requerimientos
- NodeJS, tener una version de Node (sudo apt-get install nodejs)
- NPM, tener una version de NPM (sudo apt-get install npm)
- Cliente de base de datos **PostgreSQL** (sudo apt-get install postgresql-client )
- Docker, se requiere tener instalada una version de Docker, para esto se requieren seguir los pasos indicados en el siguiente link: https://docs.docker.com/engine/install/ubuntu/

## Estructura del proyecto
- **controllers** . Contiene el codigo fuente del proyecto y la carpeta con las rutas.
- **database** . Contiene los script necesarios para trabajar con la base de datos.
- Por defecto el servicio levanta en la máquina local en el puerto 3000 y con el contexto grupof: http://127.0.0.1:3000/grupof/earthquakes

### Base de datos.
Dentro de la carpeta database existen un conjunto de scripts que se deben ejecutar en orden para instanciar los datos que necesita la aplicación.

## Ejecución
Lo primero es conectarse a la base de datos, para esto es necesario ejecutar los siguientes comandos en orden:

**sudo -u postgres psql**

**\c sismologia**

y finalmente para compilar el proyecto, es necesario ejecutar el comando:

**npm start**