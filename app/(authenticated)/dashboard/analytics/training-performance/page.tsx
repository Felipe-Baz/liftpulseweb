"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender, ColumnDef } from "@tanstack/react-table"

const workoutTypes = [
  { name: "Musculação", value: 45 },
  { name: "Funcional", value: 25 },
  { name: "Cardio", value: 20 },
  { name: "Crossfit", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const completionData = [
  { month: "Jan", taxa: 85 },
  { month: "Fev", taxa: 88 },
  { month: "Mar", taxa: 87 },
  { month: "Abr", taxa: 89 },
  { month: "Mai", taxa: 91 },
  { month: "Jun", taxa: 90 },
]

const workoutDetails = [
  {
    nome: "Treino A - Superior",
    completados: 450,
    mediaAvaliacao: 4.8,
    mediaDuracao: "45min",
    dificuldade: "Intermediário",
  },
  {
    nome: "Treino B - Inferior",
    completados: 425,
    mediaAvaliacao: 4.6,
    mediaDuracao: "50min",
    dificuldade: "Avançado",
  },
  {
    nome: "Treino C - Full Body",
    completados: 380,
    mediaAvaliacao: 4.7,
    mediaDuracao: "60min",
    dificuldade: "Intermediário",
  },
  {
    nome: "Cardio HIIT",
    completados: 320,
    mediaAvaliacao: 4.5,
    mediaDuracao: "30min",
    dificuldade: "Iniciante",
  },
]

const difficultyColors = {
  Iniciante: "bg-green-100 text-green-800",
  Intermediário: "bg-yellow-100 text-yellow-800",
  Avançado: "bg-red-100 text-red-800",
}

export default function DesempenhoTreinosPage() {
  const [period, setPeriod] = useState("monthly")

  const table = useReactTable({
    data: workoutDetails,
    columns: [
      {
        accessorKey: "nome",
        header: "Nome do Treino",
      },
      {
        accessorKey: "completados",
        header: "Completados",
      },
      {
        accessorKey: "mediaAvaliacao",
        header: "Média de Avaliação",
        cell: ({ row }) => (
          <div>
            {row.getValue("mediaAvaliacao")}
            <span className="text-yellow-500 ml-1">★</span>
          </div>
        ),
      },
      {
        accessorKey: "mediaDuracao",
        header: "Duração Média",
      },
      {
        accessorKey: "dificuldade",
        header: "Nível",
        cell: ({ row }) => (
          <Badge
            variant="secondary"
            className={difficultyColors[row.getValue("dificuldade") as keyof typeof difficultyColors]}
          >
            {row.getValue("dificuldade")}
          </Badge>
        ),
      },
    ],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Desempenho dos Treinos</h2>
        <Select value={period} onValueChange={(value) => setPeriod(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Mensal</SelectItem>
            <SelectItem value="quarterly">Trimestral</SelectItem>
            <SelectItem value="yearly">Anual</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Taxa de Conclusão de Treinos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={completionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="taxa" stroke="#8884d8" strokeWidth={2} name="Taxa de Conclusão (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={workoutTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {workoutTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhamento dos Treinos</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Nenhum resultado encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </Button>
              <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                Próximo
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}