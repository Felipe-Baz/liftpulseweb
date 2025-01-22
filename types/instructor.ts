export interface Instructor {
    id: string
    name: string
    email: string
    registration: string
    birthDate: string
    phone: string
    groups: string[]
    status: "active" | "inactive"
  }
  
  export interface InstructorGroup {
    id: string
    name: string
    description: string
    color: string
  }
  