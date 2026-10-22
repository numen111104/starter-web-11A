// helper.js — kumpulan FUNGSI hitung-hitungan dan pemformatan.
// Semua fungsi di sini "murni": menerima input, mengembalikan hasil (return), tidak menyentuh DOM.
// Karena itu bisa diperiksa lewat terminal:   node uji-logika.mjs
//
// Cara kerja yang disarankan untuk SETIAP fungsi:
//   1. baca spesifikasinya, 2. tulis contoh input -> output di kertas, 3. baru tulis kodenya,
//   4. jalankan node uji-logika.mjs dan lihat apakah ✅.

// ---------- Aturan toko (konstanta) [DISEDIAKAN] ----------
// Konstanta ditulis UPPER_SNAKE_CASE supaya mudah dikenali dan tidak diubah-ubah.
export const BATAS_DISKON_SEDANG = 75000; // belanja >= Rp75.000 -> diskon 5%
export const BATAS_DISKON_TINGGI = 150000; // belanja >= Rp150.000 -> diskon 10%
export const MAKS_RIWAYAT = 5; // jumlah riwayat pesanan yang disimpan

// ---------- 1. sapaByWaktu(jam)   [LANGKAH 5.1] ----------
// MATERI: function declaration + if/else + return. Contoh serupa: sapaByZona() di return-value.js
// Spesifikasi (jam bernilai 0 sampai 23):
//   jam di bawah 11   -> "Selamat pagi"
//   jam di bawah 15   -> "Selamat siang"
//   jam di bawah 18   -> "Selamat sore"
//   selain itu        -> "Selamat malam"
// Tulis sebagai FUNCTION DECLARATION (kata kunci function). Setelah selesai, jawab: kenapa
// function declaration bisa dipanggil sebelum baris pendeklarasiannya?
export function sapaByWaktu(jam) {
  // TODO
}

// ---------- 2. formatRupiah(angka)   [LANGKAH 2.1] ----------
// MATERI: function expression + parameter default.
// Contoh serupa: convertCelciusToFahrenheit di function-experession.js
// Spesifikasi:
//   formatRupiah(32000) -> "Rp32.000"
//   formatRupiah()      -> "Rp0"     (angka bernilai 0 jika tidak diisi: parameter default)
// Petunjuk: angka.toLocaleString("id-ID") mengubah 32000 menjadi "32.000" (string).
//           Operator + antara "Rp" dan string itu menggabungkan teks.
// Tulis sebagai FUNCTION EXPRESSION: const formatRupiah = function (...) { ... };
export const formatRupiah = function (angka = 0) {
  return `Rp${angka.toLocaleString("id-ID")}`;
};

// ---------- 3. formatPotongan(angka)   [LANGKAH 4.1] ----------
// Potongan harga ditampilkan dengan tanda minus, kecuali nilainya 0.
//   formatPotongan(5000) -> "-Rp5.000"
//   formatPotongan(0)    -> "Rp0"
// MATERI: arrow function + ternary. Panggil formatRupiah() di dalamnya, jangan menulis ulang logikanya.
export const formatPotongan = (angka) => {
  // TODO
};

// ---------- 4. hitungPersenDiskon(subtotal) dan hitungDiskon(subtotal)   [LANGKAH 4.1] ----------
// MATERI: arrow function + ternary bersusun. Contoh serupa: bonus di challange.js
//   (gaji >= 5.000.000 -> 10%, gaji >= 3.000.000 -> 5%, selain itu 0)
// Spesifikasi hitungPersenDiskon:
//   subtotal >= BATAS_DISKON_TINGGI  -> 10
//   subtotal >= BATAS_DISKON_SEDANG  -> 5
//   selain itu                       -> 0
// Spesifikasi hitungDiskon: besar potongan dalam RUPIAH.
//   hitungDiskon(100000) -> 5000   (5% dari 100.000)
// Petunjuk: hitungDiskon memanggil hitungPersenDiskon. Kalikan dulu baru bagi 100.
export const hitungPersenDiskon = (subtotal) => {
  // TODO
};

export const hitungDiskon = (subtotal) => {
  // TODO
};

// ---------- 5. buatKupon(persen)   [LANGKAH 4.5, LEVEL 2] ----------
// MATERI: function yang MENGEMBALIKAN function (first-class function).
// Contoh serupa: multiplier() di first-class-citizen.js
//     const double = multiplier(2);   double(10)  -> 20
// Spesifikasi:
//     const kupon10 = buatKupon(10);  kupon10(200000) -> 20000
// buatKupon(10) mengembalikan function baru yang "mengingat" angka 10.
// Function yang dikembalikan menerima subtotal dan mengembalikan besar potongan (rupiah).
export const buatKupon = (persen) => {
  // TODO
};

// ---------- 6. daftarKupon   [LANGKAH 4.5, LEVEL 2] ----------
// MATERI: Map yang value-nya adalah FUNCTION (gabungan struktur-data/map.js dan array-object-function.js).
// Isi Map dengan 3 kupon (key = kode kupon HURUF BESAR, value = hasil buatKupon):
//     "HEMAT5"   -> 5%
//     "HEMAT10"  -> 10%
//     "KELAS11A" -> 15%
// Petunjuk: new Map([ [key, value], [key, value], ... ])
export const daftarKupon = new Map();

// ---------- 7. hitungRingkasan(subtotal, fungsiKupon)   [LANGKAH 4.2] ----------
// MATERI: parameter default berupa FUNCTION, return object, operator modulus.
// Mengembalikan object dengan 6 key:
//   { subtotal, persenDiskon, diskon, potonganKupon, pembulatan, total }
// Langkah hitung:
//   persenDiskon  = hitungPersenDiskon(subtotal)
//   diskon        = hitungDiskon(subtotal)
//   potonganKupon = fungsiKupon(subtotal)
//   sebelumPembulatan = subtotal - diskon - potonganKupon
//   pembulatan    = sisa bagi sebelumPembulatan dengan 100 (operator %)      73.150 % 100 = 50
//   total         = sebelumPembulatan - pembulatan                            -> 73.100
// Parameter kedua (fungsiKupon) harus punya NILAI DEFAULT berupa function yang selalu mengembalikan 0,
// sehingga hitungRingkasan(100000) tetap jalan walaupun tidak ada kupon.
export const hitungRingkasan = (subtotal, fungsiKupon) => {
  // TODO
};

// ---------- 8. jamSekarang() [DISEDIAKAN] ----------
export const jamSekarang = () =>
  new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
