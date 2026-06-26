# ☪️ FaraidPro – Kalkulator Waris Islam

> Simulasi pembagian harta waris berdasarkan ilmu **Faraidh** — akurat, cepat, dan langsung berjalan di browser tanpa instalasi.

![Platform](https://img.shields.io/badge/Platform-Web%20%2F%20HTML-orange?logo=html5)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow?logo=javascript)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Built with](https://img.shields.io/badge/Built%20with-Vibe%20Coding-blueviolet?logo=sparkles)

---

## 🕌 Tentang Proyek

**FaraidPro** adalah aplikasi kalkulator waris Islam berbasis web yang membantu menghitung distribusi harta peninggalan sesuai syariat Islam (ilmu faraidh). Cukup buka file `index.html` di browser atau jalankan `run.bat` untuk server lokal otomatis — tidak perlu instalasi manual.

Dibangun untuk kebutuhan **edukasi**, **riset**, dan **simulasi** — bukan pengganti fatwa ulama atau keputusan lembaga syariah.

---

## ✨ Fitur Utama

- ⚖️ **Perhitungan Otomatis** — distribusi bagian ahli waris dihitung secara real-time
- 🧮 **Berbasis Kaidah Faraidh** — mengikuti ketentuan Al-Qur'an, Sunnah, dan ijma' ulama
- 👨‍👩‍👧‍👦 **Multi Ahli Waris** — mendukung berbagai kategori (suami/istri, anak, orang tua, saudara)
- 💰 **Input Harta Bersih** — memperhitungkan pengurangan utang dan biaya pemakaman
- 🌐 **Zero Dependency** — murni HTML + JS, berjalan di semua browser modern
- 📱 **Ringan & Portabel** — bisa dijalankan secara lokal maupun online via GitHub Pages
- 🖥️ **Layout Responsif** — panel hasil diperlebar, tabel dengan horizontal scroll untuk tampilan optimal

---

## 📁 Struktur Proyek

```
kalkulator-waris/
├── index.html                                    # Aplikasi utama kalkulator waris
├── run.bat                                       # Script Windows untuk menjalankan server lokal otomatis
├── screen.png                                    # Screenshot tampilan aplikasi
├── Mekanisme Perhitungan Waris Islam (Ilmu Faraid) — Panduan Komprehensif untuk Pengembangan Aplikasi.md
│                                                 # Dokumentasi lengkap mekanisme perhitungan faraidh
├── DESIGN.md                                     # Catatan desain, arsitektur & rencana fitur
├── .gitignore
└── README.md
```

---

## 🚀 Cara Menjalankan

### ⚡ Cara Tercepat (Windows) — Gunakan `run.bat`

Double-click file `run.bat` atau jalankan dari terminal:

```bat
run.bat
```

Script ini secara otomatis mendeteksi lingkungan yang tersedia dan menjalankan server lokal:
1. **Python Launcher (`py -3`)** — jika tersedia
2. **Python** — fallback ke `python`
3. **Node.js** — jika Python tidak ada
4. **Fallback** — membuka `index.html` langsung di browser default

> 💡 Server berjalan di `http://localhost:<port>` dan browser otomatis terbuka.

### Secara Lokal (Manual)

```bash
# Clone repository
git clone https://github.com/fathahnoor/kalkulator-waris.git

# Masuk ke folder
cd kalkulator-waris

# Buka langsung di browser
start index.html       # Windows
open index.html        # macOS
xdg-open index.html    # Linux
```

> Tidak ada dependensi. Tidak ada npm install. Langsung jalan.

### Via GitHub Pages

1. Buka **Settings** → **Pages** di repository ini
2. Set source ke branch `main`, folder `/root`
3. GitHub akan menyediakan URL publik otomatis

> ✅ File utama sudah bernama `index.html` sehingga halaman langsung terbuka saat URL dikunjungi.

---

## 🧮 Cara Penggunaan

| Langkah | Aksi |
|---------|------|
| 1️⃣ | Masukkan total harta peninggalan (tarikah) |
| 2️⃣ | Kurangi utang & biaya pemakaman jika ada |
| 3️⃣ | Pilih kategori & jumlah ahli waris |
| 4️⃣ | Lihat hasil distribusi bagian tiap ahli waris |

---

## 📐 Landasan Hukum

Perhitungan mengacu pada kaidah umum ilmu faraidh:

- **Al-Qur'an** — Q.S. An-Nisa: 7, 11, 12, 176
- **Hadits Nabi ﷺ** — riwayat Bukhari & Muslim tentang pembagian waris
- **Ijma' Ulama** — kesepakatan fukaha empat mazhab pada kasus-kasus umum

> ⚠️ Untuk kasus khusus (beda mazhab, wasiat tertentu, sengketa hukum), selalu konsultasikan kepada ulama atau lembaga fatwa yang berwenang.

Untuk memahami mekanisme perhitungan secara mendalam, lihat dokumentasi: [Mekanisme Perhitungan Waris Islam (Ilmu Faraid)](./Mekanisme%20Perhitungan%20Waris%20Islam%20(Ilmu%20Faraid)%20%E2%80%94%20Panduan%20Komprehensif%20untuk%20Pengembangan%20Aplikasi.md)

---

## 🛣️ Roadmap

- [x] Kalkulator dasar pembagian faraidh
- [x] Rename ke `index.html` untuk dukungan GitHub Pages langsung
- [x] Script `run.bat` untuk server lokal otomatis di Windows
- [x] Dokumentasi mekanisme perhitungan faraidh komprehensif
- [x] Layout responsif: panel hasil diperlebar, horizontal scroll tabel
- [ ] Penjelasan tekstual otomatis per bagian ahli waris
- [ ] Mode edukasi interaktif (kuis faraidh)
- [ ] Visualisasi diagram pembagian harta
- [ ] Dukungan multi-bahasa (ID / EN / AR)
- [ ] Export hasil ke PDF
- [ ] Integrasi XAI — penjelasan *kenapa* bagian tersebut dihitung demikian

---

## 🤝 Kontribusi

Kontribusi sangat welcome! Terutama untuk:

- Penyempurnaan logika faraidh (kasus khusus & mazhab)
- Penambahan antarmuka yang lebih interaktif

```bash
# Fork → buat branch baru → commit → Pull Request
git checkout -b fitur/nama-fitur
git commit -m "feat: tambahkan fitur X"
git push origin fitur/nama-fitur
```

---

## 👤 Author

**FaraidPro** dibuat oleh [@fathahnoor](https://github.com/fathahnoor)

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License** — bebas digunakan, dimodifikasi, dan didistribusikan dengan atribusi yang sesuai.

> "Sesungguhnya Allah memerintahkan kamu untuk menunaikan amanah kepada yang berhak menerimanya..."
> — Q.S. An-Nisa: 58
