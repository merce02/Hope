# HOPE — Aprender abre nuevos caminos 🌱

Proyecto de inclusión digital y bienestar social en el barrio del Carmen, Valencia. En colaboración con la **Universitat Politècnica de València (ETSINF)**.

---

## 📁 Estructura del Proyecto

El proyecto está organizado de manera modular y desacoplada, permitiendo **doble modo de ejecución**:
1. **Modo Autónomo Directo (Zero Dependencies)**: Abre directamente `index.html` en cualquier navegador web moderno sin necesidad de instalar Node.js ni herramientas de compilación.
2. **Modo React + TypeScript**: Componentes listos en `src/` para desarrollo con Vite / Next.js.

```text
hope/
├── index.html                 # Punto de entrada HTML5 accesible y completo
├── package.json               # Configuración de dependencias (React 19 + Vite)
├── vite.config.ts             # Configuración de Vite
├── tsconfig.json              # Configuración de TypeScript
├── README.md                  # Documentación del proyecto
│
├── css/
│   └── main.css               # Sistema de diseño con tokens CSS, layout fluido y animaciones
│
├── js/
│   ├── app.js                 # Orquestador principal de la aplicación
│   └── modules/
│       ├── nav.js             # Menú móvil accesible, scroll-spy y cabecera pegajosa
│       ├── aula.js            # Itinerario interactivo, módulos, tareas completables y progreso
│       ├── podcast.js         # Reproductor de audio Web Audio API, ondas animadas y selección de episodios
│       ├── workshops.js       # Tarjetas interactivas de talleres y modal de horarios/objetivos
│       ├── participate.js     # Formulario dinámico multirrol (participante/voluntario/entidad) y avisos
│       └── impact.js          # Animación de contadores de impacto y acordeón de metodología
│
└── src/                       # Código fuente modular en React 19 + TypeScript
    ├── main.tsx               # Entrada de React
    ├── App.tsx                # Componente principal
    ├── types/                 # Interfaces y tipos de TypeScript
    ├── data/                  # Datos estáticos (módulos, talleres, podcast)
    └── components/            # Componentes React divididos por secciones:
        ├── Header.tsx         # Cabecera y navegación
        ├── Hero.tsx           # Sección principal con llamada a la acción y visual
        ├── Purpose.tsx        # Manifiesto y propósito de HOPE
        ├── Workshops.tsx      # Tarjetas de talleres presenciales
        ├── AulaHope.tsx       # Itinerario guiado interactivo
        ├── Podcast.tsx        # Reproductor de podcast "Voces que abren camino"
        ├── Method.tsx         # Proceso en 4 fases (Escuchamos, Diseñamos, Acompañamos, Medimos)
        ├── Impact.tsx         # Métricas de impacto con animación
        ├── ParticipateCTA.tsx # Llamada a la acción final
        ├── ParticipateModal.tsx # Modal de inscripción multirrol con validación
        ├── WorkshopModal.tsx  # Modal de detalle de cada taller
        └── Footer.tsx         # Pie de página y créditos UPV
```

---

## ✨ Flujo Dinámico y Funcionalidades Implementadas

1. **Aula HOPE (Aprendizaje Guiado e Interactivo)**:
   - Pestañas dinámicas para los 3 módulos:
     - *Módulo 1: Mi móvil, mi herramienta* (45 min · Inicial)
     - *Módulo 2: Español para trámites y citas* (60 min · Intermedio)
     - *Módulo 3: Empleo, currículum y autonomía* (90 min · Práctico)
   - **Logros interactivos**: Cada habilidad es un botón que el usuario puede pulsar para marcar como realizada (`+` -> `✓`), con persistencia automática en `localStorage`.
   - **Barra de progreso reactiva**: Se actualiza en tiempo real calculando el avance del módulo activo y el porcentaje de habilidades logradas.
   - **Modal de guía formativa**: Ventana modal con consejos y explicación detallada de cada módulo.

2. **Reproductor de Podcast ("Voces que abren camino")**:
   - **Sintetizador Web Audio API**: Al hacer clic en reproducir se genera un tono ambiental cálido directamente en el navegador, sin depender de servidores externos.
   - **Animación en vivo de las ondas de audio**: Las 15 barras sonoras de la carátula se activan y oscilan al ritmo de la reproducción.
   - **Selector de episodios**: 3 episodios disponibles (*Empezar de nuevo*, *La primera pantalla*, *Redes que sostienen*).
   - **Barra de desplazamiento temporal (Scrubber)** con contador de minutos y segundos.

3. **Talleres con Modal de Inscripción Directa**:
   - Al pulsar en cualquier tarjeta de taller ("Primeros pasos digitales", "Español para conectar", "Empleo y autonomía"), se abre un modal con horarios, ubicación en El Carme, plazas disponibles y objetivos.
   - Botón directo "Inscribirme en este taller" que autocompleta el formulario de participación con el taller escogido.

4. **Flujo de Participación y Captación de Leads**:
   - Modal con selector de rol mediante fichas interactivas:
     - *Quiero aprender* (Participante)
     - *Ser voluntario/a* (Acompañamiento o docencia)
     - *Entidad colaboradora* (Institución o empresa)
   - Validación de campos requeridos y almacenamiento local (`hope_registrations`).
   - Pantalla de confirmación con diseño amigable y notificaciones tipo toast.

5. **Contadores de Impacto y Metodología en Acordeón**:
   - Animación numérica ascendente activada por `IntersectionObserver` al desplazarse hasta la sección de impacto (12 plazas, 1:1 acompañamiento, 4 fases).
   - Acordeón interactivo para las 4 fases del método HOPE con detalles explicativos expandibles.

6. **Navegación Móvil y Accesibilidad**:
   - Menú hamburguesa responsivo para dispositivos móviles y tabletas.
   - Detección de sección activa en la barra de navegación (*scroll-spy*).
   - Soporte para preferencias de movimiento reducido (`prefers-reduced-motion: reduce`).

---

## 🚀 Cómo Ejecutar el Proyecto

### Opción 1: Apertura Directa (Inmediata)
Simplemente haz doble clic en `index.html` o ábrelo en tu navegador favorito (Firefox, Chrome, Edge). ¡Todo funcionará al instante con animaciones, sonido y persistencia de datos!

### Opción 2: Desarrollo con Node.js / Vite (Opcional)
Si deseas trabajar con el entorno React 19:
```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Compilar para producción
npm run build
```

---

## 🎨 Paleta de Color y Tipografía

- `--cream: #f3f0e8` (Fondo cálido y accesible)
- `--paper: #faf8f2` (Tarjetas y superficies claras)
- `--ink: #182823` (Texto principal de alto contraste)
- `--green: #24473e` (Identidad institucional y talleres)
- `--mint: #b7d8c4` (Acentos de frescura y confianza)
- `--coral: #ef6a4c` (Botones de acción, llamadas y destacados)
- Tipografías: **DM Serif Display** (títulos elegantes y editoriales) y **DM Sans** (lectura clara y moderna).
