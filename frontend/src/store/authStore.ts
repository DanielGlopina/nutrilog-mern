import {create} from 'zustand';

type AuthStore = {
    token: string | null,
    isAuthenticated: boolean,
    setToken: (token: string) => void,
    logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    setToken: (newToken: string) => {
        localStorage.setItem('token', newToken);
        set(() => ({token: newToken, isAuthenticated: true}))
    },
    logout: () => {
        localStorage.removeItem('token');
        set({token: null, isAuthenticated: false})
    }
}))