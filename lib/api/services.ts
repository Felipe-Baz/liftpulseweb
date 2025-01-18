import api from './axios-instance'
import type { ApiResponse, UserData } from './types'

export const userService = {
    getProfile: () =>
        api.get<ApiResponse<UserData>>('/api/v1/user/profile'),

    updateProfile: (data: Partial<UserData>) =>
        api.put<ApiResponse<UserData>>('/api/v1/user/profile', data),
}

export const workoutService = {
    getWorkouts: () =>
        api.get<ApiResponse<any>>('/api/v1/workouts'),
}

