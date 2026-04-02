# 🎮 Metin - RPG Productivity App

**Metin** es una aplicación full-stack de productividad gamificada inspirada en RPG clásicos. Convierte tus tareas diarias en misiones épicas y sube de nivel mientras progresas en la vida real.

## 🏰 Arquitectura del Proyecto

El proyecto está dividido en dos repositorios independientes:

### 🔧 Backend (Node.js + Prisma)
- **API REST** desplegada en Render
- **PostgreSQL** con Neon DB
- **Prisma ORM** para gestión de base de datos
- **JWT + bcryptjs** para autenticación segura
- **Game engine** con sistema de nivelación y recompensas
- **CORS** configurado para Netlify

### 🎨 Frontend (React + Tailwind CSS)
- **SPA React** desplegada en Netlify
- **React Context API** para gestión de estado
- **Tailwind CSS** con tema dark mode RPG
- **Componentes RPG**: StatBar, LevelBadge, TaskColumn
- **Axios** con interceptores para autenticación automática
- **React Router** con rutas privadas

## 🚀 Despliegue Rápido

### Backend en Render
1. Conectar repositorio a Render
2. Configurar variables de entorno:
   - `DATABASE_URL`: URL de Neon PostgreSQL
   - `JWT_SECRET`: Clave secreta para JWT
   - `FRONTEND_URL`: URL de tu frontend en Netlify
3. Render automáticamente ejecutará:
   - `npm install && npx prisma generate`
   - `npm start`

### Frontend en Netlify
1. Conectar repositorio a Netlify
2. Configurar variable de entorno:
   - `REACT_APP_API_URL`: URL de tu backend en Render
3. Netlify construirá con:
   - `npm run build`

## 🎯 Características Principales

### Game Engine
- **Fórmula de nivelación**: `EXP_requerida = Nivel² × 50`
- **Recompensas por dificultad**:
  - Fácil: 10 EXP, 5 oro
  - Normal: 25 EXP, 15 oro
  - Difícil: 50 EXP, 30 oro
  - Épico: 100 EXP, 60 oro
- **Al subir de nivel**: HP se restaura a 100

### Tipos de Tareas
- **Hábitos**: Rutinas repetibles (ej: ejercicio diario)
- **Diarias**: Tareas que renuevan cada día (ej: leer 30 min)
- **Pendientes**: Tareas únicas (ej: proyecto importante)

### Interfaz RPG
- **Dark mode** con paleta de colores de juegos clásicos
- **Barras animadas** de HP y EXP
- **Insignias de nivel** con efectos visuales
- **Columnas de tareas** organizadas por tipo
- **Notificaciones** de recompensas al completar tareas

## 🗄️ Modelos de Datos

### Usuario (`User`)
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
  tasks     Task[]
}
```

### Tarea (`Task`)
```prisma
model Task {
  id          String     @id @default(cuid())
  title       String
  type        TaskType   // habit, daily, todo
  difficulty  Difficulty // ONE, TWO, THREE, FOUR
  completed   Boolean    @default(false)
  userId      String
  user        User       @relation(fields: [userId], references: [id])
}
```

## 🔌 Endpoints del Backend

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión

### Tareas (requieren token JWT)
- `GET /api/tasks` - Todas las tareas del usuario
- `POST /api/tasks` - Crear nueva tarea
- `PATCH /api/tasks/:id/complete` - Completar tarea (game engine)
- `PUT /api/tasks/:id` - Actualizar tarea
- `DELETE /api/tasks/:id` - Eliminar tarea

### Usuario
- `GET /api/users/me` - Obtener stats del usuario
- `PATCH /api/users/stats` - Actualizar stats (debug)

## 🎨 Componentes del Frontend

### `AuthContext`
- Gestiona autenticación JWT y estado del usuario
- Interceptores de Axios para incluir token automáticamente
- Actualización en tiempo real de stats

### `StatBar`
- Barras animadas para HP y EXP
- Efectos de shimmer y transiciones
- Cálculo automático de porcentajes

### `TaskColumn`
- Columnas organizadas por tipo de tarea
- Formulario integrado para añadir tareas
- Filtros de dificultad visuales

### `LevelBadge`
- Insignia de nivel con efectos de gradiente
- Diseño inspirado en juegos RPG
- Tamaños responsive

## 📁 Estructura de Carpetas

```
metin/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── utils/
│   ├── render.yaml
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── contexts/
    │   └── pages/
    ├── netlify.toml
    └── package.json
```

## 🛠️ Desarrollo Local

### Backend
```bash
cd backend
npm install
cp .env.example .env  # Configurar variables
npx prisma generate
npx prisma db push
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 🌐 Variables de Entorno

### Backend (`.env`)
```env
DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=require"
JWT_SECRET="your-super-secret-jwt-key"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

### Frontend (`.env`)
```env
REACT_APP_API_URL="http://localhost:3001/api"
```

## 📚 Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **Prisma** - ORM para PostgreSQL
- **JWT** - Tokens de autenticación
- **bcryptjs** - Hash de contraseñas
- **CORS** - Middleware para peticiones cross-origin

### Frontend
- **React** - Biblioteca de UI
- **Tailwind CSS** - Framework de estilos
- **React Router** - Navegación
- **Axios** - Cliente HTTP
- **Context API** - Gestión de estado

### DevOps
- **Render** - Despliegue del backend
- **Netlify** - Despliegue del frontend
- **Neon** - PostgreSQL serverless
- **Git** - Control de versiones

## 🎮 Cómo Jugar

1. **Regístrate** como nuevo aventurero
2. **Crea misiones** (tareas) con diferentes dificultades
3. **Completa misiones** para ganar EXP y oro
4. **Sube de nivel** cuando tengas suficiente EXP
5. **Monitorea tu progreso** con las barras de HP y EXP
6. **Acumula oro** para futuras características (tienda, mejoras)

## 📈 Fórmulas del Juego

### Nivelación
```
EXP_requerida = Nivel_actual² × 50
```

### Recompensas
| Dificultad | EXP  | Oro |
|------------|------|-----|
| Fácil      | 10   | 5   |
| Normal     | 25   | 15  |
| Difícil    | 50   | 30  |
| Épico      | 100  | 60  |

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

## ✨ Créditos

Desarrollado con ❤️ para convertir la productividad en una aventura épica.

---
**¡Convierte tus tareas en misiones y tu vida en una aventura!** 🚀