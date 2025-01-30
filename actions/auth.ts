"use server"

import api from "@/lib/api/axios-instance";
import { SignupResponse } from "@/types/auth";


export async function addUser(username: string, password: string, email: string): Promise<SignupResponse> {
    try {
        const response = await api.post('/api/v1/signup', {
            "username": username,
            "password": password,
            "email": email,
            "role": "GYM"
        });
        const branchData = response.data;
    
        // Mapeando os dados da resposta para o formato esperado
        return {
            access_token: branchData.access_token,
            refreshtoken: branchData.refreshtoken
        };
      } catch (error) {
        console.error('Erro ao registrar conta:', error);
        throw new Error('useBranch must be used within a BranchProvider')
      }
}
