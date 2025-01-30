"use server"

import api from "@/lib/api/axios-instance";
import { Student } from "@/types/student";

export async function addStudent(
    username: string,
    email: string,
    phonenumber: string,
    branch_id: string,
    birthdate: string,
    gender: "M" | "F",
    goal: "emagrecer" | "hipertrofia" | "secar" | "flexibilidade" | "massa_magra" | "Apreder_o_basico",
    activity_level: "beginner" | "intermediate" | "advanced" | "true_beast",
    profile_image: string,
): Promise<Student> {
    try {
        const response = await api.post("/api/v1/student", {
            username,
            email,
            profile_image,
            phonenumber,
            status: "active",
            branch_id,
            birthdate,
            gender,
            activity_level,
            goal
        });
        const studentData = response.data.student;
        const qrcodeData = response.data.qr_code;

        return {
            id: studentData.id,
            username: studentData.nome,
            email: studentData.email,
            profile_image: studentData.imagem,
            phonenumber: studentData.telefone,
            status: studentData.status,
            birthdate: studentData.birthdate,
            gender: studentData.gender,
            goal: studentData.goal,
            activity_level: studentData.activityLevel,
            groups: [],
            qrcode: qrcodeData,
        };
    } catch (error) {
        console.error("Erro ao adicionar aluno:", error);
        throw new Error("Falha ao adicionar aluno");
    } 
}

export async function getStudentsByBranch(branchId: string): Promise<Student[]> {
    try {
        const response = await api.get(`/api/v1/student/branch/${branchId}`);
        const studentsData = response.data;

        // Mapeando os dados da resposta para o formato esperado
        return studentsData.map((student: any) => ({
            id: student.id,
            username: student.username,
            email: student.email,
            phonenumber: student.phonenumber,
            profile_image: student.profile_image,
            status: student.status,
            birthdate: student.birthdate,
            gender: student.gender,
            goal: student.goal,
            activity_level: student.activity_level,
        }));
    } catch (error) {
        console.error('Erro ao buscar os alunos:', error);
        throw new Error('Failed to fetch students for the given branch');
    }
}

export async function getStudentDetails(studentId: string): Promise<Student> {
    try {
        const response = await api.get(`/api/v1/student/${studentId}`);
        const studentData = response.data;

        // Mapeando os dados da resposta para o formato esperado
        return {
            id: studentData.id,
            username: studentData.username,
            email: studentData.email,
            phonenumber: studentData.phonenumber,
            profile_image: studentData.profile_image,
            status: studentData.status,
            birthdate: studentData.birthdate,
            gender: studentData.gender,
            goal: studentData.goal,
            activity_level: studentData.activityLevel,
            groups: [],
            qrcode: null
        };
    } catch (error) {
        console.error('Erro ao buscar os detalhes do aluno:', error);
        throw new Error('Failed to fetch student details');
    }
}

export async function updateStudent(
    studentId: string,
    updatedData: {
        name: string;
        email: string;
        phoneNumber: string;
        profileImage: string;
        birthdate: string;
        status: string;
    }
): Promise<Student> {
    try {
        const response = await api.put(`/api/v1/student/${studentId}`, {
            nome: updatedData.name,
            email: updatedData.email,
            phonenumber: updatedData.phoneNumber,
            profile_image: updatedData.profileImage,
            birthdate: updatedData.birthdate,
            status: updatedData.status,
        });

        const studentData = response.data;

        // Mapeando os dados da resposta para o formato esperado
        return {
            id: studentData.id,
            username: studentData.username,
            email: studentData.email,
            phonenumber: studentData.phonenumber,
            profile_image: studentData.profile_image,
            status: studentData.status,
            birthdate: studentData.birthdate,
            gender: studentData.gender,
            goal: studentData.goal,
            activity_level: studentData.activityLevel,
            groups: [],
            qrcode: null
        };
    } catch (error) {
        console.error('Erro ao atualizar o aluno:', error);
        throw new Error('Failed to update student');
    }
}

export async function deleteStudent(studentId: string): Promise<void> {
    try {
        await api.delete(`/api/v1/student/${studentId}`);
        console.log(`Instrutor com ID ${studentId} deletado com sucesso`);
    } catch (error) {
        console.error('Erro ao deletar o aluno:', error);
        throw new Error('Failed to delete student');
    }
}
