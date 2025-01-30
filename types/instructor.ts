export interface Instructor {
    id: string
    username: string
    email: string
    birthdate: string | null
    phonenumber: string | null
    profile_image: string | null
    groups: string[]
    status: "active" | "inactive"
  }
  
  export interface InstructorGroup {
    id: string
    name: string
    description: string
    color: string
  }
  