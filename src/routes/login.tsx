import { createFileRoute } from "@tanstack/react-router";
import { Login } from "#/modules/auth";
export const Route = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Masuk — AnabulCare" }] }),
	component: Login,
});
