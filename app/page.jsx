import ChatHeader from "@/components/chatHeader";
import InitUser from "@/lib/store/initUser";
import { supabaseServer } from "@/lib/supabase/server";
import React from "react";

export default async function Page() {
  const supabase = supabaseServer();
  const { data, error } = await supabase.auth.getSession();

  return (
    <>
      <div className="max-w-3xl mx-auto md:py-10 h-screen">
        <div className="h-full border rounded-md">
          <ChatHeader user={data.session?.user} />
        </div>
      </div>
      <InitUser user={data.session?.user} />
    </>
  );
}
