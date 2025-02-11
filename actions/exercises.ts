"use server"

import api from "@/lib/api/axios-instance";
import { Exercise } from "@/types/exercise"

export async function fetchExercises(): Promise<Exercise[]> {
    try {
        const response = await api.get('/api/v1/exercises');
        const exercisesData = response.data;

        // Mapeando os dados da resposta para o formato esperado
        return exercisesData.map((exercise: any) => ({
            id: exercise.id,
            title: exercise.title,
            description: exercise.description,
            primary_muscle: exercise.primary_muscle,
            secondary_muscle: exercise.secondary_muscle,
            equipment: exercise.equipment,
            type: exercise.type,
            image_video: exercise.image_video,
            is_public: exercise.is_public,
            created_at: exercise.created_at,
            updated_at: exercise.updated_at,
        }));
    } catch (error) {
        console.error('Erro ao buscar os exercícios:', error);
        return [];
    }
}

export async function createExercise(exerciseData: Omit<Exercise, 'id' | 'created_at' | 'updated_at' | 'series'>): Promise<Exercise | null> {
    try {
        const response = await api.post('/api/v1/exercises/', exerciseData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar exercício:', error);
        return null;
    }
}