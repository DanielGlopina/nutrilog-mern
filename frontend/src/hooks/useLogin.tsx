import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/useAuthStore';
import { api } from '@/api/api';


const useLogin = () => {
    const {setToken} = useAuthStore();
    const navigate = useNavigate();

    const login = async(data : { email: string, password: string} ) => {
        try{
            const res = await api.post('/auth', data).then((response) => {
                return response
            })
            
            setToken(res.data.token)

            toast.success('Success', {
                description: 'You have logged in!'
            })
            navigate('/');
            
        }
        catch(error){
            let errorMsg = 'Unexpected login error'


            if(axios.isAxiosError(error)){
               const apiError = error.response?.data?.errors?.[0]
               errorMsg = (typeof apiError === 'string' ? apiError : apiError?.msg) ?? errorMsg
            }

            toast.error('Error!', {
                description: errorMsg
            })
        }


    }

    return {login};
}

export default useLogin
