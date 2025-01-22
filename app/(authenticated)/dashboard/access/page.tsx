import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AccessManagementPage() {
  return (
    <div className="container py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gerenciamento de Acesso</h1>
          <p className="text-muted-foreground">Gerencie as funções e permissões dos usuários</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Função
        </Button>
      </div>

      <div className="mt-8">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Função</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Permissões</TableHead>
              <TableHead>Usuários</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Administrador</TableCell>
              <TableCell>Acesso total ao sistema</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">Criar</span>
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">Ler</span>
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    Atualizar
                  </span>
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">Deletar</span>
                </div>
              </TableCell>
              <TableCell>3</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  Editar
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Instrutor</TableCell>
              <TableCell>Gerenciamento de treinos e alunos</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">Ler</span>
                  <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                    Atualizar
                  </span>
                </div>
              </TableCell>
              <TableCell>8</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

