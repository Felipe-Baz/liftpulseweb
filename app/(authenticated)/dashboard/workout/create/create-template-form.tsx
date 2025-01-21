'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { AlertCircle, Plus, Trash2 } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import ExerciseLibraryModal from './exercise-library-modal'
import { useRouter } from 'next/navigation'

interface Exercise {
    id: string
    name: string
    series: number
    reps: string
}

interface FormErrors {
    templateName?: string
    exercises?: string
}

export default function CreateTemplateForm() {
    const router = useRouter();
    const [templateName, setTemplateName] = useState('')
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [errors, setErrors] = useState<FormErrors>({})
    const [isLibraryOpen, setIsLibraryOpen] = useState(false)

    const handleExercisesSelected = (selectedExercises: { id: string; name: string }[]) => {
        setExercises(prev => [
            ...prev,
            ...selectedExercises.map(exercise => ({
                id: crypto.randomUUID(),
                name: exercise.name,
                series: 3,
                reps: '',
            }))
        ])
    }

    const addExercise = () => {
        setExercises([
            ...exercises,
            {
                id: crypto.randomUUID(),
                name: '',
                series: 3,
                reps: '',
            },
        ])
    }

    const removeExercise = (id: string) => {
        setExercises(exercises.filter(exercise => exercise.id !== id))
    }

    const updateExercise = (id: string, field: keyof Exercise, value: string | number) => {
        setExercises(
            exercises.map(exercise =>
                exercise.id === id ? { ...exercise, [field]: value } : exercise
            )
        )
    }

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!templateName.trim()) {
            newErrors.templateName = 'Template name is required'
        }

        if (exercises.length === 0) {
            newErrors.exercises = 'At least one exercise is required'
        } else {
            const hasInvalidExercise = exercises.some(
                exercise =>
                    !exercise.name.trim() ||
                    exercise.series < 1 ||
                    !exercise.reps.trim()
            )

            if (hasInvalidExercise) {
                newErrors.exercises = 'All exercise fields are required'
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault()

        if (validateForm()) {
            // Here you would typically send the data to your backend
            console.log({
                templateName,
                exercises,
            })

            router.refresh();

            router.push("/dashboard/workout/library");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="templateName">Template Name</Label>
                <Input
                    id="templateName"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="Enter template name"
                    className="max-w-md"
                />
                {errors.templateName && (
                    <Alert variant="destructive" className="max-w-md">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.templateName}</AlertDescription>
                    </Alert>
                )}
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Exercises</h2>
                    <div className="flex gap-2">
                        <Button type="button" onClick={addExercise} variant="outline">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Exercise
                        </Button>
                        <Button type="button" onClick={() => setIsLibraryOpen(true)} variant="outline">
                            From Library
                        </Button>
                    </div>
                </div>

                {errors.exercises && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.exercises}</AlertDescription>
                    </Alert>
                )}

                <div className="space-y-4">
                    {exercises.map((exercise) => (
                        <Card key={exercise.id} className="p-4">
                            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
                                <div className="space-y-2">
                                    <Label htmlFor={`name-${exercise.id}`}>Exercise Name</Label>
                                    <Input
                                        id={`name-${exercise.id}`}
                                        value={exercise.name}
                                        onChange={(e) =>
                                            updateExercise(exercise.id, 'name', e.target.value)
                                        }
                                        placeholder="e.g., Bench Press"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`series-${exercise.id}`}>Series</Label>
                                    <Input
                                        id={`series-${exercise.id}`}
                                        type="number"
                                        min="1"
                                        value={exercise.series}
                                        onChange={(e) =>
                                            updateExercise(exercise.id, 'series', parseInt(e.target.value) || 0)
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor={`reps-${exercise.id}`}>
                                        Reps per Series
                                    </Label>
                                    <Input
                                        id={`reps-${exercise.id}`}
                                        value={exercise.reps}
                                        onChange={(e) =>
                                            updateExercise(exercise.id, 'reps', e.target.value)
                                        }
                                        placeholder="e.g., 10, 12, 8"
                                    />
                                </div>

                                <div className="flex items-end">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => removeExercise(exercise.id)}
                                        className="w-full"
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="flex gap-4">
                <Button type="submit">Save Template</Button>
                <Button type="button" variant="outline">
                    Cancel
                </Button>
            </div>

            <Button
                type="button"
                onClick={() => setIsLibraryOpen(true)}
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
                size="icon"
            >
                <Plus className="h-6 w-6" />
                <span className="sr-only">Add from exercise library</span>
            </Button>

            <ExerciseLibraryModal
                open={isLibraryOpen}
                onOpenChange={setIsLibraryOpen}
                onExercisesSelected={handleExercisesSelected}
            />
        </form>
    )
}
