import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader, Trash2Icon, XIcon } from "lucide-react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useTransition } from "react";

function DeleteMealButton({ mealId }: { mealId: string }) {
   const [isPending, startTransition] = useTransition();

   const handleDeleteMeal = async () => {
      startTransition(async () => {
        //  HANDLER

        //  if (result?.error) {
        //     toast.error('Error was occured!', {
        //        description: result.message
        //     })
        //  }
         console.log(mealId);

         toast.success('Success!', {
            description: 'Meal was deleted!'
         })
      })
   }

   return <AlertDialog>
      <AlertDialogTrigger asChild>
         <Button variant="destructive">
            <Trash2Icon />
         </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
         <AlertDialogHeader>
            <AlertDialogTitle>Delete Meal</AlertDialogTitle>
            <AlertDialogDescription>
               Are you absolutely sure about deleting this meal?
            </AlertDialogDescription>
            <AlertDialogCancel variant="ghost" className="absolute top-2 right-2 hover:cursor-pointer" >
               <XIcon />
            </AlertDialogCancel>
         </AlertDialogHeader>
         <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <Button onClick={handleDeleteMeal} disabled={isPending}>
               Continue
               {isPending && <Loader className="animate-spin" />}
            </Button>
         </AlertDialogFooter>
      </AlertDialogContent>
   </AlertDialog>



}

export default DeleteMealButton;