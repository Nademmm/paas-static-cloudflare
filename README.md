# PaaS Static Cloudflare Deployment — Minggu 4

Proyek ini adalah implementasi praktikum **Minggu 4 — Deploy Aplikasi Statis ke Cloudflare Workers Static Assets**. Proyek ini mendemonstrasikan alur kerja Continuous Deployment modern: dari penulisan kode di lokal, version control Git, integrasi repository GitHub, hingga deployment otomatis ke infrastruktur edge Cloudflare Workers.

---

## 📁 Struktur Direktori Project

```text
paas-static-cloudflare/
├── public/
│   ├── index.html       # Halaman utama (Beranda) & pengujian JS
│   ├── about.html       # Halaman tantangan (Tentang Project)
│   ├── 404.html         # Halaman penanganan error 404 custom
│   ├── style.css        # Styling CSS responsif & standar WCAG
│   └── script.js        # Logika interaktif JavaScript
├── wrangler.jsonc       # Konfigurasi Cloudflare Workers Static Assets
└── README.md            # Panduan lengkap, instruksi & jawaban refleksi
```

---

## ⚙️ Konfigurasi Wrangler (`wrangler.jsonc`)

```jsonc
{
  "name": "paas-static-praktikum",
  "compatibility_date": "2026-09-29",
  "assets": {
    "directory": "./public"
  }
}
```

---

## 🚀 Langkah-Langkah Deployment (Git ke Cloudflare)

### 1. Inisialisasi Git & Push ke GitHub

Buka terminal pada direktori proyek (`paas-static-cloudflare`), lalu jalankan perintah berikut:

```bash
# Inisialisasi repositori lokal
git init

# Tambahkan semua file proyek
git add .

# Lakukan commit awal
git commit -m "feat: prepare static site for Cloudflare Workers"

# Ubah nama branch utama menjadi main
git branch -M main

# Hubungkan dengan repositori GitHub Anda (ganti URL di bawah)
git remote add origin https://github.com/USERNAME_ANDA/paas-static-cloudflare.git

# Push kode ke GitHub
git push -u origin main
```

### 2. Import Repositori di Cloudflare Dashboard

1. Login ke [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigasi ke menu **Workers & Pages**.
3. Klik **Create application** → pilih tab **Pages / Workers** → pilih **Import a repository**.
4. Hubungkan akun GitHub Anda jika belum terhubung, lalu pilih repositori `paas-static-cloudflare`.
5. Pastikan Production Branch diset ke `main`.
6. Karena ini adalah situs statis murni (HTML/CSS/JS), **Build Command** tidak wajib diisi. Namun jika kolom Deploy Command wajib, gunakan: `npx wrangler deploy`.
7. Klik **Save and Deploy**.
8. Tunggu hingga proses build & deploy selesai, lalu akses URL publik yang dihasilkan (format: `https://paas-static-praktikum.<subdomain>.workers.dev`).

---

## 👁️ Pertanyaan Observasi (Bagian 6) & Jawaban

1. **Commit mana yang memicu build baru?**
   > *Jawaban:* Commit terbaru yang di-push ke branch produksi (`main`). Cloudflare Workers Builds secara otomatis memantau branch ini via webhook GitHub.
2. **Apakah push ke main langsung memicu deployment?**
   > *Jawaban:* Ya. Setiap kali ada perintah `git push origin main`, GitHub mengirimkan event trigger ke Cloudflare untuk memulai proses auto-deploy.
3. **Berapa lama sampai perubahan terlihat pada URL publik?**
   > *Jawaban:* Biasanya hanya memakan waktu beberapa detik (sekitar 10–30 detik) karena aplikasi statis tidak memerlukan proses pengompilasian yang berat.
4. **Apa yang terjadi jika perubahan hanya disimpan lokal tetapi belum di-push?**
   > *Jawaban:* Perubahan hanya akan berada di komputer lokal dan tidak akan memicu deployment di Cloudflare. URL publik akan tetap menampilkan versi commit terakhir yang ada di GitHub.
5. **Informasi apa saja yang dapat dibaca dari build log?**
   > *Jawaban:* Log menampilkan status cloning repository, commit hash yang sedang diproses, tanggal kompatibilitas Wrangler, proses validasi direktori asset `./public`, serta URL deployment yang sukses dibuat.

---

## 💭 Jawaban Pertanyaan Refleksi

1. **Apa perbedaan membuka `index.html` secara lokal dengan website pada `workers.dev`?**
   > Membuka secara lokal menggunakan protokol file (`file:///`) atau local dev server pada satu perangkat lokal. Sedangkan pada `workers.dev`, file disajikan melalui jaringan global edge server Cloudflare menggunakan HTTPS, sehingga dapat diakses oleh siapa saja di seluruh dunia dengan latensi rendah.

2. **Apa peran GitHub pada proses deployment?**
   > GitHub berfungsi sebagai **Source Code Management (SCM)** dan pemicu **CI/CD pipeline**. GitHub menyimpan riwayat versi kode dan mengirimkan notifikasi (webhook) ke Cloudflare saat ada kode baru yang siap dideploy.

3. **Apa fungsi `assets.directory` pada `wrangler.jsonc`?**
   > Menentukan lokasi folder lokal tempat file-file statis (seperti `index.html`, CSS, JS, gambar) disimpan. Wrangler/Cloudflare akan mengunggah isi dari folder tersebut untuk dipublikasikan secara langsung.

4. **Mengapa branch produksi penting?**
   > Branch produksi (biasanya `main`) berfungsi sebagai sumber kebenaran (*single source of truth*) untuk kode yang siap diakses pengguna publik. Hal ini mencegah kode percobaan/draft yang belum stabil langsung terbit ke lingkungan live.

5. **Bagaimana build log membantu troubleshooting?**
   > Build log mencatat setiap tahapan deployment secara real-time. Jika terjadi kegagalan (misalnya folder asset tidak ditemukan atau konfigurasi Wrangler keliru), log akan menampilkan pesan error spesifik beserta lokasi baris permasalahannya.

6. **Apa perbedaan awal yang kamu lihat antara platform serverless dan server tradisional?**
   > Pada server tradisional, kita perlu menyewa server/VM, mengatur OS, membuka port, dan menjalankan proses server terus-menerus (misal Nginx/Apache/Node.js). Pada platform serverless/edge seperti Cloudflare Workers, kita cukup menyediakan file/kode dan konfigurasi; Cloudflare secara otomatis menangani infrastruktur, scaling, HTTPS, dan jaringan tanpa perlu mengelola server.

---

## 🧾 Lembar Evidence / Penilaian

- [x] Repositori GitHub Publik aktif.
- [x] Struktur proyek memenuhi standar (`./public` dan `wrangler.jsonc`).
- [x] Interaktivitas JavaScript teruji dan berfungsi.
- [x] Fitur Tantangan Tambahan: Halaman `about.html` dan `404.html` terintegrasi.
- [x] URL deployment `*.workers.dev` dapat diakses secara publik.
