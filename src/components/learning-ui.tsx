import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, Check, ChevronDown, Gauge, Lightbulb, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SectionHeading({eyebrow,title,aside}:{eyebrow:string;title:string;aside?:string}) {
 return <div className="flex flex-wrap items-end justify-between gap-3 border-t border-line pt-8"><div><p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{eyebrow}</p><h2 className="mt-2 max-w-3xl text-balance text-2xl font-bold uppercase leading-tight sm:text-4xl">{title}</h2></div>{aside&&<p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{aside}</p>}</div>
}

export function KPIBadge({children}:{children:ReactNode}) { return <span className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-3 py-1.5 text-xs font-semibold text-amber"><Gauge className="size-3.5"/>{children}</span> }

export function ProcessFlow({items,interactive=false,active,onSelect}:{items:readonly (readonly [string,string])[];interactive?:boolean;active?:number;onSelect?:(i:number)=>void}) {
 return <div className="grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] md:items-stretch">{items.map(([label,detail],i)=><div key={label} className="contents"><button type="button" disabled={!interactive} onClick={()=>onSelect?.(i)} className={`group min-h-28 rounded-lg border p-3 text-left transition ${active===i?"border-accent bg-accent/10 ring-1 ring-accent/30":"border-line bg-glass/70 hover:border-accent/40"}`}><span className="font-mono text-[10px] text-muted-foreground">0{i+1}</span><strong className="mt-2 block text-xs uppercase leading-snug">{label}</strong>{(!interactive||active===i)&&<span className="mt-2 block text-[11px] leading-relaxed text-muted-foreground">{detail}</span>}</button>{i<items.length-1&&<ArrowRight className="mx-auto hidden size-4 self-center text-accent md:block"/>}{i<items.length-1&&<ArrowDown className="mx-auto size-4 text-accent md:hidden"/>}</div>)}</div>
}

export function RiskCard({title,description,solution}:{title:string;description:string;solution:string}) { return <details className="group rounded-lg border border-line bg-surface/60 p-4 open:border-coral/40"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold"><span>{title}</span><ChevronDown className="size-4 text-muted-foreground transition group-open:rotate-180"/></summary><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p><div className="mt-4 border-l-2 border-accent pl-3"><span className="font-mono text-[10px] uppercase tracking-widest text-accent">Cómo reducir el riesgo</span><p className="mt-1 text-sm">{solution}</p></div></details> }

export function Feedback({correct,children}:{correct:boolean;children:ReactNode}) { return <div role="status" className={`mt-4 rounded-lg border p-4 ${correct?"border-accent/40 bg-accent/10":"border-amber/40 bg-amber/10"}`}><div className="flex items-center gap-2 font-semibold"><span className={`grid size-6 place-items-center rounded-full ${correct?"bg-accent text-accent-ink":"bg-amber text-accent-ink"}`}>{correct?<Check className="size-4"/>:<Lightbulb className="size-4"/>}</span>{correct?"Correcto":"Buena reflexión: revisemos la alternativa"}</div><p className="mt-2 text-sm text-muted-foreground">{children}</p></div> }

export function ResetButton({onClick}:{onClick:()=>void}) { return <Button variant="outline" onClick={onClick}><RotateCcw/>Reiniciar reto</Button> }