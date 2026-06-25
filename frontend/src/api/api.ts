import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const api = axios.create({
    baseURL: '/api',
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;

        if (token) {
            // Добавьте 'Bearer ', если этого требует ваш бэкенд
            config.headers.Authorization = `Bearer ${token}`; 
            // Если бэкенд ждет просто токен, верните как было: = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Флаг, чтобы не вызывать logout несколько раз при параллельных 401 ошибках
let isLoggingOut = false;

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn('Token has expired');

            if (!isLoggingOut) {
                isLoggingOut = true;
                useAuthStore.getState().logout();
                
                // Опционально: можно добавить редирект на страницу логина
                // window.location.href = '/login'; 
                
                // Сбрасываем флаг через небольшую задержку (или после редиректа)
                setTimeout(() => { isLoggingOut = false; }, 1000);
            }
        }

        return Promise.reject(error);
    }
);

export default api;