import { Link } from "@tanstack/react-router";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "#/shared/components/ui/button";
import { Input } from "#/shared/components/ui/input";
import { Label } from "#/shared/components/ui/label";
import { authClient } from "#/modules/auth/client";
import { AuthLayout } from "./auth-layout";
const inputClass =
	"h-12 rounded-lg border-[#dce1d4] bg-white px-4 text-sm focus-visible:border-[#718567] focus-visible:ring-[#718567]/30 md:text-sm";
const actionClass =
	"h-12 w-full gap-2 rounded-lg bg-[#284f3d] text-sm text-white hover:bg-[#3c664e]";
export function Register() {
	return (
		<AuthLayout>
			<RegisterForm />
		</AuthLayout>
	);
}
function RegisterForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	const { refetch } = authClient.useSession();
	async function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError("");
		if (busy) return;
		const form = new FormData(event.currentTarget);
		if (!String(form.get("name") ?? "").trim()) {
			setError("Isi nama kamu terlebih dahulu.");
			return;
		}
		if (form.get("password") !== form.get("confirmPassword")) {
			setError("Konfirmasi kata sandi belum sama.");
			return;
		}
		setBusy(true);
		try {
			const email = String(form.get("email") ?? "").trim();
			const password = String(form.get("password") ?? "");
			const result = await authClient.signUp.email({
				name: String(form.get("name") ?? "").trim(),
				email,
				password,
			});
			if (result.error) {
				const messages: Record<string, string> = {
					INVALID_EMAIL_OR_PASSWORD: "Email atau kata sandi tidak sesuai.",
					USER_ALREADY_EXISTS: "Email sudah terdaftar. Silakan masuk.",
					USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL:
						"Email sudah terdaftar. Silakan masuk.",
					TOO_MANY_REQUESTS: "Terlalu banyak percobaan. Coba lagi sebentar.",
				};
				setError(
					messages[result.error.code ?? ""] ??
						"Permintaan belum berhasil. Periksa data atau coba lagi sebentar.",
				);
				return;
			}
			await refetch();
		} catch {
			setError("Tidak dapat terhubung. Periksa koneksi dan coba lagi.");
		} finally {
			setBusy(false);
		}
	}
	return (
		<>
			<h1 className="font-heading text-[34px] font-semibold tracking-tight">
				Jadi bagian dari ceritanya.
			</h1>
			<p className="mt-3 mb-8 text-sm leading-7 text-[#737a70]">
				Buat akun untuk memulai perjalanan bersama AnabulCare.
			</p>
			<form onSubmit={submit} className="space-y-5">
				<fieldset disabled={busy} className="space-y-5">
					{
						<div className="space-y-2">
							<Label htmlFor="name">Nama kamu</Label>
							<Input
								id="name"
								name="name"
								autoComplete="name"
								placeholder="Nama panggilanmu"
								required
								maxLength={100}
								className={inputClass}
							/>
						</div>
					}
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							placeholder="kamu@email.com"
							required
							maxLength={254}
							className={inputClass}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Kata sandi</Label>
						<div className="relative">
							<Input
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								autoComplete="new-password"
								placeholder="Minimal 8 karakter"
								required
								minLength={8}
								maxLength={128}
								aria-describedby="password-help"
								className={`${inputClass} pr-12`}
							/>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="absolute top-2 right-2 rounded-md text-[#737a70]"
								aria-label={
									showPassword
										? "Sembunyikan kata sandi"
										: "Tampilkan kata sandi"
								}
								aria-pressed={showPassword}
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <EyeOff /> : <Eye />}
							</Button>
						</div>
						{
							<p id="password-help" className="text-[11px] text-[#737a70]">
								Gunakan 8–128 karakter untuk kata sandimu.
							</p>
						}
					</div>
					{
						<div className="space-y-2">
							<Label htmlFor="confirmPassword">Konfirmasi kata sandi</Label>
							<Input
								id="confirmPassword"
								name="confirmPassword"
								type={showPassword ? "text" : "password"}
								autoComplete="new-password"
								placeholder="Ulangi kata sandi"
								required
								minLength={8}
								maxLength={128}
								className={inputClass}
							/>
						</div>
					}
					<Button type="submit" className={actionClass}>
						{busy ? "Memproses..." : "Buat akun"}
						<ArrowRight className="size-4" />
					</Button>
				</fieldset>
			</form>
			<p className="mt-6 text-center text-xs text-[#737a70]">
				Sudah punya akun?{" "}
				<Link
					to="/login"
					className="font-semibold text-[#284f3d] underline-offset-4 hover:underline"
				>
					Masuk di sini
				</Link>
			</p>
			{error && (
				<p
					role="alert"
					className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs leading-6 text-red-700"
				>
					{error}
				</p>
			)}
		</>
	);
}
