import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';

const api = axios.create({
    baseURL: '/api'
})


// If 401st error is received either on /auth/login or  /auth/register, then credentials are invalid
const AUTH_ENDPOINTS = ['/auth/login', '/auth/register'];

// Request interceptor 
api.interceptors.request.use((config) => {
    try {
        const isAuthEndpoint = AUTH_ENDPOINTS.some((endpoint) => config.url?.includes(endpoint));

        if(!isAuthEndpoint){
            const storageData = localStorage.getItem('auth-storage');
            if(storageData){
                const parsed = JSON.parse(storageData);
                const token = parsed?.state?.token;

                if(token){
                    config.headers['x-auth-token'] = token;
                }
            }

        }
    } catch (e) {
        console.error('Failed to parse auth-storage from localStorage:', e);
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    }
)

// Response interceptor — handling 401st error & logging out
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const url = error.config?.url ?? '';

        const isAuthEndpoint = AUTH_ENDPOINTS.some((endpoint) => url.includes(endpoint));

        if (status === 401 && !isAuthEndpoint) {
            toast.error('Error!', {
                description: 'Token is expired. Logging out...'
            })
            useAuthStore.getState().setLogout();
        }

        return Promise.reject(error);
    }
)

export { api };