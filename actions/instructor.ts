"use server"

import api from "@/lib/api/axios-instance";
import { Instructor } from "@/types/instructor";

export async function addInstructor(
    nome: string,
    email: string,
    imagem: string,
    telefone: string,
    password: string,
    branch_id: string,
    birthdate: string,
): Promise<Instructor> {
    try {
        const response = await api.post("/api/v1/instructor", {
            nome,
            email,
            imagem,
            telefone,
            status: "active",
            password,
            branch_id,
            birthdate
        });
        const instructorData = response.data;

        return {
            id: instructorData.id,
            username: instructorData.nome,
            email: instructorData.email,
            profile_image: instructorData.imagem,
            phonenumber: instructorData.telefone,
            status: instructorData.status,
            birthdate: instructorData.birthdate,
            password: "",
            groups: []
        };
    } catch (error) {
        console.error("Erro ao adicionar instrutor:", error);
        throw new Error("Falha ao adicionar instrutor");
    }
}

export async function getInstructorsByBranch(branchId: string): Promise<Instructor[]> {
    try {
        const response = await api.get(`/api/v1/instructor/branch/${branchId}`);
        const instructorsData = response.data;

        // Mapeando os dados da resposta para o formato esperado
        return instructorsData.map((instructor: any) => ({
            id: instructor.id,
            username: instructor.username,
            email: instructor.email,
            phoneNumber: instructor.phonenumber,
            profileImage: instructor.profile_image,
            status: instructor.status,
            birthdate: instructor.birthdate,
        }));
    } catch (error) {
        console.error('Erro ao buscar os instrutores:', error);
        throw new Error('Failed to fetch instructors for the given branch');
    }
}

export async function getInstructorDetails(instructorId: string): Promise<Instructor> {
    try {
        const response = await api.get(`/api/v1/instructor/${instructorId}`);
        const instructorData = response.data;

        // Mapeando os dados da resposta para o formato esperado
        return {
            id: instructorData.id,
            username: instructorData.username,
            email: instructorData.email,
            phonenumber: instructorData.phonenumber,
            profile_image: instructorData.profile_image,
            status: instructorData.status,
            birthdate: instructorData.birthdate,
            groups: [],
            password: ""
        };
    } catch (error) {
        console.error('Erro ao buscar os detalhes do instrutor:', error);
        throw new Error('Failed to fetch instructor details');
    }
}

export async function updateInstructor(
    instructorId: string,
    updatedData: {
        name: string;
        email: string;
        phoneNumber: string;
        profileImage: string;
        birthdate: string;
        status: string;
    }
): Promise<Instructor> {
    try {
        const response = await api.put(`/api/v1/instructor/${instructorId}`, {
            nome: updatedData.name,
            email: updatedData.email,
            phonenumber: updatedData.phoneNumber,
            profile_image: updatedData.profileImage,
            birthdate: updatedData.birthdate,
            status: updatedData.status,
        });

        const instructorData = response.data;

        // Mapeando os dados da resposta para o formato esperado
        return {
            id: instructorData.id,
            username: instructorData.username,
            email: instructorData.email,
            phonenumber: instructorData.phonenumber,
            profile_image: instructorData.profile_image,
            status: instructorData.status,
            birthdate: instructorData.birthdate,
            groups: [],
            password: ""
        };
    } catch (error) {
        console.error('Erro ao atualizar o instrutor:', error);
        throw new Error('Failed to update instructor');
    }
}

export async function deleteInstructor(instructorId: string): Promise<void> {
    try {
        await api.delete(`/api/v1/instructor/${instructorId}`);
        console.log(`Instrutor com ID ${instructorId} deletado com sucesso`);
    } catch (error) {
        console.error('Erro ao deletar o instrutor:', error);
        throw new Error('Failed to delete instructor');
    }
}