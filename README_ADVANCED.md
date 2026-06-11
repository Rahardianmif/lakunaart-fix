# LakunaArt Advanced

Versi ini sudah di-upgrade dari MVP menjadi versi advance yang tetap berjalan tanpa backend tambahan.

## Cara Menjalankan di Local

```bash
npm install
npm run dev
```

Lalu buka alamat yang muncul di terminal, biasanya:

```bash
http://localhost:5173
```

## Validasi

Project ini sudah dites dengan:

```bash
npm run lint
npm run build
```

Keduanya berhasil.

## Fitur yang Sudah Ditambahkan

- Dark Mode: Light, Dark, System.
- Advanced Search Filter: Culture, Medium, Date From, Date To, Department, Has Image.
- Infinite Scroll Search.
- Search History di SearchBar saat focus.
- Recently Viewed berbasis localStorage dan tampil di Home.
- Sticky Metadata pada halaman Artwork Detail.
- Artist Page: `/artist/:slug`.
- Museum Page: `/museum/cleveland`.
- User Collections berbasis localStorage: `/collections`.
- Timeline Explorer: `/timeline`.
- Culture Explorer: `/cultures`.
- Recommendation Engine sederhana berbasis favorites/recently viewed/current artwork.
- AI-style Artwork Explanation lokal tanpa API key.

## Catatan Penting

Fitur AI Explanation dibuat dalam bentuk local/template explanation agar project bisa langsung berjalan tanpa OpenAI API key atau backend. Jika ingin dibuat benar-benar memakai AI API, perlu endpoint backend agar API key tidak bocor di frontend.
