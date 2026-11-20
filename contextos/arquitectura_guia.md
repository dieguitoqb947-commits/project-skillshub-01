Tecnologías obligatorias:
- Frontend: React, React DOM, Vite y React Router DOM.
- Backend: Node.js y Express como API REST.
- Persistencia: MongoDB con Mongoose.
- Autenticación: JWT con jsonwebtoken y contraseñas protegidas con bcryptjs.
- Configuración: dotenv.
- Comunicación entre cliente y servidor: CORS.
- Protección contra exceso de solicitudes: express-rate-limit.
- Desarrollo del servidor: tsx con recarga automática.
- Calidad: ESLint; Prettier en el servidor.
- Estilos: CSS tradicional, sin incorporar frameworks CSS.
- Usa versiones actuales compatibles entre sí y registra las dependencias en
  los package.json correspondientes.

Estructura del repositorio:

/
├── package.json
├── README.md
├── client/
│   ├── public/
│   │   ├── blocks/
│   │   ├── images/
│   │   └── vendor/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── [COMPONENTES PRINCIPALES POR FUNCIONALIDAD]/
│   │   │   └── ProtectedRoute/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── interfaces/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── .env.example
│   ├── eslint.config.js
│   ├── vite.config.ts
│   └── tsconfig*.json
└── server/
    ├── src/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   ├── types/express/
    │   └── app.ts
    ├── .env.example
    ├── eslint.config.js
    └── tsconfig.json