import { Footer } from "@/components/footer";
import { LandingPageHeader } from "@/components/landing-page-header";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingPageHeader
        items={[
          { title: "Home", href: "/" },
          { title: "Features", href: "/#features" },
          { title: "Preço", href: "/#pricing" },
          { title: "Github", href: "https://github.com/LiftPulse/liftpulse_web_dashboard/", external: true },
        ]}
      />
      <main className="flex-1">{props.children}</main>
      <Footer
        builtBy="LiftPulse"
        builtByLink="https://github.com/LiftPulse/"
        githubLink="https://github.com/LiftPulse/liftpulse_web_dashboard/"
        twitterLink="https://github.com/LiftPulse/"
        linkedinLink="https://github.com/LiftPulse/"
      />
    </div>
  );
}
