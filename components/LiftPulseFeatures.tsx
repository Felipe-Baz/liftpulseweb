// components/LiftPulseFeatures.tsx
import React from "react";

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    id: 1,
    title: "Treinos Personalizados",
    description:
      "Crie, salve e execute treinos personalizados para cada aluno, com registros detalhados.",
    icon: <span>🏋️‍♀️</span>,
  },
  {
    id: 2,
    title: "Acompanhamento de Progresso",
    description:
      "Gráficos e relatórios que mostram o progresso de carga, volume e frequência dos treinos.",
    icon: <span>📈</span>,
  },
  {
    id: 3,
    title: "Biblioteca de Treinos",
    description:
      "Acesse uma vasta coleção de treinos prontos para diferentes objetivos e níveis.",
    icon: <span>📚</span>,
  },
  {
    id: 4,
    title: "Gestão de Alunos",
    description:
      "Gerencie os alunos da sua academia de forma eficiente e acompanhe seu desempenho.",
    icon: <span>👥</span>,
  },
  {
    id: 5,
    title: "Notificações Personalizadas",
    description:
      "Envie notificações e lembretes para manter os alunos motivados e engajados.",
    icon: <span>🔔</span>,
  },
  {
    id: 6,
    title: "Relatórios Avançados",
    description:
      "Tenha acesso a insights detalhados para melhorar os resultados de cada aluno.",
    icon: <span>📊</span>,
  },
];

const LiftPulseFeatures: React.FC = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-card-foreground">
          Funcionalidades do LiftPulse
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground sm:text-lg">
          Descubra as principais funcionalidades que tornam o LiftPulse a melhor
          escolha para academias e alunos.
        </p>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center p-6 bg-card text-card-foreground shadow rounded-lg border border-muted-foreground"
            >
              <div className="text-4xl mb-4 text-primary">{feature.icon}</div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiftPulseFeatures;
