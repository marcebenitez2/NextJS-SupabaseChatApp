"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@/lib/store/user";
import { useMessage } from "@/lib/store/messages";

function ChatInput() {
  const user = useUser((state) => state.user);

  const supabase = supabaseBrowser();

  const addMessage = useMessage((state) => state.addMessage);

  const handleSendMessage = async (message) => {
    if (message.trim()) {
      const newMessage = {
        id: uuidv4(),
        text: message,
        send_by: user?.id,
        is_edit: false,
        create_at: new Date().toString(),
        users: {
          id: user?.id,
          avatar_url: user?.user_metadata.avatar_url,
          display_name: user?.user_metadata.user_name,
          create_at: new Date().toString(),
        },
      };

      addMessage(newMessage);

      const { error } = await supabase
        .from("messages")
        .insert([{ text: message }]);

      if (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("No se puede enviar un mensaje vacio");
    }
  };

  return (
    <div className="p-5">
      <Input
        placeholder="Enviar mensaje"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
}

export default ChatInput;
