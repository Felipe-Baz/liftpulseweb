import BenefitsForGyms from "@/components/BenefitsForGyms";
import CallToBetaTesters from "@/components/CallToBetaTesters";
import EarlyAccessHighlights from "@/components/EarlyAccessHighlights";
import FAQ from "@/components/FAQ";
import { Hero } from "@/components/hero";
import LiftPulseFeatures from "@/components/LiftPulseFeatures";
import { PricingGrid } from "@/components/pricing";
import { stackServerApp } from "@/stack";

export default async function IndexPage() {
  const project = await stackServerApp.getProject();
  if (!project.config.clientTeamCreationEnabled) {
    return (
      <div className="w-full min-h-96 flex items-center justify-center">
        <div className="max-w-xl gap-4">
          <p className="font-bold text-xl">Setup Required</p>
          <p className="">
            {
              "To start using this project, please enable client-side team creation in the Stack Auth dashboard (Project > Team Settings). This message will disappear once the feature is enabled."
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Hero
        title="Transforme a Experiência dos Seus Alunos com o LiftPulse!"
        subtitle="O aplicativo completo para treinos personalizados e gestão de academias. Early Access promocional disponível!"
        primaryCtaText="Participe do Beta Teste"
        primaryCtaLink="https://forms.gle/6DT6awF1XbrdDjxRA"
        secondaryCtaText="Saiba Mais para Academias"
        secondaryCtaLink="https://github.com/LiftPulse/"
        credits={
          <>
            Desenvolvido com ❤️ pelo time{" "}
            <a
              href="https://github.com/LiftPulse"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              LiftPulse
            </a>
          </>
        }
      />

      <div id="benefits" />
      <BenefitsForGyms />

      <div id="early-access" />
      <EarlyAccessHighlights />

      <div id="features" />
      <LiftPulseFeatures />

      <div id="beta-testers" />
      <CallToBetaTesters />

      <div id="faq" />
      <FAQ />

      {/* <div id="pricing" />
      <PricingGrid
        title="Pricing"
        subtitle="Flexible plans for every team."
        items={[
          {
            title: "Basic - Acesso antecipado",
            price: "R$5.00",
            price_unit: " por usuário/aluno",
            description: "Para Academias low-cost e de porte medio",
            features: [
              "Acompanhar os treinos dos alunos",
              "Construir Treinos de maneira rapida",
              "Comunidade",
              "plano premium a todos alunos",
              "No credit card required",
            ],
            buttonText: "Get Started",
            buttonHref: stackServerApp.urls.signUp,
          },
          {
            title: "Enterprise",
            price: "A discutir",
            price_unit: "",
            description: "For large organizations.",
            features: [
              "Full source code",
              "100% Open-source",
              "Community support",
              "Free forever",
              "No credit card required",
            ],
            buttonText: "Contact Us",
            buttonHref: stackServerApp.urls.signUp,
          },
        ]}
      /> */}

    </>
  );
}
