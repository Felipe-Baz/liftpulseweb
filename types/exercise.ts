import { list } from "postcss";

export enum ExerciseType {
    PESO_REPETICAO = "peso_repeticao",
    REPETICAO_PESO_CORPORAL = "repeticao_peso_corporal",
    PESO_CORPORAL_PESO_ACRESCIDO = "peso_corporal_peso_acrescido",
    PESO_CORPORAL_ASSISTIDO = "peso_corporal_assistido",
    DURACAO = "duracao",
    DURACAO_PESO = "duracao_peso",
    DISTANCIA_DURACAO = "distancia_duracao",
    PESO_DISTANCIA = "peso_distancia"
}

export const defineColumns = (exerciseType: ExerciseType) => {
    switch (exerciseType) {
        case ExerciseType.PESO_REPETICAO:
            return ["Tipo", "Peso (kg)", "Repetições"];
        case ExerciseType.REPETICAO_PESO_CORPORAL:
            return ["Tipo", "Repetições"];
        case ExerciseType.PESO_CORPORAL_PESO_ACRESCIDO:
            return ["Tipo", "Peso Acrescido (kg)", "Repetições"];
        case ExerciseType.PESO_CORPORAL_ASSISTIDO:
            return ["Tipo", "Peso Assistido (kg)", "Repetições"];
        case ExerciseType.DURACAO:
            return ["Tipo", "Duração (segundos)"];
        case ExerciseType.DURACAO_PESO:
            return ["Tipo", "Duração (segundos)", "Peso (kg)"];
        case ExerciseType.DISTANCIA_DURACAO:
            return ["Tipo", "Distância (m)", "Duração (segundos)"];
        case ExerciseType.PESO_DISTANCIA:
            return ["Tipo", "Peso (kg)", "Distância (m)"];
        default:
            return ["Tipo"];
    }
}

export interface ExerciseDTO {
    id: string
    name: string
    exerciseType: ExerciseType
    series: Record<string, string>[] // This will store the dynamic rows from DynamicCard
}

export interface Exercise {
    id: string;
    title: string;
    description: string;
    primary_muscle: string;
    secondary_muscle: string;
    equipment: string;
    type: string;
    image_video: string | null;
    is_public: boolean;
    created_at: string;
    updated_at: string;
    series: Record<string, string>[];
    fromLibrary?: boolean; // Indica se o exercício foi adicionado via biblioteca
}

function normalizeExercise(data: Partial<Exercise>): Exercise {
    return {
        id: data.id || '',
        title: data.title || '',
        description: data.description || '',
        primary_muscle: data.primary_muscle || '',
        secondary_muscle: data.secondary_muscle || '',
        equipment: data.equipment || '',
        type: data.type!, // Aqui assumindo que você garante um valor válido para type
        image_video: data.image_video || null,
        is_public: data.is_public || false,
        created_at: data.created_at || new Date().toISOString(),
        updated_at: data.updated_at || new Date().toISOString(),
        // Se data.series for null ou undefined, o operador nullish coalescing (??) garante um array vazio
        series: data.series ?? [],
        fromLibrary: data.fromLibrary,
    };
}

export interface FormErrors {
    templateName?: string
    exercises?: string
}