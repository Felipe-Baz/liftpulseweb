"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const newMembersData = [
  { month: "Jan", total: 45 },
  { month: "Fev", total: 52 },
  { month: "Mar", total: 48 },
  { month: "Abr", total: 65 },
  { month: "Mai", total: 58 },
  { month: "Jun", total: 72 },
]

const workoutData = [
  { name: "Musculação", total: 1234 },
  { name: "Cardio", total: 856 },
  { name: "CrossFit", total: 645 },
  { name: "Yoga", total: 432 },
  { name: "Pilates", total: 387 },
  { name: "Funcional", total: 765 },
]

const retentionData = [
  { month: "6 meses", rate: 85 },
  { month: "5 meses", rate: 87 },
  { month: "4 meses", rate: 90 },
  { month: "3 meses", rate: 92 },
  { month: "2 meses", rate: 94 },
  { month: "1 mês", rate: 96 },
]

export default function UsageAnalysisDashboard() {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Análise de Uso</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Novos Alunos por Mês</CardTitle>
            <CardDescription>Acompanhamento mensal de novos membros</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={newMembersData}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Retenção</CardTitle>
            <CardDescription>Por período de permanência</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={retentionData}>
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip />
                <Bar dataKey="rate" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Treinos Realizados por Modalidade</CardTitle>
            <CardDescription>Total de sessões nos últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={workoutData}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
