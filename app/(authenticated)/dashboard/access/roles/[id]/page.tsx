import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function RoleEditPage() {
  return (
    <div className="container max-w-3xl py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Editar Função</h1>
          <p className="text-muted-foreground">Configure as permissões para esta função</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
            <CardDescription>Configure o nome e a descrição da função</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Função</Label>
              <Input id="name" placeholder="Ex: Instrutor Senior" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea id="description" placeholder="Descreva as responsabilidades desta função..." />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Permissões</CardTitle>
            <CardDescription>Defina as permissões para cada recurso</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="mb-4 text-sm font-medium">Alunos</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="students-create" />
                    <Label htmlFor="students-create">Criar</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="students-read" />
                    <Label htmlFor="students-read">Visualizar</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="students-update" />
                    <Label htmlFor="students-update">Atualizar</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="students-delete" />
                    <Label htmlFor="students-delete">Deletar</Label>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-medium">Treinos</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="workouts-create" />
                    <Label htmlFor="workouts-create">Criar</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="workouts-read" />
                    <Label htmlFor="workouts-read">Visualizar</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="workouts-update" />
                    <Label htmlFor="workouts-update">Atualizar</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="workouts-delete" />
                    <Label htmlFor="workouts-delete">Deletar</Label>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-medium">Instrutores</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="instructors-create" />
                    <Label htmlFor="instructors-create">Criar</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="instructors-read" />
                    <Label htmlFor="instructors-read">Visualizar</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="instructors-update" />
                    <Label htmlFor="instructors-update">Atualizar</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="instructors-delete" />
                    <Label htmlFor="instructors-delete">Deletar</Label>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline">Cancelar</Button>
          <Button>Salvar Alterações</Button>
        </div>
      </div>
    </div>
  )
}

