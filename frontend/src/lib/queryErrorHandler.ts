import { toast } from "sonner";
import axios from "axios";

export const queryErrorHandler = (error: unknown) => {
    let errorMsg = 'Unexpected error';
    
    if (axios.isAxiosError(error)) {
        errorMsg = error.response?.data?.errors?.[0]?.msg ?? errorMsg;
    }

    toast.error('Error!', {
        description: errorMsg
    });
}