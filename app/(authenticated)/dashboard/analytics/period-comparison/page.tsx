"use client"

import { useState } from "react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts"
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

// Dados simulados
const generateMonthlyData = (baseValue: number, variance: number) => {
    return Array.from({ length: 12 }, (_, i) => ({
        month: format(new Date(2024, i, 1), "MMM", { locale: ptBR }),
        value: baseValue + Math.random() * variance,
    }))
}

const metrics = {
    receita: generateMonthlyData(50000, 10000),
    frequencia: generateMonthlyData(800, 200),
    novosAlunos: generateMonthlyData(30, 10),
    taxaCancelamento: generateMonthlyData(5, 2),
}

export default function ComparativoPeriodosPage() {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [compareDate, setCompareDate] = useState<Date | undefined>(
        new Date(new Date().setFullYear(new Date().getFullYear() - 1))
    )
    const [period, setPeriod] = useState("monthly")

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">
                    Comparativo de Períodos
                </h2>
                <div className="flex items-center gap-4">
                    <Select
                        value={period}
                        onValueChange={(value) => setPeriod(value)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Selecione o período" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="monthly">Mensal</SelectItem>
                            <SelectItem value="quarterly">Trimestral</SelectItem>
                            <SelectItem value="yearly">Anual</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex gap-2">
                        <div className="flex flex-col gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Selecione a data
                                </label>
                                <input
                                    type="date"
                                    className="w-[200px] px-3 py-2 border rounded-md text-left font-normal"
                                    value={date ? format(date, "yyyy-MM-dd") : ""}
                                    onChange={(e) => setDate(new Date(e.target.value))}
                                    max={new Date().toISOString().split("T")[0]} // Limita ao dia atual
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Comparar com
                                </label>
                                <input
                                    type="date"
                                    className="w-[200px] px-3 py-2 border rounded-md text-left font-normal"
                                    value={compareDate ? format(compareDate, "yyyy-MM-dd") : ""}
                                    onChange={(e) => setCompareDate(new Date(e.target.value))}
                                    max={new Date().toISOString().split("T")[0]} // Limita ao dia atual
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Receita</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={metrics.receita}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip
                                        formatter={(value: number) =>
                                            new Intl.NumberFormat('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL'
                                            }).format(value)
                                        }
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#8884d8"
                                        name="Atual"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#82ca9d"
                                        strokeDasharray="5 5"
                                        name="Período Anterior"
                                        data={metrics.receita.map(item => ({
                                            ...item,
                                            value: item.value * 0.8
                                        }))}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Frequência de Alunos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={metrics.frequencia}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#8884d8" name="Atual" />
                                    <Bar
                                        dataKey="value"
                                        fill="#82ca9d"
                                        name="Período Anterior"
                                        data={metrics.frequencia.map(item => ({
                                            ...item,
                                            value: item.value * 0.9
                                        }))}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Novos Alunos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={metrics.novosAlunos}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#8884d8"
                                        name="Atual"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#82ca9d"
                                        strokeDasharray="5 5"
                                        name="Período Anterior"
                                        data={metrics.novosAlunos.map(item => ({
                                            ...item,
                                            value: item.value * 0.7
                                        }))}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Taxa de Cancelamento (%)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={metrics.taxaCancelamento}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#8884d8"
                                        name="Atual"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#82ca9d"
                                        strokeDasharray="5 5"
                                        name="Período Anterior"
                                        data={metrics.taxaCancelamento.map(item => ({
                                            ...item,
                                            value: item.value * 1.2
                                        }))}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
