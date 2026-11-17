import { AulaModule, Workshop, PodcastEpisode } from "../types";

export const AULA_MODULES: AulaModule[] = [
  {
    id: 1,
    title: "Mi móvil, mi herramienta",
    duration: "45 min",
    level: "Inicial",
    summary: "Aprende a configurar tu teléfono, conectarte a una red y reconocer los ajustes que utilizas cada día.",
    details: "En este módulo aprenderás paso a paso a encender y personalizar el brillo, tamaño de letra, conectar el wifi del centro o tu hogar, y verificar las llamadas y mensajes sin temor a equivocarte.",
    skills: [
      { id: "m1-s1", text: "Ajustes básicos y volumen" },
      { id: "m1-s2", text: "Conexión a red wifi segura" },
      { id: "m1-s3", text: "Ajustes de accesibilidad y texto grande" },
      { id: "m1-s4", text: "Gestión de contactos y llamadas" }
    ],
    tips: [
      "No compartas tus contraseñas por mensajes de texto.",
      "Ajusta el tamaño de la letra para no cansar la vista.",
      "Revisa siempre el icono de candado al navegar."
    ]
  },
  {
    id: 2,
    title: "Español para trámites y citas",
    duration: "60 min",
    level: "Intermedio",
    summary: "Conversación práctica y vocabulario cotidiano para ganar confianza en trámites, citas del médico y vida diaria.",
    details: "Adquiere soltura y seguridad con las palabras clave que se emplean en citas sanitarias, portales municipales y correos oficiales, practicando diálogos en situaciones reales.",
    skills: [
      { id: "m2-s1", text: "Pedir cita previa online" },
      { id: "m2-s2", text: "Vocabulario de formularios y gestiones" },
      { id: "m2-s3", text: "Interprerar notificaciones y SMS" },
      { id: "m2-s4", text: "Redactar correos breves y claros" }
    ],
    tips: [
      "Guarda captura de pantalla del justificante o código de cita.",
      "Si no entiendes una palabra técnica, pide que te la expliquen sin miedo.",
      "Anota la fecha en tu calendario móvil con recordatorio."
    ]
  },
  {
    id: 3,
    title: "Empleo, currículum y autonomía",
    duration: "90 min",
    level: "Práctico",
    summary: "Crear un CV adaptado, buscar oportunidades en portales de empleo y realizar gestiones de forma independiente.",
    details: "Te acompañamos a estructurar tu experiencia, redactar un currículum atractivo y directo, crear un perfil en plataformas laborales y preparar respuestas clave para entrevistas.",
    skills: [
      { id: "m3-s1", text: "Estructura clara de un CV digital" },
      { id: "m3-s2", text: "Búsqueda en portales de empleo fiables" },
      { id: "m3-s3", text: "Adjuntar archivos PDF en solicitudes" },
      { id: "m3-s4", text: "Preparar videollamadas de selección" }
    ],
    tips: [
      "Mantén tus datos de contacto actualizados.",
      "Destaca tus habilidades prácticas y experiencia previa.",
      "Pide a tu tutor/a de HOPE que revise el borrador antes de enviarlo."
    ]
  }
];

export const WORKSHOPS: Workshop[] = [
  {
    id: 1,
    num: "01",
    title: "Primeros pasos digitales",
    description: "Manejar el móvil, navegar con seguridad y resolver tareas cotidianas sin miedo.",
    schedule: "Lunes y Miércoles · 10:00 a 11:30",
    location: "Centro El Carme, Calle Museu, Valencia",
    spotsAvailable: 4,
    objectives: [
      "Perder el temor a pulsar y configurar el dispositivo móvil.",
      "Identificar enlaces seguros y evitar fraudes o estafas por SMS/WhatsApp.",
      "Usar herramientas útiles: cámara, notas de voz, mapas y correo.",
      "Conectar con familiares y amigos mediante videollamadas."
    ]
  },
  {
    id: 2,
    num: "02",
    title: "Español para conectar",
    description: "Conversación práctica para ganar confianza en trámites, entrevistas y vida diaria.",
    schedule: "Martes y Jueves · 17:00 a 18:30",
    location: "Centro El Carme, Calle Museu, Valencia",
    spotsAvailable: 3,
    objectives: [
      "Práctica de conversación en contextos reales (médico, escuela, administración).",
      "Comprensión de documentos oficiales y cartas de notificación.",
      "Expresión oral fluida para desenvolverse en la comunidad vecinal.",
      "Grupos reducidos con acompañamiento de mentores voluntarios."
    ]
  },
  {
    id: 3,
    num: "03",
    title: "Empleo y autonomía",
    description: "Crear un CV, buscar oportunidades y realizar gestiones de forma independiente.",
    schedule: "Viernes · 10:30 a 12:30",
    location: "Aula Digital El Carme, Valencia",
    spotsAvailable: 5,
    objectives: [
      "Redacción y diseño de un currículum vitae claro y profesional.",
      "Registro y uso de portales de empleo fiables (LABORA, InfoJobs, redes locales).",
      "Envío de correos de presentación y preparación de entrevistas.",
      "Obtención y uso del certificado digital o Cl@ve permanente."
    ]
  }
];

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 1,
    title: "Episodio 01 · Empezar de nuevo",
    guest: "Elena y Karim (Barrio del Carmen)",
    durationStr: "18:42",
    durationSec: 1122,
    description: "Elena y Karim comparten cómo el Centro El Carme y las sesiones de HOPE les ayudaron a perder el miedo a los trámites digitales y a conectar con la comunidad."
  },
  {
    id: 2,
    title: "Episodio 02 · La primera pantalla",
    guest: "Tariq y Bea (Voluntaria)",
    durationStr: "14:15",
    durationSec: 855,
    description: "Una conversación cercana sobre la primera vez que envías un currículum digital, la paciencia y el poder del acompañamiento individualizado."
  },
  {
    id: 3,
    title: "Episodio 03 · Redes que sostienen",
    guest: "María y Samuel (Coordinación)",
    durationStr: "22:05",
    durationSec: 1325,
    description: "Exploramos el impacto comunitario y social en Valencia: cómo la tecnología, lejos de aislar, puede ser el puente hacia una red vecinal sólida."
  }
];
