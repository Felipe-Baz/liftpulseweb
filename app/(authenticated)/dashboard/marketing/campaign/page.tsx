import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateCampaignDialog } from "@/components/create-campaign-dialog"
import { Button } from "@/components/ui/button"

export default function PromotionalCampaignPage() {
  return (
    <main className="container mx-auto p-4 md:p-6 min-h-screen">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Campanhas Promocionais</h1>
            <p className="text-muted-foreground">Veja as campanhas promocionais ativas e seus resultados</p>
          </div>
          <CreateCampaignDialog />
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList>
            <TabsTrigger value="active">Campanhas Ativas</TabsTrigger>
            <TabsTrigger value="draft">Rascunhos</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activeCampaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                        {campaign.status === "active" ? "Ativa" : "Finalizada"}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{campaign.dateRange}</span>
                    </div>
                    <CardTitle className="mt-4">{campaign.title}</CardTitle>
                    <CardDescription>{campaign.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Alcance</span>
                        <span className="text-2xl font-bold">{campaign.reach}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Conversões</span>
                        <span className="text-2xl font-bold">{campaign.conversions}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Ver Detalhes</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="draft" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {draftCampaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">Rascunho</Badge>
                      <span className="text-sm text-muted-foreground">Criado em {campaign.createdAt}</span>
                    </div>
                    <CardTitle className="mt-4">{campaign.title}</CardTitle>
                    <CardDescription>{campaign.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground">Última atualização: {campaign.updatedAt}</div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="w-full">
                      Editar
                    </Button>
                    <Button className="w-full">Publicar</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

const activeCampaigns = [
  {
    id: 1,
    title: "Promoção Verão 2024",
    description: "Matrícula grátis e 30% de desconto nas mensalidades",
    status: "active",
    dateRange: "Jan 15 - Fev 15",
    reach: "2.5k",
    conversions: "127",
  },
  {
    id: 2,
    title: "Plano Família",
    description: "Traga a família e ganhe descontos progressivos",
    status: "active",
    dateRange: "Jan 1 - Mar 31",
    reach: "1.8k",
    conversions: "84",
  },
  {
    id: 3,
    title: "Black Friday Academia",
    description: "50% de desconto no plano anual",
    status: "finished",
    dateRange: "Nov 20 - Nov 30",
    reach: "5.2k",
    conversions: "312",
  },
]

const draftCampaigns = [
  {
    id: 4,
    title: "Desafio 30 Dias",
    description: "Transforme seu corpo em 30 dias com acompanhamento exclusivo",
    createdAt: "22 Jan 2024",
    updatedAt: "23 Jan 2024",
  },
  {
    id: 5,
    title: "Programa Madrugada",
    description: "Horários especiais com preços diferenciados",
    createdAt: "20 Jan 2024",
    updatedAt: "21 Jan 2024",
  },
]

