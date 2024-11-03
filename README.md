# ArtiTats
Aplicación web para turnos de tatuajes.

## Descripción
Este proyecto tiene como objetivo desarrollar una aplicación web para la reserva de turnos en un estudio de tatuajes. Los usuarios deberán registrarse e iniciar sesión para poder reservar un turno. Se gestionará la base de datos con PostgreSQL, y la interfaz estará desarrollada en React.

## Instalación
Es importante configurar correctamente un archivo ".env" que contenga las variables de entorno adecuadas para realizar la conexión a la base de datos. Hay un ejemplo de uso en ".env.example" dentro de la carpeta "back".

## Tecnologías utilizadas
- **Frontend**: HTML, CSS, React, Node.js, Express.js, SQL.

## Funcionalidades principales
1. **Registro de usuario**:
   - DNI, usuario y email únicos.
   - Campos: DNI, nombre, apellido, usuario, email y contraseña.

2. **Inicio de sesión**:
   - Autenticación con usuario y contraseña.

3. **Gestión de turnos**:
   - Selección de fecha y hora para un turno.
   - Cancelación de turnos hasta un día antes.
   - Validación de horarios de atención. (Lun a Vie. 10hs a 16hs).

4. **Perfil del usuario**:
   - Historial de turnos reservados.
