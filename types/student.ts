export interface Student {
  id: string
  username: string
  email: string
  birthdate: string
  profile_image: string
  phonenumber: string
  gender: "M" | "F"
  goal: "emagrecer" | "hipertrofia" | "secar" | "flexibilidade" | "massa_magra" | "Apreder_o_basico"
  activityLevel: "beginner" | "intermediate" | "advanced" | "true_beast"
  groups: string[]
  status: "active" | "inactive"
}

export interface StudentGroup {
  id: string
  name: string
  description: string
  color: string
}
