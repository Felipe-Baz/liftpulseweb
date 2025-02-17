"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MoreVertical, Pencil, Trash2, Dumbbell, ChevronDown, ChevronUp, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { WorkoutDto } from "@/types/workout"
import { fetchWorkouts } from "@/actions/workout"

export default function TemplateList() {
  const [expandedTemplates, setExpandedTemplates] = useState<string[]>([])
  const [workouts, setWorkouts] = useState<WorkoutDto[]>([]) // Estado para armazenar os treinos
  const [loading, setLoading] = useState<boolean>(true) // Estado para controle de carregamento

  // Função para buscar os treinos quando o componente for montado
  useEffect(() => {
    const loadWorkouts = async () => {
      const fetchedWorkouts = await fetchWorkouts()
      if (fetchedWorkouts?.workouts) {
        setWorkouts(fetchedWorkouts.workouts)
      }
      setLoading(false)
    }
    loadWorkouts()
  }, [])

  const toggleTemplate = (templateId: string) => {
    setExpandedTemplates((current) =>
      current.includes(templateId) ? current.filter((id) => id !== templateId) : [...current, templateId],
    )
  }

  const handleDelete = (templateId: string) => {
    // Aqui você chamaria sua API para deletar o template
    console.log("Deleting template:", templateId)
  }

  if (loading) {
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center">
        <div>Carregando Treinos...</div>
      </Card>
    )
  }

  if (workouts.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center">
        <Dumbbell className="h-12 w-12 mb-4 text-muted-foreground" />
        <CardTitle className="mb-2">Ainda não há treinos</CardTitle>
        <CardDescription>Crie seu primeiro treino para começar</CardDescription>
        <Button asChild className="mt-4">
          <Link href="/dashboard/workout/create">
            <Plus className="mr-2 h-4 w-4" />
            Criar treino
          </Link>
        </Button>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {workouts.map((template) => (
        <Card key={template.workout_id}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>{template.title}</CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/dashboard/workout/${template.workout_id}/edit`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(template.workout_id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Deletar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
