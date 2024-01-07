import { format } from "date-fns";
import { es } from "date-fns/locale"; // Importar el locale en español
import Image from "next/image";
import React from "react";

function Message({ message }) {
  return (
    <div className="flex gap-2">
      <div>
        <Image
          src={message.users?.avatar_url}
          alt={message.users?.display_name}
          width={40}
          height={40}
          className="rounded-full ring-2"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <h1 className="font-bold">{message.users?.display_name}</h1>
          <h1 className="text-sm text-gray-400">
            {format(new Date(message.created_at), "dd/MM/yyyy HH:mm", { locale: es })}
          </h1>
        </div>
        <p className="text-gray-300">{message.text}</p>
      </div>
    </div>
  );
}

export default Message;
