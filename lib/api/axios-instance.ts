import { getAuthCookies, setRefreshToken } from '@/app/actions/auth';
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { getCookie, setCookie } from 'cookies-next'
import { cookies } from 'next/headers';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
})

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
    const cookie = await getAuthCookies()
    if (cookie) {
        config.headers.Authorization = `Bearer ${cookie.authToken?.value}`;
        console.log(config.headers.Authorization);
    }

    // Log da base URL e do payload
    console.log('Base URL:', config.baseURL);
    console.log('Endpoint:', config.url);
    console.log('Method:', config.method);
    console.log('Data enviada:', config.data);
    console.log('Headers enviada:', config.headers);

    return config;
});

// Interceptor para handling de refresh token
api.interceptors.response.use(
    (response: any) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config

        // Log do erro
        console.error('Erro na resposta:', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            url: originalRequest?.url,
            method: originalRequest?.method,
        });

        // Se o erro é 401 e não é uma tentativa de refresh
        if ((error.response?.status === 401 || error.response?.status === 403) && originalRequest && !originalRequest.headers['x-retry']) {
            try {
                var refresh: string | undefined = ""
                const cookie = await getAuthCookies()
                if (cookie) {
                    refresh = cookie.refreshToken?.value
                    console.log(refresh);
                }

                const baseUrl = process.env.NEXT_PUBLIC_API_URL;

                // Tenta obter novo token
                const response = await axios.post(
                    `${baseUrl}/api/v1/refresh_token`,
                    { refresh }
                )

                const { access_token: newToken, refreshtoken: newRefreshtoken } = response.data

                await setRefreshToken(newRefreshtoken, newToken);

                // Refaz a requisição original com o novo token
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`
                    originalRequest.headers['x-retry'] = 'true'
                }

                return api(originalRequest)
            } catch (refreshError) {
                // Se falhar o refresh, redireciona para login
                window.location.href = '/login'
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default api

