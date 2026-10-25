import { createFileRoute } from "@tanstack/react-router";
import { AuthPage } from "#/components/auth/auth-page";
export const Route = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Masuk — AnabulCare" }] }),
	component: () => <AuthPage mode="login" />,
});
