"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar, Clock, BarChart, TrendingUp, User, ChevronLeft, ChevronRight } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// This would typically come from your API
const SAMPLE_DATA = {
    templates: [
        { id: "1", name: "Full Body Workout" },
        { id: "2", name: "Upper Body Focus" },
        { id: "3", name: "Lower Body Strength" },
        { id: "4", name: "Core and Cardio" },
    ],
    history: [
        {
            id: "1",
            templateId: "1",
            user: {
                id: "1",
                name: "John Doe",
                image: "/placeholder.svg?height=32&width=32",
                level: "Advanced",
            },
            completedAt: "2024-01-20T10:30:00Z",
            duration: 65, // minutes
            effortLevel: 8,
            performance: 92,
            exercises: [
                { name: "Bench Press", completed: true, weight: "80kg", achievement: "Personal Best" },
                { name: "Squats", completed: true, weight: "100kg" },
                { name: "Pull-ups", completed: true, reps: "12,10,8" },
            ],
        },
        {
            id: "2",
            templateId: "1",
            user: {
                id: "2",
                name: "Sarah Smith",
                image: "/placeholder.svg?height=32&width=32",
                level: "Intermediate",
            },
            completedAt: "2024-01-20T14:15:00Z",
            duration: 55,
            effortLevel: 7,
            performance: 85,
            exercises: [
                { name: "Bench Press", completed: true, weight: "45kg" },
                { name: "Squats", completed: true, weight: "60kg" },
                { name: "Pull-ups", completed: true, reps: "8,8,6" },
            ],
        },
        {
            id: "3",
            templateId: "2",
            user: {
                id: "3",
                name: "Mike Johnson",
                image: "/placeholder.svg?height=32&width=32",
                level: "Beginner",
            },
            completedAt: "2024-01-20T16:00:00Z",
            duration: 45,
            effortLevel: 9,
            performance: 78,
            exercises: [
                { name: "Shoulder Press", completed: true, weight: "30kg" },
                { name: "Barbell Row", completed: true, weight: "40kg" },
                { name: "Push-ups", completed: true, reps: "15,12,10" },
            ],
        },
        {
            id: "4",
            templateId: "2",
            user: {
                id: "3",
                name: "Mike Johnson",
                image: "/placeholder.svg?height=32&width=32",
                level: "Beginner",
            },
            completedAt: "2024-01-20T16:00:00Z",
            duration: 45,
            effortLevel: 9,
            performance: 78,
            exercises: [
                { name: "Shoulder Press", completed: true, weight: "30kg" },
                { name: "Barbell Row", completed: true, weight: "40kg" },
                { name: "Push-ups", completed: true, reps: "15,12,10" },
            ],
        },
    ],
}

const ITEMS_PER_PAGE_OPTIONS = [10, 20, 30, 50]

export default function TrainingHistory() {
    const [selectedTemplate, setSelectedTemplate] = useState<string>("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    const filteredHistory =
        selectedTemplate === "all"
            ? SAMPLE_DATA.history
            : SAMPLE_DATA.history.filter((h) => h.templateId === selectedTemplate)

    const totalPages = Math.ceil(filteredHistory.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedHistory = filteredHistory.slice(startIndex, startIndex + itemsPerPage)

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage)
    }

    const handleItemsPerPageChange = (value: string) => {
        setItemsPerPage(Number(value))
        setCurrentPage(1) // Reset to first page when changing items per page
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Filter Training History</CardTitle>
                    <CardDescription>Select a training template to view its completion history</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-4">
                    <Select value={selectedTemplate} onValueChange={(value) => {
                        setSelectedTemplate(value)
                        setCurrentPage(1) // Reset to first page when changing template
                    }}>
                        <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Templates</SelectItem>
                            {SAMPLE_DATA.templates.map((template) => (
                                <SelectItem key={template.id} value={template.id}>
                                    {template.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Items per page" />
                        </SelectTrigger>
                        <SelectContent>
                            {ITEMS_PER_PAGE_OPTIONS.map((value) => (
                                <SelectItem key={value} value={value.toString()}>
                                    {value} per page
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>

            <div className="space-y-4 ">
                {paginatedHistory.map((record) => (
                    <Card key={record.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <CardTitle>{SAMPLE_DATA.templates.find((t) => t.id === record.templateId)?.name}</CardTitle>
                                    <CardDescription className="flex items-center space-x-4">
                                        <span className="flex items-center">
                                            <Calendar className="mr-1 h-4 w-4" />
                                            {format(new Date(record.completedAt), "PPp")}
                                        </span>
                                        <span className="flex items-center">
                                            <Clock className="mr-1 h-4 w-4" />
                                            {record.duration} minutes
                                        </span>
                                    </CardDescription>
                                </div>
                                <Badge
                                    variant={
                                        record.user.level === "Advanced"
                                            ? "default"
                                            : record.user.level === "Intermediate"
                                                ? "secondary"
                                                : "outline"
                                    }
                                >
                                    {record.user.level}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage src={record.user.image} alt={record.user.name} />
                                        <AvatarFallback>
                                            {record.user.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{record.user.name}</div>
                                        <div className="text-sm text-muted-foreground flex items-center space-x-4">
                                            <span className="flex items-center">
                                                <BarChart className="mr-1 h-4 w-4" />
                                                Effort: {record.effortLevel}/10
                                            </span>
                                            <span className="flex items-center">
                                                <TrendingUp className="mr-1 h-4 w-4" />
                                                Performance: {record.performance}%
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-3">Exercise Details</h4>
                                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {record.exercises.map((exercise, index) => (
                                            <TooltipProvider key={index}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div className="flex items-center justify-between p-3 rounded-lg border">
                                                            <span className="font-medium">{exercise.name}</span>
                                                            <div className="flex items-center space-x-2">
                                                                {exercise.weight && <Badge variant="secondary">{exercise.weight}</Badge>}
                                                                {exercise.reps && <Badge variant="secondary">{exercise.reps}</Badge>}
                                                                {exercise.achievement && <Badge variant="default">🏆</Badge>}
                                                            </div>
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <div className="text-sm">
                                                            {exercise.weight && <div>Weight: {exercise.weight}</div>}
                                                            {exercise.reps && <div>Reps: {exercise.reps}</div>}
                                                            {exercise.achievement && <div className="text-green-500">{exercise.achievement}!</div>}
                                                        </div>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium">Overall Progress</span>
                                            <span className="text-sm text-muted-foreground">{record.performance}%</span>
                                        </div>
                                        <Progress value={record.performance} />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {filteredHistory.length === 0 && (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center p-6">
                            <User className="h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-lg font-medium">No training history found</p>
                            <p className="text-sm text-muted-foreground">No one has completed this training template yet</p>
                        </CardContent>
                    </Card>
                )}

                {filteredHistory.length > 0 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredHistory.length)} of {filteredHistory.length} results
                        </p>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="icon" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                <ChevronLeft className="h-4 w-4" />
                                <span className="sr-only">Previous page</span>
                            </Button>
                            <div className="flex items-center justify-center text-sm font-medium min-w-[5rem]">
                                Page {currentPage} of {totalPages}
                            </div>
                            <Button variant="outline" size="icon" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                <ChevronRight className="h-4 w-4" />
                                <span className="sr-only">Next page</span>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
