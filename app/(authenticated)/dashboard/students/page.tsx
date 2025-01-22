"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal } from "lucide-react"
import { useStudents } from "@/contexts/student-context"

export default function StudentsPage() {
    const { students, groups, deleteStudent } = useStudents()
    const [sortColumn, setSortColumn] = useState<"name" | "email" | "registration">("name")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

    const sortedStudents = [...students].sort((a, b) => {
        if (sortDirection === "asc") {
            return a[sortColumn].localeCompare(b[sortColumn])
        }
        return b[sortColumn].localeCompare(a[sortColumn])
    })

    const toggleSort = (column: "name" | "email" | "registration") => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortColumn(column)
            setSortDirection("asc")
        }
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="cursor-pointer" onClick={() => toggleSort("name")}>
                            Nome {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => toggleSort("email")}>
                            Email {sortColumn === "email" && (sortDirection === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead className="cursor-pointer" onClick={() => toggleSort("registration")}>
                            Matrícula {sortColumn === "registration" && (sortDirection === "asc" ? "↑" : "↓")}
                        </TableHead>
                        <TableHead>Grupos</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[70px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedStudents.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{student.email}</TableCell>
                            <TableCell>{student.registration}</TableCell>
                            <TableCell>
                                <div className="flex gap-1">
                                    {student.groups.map((groupId) => {
                                        const group = groups.find((g) => g.id === groupId)
                                        return group ? (
                                            <Badge key={group.id} style={{ backgroundColor: group.color }}>
                                                {group.name}
                                            </Badge>
                                        ) : null
                                    })}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant={student.status === "active" ? "default" : "secondary"}>
                                    {student.status === "active" ? "Ativo" : "Inativo"}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Abrir menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => deleteStudent(student.id)}>Excluir</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

