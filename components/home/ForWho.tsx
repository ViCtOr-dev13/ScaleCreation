"use client";

import { useState } from "react";

type ItemKey = "pourquoi" | "pourqui" | "comment";

const CONTENT: Record<ItemKey, { label: string; text: string; icon: string }> = {
  pourquoi: {
    label: "Pour Quoi ?",
    icon: "🎯",
    text:
      "Créez des designs professionnels sans compétences techniques. Notre plateforme intuitive transforme vos idées en visuels percutants pour booster votre communication.",
  },
  pourqui: {
    label: "Pour Qui ?",
    icon: "👥",
    text:
      "Pour les créateurs de contenu, entrepreneurs, marketeurs et équipes qui veulent produire des visuels de qualité rapidement, sans dépendre d'un designer.",
  },
  comment: {
    label: "Comment ?",
    icon: "⚡",
    text:
      "Glissez-déposez vos éléments, personnalisez avec nos templates, ajoutez vos images et textes. Exportez en haute qualité. Simple, rapide, professionnel.",
  },
};

const ForSection = () => {
  const [active, setActive] = useState<ItemKey>("pourquoi");

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Boutons avec icônes */}
        <div className="flex flex-wrap justify-left gap-2 mb-8">
          {Object.entries(CONTENT).map(([key, value]) => (
            <button
              key={key}
              type="button"
              onMouseEnter={() => setActive(key as ItemKey)}
              className={`
                group relative px-8 py-4 font-semibold
                transition-all duration-300 ease-out bg-transparent
                border-b-2 flex items-center gap-3
                ${
                  active === key
                    ? "bg-primary border-primary scale-110 shadow-xl shadow-primary/25"
                    : "bg-card border-border hover:border-primary/40 hover:scale-105 hover:shadow-lg"
                }
              `}
            >
              <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                {value.icon}
              </span>
              <span>{value.label}</span>
            </button>
          ))}
        </div>

        {/* Contenu */}
        <div className="relative overflow-hidden rounded-3xl border-border bg-card min-h-[160px]">
          <div className="absolute inset-0  from-primary/5 to-transparent pointer-events-none" />
          
          <div className="relative p-8 md:p-12">
            <div
              key={active}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <div className="flex items-start gap-4">
                <span className="text-5xl">{CONTENT[active].icon}</span>
                <div className="flex-1 space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">
                    {CONTENT[active].label}
                  </h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {CONTENT[active].text}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicateurs */}
        <div className="flex justify-center gap-2 mt-8">
          {Object.keys(CONTENT).map((key) => (
            <button
              key={key}
              onClick={() => setActive(key as ItemKey)}
              className={`
                h-2 rounded-full transition-all duration-300
                ${active === key ? "w-12 bg-primary" : "w-2 bg-border hover:bg-primary/50"}
              `}
              aria-label={`Voir ${key}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForSection;
