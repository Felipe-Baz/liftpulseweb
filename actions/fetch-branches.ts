"use server"

import { Branch } from "@/types/branch"

// Simulated delay to mimic API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchBranches(): Promise<Branch[]> {
    await delay(1000) // Simulate network delay
    return [
        { id: "1", name: "Academia Alpha", address: "Rua A, 123" },
        { id: "2", name: "Gym Beta", address: "Rua B, 456" },
        { id: "3", name: "StrongFit", address: "Rua C, 789" },
    ]
}

export async function addBranch(name: string): Promise<Branch> {
    await delay(500) // Simulate network delay
    return {
        id: Math.random().toString(36).substr(2, 9),
        name,
    }
}
