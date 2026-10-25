import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "#/infrastructure/database/client";
import * as schema from "#/modules/auth/schema";

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: "pg", schema }),
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 8,
	},
	user: {
		additionalFields: {
			role: {
				type: "string",
				required: false,
				defaultValue: "USER",
				input: false,
			},
		},
	},
	databaseHooks: {
		user: {
			create: {
				before: async (user) => {
					// Better Auth admin plugin sends lowercase "user"/"admin",
					// but Prisma enum Role expects "USER"/"ADMIN"
					const raw = (user as Record<string, unknown>).role;
					const normalized =
						typeof raw === "string" ? raw.toUpperCase() : "USER";

					return {
						data: {
							...user,
							role: normalized as "USER" | "ADMIN",
						},
					};
				},
			},
		},
	},
	session: {
		expiresIn: 60 * 60 * 24 * 7, // 7 days
		updateAge: 60 * 60 * 24, // 1 day (update session once per day)
		cookieCache: {
			enabled: true,
			maxAge: 60 * 5, // 5 minutes cache in cookie
		},
	},

	plugins: [admin(), tanstackStartCookies()],
});
