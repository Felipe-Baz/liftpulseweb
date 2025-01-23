"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const popularExercisesData = [
  { name: "Agachamento", popularity: 95 },
  { name: "Supino", popularity: 88 },
  { name: "Deadlift", popularity: 82 },
  { name: "Pull-up", popularity: 78 },
  { name: "Leg Press", popularity: 75 },
  { name: "Remada", popularity: 72 },
]

const peakHoursData = [
  { hour: "6h", users: 45 },
  { hour: "8h", users: 92 },
  { hour: "10h", users: 58 },
  { hour: "12h", users: 75 },
  { hour: "14h", users: 48 },
  { hour: "16h", users: 85 },
  { hour: "18h", users: 120 },
  { hour: "20h", users: 98 },
  { hour: "22h", users: 65 },
]

const goalTrendsData = [
  { goal: "Perda de Peso", percentage: 35 },
  { goal: "Hipertrofia", percentage: 28 },
  { goal: "Condicionamento", percentage: 20 },
  { goal: "Força", percentage: 12 },
  { goal: "Reabilitação", percentage: 5 },
]

export default function TrendsDashboard() {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between space-y-2 mb-5">
        <h2 className="text-3xl font-bold tracking-tight">Tendências</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Horários de Pico</CardTitle>
            <CardDescription>Distribuição de usuários ao longo do dia</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={peakHoursData}>
                <XAxis dataKey="hour" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Exercícios Mais Populares</CardTitle>
            <CardDescription>Baseado na frequência de execução</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={popularExercisesData} layout="vertical">
                <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip />
                <Bar dataKey="popularity" fill="currentColor" radius={[0, 4, 4, 0]} className="fill-primary" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-7">
          <CardHeader>
            <CardTitle>Objetivos dos Alunos</CardTitle>
            <CardDescription>Distribuição dos principais objetivos</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={goalTrendsData}>
                <XAxis dataKey="goal" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip />
                <Bar dataKey="percentage" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

