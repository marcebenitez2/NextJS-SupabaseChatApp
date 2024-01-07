import React, { Suspense } from "react";
import ListMessages from "./listMessages";
import { supabaseServer } from "@/lib/supabase/server";
import InitMessages from "@/lib/store/initMessages";

async function ChatMessages() {
  const supabase = supabaseServer();

  const { data, error } = await supabase.from("messages").select("*,users(*)");

  return (
    <Suspense fallback={"Loading..."}>
      <ListMessages />
      <InitMessages messages={data || []} />
    </Suspense>
  );
}

export default ChatMessages;
