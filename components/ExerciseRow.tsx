// components/ExerciseRow.tsx
"use client"

import { useCallback } from "react";
import DynamicCard from "@/components/Custom-Create-Exercise";
import { Exercise, ExerciseType } from "@/types/exercise";

interface ExerciseRowProps {
    exercise: Exercise;
    updateExercise: (id: string, field: keyof Exercise, value: any) => void;
    removeExercise: (id: string) => void;
}

function parseExerciseType(type: string): ExerciseType {
    if (Object.values(ExerciseType).includes(type as ExerciseType)) {
        return type as ExerciseType;
    } else {
        throw "error ExerciseType";
    }
}

export default function ExerciseRow({ exercise, updateExercise, removeExercise }: ExerciseRowProps) {
    // useCallback é chamado de forma incondicional neste componente,
    // garantindo a ordem consistente dos hooks
    const handleSeriesChange = useCallback(
        (series: any) => {
            updateExercise(exercise.id, "series", series);
        },
        [exercise.id, updateExercise]
    );

    return (
        <div className="space-y-4">
            <DynamicCard
                exercise={exercise}
                title={exercise.title || "New Exercise"}
                description={exercise.description || "Crie a descrição do exercicio"}
                exerciseType={parseExerciseType(exercise.type)}
                onSeriesChange={handleSeriesChange}
                removeExercise={removeExercise}
            />
        </div>
    );
}
