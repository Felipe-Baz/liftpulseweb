import api from "@/lib/api/axios-instance";
import { SignupData, SignupResponse } from "@/types/auth";

export async function signupAPI(
    request: SignupData
): Promise<SignupResponse> {
    try {
        const response = await api.post("/api/v1/signup", request);
        const SignupData = response.data;

        return {
            access_token: SignupData.access_token,
            refreshtoken: SignupData.refreshtoken
        };
    } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw new Error("Falha ao criar usuário");
    }
}