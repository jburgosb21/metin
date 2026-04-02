# Metin Backend

API REST para la aplicación de productividad RPG "Metin". Desarrollada con Node.js, Express, Prisma ORM y PostgreSQL.

## Características

- Autenticación JWT con registro y login
- Modelos: User y Task con enums para tipo y dificultad
- Game engine: completar tareas otorga EXP y oro según dificultad
- Sistema de nivelación: EXP requerida = Nivel² × 50
- API RESTful con middleware de autenticación
- CORS configurado para frontend de Netlify
- Despliegue compatible con Render y Neon DB

## Requisitos

- Node.js 18+
- PostgreSQL (Neon DB recomendado)
- npm o yarn

## Configuración

1. Clonar repositorio
2. Instalar dependencias:
   ```bash
   cd backend
   npm install
   ```
3. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   ```
   Editar `.env` con tus credenciales:
   ```
   DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=require"
   JWT_SECRET="tu-secreto-super-seguro"
   PORT=3001
   FRONTEND_URL="https://tu-app.netlify.app"
   ```
4. Inicializar base de datos:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. Ejecutar en desarrollo:
   ```bash
   npm run dev
   ```

## Despliegue en Render

1. Crear nueva Web Service en Render
2. Conectar repositorio GitHub
3. Configurar variables de entorno en Render Dashboard
4. Build Command: `npm install && npx prisma generate`
5. Start Command: `npm start`
6. Usar Neon DB para PostgreSQL

## Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión

### Tareas (requieren autenticación)
- `GET /api/tasks` - Obtener todas las tareas del usuario
- `GET /api/tasks/type/:type` - Obtener tareas por tipo (habit, daily, todo)
- `POST /api/tasks` - Crear nueva tarea
- `PUT /api/tasks/:id` - Actualizar tarea
- `PATCH /api/tasks/:id/complete` - Completar tarea (game engine)
- `DELETE /api/tasks/:id` - Eliminar tarea

### Usuario
- `GET /api/users/me` - Obtener stats del usuario actual
- `PATCH /api/users/stats` - Actualizar stats (debug)

## Modelos

### User
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  username  String   @unique
  level     Int      @default(1)
  hp        Int      @default(100)
  exp       Int      @default(0)
  gold      Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  tasks     Task[]
}
```

### Task
```prisma
model Task {
  id          String     @id @default(cuid())
  title       String
  type        TaskType   // habit, daily, todo
  difficulty  Difficulty // ONE, TWO, THREE, FOUR
  completed   Boolean    @default(false)
  userId      String
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

## Fórmulas del juego

- **Recompensas por dificultad**:
  - ONE: 10 EXP, 5 oro
  - TWO: 25 EXP, 15 oro
  - THREE: 50 EXP, 30 oro
  - FOUR: 100 EXP, 60 oro

- **Nivelación**: `EXP_requerida = Nivel^2 × 50`
- Al subir de nivel: HP se restaura a 100

## Licencia

MIT