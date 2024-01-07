import ChatHeader from "@/components/chatHeader";
import ChatInput from "@/components/chatInput";
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
          <div className="flex-1 flex flex-col p-5 h-full overflow-y-auto">
            <div className="flex-1"></div>
            <div className="space-y-5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => {
                return (
                  <div className="flex gap-2" key={value}>
                    <div className="w-10 h-10 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1">
                        <h1 className="font-bold">Marse</h1>
                        <h1 className="text-sm text-gray-400">
                          {new Date().toDateString()}
                        </h1>
                      </div>
                      <p className="text-gray-300">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Ea dolorum, eveniet aspernatur perspiciatis dolor
                        nulla repellat ut sequi iusto sint. Recusandae
                        provident, itaque dolorum doloremque expedita
                        consectetur repudiandae vero quaerat.
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <ChatInput />
        </div>
      </div>
      <InitUser user={data.session?.user} />
    </>
  );
}
