import { Button } from "@/components/ui/button";
import { Loader, Trash2Icon, XIcon } from "lucide-react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useTransition } from "react";
import useDeleteMeal from "@/hooks/useDeleteMeal";

function DeleteMealButton({ mealId, mealDate }: { mealId: string, mealDate: Date }) {
   const [isPending, startTransition] = useTransition();
   const {mutateDeleteMeal} = useDeleteMeal(); 

   const handleDeleteMeal = async () => {
      startTransition(async () => {
         mutateDeleteMeal({mealId, mealDate});
         
       
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