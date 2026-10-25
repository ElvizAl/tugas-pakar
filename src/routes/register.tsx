import { createFileRoute } from "@tanstack/react-router";
import { Register } from "#/modules/auth";
export const Route = createFileRoute("/register")({
	head: () => ({ meta: [{ title: "Daftar — AnabulCare" }] }),
	component: Register,
});
