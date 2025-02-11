"use server"

import api from "@/lib/api/axios-instance";
import { Workout, WorkoutDetails, WorkoutResponse } from "@/types/workout";

export async function fetchWorkouts(): Promise<WorkoutResponse  | null> {
    try {
        const response = await api.get('/api/v1/workouts/');
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar treinos:', error);
        return null;
    }
}

export async function createWorkout(workoutData: Omit<Workout, 'id' | 'created_at' | 'updated_at'>): Promise<Workout | null> {
    try {
        const response = await api.post('/api/v1/workouts/', workoutData);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar treino:', error);
        return null;
    }
}

export async function fetchWorkoutById(workoutId: string): Promise<WorkoutDetails | null> {
    try {
        const response = await api.get(`/api/v1/workout/${workoutId}`);
        return response.data.workout;
    } catch (error) {
        console.error(`Erro ao buscar treino com ID ${workoutId}:`, error);
        return null;
    }
}