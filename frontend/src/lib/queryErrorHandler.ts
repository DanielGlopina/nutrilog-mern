import { toast } from "sonner";
import axios from "axios";

export const queryErrorHandler = (error: unknown) => {
    let errorMsg = 'Unexpected error';
    
    if (axios.isAxiosError(error)) {
        const apiError = error.response?.data?.errors?.[0];
        errorMsg = (typeof apiError === 'string' ? apiError : apiError?.msg) ?? errorMsg;
    }

    toast.error('Error!', {
        description: errorMsg
    });
}
