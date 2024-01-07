"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";

function ChatInput() {
  const handleSendMessage = async (message) => {
    const supabase = supabaseBrowser();

    const { error } = await supabase
      .from("messages")
      .insert([{ text: message }]);

    if (error) {
      toast.error(error.message);
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
