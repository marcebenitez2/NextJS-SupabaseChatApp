"client component";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMessage } from "@/lib/store/messages";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef } from "react";

export function EditAlert() {
  // Nos traemos el mensaje a editar
  const actionMessage = useMessage((state) => state.actionMessage);
  // Nos traemos la funcion que actualiza el mensaje
  const optimisticUpdateMessage = useMessage(
    (state) => state.optimisticUpdateMessage
  );
  const supabase = supabaseBrowser();
  const inputRef = useRef();

  const handleEditMessage = async (e) => {
    e.preventDefault();
    const text = inputRef.current.value.trim();
    if (text) {
      // Primero actualizamos el mensaje de forma optica para que el usuario vea el cambio
      optimisticUpdateMessage({ ...actionMessage, text: text, is_edit: true });
      const { data, error } = await supabase
        .from("messages")
        .update({ text: text, is_edit: true })
        .match({ id: actionMessage?.id });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Message updated successfully");
        document.getElementById("trigger-edit")?.click();
      }
    } else {
      document.getElementById("trigger-edit")?.click();
      document.getElementById("trigger-delete")?.click();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button id="trigger-edit"></button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Edit Message</DialogTitle>
          <DialogDescription>Esto es para editar mensajes</DialogDescription>
        </DialogHeader>
        <Input defaultValue={actionMessage?.text} ref={inputRef} />
        <DialogFooter>
          <Button type="submit" onClick={handleEditMessage}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DeleteAlert() {
  const actionMessage = useMessage((state) => state.actionMessage);
  const optimisticDeleteMessage = useMessage(
    (state) => state.optimisticDeleteMessage
  );

  const handleDeleteMessage = async () => {
    const supabase = supabaseBrowser();
    optimisticDeleteMessage(actionMessage?.id);

    const { data, error } = await supabase
      .from("messages")
      .delete()
      .match({ id: actionMessage?.id });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Message deleted successfully");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button id="trigger-delete"></button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the message permanently?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteMessage}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
