# SISTEMA GANADO BACKEND

## Problemas que soluciona

El sistema esta echo para solucionar los problemas relacionados con el control del ganado,
como lo puede ser tener multiples terrenos con multiples ganados, ademas de gestionar
cosas como lo son cada cuanto pario una vaca.

## Como ejecutar el proyecto

Para ejecutar el proyecto hay que tener un archivo .env:

Ademas se necesita una base de datos mysql con la base de datos campo_db.

## Proximas cosas

-  Corregir los tipos de datos de cada modelo como esta en cattle.
-  Pensar en la logica de un tabla venta de ganado y vacunaciones.
-  Agregar un campo para saber si el ganado esta activo o no. 0 sino y 1 sisi
-  Agregar un servicio para enviar correos electronicos.
-  Agregar un servicio y una ruta para validar los correos, los correos se validaran
   de la siguiente manera: Se creara un jwt que contendra el id del usario(y correo por si acaso) y estara activo solo por 5 minutos, esto para confirmar el correo.
-  Agregar que solo se podra iniciar sesion una vez que se halla confirmado el correo,
   por lo qye hay que agregar una ruta para que se pueda mandar otra confirmacion al correo.
