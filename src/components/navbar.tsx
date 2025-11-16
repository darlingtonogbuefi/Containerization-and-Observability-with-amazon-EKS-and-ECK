// src/components/navbar.tsx
import Link from "next/link";
import { createClient } from "../../supabase/server";
import { Button } from "./ui/button";
import NavbarClient from "./navbar-client";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <NavbarClient user={user} />;
}
