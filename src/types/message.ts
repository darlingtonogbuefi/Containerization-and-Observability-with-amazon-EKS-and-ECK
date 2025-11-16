// src/types/message.ts
export type Message = {
  type: "error" | "success" | "info";  // Type of message
  message: string;                     // The text to display
};
