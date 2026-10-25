import { Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	ArrowRight,
	Eye,
	EyeOff,
	Heart,
	PawPrint,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { authClient } from "#/lib/auth-client";

const inputClass =
	"h-12 rounded-lg border-[#dce1d4] bg-white px-4 text-sm focus-visible:border-[#718567] focus-visible:ring-[#718567]/30 md:text-sm";
const actionClass =
	"h-12 w-full gap-2 rounded-lg bg-[#284f3d] text-sm text-white hover:bg-[#3c664e]";
export function AuthPage({ mode }: { mode: "login" | "register" }) {
	const register = mode === "register";
	const [showPassword, setShowPassword] = useState(false);
	const [busy, setBusy] = useState(false);
	const {
		data: session,
		isPending,
		error: sessionError,
		refetch,
	} = authClient.useSession();

	const [error, setError] = useState("");
	async function submit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError("");
		if (busy) return;
		const form = new FormData(event.currentTarget);
		if (register && !String(form.get("name") ?? "").trim()) {
			setError("Isi nama kamu terlebih dahulu.");
			return;
		}
		if (register && form.get("password") !== form.get("confirmPassword")) {
			setError("Konfirmasi kata sandi belum sama.");
			return;
		}
		setBusy(true);
		try {
			const email = String(form.get("email") ?? "").trim();
			const password = String(form.get("password") ?? "");
			const result = register
				? await authClient.signUp.email({
						name: String(form.get("name") ?? "").trim(),
						email,
						password,
					})
				: await authClient.signIn.email({ email, password });
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

	async function signOut() {
		setBusy(true);
		setError("");
		try {
			const result = await authClient.signOut();
			if (result.error) setError("Gagal keluar. Coba lagi.");
			else await refetch();
		} catch {
			setError("Tidak dapat terhubung. Coba lagi.");
		} finally {
			setBusy(false);
		}
	}
	return (
		<main className="min-h-screen bg-[#fcfbf7] font-sans text-[#253e32] lg:grid lg:grid-cols-[1fr_1fr]">
			<aside className="relative hidden min-h-screen overflow-hidden bg-[#e9ecdf] p-14 lg:flex lg:flex-col">
				<Link
					to="/"
					className="flex items-center gap-2 text-2xl font-bold tracking-tight"
				>
					<PawPrint />
					AnabulCare
				</Link>
				<div className="relative z-10 mt-16 max-w-md">
					<span className="text-[10px] font-semibold tracking-[2px] text-[#718567]">
						UNTUK SETIAP MEONG YANG BERARTI
					</span>
					<h2 className="mt-5 font-heading text-5xl leading-[1.1] tracking-tight">
						Teman kecilmu.
						<br />
						<em className="font-serif font-normal text-[#718567]">
							Cerita besarmu.
						</em>
					</h2>
					<p className="mt-5 max-w-sm text-sm leading-7 text-[#737a70]">
						Satu tempat untuk memulai perjalanan memahami kucing kesayanganmu.
					</p>
				</div>
				<div className="relative mt-10 max-w-lg flex-1 overflow-hidden rounded-t-[160px] rounded-b-2xl min-h-64">
					<img
						src="/images/anabul-cat.jpg"
						alt="Kucing oranye yang penasaran"
						className="absolute inset-0 size-full object-cover object-[50%_40%]"
					/>
					<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-7 pt-16 text-sm text-white">
						<Heart className="mb-2 size-5" />
						Karena sayang dimulai dari memahami.
					</div>
				</div>
			</aside>
			<section className="flex min-h-screen flex-col px-6 py-8 sm:px-12 lg:px-16">
				<Link
					to="/"
					className="flex w-fit items-center gap-2 text-xs text-[#737a70] hover:text-[#284f3d]"
				>
					<ArrowLeft className="size-4" />
					Kembali ke beranda
				</Link>
				<div className="mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center py-12">
					<div className="mb-7 flex size-12 items-center justify-center rounded-2xl bg-[#edf0e7] text-[#718567]">
						<PawPrint className="size-6" />
					</div>
					{isPending ? (
						<output className="py-8 text-sm">Memeriksa sesi...</output>
					) : session ? (
						<div>
							<h1 className="font-heading text-3xl font-semibold">
								Halo, {session.user.name}!
							</h1>
							<p className="mt-4 text-sm leading-7 text-[#737a70]">
								Kamu sudah masuk sebagai {session.user.email}.
							</p>
							<p className="mt-3 text-xs leading-6 text-[#737a70]">
								Chatbot masih dalam pengembangan. Lihat contoh percakapan di
								beranda.
							</p>
							<Button
								nativeButton={false}
								className={`${actionClass} mt-6`}
								render={(props) => (
									<Link {...props} to="/">
										{props.children}
									</Link>
								)}
							>
								Ke beranda
							</Button>
							<Button
								variant="ghost"
								className="mt-3 w-full rounded-lg"
								disabled={busy}
								onClick={signOut}
							>
								{busy ? "Memproses..." : "Keluar dari akun"}
							</Button>
						</div>
					) : (
						<>
							<h1 className="font-heading text-[34px] font-semibold tracking-tight">
								{register
									? "Jadi bagian dari ceritanya."
									: "Senang kamu kembali."}
							</h1>
							<p className="mt-3 mb-8 text-sm leading-7 text-[#737a70]">
								{register
									? "Buat akun untuk memulai perjalanan bersama AnabulCare."
									: "Masuk ke akunmu. Ada si kecil yang menunggu untuk dipahami."}
							</p>
							<form onSubmit={submit} className="space-y-5">
								<fieldset disabled={busy} className="space-y-5">
									{register && (
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
									)}
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
												autoComplete={
													register ? "new-password" : "current-password"
												}
												placeholder={
													register
														? "Minimal 8 karakter"
														: "Masukkan kata sandi"
												}
												required
												minLength={register ? 8 : undefined}
												maxLength={128}
												aria-describedby={
													register ? "password-help" : undefined
												}
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
										{register && (
											<p
												id="password-help"
												className="text-[11px] text-[#737a70]"
											>
												Gunakan 8–128 karakter untuk kata sandimu.
											</p>
										)}
									</div>
									{register && (
										<div className="space-y-2">
											<Label htmlFor="confirmPassword">
												Konfirmasi kata sandi
											</Label>
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
									)}
									<Button type="submit" className={actionClass}>
										{busy ? "Memproses..." : register ? "Buat akun" : "Masuk"}
										<ArrowRight className="size-4" />
									</Button>
								</fieldset>
							</form>
							<p className="mt-6 text-center text-xs text-[#737a70]">
								{register ? "Sudah punya akun?" : "Belum punya akun?"}{" "}
								<Link
									to={register ? "/login" : "/register"}
									className="font-semibold text-[#284f3d] underline-offset-4 hover:underline"
								>
									{register ? "Masuk di sini" : "Daftar sekarang"}
								</Link>
							</p>
						</>
					)}
					{(error || sessionError) && (
						<p
							role="alert"
							className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs leading-6 text-red-700"
						>
							{error || "Sesi belum dapat diperiksa. Coba muat ulang halaman."}
						</p>
					)}
				</div>
				<p className="text-center text-[10px] text-[#909485]">
					Dibuat dengan peduli, untuk kamu dan kucingmu.
				</p>
			</section>
		</main>
	);
}
