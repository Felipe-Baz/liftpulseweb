// components/EarlyAccessHighlights.tsx
import React from "react";

interface Highlight {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const highlights: Highlight[] = [
  {
    id: 1,
    title: "Preço Exclusivo",
    description:
      "Garanta um custo especial de apenas R$ 5 por aluno vinculado durante o período de Early Access.",
    icon: <span>💰</span>,
  },
  {
    id: 2,
    title: "Feedback Prioritário",
    description:
      "Suas sugestões terão prioridade no desenvolvimento de novas funcionalidades.",
    icon: <span>📢</span>,
  },
  {
    id: 3,
    title: "Treinos Personalizados",
    description:
      "Ofereça aos seus alunos treinos personalizados e otimize sua gestão.",
    icon: <span>🏋️‍♂️</span>,
  },
  {
    id: 4,
    title: "Relatórios Avançados",
    description:
      "Acompanhe métricas detalhadas de desempenho e progresso dos seus alunos.",
    icon: <span>📈</span>,
  },
];

const EarlyAccessHighlights: React.FC = () => {
  return (
    <section className="space-y-6 py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-card-foreground">
          Destaques do Plano Early Access
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground sm:text-lg">
          Aproveite os benefícios exclusivos do Early Access e saia na frente!
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight) => (
            <div
              key={highlight.id}
              className="flex flex-col items-center p-6 bg-card text-card-foreground shadow rounded-lg border"
            >
              <div className="text-4xl mb-4 text-primary">{highlight.icon}</div>
              <h3 className="text-xl font-semibold">{highlight.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EarlyAccessHighlights;
