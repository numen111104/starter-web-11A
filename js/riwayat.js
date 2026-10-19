// riwayat.js — [BONUS, LANGKAH 5.2] catatan pesanan yang sudah dibayar. Tidak ada kode DOM di sini.
//
// MATERI: array method push, shift, pop -> struktur-data/manipulasi-array.js
// MATERI: Array.from dan reverse        -> struktur-data/array.js dan struktur-data/array-method.js

import { MAKS_RIWAYAT } from "./helper.js";

// [DISEDIAKAN]
const riwayat = [];

export default riwayat;

// 1. catatPesanan(pesanan)
//    - push pesanan ke belakang array riwayat
//    - jika panjang riwayat sekarang LEBIH DARI MAKS_RIWAYAT, buang yang paling lama (elemen pertama): shift
export const catatPesanan = (pesanan) => {
  // TODO
};

// 2. batalkanPesananTerakhir()
//    Membuang pesanan paling baru (elemen terakhir) dan MENGEMBALIKANNYA. Method array yang tepat: pop.
//    Jika riwayat kosong, pop mengembalikan undefined, biarkan saja.
export const batalkanPesananTerakhir = () => {
  // TODO
};

// 3. ambilRiwayatTerbaruDulu()
//    Mengembalikan array riwayat dengan urutan terbalik (terbaru di depan).
//    JEBAKAN: reverse() MENGUBAH array aslinya. Salin dulu dengan Array.from(riwayat), baru reverse salinannya.
export const ambilRiwayatTerbaruDulu = () => {
  // TODO: sementara mengembalikan array kosong supaya halaman tidak error
  return [];
};
