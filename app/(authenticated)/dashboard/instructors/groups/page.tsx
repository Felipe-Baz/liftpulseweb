"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useInstructors } from "@/contexts/instructor-context"

export default function GroupsPage() {
  const { groups, addGroup, deleteGroup, instructors: instructors } = useInstructors()
  const [newGroup, setNewGroup] = useState({ name: "", description: "", color: "#000000" })
  const [open, setOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addGroup(newGroup)
    setNewGroup({ name: "", description: "", color: "#000000" })
    setOpen(false)
  }

  const getInstructorCount = (groupId: string) => {
    return instructors.filter((instructor) => instructor.groups.includes(groupId)).length
  }

  return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Grupos de Instrutores</h1>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Grupo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Grupo</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Grupo</Label>
                  <Input
                    id="name"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Cor</Label>
                  <Input
                    id="color"
                    type="color"
                    value={newGroup.color}
                    onChange={(e) => setNewGroup({ ...newGroup, color: e.target.value })}
                  />
                </div>
                <Button type="submit">Criar Grupo</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.id} className="p-4 rounded-lg border relative" style={{ borderColor: group.color }}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold">{group.name}</h3>
                  <p className="text-sm text-muted-foreground">{group.description}</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => deleteGroup(group.id)}>
                  ×
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">{getInstructorCount(group.id)} Instrutors</div>
            </div>
          ))}
        </div>
      </div>
  )
}

