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
import { useStudents } from '@/contexts/student-context'

export default function DetailsPage() {
  const { students, groups } = useStudents()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState<'username' | 'email'>('username')
  
  const filteredStudent = students.find(student => {
    const searchValue = student[searchType].toLowerCase()
    return searchValue.includes(searchTerm.toLowerCase())
  })

  return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex gap-4">
          <Select
            value={searchType}
            onValueChange={(value: 'username' | 'email') => setSearchType(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Buscar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="username">Nome</SelectItem>
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

        {searchTerm && filteredStudent && (
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-2">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="font-medium text-sm text-muted-foreground mb-1">Nome</div>
                    <div>{filteredStudent.username}</div>
                  </div>
                  <div>
                    <div className="font-medium text-sm text-muted-foreground mb-1">Email</div>
                    <div>{filteredStudent.email}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <div className="font-medium text-sm text-muted-foreground mb-1">Telefone</div>
                    <div>{filteredStudent.phonenumber}</div>
                  </div>
                  <div>
                    <div className="font-medium text-sm text-muted-foreground mb-1">
                      Data de Nascimento
                    </div>
                    <div>{new Date(filteredStudent.birthdate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="font-medium text-sm text-muted-foreground mb-1">Status</div>
                    <Badge variant={filteredStudent.status === 'active' ? 'default' : 'secondary'}>
                      {filteredStudent.status === 'active' ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="font-medium text-sm text-muted-foreground mb-1">Grupos</div>
                  <div className="flex gap-1">
                    {filteredStudent.groups.map((groupId) => {
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

        {searchTerm && !filteredStudent && (
          <div className="text-center text-muted-foreground">
            Nenhum aluno encontrado
          </div>
        )}
      </div>
  )
}
