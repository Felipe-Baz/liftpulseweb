import Link from "next/link"
import { Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LandingPageHeader } from "@/components/landing-page-header"

export default function NotFound() {
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

      <div className="h-screen w-full bg-gradient-to-b from-background to-muted flex items-center justify-center">
        <div className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted-foreground/10">
            <Dumbbell className="h-10 w-10 text-muted-foreground" strokeWidth={1.5} />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">404 - Peso Muito Pesado!</h1>

            <p className="max-w-[600px] text-muted-foreground text-lg sm:text-xl">
              Parece que você tentou levantar uma página que não existe. Que tal voltar e tentar uma carga mais leve?
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 min-[400px]:gap-6">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/50 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-200" />
                <Button asChild className="relative bg-background hover:bg-background/90" size="lg">
                  <Link href="/"><p className="text-foreground">Voltar ao treino</p></Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm text-muted-foreground">Dicas de Treino:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Verifique se a URL está correta</li>
              <li>• Faça um aquecimento voltando à página inicial</li>
              <li>• Mantenha a forma correta usando links válidos</li>
            </ul>
          </div>

          <div className="flex items-center justify-center space-x-4 text-muted-foreground">
            <div className="w-px h-4 bg-muted-foreground/20" />
            <p className="text-sm">No pain, no gain. Mas nesse caso, melhor voltar e tentar outro caminho!</p>
            <div className="w-px h-4 bg-muted-foreground/20" />
          </div>
        </div>
      </div>
    </div>

  )
}