# Skills Hub — Plataforma de Descubrimiento de Talento y Ofertas Competitivas

**Skills Hub** es una plataforma web full-stack para contratar por habilidades, no por títulos. Cada profesional publica una compensación base cerrada y a propósito más baja, en la moneda de su país. La empresa convierte ese piso a dólares con la **[Frankfurter API](https://frankfurter.dev/)** (ARS, BRL, CAD, CLP, COP, CRC, EUR, MXN, PEN, USD y UYU) y puede enviar una oferta un poco más alta. Esa diferencia es la subasta: el talento no sale al precio mínimo, y la empresa compite con una propuesta concreta.

---

## Enlaces de Despliegue (Producción)

* **Aplicación Front End (Vercel): Proximamente**
* **API Back End : Proximamente**

---

## Qué Hace Skills Hub

* **Descubrimiento de talento:** Búsqueda de profesionales por habilidad, categoría o ubicación.
* **Compensación base:** Cada perfil muestra un piso mensual cerrado en su moneda local. No es el precio final: es el mínimo desde el que puede empezar una oferta.
* **Presupuesto en dólares:** El convertidor toma ese monto y la tasa del día, y muestra cuántos dólares necesita la empresa. También lista la fecha y la tasa de cada moneda.
* **Oferta por encima del piso:** La empresa ofrece un poco más que esa base en dólares. El talento podrá evaluar, aceptar, rechazar o negociar. Enviar y guardar la oferta llega en la etapa full stack; el frontend ya deja ver el piso y calcular el presupuesto.
* **Alcance global:** Un perfil en pesos colombianos y otro en euros se comparan en la misma moneda, así la empresa no adivina si una cifra local es alta o baja.

---

## Para Quién Es y Qué Problema Resuelve

Contratar entre países se traba en la compensación. Cada profesional habla en su moneda, las cifras no se pueden comparar a simple vista y una empresa termina ofreciendo de menos o pagando de más. Skills Hub separa el piso de la oferta: la base publicada es baja y clara, y la propuesta en dólares tiene que superarla. Así la empresa sabe el mínimo real y el profesional recibe una puja, no un número opaco.

* **Empresas y reclutadores:** Encuentran gente por lo que sabe hacer y arman una oferta en dólares a partir de un piso visible, en vez de negociar a ciegas entre monedas.
* **Profesionales:** Publican una expectativa base en su moneda y quedan en posición de recibir una oferta mejor, para evaluarla, aceptarla, rechazarla o negociarla.

---

## Roadmap por Etapas

### Front End (Rama `stage-frontend`)
* **Tipos, Constantes y Datos Iniciales:** Interfaces de TypeScript (perfil de talento, `CurrencyRates` y cotizaciones), constantes de configuración y perfiles con compensación base cerrada e identificadores únicos.
* **Servicio de Divisas (`utils/currencyApi.ts`):** Consulta asíncrona tipada a la **[Frankfurter API](https://frankfurter.dev/)** con manejo explícito de errores HTTP, formato y red.
* **Navegación y Vistas:** Barra superior responsiva (`320px` a `1440px`) con **React Router**, vista de introducción (`/`), vista de exploración con buscador (`required` + `placeholder`), selector de moneda y resultados en la misma página, tarjetas en cuadrícula (`Flex`/`Grid`) y vista *"Sobre el autor"* (`/about`).


---

## Stack Tecnológico

* **Front End (`client/`):** React, TypeScript, Vite, React Router DOM, Vanilla CSS (BEM), `normalize.css`.
* **Back End (`server/`):** Node.js, Express, TypeScript, MongoDB / Mongoose, autenticación y validación en servidor.
* **API Externa:** **[Frankfurter Currency Exchange API](https://api.frankfurter.dev/)**.

---

## Estructura del Repositorio

```text
project-skillshub/
├── client/                 # Aplicación Front End (React + TypeScript + Vite)
│   ├── src/
│   │   ├── components/     # Componentes reutilizables (Header, SearchBar, TalentCard, etc.)
│   │   ├── pages/          # Vistas principales (Home, Explorar, About)
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