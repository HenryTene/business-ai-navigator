import {
  BarChart3, BriefcaseBusiness, Building2, CircleDollarSign,
  ClipboardList, Headphones, Megaphone, PackageSearch, Settings2, Users,
} from "lucide-react";

// ─── AREA TYPES ─────────────────────────────────────────────────────────────

export type Area = {
  id: string;
  name: string;
  icon: typeof Building2;
  problems: string[];
  data: string[];
  uses: string[];
  example: string;
  benefit: string;
  kpi: string;
  decisionNote: string;
};

export const areas: Area[] = [
  {
    id: "gerencia", name: "Gerencia", icon: BriefcaseBusiness,
    problems: ["Información dispersa", "Decisiones tardías", "Poca visibilidad transversal"],
    data: ["Indicadores", "Reportes de áreas", "Metas y resultados"],
    uses: ["Síntesis ejecutiva", "Detección de desviaciones", "Escenarios de decisión"],
    example: "Consolidar reportes de varias áreas para detectar prioridades que requieren revisión gerencial.",
    benefit: "Decidir con una visión más completa.",
    kpi: "Tiempo para preparar información ejecutiva",
    decisionNote: "La gerencia define qué priorizar y cómo interpretar los indicadores en su contexto estratégico.",
  },
  {
    id: "ventas", name: "Ventas", icon: BarChart3,
    problems: ["Oportunidades sin seguimiento", "Caída de conversión", "Pronósticos imprecisos"],
    data: ["Historial de ventas", "Interacciones", "Cotizaciones"],
    uses: ["Priorización de oportunidades", "Análisis de patrones", "Proyección de demanda"],
    example: "Identificar clientes que requieren seguimiento según su historial e interacciones recientes.",
    benefit: "Enfocar mejor el esfuerzo comercial.",
    kpi: "Tasa de conversión",
    decisionNote: "El vendedor valida el contexto de cada oportunidad antes de actuar sobre la lista sugerida.",
  },
  {
    id: "marketing", name: "Marketing", icon: Megaphone,
    problems: ["Campañas poco relevantes", "Mensajes inconsistentes", "Difícil atribución"],
    data: ["Campañas", "Segmentos", "Respuestas y comentarios"],
    uses: ["Análisis de segmentos", "Clasificación de comentarios", "Propuestas de contenido"],
    example: "Analizar respuestas de campañas para reconocer temas que generan mayor interés.",
    benefit: "Mejorar la relevancia de las acciones.",
    kpi: "Tasa de respuesta por campaña",
    decisionNote: "El equipo de marketing decide qué segmentos priorizar y cómo adaptar el mensaje.",
  },
  {
    id: "finanzas", name: "Finanzas", icon: CircleDollarSign,
    problems: ["Variaciones inesperadas", "Revisión manual", "Alertas tardías"],
    data: ["Gastos", "Presupuestos", "Facturas", "Flujos"],
    uses: ["Detección de anomalías", "Clasificación documental", "Análisis de variaciones"],
    example: "Señalar movimientos atípicos para que el equipo financiero los revise.",
    benefit: "Detectar desviaciones antes.",
    kpi: "Tiempo de detección de variaciones",
    decisionNote: "Finanzas investiga la causa de cada anomalía antes de tomar cualquier acción correctiva.",
  },
  {
    id: "rrhh", name: "Recursos Humanos", icon: Users,
    problems: ["Consultas repetitivas", "Documentos dispersos", "Dificultad para detectar necesidades"],
    data: ["Encuestas", "Políticas", "Registros de capacitación"],
    uses: ["Resumen de encuestas", "Búsqueda documental", "Clasificación de solicitudes"],
    example: "Agrupar temas frecuentes en encuestas internas para orientar acciones de mejora.",
    benefit: "Comprender mejor necesidades del equipo.",
    kpi: "Tiempo de respuesta a consultas internas",
    decisionNote: "RR. HH. interpreta el contexto humano y protege la privacidad de los datos del equipo.",
  },
  {
    id: "operaciones", name: "Operaciones", icon: Settings2,
    problems: ["Cuellos de botella", "Retrasos", "Incidencias repetidas"],
    data: ["Tiempos de proceso", "Órdenes", "Incidencias"],
    uses: ["Detección de patrones", "Alertas operativas", "Análisis de causas"],
    example: "Detectar etapas donde se concentran retrasos para priorizar su revisión.",
    benefit: "Reducir demoras del proceso.",
    kpi: "Tiempo de ciclo",
    decisionNote: "Operaciones investiga las causas raíz y decide qué cambios son viables antes de rediseñar.",
  },
  {
    id: "logistica", name: "Logística", icon: PackageSearch,
    problems: ["Exceso de inventario", "Falta de stock", "Retrasos", "Planificación deficiente"],
    data: ["Ventas", "Inventarios", "Órdenes", "Fechas y proveedores"],
    uses: ["Análisis de demanda", "Detección de anomalías", "Generación de alertas"],
    example: "Analizar ventas e inventarios para identificar productos con riesgo de falta de stock.",
    benefit: "Anticiparse al problema.",
    kpi: "Número de rupturas de stock",
    decisionNote: "Compras valida proveedores, precios y condiciones antes de ejecutar cualquier pedido.",
  },
  {
    id: "administracion", name: "Administración", icon: ClipboardList,
    problems: ["Documentos difíciles de revisar", "Tareas repetitivas", "Información duplicada"],
    data: ["Contratos", "Formularios", "Correos", "Registros"],
    uses: ["Extracción de información", "Clasificación", "Resumen documental"],
    example: "Extraer datos clave de documentos para que una persona valide su registro.",
    benefit: "Reducir tiempo de revisión.",
    kpi: "Tiempo promedio por documento",
    decisionNote: "Administración verifica la exactitud de la extracción antes de registrar o archivar.",
  },
  {
    id: "atencion", name: "Atención al cliente", icon: Headphones,
    problems: ["Muchos reclamos", "Demoras", "Temas recurrentes invisibles"],
    data: ["Tickets", "Correos", "Chats", "Encuestas"],
    uses: ["Clasificación de solicitudes", "Resumen", "Detección de temas"],
    example: "Clasificar reclamos por motivo y urgencia antes de asignarlos a un responsable.",
    benefit: "Priorizar y responder mejor.",
    kpi: "Tiempo promedio de primera respuesta",
    decisionNote: "El equipo de atención decide cómo responder según el contexto específico de cada cliente.",
  },
];

// ─── PROCESS FLOW ────────────────────────────────────────────────────────────

export const flow = [
  ["Problema empresarial", "Necesidad, ineficiencia u oportunidad dentro de la organización."],
  ["Datos / información", "Ventas, documentos, correos, inventarios, registros e indicadores."],
  ["Inteligencia Artificial", "Procesa o interpreta información para analizar, clasificar, predecir o generar."],
  ["Resultado", "Salida producida por la IA: alerta, clasificación, resumen o propuesta."],
  ["Decisión humana", "Una persona interpreta, valida y decide cómo utilizar el resultado."],
  ["Impacto / KPI", "Medida que confirma si hubo valor: tiempo, errores, costo, ventas o satisfacción."],
] as const;

// ─── SCENARIOS ───────────────────────────────────────────────────────────────

export type Scenario = {
  area: string;
  situation: string;
  options: string[];
  correct: number;
  explanation: string;
  chain: string[];
  risk: string;
};

export const scenarios: Scenario[] = [
  {
    area: "Administración",
    situation: "La empresa recibe 1,500 correos mensuales de cotizaciones, soporte, reclamos y consultas. Clasificarlos toma varias horas.",
    options: [
      "Eliminar los mensajes que parecen repetidos",
      "Clasificar las solicitudes según su contenido",
      "Aprobar automáticamente cada solicitud",
      "Sustituir el sistema de correo",
    ],
    correct: 1,
    explanation: "La IA puede organizar solicitudes antes de que una persona las atienda y priorice. Esto no reemplaza la revisión humana — la habilita con información ordenada.",
    chain: ["Correos sin clasificar", "Contenido de correos", "Clasificación automática", "Solicitudes organizadas", "Atención y priorización", "Tiempo de clasificación"],
    risk: "Privacidad de correos empresariales: algunos mensajes pueden contener información sensible que no debería procesarse con herramientas externas sin políticas claras.",
  },
  {
    area: "Ventas",
    situation: "El equipo comercial tiene 400 oportunidades abiertas y poco tiempo para decidir cuáles atender primero.",
    options: [
      "Asignarlas al azar",
      "Cerrar las más antiguas",
      "Priorizar según señales históricas y recientes",
      "Enviar la misma oferta a todas",
    ],
    correct: 2,
    explanation: "Un análisis de señales puede sugerir prioridades; el vendedor valida el contexto de cada oportunidad antes de actuar. La IA sugiere, el vendedor decide.",
    chain: ["Seguimiento insuficiente", "Historial e interacciones", "Análisis de patrones", "Lista sugerida de prioridades", "Vendedor valida y actúa", "Tasa de conversión"],
    risk: "Sesgo en los datos: si el historial refleja patrones del pasado, la IA podría favorecer ciertos segmentos ignorando oportunidades nuevas. Revisar con criterio.",
  },
  {
    area: "Inventarios",
    situation: "Algunos productos se agotan mientras otros permanecen meses almacenados sin movimiento.",
    options: [
      "Comprar el mismo volumen cada mes",
      "Analizar demanda y alertar riesgos",
      "Retirar productos con baja rotación sin revisión",
      "Duplicar todo el inventario",
    ],
    correct: 1,
    explanation: "La IA puede detectar patrones y riesgos de desbalance, pero compras decide considerando proveedores, plazos, costos y estrategia comercial.",
    chain: ["Desbalance de stock", "Ventas e inventario histórico", "Detección de patrones de demanda", "Alertas de sobrestock y ruptura", "Compras evalúa y decide", "Rupturas de stock por mes"],
    risk: "Falta de contexto: la IA no conoce acuerdos especiales con proveedores ni decisiones estratégicas recientes. Siempre combinar con conocimiento del equipo.",
  },
  {
    area: "Proveedores",
    situation: "Los retrasos varían entre proveedores y afectan la programación de entregas sin que haya una comparación sistemática.",
    options: [
      "Elegir siempre el precio menor",
      "Cancelar al proveedor con más pedidos",
      "Comparar desempeño, retrasos e incidencias",
      "Renovar todos los contratos sin cambios",
    ],
    correct: 2,
    explanation: "Comparar patrones de desempeño ayuda a negociar o reasignar pedidos con evidencia revisable. La decisión final considera relación, exclusividad y estrategia.",
    chain: ["Retrasos frecuentes", "Órdenes e incidencias históricas", "Análisis comparativo de proveedores", "Riesgos identificados por proveedor", "Abastecimiento negocia y decide", "Entregas a tiempo"],
    risk: "Automatización incorrecta: actuar directamente sobre contratos con base en el análisis sin revisión humana podría generar conflictos comerciales o rupturas de suministro.",
  },
  {
    area: "Recursos Humanos",
    situation: "Las encuestas internas contienen cientos de comentarios sobre capacitación y clima laboral. Analizarlos manualmente toma días.",
    options: [
      "Publicar todos los comentarios sin filtro",
      "Resumir temas y detectar patrones frecuentes",
      "Descartar comentarios críticos",
      "Decidir ascensos automáticamente según sentimiento",
    ],
    correct: 1,
    explanation: "La IA puede agrupar temas para que RR. HH. entienda rápidamente qué preocupa al equipo. La interpretación del contexto y la protección de la privacidad siguen siendo responsabilidad humana.",
    chain: ["Comentarios dispersos", "Encuestas internas", "Agrupación temática automática", "Hallazgos y tendencias", "RR. HH. interpreta y actúa", "Tiempo de análisis y satisfacción"],
    risk: "Privacidad y sesgo: el análisis de sentimientos puede malinterpretar el tono cultural o contextual. Nunca usar estos resultados para decisiones individuales sin validación.",
  },
  {
    area: "Operaciones",
    situation: "Un proceso presenta retrasos recurrentes, pero los registros no muestran claramente en qué etapa se originan las demoras.",
    options: [
      "Acelerar todas las etapas por igual",
      "Analizar tiempos e incidencias por etapa",
      "Eliminar controles de calidad para ganar velocidad",
      "Automatizar el proceso completo sin diagnóstico",
    ],
    correct: 1,
    explanation: "Detectar dónde se concentran las demoras permite investigar causas reales antes de cambiar el proceso. Automatizar sin diagnóstico puede amplificar el problema.",
    chain: ["Retrasos sin causa clara", "Tiempos registrados por etapa", "Detección de cuellos de botella", "Etapas críticas identificadas", "Operaciones investiga causas y decide", "Tiempo de ciclo"],
    risk: "Automatización incorrecta: si se automatiza una etapa problemática sin entender la causa raíz, el error se propaga más rápido y con mayor escala.",
  },
];

// ─── PROBLEM MAPS ─────────────────────────────────────────────────────────────

export const problemMaps = [
  ["Exceso de inventario", "Ventas, stock y estacionalidad", "Analizar patrones de demanda", "Alertas de sobrestock", "Ajustar compras", "Rotación de inventario"],
  ["Muchos reclamos", "Tickets, motivos y tiempos", "Clasificar y agrupar temas", "Problemas frecuentes identificados", "Priorizar mejoras", "Reclamos recurrentes por mes"],
  ["Retrasos operativos", "Tiempos, etapas e incidencias", "Detectar cuellos de botella", "Etapas críticas señaladas", "Investigar y rediseñar", "Tiempo de ciclo"],
  ["Caída de ventas", "Ventas, clientes y canales", "Analizar patrones y segmentos", "Factores asociados detectados", "Definir acciones comerciales", "Tasa de conversión"],
  ["Documentos difíciles de revisar", "Contratos y formularios", "Extraer y resumir información", "Datos clave organizados", "Validar y registrar", "Tiempo promedio por documento"],
  ["Demasiados correos", "Asunto, contenido y remitente", "Clasificar por tema y urgencia", "Bandejas organizadas", "Asignar responsables", "Tiempo de clasificación"],
  ["Variación de costos", "Presupuesto, gastos y facturas", "Detectar anomalías financieras", "Desviaciones señaladas", "Revisar causas con finanzas", "Variación presupuestal"],
  ["Información dispersa", "Archivos, reportes e indicadores", "Consolidar y resumir información", "Vista ejecutiva integrada", "Priorizar decisiones gerenciales", "Tiempo de preparación de reporte"],
] as const;

// ─── RISKS ───────────────────────────────────────────────────────────────────

export type Risk = {
  title: string;
  description: string;
  example: string;
  solution: string;
};

export const risks: Risk[] = [
  {
    title: "Información incorrecta",
    description: "La IA puede producir respuestas convincentes pero incorrectas, especialmente con datos numéricos o citas.",
    example: "Un asistente genera una cifra financiera que suena razonable pero no aparece en ningún reporte de la empresa.",
    solution: "Verificar fuentes críticas, contrastar datos con documentos originales y exigir revisión humana antes de actuar.",
  },
  {
    title: "Privacidad",
    description: "No toda información empresarial debería compartirse con herramientas externas o sin políticas de uso claras.",
    example: "Un empleado copia datos de clientes y contratos confidenciales en un chat público de IA generativa.",
    solution: "Clasificar la información según su sensibilidad, limitar accesos y utilizar solo herramientas aprobadas por la organización.",
  },
  {
    title: "Sesgo",
    description: "Los resultados pueden reflejar patrones históricos o prejuicios presentes en los datos con los que fue entrenada la IA.",
    example: "Un sistema de priorización de candidatos favorece perfiles similares a los contratados históricamente, excluyendo diversidad.",
    solution: "Revisar la representatividad de los datos, comparar resultados entre grupos y monitorear efectos no deseados.",
  },
  {
    title: "Falta de contexto",
    description: "Una IA puede desconocer reglas internas, excepciones estratégicas o prioridades no documentadas de la organización.",
    example: "El sistema sugiere reemplazar a un proveedor sin conocer que existe una exclusividad contractual vigente.",
    solution: "Aportar contexto relevante en cada consulta y validar resultados con personas que conocen el proceso en detalle.",
  },
  {
    title: "Automatización incorrecta",
    description: "Automatizar un proceso defectuoso puede amplificar el error en lugar de resolverlo.",
    example: "Se automatiza el envío de respuestas a reclamos sin revisar que las respuestas generadas son inexactas.",
    solution: "Mejorar primero el proceso, comenzar con pruebas controladas y mantener puntos de control humano antes de escalar.",
  },
];

// ─── NOVA PROFILE ─────────────────────────────────────────────────────────────

export type NovaMetric = {
  label: string;
  value: string;
  unit: string;
  trend: "up" | "down" | "neutral";
};

export const novaProfile = {
  name: "NOVA S.A.C.",
  tagline: "Empresa comercial multicanal",
  description: "NOVA S.A.C. es una empresa comercial ficticia utilizada como caso educativo transversal durante el curso. Representa una organización real en crecimiento que enfrenta desafíos operativos comunes a muchas empresas medianas de la región.",
  areas: ["Dirección", "Ventas", "Marketing", "Finanzas", "Operaciones", "Logística", "Administración", "Recursos Humanos", "Servicio al cliente"],
  problems: [
    "Reclamos crecientes sin análisis sistemático",
    "Información operativa dispersa en múltiples archivos",
    "Procesos administrativos mayormente manuales",
    "Exceso de correos sin clasificar ni priorizar",
    "Incidencias de inventario frecuentes",
    "Reportes que toman días en prepararse",
  ],
  goals: [
    "Analizar y clasificar información con IA generativa",
    "Mejorar la investigación y búsqueda documental",
    "Automatizar tareas repetitivas de bajo valor",
    "Crear asistentes para procesos internos",
    "Apoyar decisiones con análisis de datos y Power BI",
    "Diseñar agentes para flujos operativos clave",
  ],
  disclaimer: "Datos simulados · Caso educativo · No representan ninguna empresa real",
};

export const novaMetrics: NovaMetric[] = [
  { label: "Reclamos mensuales", value: "120", unit: "por mes", trend: "up" },
  { label: "Correos operativos", value: "1,500", unit: "por mes", trend: "up" },
  { label: "Productos activos", value: "240", unit: "en catálogo", trend: "neutral" },
  { label: "Reportes manuales", value: "18", unit: "por mes", trend: "neutral" },
  { label: "Incidencias de stock", value: "14", unit: "por mes", trend: "up" },
  { label: "Tiempo promedio de reclamo", value: "48 h", unit: "resolución", trend: "up" },
];

// ─── PRIORITY MATRIX ─────────────────────────────────────────────────────────

export type MatrixInitiative = {
  id: string;
  label: string;
  description: string;
  defaultImpact: "alto" | "bajo";
  defaultFacility: "facil" | "dificil";
  feedback: {
    altoFacil: string;
    altoDificil: string;
    bajoFacil: string;
    bajoDificil: string;
  };
};

export const matrixInitiatives: MatrixInitiative[] = [
  {
    id: "correos",
    label: "Clasificación de correos",
    description: "Organizar automáticamente los 1,500 correos mensuales por tipo de solicitud.",
    defaultImpact: "alto",
    defaultFacility: "facil",
    feedback: {
      altoFacil: "Muy razonable. Los datos ya existen (los correos mismos) y hay herramientas accesibles. Buena iniciativa exploratoria.",
      altoDificil: "El impacto es claro, pero si la implementación se percibe difícil, puede ser por integración de sistemas o políticas de privacidad. Vale investigar.",
      bajoFacil: "Si se considera bajo impacto, ¿cuánto tiempo se pierde hoy clasificando? Puede estar subestimado.",
      bajoDificil: "En ese cuadrante conviene postergar. Pero vale revisar si la dificultad puede reducirse con herramientas existentes.",
    },
  },
  {
    id: "inventario",
    label: "Forecast de inventario",
    description: "Predecir la demanda de productos para evitar rupturas y exceso de stock.",
    defaultImpact: "alto",
    defaultFacility: "dificil",
    feedback: {
      altoFacil: "Si ya se cuenta con datos históricos suficientes, puede ser más accesible de lo que parece. Buen punto de partida.",
      altoDificil: "Habitual en este tipo de iniciativas. Requiere datos de calidad y modelado. Puede implementarse progresivamente.",
      bajoFacil: "Si se considera bajo impacto, puede ser que el problema de stock no sea tan frecuente. Confirmar con datos reales.",
      bajoDificil: "Bajo impacto y difícil: no es prioridad. Hay otras iniciativas más inmediatas en NOVA.",
    },
  },
  {
    id: "reportes",
    label: "Generación de reportes",
    description: "Automatizar los 18 reportes manuales mensuales de las distintas áreas.",
    defaultImpact: "alto",
    defaultFacility: "facil",
    feedback: {
      altoFacil: "Gran candidato inicial. Libera horas de trabajo repetitivo y el impacto es visible para la gerencia.",
      altoDificil: "Si se percibe difícil, probablemente los datos están dispersos. Consolidar primero antes de automatizar.",
      bajoFacil: "Incluso si el impacto parece bajo, reducir 18 reportes manuales siempre tiene valor operativo.",
      bajoDificil: "En ese cuadrante, conviene cuestionar si los reportes actuales realmente generan valor o simplemente se mantienen por inercia.",
    },
  },
  {
    id: "documental",
    label: "Asistente documental",
    description: "Consultar contratos, políticas y procedimientos internos mediante preguntas en lenguaje natural.",
    defaultImpact: "alto",
    defaultFacility: "facil",
    feedback: {
      altoFacil: "Muy viable con tecnologías actuales. Si los documentos ya existen digitalmente, el costo de implementación puede ser bajo.",
      altoDificil: "Puede ser difícil si los documentos no están digitalizados o están desactualizados. Primero organizar la base documental.",
      bajoFacil: "El impacto depende de cuántas consultas internas se repiten. Si es frecuente, probablemente el impacto es mayor de lo estimado.",
      bajoDificil: "No prioritario en este momento. Hay necesidades más urgentes en NOVA.",
    },
  },
  {
    id: "reclamos",
    label: "Automatización de reclamos",
    description: "Clasificar y asignar reclamos de clientes automáticamente según motivo y urgencia.",
    defaultImpact: "alto",
    defaultFacility: "facil",
    feedback: {
      altoFacil: "Con 120 reclamos mensuales, esta es una prioridad clara. Los datos ya existen y el proceso está bien definido.",
      altoDificil: "Si es difícil puede deberse a integración con sistemas de atención. Empezar con clasificación manual asistida.",
      bajoFacil: "Si se considera bajo impacto, ¿los reclamos actuales no generan problemas? Revisar el tiempo promedio de resolución.",
      bajoDificil: "En ese cuadrante no es prioridad inmediata. Pero vale analizar el costo de los reclamos no resueltos.",
    },
  },
  {
    id: "ventas",
    label: "Predicción de ventas",
    description: "Anticipar la demanda futura de productos para planificar mejor la operación comercial.",
    defaultImpact: "alto",
    defaultFacility: "dificil",
    feedback: {
      altoFacil: "Si los datos históricos son buenos y el patrón de ventas es relativamente estable, puede ser más accesible.",
      altoDificil: "Requiere calidad de datos y experiencia en modelado. Es una iniciativa estratégica de mediano plazo.",
      bajoFacil: "Si se considera bajo impacto, puede ser que las ventas son muy estables. Confirmar antes de descartar.",
      bajoDificil: "No es prioridad inicial. Otras iniciativas de NOVA generan valor más rápido con menos esfuerzo.",
    },
  },
];

// ─── COURSE ROADMAP ──────────────────────────────────────────────────────────

export const courseRoute = [
  "MASTERCLASS — Estás aquí",
  "Ecosistema de herramientas",
  "Prompting profesional",
  "Investigación empresarial",
  "Documentos",
  "Datos",
  "Power BI",
  "Automatización",
  "Asistentes",
  "Agentes",
  "Decisiones gerenciales",
  "Proyecto integrador",
];