import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowDown, ArrowRight, BarChart3, BriefcaseBusiness, Building2,
  Check, ChevronLeft, ChevronRight, Home, Menu,
  PanelLeftClose, PanelLeftOpen, Route as RouteIcon,
  ShieldCheck, Sparkles, Target, TrendingUp, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Feedback, KPIBadge, MiniFlow, NovaMetricCard, ProcessFlow,
  ResetButton, RiskCard, SectionHeading, SimulatorResult,
  StepReveal, TeacherModeToggle, ValueMapCard,
} from "@/components/learning-ui";
import {
  areas, courseRoute, flow, matrixInitiatives, novaMetrics, novaProfile,
  problemMaps, risks, scenarios,
} from "@/data/course-content";
import { TeacherModeProvider, useTeacherMode } from "@/hooks/useTeacherMode";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Business Explorer — IA aplicada a la Gestión Empresarial" },
      { name: "description", content: "Laboratorio educativo interactivo para descubrir cómo la IA genera valor medible en una organización." },
      { property: "og:title", content: "AI Business Explorer — Masterclass" },
      { property: "og:description", content: "Explora problemas, datos, aplicaciones de IA, decisiones humanas e impacto empresarial." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <TeacherModeProvider>
      <Index />
    </TeacherModeProvider>
  ),
});

// ─── NAV ──────────────────────────────────────────────────────────────────────

const navItems = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "explorar", label: "Explorar empresa", icon: Building2 },
  { id: "simulador", label: "Simulador", icon: Sparkles },
  { id: "nova", label: "Caso NOVA", icon: BriefcaseBusiness },
  { id: "reto", label: "Reto final", icon: Target },
  { id: "ruta", label: "Ruta del curso", icon: RouteIcon },
] as const;

const sectionIds = navItems.map((item) => item.id);

// ─── ROOT ─────────────────────────────────────────────────────────────────────

function Index() {
  const { teacherMode } = useTeacherMode();
  const [visited, setVisited] = useState(new Set(["inicio"]));
  const [active, setActive] = useState("inicio");
  const [menu, setMenu] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            setActive(e.target.id);
            setVisited((v) => new Set(v).add(e.target.id));
          }
        }),
      { rootMargin: "-20% 0px -65%", threshold: 0 },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenu(false);
  };

  const progress = Math.round((visited.size / sectionIds.length) * 100);

  return (
    <div className={`min-h-screen overflow-x-hidden bg-background font-display text-foreground selection:bg-accent/30 ${teacherMode ? "teacher-mode" : ""}`}>
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <Sidebar
        active={active}
        visited={visited}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        go={go}
        progress={progress}
      />
      <MobileHeader
        visited={visited.size}
        menu={menu}
        setMenu={setMenu}
        active={active}
        go={go}
      />
      <div className={`relative transition-[margin] duration-300 ${collapsed ? "md:ml-16" : "md:ml-64"}`}>
        <main className="relative z-10">
          <Welcome onStart={() => go("explorar")} />
          <Opening onNext={() => go("explorar")} />
          <CentralModel />
          <BusinessExplorer />
          <BeforeAfter />
          <Simulator />
          <ProblemLab />
          <NovaCase />
          <HumanAI />
          <Risks />
          <FinalChallenge />
          <Roadmap />
        </main>
        <Footer progress={progress} visited={visited} />
      </div>
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────

function Sidebar({
  active, visited, collapsed, setCollapsed, go, progress,
}: {
  active: string;
  visited: Set<string>;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  go: (id: string) => void;
  progress: number;
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 hidden border-r border-line bg-background/95 backdrop-blur-xl transition-[width] duration-300 md:flex md:flex-col ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* Logo */}
      <div className="grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-b border-line px-3">
        <Button variant="ghost" className="min-w-0 justify-start px-1" onClick={() => go("inicio")} aria-label="Ir al inicio">
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-accent font-mono text-xs font-bold text-accent-ink">AI</span>
          {!collapsed && <span className="truncate text-xs font-bold uppercase">Business Explorer</span>}
        </Button>
        {!collapsed && (
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(true)} aria-label="Contraer menú lateral" title="Contraer menú">
            <PanelLeftClose />
          </Button>
        )}
      </div>

      {/* Progress */}
      <div className="border-b border-line px-4 py-4">
        {collapsed ? (
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(false)} aria-label="Expandir menú lateral" title="Expandir menú">
            <PanelLeftOpen />
          </Button>
        ) : (
          <>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
              <span className="font-mono text-[9px] uppercase text-muted-foreground">Progreso</span>
              <span className="font-mono text-[9px] text-accent">{progress}%</span>
            </div>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-line">
              <div className="h-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-[10px] text-muted-foreground">
              {visited.size} de {sectionIds.length} temas explorados
            </p>
          </>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-2" aria-label="Temas de la masterclass">
        {navItems.map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant="ghost"
            onClick={() => go(id)}
            aria-current={active === id ? "location" : undefined}
            title={collapsed ? label : undefined}
            className={`h-11 w-full ${collapsed ? "justify-center px-0" : "justify-start px-3"} ${active === id ? "bg-accent/10 text-accent" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Icon className="shrink-0" />
            {!collapsed && <span className="truncate">{label}</span>}
            {!collapsed && visited.has(id) && <Check className="ml-auto size-3.5 text-accent" />}
          </Button>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="border-t border-line p-4 space-y-3">
          <TeacherModeToggle />
          <span className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[9px] uppercase text-accent">
            Masterclass
          </span>
          <p className="text-xs leading-relaxed text-muted-foreground">IA aplicada a la Gestión Empresarial</p>
        </div>
      )}
    </aside>
  );
}

// ─── MOBILE HEADER ────────────────────────────────────────────────────────────

function MobileHeader({
  visited, menu, setMenu, active, go,
}: {
  visited: number;
  menu: boolean;
  setMenu: (v: boolean) => void;
  active: string;
  go: (id: string) => void;
}) {
  const progress = Math.round((visited / sectionIds.length) * 100);
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/90 backdrop-blur-xl md:hidden">
      <div className="grid h-14 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4">
        <Button variant="ghost" className="min-w-0 justify-start px-0" onClick={() => go("inicio")}>
          <span className="grid size-8 shrink-0 place-items-center rounded-md bg-accent font-mono text-xs font-bold text-accent-ink">AI</span>
          <span className="truncate text-xs font-bold uppercase">Business Explorer</span>
        </Button>
        <Button variant="outline" size="icon" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label={menu ? "Cerrar menú" : "Abrir menú"}>
          {menu ? <X /> : <Menu />}
        </Button>
      </div>
      <div className="h-0.5 bg-line">
        <div className="h-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
      {menu && (
        <nav className="absolute inset-x-0 top-full grid max-h-[calc(100vh-3.5rem)] gap-1 overflow-y-auto border-b border-line bg-surface p-3 shadow-xl" aria-label="Temas de la masterclass">
          {navItems.map(({ id, label, icon: Icon }) => (
            <Button key={id} variant="ghost" onClick={() => go(id)} className={`h-12 justify-start ${active === id ? "bg-accent/10 text-accent" : "text-muted-foreground"}`}>
              <Icon />
              {label}
            </Button>
          ))}
          <div className="mt-2 border-t border-line pt-2">
            <TeacherModeToggle />
          </div>
        </nav>
      )}
    </header>
  );
}

// ─── WELCOME ──────────────────────────────────────────────────────────────────

function Welcome({ onStart }: { onStart: () => void }) {
  const { teacherMode } = useTeacherMode();
  return (
    <section id="inicio" className="mx-auto grid min-h-[78vh] max-w-[1240px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_.9fr]">
      <div className="rise">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
          Inteligencia Artificial aplicada a la Gestión Empresarial
        </p>
        <p className="mt-4 text-sm font-semibold uppercase text-muted-foreground">Masterclass</p>
        <h1 className={`mt-3 max-w-[14ch] text-balance font-black uppercase leading-[.94] ${teacherMode ? "text-6xl sm:text-8xl" : "text-5xl sm:text-7xl"}`}>
          La Inteligencia Artificial y el nuevo modelo de gestión empresarial
        </h1>
        <p className={`mt-6 max-w-xl leading-relaxed text-muted-foreground ${teacherMode ? "text-xl" : "text-lg"}`}>
          Descubre cómo la IA transforma problemas empresariales en información, decisiones y resultados.
        </p>
        <Button size="lg" className="mt-8 h-12 rounded-full px-6 font-bold uppercase" onClick={onStart}>
          Comenzar exploración
          <ArrowDown />
        </Button>
      </div>
      <div className="network" aria-label="Flujo visual de empresa, datos, inteligencia artificial y decisión">
        <div className="network-core">
          <Building2 className="size-8" />
          <strong>EMPRESA</strong>
        </div>
        {["Datos", "IA", "Decisión", "Impacto"].map((x, i) => (
          <div key={x} className={`network-node node-${i + 1}`}>
            <span>0{i + 1}</span>
            {x}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── OPENING ──────────────────────────────────────────────────────────────────

function Opening({ onNext }: { onNext: () => void }) {
  const { teacherMode } = useTeacherMode();
  const [reveal, setReveal] = useState(false);
  const qs = [
    "¿Qué comprar?", "¿Cuánto inventario mantener?", "¿Qué producto vender?",
    "¿Qué clientes necesitan atención?", "¿Dónde aumentan los costos?",
    "¿Qué proveedor elegir?", "¿Qué tareas están retrasadas?",
    "¿Qué causa reclamos?", "¿Qué campaña funciona mejor?", "¿Dónde hay una oportunidad?",
  ];
  return (
    <section id="apertura" className="band">
      <div className="shell text-center">
        <p className="eyebrow">Pregunta de apertura</p>
        <h2 className={`mx-auto mt-3 max-w-3xl text-balance font-bold uppercase ${teacherMode ? "text-4xl sm:text-6xl" : "text-3xl sm:text-5xl"}`}>
          ¿Cuántas decisiones toma una empresa todos los días?
        </h2>
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {qs.map((q, i) => (
            <button
              key={q}
              onClick={() => setReveal(true)}
              className="decision-chip"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {q}
            </button>
          ))}
        </div>
        {reveal && (
          <div className="rise mt-10">
            <p className={`text-balance text-accent ${teacherMode ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>
              ¿Qué ocurriría si pudiéramos analizar más información en menos tiempo?
            </p>
            <Button className="mt-6 rounded-full" onClick={onNext}>
              Descubrir el papel de la IA
              <ArrowDown />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── CENTRAL MODEL ────────────────────────────────────────────────────────────

function CentralModel() {
  const { teacherMode } = useTeacherMode();
  const [active, setActive] = useState(0);
  return (
    <section id="modelo" className="shell py-20">
      <SectionHeading
        eyebrow="Modelo central"
        title="Del problema empresarial al impacto medible"
        aside="Selecciona cada etapa para comprender su función dentro del flujo."
      />
      <StepReveal
        steps={[
          <div key="flow" className="mt-8">
            <ProcessFlow items={flow} interactive active={active} onSelect={setActive} />
          </div>,
          <blockquote key="quote" className="mt-8 border-l-2 border-accent pl-5 text-xl font-semibold">
            "Utilizar IA empresarialmente significa aplicarla a un problema para generar valor medible."
          </blockquote>,
        ]}
        labels={["Flujo principal", "Principio clave"]}
      />
      {!teacherMode && (
        <blockquote className="mt-8 border-l-2 border-accent pl-5 text-xl font-semibold">
          "Utilizar IA empresarialmente significa aplicarla a un problema para generar valor medible."
        </blockquote>
      )}
    </section>
  );
}

// ─── BUSINESS EXPLORER ───────────────────────────────────────────────────────

function BusinessExplorer() {
  const { teacherMode } = useTeacherMode();
  const [selected, setSelected] = useState(areas[6] ?? areas[0]);
  const [tab, setTab] = useState<"info" | "flow">("info");
  if (!selected) return null;

  const flowSteps = [
    { label: "Problema", value: selected.problems[0] ?? "—" },
    { label: "Datos", value: selected.data.join(", ") },
    { label: "IA", value: selected.uses[0] ?? "—" },
    { label: "Resultado", value: selected.example },
    { label: "Decisión", value: selected.decisionNote },
    { label: "KPI", value: selected.kpi },
  ];

  return (
    <section id="explorar" className="band">
      <div className="shell">
        <SectionHeading
          eyebrow="IA Business Explorer"
          title="¿Dónde puede generar valor la IA?"
          aside="Selecciona un área y conecta el problema con un indicador concreto."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
          {/* Area buttons */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {areas.map((a) => {
              const Icon = a.icon;
              return (
                <button
                  key={a.id}
                  onClick={() => { setSelected(a); setTab("info"); }}
                  className={`area-button ${selected.id === a.id ? "area-active" : ""}`}
                >
                  <Icon />
                  <span>{a.name}</span>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <article className="glass-panel" aria-live="polite">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className={`font-bold uppercase ${teacherMode ? "text-3xl" : "text-2xl"}`}>
                {selected.name}
              </h3>
              <div className="flex rounded-lg border border-line bg-surface p-0.5">
                <button
                  onClick={() => setTab("info")}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${tab === "info" ? "bg-accent/20 text-accent" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Detalle
                </button>
                <button
                  onClick={() => setTab("flow")}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${tab === "flow" ? "bg-accent/20 text-accent" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Flujo P→KPI
                </button>
              </div>
            </div>

            {tab === "info" ? (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <InfoBox title="Problemas frecuentes" list={selected.problems} />
                <InfoBox title="Datos disponibles" list={selected.data} />
                <InfoBox title="Aplicaciones posibles de IA" list={selected.uses} />
                <div className="info-box">
                  <span>Ejemplo empresarial</span>
                  <p>{selected.example}</p>
                </div>
              </div>
            ) : (
              <div className="mt-5 grid gap-2">
                {flowSteps.map((step, i) => (
                  <div key={step.label} className="flex flex-col items-start">
                    <div className="w-full rounded-lg border border-line bg-surface/70 p-3">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-accent">{step.label}</span>
                      <p className={`mt-1 ${teacherMode ? "text-sm" : "text-xs"} leading-relaxed`}>{step.value}</p>
                    </div>
                    {i < flowSteps.length - 1 && (
                      <ArrowDown className="my-1 size-4 text-accent/50" />
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-accent/10 p-4">
              <p>
                <span className={`${teacherMode ? "text-sm" : "text-xs"} text-muted-foreground`}>Beneficio esperado</span>
                <strong className="block">{selected.benefit}</strong>
              </p>
              <KPIBadge>{selected.kpi}</KPIBadge>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function InfoBox({ title, list }: { title: string; list: string[] }) {
  return (
    <div className="info-box">
      <span>{title}</span>
      <ul>{list.map((x) => <li key={x}>{x}</li>)}</ul>
    </div>
  );
}

// ─── BEFORE / AFTER ───────────────────────────────────────────────────────────

function BeforeAfter() {
  const { teacherMode } = useTeacherMode();
  const [mode, setMode] = useState<"before" | "after">("after");
  const before = ["500 comentarios", "Empleado revisa", "Clasifica manualmente", "Agrupa problemas", "Construye reporte", "Gerencia analiza", "Decisión"];
  const after  = ["500 comentarios", "IA analiza", "Clasifica, resume y detecta patrones", "Responsable valida", "Reporte listo", "Gerencia interpreta", "Decisión"];
  return (
    <section className="shell py-20">
      <SectionHeading
        eyebrow="Comparador"
        title="¿Dónde cambia realmente el trabajo?"
        aside="Ejemplo didáctico · Los tiempos son ilustrativos, no evidencia científica."
      />
      <div className="mt-7 flex w-fit rounded-lg border border-line bg-surface p-1">
        <Button variant={mode === "before" ? "default" : "ghost"} onClick={() => setMode("before")}>
          Proceso tradicional
        </Button>
        <Button variant={mode === "after" ? "default" : "ghost"} onClick={() => setMode("after")}>
          Apoyado por IA
        </Button>
      </div>
      <div className="mt-6 glass-panel">
        <div className="flow-list">
          {(mode === "before" ? before : after).map((x, i) => (
            <div className="contents" key={x}>
              <div className={mode === "after" && (i === 1 || i === 2) ? "flow-step active" : "flow-step"}>{x}</div>
              {i < (mode === "before" ? before : after).length - 1 && (
                <ArrowRight className="hidden text-muted-foreground md:block" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <span className={mode === "before" ? "time-badge warning" : "time-badge"}>
            {mode === "before" ? "Tiempo estimado: varias horas" : "Más tiempo para interpretar y decidir"}
          </span>
          <span className={`${teacherMode ? "text-sm" : "text-xs"} text-muted-foreground`}>
            Caso educativo · Datos simulados
          </span>
        </div>
      </div>
      <p className={`mt-5 max-w-4xl leading-relaxed ${teacherMode ? "text-xl" : "text-lg"}`}>
        La IA puede reducir el tiempo dedicado a procesar información y permitir que las personas dediquen más tiempo a interpretar, validar y decidir.
      </p>
    </section>
  );
}

// ─── SIMULATOR ────────────────────────────────────────────────────────────────

function Simulator() {
  const { teacherMode } = useTeacherMode();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | undefined)[]>(Array(scenarios.length).fill(undefined));
  const [showResult, setShowResult] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const s = scenarios[idx] ?? scenarios[0];
  if (!s) return null;

  const answer = answers[idx];
  const choose = (i: number) => setAnswers((a) => a.map((x, j) => (j === idx ? i : x)));
  const answered = answers.filter((a) => a !== undefined).length;
  const score = answers.filter((a, i) => a === scenarios[i]?.correct).length;
  const allDone = answered === scenarios.length;

  const resetSimulator = () => {
    setAnswers(Array(scenarios.length).fill(undefined));
    setIdx(0);
    setShowResult(false);
    setReviewMode(false);
  };

  if (showResult) {
    return (
      <section id="simulador" className="band">
        <div className="shell">
          <SectionHeading
            eyebrow={`Simulador · ${answered} / ${scenarios.length} respondidos`}
            title="¿Dónde usarías IA?"
            aside="Analiza el problema antes de elegir una aplicación."
          />
          <div className="mt-8">
            <SimulatorResult
              score={score}
              total={scenarios.length}
              onReview={() => { setReviewMode(true); setShowResult(false); setIdx(0); }}
              onReset={resetSimulator}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="simulador" className="band">
      <div className="shell">
        <SectionHeading
          eyebrow={`Simulador · escenario ${idx + 1} de ${scenarios.length}`}
          title="¿Dónde usarías IA?"
          aside="Analiza el problema antes de elegir una aplicación."
        />

        {/* Progress bar */}
        <div className="mt-6 flex items-center gap-3">
          <div className="flex-1 overflow-hidden rounded-full bg-line h-1.5">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{ width: `${(answered / scenarios.length) * 100}%` }}
            />
          </div>
          <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
            {answered} / {scenarios.length} respondidos
          </span>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
          <div className="glass-panel">
            <span className="eyebrow">{s.area} · Caso educativo</span>
            <p className={`mt-4 font-semibold leading-relaxed ${teacherMode ? "text-2xl" : "text-xl"}`}>
              {s.situation}
            </p>
            {reviewMode && (
              <div className="mt-3 flex gap-2">
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] ${answers[idx] === s.correct ? "bg-accent/10 text-accent" : "bg-coral/10 text-coral"}`}>
                  {answers[idx] === s.correct ? <Check className="size-3" /> : "✗"} Tu respuesta: {typeof answers[idx] === "number" ? String.fromCharCode(65 + answers[idx]) : "—"}
                </span>
              </div>
            )}
          </div>

          <div className="glass-panel">
            <div className="grid gap-2">
              {s.options.map((o, i) => (
                <button
                  key={o}
                  onClick={() => choose(i)}
                  disabled={reviewMode}
                  className={`option ${answer === i ? (i === s.correct ? "correct" : "selected") : ""} ${reviewMode && i === s.correct ? "correct" : ""}`}
                >
                  <span>{String.fromCharCode(65 + i)}</span>
                  {o}
                  {answer === i && i === s.correct && <Check className="ml-auto" />}
                </button>
              ))}
            </div>

            {answer !== undefined && (
              <>
                <Feedback correct={answer === s.correct}>
                  {answer === s.correct
                    ? s.explanation
                    : `Esta opción no aborda el problema con suficiente control. ${s.explanation}`}
                </Feedback>

                {/* Business flow */}
                <MiniFlow items={s.chain} />

                {/* Risk */}
                <div className="mt-4 rounded-lg border border-coral/30 bg-coral/5 p-3">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-coral">Riesgo a considerar</span>
                  <p className={`mt-1 ${teacherMode ? "text-sm" : "text-xs"} leading-relaxed text-muted-foreground`}>
                    {s.risk}
                  </p>
                </div>
              </>
            )}

            <div className="mt-5 flex items-center justify-between">
              <Button
                variant="ghost"
                disabled={idx === 0}
                onClick={() => { setIdx(idx - 1); }}
              >
                <ChevronLeft />
                Anterior
              </Button>
              <span className="font-mono text-xs text-muted-foreground">{idx + 1} / {scenarios.length}</span>
              {idx < scenarios.length - 1 ? (
                <Button
                  variant="outline"
                  onClick={() => setIdx(idx + 1)}
                >
                  Siguiente
                  <ChevronRight />
                </Button>
              ) : allDone ? (
                <Button onClick={() => setShowResult(true)}>
                  Ver resultado
                  <TrendingUp />
                </Button>
              ) : (
                <Button variant="outline" disabled>
                  Último escenario
                </Button>
              )}
            </div>

            {reviewMode && (
              <div className="mt-3 flex justify-center">
                <Button variant="ghost" size="sm" onClick={resetSimulator}>
                  <RotateCcwIcon /> Reiniciar simulador
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function RotateCcwIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>;
}

// ─── PROBLEM LAB ──────────────────────────────────────────────────────────────

function ProblemLab() {
  const { teacherMode } = useTeacherMode();
  const [sel, setSel] = useState(0);
  const item = problemMaps[sel] ?? problemMaps[0];
  if (!item) return null;
  const labels = ["Problema", "Información necesaria", "Posible uso de IA", "Resultado", "Decisión", "KPI"];
  return (
    <section className="shell py-20">
      <SectionHeading
        eyebrow="Laboratorio problema → valor"
        title="Empieza por el problema, no por la herramienta"
        aside="Selecciona una necesidad empresarial para construir la cadena de valor."
      />
      <div className="mt-8 grid gap-4 lg:grid-cols-[.7fr_1.3fr]">
        <div className="grid grid-cols-2 gap-2">
          {problemMaps.map((p, i) => (
            <button
              key={p[0]}
              onClick={() => setSel(i)}
              className={`problem-button ${sel === i ? "active" : ""}`}
            >
              {p[0]}
            </button>
          ))}
        </div>
        <div className="glass-panel">
          <div className="grid gap-2">
            {labels.map((x, i) => (
              <div key={x} className="flex flex-col items-start">
                <div className="w-full rounded-lg border border-line bg-surface/70 p-3">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-accent">{x}</span>
                  <p className={`mt-1 ${teacherMode ? "text-sm" : "text-xs"} leading-relaxed`}>{item[i]}</p>
                </div>
                {i < labels.length - 1 && (
                  <ArrowDown className="my-1 size-4 text-accent/50" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 rounded-lg border border-amber/30 bg-amber/10 p-5 text-center">
        <p className={`text-muted-foreground line-through ${teacherMode ? "text-base" : "text-sm"}`}>
          ¿Qué IA puedo utilizar?
        </p>
        <p className={`mt-2 font-bold text-amber ${teacherMode ? "text-2xl" : "text-xl"}`}>
          ¿Qué problema empresarial quiero resolver?
        </p>
      </div>
    </section>
  );
}

// ─── NOVA CASE ────────────────────────────────────────────────────────────────

function NovaCase() {
  const { teacherMode } = useTeacherMode();
  const [novaTab, setNovaTab] = useState<"conoce" | "dashboard" | "matriz">("conoce");
  const [matrixInitId, setMatrixInitId] = useState<string>("");
  const [matrixImpact, setMatrixImpact] = useState<"alto" | "bajo" | "">("");
  const [matrixFacility, setMatrixFacility] = useState<"facil" | "dificil" | "">("");
  const [matrixSubmitted, setMatrixSubmitted] = useState(false);

  const selectedInit = matrixInitiatives.find((m) => m.id === matrixInitId);
  const getFeedback = () => {
    if (!selectedInit || !matrixImpact || !matrixFacility) return "";
    const key = `${matrixImpact === "alto" ? "alto" : "bajo"}${matrixFacility === "facil" ? "Facil" : "Dificil"}` as keyof typeof selectedInit.feedback;
    return selectedInit.feedback[key];
  };

  const resetMatrix = () => {
    setMatrixInitId("");
    setMatrixImpact("");
    setMatrixFacility("");
    setMatrixSubmitted(false);
  };

  return (
    <section id="nova" className="band">
      <div className="shell">
        <SectionHeading
          eyebrow="Caso transversal del curso"
          title="NOVA S.A.C."
          aside={novaProfile.disclaimer}
        />

        {/* Tab nav */}
        <div className="mt-6 flex flex-wrap gap-2">
          {(["conoce", "dashboard", "matriz"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setNovaTab(t)}
              className={`rounded-lg border px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-200 ${novaTab === t ? "border-accent bg-accent/10 text-accent" : "border-line text-muted-foreground hover:border-accent/40 hover:text-foreground"}`}
            >
              {t === "conoce" ? "Conoce NOVA" : t === "dashboard" ? "Dashboard" : "Priorización"}
            </button>
          ))}
        </div>

        {/* ── CONOCE NOVA ── */}
        {novaTab === "conoce" && (
          <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
            <div className="glass-panel">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-xl bg-accent/15 font-mono text-lg font-black text-accent">N</span>
                <div>
                  <h3 className={`font-black uppercase ${teacherMode ? "text-2xl" : "text-xl"}`}>{novaProfile.name}</h3>
                  <p className="font-mono text-[10px] uppercase text-muted-foreground">{novaProfile.tagline}</p>
                </div>
              </div>
              <p className={`mt-4 leading-relaxed text-muted-foreground ${teacherMode ? "text-base" : "text-sm"}`}>
                {novaProfile.description}
              </p>
              <div className="mt-4">
                <p className="font-mono text-[9px] uppercase tracking-wider text-accent mb-2">Áreas de la empresa</p>
                <div className="flex flex-wrap gap-1.5">
                  {novaProfile.areas.map((a) => (
                    <span key={a} className="rounded-md border border-line bg-surface px-2 py-0.5 text-xs">{a}</span>
                  ))}
                </div>
              </div>
              <p className="mt-4 rounded-md bg-amber/10 border border-amber/20 px-3 py-2 font-mono text-[10px] uppercase text-amber">
                NOVA acompañará al estudiante durante todo el curso.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="glass-panel">
                <p className="font-mono text-[9px] uppercase tracking-wider text-coral mb-3">Problemas actuales</p>
                <ul className="grid gap-2">
                  {novaProfile.problems.map((p) => (
                    <li key={p} className={`flex items-start gap-2 ${teacherMode ? "text-sm" : "text-xs"}`}>
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-coral" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-panel">
                <p className="font-mono text-[9px] uppercase tracking-wider text-accent mb-3">Qué lograremos en el curso</p>
                <ul className="grid gap-2">
                  {novaProfile.goals.map((g) => (
                    <li key={g} className={`flex items-start gap-2 ${teacherMode ? "text-sm" : "text-xs"}`}>
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-accent" />
                      {g}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* ── DASHBOARD ── */}
        {novaTab === "dashboard" && (
          <div className="mt-8">
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-flex rounded-full border border-amber/30 bg-amber/10 px-2.5 py-1 font-mono text-[9px] uppercase text-amber">
                {novaProfile.disclaimer}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {novaMetrics.map((m) => (
                <NovaMetricCard key={m.label} {...m} />
              ))}
            </div>
            <div className="mt-6 glass-panel">
              <p className={`font-semibold ${teacherMode ? "text-base" : "text-sm"}`}>
                ¿Qué nos dicen estos números?
              </p>
              <p className={`mt-2 leading-relaxed text-muted-foreground ${teacherMode ? "text-sm" : "text-xs"}`}>
                NOVA está creciendo, pero también aumentan sus fricciones operativas. 
                120 reclamos mensuales sin análisis sistemático, 1,500 correos sin clasificar 
                y 18 reportes construidos manualmente cada mes representan oportunidades concretas 
                donde la IA puede generar valor medible.
              </p>
              <p className={`mt-3 font-mono uppercase tracking-widest text-accent ${teacherMode ? "text-sm" : "text-[10px]"}`}>
                Todos los datos son simulados · Caso educativo
              </p>
            </div>
          </div>
        )}

        {/* ── PRIORITY MATRIX ── */}
        {novaTab === "matriz" && (
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            {/* Controls */}
            <div className="glass-panel">
              <h3 className={`font-bold uppercase ${teacherMode ? "text-xl" : "text-lg"}`}>
                Matriz de priorización
              </h3>
              <p className={`mt-1 text-muted-foreground ${teacherMode ? "text-sm" : "text-xs"}`}>
                Evalúa una iniciativa de IA para NOVA según su impacto y facilidad de implementación.
              </p>

              <div className="mt-5 grid gap-4">
                <div>
                  <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">
                    1. Selecciona una iniciativa
                  </label>
                  <div className="grid gap-2">
                    {matrixInitiatives.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => { setMatrixInitId(m.id); setMatrixSubmitted(false); }}
                        className={`rounded-lg border p-3 text-left transition-all duration-200 ${matrixInitId === m.id ? "border-accent bg-accent/10" : "border-line bg-surface/60 hover:border-accent/40"}`}
                      >
                        <p className={`font-semibold ${teacherMode ? "text-sm" : "text-xs"}`}>{m.label}</p>
                        <p className={`mt-0.5 text-muted-foreground ${teacherMode ? "text-sm" : "text-[10px]"}`}>{m.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {matrixInitId && (
                  <div className="rise grid gap-4">
                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">
                        2. Impacto empresarial
                      </label>
                      <div className="flex gap-2">
                        {(["alto", "bajo"] as const).map((v) => (
                          <button
                            key={v}
                            onClick={() => { setMatrixImpact(v); setMatrixSubmitted(false); }}
                            className={`flex-1 rounded-lg border py-2 text-xs font-bold uppercase transition-all duration-200 ${matrixImpact === v ? "border-accent bg-accent/10 text-accent" : "border-line text-muted-foreground hover:border-accent/30"}`}
                          >
                            {v === "alto" ? "Alto impacto" : "Bajo impacto"}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground block mb-2">
                        3. Facilidad de implementación
                      </label>
                      <div className="flex gap-2">
                        {(["facil", "dificil"] as const).map((v) => (
                          <button
                            key={v}
                            onClick={() => { setMatrixFacility(v); setMatrixSubmitted(false); }}
                            className={`flex-1 rounded-lg border py-2 text-xs font-bold uppercase transition-all duration-200 ${matrixFacility === v ? "border-accent bg-accent/10 text-accent" : "border-line text-muted-foreground hover:border-accent/30"}`}
                          >
                            {v === "facil" ? "Fácil" : "Difícil"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {matrixInitId && matrixImpact && matrixFacility && (
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          onClick={() => setMatrixSubmitted(true)}
                        >
                          Ver evaluación
                          <BarChart3 />
                        </Button>
                        <Button variant="outline" onClick={resetMatrix}>
                          Reiniciar
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Matrix visual + feedback */}
            <div className="grid gap-4">
              {/* Visual matrix */}
              <div className="glass-panel">
                <div className="flex justify-between gap-2">
                  <h3 className={`font-bold uppercase ${teacherMode ? "text-lg" : "text-base"}`}>
                    Impacto × Facilidad
                  </h3>
                  <span className="eyebrow">Vista visual</span>
                </div>
                <div className="matrix mt-6">
                  <span className="axis-y">Impacto empresarial</span>
                  <div className={`quadrant q1 ${matrixSubmitted && matrixImpact === "alto" && matrixFacility === "dificil" ? "q-selected" : ""}`}>
                    Alto impacto<br />difícil
                  </div>
                  <div className={`quadrant q2 ${matrixSubmitted && matrixImpact === "alto" && matrixFacility === "facil" ? "q-selected" : ""}`}>
                    Alto impacto<br />fácil ★
                  </div>
                  <div className={`quadrant q3 ${matrixSubmitted && matrixImpact === "bajo" && matrixFacility === "dificil" ? "q-selected" : ""}`}>
                    Bajo impacto<br />difícil
                  </div>
                  <div className={`quadrant q4 ${matrixSubmitted && matrixImpact === "bajo" && matrixFacility === "facil" ? "q-selected" : ""}`}>
                    Bajo impacto<br />fácil
                  </div>
                </div>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Facilidad de implementación →
                </p>
              </div>

              {/* Feedback */}
              {matrixSubmitted && selectedInit && (
                <div className="rise glass-panel border-accent/30">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-accent mb-1">Tu evaluación</p>
                  <p className={`font-bold ${teacherMode ? "text-base" : "text-sm"}`}>{selectedInit.label}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] text-accent">
                      Impacto: {matrixImpact}
                    </span>
                    <span className="rounded-full border border-amber/30 bg-amber/10 px-2 py-0.5 font-mono text-[10px] text-amber">
                      Facilidad: {matrixFacility === "facil" ? "alta" : "baja"}
                    </span>
                  </div>
                  <p className={`mt-3 leading-relaxed text-muted-foreground ${teacherMode ? "text-sm" : "text-xs"}`}>
                    {getFeedback()}
                  </p>
                  <p className={`mt-3 border-t border-line pt-3 text-muted-foreground ${teacherMode ? "text-sm" : "text-[10px]"}`}>
                    La matriz es una herramienta de análisis, no una receta. La decisión final siempre requiere contexto, datos y criterio del equipo.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── HUMAN + AI ───────────────────────────────────────────────────────────────

function HumanAI() {
  const { teacherMode } = useTeacherMode();
  const iaItems = ["Procesar grandes volúmenes de información", "Encontrar patrones", "Clasificar y categorizar", "Resumir documentos", "Generar alternativas", "Proponer estructuras"];
  const humanItems = ["Definir objetivos y prioridades", "Comprender el contexto real", "Cuestionar y validar resultados", "Considerar consecuencias", "Tomar responsabilidad", "Decidir"];
  return (
    <section className="shell py-20">
      <SectionHeading
        eyebrow="Colaboración"
        title="IA + criterio humano"
        aside="La responsabilidad final sigue requiriendo personas."
      />
      <div className="mt-8 grid gap-3 md:grid-cols-[1fr_auto_1fr]">
        <RoleCard title="IA" items={iaItems} accent />
        <div className="collaboration">
          <span>+</span>
          <strong>Colaboración</strong>
        </div>
        <RoleCard title="Persona" items={humanItems} />
      </div>
      <div className="mt-8 rounded-xl border border-accent/20 bg-accent/5 p-6 text-center">
        <p className={`font-bold ${teacherMode ? "text-2xl" : "text-xl"}`}>
          La IA amplifica capacidades; el criterio humano define cómo utilizarlas.
        </p>
        <p className={`mt-3 text-muted-foreground ${teacherMode ? "text-base" : "text-sm"}`}>
          La calidad de una solución empresarial con IA depende tanto de la tecnología como del criterio con el que se aplica.
        </p>
      </div>
    </section>
  );
}

function RoleCard({ title, items, accent = false }: { title: string; items: string[]; accent?: boolean }) {
  const { teacherMode } = useTeacherMode();
  return (
    <div className={`glass-panel ${accent ? "border-accent/40" : "border-amber/40"}`}>
      <h3 className={`font-bold uppercase ${accent ? "text-accent" : "text-amber"} ${teacherMode ? "text-3xl" : "text-2xl"}`}>
        {title}
      </h3>
      <ul className="mt-5 grid gap-3">
        {items.map((x) => (
          <li className={`flex items-center gap-3 ${teacherMode ? "text-base" : "text-sm"}`} key={x}>
            <span className={`size-1.5 shrink-0 rounded-full ${accent ? "bg-accent" : "bg-amber"}`} />
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── RISKS ────────────────────────────────────────────────────────────────────

function Risks() {
  return (
    <section className="band">
      <div className="shell">
        <SectionHeading
          eyebrow="Uso responsable"
          title="Riesgos y limitaciones"
          aside="Abre cada riesgo para revisar un ejemplo y cómo reducirlo."
        />
        <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {risks.map((r) => (
            <RiskCard
              key={r.title}
              title={r.title}
              description={r.description}
              example={r.example}
              solution={r.solution}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CHALLENGE ─────────────────────────────────────────────────────────

const challengeQuestions = [
  "¿Cuál es el problema empresarial?",
  "¿Qué información existe o se puede obtener?",
  "¿Cómo podría apoyar la IA en este proceso?",
  "¿Qué resultado esperarías obtener?",
  "¿Quién debería validar el resultado?",
  "¿Qué KPI utilizarías para medir el impacto?",
];

function FinalChallenge() {
  const { teacherMode } = useTeacherMode();
  const [topic, setTopic] = useState("Ventas");
  const [answers, setAnswers] = useState<string[]>(Array(6).fill(""));
  const [generated, setGenerated] = useState(false);
  const complete = answers.every(Boolean);

  const reset = () => {
    setAnswers(Array(6).fill(""));
    setGenerated(false);
  };

  return (
    <section id="reto" className="shell py-20">
      <SectionHeading
        eyebrow="Reto final"
        title="Tu primer reto como gestor de IA"
        aside="Formula una hipótesis empresarial completa. Nada se guarda fuera de esta página."
      />
      <div className="mt-8 flex flex-wrap gap-2">
        {["Ventas", "Inventarios", "Atención al cliente", "Operaciones", "Recursos humanos", "Finanzas"].map((x) => (
          <Button
            key={x}
            variant={topic === x ? "default" : "outline"}
            onClick={() => { setTopic(x); reset(); }}
          >
            {x}
          </Button>
        ))}
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_.8fr]">
        <form className="glass-panel" onSubmit={(e) => e.preventDefault()}>
          <span className="eyebrow">Área seleccionada · {topic}</span>
          <div className="mt-5 grid gap-4">
            {challengeQuestions.map((q, i) => (
              <label key={q} className={`grid gap-2 font-semibold ${teacherMode ? "text-base" : "text-sm"}`}>
                {i + 1}. {q}
                <textarea
                  rows={2}
                  value={answers[i]}
                  onChange={(e) => setAnswers((a) => a.map((x, j) => (j === i ? e.target.value : x)))}
                  className="field"
                  placeholder="Escribe una respuesta breve..."
                />
              </label>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <ResetButton onClick={reset} label="Reiniciar reto" />
            {complete && !generated && (
              <Button onClick={() => setGenerated(true)}>
                Generar mi mapa de valor
                <ArrowRight />
              </Button>
            )}
          </div>
        </form>

        <aside className="h-fit lg:sticky lg:top-28">
          {generated ? (
            <ValueMapCard
              area={topic}
              answers={answers}
              onEdit={() => setGenerated(false)}
              onReset={reset}
            />
          ) : (
            <div className="glass-panel">
              <span className="eyebrow">Tu mapa de valor</span>
              <div className="mt-5 grid gap-2">
                {["Problema", "Información", "IA", "Resultado", "Responsable", "KPI"].map((x, i) => (
                  <div key={x} className={`challenge-step ${answers[i] ? "filled" : ""}`}>
                    <span>{x}</span>
                    <p>{answers[i] || "Pendiente"}</p>
                    {i < 5 && <ArrowDown />}
                  </div>
                ))}
              </div>
              {complete && (
                <div className="mt-5 flex items-center gap-3 rounded-lg bg-accent/10 p-4 text-sm text-accent">
                  <ShieldCheck />
                  Hipótesis completa: pulsa "Generar mi mapa de valor".
                </div>
              )}
            </div>
          )}
        </aside>
      </div>

      {/* Project integrator connection */}
      <div className="mt-12 rounded-xl border border-accent/20 bg-accent/5 p-8">
        <h3 className={`font-bold uppercase ${teacherMode ? "text-2xl" : "text-xl"}`}>
          Esto acaba de comenzar
        </h3>
        <p className={`mt-3 max-w-2xl leading-relaxed text-muted-foreground ${teacherMode ? "text-base" : "text-sm"}`}>
          El mapa que acabas de construir utiliza la misma lógica que emplearemos al final del curso para diseñar una solución completa de Inteligencia Artificial aplicada a un proceso empresarial.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-2">
          {["Problema", "Herramientas", "Datos", "Procesos", "IA", "Validación", "Resultados", "KPIs"].map((x, i, arr) => (
            <div key={x} className="flex items-center gap-2">
              <span className="rounded-md border border-line bg-surface px-3 py-1.5 text-xs font-semibold">{x}</span>
              {i < arr.length - 1 && <ArrowRight className="size-3 text-accent/60 shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ROADMAP ──────────────────────────────────────────────────────────────────

function Roadmap() {
  const { teacherMode } = useTeacherMode();
  return (
    <section id="ruta" className="band">
      <div className="shell">
        <SectionHeading
          eyebrow="Cierre y ruta del curso"
          title="Hoy descubriste dónde puede generar valor la IA"
          aside="Durante el curso aprenderás cómo construir esas soluciones."
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {courseRoute.map((x, i) => (
            <div className={`roadmap-item ${i === 0 ? "current" : ""}`} key={x}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <strong className={teacherMode ? "text-base" : "text-sm"}>{x}</strong>
            </div>
          ))}
        </div>
        <div className="mt-12 border-l-2 border-accent pl-5">
          <p className="eyebrow">Pregunta final</p>
          <p className={`mt-2 max-w-3xl font-semibold ${teacherMode ? "text-3xl" : "text-2xl"}`}>
            Si mañana tuvieras que implementar IA en una empresa, ¿qué proceso analizarías primero y por qué?
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer({ progress, visited }: { progress: number; visited: Set<string> }) {
  const completedActivities = [];
  if (visited.has("explorar")) completedActivities.push("✓ Explorador visitado");
  if (visited.has("simulador")) completedActivities.push("✓ Simulador iniciado");
  if (visited.has("nova")) completedActivities.push("✓ NOVA analizada");
  if (visited.has("reto")) completedActivities.push("✓ Reto visitado");

  return (
    <footer className="relative z-10 border-t border-line bg-background/80">
      <div className="shell py-6">
        <div className="flex flex-wrap justify-between gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>AI Business Explorer · Masterclass</span>
          <span>Masterclass · {progress}% explorado</span>
          <span>La decisión y responsabilidad final siguen siendo humanas</span>
        </div>
        {completedActivities.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {completedActivities.map((a) => (
              <span key={a} className="font-mono text-[10px] text-accent">{a}</span>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
}