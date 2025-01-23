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
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Check, ChevronsUpDown, HelpCircle } from "lucide-react"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
} from "@tanstack/react-table"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip as TooltipPrimitive, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const instructors = [
  {
    value: "joao",
    label: "João Silva",
  },
  {
    value: "maria",
    label: "Maria Santos",
  },
  {
    value: "pedro",
    label: "Pedro Oliveira",
  },
]

// Dados históricos de avaliação por instrutor
const historicalRatings = [
  { month: "Jan", joao: 4.5, maria: 4.2, pedro: 4.7 },
  { month: "Fev", joao: 4.6, maria: 4.3, pedro: 4.6 },
  { month: "Mar", joao: 4.8, maria: 4.5, pedro: 4.8 },
  { month: "Abr", joao: 4.7, maria: 4.6, pedro: 4.7 },
  { month: "Mai", joao: 4.9, maria: 4.7, pedro: 4.9 },
  { month: "Jun", joao: 4.8, maria: 4.8, pedro: 4.8 },
]

// Dados históricos de esforço por instrutor
const historicalEffort = [
  { month: "Jan", joao: 85, maria: 82, pedro: 88 },
  { month: "Fev", joao: 87, maria: 84, pedro: 86 },
  { month: "Mar", joao: 86, maria: 85, pedro: 89 },
  { month: "Abr", joao: 88, maria: 86, pedro: 87 },
  { month: "Mai", joao: 89, maria: 88, pedro: 90 },
  { month: "Jun", joao: 90, maria: 87, pedro: 91 },
]

// Dados de performance geral dos instrutores
const instructorPerformance = [
  {
    name: "João Silva",
    alunosAtivos: 45,
    retencao: "92%",
    satisfacao: 4.7,
    assiduidade: "95%",
    treinosCriados: 156,
  },
  {
    name: "Maria Santos",
    alunosAtivos: 38,
    retencao: "88%",
    satisfacao: 4.5,
    assiduidade: "93%",
    treinosCriados: 142,
  },
  {
    name: "Pedro Oliveira",
    alunosAtivos: 52,
    retencao: "94%",
    satisfacao: 4.8,
    assiduidade: "97%",
    treinosCriados: 178,
  },
]

const performanceData = [
  {
    subject: "Pontualidade",
    value: 90,
  },
  {
    subject: "Feedback",
    value: 85,
  },
  {
    subject: "Conhecimento",
    value: 95,
  },
  {
    subject: "Comunicação",
    value: 88,
  },
  {
    subject: "Resultados",
    value: 92,
  },
]

interface InstructorDetailsProps {
  instructor: string
}

function InstructorDetails({ instructor }: InstructorDetailsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Avaliações Mensais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalRatings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey={instructor} stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Média de Esforço dos Alunos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalEffort}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey={instructor} stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Análise de Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={performanceData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar name="Performance" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function DesempenhoInstrutoresPage() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const columns: ColumnDef<(typeof instructorPerformance)[0]>[] = [
    {
      accessorKey: "name",
      header: () => (
        <div className="flex items-center">
          Instrutor
          <TooltipProvider>
            <TooltipPrimitive>
              <TooltipTrigger>
                <HelpCircle className="ml-1 inline h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Nome do instrutor</p>
              </TooltipContent>
            </TooltipPrimitive>
          </TooltipProvider>
        </div>
      ),
    },
    {
      accessorKey: "alunosAtivos",
      header: () => (
        <div className="flex items-center">
          Alunos Ativos
          <TooltipProvider>
            <TooltipPrimitive>
              <TooltipTrigger>
                <HelpCircle className="ml-1 inline h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Número total de alunos atualmente treinando com o instrutor</p>
              </TooltipContent>
            </TooltipPrimitive>
          </TooltipProvider>
        </div>
      ),
    },
    {
      accessorKey: "retencao",
      header: () => (
        <div className="flex items-center">
          Taxa de Retenção
          <TooltipProvider>
            <TooltipPrimitive>
              <TooltipTrigger>
                <HelpCircle className="ml-1 inline h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Porcentagem de alunos que continuam treinando após 3 meses</p>
              </TooltipContent>
            </TooltipPrimitive>
          </TooltipProvider>
        </div>
      ),
    },
    {
      accessorKey: "satisfacao",
      header: () => (
        <div className="flex items-center">
          Satisfação
          <TooltipProvider>
            <TooltipPrimitive>
              <TooltipTrigger>
                <HelpCircle className="ml-1 inline h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Média das avaliações dos alunos (0-5)</p>
              </TooltipContent>
            </TooltipPrimitive>
          </TooltipProvider>
        </div>
      ),
    },
    {
      accessorKey: "assiduidade",
      header: () => (
        <div className="flex items-center">
          Assiduidade
          <TooltipProvider>
            <TooltipPrimitive>
              <TooltipTrigger>
                <HelpCircle className="ml-1 inline h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Porcentagem de presença do instrutor nos horários agendados</p>
              </TooltipContent>
            </TooltipPrimitive>
          </TooltipProvider>
        </div>
      ),
    },
    {
      accessorKey: "treinosCriados",
      header: () => (
        <div className="flex items-center">
          Treinos Criados
          <TooltipProvider>
            <TooltipPrimitive>
              <TooltipTrigger>
                <HelpCircle className="ml-1 inline h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Número total de treinos personalizados criados</p>
              </TooltipContent>
            </TooltipPrimitive>
          </TooltipProvider>
        </div>
      ),
    },
  ]

  const table = useReactTable({
    data: instructorPerformance,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Desempenho dos Instrutores</h2>
      </div>

      <div className="flex items-center space-x-4">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
              {value
                ? instructors.find((instructor) => instructor.value === value)?.label
                : "Selecione um instrutor..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Buscar instrutor..." />
              <CommandList>
                <CommandEmpty>Nenhum instrutor encontrado.</CommandEmpty>
                <CommandGroup>
                  {instructors.map((instructor) => (
                    <CommandItem
                      key={instructor.value}
                      value={instructor.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check className={cn("mr-2 h-4 w-4", value === instructor.value ? "opacity-100" : "opacity-0")} />
                      {instructor.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={!value}>Ver Detalhes</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Detalhes do Instrutor: {instructors.find((i) => i.value === value)?.label}</DialogTitle>
            </DialogHeader>
            <InstructorDetails instructor={value} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Avaliações</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalRatings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  {instructors.map((instructor) => (
                    <Line
                      key={instructor.value}
                      type="monotone"
                      dataKey={instructor.value}
                      name={instructor.label}
                      stroke={
                        instructor.value === "joao" ? "#8884d8" : instructor.value === "maria" ? "#82ca9d" : "#ffc658"
                      }
                      strokeWidth={2}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Histórico de Esforço dos Alunos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalEffort}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  {instructors.map((instructor) => (
                    <Line
                      key={instructor.value}
                      type="monotone"
                      dataKey={instructor.value}
                      name={instructor.label}
                      stroke={
                        instructor.value === "joao" ? "#8884d8" : instructor.value === "maria" ? "#82ca9d" : "#ffc658"
                      }
                      strokeWidth={2}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Visão Geral do Desempenho</CardTitle>
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
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      Nenhum resultado encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
              </div>
              <div className="space-x-2">
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

