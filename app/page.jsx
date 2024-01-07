import ChatHeader from "@/components/chatHeader";
import { Input } from "@/components/ui/input";
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
          <div className="flex-1 bg-slate-600"></div>
          <div className="p-5">
            <Input placeholder="Enviar mensaje" />
          </div>
        </div>
      </div>
      <InitUser user={data.session?.user} />
    </>
  );
}
