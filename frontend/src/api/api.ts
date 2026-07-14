import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'sonner';

const api = axios.create({
    baseURL: '/api'
})


// Public auth failures must not be treated as an expired authenticated session.
const AUTH_ENDPOINTS = ['/auth', '/users'];

// Attach the persisted JWT to every protected API request.
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

// A 401 from a protected endpoint invalidates the local session.
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
