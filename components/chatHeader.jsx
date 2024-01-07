"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";

function ChatHeader({ user }) {
  const router = useRouter();

  const handleLoginWhitGitHub = () => {
    const supabase = supabaseBrowser();

    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  };

  const handleLogout = async () => {
    const supabase = supabaseBrowser();

    await supabase.auth.signOut();

    router.refresh();
  };

  
  return (
    <div className="h-20">
      <div className="p-5 border-b w-full flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Hoy</h1>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
            <h1 className="text-sm text-gray-400">2 onlines</h1>
          </div>
        </div>
        {user ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <Button onClick={handleLoginWhitGitHub}>Login</Button>
        )}
      </div>
    </div>
  );
}

export default ChatHeader;
