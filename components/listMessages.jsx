"use client";
import { useMessage } from "@/lib/store/messages";
import React, { useEffect } from "react";
import { Message } from "./message";
import { DeleteAlert, EditAlert } from "./messageActions";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { toast } from "sonner";

function ListMessages() {
  const { messages, addMessage, optimisticIds } = useMessage((state) => state);
  const supabase = supabaseBrowser();
  useEffect(() => {
    const channel = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },

        async (payload) => {
          if (optimisticIds.includes(payload.new.id)) {
            const { error, data } = await supabase
              .from("users")
              .select("*")
              .eq("id", payload.new.send_by)
              .single();
            if (error) {
              toast.error(error.message);
            } else {
              const newMessage = {
                ...payload.new,
                users: data,
              };
              addMessage(newMessage);
            }
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col p-5 h-full overflow-y-auto">
      <div className="flex-1"></div>
      <div className="space-y-5">
        {messages.map((value, index) => {
          return <Message key={index} message={value} />;
        })}
      </div>
      <DeleteAlert />
      <EditAlert />
    </div>
  );
}

export default ListMessages;
