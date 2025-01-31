"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { Student } from "@/types/student"

const goalLabels: Record<string, string> = {
  emagrecer: "Emagrecer",
  hipertrofia: "Hipertrofia",
  secar: "Definição Muscular",
  flexibilidade: "Aumentar Flexibilidade",
  massa_magra: "Ganho de Massa Magra",
  Apreder_o_basico: "Aprender o Básico",
};

const activityLevelLabels: Record<string, string> = {
  beginner: "Iniciante",
  intermediate: "Intermediário",
  advanced: "Avançado",
  true_beast: "Fera Absoluta",
};

const columnLabels: Record<string, string> = {
  username: "Nome",
  email: "Email",
  birthdate: "Data de Nascimento",
  phonenumber: "Telefone",
  gender: "Genero",
  goal: "Objetivo",
  activity_level: "Nivel de Atividade",
  status: "Status",
  actions: "Ações",
};

const transformGoal = (goal: string): string => goalLabels[goal] || "Objetivo Desconhecido";
const transformActivityLevel = (level: string): string => activityLevelLabels[level] || "Nível Desconhecido";
const transformColumn = (column: string): string => columnLabels[column] || "Coluna Desconhecida";

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <Link href={`/users/${row.original.id}`} className="font-medium">
        {row.getValue("username")}
      </Link>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "birthdate",
    header: "Data de Nascimento",
  },
  {
    accessorKey: "phonenumber",
    header: "Telefone",
  },
  {
    accessorKey: "gender",
    header: "Genero",
    cell: ({ row }) => (
      row.getValue("gender") == 'M' ? 'Masculino' : 'Feminino'
    ),
  },
  {
    accessorKey: "goal",
    header: "Objetivo",
    cell: ({ row }) => (
      transformGoal(row.getValue("goal"))
    ),
  },
  {
    accessorKey: "activity_level",
    header: "Nivel de Atividade",
    cell: ({ row }) => (
      transformActivityLevel(row.getValue("activity_level"))
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as "active" | "inactive" | "blocked"
      return <Badge variant={status === "active" ? "default" : "secondary"}>{status == "active" ? 'Ativo' : 'Inativo'}</Badge>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { }}>Abrir detalhes</DropdownMenuItem>
            <DropdownMenuItem onClick={() => { }}>Editar usuário</DropdownMenuItem>
            <DropdownMenuItem onClick={() => { }}>Gerar QRCode</DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive font-bold"
              onClick={() => { }}
            >
              Deletar usuário</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

interface UsersPageProps {
  data: Student[];
}

export function UsersTable({ data }: UsersPageProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder="Busque pelo nome"
          value={(table.getColumn("username")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("username")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {transformColumn(column.id)}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem Resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} linha(s)
          Selecionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Antes
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Proximo
          </Button>
        </div>
      </div>
    </div>
  )
}

