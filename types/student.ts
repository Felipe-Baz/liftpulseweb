export interface Student {
  id: string
  username: string
  email: string
  birthdate: string
  profile_image: string
  phonenumber: string
  gender: "M" | "F"
  goal: "emagrecer" | "hipertrofia" | "secar" | "flexibilidade" | "massa_magra" | "Apreder_o_basico"
  activity_level: "beginner" | "intermediate" | "advanced" | "true_beast"
  groups: string[]
  status: "active" | "inactive" | "blocked",
  qrcode: string | null | undefined
}

export interface StudentGroup {
  id: string
  name: string
  description: string
  color: string
}

export const goalLabels: Record<Student['goal'], string> = {
  emagrecer: "Emagrecer",
  hipertrofia: "Hipertrofia",
  secar: "Secar",
  flexibilidade: "Flexibilidade",
  massa_magra: "Massa Magra",
  Apreder_o_basico: "Aprender o Básico"
}

export const activityLevelLabels: Record<Student['activity_level'], string> = {
  beginner: "Iniciante",
  intermediate: "Intermediário",
  advanced: "Avançado",
  true_beast: "True Beast"
}

export const statusLabels: Record<Student['status'], string> = {
  active: "Ativo",
  inactive: "Inativo",
  blocked: "Bloqueado"
}
