// keranjang.js — "otak" nota belanja. Tidak ada kode DOM di sini. [PERTEMUAN 3, LANGKAH 3.1]
//
// MATERI: Map  -> lihat struktur-data/map.js dan struktur-data/real-case-map.js
//   - key   = OBJECT produk (Map boleh memakai key bertipe apa saja, bukan hanya string)
//   - value = jumlah (kg) yang dibeli
// MATERI: default export + named export -> lihat modularisasi/export.js dan modularisasi/index-export.js
//
// Cara kerja yang disarankan: kerjakan SATU fungsi, jalankan  node uji-logika.mjs  , lihat ✅, baru lanjut.

// [DISEDIAKAN] Map keranjang dan default export-nya.
// Dipakai main.js sebagai:  import keranjang, { ... } from "./keranjang.js"
const keranjang = new Map();

export default keranjang;

// 1. tambahItem(item) — menambah 1 kg. Mengembalikan true jika berhasil, false jika sudah mentok di stok.
//    Langkah:
//      a. cari jumlah sekarang. Jika item belum ada di Map -> 0, jika sudah ada -> ambil nilainya.
//         (pakai keranjang.has(item) ? ... : ...  dan  keranjang.get(item))
//      b. jika jumlah sekarang SUDAH >= item.stok -> return false
//      c. selain itu: keranjang.set(item, jumlah sekarang + 1) lalu return true
export const tambahItem = (item) => {
  // TODO
};

// 2. kurangiItem(item) — mengurangi 1 kg. Jika tinggal 1 kg, item dibuang dari nota (keranjang.delete).
export const kurangiItem = (item) => {
  // TODO
};

// 3. hapusItem(item) — membuang item dari nota, berapa pun jumlahnya.
export const hapusItem = (item) => {
  // TODO
};

// 4. kosongkanKeranjang() — mengosongkan seluruh Map. Cari method Map yang tepat (bukan delete satu per satu).
export const kosongkanKeranjang = () => {
  // TODO
};

// 5. hitungSubtotal() — jumlah (harga x kg) seluruh item di keranjang. Mengembalikan number.
//    PERHATIAN: keranjang.forEach memberi parameter (value, key), URUTANNYA BEDA dengan Array.forEach (item, index).
//    Jadi bentuknya:  keranjang.forEach((jumlah, item) => { ... })
export const hitungSubtotal = () => {
  // TODO
};

// 6. hitungJumlahItem() — total kg seluruh item (2 kg apel + 1 kg jeruk = 3).
export const hitungJumlahItem = () => {
  // TODO
};
