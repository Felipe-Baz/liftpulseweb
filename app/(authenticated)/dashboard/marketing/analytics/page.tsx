"use client"

import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MarketingPage() {
  return (
    <main className="container mx-auto p-4 md:p-6 min-h-screen">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Relatório de Marketing</h1>
          <p className="text-muted-foreground">Acompanhe o desempenho das suas campanhas de marketing</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alcance Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.5k</div>
              <p className="text-xs text-muted-foreground">+20.1% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">523</div>
              <p className="text-xs text-muted-foreground">+10.5% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2%</div>
              <p className="text-xs text-muted-foreground">+2.1% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Custo por Conversão</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 42,50</div>
              <p className="text-xs text-muted-foreground">-5.2% em relação ao mês anterior</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Alcance por Campanha</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={reachData}>
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}k`}
                      />
                      <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Conversões ao Longo do Tempo</CardTitle>
                  <CardDescription>Últimos 30 dias</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={conversionsData}>
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <Line
                        type="monotone"
                        dataKey="total"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="stroke-primary"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Análise Demográfica</CardTitle>
                  <CardDescription>Distribuição de idade dos interessados</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={demographicData}>
                      <XAxis dataKey="age" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Horários de Maior Interesse</CardTitle>
                  <CardDescription>Distribuição de interações por hora</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={timeData}>
                      <XAxis dataKey="hour" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <Line
                        type="monotone"
                        dataKey="interactions"
                        stroke="currentColor"
                        strokeWidth={2}
                        className="stroke-primary"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

const reachData = [
  {
    name: "Verão 2024",
    total: 2.5,
  },
  {
    name: "Plano Família",
    total: 1.8,
  },
  {
    name: "Black Friday",
    total: 5.2,
  },
  {
    name: "Desafio 30d",
    total: 3.2,
  },
]

const conversionsData = [
  {
    name: "01/01",
    total: 12,
  },
  {
    name: "05/01",
    total: 15,
  },
  {
    name: "10/01",
    total: 23,
  },
  {
    name: "15/01",
    total: 18,
  },
  {
    name: "20/01",
    total: 25,
  },
]

const demographicData = [
  {
    age: "18-24",
    total: 245,
  },
  {
    age: "25-34",
    total: 467,
  },
  {
    age: "35-44",
    total: 324,
  },
  {
    age: "45-54",
    total: 156,
  },
  {
    age: "55+",
    total: 98,
  },
]

const timeData = [
  {
    hour: "06h",
    interactions: 24,
  },
  {
    hour: "09h",
    interactions: 56,
  },
  {
    hour: "12h",
    interactions: 42,
  },
  {
    hour: "15h",
    interactions: 78,
  },
  {
    hour: "18h",
    interactions: 85,
  },
  {
    hour: "21h",
    interactions: 45,
  },
]

