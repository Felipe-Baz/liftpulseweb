"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { defineColumns, Exercise, ExerciseType } from "@/types/exercise"
import { TimeInput } from "./time-input"
import { ExerciseTypeDialog, contentMap } from "./exercise-type-dialog"

interface DynamicCardProps {
    exercise: Exercise;
    title?: string
    description?: string
    imageUrl?: string
    exerciseType: ExerciseType
    onSeriesChange?: (series: Record<string, string>[]) => void
    removeExercise: (id: string) => void;
}

export default function DynamicCard({
    exercise,
    title = "Card Title",
    description = "Card Description",
    imageUrl = "/placeholder.svg?height=64&width=64",
    exerciseType,
    onSeriesChange,
    removeExercise
}: DynamicCardProps) {
    const columns = defineColumns(exerciseType).map((label: any, index: any) => ({
        key: label.toLowerCase().replace(/\s/g, "_").replace(/[()]/g, ""),
        label,
    }))
    
    const [rows, setRows] = useState<Record<string, string>[]>([])
    const [dialogOpen, setDialogOpen] = useState(false)
    const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null)

    const addNewRow = () => {
        if (!columns || columns.length === 0) return

        const newRow = columns.reduce(
            (acc: any, column: any) => {
                if (column.key === "tipo") {
                    acc[column.key] = "Normal"
                } else if (column.key.includes("duracao")) {
                    acc[column.key] = "0" // Store duration in seconds
                } else {
                    acc[column.key] = ""
                }
                return acc
            },
            {} as Record<string, string>,
        )

        setRows([...rows, newRow])
    }

    const updateCell = (rowIndex: number, columnKey: string, value: string) => {
        const updatedRows = rows.map((row, index) => {
            if (index === rowIndex) {
                return {
                    ...row,
                    [columnKey]: value,
                }
            }
            return row
        })
        setRows(updatedRows)
    }

    const removeRow = (rowIndex: number) => {
        const updatedRows = rows.filter((_, index) => index !== rowIndex)
        setRows(updatedRows)
    }

    const handleTypeSelect = (type: string) => {
        if (activeRowIndex !== null) {
            updateCell(activeRowIndex, "tipo", type)
        }
    }

    const renderInput = (column: { key: string; label: string }, row: Record<string, string>, rowIndex: number) => {
        if (column.key === "tipo") {
            return (
                <button
                    onClick={() => {
                        setActiveRowIndex(rowIndex)
                        setDialogOpen(true)
                    }}
                    className={`p-2 rounded-full transition-colors ${contentMap[row[column.key] || "Normal"].backgroundColor
                        } ${contentMap[row[column.key] || "Normal"].textColor}`}
                >
                    {contentMap[row[column.key] || "Normal"].icon}
                </button>
            )
        }

        if (column.key.includes("duracao")) {
            return (
                <TimeInput
                    value={row[column.key]}
                    onChange={(value: any) => updateCell(rowIndex, column.key, value)}
                    className="h-8"
                />
            )
        }

        if (column.key.includes("repeticoes") || column.key.includes("peso") || column.key.includes("distancia")) {
            return (
                <Input
                    type="number"
                    value={row[column.key]}
                    onChange={(e) => {
                        const value = e.target.value
                        // Only allow positive numbers
                        if (value === "" || Number.parseFloat(value) >= 0) {
                            updateCell(rowIndex, column.key, value)
                        }
                    }}
                    className="h-8"
                    min={0}
                    step={column.key.includes("peso") ? 0.5 : 1}
                />
            )
        }

        return (
            <Input
                type="text"
                value={row[column.key]}
                onChange={(e) => updateCell(rowIndex, column.key, e.target.value)}
                className="h-8"
            />
        )
    }

    useEffect(() => {
        if (onSeriesChange) {
            onSeriesChange(rows)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rows])

    return (
        <Card className="w-full max-w-4xl">
            <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div className="flex flex-row items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={imageUrl} alt={title} />
                        <AvatarFallback>IMG</AvatarFallback>
                    </Avatar>

                    <div className="space-y-1">
                        <h3 className="text-2xl font-semibold leading-none tracking-tight">{title}</h3>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                </div>
                <Button
                    type="button"
                    variant="destructive"
                    onClick={() => removeExercise(exercise.id)}
                >
                    Remover Exercicio
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {columns && columns.length > 0 ? (
                        <div className="border rounded-md">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {columns.map((column: any) => (
                                            <TableHead key={column.key}>{column.label}</TableHead>
                                        ))}
                                        <TableHead className="w-[100px]">Ações</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rows.map((row, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            {columns.map((column: any) => (
                                                <TableCell key={`${rowIndex}-${column.key}`}>{renderInput(column, row, rowIndex)}</TableCell>
                                            ))}
                                            <TableCell>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => removeRow(rowIndex)}
                                                    className="h-8 w-full"
                                                >
                                                    Remover
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground">No columns defined</p>
                    )}
                    <Button onClick={addNewRow} className="w-full" disabled={!columns || columns.length === 0}>
                        Adicionar Série
                    </Button>
                </div>
            </CardContent>
            <ExerciseTypeDialog open={dialogOpen} onOpenChange={setDialogOpen} onSelect={handleTypeSelect} />
        </Card>
    )
}

