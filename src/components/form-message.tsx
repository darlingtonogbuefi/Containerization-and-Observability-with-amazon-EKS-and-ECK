// src\components\form-message.tsx

import type { Message } from "@/types/message";

// Re-export the type so it can be imported from this file
export type { Message };

export function FormMessage({ message }: { message: Message }) {
  let className = "border-l-2 px-4 ";

  if (message.type === "success") className += "text-green-500";
  else if (message.type === "error") className += "text-red-500";
  else className += "text-foreground";

  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      <div className={className}>{message.message}</div>
    </div>
  );
}
