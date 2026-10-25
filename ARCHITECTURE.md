# Struktur aplikasi

Proyek memakai modul berdasarkan fitur. Tambahkan kode fitur ke modul pemiliknya,
bukan ke folder teknis global.

```text
src/
  modules/
    auth/
      components/
        auth-layout.tsx
        login.tsx
        register.tsx
      client.ts          # Better Auth client, boleh digunakan browser
      server.ts          # Better Auth server, hanya untuk server
      schema.ts          # Tabel dan relasi autentikasi
      index.ts           # Export halaman login/register
    landing/
      components/landing-page.tsx
      index.ts
  shared/
    components/ui/       # Komponen shadcn yang bisa dipakai lintas fitur
    hooks/               # Hooks umum untuk komponen UI
    lib/                 # Utilitas umum, tanpa ketergantungan fitur
  infrastructure/
    database/client.ts   # Koneksi Neon/Drizzle
  routes/                # Adapter routing TanStack, metadata, handler HTTP
  router.tsx
  routeTree.gen.ts        # Dihasilkan TanStack; jangan diedit manual
  styles.css
```

## Arah dependensi

- Route memakai interface modul (`#/modules/auth`, `#/modules/landing`).
- Modul memakai `shared`; kode server modul boleh memakai `infrastructure`.
- `shared` tidak mengimpor `modules`, `routes`, atau database.
- Komunikasi lintas modul memakai entry point yang jelas. Landing membaca sesi
  melalui `#/modules/auth/client`, bukan file internal form auth.
- `index.ts` modul hanya mengekspor UI. Server diimpor secara eksplisit melalui
  `#/modules/auth/server`; jangan mengekspornya dari barrel UI.
- Import tipe server pada auth client harus tetap `import type`.

## Menambah fitur

Buat `src/modules/<fitur>/` dan tambahkan folder hanya ketika diperlukan.
Taruh tampilan di `components/`, schema fitur di `schema.ts`, dan integrasi
server di file server modul. Route cukup menghubungkan modul ke URL.
Jangan menambahkan lapisan service/repository kosong tanpa kebutuhan nyata.

`components.json` sudah mengarahkan generator shadcn ke `src/shared`.
`drizzle.config.ts` membaca `src/modules/**/schema.ts`. Perpindahan ini tidak
mengubah tabel atau memerlukan migrasi database baru; migrasi SQL yang ada
 tetap berada di `drizzle/`.

## Pemeriksaan

- `pnpm check` untuk Biome.
- `pnpm exec tsc --noEmit` untuk TypeScript.
- Jika wrapper pnpm terhambat pemeriksaan dependency lokal, gunakan
  `node_modules/.bin/biome.cmd check` dan `node_modules/.bin/tsc.cmd --noEmit`.
