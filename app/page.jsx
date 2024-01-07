import ChatHeader from "@/components/chatHeader";
import ChatInput from "@/components/chatInput";
import ChatMessages from "@/components/chatMessages";
import ListMessages from "@/components/listMessages";
import InitUser from "@/lib/store/initUser";
import { supabaseServer } from "@/lib/supabase/server";
import React from "react";

export default async function Page() {
  const supabase = supabaseServer();
  const { data, error } = await supabase.auth.getSession();

  return (
    <>
      <div className="max-w-3xl mx-auto md:py-10 h-screen">
        <div className="h-full border rounded-md flex flex-col">
          <ChatHeader user={data.session?.user} />
          <ChatMessages />
          <ChatInput />
        </div>
      </div>
      <InitUser user={data.session?.user} />
    </>
  );
}
