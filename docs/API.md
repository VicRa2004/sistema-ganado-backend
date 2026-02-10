# Documentación de la API

Esta es la documentación de la API para el proyecto `sistema-backend`.

## Estructura Global de Respuesta

Todas las respuestas exitosas de la API siguen este formato JSON estandarizado:

```json
{
  "data": <Object | Array>,  // Los datos solicitados
  "message": "Operation success" // Mensaje informativo
}
```

En caso de error (manejado por middleware global), el formato suele ser:

```json
{
  "message": "Descripción del error",
  "status": 400 // Código HTTP
}
```

---

## Módulos

### 1. Autenticación (Auth)

#### Login

`POST /login`

**Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Respuesta (`data`):**
Objeto con el token y datos del usuario.

```json
{
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "id": 1,
    "fullName": "Juan Perez",
    "userName": "juanp",
    "email": "user@example.com",
    "rol": "ADMIN",
    "emailComfirm": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Register

`POST /register`

**Body:**

```json
{
  "fullName": "Juan Perez",
  "userName": "juanp",
  "email": "user@example.com",
  "password": "password123"
}
```

**Respuesta (`data`):**
Retorna el usuario creado (sin token, debe loguearse o verificar email).

```json
{
  "id": 1,
  "fullName": "Juan Perez",
  "userName": "juanp",
  "email": "user@example.com",
  "rol": "USER",
  "emailComfirm": false,
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

### 2. Ganado (Cattle)

Objeto `Cattle` completo devuelto por la API:

```json
{
  "id": 1,
  "description": "Vaca lechera",
  "gender": "female",
  "registrationNumber": "REG-123",
  "lotNumber": "LOT-55",
  "color": "Negro con blanco",
  "birthdate": "2020-05-15T00:00:00.000Z",
  "observations": "Ninguna",
  "image": "https://url-to-image.com/img.jpg",
  "reasonForWithdrawal": null,
  "status": true,
  "idFather": 10, // null si no tiene
  "idMother": 11, // null si no tiene
  "idIron": 5, // null si no tiene
  "idRace": 2,
  "idUser": 1,
  "idGround": 3, // null si no asignado
  "createdAt": "...",
  "updatedAt": "..."
}
```

#### Listar Ganado (Pagina query)

`GET /cattle/query`

**Query Params:**
`?page=1&limit=10&gender=female&status=1`

**Respuesta (`data`):**

```json
{
  "currentPage": 1,
  "totalItems": 50,
  "limit": 10,
  "totalPages": 5,
  "items": [
    {
      "id": 1,
      "description": "..."
      // ... resto de campos del objeto Cattle
    }
  ]
}
```

#### Obtener un Animal

`GET /cattle/:id`

**Respuesta (`data`):**
Un único objeto `Cattle` (ver estructura arriba).

#### Crear Ganado

`POST /cattle`

**Body (Multipart/form-data):**
Los campos numéricos y booleanos deben enviarse como texto que pueda ser convertido (coerced).

- `description`: string
- `gender`: "male" | "female"
- `registrationNumber`: string
- `lotNumber`: string
- `color`: string
- `birthdate`: string (ISO date)
- `observations`: string
- `status`: "true" | "false" | "1" | "0"
- `idRace`: number
- `idGround`: number (opcional)
- `idFather`: number (opcional)
- `idMother`: number (opcional)
- `idIron`: number (opcional)
- `reasonForWithdrawal`: string (opcional)
- `image`: File (opcional)

**Respuesta (`data`):**
Retorna el objeto `Cattle` creado.

---

### 3. Terrenos (Ground)

Objeto `Ground` completo:

```json
{
  "id": 1,
  "name": "Potrero Norte",
  "image": "https://...",
  "width": 100,
  "length": 200,
  "address": "Zona Norte, Km 5",
  "notes": "Buen pasto",
  "idUser": 1,
  "createdAt": "...",
  "updatedAt": "..."
}
```

#### Listar Terrenos

`GET /ground`

**Respuesta (`data`):**
Array de objetos `Ground`.

```json
[
  { "id": 1, "name": "...", ... },
  { "id": 2, "name": "...", ... }
]
```

#### Crear Terreno

`POST /ground`

**Body (Multipart/form-data):**

- `name`: string
- `width`: number
- `length`: number
- `address`: string
- `notes`: string
- `image`: File (opcional)

**Respuesta (`data`):**
Objeto `Ground` creado.

---

### 4. Fierros (Iron)

Objeto `Iron` completo:

```json
{
  "id": 1,
  "name": "Marca Familia Perez",
  "image": "https://...",
  "idUser": 1,
  "createdAt": "...",
  "updatedAt": "..."
}
```

#### Listar Fierros

`GET /iron`

**Respuesta (`data`):**
Array de objetos `Iron`.

#### Crear Fierro

`POST /iron`

**Body (Multipart/form-data):**

- `name`: string
- `image`: File (opcional)

**Respuesta (`data`):**
Objeto `Iron` creado.

---

### 5. Razas (Race)

Objeto `Race` completo:

```json
{
  "id": 1,
  "name": "Angus",
  "description": "Raza de origen escocés...",
  "image": "https://...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

#### Listar Razas

`GET /race`

**Respuesta (`data`):**
Array de objetos `Race`.

#### Crear Raza (Admin)

`POST /race`

**Body (Multipart/form-data):**

- `name`: string
- `description`: string
- `image`: File (opcional)

**Respuesta (`data`):**
Objeto `Race` creado.
