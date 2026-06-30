import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'sonner';
import type z from 'zod';
import type { signupFormSchema } from '@/validation/signupFormSchema';
import { useAuthStore } from '@/store/useAuthStore';
import { api } from '@/api/api';


const useSignup = () => {
    const {setToken} = useAuthStore();
    const navigate = useNavigate();

    const signup = async(data : z.infer<typeof signupFormSchema> ) => {
        try{
            if(data.confirmPassword !== data.password){
                toast.error('Error', {
                    description: 'Passwords should match'
                })
            }
            else{
                const res = await api.post('/users', data).then((response) => {
                    return response
                })

                setToken(res.data.token);

                toast.success('Success', {
                    description: 'You have registered new account!'
                })
                navigate('/');
            }
        }
        catch(error){
            let errorMsg = 'Unexpected signup error'


            if(axios.isAxiosError(error)){
               errorMsg = error.response?.data.errors[0].msg
            }

            toast.error('Error!', {
                description: errorMsg
            })
        }


    }

    return {signup};
}

export default useSignup
