import { useState, type ReactNode } from "react";
import { ArrowDown, ArrowRight, Check, ChevronDown, ChevronRight, Gauge, GraduationCap, Lightbulb, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTeacherMode } from "@/hooks/useTeacherMode";

// ─── SECTION HEADING ──────────────────────────────────────────────────────────

export function SectionHeading({
  eyebrow,
  title,
  aside,
}: {
  eyebrow: string;
  title: string;
  aside?: string;
}) {
  const { teacherMode } = useTeacherMode();
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 border-t border-line pt-8">
      <div>
        <p className={`font-mono uppercase tracking-[0.22em] text-accent ${teacherMode ? "text-[13px]" : "text-[11px]"}`}>
          {eyebrow}
        </p>
        <h2 className={`mt-2 max-w-3xl text-balance font-bold uppercase leading-tight ${teacherMode ? "text-3xl sm:text-5xl" : "text-2xl sm:text-4xl"}`}>
          {title}
        </h2>
      </div>
      {aside && (
        <p className={`max-w-sm leading-relaxed text-muted-foreground ${teacherMode ? "text-base" : "text-sm"}`}>
          {aside}
        </p>
      )}
    </div>
  );
}

// ─── KPI BADGE ────────────────────────────────────────────────────────────────

export function KPIBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-3 py-1.5 text-xs font-semibold text-amber">
      <Gauge className="size-3.5" />
      {children}
    </span>
  );
}

// ─── PROCESS FLOW ─────────────────────────────────────────────────────────────

export function ProcessFlow({
  items,
  interactive = false,
  active,
  onSelect,
}: {
  items: readonly (readonly [string, string])[];
  interactive?: boolean;
  active?: number;
  onSelect?: (i: number) => void;
}) {
  const { teacherMode } = useTeacherMode();
  return (
    <div className="grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] md:items-stretch">
      {items.map(([label, detail], i) => (
        <div key={label} className="contents">
          <button
            type="button"
            disabled={!interactive}
            onClick={() => onSelect?.(i)}
            className={`group min-h-28 rounded-lg border p-3 text-left transition-all duration-200 ${
              active === i
                ? "border-accent bg-accent/10 ring-1 ring-accent/30"
                : "border-line bg-glass/70 hover:border-accent/40 hover:bg-glass"
            }`}
          >
            <span className="font-mono text-[10px] text-muted-foreground">0{i + 1}</span>
            <strong className={`mt-2 block uppercase leading-snug ${teacherMode ? "text-sm" : "text-xs"}`}>
              {label}
            </strong>
            {(!interactive || active === i) && (
              <span className={`mt-2 block leading-relaxed text-muted-foreground ${teacherMode ? "text-sm" : "text-[11px]"}`}>
                {detail}
              </span>
            )}
          </button>
          {i < items.length - 1 && (
            <>
              <ArrowRight className="mx-auto hidden size-4 self-center text-accent md:block" />
              <ArrowDown className="mx-auto size-4 text-accent md:hidden" />
            </>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── MINI FLOW (used in simulator) ───────────────────────────────────────────

export function MiniFlow({ items }: { items: string[] }) {
  const labels = ["Problema", "Datos", "IA", "Resultado", "Decisión humana", "KPI"];
  const { teacherMode } = useTeacherMode();
  return (
    <div className={`mt-4 grid gap-2 ${teacherMode ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2 sm:grid-cols-3"}`}>
      {labels.map((x, i) => (
        <div className="rounded-md bg-surface p-2.5" key={x}>
          <span className="font-mono text-[9px] uppercase text-accent">{x}</span>
          <p className={`mt-1 ${teacherMode ? "text-sm" : "text-xs"}`}>{items[i]}</p>
        </div>
      ))}
    </div>
  );
}

// ─── RISK CARD ───────────────────────────────────────────────────────────────

export function RiskCard({
  title,
  description,
  example,
  solution,
}: {
  title: string;
  description: string;
  example: string;
  solution: string;
}) {
  const { teacherMode } = useTeacherMode();
  return (
    <details className="group rounded-lg border border-line bg-surface/60 p-4 open:border-coral/40 transition-all duration-200">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold">
        <span className={teacherMode ? "text-base" : "text-sm"}>{title}</span>
        <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <p className={`mt-3 leading-relaxed text-muted-foreground ${teacherMode ? "text-sm" : "text-xs"}`}>
        {description}
      </p>
      <div className="mt-3 rounded-md border border-amber/20 bg-amber/5 p-3">
        <span className="font-mono text-[9px] uppercase tracking-widest text-amber">Ejemplo empresarial</span>
        <p className={`mt-1 text-muted-foreground ${teacherMode ? "text-sm" : "text-xs"}`}>{example}</p>
      </div>
      <div className="mt-3 border-l-2 border-accent pl-3">
        <span className="font-mono text-[9px] uppercase tracking-widest text-accent">Cómo reducir el riesgo</span>
        <p className={`mt-1 ${teacherMode ? "text-sm" : "text-xs"}`}>{solution}</p>
      </div>
    </details>
  );
}

// ─── FEEDBACK ─────────────────────────────────────────────────────────────────

export function Feedback({
  correct,
  children,
}: {
  correct: boolean;
  children: ReactNode;
}) {
  const { teacherMode } = useTeacherMode();
  return (
    <div
      role="status"
      className={`mt-4 rounded-lg border p-4 ${
        correct ? "border-accent/40 bg-accent/10" : "border-amber/40 bg-amber/10"
      }`}
    >
      <div className="flex items-center gap-2 font-semibold">
        <span
          className={`grid size-6 place-items-center rounded-full ${
            correct ? "bg-accent text-accent-ink" : "bg-amber text-accent-ink"
          }`}
        >
          {correct ? <Check className="size-4" /> : <Lightbulb className="size-4" />}
        </span>
        <span className={teacherMode ? "text-base" : "text-sm"}>
          {correct ? "Correcto" : "Buena reflexión: revisemos la alternativa"}
        </span>
      </div>
      <p className={`mt-2 text-muted-foreground ${teacherMode ? "text-sm" : "text-xs"}`}>{children}</p>
    </div>
  );
}

// ─── RESET BUTTON ─────────────────────────────────────────────────────────────

export function ResetButton({ onClick, label = "Reiniciar reto" }: { onClick: () => void; label?: string }) {
  return (
    <Button variant="outline" onClick={onClick}>
      <RotateCcw />
      {label}
    </Button>
  );
}

// ─── TEACHER MODE TOGGLE ──────────────────────────────────────────────────────

export function TeacherModeToggle({ collapsed = false }: { collapsed?: boolean }) {
  const { teacherMode, toggleTeacherMode } = useTeacherMode();
  return (
    <button
      onClick={toggleTeacherMode}
      title={teacherMode ? "Desactivar modo docente" : "Activar modo docente"}
      aria-pressed={teacherMode}
      className={`flex items-center gap-2 rounded-lg border px-2 py-1.5 text-xs font-semibold transition-all duration-200 ${
        teacherMode
          ? "border-accent bg-accent/15 text-accent"
          : "border-line bg-surface/50 text-muted-foreground hover:border-accent/40 hover:text-foreground"
      }`}
    >
      <GraduationCap className="size-4 shrink-0" />
      {!collapsed && <span>{teacherMode ? "Modo Docente ON" : "Modo Docente"}</span>}
    </button>
  );
}

// ─── STEP REVEAL (progressive reveal for teacher mode) ──────────────────────

export function StepReveal({
  steps,
  labels,
}: {
  steps: ReactNode[];
  labels?: string[];
}) {
  const { teacherMode } = useTeacherMode();
  const [current, setCurrent] = useState(0);

  if (!teacherMode) {
    return <>{steps}</>;
  }

  return (
    <div className="grid gap-4">
      {steps.slice(0, current + 1).map((step, i) => (
        <div key={i} className="rise">
          {labels?.[i] && (
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-accent">
              Paso {i + 1}: {labels[i]}
            </p>
          )}
          {step}
        </div>
      ))}
      {current < steps.length - 1 && (
        <Button
          variant="outline"
          className="mt-2 w-fit"
          onClick={() => setCurrent((c) => c + 1)}
        >
          Continuar
          <ChevronRight className="size-4" />
        </Button>
      )}
      {current > 0 && (
        <button
          onClick={() => setCurrent(0)}
          className="mt-1 font-mono text-[10px] uppercase text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
        >
          Reiniciar presentación
        </button>
      )}
    </div>
  );
}

// ─── VALUE MAP CARD (Reto final result) ──────────────────────────────────────

export function ValueMapCard({
  area,
  answers,
  onEdit,
  onReset,
}: {
  area: string;
  answers: string[];
  onEdit: () => void;
  onReset: () => void;
}) {
  const labels = ["Problema", "Información", "IA", "Resultado", "Responsable", "KPI"];
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const text = labels
      .map((l, i) => `${l}: ${answers[i] || "—"}`)
      .join("\n");
    const full = `MAPA DE VALOR IA — ${area}\n${"─".repeat(30)}\n${text}\n\nGenerado con AI Business Explorer · Masterclass`;
    navigator.clipboard.writeText(full).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="value-map-card glass-panel">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent">Mapa de valor IA</p>
          <p className="mt-1 text-sm font-bold uppercase">{area}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onEdit}>Editar</Button>
          <Button variant="ghost" size="sm" onClick={onReset}>Reiniciar</Button>
          <Button variant="outline" size="sm" onClick={copyToClipboard}>
            {copied ? <Check className="size-3" /> : null}
            {copied ? "Copiado" : "Copiar"}
          </Button>
        </div>
      </div>
      <div className="mt-4 grid gap-0">
        {labels.map((label, i) => (
          <div key={label} className="flex flex-col items-center">
            <div className="w-full rounded-lg border border-line bg-surface/70 p-3">
              <span className="font-mono text-[9px] uppercase tracking-wider text-accent">{label}</span>
              <p className="mt-1 text-sm font-medium">{answers[i] || "—"}</p>
            </div>
            {i < labels.length - 1 && (
              <ArrowDown className="my-1 size-4 shrink-0 text-accent/60" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── NOVA METRIC CARD ─────────────────────────────────────────────────────────

export function NovaMetricCard({
  label,
  value,
  unit,
  trend,
}: {
  label: string;
  value: string;
  unit: string;
  trend: "up" | "down" | "neutral";
}) {
  const trendColor =
    trend === "up" ? "text-coral" : trend === "down" ? "text-accent" : "text-muted-foreground";
  const trendSymbol = trend === "up" ? "▲" : trend === "down" ? "▼" : "●";

  return (
    <div className="nova-metric-card">
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground leading-tight">
          {label}
        </span>
        <span className={`font-mono text-[10px] ${trendColor}`}>{trendSymbol}</span>
      </div>
      <p className="mt-2 text-2xl font-black">{value}</p>
      <p className="text-[10px] text-muted-foreground">{unit}</p>
    </div>
  );
}

// ─── SIMULATOR RESULT ─────────────────────────────────────────────────────────

export function SimulatorResult({
  score,
  total,
  onReview,
  onReset,
}: {
  score: number;
  total: number;
  onReview: () => void;
  onReset: () => void;
}) {
  const pct = score / total;
  const level =
    pct >= 0.83
      ? { label: "Muy buen criterio", color: "text-accent", bg: "bg-accent/10 border-accent/30" }
      : pct >= 0.5
      ? { label: "Buen criterio", color: "text-amber", bg: "bg-amber/10 border-amber/30" }
      : { label: "En desarrollo", color: "text-coral", bg: "bg-coral/10 border-coral/30" };

  return (
    <div className={`rise rounded-xl border p-6 text-center ${level.bg}`}>
      <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">Resultado del simulador</p>
      <p className={`mt-3 text-5xl font-black ${level.color}`}>
        {score}<span className="text-2xl text-muted-foreground">/{total}</span>
      </p>
      <p className={`mt-2 text-lg font-bold uppercase ${level.color}`}>{level.label}</p>
      <p className="mt-3 text-sm text-muted-foreground">
        {score === total
          ? "Excelente análisis en todos los escenarios."
          : score >= total * 0.5
          ? "Buen punto de partida. Revisar los escenarios donde hubo dudas."
          : "Cada escenario es una oportunidad de aprendizaje. Revisa las explicaciones."}
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <Button onClick={onReview} variant="outline">Revisar respuestas</Button>
        <Button onClick={onReset} variant="ghost">
          <RotateCcw className="size-4" />
          Reiniciar simulador
        </Button>
      </div>
    </div>
  );
}