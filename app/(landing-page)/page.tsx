import BenefitsForGyms from "@/components/BenefitsForGyms";
import CallToBetaTesters from "@/components/CallToBetaTesters";
import EarlyAccessHighlights from "@/components/EarlyAccessHighlights";
import FAQ from "@/components/FAQ";
import { Hero } from "@/components/hero";
import LiftPulseFeatures from "@/components/LiftPulseFeatures";
import { PricingGrid } from "@/components/pricing";

export default async function IndexPage() {
  return (
    <>
      <Hero
        title="Transforme a Experiência dos Seus Alunos com o LiftPulse!"
        subtitle="O aplicativo completo para treinos personalizados e gestão de academias. Early Access promocional disponível!"
        primaryCtaText="Participe do Beta Teste"
        primaryCtaLink="https://github.com/LiftPulse/"
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
    </>
  );
}
