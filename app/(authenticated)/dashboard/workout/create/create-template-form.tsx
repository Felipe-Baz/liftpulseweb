'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Plus } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useRouter } from 'next/navigation'
import { Exercise, FormErrors } from '@/types/exercise'
import ExerciseRow from '@/components/ExerciseRow'
import { ExerciseList, Workout } from '@/types/workout'
import { createWorkout } from '@/actions/workout'
import { transformTableDataToSeries } from '@/utils/transformers'

export default function CreateTemplateForm() {
    const router = useRouter()
    const [templateName, setTemplateName] = useState('')
    const [exercises, setExercises] = useState<Exercise[]>([])
    const [errors, setErrors] = useState<FormErrors>({})

    useEffect(() => {
        // Verifica se há exercícios selecionados na sessionStorage
        const storedExercises = sessionStorage.getItem('selectedExercises');

        if (storedExercises) {
            const exercisesFromLibrary = JSON.parse(storedExercises);
            setExercises(exercisesFromLibrary);
            sessionStorage.removeItem('selectedExercises'); // Limpa os dados após carregar
        }
    }, []);

    const removeExercise = (id: string) => {
        setExercises(exercises.filter(exercise => exercise.id !== id))
    }

    const updateExercise = (id: string, field: keyof Exercise, value: any) => {
        setExercises(prev =>
            prev.map(exercise =>
                exercise.id === id ? { ...exercise, [field]: value } : exercise
            )
        );
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

    const handleSave = async () => {
        if (validateForm()) {
            // Converta os dados da tela para o formato esperado pela API
            const workoutData: Workout = {
                id: '',
                created_at: '',
                updated_at: '',

                title: templateName,
                description: "Descrição do treino",
                duration: 0,
                calories: 0,
                distance: 0,
                volume: 0,
                image_video: "",
                is_public: true,
                exercise_list: exercises.map((exercise) => {
                    // Convertemos as séries de cada exercício para o formato esperado
                    const exerciseList: ExerciseList = {
                        exercise_id: exercise.id,
                        title: exercise.title,
                        interval: 0, // Substitua pelos dados do formulário
                        series: transformTableDataToSeries(exercise.series)
                    };
                    return exerciseList;
                }),
            };

            const savedWorkout = await createWorkout(workoutData);

            if (savedWorkout) {
                console.log('Treino salvo com sucesso:', savedWorkout);
                router.refresh();
                router.push("/dashboard/workout/library");
            } else {
                console.error('Erro ao salvar o treino');
            }
        }
    };

    const navigateToExerciseLibrary = () => {
        // Armazenar os exercícios selecionados na sessionStorage antes de navegar
        sessionStorage.setItem('selectedExercises', JSON.stringify(exercises));
        router.push('/dashboard/exercise/search?fromCreateTemplate=true');
    };

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
                        <Button type="button" onClick={navigateToExerciseLibrary} variant="default">
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
                onClick={navigateToExerciseLibrary}
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
                size="icon"
            >
                <Plus className="h-6 w-6" />
                <span className="sr-only">Add from exercise library</span>
            </Button>
        </form>
    )
}
