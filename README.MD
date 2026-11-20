# Skills Hub — Plataforma de Descubrimiento de Talento y Ofertas Competitivas

**Skills Hub** es una plataforma web full-stack diseñada para conectar empresas con profesionales calificados de todo el mundo. Permite a las organizaciones buscar talento según habilidades concretas, explorar perfiles profesionales, comparar expectativas de compensación convertidas en tiempo real mediante la **[Frankfurter API](https://www.frankfurter.app/)** (`USD`, `COP`, `EUR`, `MXN`) y presentar ofertas competitivas.

---

## Enlaces de Despliegue (Producción)

* **Aplicación Front End (Vercel):** `[Pega aquí tu URL de Vercel una vez desplegada]`
* **API Back End (Render / Railway):** `[Pega aquí tu URL del servidor en las etapas de Back End]`

---

## Qué Hace Skills Hub

* **Descubrimiento de Talento:** Búsqueda de profesionales por habilidades, categorías y ubicación.
* **Perfiles Profesionales:** Consulta de habilidades clave, experiencia, portafolios, disponibilidad y compensación base.
* **Ofertas Competitivas:** Posibilidad de que las empresas envíen propuestas de compensación para que el talento evalúe, acepte, rechace o negocie oportunidades.
* **Conversión de Divisas en Tiempo Real:** Integración tipada con `fetch()` a la **[Frankfurter API](https://www.frankfurter.app/)** para interpretar valores de compensación entre distintas monedas.
* **Alcance Global:** Conexión directa entre empleadores y profesionales across distintos países y mercados.

---

## Para Quién Es y Qué Problema Resuelve

* **Empresas y reclutadores:** Buscan, comparan y contratan profesionales por lo que saben hacer en la práctica, más allá de los títulos tradicionales o procesos rígidos.
* **Freelancers y especialistas:** Ganan visibilidad internacional, transparencia en compensaciones y un mecanismo de ofertas competitivas para evaluar oportunidades.

---

## Roadmap por Etapas

### Front End (Rama `stage-frontend`)
* **Tipos, Constantes y Datos Iniciales:** Interfaces de TypeScript (`SkillAuction` / perfil de talento, `CurrencyRates`), constantes de configuración y conjuntos de datos con IDs únicos.
* **Servicio de Divisas (`utils/currencyApi.ts`):** Consulta asíncrona tipada a la **[Frankfurter API](https://www.frankfurter.app/)** con manejo explícito de errores HTTP, formato y red.
* **Navegación y Vistas:** Barra superior responsiva (`320px` a `1440px`) con **React Router**, vista de introducción (`/`), vista de exploración con buscador (`required` + `placeholder`), selector de moneda y resultados en la misma página, tarjetas en cuadrícula (`Flex`/`Grid`) y vista *"Sobre el autor"* (`/about`).

### Back End y Conexión Full Stack (Rama `stage-fullstack`)
* **API REST y Persistencia:** Endpoints en Node.js / Express y base de datos para perfiles, habilidades y gestión de ofertas.
* **Autenticación y Autorización:** Control de acceso de usuarios, rutas protegidas y validación de datos en servidor.

---

## Stack Tecnológico

* **Front End (`client/`):** React, TypeScript, Vite, React Router DOM, Vanilla CSS (BEM), `normalize.css`.
* **Back End (`server/`):** Node.js, Express, TypeScript, MongoDB / Mongoose, autenticación y validación en servidor.
* **API Externa:** **[Frankfurter Currency Exchange API](https://api.frankfurter.app/)**.

---

## Estructura del Repositorio

```text
project-skillshub/
├── client/                 # Aplicación Front End (React + TypeScript + Vite)
│   ├── src/
│   │   ├── components/     # Componentes reutilizables (Header, SearchBar, SkillCard, etc.)
│   │   ├── pages/          # Vistas principales (Home, Explorar/Subastas, About)
│   │   ├── types/          # Interfaces y tipos globales de TypeScript
│   │   ├── utils/          # currencyApi, constants, datos iniciales y helpers
│   │   └── vendor/         # normalize.css y estilos base
│   └── .env.example
├── server/                 # API REST y lógica full-stack
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── routes/
│   └── .env.example
├── package.json
└── README.md