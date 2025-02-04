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

export interface Exercise {
    id: string
    name: string
    exerciseType: ExerciseType
    series: Record<string, string>[] // This will store the dynamic rows from DynamicCard
}

export interface FormErrors {
    templateName?: string
    exercises?: string
}