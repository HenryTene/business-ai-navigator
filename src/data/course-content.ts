import {
  BarChart3, Boxes, BriefcaseBusiness, Building2, CircleDollarSign,
  ClipboardList, Headphones, Megaphone, PackageSearch, Settings2, Users,
} from "lucide-react";

export type Area = {
  id: string; name: string; icon: typeof Building2; problems: string[]; data: string[];
  uses: string[]; example: string; benefit: string; kpi: string;
};

export const areas: Area[] = [
  { id:"gerencia", name:"Gerencia", icon:BriefcaseBusiness, problems:["Información dispersa","Decisiones tardías","Poca visibilidad transversal"], data:["Indicadores","Reportes de áreas","Metas y resultados"], uses:["Síntesis ejecutiva","Detección de desviaciones","Escenarios de decisión"], example:"Consolidar reportes de varias áreas para detectar prioridades que requieren revisión gerencial.", benefit:"Decidir con una visión más completa.", kpi:"Tiempo para preparar información ejecutiva" },
  { id:"ventas", name:"Ventas", icon:BarChart3, problems:["Oportunidades sin seguimiento","Caída de conversión","Pronósticos imprecisos"], data:["Historial de ventas","Interacciones","Cotizaciones"], uses:["Priorización de oportunidades","Análisis de patrones","Proyección de demanda"], example:"Identificar clientes que requieren seguimiento según su historial e interacciones recientes.", benefit:"Enfocar mejor el esfuerzo comercial.", kpi:"Tasa de conversión" },
  { id:"marketing", name:"Marketing", icon:Megaphone, problems:["Campañas poco relevantes","Mensajes inconsistentes","Difícil atribución"], data:["Campañas","Segmentos","Respuestas y comentarios"], uses:["Análisis de segmentos","Clasificación de comentarios","Propuestas de contenido"], example:"Analizar respuestas de campañas para reconocer temas que generan mayor interés.", benefit:"Mejorar la relevancia de las acciones.", kpi:"Tasa de respuesta por campaña" },
  { id:"finanzas", name:"Finanzas", icon:CircleDollarSign, problems:["Variaciones inesperadas","Revisión manual","Alertas tardías"], data:["Gastos","Presupuestos","Facturas","Flujos"], uses:["Detección de anomalías","Clasificación documental","Análisis de variaciones"], example:"Señalar movimientos atípicos para que el equipo financiero los revise.", benefit:"Detectar desviaciones antes.", kpi:"Tiempo de detección de variaciones" },
  { id:"rrhh", name:"Recursos Humanos", icon:Users, problems:["Consultas repetitivas","Documentos dispersos","Dificultad para detectar necesidades"], data:["Encuestas","Políticas","Registros de capacitación"], uses:["Resumen de encuestas","Búsqueda documental","Clasificación de solicitudes"], example:"Agrupar temas frecuentes en encuestas internas para orientar acciones de mejora.", benefit:"Comprender mejor necesidades del equipo.", kpi:"Tiempo de respuesta a consultas internas" },
  { id:"operaciones", name:"Operaciones", icon:Settings2, problems:["Cuellos de botella","Retrasos","Incidencias repetidas"], data:["Tiempos de proceso","Órdenes","Incidencias"], uses:["Detección de patrones","Alertas operativas","Análisis de causas"], example:"Detectar etapas donde se concentran retrasos para priorizar su revisión.", benefit:"Reducir demoras del proceso.", kpi:"Tiempo de ciclo" },
  { id:"logistica", name:"Logística", icon:PackageSearch, problems:["Exceso de inventario","Falta de stock","Retrasos","Planificación deficiente"], data:["Ventas","Inventarios","Órdenes","Fechas y proveedores"], uses:["Análisis de demanda","Detección de anomalías","Generación de alertas"], example:"Analizar ventas e inventarios para identificar productos con riesgo de falta de stock.", benefit:"Anticiparse al problema.", kpi:"Número de rupturas de stock" },
  { id:"administracion", name:"Administración", icon:ClipboardList, problems:["Documentos difíciles de revisar","Tareas repetitivas","Información duplicada"], data:["Contratos","Formularios","Correos","Registros"], uses:["Extracción de información","Clasificación","Resumen documental"], example:"Extraer datos clave de documentos para que una persona valide su registro.", benefit:"Reducir tiempo de revisión.", kpi:"Tiempo promedio por documento" },
  { id:"atencion", name:"Atención al cliente", icon:Headphones, problems:["Muchos reclamos","Demoras","Temas recurrentes invisibles"], data:["Tickets","Correos","Chats","Encuestas"], uses:["Clasificación de solicitudes","Resumen","Detección de temas"], example:"Clasificar reclamos por motivo y urgencia antes de asignarlos a un responsable.", benefit:"Priorizar y responder mejor.", kpi:"Tiempo promedio de primera respuesta" },
];

export const flow = [
  ["Problema empresarial","Necesidad, ineficiencia u oportunidad dentro de la organización."],
  ["Datos / información","Ventas, documentos, correos, inventarios, registros e indicadores."],
  ["Inteligencia Artificial","Procesa o interpreta información para analizar, clasificar, predecir o generar."],
  ["Resultado","Salida producida por la IA: alerta, clasificación, resumen o propuesta."],
  ["Decisión humana","Una persona interpreta, valida y decide cómo utilizar el resultado."],
  ["Impacto / KPI","Medida que confirma si hubo valor: tiempo, errores, costo, ventas o satisfacción."],
] as const;

export type Scenario = { area:string; situation:string; options:string[]; correct:number; explanation:string; chain:string[] };
export const scenarios: Scenario[] = [
 {area:"Administración",situation:"La empresa recibe 1,500 correos mensuales de cotizaciones, soporte, reclamos y consultas. Clasificarlos toma varias horas.",options:["Eliminar los mensajes que parecen repetidos","Clasificar las solicitudes según su contenido","Aprobar automáticamente cada solicitud","Sustituir el sistema de correo"],correct:1,explanation:"La IA puede organizar solicitudes antes de que una persona las atienda y priorice.",chain:["Correos sin clasificar","Contenido de correos","Clasificación","Solicitudes organizadas","Atención y priorización","Tiempo de clasificación"]},
 {area:"Ventas",situation:"El equipo comercial tiene 400 oportunidades abiertas y poco tiempo para decidir cuáles atender primero.",options:["Asignarlas al azar","Cerrar las más antiguas","Priorizar según señales históricas y recientes","Enviar la misma oferta a todas"],correct:2,explanation:"Un análisis de señales puede sugerir prioridades; el vendedor valida el contexto antes de actuar.",chain:["Seguimiento insuficiente","Historial e interacciones","Priorización","Lista sugerida","Vendedor valida","Conversión"]},
 {area:"Inventarios",situation:"Algunos productos se agotan mientras otros permanecen meses almacenados.",options:["Comprar el mismo volumen cada mes","Analizar demanda y alertar riesgos","Retirar productos con baja rotación sin revisión","Duplicar todo el inventario"],correct:1,explanation:"La IA puede detectar patrones y riesgos, pero compras decide considerando proveedores y estrategia.",chain:["Desbalance de stock","Ventas e inventario","Patrones de demanda","Alertas","Compras decide","Rupturas de stock"]},
 {area:"Proveedores",situation:"Los retrasos varían entre proveedores y afectan la programación de entregas.",options:["Elegir siempre el precio menor","Cancelar al proveedor con más pedidos","Comparar desempeño, retrasos e incidencias","Renovar todos los contratos"],correct:2,explanation:"Comparar patrones de desempeño ayuda a negociar o reasignar pedidos con evidencia revisable.",chain:["Retrasos","Órdenes e incidencias","Análisis comparativo","Riesgos señalados","Abastecimiento decide","Entregas a tiempo"]},
 {area:"Recursos Humanos",situation:"Las encuestas internas contienen cientos de comentarios sobre capacitación y clima laboral.",options:["Publicar todos los comentarios","Resumir temas y detectar patrones","Descartar comentarios críticos","Decidir ascensos automáticamente"],correct:1,explanation:"La IA puede agrupar temas; RR. HH. debe interpretar el contexto y proteger la privacidad.",chain:["Comentarios dispersos","Encuestas","Agrupación temática","Hallazgos","RR. HH. valida","Tiempo de análisis"]},
 {area:"Operaciones",situation:"Un proceso presenta retrasos, pero los registros no muestran claramente en qué etapa se originan.",options:["Acelerar todas las etapas","Analizar tiempos e incidencias por etapa","Eliminar controles de calidad","Automatizar el proceso completo"],correct:1,explanation:"Detectar dónde se concentran las demoras permite investigar causas antes de cambiar el proceso.",chain:["Retrasos","Tiempos e incidencias","Detección de patrones","Etapas críticas","Operaciones investiga","Tiempo de ciclo"]},
];

export const problemMaps = [
 ["Exceso de inventario","Ventas, stock y estacionalidad","Analizar patrones de demanda","Alertas de sobrestock","Ajustar compras","Rotación de inventario"],
 ["Muchos reclamos","Tickets, motivos y tiempos","Clasificar y agrupar temas","Problemas frecuentes","Priorizar mejoras","Reclamos recurrentes"],
 ["Retrasos operativos","Tiempos, etapas e incidencias","Detectar cuellos de botella","Etapas críticas","Investigar y rediseñar","Tiempo de ciclo"],
 ["Caída de ventas","Ventas, clientes y canales","Analizar patrones y segmentos","Factores asociados","Definir acciones comerciales","Conversión"],
 ["Documentos difíciles de revisar","Contratos y formularios","Extraer y resumir información","Datos clave organizados","Validar y registrar","Tiempo por documento"],
 ["Demasiados correos","Asunto, contenido y remitente","Clasificar por tema y urgencia","Bandejas organizadas","Asignar responsables","Tiempo de clasificación"],
 ["Variación de costos","Presupuesto, gastos y facturas","Detectar anomalías","Desviaciones señaladas","Revisar causas","Variación presupuestal"],
 ["Información dispersa","Archivos, reportes e indicadores","Consolidar y resumir","Vista ejecutiva","Priorizar decisiones","Tiempo de reporte"],
] as const;

export const risks = [
 ["Información incorrecta","La IA puede producir respuestas convincentes pero incorrectas.","Verificar fuentes, contrastar datos y exigir revisión humana antes de actuar."],
 ["Privacidad","No toda información empresarial debería compartirse con cualquier herramienta.","Clasificar la información, limitar accesos y usar herramientas aprobadas por la organización."],
 ["Sesgo","Los resultados pueden reflejar sesgos presentes en los datos y el contexto.","Revisar representatividad, comparar resultados y monitorear efectos sobre distintos grupos."],
 ["Falta de contexto","Una IA puede desconocer reglas internas, excepciones o prioridades estratégicas.","Aportar contexto relevante y validar con personas que conocen el proceso."],
 ["Automatización incorrecta","Automatizar un proceso defectuoso puede aumentar el problema.","Mejorar primero el proceso, comenzar con pruebas pequeñas y mantener puntos de control."],
] as const;

export const courseRoute = ["MASTERCLASS — Estás aquí","Ecosistema de herramientas","Prompting profesional","Investigación empresarial","Documentos","Datos","Power BI","Automatización","Asistentes","Agentes","Decisiones gerenciales","Proyecto integrador"];