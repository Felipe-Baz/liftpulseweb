"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useInstructors } from '@/contexts/instructor-context'

export default function DetailsPage() {
  const { instructors: instructors, groups } = useInstructors()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState<'name' | 'registration' | 'email'>('name')
  
  const filteredInstructor = instructors.find(instructor => {
    const searchValue = instructor[searchType].toLowerCase()
    return searchValue.includes(searchTerm.toLowerCase())
  })

  return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex gap-4">
          <Select
            value={searchType}
            onValueChange={(value: 'name' | 'registration' | 'email') => setSearchType(value)}
          >
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
          <Button variant="secondary" onClick={() => setSearchTerm('')}>
            Limpar
          </Button>
        </div>

        {searchTerm && filteredInstructor && (
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-2">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="font-medium text-sm text-muted-foreground mb-1">Nome</div>
                    <div>{filteredInstructor.name}</div>
                  </div>
                  <div>
                    <div className="font-medium text-sm text-muted-foreground mb-1">Email</div>
                    <div>{filteredInstructor.email}</div>
                  </div>
                  <div>
                    <div className="font-medium text-sm text-muted-foreground mb-1">Matrícula</div>
                    <div>{filteredInstructor.registration}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <div className="font-medium text-sm text-muted-foreground mb-1">Telefone</div>
                    <div>{filteredInstructor.phone}</div>
                  </div>
                  <div>
                    <div className="font-medium text-sm text-muted-foreground mb-1">
                      Data de Nascimento
                    </div>
                    <div>{new Date(filteredInstructor.birthDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="font-medium text-sm text-muted-foreground mb-1">Status</div>
                    <Badge variant={filteredInstructor.status === 'active' ? 'default' : 'secondary'}>
                      {filteredInstructor.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="font-medium text-sm text-muted-foreground mb-1">Grupos</div>
                  <div className="flex gap-1">
                    {filteredInstructor.groups.map((groupId: any) => {
                      const group = groups.find(g => g.id === groupId)
                      return group ? (
                        <Badge 
                          key={group.id}
                          style={{ backgroundColor: group.color }}
                        >
                          {group.name}
                        </Badge>
                      ) : null
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {searchTerm && !filteredInstructor && (
          <div className="text-center text-muted-foreground">
            Nenhum Instrutor encontrado
          </div>
        )}
      </div>
  )
}
