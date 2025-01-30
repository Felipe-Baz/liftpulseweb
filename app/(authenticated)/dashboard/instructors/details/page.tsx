"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useInstructors } from "@/contexts/instructor-context"
import type { Instructor } from "@/types/instructor" // Import the Instructor type from your types file

// Extend the Instructor type to include the avatar property
interface InstructorWithAvatar extends Instructor {
  avatar?: string
}

// Example instructors
const exampleInstructors: InstructorWithAvatar[] = [
  {
    name: "João Silva",
    email: "joao.silva@example.com",
    registration: "12345",
    phone: "(11) 98765-4321",
    birthDate: "1985-05-15",
    status: "active",
    groups: ["1", "2"],
    avatar: "https://i.pravatar.cc/150?u=joao.silva@example.com",
    id: ""
  },
  {
    name: "Maria Santos",
    email: "maria.santos@example.com",
    registration: "67890",
    phone: "(21) 99876-5432",
    birthDate: "1990-10-20",
    status: "inactive",
    groups: ["2", "3"],
    avatar: "https://i.pravatar.cc/150?u=maria.santos@example.com",
    id: ""
  },
  {
    name: "pedro bonilha",
    email: "joao.silva@example.com",
    registration: "12345",
    phone: "(11) 98765-4321",
    birthDate: "1985-05-15",
    status: "active",
    groups: ["1", "2"],
    avatar: "https://i.pravatar.cc/150?u=joao.silva@example.com",
    id: ""
  },
  {
    name: "felipe baz",
    email: "maria.santos@example.com",
    registration: "67890",
    phone: "(21) 99876-5432",
    birthDate: "1990-10-20",
    status: "inactive",
    groups: ["2", "3"],
    avatar: "https://i.pravatar.cc/150?u=maria.santos@example.com",
    id: ""
  },
  {
    name: "henrique baz",
    email: "joao.silva@example.com",
    registration: "12345",
    phone: "(11) 98765-4321",
    birthDate: "1985-05-15",
    status: "active",
    groups: ["1", "2"],
    avatar: "https://i.pravatar.cc/150?u=joao.silva@example.com",
    id: ""
  },
]

export default function DetailsPage() {
  const { instructors: contextInstructors, groups } = useInstructors()
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState<"name" | "registration" | "email">("name")

  // Use context instructors if available, otherwise use example instructors
  const instructors = useMemo<InstructorWithAvatar[]>(
    () =>
      contextInstructors.length > 0
        ? contextInstructors.map((instructor) => ({ ...instructor, avatar: undefined }))
        : exampleInstructors,
    [contextInstructors],
  )

  const filteredInstructors = useMemo(
    () =>
      searchTerm
        ? instructors.filter((instructor) => {
            const searchValue = instructor[searchType]?.toLowerCase() || ""
            return searchValue.includes(searchTerm.toLowerCase())
          })
        : instructors,
    [instructors, searchTerm, searchType],
  )

  const renderInstructorCard = (instructor: InstructorWithAvatar) => (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="pt-6 flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={instructor.avatar} alt={instructor.name} />
              <AvatarFallback>
                {instructor.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{instructor.name}</h3>
              <p className="text-sm text-muted-foreground">{instructor.registration}</p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{instructor.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-medium text-sm text-muted-foreground mb-1">Email</div>
              <div>{instructor.email}</div>
            </div>
            <div>
              <div className="font-medium text-sm text-muted-foreground mb-1">Matrícula</div>
              <div>{instructor.registration}</div>
            </div>
            <div>
              <div className="font-medium text-sm text-muted-foreground mb-1">Telefone</div>
              <div>{instructor.phone}</div>
            </div>
            <div>
              <div className="font-medium text-sm text-muted-foreground mb-1">Data de Nascimento</div>
              <div>{new Date(instructor.birthDate).toLocaleDateString()}</div>
            </div>
          </div>
          <div>
            <div className="font-medium text-sm text-muted-foreground mb-1">Status</div>
            <Badge variant={instructor.status === "active" ? "default" : "secondary"}>
              {instructor.status === "active" ? "Ativo" : "Inativo"}
            </Badge>
          </div>
          <div>
            <div className="font-medium text-sm text-muted-foreground mb-1">Grupos</div>
            <div className="flex gap-1">
              {instructor.groups.map((groupId: string) => {
                const group = groups.find((g) => g.id === groupId)
                return group ? (
                  <Badge key={group.id} style={{ backgroundColor: group.color }}>
                    {group.name}
                  </Badge>
                ) : null
              })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex gap-4">
        <Select value={searchType} onValueChange={(value: "name" | "registration" | "email") => setSearchType(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Buscar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nome</SelectItem>
            <SelectItem value="registration">Matrícula</SelectItem>
            <SelectItem value="email">Email</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex-1">
          <Input
            placeholder="Digite para buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="secondary" onClick={() => setSearchTerm("")}>
          Limpar
        </Button>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">{searchTerm ? "Resultados da Pesquisa" : "Todos os Instrutores"}</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {filteredInstructors.length > 0 ? (
            filteredInstructors.map((instructor, index) => <div key={index}>{renderInstructorCard(instructor)}</div>)
          ) : (
            <div className="col-span-3 text-center text-muted-foreground">Nenhum Instrutor encontrado</div>
          )}
        </div>
      </div>
    </div>
  )
}

