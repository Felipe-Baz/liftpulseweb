// components/BenefitsForGyms.tsx
import { cn } from "@/lib/utils";
import React from "react";
import { buttonVariants } from "./ui/button";

interface Benefit {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const benefits: Benefit[] = [
  {
    id: 1,
    title: "Gestão Centralizada",
    description: "Gerencie treinos e progresso dos seus alunos em um só lugar.",
    icon: <span>📊</span>,
  },
  {
    id: 2,
    title: "Relatórios Detalhados",
    description: "Acompanhe o desempenho de cada aluno com relatórios fáceis de interpretar.",
    icon: <span>📈</span>,
  },
  {
    id: 3,
    title: "Economia de Tempo",
    description: "Otimize o trabalho dos instrutores e melhore o atendimento.",
    icon: <span>⏱️</span>,
  },
  {
    id: 4,
    title: "Diferencial Competitivo",
    description: "Atraia mais alunos com uma experiência digital moderna e interativa.",
    icon: <span>🚀</span>,
  },
];

const BenefitsForGyms: React.FC = () => {
  return (
    <section className="space-y-6 py-8 md:py-12 lg:py-16">
      <div className="container flex flex-col items-center text-center">
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl">
          Por que o LiftPulse é ideal para sua academia?
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground sm:text-lg">
          Descubra como o LiftPulse pode transformar a experiência dos seus alunos e otimizar a gestão da sua academia.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="flex flex-col items-center p-6 bg-card text-card-foreground shadow rounded-lg border"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <a
            href="https://calendly.com/fbazmitsuishi/30min"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }))}
          >
            Agende uma Demonstração
          </a>
        </div>
      </div>
    </section>
  );
};

export default BenefitsForGyms;
