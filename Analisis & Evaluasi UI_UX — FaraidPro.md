<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# Analisis \& Evaluasi UI/UX — FaraidPro (Kalkulator Waris Islam)


***

## RINGKASAN EKSEKUTIF

FaraidPro adalah kalkulator faraid berbasis web yang secara fungsional sudah cukup lengkap. Namun terdapat sejumlah masalah UI/UX yang perlu diperbaiki agar pengalaman pengguna lebih intuitif, inklusif, dan dapat dipercaya — terutama karena domain ini (ilmu waris Islam) membutuhkan kejelasan dan akurasi yang tinggi.

***

## 1. NAVIGASI \& INFORMATION ARCHITECTURE

### Masalah:

- **Stepper (1 Harta → 2 Ahli Waris → 3 Hasil) tidak berfungsi sebagai navigasi aktif**. Pengguna harus scroll manual dari atas ke bawah — tidak ada tombol "Lanjut" atau "Sebelumnya" yang memandu alur multi-step. Ini membuat stepper hanya dekoratif, bukan fungsional.[^1]
- **Navbar memiliki item "Cetak" dan "Bagikan"** yang fungsinya hanya relevan setelah ada hasil perhitungan, tapi ditampilkan sejak awal tanpa status disabled — membingungkan pengguna.
- **Tidak ada indikator progress aktif** pada stepper. Step yang sedang aktif tidak ter-highlight berbeda dari step lainnya.


### Rekomendasi:

- Implementasikan wizard/stepper yang benar-benar membagi halaman menjadi 3 langkah terpisah dengan tombol navigasi "Lanjut" dan "Kembali".
- Disable atau sembunyikan menu "Cetak" dan "Bagikan" hingga kalkulasi selesai dilakukan.
- Highlight step aktif dengan warna kontras (misal: background hijau solid dengan teks putih).

***

## 2. FORM INPUT \& INTERAKSI

### Masalah:

- **Input field harta (Harta peninggalan, Biaya tajhiz, Hutang, Wasiat) menggunakan angka mentah tanpa format Rupiah**. Pengguna harus mengetik angka seperti "1000000000" tanpa separator ribuan — sangat rawan salah input dan tidak user-friendly untuk nominal besar.[^1]
- **Tidak ada validasi real-time** — misal, jika biaya tajhiz + hutang melebihi harta peninggalan, tidak ada peringatan instan.
- **Counter ahli waris (tombol − dan +) tidak memiliki batas minimum yang jelas secara visual** — apakah bisa negatif? Tidak ada tooltip atau feedback saat nilai sudah 0 dan tombol − ditekan.
- **Ayah dan Ibu seharusnya hanya 0 atau 1** (tidak mungkin lebih dari 1), tapi UI-nya sama dengan Istri yang bisa hingga 4. Ini membuka potensi input tidak valid secara logika faraid.
- **Tidak ada placeholder atau contoh nilai** pada field harta — pengguna baru tidak tahu format yang diharapkan.
- **Toggle "Wasiat lebih dari sepertiga"** tidak memiliki label status ON/OFF yang eksplisit — hanya toggle abu-abu tanpa teks "Aktif/Nonaktif" di sampingnya.


### Rekomendasi:

- Tambahkan format angka otomatis dengan separator ribuan (misal: Rp 1.500.000.000) menggunakan `Intl.NumberFormat`.
- Tambahkan validasi inline dengan pesan error berwarna merah di bawah field.
- Batasi input Ayah dan Ibu maksimal 1 secara hard limit di UI (ganti counter dengan checkbox atau radio button).
- Tambahkan label "Aktif" / "Nonaktif" di samping setiap toggle.
- Tampilkan placeholder contoh nilai pada field harta.

***

## 3. VISUAL DESIGN \& KONSISTENSI

### Masalah:

- **Kartu ringkasan "Rp 0" di bagian atas** terlalu besar dan prominent untuk kondisi awal yang belum ada data — memberikan kesan "kosong" yang tidak engaging.[^1]
- **Warna ikon gender Laki-laki dan Perempuan sama persis** (hijau tua) — tidak ada diferensiasi visual yang kuat antara keduanya. Untuk konteks waris, pembedaan gender sangat krusial secara hukum.
- **Density informasi terlalu tinggi di satu halaman** — semua section (Harta, Ahli Waris, Opsi Ijtihad, Hasil, Aturan Inti) dimuat dalam satu halaman scroll panjang tanpa pemisah visual yang tegas.
- **Badge "Lokal"** pada pojok kanan section Data Pewaris memiliki konteks yang tidak langsung dipahami pengguna awam — apa artinya "Lokal"?
- **Tombol "Reset" dan "Hitung Waris"** berada di bagian bawah halaman setelah Opsi Ijtihad, padahal secara UX seharusnya lebih prominent dan mudah diakses.
- **Tipografi heading section (Data Pewaris, Ahli Waris, Opsi Ijtihad)** menggunakan ukuran yang hampir sama — hierarki visual kurang jelas.


### Rekomendasi:

- Buat kartu ringkasan harta lebih compact di awal, atau tampilkan dalam kondisi kosong yang lebih menarik (ilustrasi/icon + teks panduan).
- Beri warna berbeda untuk ikon laki-laki (biru tua) dan perempuan (hijau/merah muda) agar diferensiasi gender langsung terlihat.
- Pisahkan section dengan divider yang lebih tegas atau gunakan card dengan background berbeda.
- Ganti label "Lokal" dengan tooltip atau keterangan "Data disimpan di perangkat Anda".
- Buat tombol "Hitung Waris" menjadi sticky di bagian bawah layar (floating action button) agar selalu terlihat.

***

## 4. OPSI IJTIHAD — KOMPLEKSITAS TERSEMBUNYI

### Masalah:

- **Opsi Ijtihad** (Gharawain, Musytarakah, Radd, dsb.) langsung ditampilkan dalam bentuk checkbox dengan deskripsi panjang — terlalu teknis untuk pengguna awam yang tidak memahami istilah fiqih.[^2]
- **Teks deskripsi opsi sangat padat** dan tercampur antara nama opsi dan penjelasannya dalam satu label checkbox — sulit dibaca secara cepat.
- **Tidak ada indikasi "ini mode lanjutan"** — pengguna awam bisa secara tidak sengaja mengubah opsi default dan mendapat hasil yang berbeda tanpa menyadarinya.


### Rekomendasi:

- Sembunyikan Opsi Ijtihad di balik accordion "Pengaturan Lanjutan" yang collapsed secara default.
- Pisahkan nama opsi dan deskripsinya — nama sebagai label utama, deskripsi sebagai teks kecil di bawahnya.
- Tambahkan badge "Default (Jumhur/Indonesia)" pada opsi yang direkomendasikan.
- Tambahkan link "Pelajari lebih lanjut" yang membuka modal/popup penjelasan singkat per opsi.

***

## 5. SECTION HASIL

### Masalah:

- **Placeholder "Belum dihitung - Hasil akan muncul di sini"** terlalu pasif. Tidak ada call-to-action yang mengarahkan pengguna untuk mengisi data terlebih dahulu.[^2]
- **Tidak ada preview parsial** — setelah pengguna mengisi ahli waris, idealnya ada kalkulasi live/real-time tanpa harus klik tombol.
- **Section "Aturan Inti"** ditempatkan setelah Hasil — padahal pengguna mungkin butuh membacanya sebelum mengisi form (terutama untuk memahami konsep tajhiz, hutang, wasiat).


### Rekomendasi:

- Ubah placeholder menjadi lebih actionable: "Isi data harta dan ahli waris di atas, lalu klik 'Hitung Waris' untuk melihat hasilnya."
- Pertimbangkan kalkulasi otomatis (real-time) setiap kali ada perubahan input, tanpa perlu tombol submit.
- Pindahkan "Aturan Inti" ke sidebar atau tab tersendiri, bukan di bawah Hasil.

***

## 6. AKSESIBILITAS (ACCESSIBILITY)

### Masalah:

- **Kontras teks pada label section** seperti "PASANGAN", "ORANG TUA", "ANAK" (uppercase abu-abu kecil) kemungkinan di bawah rasio kontras WCAG AA (4.5:1).
- **Tidak ada skip navigation** untuk pengguna keyboard/screen reader agar bisa melompat langsung ke form.
- **Ikon gender** tidak memiliki alt text yang bermakna — hanya ikon tanpa deskripsi untuk screen reader.
- **Toggle/checkbox Opsi Ijtihad** memiliki label yang sangat panjang — tidak optimal untuk screen reader.


### Rekomendasi:

- Audit kontras warna menggunakan tool seperti Colour Contrast Analyser.
- Tambahkan `aria-label` yang ringkas dan bermakna pada semua kontrol interaktif.
- Implementasikan skip link "Lewati navigasi" di awal halaman.

***

## 7. MOBILE RESPONSIVENESS

### Masalah (berdasarkan layout yang terlihat):

- **Layout dua kolom** pada Ahli Waris (Suami | Istri, Anak laki-laki | Anak perempuan) [^1] — di layar kecil (< 375px) bisa terlalu sempit dan tombol +/− terlalu berdekatan.
- **Tombol +/−** berukuran kecil — di mobile, target touch minimal 44×44px (rekomendasi Apple/Google).
- **Navbar dengan 6 item** (Hitung, Hasil, Aturan, Cetak, Share, Dark mode, icon kanan) — di mobile bisa overflow atau terlalu padat.


### Rekomendasi:

- Pastikan tombol +/− memiliki minimum tap target 44×44px di mobile.
- Pertimbangkan hamburger menu atau bottom navigation bar untuk mobile.
- Test layout di viewport 320px, 375px, dan 414px.

***

## 8. ONBOARDING \& EDUKASI PENGGUNA

### Masalah:

- **Tidak ada tutorial atau guided tour** untuk pengguna pertama kali — langsung disuguhi form kosong yang kompleks.
- **Fitur "Contoh kasus"** terdeteksi di page text  tapi tidak terlihat jelas dalam navigasi utama — tersembunyi.[^2]
- **Disclaimer** ("gunakan hasil ini sebagai simulasi awal") hanya ada di footer — seharusnya lebih prominent karena ini menyangkut urusan hukum yang sensitif.


### Rekomendasi:

- Tampilkan tombol "Coba Contoh Kasus" yang besar dan prominent di hero section untuk menurunkan barrier entry.
- Tambahkan tooltip singkat pada setiap field ahli waris saat hover/focus yang menjelaskan siapa yang dimaksud.
- Tampilkan disclaimer dalam banner/callout berwarna kuning/amber di atas form, bukan hanya di footer.

***

## PRIORITAS PERBAIKAN

| Prioritas | Item |
| :-- | :-- |
| 🔴 Tinggi | Format input Rupiah dengan separator ribuan |
| 🔴 Tinggi | Stepper yang benar-benar fungsional (wizard multi-step) |
| 🔴 Tinggi | Tombol "Hitung Waris" sticky/floating |
| 🟡 Sedang | Batasi Ayah/Ibu maksimal 1 di UI |
| 🟡 Sedang | Opsi Ijtihad dalam accordion tersembunyi |
| 🟡 Sedang | Differensiasi warna ikon gender |
| 🟡 Sedang | Tombol "Contoh Kasus" lebih prominent |
| 🟢 Rendah | Audit kontras warna WCAG |
| 🟢 Rendah | Pindahkan Aturan Inti ke sidebar/tab |
| 🟢 Rendah | Tooltip per field ahli waris |


***

*Analisis dilakukan berdasarkan inspeksi visual dan struktur DOM halaman FaraidPro yang berjalan di localhost.*[^1][^2]

<div align="center">⁂</div>

[^1]: http://localhost:59075/

[^2]: http://localhost:59075/

