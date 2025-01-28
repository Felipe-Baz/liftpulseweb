"use server"

import api from "@/lib/api/axios-instance";
import { Branch } from "@/types/branch"

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

export async function addBranch(name: string, address: string | null): Promise<Branch> {
    try {
        const response = await api.post('/api/v1/gym/branches', {
            "nome": name,
            "localizacao": address
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

export async function fetchBranchDetails(branchId: string): Promise<Branch | null> {
  try {
    const response = await api.get(`/api/v1/gym/branches/${branchId}`);
    const branchData = response.data;

    // Mapeando os dados da resposta para o formato esperado
    return {
      id: branchData.id,
      name: branchData.nome,
      address: branchData.localizacao,
      description: branchData.description,
      openingHours: branchData.openinghours,
      facebook: branchData.facebook,
      createdAt: branchData.created_at,
      updatedAt: branchData.updated_at,
      phoneNumber: branchData.phonenumber,
      instagram: branchData.instagram,
      website: branchData.website,
      image: branchData.imagem,
    };
  } catch (error) {
    console.error('Erro ao buscar os detalhes da filial:', error);
    return null; // Retorna null caso a requisição falhe
  }
}

export async function updateBranch(
  branchId: string,
  name: string | null,
  description: string | null,
  address: string | null,
  phoneNumber: string | null,
  openingHours: string | null,
  instagram: string | null,
  facebook: string | null,
  website: string | null,
  image: string | null
): Promise<Branch | null> {
  try {
    const response = await api.put(`/api/v1/gym/branches/${branchId}`, {
      nome: name,
      description,
      localizacao: address,
      phonenumber: phoneNumber,
      openinghours: openingHours,
      instagram,
      facebook,
      website,
      imagem: image,
    });
    
    const branchData = response.data;
    
    // Mapeando os dados da resposta para o formato esperado
    return {
      id: branchData.id,
      name: branchData.nome,
      address: branchData.localizacao,
      description: branchData.description,
      openingHours: branchData.openinghours,
      facebook: branchData.facebook,
      createdAt: branchData.created_at,
      updatedAt: branchData.updated_at,
      phoneNumber: branchData.phonenumber,
      instagram: branchData.instagram,
      website: branchData.website,
      image: branchData.imagem,
    };
  } catch (error) {
    console.error('Erro ao atualizar a filial:', error);
    return null; // Retorna null caso a requisição falhe
  }
}