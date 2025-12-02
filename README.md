# SISTEMA GANADO BACKEND

## Requsitos

- Tener una base de datos PostgreSQL, ya sea en local o en la nube.
- Tener Node.js instalado, de preferencia la version LTS mas reciente.
- Tener una cuenta en Claudflare, no es indispensable, si se quiere cambiar de servicio cambiar la implementación en infrastructura de image.
- Tener un servicio de correo tranccional, en nuestro caso solo usamos un correo basico con gmail, pero puede tener cualquier otro tipo.

## Instalación del aplicativo web(API)

- Crear una base de datos vacia para poder ocuparla.
- Crear el archivo .env con una estructura similar al .env.example para guardar las credenciales del proyecto.

Ejecutar los comandos de instalacion.

```bash
npm install
```

Ejecutar el siguiente comando para sincronizar con la base de datos y generar las tablas.

```bash
npx prisma migrate dev
```

## Ejecución del servidor

Ejecutar para desarrollo.

```bash
npm run dev
```

En caso de produccion, compilar el proyecto y ejecutar.

```bash
npm run build
npm start
```
