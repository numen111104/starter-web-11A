// data.js — "gudang" data lapak. [PERTEMUAN 1, LANGKAH 1.6]
// File ini hanya berisi DATA. Tidak ada kode DOM dan tidak ada hitung-hitungan.
//
// MATERI: array of object  -> lihat struktur-data/array.js dan struktur-data/object.js
// MATERI: named export     -> lihat modularisasi/export.js dan modularisasi/main.mjs
//
// Nama key SAMA dengan contoh `products` di struktur-data/object.js: name, price, category, stok.
// Harga adalah harga per kilogram (kg).
//
// Satu produk sudah diisi sebagai CONTOH. Kamu bertugas melengkapi sisanya.

export const produk = [
  {
    id: 1,
    name: "Apel",
    price: 32000,
    category: "Impor",
    stok: 12,
    gambar: "assets/img/apel-merah.svg",
    gambarAlt: "assets/img/apel-hijau.svg", // OPSIONAL: gambar kedua untuk tombol "Ganti warna"
    warna: "#ffe1de", // warna latar foto, dibaca CSS lewat variabel --warna
  },

  // TODO: tambahkan minimal 5 produk lagi (total minimal 6). Aturannya:
  //   - id        : angka, TIDAK boleh sama dengan produk lain (2, 3, 4, ...)
  //   - name      : string
  //   - price     : number, tanpa titik (contoh 18000, BUKAN "18.000")
  //   - category  : "Lokal" atau "Impor"
  //   - stok      : number (WAJIB ada minimal satu produk dengan stok 0, untuk menguji tampilan "Habis")
  //   - gambar    : salah satu file di folder assets/img (pisang.svg, mangga.svg, nanas.svg, jeruk.svg, anggur.svg)
  //   - warna     : kode warna pastel untuk latar foto, contoh "#fff1b8"
  //
  // Ingat: antar-object dipisahkan koma, dan key terakhir di tiap object boleh diakhiri koma.
];
