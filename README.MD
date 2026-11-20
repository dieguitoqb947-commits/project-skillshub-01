# SkillsHub — Plataforma de Subasta de Habilidades y Micro-Mentorías

**SkillsHub** es una aplicación web full-stack diseñada para conectar a profesionales, mentores y estudiantes que desean ofrecer o adquirir micro-mentorías, asesorías técnicas y servicios especializados mediante un sistema dinámico de subastas. 

Los usuarios pueden explorar habilidades por categoría, consultar pujas base convertidas en tiempo real a su moneda local (USD, COP, EUR, MXN) mediante la **API de Frankfurter**, y gestionar sus propias subastas en una cuenta protegida.

---

## Enlaces de Despliegue (Producción)

* **Aplicación Front End (Vercel):** `[Pega aquí tu URL de Vercel una vez desplegada]`
* **API Back End (Render / Railway):** `[Pega aquí tu URL del servidor en Etapa 2]`

---

## Características Principales por Etapa

### Etapa 1: Aplicación Front End (`stage-frontend`)
* **Exploración y Búsqueda en Vivo:** Filtrado por palabras clave y categorías (*Tecnología, Idiomas, Diseño, Negocios*).
* **Conversión de Divisas en Tiempo Real (3rd-Party API):** Consumo tipado con `fetch()` de [Frankfurter API](https://www.frankfurter.app/) para recalcular instantáneamente los montos de las pujas entre **USD, COP, EUR y MXN**.
* **Paginación Progresiva:** Carga controlada de resultados mediante el botón *"Cargar más"* y manejo de estados vacíos.
* **Vista Detallada (Modal Accesible):** Apertura de detalles de cada subasta con cierre mediante botón, clic externo o tecla `Escape`.
* **Diseño Responsivo y Semántico:** Maquetación en **Vanilla CSS** (metodología BEM + `normalize.css`) adaptada desde `320px` hasta `1440px` sin desplazamiento horizontal.
* **Página "Sobre el autor" (`/about`):** Información sobre el creador del proyecto y su enfoque técnico.

### Etapa 2: Aplicación Full Stack (`stage-fullstack`)
* **Autenticación y Autorización con JWT:** Registro (`POST /signup`), inicio de sesión (`POST /signin`) y persistencia de sesión mediante `localStorage` y `CurrentUserContext`.
* **Gestión de Subastas Propias (`/my-skills`):** Ruta protegida donde cada usuario autenticado puede publicar nuevas habilidades (`POST /skills`) y eliminar únicamente sus propios registros (`DELETE /skills/:id`).
* **Seguridad y Validación en Servidor:** Contraseñas encriptadas con `bcryptjs`, validación de esquemas en Mongoose/controladores, limitador de peticiones (`express-rate-limit`) y manejo centralizado de errores.

---

## Stack Tecnológico

* **Front End (`client/`):** React, TypeScript, Vite, React Router DOM, Vanilla CSS (BEM), `normalize.css`.
* **Back End (`server/`):** Node.js, Express, TypeScript, MongoDB Atlas, Mongoose, JSON Web Tokens (`jsonwebtoken`), `bcryptjs`.
* **API Externa:** [Frankfurter Currency Exchange API](https://api.frankfurter.app/).

---

## Estructura del Repositorio

```text
final-project/
├── client/                 # Aplicación Front End (React + TypeScript + Vite)
│   ├── src/
│   │   ├── components/     # Componentes reutilizables y sus hojas de estilo
│   │   ├── context/        # CurrentUserContext (Etapa 2)
│   │   ├── pages/          # Vistas principales (Home, About, MySkills)
│   │   ├── types/          # Interfaces y tipos globales de TypeScript
│   │   ├── utils/          # Peticiones API (currencyApi, mainApi), constantes y datos
│   │   └── vendor/         # normalize.css y configuración de fuentes
│   └── .env.example
├── server/                 # API REST (Express + TypeScript + MongoDB)
│   ├── src/
│   │   ├── controllers/    # Lógica de usuarios y subastas de habilidades
│   │   ├── middlewares/    # Autenticación JWT, validación y manejo de errores
│   │   ├── models/         # Esquemas de Mongoose (User, SkillAuction)
│   │   └── routes/         # Definición de endpoints REST
│   └── .env.example
├── package.json            # Scripts raíz para instalar y levantar cliente/servidor
└── README.md