"use client"

import { useState } from "react"
import Link from "next/link"
import { MoreVertical, Pencil, Trash2, Dumbbell, ChevronDown, ChevronUp, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// This would typically come from your backend
const SAMPLE_TEMPLATES = [
  {
    id: "1",
    name: "Full Body Workout",
    exercises: [
      { name: "Bench Press", series: 3, reps: "10, 8, 6" },
      { name: "Squats", series: 4, reps: "12, 10, 10, 8" },
      { name: "Pull-ups", series: 3, reps: "8, 8, 8" },
    ],
  },
  {
    id: "2",
    name: "Upper Body Focus",
    exercises: [
      { name: "Shoulder Press", series: 4, reps: "12, 10, 8, 8" },
      { name: "Barbell Row", series: 3, reps: "12, 10, 10" },
      { name: "Push-ups", series: 3, reps: "15, 12, 10" },
    ],
  },
]

export default function TemplateList() {
  const [expandedTemplates, setExpandedTemplates] = useState<string[]>([])

  const toggleTemplate = (templateId: string) => {
    setExpandedTemplates((current) =>
      current.includes(templateId) ? current.filter((id) => id !== templateId) : [...current, templateId],
    )
  }

  const handleDelete = (templateId: string) => {
    // Here you would typically call your API to delete the template
    console.log("Deleting template:", templateId)
  }

  if (SAMPLE_TEMPLATES.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-8 text-center">
        <Dumbbell className="h-12 w-12 mb-4 text-muted-foreground" />
        <CardTitle className="mb-2">No Templates Yet</CardTitle>
        <CardDescription>Create your first training template to get started</CardDescription>
        <Button asChild className="mt-4">
          <Link href="/dashboard/workout/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Link>
        </Button>
      </Card>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {SAMPLE_TEMPLATES.map((template) => (
        <Card key={template.id}>
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>{template.name}</CardTitle>
              <CardDescription>{template.exercises.length} exercises</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/templates/${template.id}/edit`}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(template.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <Collapsible
              open={expandedTemplates.includes(template.id)}
              onOpenChange={() => toggleTemplate(template.id)}
            >
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="flex w-full justify-between p-0">
                  View exercises
                  {expandedTemplates.includes(template.id) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div className="space-y-4">
                  {template.exercises.map((exercise, index) => (
                    <div key={index} className="flex flex-col space-y-1 rounded-lg border p-3">
                      <div className="font-medium">{exercise.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {exercise.series} series • {exercise.reps} reps
                      </div>
                    </div>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

