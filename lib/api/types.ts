export interface ApiResponse<T> {
    data: T
    message: string
    status: number
}

export interface RefreshTokenResponse {
    access_token: string
    message: string
}

export interface UserData {
    id: string
    name: string
    email: string
    role: string
}

