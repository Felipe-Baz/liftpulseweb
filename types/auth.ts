export interface LoginResponse {
  access_token: string
  refreshtoken: string
  is_signup_finished: boolean
  plan: string
}

export interface SignupResponse {
  access_token: string
  refreshtoken: string
}

export interface SignupData {
  username: string
  email: string
  password: string
  role: "GYM"
}

