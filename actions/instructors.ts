"use server"

import api from "@/lib/api/axios-instance";
import { Instructor } from "@/types/instructor";

export async function addinstructor(
    username: string,
    email: string,
    phonenumber: string,
    branch_id: string,
    birthdate: string,
    profile_image: string,
    password: string,
): Promise<Instructor> {
    try {
        const response = await api.post("/api/v1/instructor", {
            username,
            email,
            profile_image,
            phonenumber,
            status: "active",
            password,
            branch_id,
            birthdate,
        });
        const instructorData = response.data.instructor;
        const qrcodeData = response.data.qr_code;

        return {
            id: instructorData.id,
            username: instructorData.username,
            email: instructorData.email,
            profile_image: instructorData.profile_image,
            phonenumber: instructorData.phonenumber,
            status: instructorData.status,
            birthdate: instructorData.birthdate,
            groups: [],
            password: instructorData.password,
        };
    } catch (error) {
        console.error("Erro ao adicionar instrutor:", error);
        throw new Error("Falha ao adicionar instrutor");
    } 
}

export async function getinstructorsByBranch(branchId: string): Promise<Instructor[]> {
    try {
        const response = await api.get(`/api/v1/instructor/branch/${branchId}`);
        const instructorsData = response.data;

        // Mapeando os dados da resposta para o formato esperado
        return instructorsData.map((instructor: any) => ({
            id: instructor.id,
            username: instructor.username,
            email: instructor.email,
            phonenumber: instructor.phonenumber,
            profile_image: instructor.ImageUrl,
            status: instructor.status,
            birthdate: instructor.birthdate,
            groups: [],
            password: instructor.password,
        }));
    } catch (error) {
        console.error('Erro ao buscar os instrutors:', error);
        throw new Error('Failed to fetch instructors for the given branch');
    }
}

export async function getinstructorDetails(instructorId: string): Promise<Instructor> {
    try {
        const response = await api.get(`/api/v1/instructor/${instructorId}`);
        const instructorData = response.data;

        // Mapeando os dados da resposta para o formato esperado
        return {
            id: instructorData.id,
            username: instructorData.nome,
            email: instructorData.email,
            profile_image: instructorData.profile_image,
            phonenumber: instructorData.phonenumber,
            status: instructorData.status,
            birthdate: instructorData.birthdate,
            groups: [],
            password: instructorData.password,
        };
    } catch (error) {
        console.error('Erro ao buscar os detalhes do instrutor:', error);
        throw new Error('Failed to fetch instructor details');
    }
}

export async function updateinstructor(
    instructorId: string,
    updatedData: {
        name: string;
        email: string;
        phonenumber: string;
        profile_image: string;
        birthdate: string;
        status: string;
        password: string;
    }
): Promise<Instructor> {
    try {
        const response = await api.put(`/api/v1/instructor/${instructorId}`, {
            nome: updatedData.name,
            email: updatedData.email,
            phonenumber: updatedData.phonenumber,
            profile_image: updatedData.profile_image,
            birthDate: updatedData.birthdate,
            status: updatedData.status,
            password: updatedData.password,
        });

        const instructorData = response.data;

        // Mapeando os dados da resposta para o formato esperado
        return {
            id: instructorData.id,
            username: instructorData.username,
            email: instructorData.email,
            profile_image: instructorData.profile_image,
            phonenumber: instructorData.phonenumber,
            status: instructorData.status,
            birthdate: instructorData.birthdate,
            groups: [],
            password: instructorData.password,
        };
    } catch (error) {
        console.error('Erro ao atualizar o instrutor:', error);
        throw new Error('Failed to update instructor');
    }
}

export async function deleteinstructor(instructorId: string): Promise<void> {
    try {
        await api.delete(`/api/v1/instructor/${instructorId}`);
        console.log(`Instrutor com ID ${instructorId} deletado com sucesso`);
    } catch (error) {
        console.error('Erro ao deletar o instrutor:', error);
        throw new Error('Failed to delete instructor');
    }
}
