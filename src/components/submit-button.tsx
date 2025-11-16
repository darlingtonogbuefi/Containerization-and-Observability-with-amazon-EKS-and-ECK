"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // spinner icon
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  className,
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      aria-busy={pending}
      className={className}
      {...props}
    >
      {pending && (
        <Loader2
          className="mr-2 h-4 w-4 animate-spin"
          aria-hidden="true"
        />
      )}
      {pending ? pendingText : children}
    </Button>
  );
}
