# Documentación para Agentes de IA

Este documento describe la estructura del proyecto, flujo de trabajo y convenciones de código para ayudar a los agentes de IA a navegar y contribuir al proyecto `sistema-backend`.

## Estructura del Proyecto

El proyecto sigue una arquitectura limpia (Clean Architecture) modularizada.

- **src/app.ts**: Configuración inicial de la aplicación Express.
- **src/index.ts**: Punto de entrada de la aplicación.
- **src/core**: Código compartido y utilidades.
  - **shared**: Lógica de dominio e infraestructura compartida (AggregateRoot, ValueObjects, errores base, configuración HTTP).
  - **container**: Contenedor de dependencias (Service Locator). Aquí se registran repositorios, servicios y casos de uso.
  - **config**: Variables de entorno y configuración de base de datos.
  - **logger**: Utilidad de logging.
- **src/modules**: Módulos de la aplicación (ej: `auth`, `user`, `cattle`). Cada módulo contiene:
  - **domain**: Entidades, Value Objects, Interfaces de Repositorios. (Capa más interna, reglas de negocio puras).
  - **application**: Casos de Uso (UseCases), DTOs, Mappers. (Orquestación).
  - **infrastructure**: Implementación de Repositorios (Prisma), Controladores HTTP, Rutas, Esquemas Zod. (Detalles técnicos).

## Flujo de Trabajo

Para agregar una nueva funcionalidad, sigue este orden:

1.  **Capa de Dominio**: Define las Entidades y la Interfaz del Repositorio.
2.  **Capa de Aplicación**: Implementa los Casos de Uso.
3.  **Capa de Infraestructura**:
    - Implementa el Repositorio con Prisma.
    - Crea los Controladores y Rutas.
    - Define esquemas de validación Zod.
4.  **Registro**: Registra los nuevos repositorios y casos de uso en `src/core/container`.

## Dependencias Principales

- **Runtime**: Node.js
- **Lenguaje**: TypeScript
- **Framework Web**: Express
- **ORM**: Prisma (PostgreSQL)
- **Validación**: Zod
- **Logging**: Pino, Morgan (HTTP)
- **Autenticación**: JSON Web Token (JWT), Bcrypt.js
- **Email**: Nodemailer

## Ejemplos de Código Completos

A continuación se presenta un ejemplo completo de cómo estructurar una funcionalidad "User".

### 1. Dominio (Domain)

**Entidad (`src/modules/user/domain/User.ts`)**
Definimos la entidad usando `AggregateRoot` y Value Objects.

```typescript
import { AggregateRoot } from "@/core/shared/domain/AggregateRoot";
import { StringValue } from "@/core/shared/domain/value-objects/StringValue";
import { Id } from "@/core/shared/domain/value-objects/Id";
// Otros imports...

export class User extends AggregateRoot {
  private constructor(
    id: Id,
    private fullName: StringValue,
    private email: Email,
    // ... otros campos
    createdAt: DateValue,
    updatedAt: DateValue,
  ) {
    super(id, createdAt, updatedAt);
  }

  static create(props: UserProps) {
    return new User(
      Id.create(props.id),
      StringValue.create(props.fullName),
      Email.create(props.email),
      // ...
      DateValue.create(props.createdAt),
      DateValue.create(props.updatedAt),
    );
  }

  // Getters de dominio (retornan primitivos)
  getFullName() {
    return this.fullName.getValue();
  }
}
```

**Interfaz del Repositorio (`src/modules/user/domain/UserRepository.ts`)**

```typescript
import { Pagination } from "@/core/shared/domain/Pagination";
import { User } from "./User";

export interface UserRepository {
  find(filters: UserFilters): Promise<Pagination<User>>;
  findById(id: number): Promise<User | null>;
  create(user: User): Promise<User>;
}
```

### 2. Aplicación (Application)

**Caso de Uso (`src/modules/user/application/UserCreate.ts`)**
Recibe dependencias en el constructor e implementa la lógica.

```typescript
export class UserCreate {
  constructor(
    private repository: UserRepository,
    private hasher: PasswordHasher,
  ) {}

  async run(data: UserCreateDTO) {
    const password = await this.hasher.hash(data.password);

    // Crear la entidad
    const user = User.create({
      ...data,
      password,
      emailConfirm: false,
    });

    // Persistir
    const userCreated = await this.repository.create(user);

    // Retornar DTO
    return UserMapper.toDTO(userCreated);
  }
}
```

### 3. Infraestructura (Infrastructure)

**Implementación del Repositorio (`src/modules/user/infrastructure/repositories/PrismaUserRepository.ts`)**
Implementa la interfaz del dominio usando Prisma. Es responsable de mapear de Prisma -> Dominio.

```typescript
import { prisma } from "@/core/config/prisma";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export class PrismaUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    const item = await prisma.user.create({
      data: {
        fullname: user.getFullName(),
        email: user.getEmail(),
        // ... mapeo de Dominio a DB
      },
    });

    // Mapeo de DB a Dominio
    return User.create({
      id: item.id,
      fullName: item.fullname,
      email: item.email,
      // ...
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  }

  // Implementar otros métodos...
}
```

**Controlador HTTP (`src/modules/user/infrastructure/http/ExpressUserController.ts`)**
Maneja la petición HTTP, invoca el caso de uso desde el `container` y responde.

```typescript
import { Request, Response, NextFunction } from "express";
import { container } from "@/core/container"; // Acceso al contenedor global
import { userCreateSchema } from "../schemas/userCreateSchema";
import { responseController } from "@/core/shared/infrastructure/response.controller";

export class ExpressUserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // 1. Validar entrada con Zod
      const { body } = userCreateSchema.parse(req);

      // 2. Ejecutar caso de uso desde el container
      const data = await container.user.create.run(body);

      // 3. Responder usando el helper estándar
      responseController({
        res,
        data,
        status: 201,
      });
    } catch (error) {
      next(error); // Middleware de error global manejará esto
    }
  }
}
```

**Router (`src/modules/user/infrastructure/http/ExpressUserRouter.ts`)**

```typescript
import { Router } from "express";
import { ExpressUserController } from "./ExpressUserController";

const ExpressUserRouter = Router();
const controller = new ExpressUserController();

ExpressUserRouter.post("/", controller.create);
ExpressUserRouter.get("/", controller.getAll);

export { ExpressUserRouter };
```

### 4. Inyección de Dependencias (Container)

Finalmente, todo se conecta en `src/core/container`.

**Repositorios (`src/core/container/repositories.ts`)**

```typescript
import { PrismaUserRepository } from "@/modules/user/infrastructure/repositories/PrismaUserRepository";

export const repositories = {
  user: new PrismaUserRepository(),
  // ...
};
```

**Casos de Uso (`src/core/container/usecases/user.ts`)**

```typescript
import { UserCreate } from "@/modules/user/application/UserCreate";
import { repositories } from "../repositories";
import { services } from "../services";

export const userUseCases = {
  create: new UserCreate(repositories.user, services.hasher),
  // ...
};
```

**Índice (`src/core/container/index.ts`)**

```typescript
import { userUseCases } from "./usecases/user";

export const container = {
  user: userUseCases,
  // ...
};
```

## Reglas Generales

- **Rutas**: Usa alias `@/` para imports.
- **Idiomas**: Código en Inglés, Comentarios en Español.
- **ResponseController**: Siempre usa `responseController` para enviar respuestas JSON estandarizadas.
- **Manejo de Errores**: Usa `try/catch` en los controladores y pasa el error a `next(error)`.
- **Container Global**: Los controladores importan el objeto `container` directamente para ejecutar casos de uso.
- **Mappers**: Usa clases estáticas Mapper en la capa de aplicación para convertir Entidades a DTOs.
