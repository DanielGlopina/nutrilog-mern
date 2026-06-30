import { toast } from "sonner";
import { useAuthStore } from "@/store/useAuthStore";

const useLogout = () => {
    const {setLogout} = useAuthStore();

    const logout = () => {
        setLogout();

        toast.success('Logged Out!',
            {
                description: 'You have logged out from your account'
            }
        )
    }

    return {logout};
}

export default useLogout
