import { HydrateClient } from "@/trpc/server";
import LoginIndex from "@/app/_components/login/login-index";

export default function LoginPage() {
  return (
    <HydrateClient>
      <LoginIndex />
    </HydrateClient>
  )
}
