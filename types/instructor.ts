export interface Instructor {
  id: string
  username: string
  email: string
  birthdate: string
  phonenumber: string
  groups: string[]
  status: "active" | "inactive"
  profile_image?: string
  password: string
}
