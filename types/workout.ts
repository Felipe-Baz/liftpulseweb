import { Exercise } from "./exercise";

export interface Series {
    type: "AQUECIMENTO" | "TREINO" | "FALHADA" | "DROP";
    last: string;
    weight: number;
    repetitions: number;
    time: number;
    distance: number;
}

export interface ExerciseList {
    exercise_id: string;
    title: string;
    interval: number;
    series: Series[];
}

export interface Workout {
    id: string;
    title: string;
    description: string;
    duration: number;
    calories: number;
    distance: number;
    volume: number;
    image_video: string;
    is_public: boolean;
    exercise_list: ExerciseList[];
    created_at: string;
    updated_at: string;
}

export interface WorkoutDetails {
    id: string;
    title: string;
    description: string;
    duration: number;
    calories: number;
    distance: number;
    volume: number;
    image_video: string;
    is_public: boolean;
    exercises: Exercise[];
    created_at: string;
    updated_at: string;
}

export interface WorkoutDto {
    workout_id: string;
    title: string;
    description: string;
    duration: number;
    calories: number;
    distance: number;
    volume: number;
    image_video: string;
    is_public: boolean;
    exercise_list: ExerciseList[];
    created_at: string;
    updated_at: string;
}

export interface WorkoutResponse {
    workouts: WorkoutDto[];
    dash: {
        count: number;
        duration: number;
        volume: number;
    };
}