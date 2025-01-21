"use server"

import api from "@/lib/api/axios-instance";
import { Branch } from "@/types/branch"

// Simulated delay to mimic API call
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchBranches(): Promise<Branch[]> {
    try {
      const response = await api.get('/api/v1/gym/branches');
      const branchesData = response.data;
  
      // Mapeando os dados da resposta para o formato esperado
      return branchesData.map((branch: any) => ({
        id: branch.id,
        name: branch.nome,
        address: branch.localizacao,
      }));
    } catch (error) {
      console.error('Erro ao buscar as filiais:', error);
      return [];
    }
  }

export async function addBranch(name: string): Promise<Branch> {
    try {
        const response = await api.post('/api/v1/gym/branches', {
            "nome": name,
            "localizacao": ""
        });
        const branchData = response.data;
    
        // Mapeando os dados da resposta para o formato esperado
        return {
          id: branchData.id,
          name: branchData.nome,
          address: branchData.localizacao,
        };
      } catch (error) {
        console.error('Erro ao buscar as filiais:', error);
        throw new Error('useBranch must be used within a BranchProvider')
      }
}
