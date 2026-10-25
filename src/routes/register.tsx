import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "#/components/auth/auth-page";
export const Route = createFileRoute("/register")({
	head: () => ({ meta: [{ title: "Daftar — AnabulCare" }] }),
	component: () => <AuthPage mode="register" />,
});
