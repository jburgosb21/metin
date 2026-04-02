# Metin Frontend

Aplicación React para la productividad RPG "Metin". Desarrollada con React, Tailwind CSS y Context API.

## Características

- Diseño "Dark Mode" inspirado en interfaces RPG clásicos
- Sistema de autenticación con JWT usando React Context API
- Barras de estadísticas animadas (HP/EXP)
- Columnas de tareas organizadas por tipo (Hábitos, Diarias, Pendientes)
- Game engine en tiempo real: completar tareas otorga EXP y oro
- Interfaz responsiva y optimizada para móviles
- Comunicación con backend mediante Axios con interceptores
- Despliegue compatible con Netlify

## Requisitos

- Node.js 18+
- Backend Metin desplegado (Render + Neon DB)
- npm o yarn

## Configuración

1. Clonar repositorio
2. Instalar dependencias:
   ```bash
   cd frontend
   npm install
   ```
3. Configurar variables de entorno:
   ```bash
   cp .env.example .env
   ```
   Editar `.env` con la URL de tu backend:
   ```
   REACT_APP_API_URL=https://tu-backend.onrender.com/api
   ```
4. Ejecutar en desarrollo:
   ```bash
   npm start
   ```

## Despliegue en Netlify

1. Conectar repositorio GitHub a Netlify
2. Configurar variables de entorno en Netlify Dashboard:
   - `REACT_APP_API_URL`: URL de tu backend en Render
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
4. Desplegar

## Estructura del Proyecto

```
src/
├── components/
│   ├── Layout.js          # Layout principal con navbar
│   ├── Navbar.js          # Barra de navegación con stats
│   ├── StatBar.js         # Barras de HP/EXP animadas
│   ├── LevelBadge.js      # Insignia de nivel con efectos
│   ├── TaskColumn.js      # Columna de tareas por tipo
│   └── TaskCard.js        # Tarjeta individual de tarea
├── contexts/
│   └── AuthContext.js     # Contexto de autenticación y API
├── pages/
│   ├── Login.js           # Página de inicio de sesión
│   ├── Register.js        # Página de registro
│   └── Dashboard.js       # Dashboard principal
├── App.js                 # Configuración de rutas
└── index.js               # Punto de entrada
```

## Componentes Principales

### AuthContext
- Gestiona autenticación JWT y estado del usuario
- Configura interceptores de Axios para incluir token automáticamente
- Actualiza stats en tiempo real cuando se completan tareas

### StatBar
- Barras animadas para HP y EXP
- Efectos de shimmer y transiciones suaves
- Porcentaje dinámico basado en valores actuales/máximos

### TaskColumn
- Columnas organizadas por tipo de tarea (hábitos, diarias, pendientes)
- Formulario integrado para añadir nuevas tareas
- Filtros de dificultad (Fácil, Normal, Difícil, Épico)

### TaskCard
- Tarjeta individual con toda la información de la tarea
- Acciones: completar, editar, eliminar
- Muestra recompensas según dificultad
- Integración con game engine al completar

## Game Engine Frontend

El frontend se integra con el backend para:

1. **Completar tareas**: Envía petición PATCH a `/tasks/:id/complete`
2. **Recibir recompensas**: Calcula EXP y oro según dificultad
3. **Actualizar stats**: Actualiza barras de HP/EXP en tiempo real
4. **Nivelación**: Muestra notificaciones al subir de nivel

## Estilos

- **Tailwind CSS** con configuración personalizada
- **Dark Mode RPG**: Colores oscuros con acentos púrpura y verde
- **Animaciones**: Transiciones suaves y efectos de shimmer
- **Responsive**: Diseño adaptativo para móviles y desktop
- **Fuentes**: "Press Start 2P" para elementos RPG, "Roboto Mono" para texto

## Variables de Entorno

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `REACT_APP_API_URL` | URL del backend | `http://localhost:3001/api` |

## Scripts Disponibles

- `npm start`: Ejecuta en modo desarrollo
- `npm run build`: Crea build para producción
- `npm test`: Ejecuta tests
- `npm run eject`: Expone configuración de webpack (irreversible)

## Integración con Backend

El frontend espera un backend con:

- Endpoint POST `/auth/login` para inicio de sesión
- Endpoint POST `/auth/register` para registro
- Endpoint GET `/tasks` para obtener tareas
- Endpoint PATCH `/tasks/:id/complete` para completar tareas
- Endpoint GET `/users/me` para obtener stats del usuario

## Licencia

MIT