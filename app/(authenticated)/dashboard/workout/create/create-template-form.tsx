'use client'

import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Plus } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import ExerciseLibraryModal from './exercise-library-modal'
import { useRouter } from 'next/navigation'
import { Exercise, ExerciseType, FormErrors } from '@/types/exercise'
import ExerciseRow from '@/components/ExerciseRow'

export default function CreateTemplateForm() {
    const router = useRouter()
    const [templateName, setTemplateName] = useState('')
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [errors, setErrors] = useState<FormErrors>({})
    const [isLibraryOpen, setIsLibraryOpen] = useState(false)

    // Ao selecionar exercícios na biblioteca, removemos os exercícios que vieram da biblioteca anteriormente
    // e adicionamos a nova seleção, marcando-os com fromLibrary: true.
    const handleExercisesSelected = useCallback((selectedExercises: Exercise[]) => {
        setExercises(prev => {
            const nonLibraryExercises = prev.filter(e => !e.fromLibrary)
            const libraryExercises = selectedExercises.map(ex => ({
                ...ex,
                fromLibrary: true
            }))
            return [...nonLibraryExercises, ...libraryExercises]
        })
    }, []);

    const addExercise = () => {
        setExercises([
            ...exercises,
            {
                id: crypto.randomUUID(),
                title: '',
                type: ExerciseType.PESO_REPETICAO,
                description: '',
                primary_muscle: '',
                secondary_muscle: '',
                equipment: '',
                image_video: '',
                is_public: true,
                created_at: '',
                updated_at: '',
                series: [],
                fromLibrary: false // Exercício adicionado manualmente
            },
        ])
    }

    const removeExercise = (id: string) => {
        setExercises(exercises.filter(exercise => exercise.id !== id))
    }

    const updateExercise = useCallback((id: string, field: keyof Exercise, value: any) => {
        setExercises(prev =>
            prev.map(exercise =>
                exercise.id === id ? { ...exercise, [field]: value } : exercise
            )
        );
    }, []);

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
                    !exercise.title.trim() ||
                    !exercise.series || exercise.series.length === 0
            )


            if (hasInvalidExercise) {
                newErrors.exercises = 'All exercises must have a name and at least one series'
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm()) {
            console.log({
                templateName,
                exercises,
            })
        }
    }

    const handleSave = () => {
        
        if (validateForm()) {
            console.log({
                templateName,
                exercises,
            })

            router.refresh()
            router.push("/dashboard/workout/library")
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 mb-10">
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
                        <Button type="button" onClick={() => setIsLibraryOpen(true)} variant="outline">
                            <Plus className="mr-2 h-4 w-4" />
                            Adicionar Exercicio
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
                        <ExerciseRow
                            key={exercise.id}
                            exercise={exercise}
                            updateExercise={updateExercise}
                            removeExercise={removeExercise}
                        />
                    ))}
                </div>
            </div>

            <div className="flex gap-4">
                <Button type="button" onClick={handleSave}>Save Template</Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                >
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
                initialSelected={exercises.filter(ex => ex.fromLibrary).map(ex => ex.id)}
            />
        </form>
    )
}
