"use client"

import { Footer } from "@/components/footer";
import { LandingPageHeader } from "@/components/landing-page-header";

export default function Layout(props) {
  return (
    <div className="flex min-h-screen flex-col overflow-visible">
      <LandingPageHeader
        items={[
          { title: "Home", href: "/" },
          { title: "Benefícios para Academias", href: "/#benefits" },
          { title: "Plano Early Access", href: "/#early-access" },
          { title: "Funcionalidades", href: "/#features" },
          { title: "Beta Testers", href: "/#beta-testers" },
          { title: "FAQ", href: "/#faq" },
        ]}
      />
      <main className="flex-1 overflow-visible">{props.children}</main>
      <Footer
        builtBy="LiftPulse"
        builtByLink="https://github.com/LiftPulse/"
        instagramLink="https://github.com/LiftPulse/"
        twitterLink="https://github.com/LiftPulse/"
        linkedinLink="https://github.com/LiftPulse/"
      />
    </div>
  );
}
