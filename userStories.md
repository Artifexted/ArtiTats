# User Stories - ArtiTats

## US-001: Registro de usuario
**Descripción**:  
Como usuario nuevo, quiero poder registrarme en la página, para guardar mis datos, iniciar sesión y reservar turnos.

### Criterios de aceptación:
- El usuario debe poder registrarse a través de un formulario de registro.
- El formulario debe solicitar nombre, apellido, dni, email, usuario y contraseña.
- El usuario, email y DNI deben ser únicos.

**Frontend**:
- Crear el formulario de registro.
- Implementar la lógica de validación con el botón de registro.

**Backend**:
- Crear una ruta para el registro de usuarios.
- Implementar un controlador que reciba los datos (nombre, apellido, dni, email, usuario, contraseña).
- Almacenar el nuevo usuario en la base de datos.

---

## US-002: Inicio de sesión
**Descripción**:  
Como usuario registrado, quiero iniciar sesión con mi usuario y contraseña, para acceder a mi perfil y gestionar mis turnos.

### Criterios de aceptación:
- El usuario debe poder iniciar sesión con usuario y contraseña.
- Debe haber un mensaje de error si las credenciales no son correctas.
- La sesión debe mantenerse activa hasta que el usuario cierre sesión.

**Frontend**:
- Crear el formulario de inicio de sesión.
- Implementar la validación y lógica de autenticación.

**Backend**:
- Crear una ruta de inicio de sesión.
- Implementar un controlador que valide las credenciales.

---

## US-003: Reserva de turnos
**Descripción**:  
Como usuario autenticado, quiero poder seleccionar una fecha y hora para reservar un turno, para que pueda agendar mi sesión de tatuaje.

### Criterios de aceptación:
- El usuario debe poder seleccionar la fecha y la hora del turno.
- Los turnos solo pueden ser reservados dentro del horario de atención (Lunes a Viernes, de 10hs a 16hs).
- El sistema debe permitir múltiples reservas en el mismo horario.
- El usuario debe recibir una confirmación visual en la página una vez que el turno esté reservado.

**Frontend**:
- Implementar un formulario donde el usuario pueda seleccionar fecha y hora.

**Backend**:
- Crear una ruta para gestionar las reservas de turnos.
- Implementar un controlador que valide la disponibilidad de la fecha y hora.
- Almacenar la reserva en la base de datos.

---

## US-004: Cancelación de turnos
**Descripción**:  
Como usuario, quiero poder cancelar un turno reservado hasta un día antes de la fecha, para que pueda liberar la cita si no puedo asistir.

### Criterios de aceptación:
- El usuario debe poder cancelar un turno desde el historial de turnos.
- Solo se permiten cancelaciones hasta un día antes de la fecha del turno.
- El sistema debe actualizar el estado del turno a "cancelado" en la base de datos.

**Frontend**:
- Implementar un botón de cancelación en la interfaz de usuario.
- Mostrar un mensaje de confirmación tras la cancelación exitosa.

**Backend**:
- Crear una ruta para la cancelación de turnos.
- Implementar un controlador que actualice el estado del turno a "cancelado".
- Actualizar la base de datos.

---

## US-005: Perfil del usuario
**Descripción**:  
Como usuario registrado, quiero poder ver mi historial de turnos reservados.

### Criterios de aceptación:
- El usuario debe poder ver una lista de sus turnos reservados (pasados y futuros).

**Frontend**:
- Implementar la interfaz del perfil de usuario con el historial de turnos.

**Backend**:
- Crear una ruta para obtener el historial de turnos del usuario.
