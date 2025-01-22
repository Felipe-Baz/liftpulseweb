export interface Student {
  id: string
  name: string
  email: string
  registration: string
  birthDate: string
  phone: string
  groups: string[]
  status: "active" | "inactive"
}

export interface StudentGroup {
  id: string
  name: string
  description: string
  color: string
}
