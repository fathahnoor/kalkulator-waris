# ☪️ FaraidPro – Kalkulator Waris Islam

> Simulasi pembagian harta waris berdasarkan ilmu **Faraidh** — akurat, cepat, dan langsung berjalan di browser tanpa instalasi.

![Platform](https://img.shields.io/badge/Platform-Web%20%2F%20HTML-orange?logo=html5)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow?logo=javascript)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![Built with](https://img.shields.io/badge/Built%20with-Vibe%20Coding-blueviolet?logo=sparkles)

---

## 🕌 Tentang Proyek

**FaraidPro** adalah aplikasi kalkulator waris Islam berbasis web yang membantu menghitung distribusi harta peninggalan sesuai syariat Islam (ilmu faraidh). Cukup buka satu file HTML di browser — tidak perlu server, tidak perlu instalasi, langsung jalan.

Dibangun untuk kebutuhan **edukasi**, **riset**, dan **simulasi** — bukan pengganti fatwa ulama atau keputusan lembaga syariah.

---

## ✨ Fitur Utama

- ⚖️ **Perhitungan Otomatis** — distribusi bagian ahli waris dihitung secara real-time
- 🧮 **Berbasis Kaidah Faraidh** — mengikuti ketentuan Al-Qur'an, Sunnah, dan ijma' ulama
- 👨‍👩‍👧‍👦 **Multi Ahli Waris** — mendukung berbagai kategori (suami/istri, anak, orang tua, saudara)
- 💰 **Input Harta Bersih** — memperhitungkan pengurangan utang dan biaya pemakaman
- 🌐 **Zero Dependency** — murni HTML + JS, berjalan di semua browser modern
- 📱 **Ringan & Portabel** — bisa dijalankan secara lokal maupun online via GitHub Pages

---

## 📁 Struktur Proyek

```
kalkulator-waris/
├── code.html        # Aplikasi utama kalkulator waris
├── DESIGN.md        # Catatan desain, arsitektur & rencana fitur
├── .gitignore
└── README.md
```

---

## 🚀 Cara Menjalankan

### Secara Lokal

```bash
# Clone repository
git clone https://github.com/fathahnoor/kalkulator-waris.git

# Masuk ke folder
cd kalkulator-waris

# Buka langsung di browser
start code.html        # Windows
open code.html         # macOS
xdg-open code.html     # Linux
```

> Tidak ada dependensi. Tidak ada npm install. Langsung jalan.

### Via GitHub Pages

1. Buka **Settings** → **Pages** di repository ini
2. Set source ke branch `main`, folder `/root`
3. GitHub akan menyediakan URL publik otomatis

> 💡 Tips: Rename `code.html` → `index.html` agar halaman terbuka langsung saat URL dikunjungi.

---

## 🧮 Cara Penggunaan

| Langkah | Aksi |
|--------|------|
| 1️⃣ | Masukkan total harta peninggalan (tarikah) |
| 2️⃣ | Kurangi utang & biaya pemakaman jika ada |
| 3️⃣ | Pilih kategori & jumlah ahli waris |
| 4️⃣ | Lihat hasil distribusi bagian tiap ahli waris |

---

## 📐 Landasan Hukum

Perhitungan mengacu pada kaidah umum ilmu faraidh:

- **Al-Qur'an** — Q.S. An-Nisa: 11, 12, 176
- **Hadits Nabi ﷺ** — riwayat Bukhari & Muslim tentang pembagian waris
- **Ijma' Ulama** — kesepakatan fukaha empat mazhab pada kasus-kasus umum

> ⚠️ Untuk kasus khusus (beda mazhab, wasiat tertentu, sengketa hukum), selalu konsultasikan kepada ulama atau lembaga fatwa yang berwenang.

---

## 🛣️ Roadmap

- [x] Kalkulator dasar pembagian faraidh
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
- Riset kolaboratif di bidang **EdTech**, **HCI**, atau **AI + Islamic Studies**

```bash
# Fork → buat branch baru → commit → Pull Request
git checkout -b fitur/nama-fitur
git commit -m "feat: tambahkan fitur X"
git push origin fitur/nama-fitur
```

---

## 👤 Author

**FaraidPro** dibuat oleh [@fathahnoor](https://github.com/fathahnoor)

- 🎓 Dosen & Peneliti — Telkom University
- 🔬 Minat riset: AI, EEG/BCI, XR, EdTech, Islamic Technology
- 🌐 GitHub: [github.com/fathahnoor](https://github.com/fathahnoor)

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License** — bebas digunakan, dimodifikasi, dan didistribusikan dengan atribusi yang sesuai.

---

<p align="center">
  <i>"Sesungguhnya Allah memerintahkan kamu untuk menunaikan amanah kepada yang berhak menerimanya..."</i><br>
  <b>— Q.S. An-Nisa: 58</b>
</p>
