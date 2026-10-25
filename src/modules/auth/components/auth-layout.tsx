import { Link } from "@tanstack/react-router";
import { ArrowLeft, Heart, PawPrint } from "lucide-react";
import { type ReactNode, useState } from "react";
import { Button } from "#/shared/components/ui/button";
import { authClient } from "#/modules/auth/client";

const actionClass =
	"h-12 w-full gap-2 rounded-lg bg-[#284f3d] text-sm text-white hover:bg-[#3c664e]";
export function AuthLayout({ children }: { children: ReactNode }) {
	const [busy, setBusy] = useState(false);
	const {
		data: session,
		isPending,
		error: sessionError,
		refetch,
	} = authClient.useSession();

	const [error, setError] = useState("");

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
						children
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
