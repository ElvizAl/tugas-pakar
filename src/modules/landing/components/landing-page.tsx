import { Link } from "@tanstack/react-router";
import {
	ArrowDown,
	ArrowRight,
	BookOpen,
	Cat,
	Check,
	Heart,
	Menu,
	MessageCircle,
	PawPrint,
	ShieldCheck,
	Sparkles,
} from "lucide-react";
import { useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "#/shared/components/ui/accordion";
import { Button } from "#/shared/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "#/shared/components/ui/sheet";
import { authClient } from "#/modules/auth/client";

const topics = ["Nafsu makan", "Perubahan perilaku", "Perawatan harian"];
const replies = [
	"Ceritakan perubahan nafsu makan si kecil. Sejak kapan kamu menyadarinya, dan berapa usianya?",
	"Perubahan apa yang kamu lihat? Ceritakan kebiasaan sebelumnya dan sejak kapan perilakunya berubah.",
	"Kenalan dulu, yuk. Berapa usia kucingmu, dan bagian perawatan apa yang ingin kamu pahami?",
];
export function LandingPage() {
	const { data: session } = authClient.useSession();
	const [menu, setMenu] = useState(false);
	const [topic, setTopic] = useState(0);
	return (
		<div
			className="bg-[#fcfbf7] font-sans text-[#253e32] [&_em]:font-serif [&_em]:font-normal [&_em]:text-[#718567] [&_h2]:my-4 [&_h2]:font-heading [&_h2]:text-[34px] [&_h2]:leading-[1.2] [&_h2]:font-medium [&_h2]:tracking-[-1.3px] md:[&_h2]:text-[39px] [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-[#a6b784] motion-reduce:[&_*]:transition-none"
			id="beranda"
		>
			<header className="relative flex h-[78px] items-center justify-between gap-6 md:h-[100px] mx-auto w-[calc(100%-40px)] max-w-[1180px] md:w-[calc(100%-48px)] lg:w-[calc(100%-80px)]">
				<a
					className="flex items-center text-2xl font-bold tracking-[-1px] [&>span:first-child]:mr-2 [&>span:first-child]:flex [&>svg]:mr-2 [&>i]:mb-2 [&>i]:ml-1 [&>i]:size-[5px] [&>i]:self-end [&>i]:rounded-full [&>i]:bg-[#d6a866]"
					href="#beranda"
					aria-label="AnabulCare beranda"
				>
					<span>
						<PawPrint size={22} />
					</span>
					Anabul<span className="text-[#69856b]">Care</span>
					<i />
				</a>
				<nav
					className="hidden gap-7 text-[13px] md:flex [&_a:hover]:text-[#8c704b]"
					aria-label="Navigasi utama"
				>
					<a href="#beranda">Beranda</a>
					<a href="#tentang">Tentang kami</a>
					<a href="#cara-kerja">Cara kerja</a>
					<a href="#faq">FAQ</a>
					<Link to="/login">{session ? "Akun saya" : "Masuk"}</Link>
				</nav>
				<Button
					nativeButton={false}
					render={(props) => (
						<a {...props} href="/register">
							{props.children}
						</a>
					)}
					className="h-auto gap-[18px] rounded-lg bg-[#284f3d] px-[23px] py-[17px] text-[13px] font-medium text-white hover:-translate-y-0.5 hover:bg-[#3c664e] hidden px-[17px] py-[13px] text-xs lg:inline-flex"
				>
					Daftar sekarang <ArrowRight size={16} />
				</Button>
				<Sheet open={menu} onOpenChange={setMenu}>
					<SheetTrigger
						render={
							<Button
								variant="ghost"
								size="icon"
								className="md:hidden"
								aria-label="Buka menu"
							/>
						}
					>
						<Menu />
					</SheetTrigger>
					<SheetContent className="bg-[#fcfbf7] text-[#253e32]">
						<SheetHeader>
							<SheetTitle>AnabulCare</SheetTitle>
							<SheetDescription>Teman memahami kucingmu.</SheetDescription>
						</SheetHeader>
						<nav
							aria-label="Navigasi mobile"
							className="flex flex-col gap-3 px-4"
						>
							{[
								{ href: "#beranda", label: "Beranda" },
								{ href: "#tentang", label: "Tentang kami" },
								{ href: "#cara-kerja", label: "Cara kerja" },
								{ href: "#faq", label: "FAQ" },
								{ href: "/login", label: session ? "Akun saya" : "Masuk" },
								{ href: "/register", label: "Daftar sekarang" },
							].map((link) => (
								<SheetClose
									key={link.href}
									nativeButton={false}
									render={
										<a
											href={link.href}
											className="rounded-lg px-3 py-3 text-sm hover:bg-[#edf0e7]"
										>
											{link.label}
										</a>
									}
								>
									{link.label}
								</SheetClose>
							))}
						</nav>
					</SheetContent>
				</Sheet>
			</header>
			<main>
				<section className="grid items-center gap-[38px] pt-[30px] pb-[45px] md:grid-cols-[1.08fr_1fr] md:gap-[35px] md:pt-[55px] md:pb-[83px] lg:gap-[62px] mx-auto w-[calc(100%-40px)] max-w-[1180px] md:w-[calc(100%-48px)] lg:w-[calc(100%-80px)]">
					<div className="[&>h1]:relative [&>h1]:my-[25px] [&>h1]:font-heading [&>h1]:text-[clamp(48px,8vw,61px)] [&>h1]:leading-[1.04] [&>h1]:font-medium [&>h1]:tracking-[-3px] md:[&>h1]:text-[clamp(52px,5.6vw,77px)] [&>p]:max-w-[425px] [&>p]:text-[13px] [&>p]:leading-[1.9] [&>p]:text-[#737a70] lg:[&>p]:text-sm">
						<div className="flex items-center gap-2 text-[9px] font-semibold tracking-[1.7px] text-[#6a7c65] md:text-[10px] [&>span]:size-[7px] [&>span]:rounded-full [&>span]:bg-[#88a078]">
							<span /> TEMAN CERITA PARA CAT PARENTS
						</div>
						<h1>
							Karena si kecil
							<br />
							nggak bisa
							<br />
							<em>cerita sendiri.</em>
							<Heart className="ml-4 inline-block size-[39px] -rotate-17 stroke-[1.2] text-[#bca47e]" />
						</h1>
						<p>
							Kenali kebutuhan kucingmu, satu percakapan pada satu waktu. Teman
							berbasis AI untuk membantumu lebih memahami anabul kesayangan.
						</p>
						<div className="mt-[30px] mb-[22px] flex flex-wrap items-center gap-4 lg:gap-[26px]">
							<Button
								nativeButton={false}
								render={(props) => (
									<a {...props} href="#demo">
										{props.children}
									</a>
								)}
								className="h-auto gap-[18px] rounded-lg bg-[#284f3d] px-[23px] py-[17px] text-[13px] font-medium text-white hover:-translate-y-0.5 hover:bg-[#3c664e]"
							>
								Coba contoh percakapan <ArrowRight size={18} />
							</Button>
							<a
								className="inline-flex items-center gap-2.5 text-xs font-semibold hover:text-[#8c704b]"
								href="#cara-kerja"
							>
								Cara kerjanya <ArrowDown size={16} />
							</a>
						</div>
						<div className="flex max-w-[410px] items-center gap-2 text-[10px] text-[#8b8d80] [&>svg]:shrink-0">
							<ShieldCheck size={17} />
							<span>
								Informasi awal untukmu. Perawatan terbaik bersama dokter hewan.
							</span>
						</div>
					</div>
					<div className="relative mx-3.5 pb-[25px] md:mx-0">
						<div className="relative h-[400px] overflow-hidden rounded-t-[150px] rounded-b-2xl bg-[#e7ddc8] md:h-[440px] lg:h-[490px] lg:rounded-t-[180px] [&>img]:size-full [&>img]:object-cover [&>img]:object-[50%_46%] after:absolute after:inset-x-0 after:top-[60%] after:bottom-0 after:bg-linear-to-b after:from-transparent after:to-[#302a2260]">
							<img
								src="/images/anabul-cat.jpg"
								alt="Kucing oranye dengan tatapan penasaran"
								fetchPriority="high"
							/>
							<span className="absolute bottom-[25px] left-7 z-10 flex items-center gap-2 text-[9px] tracking-[2px] text-white [&>span]:size-[5px] [&>span]:rounded-full [&>span]:bg-[#e8cfa5]">
								<span /> LITTLE PAWS, BIG LOVE
							</span>
						</div>
						<div className="absolute top-[18px] -right-3 flex size-24 rotate-12 flex-col items-center justify-center gap-[7px] rounded-full border border-[#d5d9cb] bg-[#eef0e5] text-center text-[10px] leading-[1.3] lg:-right-[25px] lg:size-28 [&>svg]:stroke-[1.4]">
							<PawPrint size={31} />
							<span>
								Made for
								<br />
								<b>cat people.</b>
							</span>
						</div>
						<div className="absolute bottom-0 -left-3 flex items-center gap-[13px] rounded-xl border border-[#eeece3] bg-[#fffefb] px-[18px] py-[15px] text-[11px] leading-[1.9] text-[#88867b] shadow-[0_12px_35px_#263c3110] md:-left-[35px] md:px-6 md:py-[19px] [&_strong]:font-semibold [&_strong]:text-[#3c4e3c]">
							<span className="rounded-full bg-[#f0f1e7] p-[13px] text-[#738565]">
								<Heart size={22} />
							</span>
							<div>
								Satu langkah kecil untukmu.
								<br />
								<strong>Rasa nyaman untuknya.</strong>
							</div>
						</div>
						<span
							className="absolute top-10 -left-[25px] text-[55px] text-[#b5a17c]"
							aria-hidden="true"
						>
							✳
						</span>
					</div>
				</section>
				<div className="border-y border-[#e8e9df] bg-[#f3f4ec] [&>div]:flex [&>div]:justify-between [&>div]:gap-5 [&>div]:py-[25px] md:[&>div]:items-center md:[&>div]:justify-center lg:[&>div]:gap-[55px] [&_span]:flex [&_span]:flex-1 [&_span]:flex-col [&_span]:items-center [&_span]:gap-2 [&_span]:text-center [&_span]:text-[9px] [&_span]:text-[#65725d] md:[&_span]:flex-none md:[&_span]:flex-row md:[&_span]:gap-3 md:[&_span]:text-xs [&_svg]:size-[19px] [&_svg]:stroke-[1.5] [&_i]:hidden md:[&_i]:block [&_i]:size-[5px] [&_i]:rounded-full [&_i]:bg-[#c5c9b8]">
					<div className="mx-auto w-[calc(100%-40px)] max-w-[1180px] md:w-[calc(100%-48px)] lg:w-[calc(100%-80px)]">
						<span>
							<Cat /> Khusus untuk kucing
						</span>
						<i />
						<span>
							<MessageCircle /> Bahasa yang mudah dimengerti
						</span>
						<i />
						<span>
							<Heart /> Berawal dari rasa peduli
						</span>
					</div>
				</div>
				<section
					className="grid gap-3 py-[55px] md:grid-cols-2 md:gap-[45px] md:py-[88px] lg:gap-[95px] [&_p]:mb-4 [&_p]:text-[13px] [&_p]:leading-[1.9] [&_p]:text-[#737a70] [&_a]:mt-2.5 mx-auto w-[calc(100%-40px)] max-w-[1180px] md:w-[calc(100%-48px)] lg:w-[calc(100%-80px)]"
					id="tentang"
				>
					<div>
						<span className="text-[10px] font-semibold tracking-[1.7px] text-[#6a7c65]">
							SEDIKIT LEBIH PAHAM, SEDIKIT LEBIH TENANG
						</span>
						<h2>
							Sayang itu juga
							<br />
							tentang <em>memahami.</em>
						</h2>
					</div>
					<div>
						<p>
							Kucing punya caranya sendiri untuk menunjukkan apa yang ia
							rasakan. Kadang lewat makanan yang tersisa, kebiasaan baru, atau
							waktu bermain yang lebih singkat.
						</p>
						<p>
							AnabulCare dirancang untuk menemanimu menyusun cerita itu. Tempat
							bertanya yang ramah, sebelum menentukan langkah berikutnya.
						</p>
						<a
							href="#demo"
							className="inline-flex items-center gap-2.5 text-xs font-semibold hover:text-[#8c704b]"
						>
							Lihat seperti apa percakapannya <ArrowRight size={17} />
						</a>
					</div>
				</section>
				<section
					className="pb-[50px] md:pb-[90px] mx-auto w-[calc(100%-40px)] max-w-[1180px] md:w-[calc(100%-48px)] lg:w-[calc(100%-80px)]"
					id="cara-kerja"
				>
					<div className="flex items-center justify-between [&_h2]:text-[29px] md:[&_h2]:text-[32px]">
						<div>
							<span className="text-[10px] font-semibold tracking-[1.7px] text-[#6a7c65]">
								NGGAK PERLU BINGUNG MULAI DARI MANA
							</span>
							<h2>Cukup cerita. Kita mulai dari situ.</h2>
						</div>
						<span className="hidden -rotate-7 font-serif text-[19px] text-[#8f967d] italic md:inline">
							Sesimpel ngobrol ♡
						</span>
					</div>
					<div className="mt-3 grid gap-[25px] md:mt-[30px] md:grid-cols-3 md:gap-[30px] [&>article]:border-t [&>article]:border-[#d8decf] [&>article]:pt-4 md:[&>article]:pt-[25px] md:[&>article]:pr-3 [&_h3]:mt-3 [&_h3]:mb-3 [&_h3]:text-[17px] [&_h3]:font-medium md:[&_h3]:mt-[21px] [&_p]:text-xs [&_p]:leading-[1.9] [&_p]:text-[#737a70] md:[&_p]:max-w-[310px]">
						{[
							{
								icon: MessageCircle,
								title: "Ceritakan tentang si kecil",
								body: "Mulai dari hal yang kamu perhatikan. Nggak perlu istilah medis, pakai bahasamu sendiri.",
							},
							{
								icon: Cat,
								title: "Kenali ceritanya lebih dekat",
								body: "Pertanyaan lanjutan membantu melengkapi konteks usia, kebiasaan, dan perubahan yang terjadi.",
							},
							{
								icon: BookOpen,
								title: "Pahami langkah berikutnya",
								body: "Tujuannya sederhana: membantu kamu menyiapkan informasi dan pertanyaan untuk perawatan si kecil.",
							},
						].map((step, i) => (
							<article key={step.title}>
								<div className="flex items-center justify-between text-[#789170] [&>span]:font-serif [&>span]:text-[31px] [&>span]:text-[#c6cabb]">
									<step.icon size={25} />
									<span>0{i + 1}</span>
								</div>
								<h3>{step.title}</h3>
								<p>{step.body}</p>
							</article>
						))}
					</div>
				</section>
				<section
					className="scroll-mt-5 bg-[#edf0e7] py-[45px] md:py-[70px]"
					id="demo"
				>
					<div className="grid items-center gap-[30px] md:grid-cols-2 md:gap-10 lg:gap-[110px] [&_p]:mb-4 [&_p]:max-w-[380px] [&_p]:text-[13px] [&_p]:leading-[1.9] [&_p]:text-[#737a70] mx-auto w-[calc(100%-40px)] max-w-[1180px] md:w-[calc(100%-48px)] lg:w-[calc(100%-80px)]">
						<div>
							<span className="text-[10px] font-semibold tracking-[1.7px] text-[#6a7c65]">
								INTIP TEMAN NGOBROL BARUMU
							</span>
							<h2>
								Pertanyaan kecilmu,
								<br />
								<em>berarti buat dia.</em>
							</h2>
							<p>
								Dari kebiasaan sehari-hari sampai perubahan yang bikin
								kepikiran. Pilih topik untuk melihat contoh awal percakapan.
							</p>
							<div className="my-6 flex flex-wrap gap-[9px]">
								{topics.map((name, i) => (
									<Button
										type="button"
										key={name}
										aria-pressed={topic === i}
										variant="outline"
										className="h-auto gap-4 rounded-md border-[#cbd3c3] bg-transparent px-3 py-2.5 text-[11px] hover:bg-[#dce4d3] aria-pressed:border-[#8eaa7e] aria-pressed:bg-[#dce4d3]"
										onClick={() => setTopic(i)}
									>
										{name}
										{topic === i ? (
											<Check size={15} />
										) : (
											<ArrowRight size={15} />
										)}
									</Button>
								))}
							</div>
							<div className="flex items-center gap-[7px] text-[10px] text-[#7b826e]">
								<Sparkles size={16} /> Ini demo interaktif. Chatbot AI sedang
								disiapkan.
							</div>
						</div>
						<div className="overflow-hidden rounded-2xl border border-[#dce1d4] bg-[#fffefb] shadow-[0_14px_45px_#293b2d0a]">
							<div className="flex items-center gap-[11px] border-b border-[#eeeee6] p-5 [&_strong]:text-[13px] [&_small]:mt-1 [&_small]:block [&_small]:text-[10px] [&_small]:text-[#8c9284]">
								<span className="flex rounded-full bg-[#e8eddf] p-2.5 text-[#6e835f]">
									<PawPrint />
								</span>
								<div>
									<strong>AnabulCare</strong>
									<small>Teman memahami si kecil</small>
								</div>
								<span className="ml-auto rounded border border-[#d6dccd] px-[7px] py-[5px] text-[8px] tracking-[1px] text-[#76826b]">
									DEMO
								</span>
							</div>
							<div
								className="min-h-[330px] p-[21px] md:min-h-[320px]"
								aria-live="polite"
							>
								<span className="mb-[22px] block text-center text-[8px] tracking-[1px] text-[#a0a393]">
									CONTOH PERCAKAPAN
								</span>
								<div className="mb-4 max-w-[87%] rounded-xl rounded-tl-none bg-[#f0f2ea] px-4 py-[13px] text-[11px] leading-[1.8]">
									Halo, cat parent! 🐾<br />
									Ada yang ingin kamu ceritakan tentang si kecil hari ini?
								</div>
								<div className="mb-4 max-w-[87%] rounded-xl rounded-tr-none bg-[#34573f] px-4 py-[13px] text-[11px] leading-[1.8] ml-auto text-white">
									Aku mau tanya soal {topics[topic].toLowerCase()} kucingku.
								</div>
								<div className="mb-4 max-w-[87%] rounded-xl rounded-tl-none bg-[#f0f2ea] px-4 py-[13px] text-[11px] leading-[1.8]">
									{replies[topic]}
								</div>
								<div className="mt-5 flex items-center justify-center gap-1.5 text-[8px] text-[#939888]">
									<ShieldCheck size={14} /> Membantu memahami, bukan menetapkan
									diagnosis.
								</div>
							</div>
							<div className="mx-[19px] mb-[19px] flex items-center justify-between rounded-[7px] border border-[#e8eadd] bg-[#f8f8f3] p-[13px] text-[9px] text-[#979b8e]">
								Percakapan contoh · belum terhubung ke AI <Heart size={16} />
							</div>
						</div>
					</div>
				</section>
				<section
					className="grid gap-[5px] py-[50px] md:grid-cols-[1fr_1.3fr] md:gap-[45px] md:py-[90px] lg:gap-[90px] mx-auto w-[calc(100%-40px)] max-w-[1180px] md:w-[calc(100%-48px)] lg:w-[calc(100%-80px)]"
					id="faq"
				>
					<div>
						<span className="text-[10px] font-semibold tracking-[1.7px] text-[#6a7c65]">
							BIAR MAKIN KENAL
						</span>
						<h2>
							Mungkin ini
							<br />
							yang kamu <em>pikirkan.</em>
						</h2>
						<PawPrint
							className="mt-5 hidden -rotate-15 stroke-1 text-[#c4cdb8] md:block"
							size={55}
						/>
					</div>
					<Accordion multiple className="w-full">
						{[
							{
								q: "Apa itu AnabulCare?",
								a: "AnabulCare adalah aplikasi yang sedang dikembangkan untuk membantu pemilik kucing memahami kebutuhan anabul melalui percakapan dengan AI. Halaman ini memperkenalkan konsep dan contoh percakapannya.",
							},
							{
								q: "Apakah AnabulCare menggantikan dokter hewan?",
								a: "Tidak. AnabulCare ditujukan sebagai pendamping informasi awal. Diagnosis dan penanganan tetap memerlukan pemeriksaan dokter hewan.",
							},
							{
								q: "Apakah chatbot sudah bisa digunakan?",
								a: "Belum. Kamu bisa mencoba pilihan topik pada demo di atas. Fitur percakapan AI, profil kucing, dan riwayat konsultasi akan dikembangkan pada tahap berikutnya.",
							},
							{
								q: "Apakah bisa untuk hewan selain kucing?",
								a: "Untuk tahap awal, AnabulCare fokus pada kucing agar pengalaman dan informasi yang dikembangkan lebih terarah.",
							},
						].map((item) => (
							<AccordionItem
								key={item.q}
								value={item.q}
								className="border-b border-[#e0e4d8]"
							>
								<AccordionTrigger className="items-center gap-5 py-[22px] text-[13px] font-medium">
									{item.q}
								</AccordionTrigger>
								<AccordionContent className="pb-5 text-xs leading-[1.9] text-[#7b8274]">
									{item.a}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</section>
				<section className="flex flex-col items-start justify-between gap-[25px] rounded-[13px] bg-[#e9ecdf] p-[27px] md:flex-row md:items-center md:px-[45px] md:py-[38px] [&_span]:text-[9px] [&_span]:tracking-[1.4px] [&_span]:text-[#7b876b] [&_h2]:mt-3 [&_h2]:mb-0 [&_h2]:text-[27px] md:[&_h2]:text-[30px] mx-auto w-[calc(100%-40px)] max-w-[1180px] md:w-[calc(100%-48px)] lg:w-[calc(100%-80px)]">
					<div>
						<span>UNTUK SETIAP MEONG YANG BERARTI.</span>
						<h2>
							Lebih dekat dengan si kecil,
							<br />
							dimulai dari rasa ingin tahu.
						</h2>
					</div>
					<Button
						nativeButton={false}
						render={(props) => (
							<a {...props} href="#demo">
								{props.children}
							</a>
						)}
						className="h-auto gap-[18px] rounded-lg bg-[#284f3d] px-[23px] py-[17px] text-[13px] font-medium text-white hover:-translate-y-0.5 hover:bg-[#3c664e]"
					>
						Kenalan dengan AnabulCare <ArrowRight size={18} />
					</Button>
				</section>
			</main>
			<footer className="flex flex-wrap items-center justify-between gap-3.5 py-[30px] md:gap-5 md:py-9 [&>a]:text-xl [&>p]:order-3 [&>p]:w-full [&>p]:text-[10px] [&>p]:text-[#909485] md:[&>p]:order-none md:[&>p]:w-auto [&>span]:text-[9px] [&>span]:text-[#909485] md:[&>span]:text-[10px] mx-auto w-[calc(100%-40px)] max-w-[1180px] md:w-[calc(100%-48px)] lg:w-[calc(100%-80px)]">
				<a
					className="flex items-center text-2xl font-bold tracking-[-1px] [&>span:first-child]:mr-2 [&>span:first-child]:flex [&>svg]:mr-2 [&>i]:mb-2 [&>i]:ml-1 [&>i]:size-[5px] [&>i]:self-end [&>i]:rounded-full [&>i]:bg-[#d6a866]"
					href="#beranda"
				>
					<PawPrint size={23} />
					Anabul<span className="text-[#69856b]">Care</span>
				</a>
				<p>Dibuat dengan peduli, untuk kamu dan kucingmu.</p>
				<span>© {new Date().getFullYear()} AnabulCare</span>
			</footer>
		</div>
	);
}
