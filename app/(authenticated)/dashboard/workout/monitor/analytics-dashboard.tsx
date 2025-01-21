"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, Users, Star, TrendingUp } from "lucide-react"

const stats = [
  {
    name: "Usuários ativos",
    value: "2,420",
    description: "Usuários este mês",
    icon: Users,
    trend: "+12%",
  },
  {
    name: "Avaliação Média",
    value: "4.6",
    description: "De 5 estrelas",
    icon: Star,
    trend: "+0.3",
  },
  {
    name: "Taxa de conclusão",
    value: "78%",
    description: "Templates concluídos",
    icon: Activity,
    trend: "+5%",
  },
  {
    name: "Templates Ativos",
    value: "156",
    description: "Sendo usado esta semana",
    icon: TrendingUp,
    trend: "+8",
  },
]

export function AnalyticsDashboard() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.description}
                <span className="ml-2 text-green-500">{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

