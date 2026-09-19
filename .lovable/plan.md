# AI Business Explorer — primera versión funcional

## Objetivo
Construir un laboratorio educativo interactivo en español para comprender dónde genera valor la IA dentro de una empresa, manteniendo siempre visibles el problema, los datos, el resultado, la decisión humana y el KPI.

## Experiencia
- Crear una bienvenida inmersiva con acceso directo a la pregunta de apertura y al modelo central interactivo.
- Mantener navegación libre y progreso discreto entre Inicio, Explorador, Simulador, Caso NOVA, Reto y Ruta.
- Construir un explorador seleccionable con las nueve áreas empresariales y contenido específico para cada una.
- Incorporar comparación antes/después, laboratorio problema→valor y seis escenarios con retroalimentación explicada.
- Añadir el caso NOVA, su ejercicio de priorización y una matriz interactiva de impacto/facilidad.
- Incluir colaboración humano+IA, riesgos desplegables, reto final editable y mapa del curso.

## Sistema visual
- Aplicar la dirección kinetic glass elegida: fondo grafito profundo, acento verde menta, ámbar para decisiones/KPI, tipografía Archivo e IBM Plex Mono.
- Priorizar lectura en proyección, jerarquía clara, paneles translúcidos y movimiento funcional moderado.
- Adaptar navegación, diagramas, formularios y matrices a escritorio, tablet y móvil.

## Arquitectura técnica
- Mantener una sola experiencia continua en `/`, con navegación interna por secciones porque forma parte de una masterclass secuencial.
- Separar el contenido educativo en datos tipados y la interfaz en componentes reutilizables.
- Implementar estados locales para selección, respuestas, progreso y reto; sin backend, autenticación ni almacenamiento persistente.
- Añadir metadatos propios de la experiencia y respetar navegación por teclado y reducción de movimiento.

## Validación
- Verificar carga, interacciones principales, navegación y ausencia de desbordes en escritorio y móvil.
