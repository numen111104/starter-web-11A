// uji-logika.mjs — pemeriksa otomatis untuk semua kode LOGIKA (tanpa DOM).
//
// Cara menjalankan (di terminal, dari folder proyek ini):
//     node uji-logika.mjs
//
// Hasil:  ✅ = benar,  ❌ = salah (beserta penjelasan: diharapkan vs hasil sebenarnya).
// Semua pengujian di sini memakai materi yang sama dengan proyek:
// function sebagai parameter, arrow function, destructuring, import/export.

import { produk } from "./js/data.js";
import {
  sapaByWaktu,
  formatRupiah,
  formatPotongan,
  hitungPersenDiskon,
  hitungDiskon,
  buatKupon,
  daftarKupon,
  hitungRingkasan,
  MAKS_RIWAYAT,
} from "./js/helper.js";
import keranjang, {
  tambahItem,
  kurangiItem,
  hapusItem,
  kosongkanKeranjang,
  hitungSubtotal,
  hitungJumlahItem,
} from "./js/keranjang.js";
import riwayat, { catatPesanan, batalkanPesananTerakhir, ambilRiwayatTerbaruDulu } from "./js/riwayat.js";

// ---------- Alat uji kecil ----------
// uji() menerima function (first-class function!) lalu menjalankannya di dalam try/catch.
// Parameter ketiga menandai tingkat pengujian:
//   "wajib"   = harus ✅ semua untuk menyelesaikan proyek
//   "level 2" = target kelas (kupon: function yang mengembalikan function)
//   "bonus"   = pilihan (riwayat pesanan)
const hasil = {
  wajib: { benar: 0, salah: 0 },
  "level 2": { benar: 0, salah: 0 },
  bonus: { benar: 0, salah: 0 },
};

const uji = (nama, isiUji, tingkat = "wajib") => {
  const penanda = tingkat === "wajib" ? "" : `  [${tingkat.toUpperCase()}]`;
  try {
    isiUji();
    console.log(`  ✅ ${nama}${penanda}`);
    hasil[tingkat].benar++;
  } catch (error) {
    console.log(`  ❌ ${nama}${penanda}`);
    console.log(`     ${error.message}`);
    hasil[tingkat].salah++;
  }
};

const harapkan = (hasil, diharapkan) => {
  if (hasil !== diharapkan) {
    throw new Error(`diharapkan ${JSON.stringify(diharapkan)}, tetapi hasilnya ${JSON.stringify(hasil)}`);
  }
};

// Barang contoh supaya pengujian tidak bergantung pada isi data.js.
const apel = { id: 101, name: "Apel Uji", price: 30000, stok: 5 };
const jeruk = { id: 102, name: "Jeruk Uji", price: 20000, stok: 2 };

// ============================================================
console.log("\nDATA (data.js)");
// ============================================================
uji("produk adalah array berisi minimal 6 object", () => {
  harapkan(Array.isArray(produk), true);
  harapkan(produk.length >= 6, true);
});

uji("setiap produk punya id, name, price, category, stok dengan tipe yang benar", () => {
  produk.forEach((item) => {
    harapkan(typeof item.id, "number");
    harapkan(typeof item.name, "string");
    harapkan(typeof item.price, "number");
    harapkan(typeof item.category, "string");
    harapkan(typeof item.stok, "number");
  });
});

uji("id setiap produk unik (dicek memakai Map)", () => {
  const idTerpakai = new Map();
  produk.forEach((item) => idTerpakai.set(item.id, true));
  harapkan(idTerpakai.size, produk.length);
});

uji("ada minimal satu produk yang stoknya habis (untuk menguji tampilan 'Habis')", () => {
  harapkan(produk.some((item) => item.stok === 0), true);
});

uji("tidak ada data categori selain IMPOR dan LOKAL", () => {
  harapkan(
    produk.some((item) => {
      const kategori = item.category.toLowerCase();
      return kategori !== "impor" && kategori !== "lokal";
    }),
    false,
  );
});
// ============================================================
console.log("\nFUNGSI HELPER (helper.js)");
// ============================================================
uji("sapaByWaktu(8) -> 'Selamat pagi'", () => harapkan(sapaByWaktu(8), "Selamat pagi"));
uji("sapaByWaktu(12) -> 'Selamat siang'", () => harapkan(sapaByWaktu(12), "Selamat siang"));
uji("sapaByWaktu(16) -> 'Selamat sore'", () => harapkan(sapaByWaktu(16), "Selamat sore"));
uji("sapaByWaktu(21) -> 'Selamat malam'", () => harapkan(sapaByWaktu(21), "Selamat malam"));

uji("formatRupiah(32000) -> 'Rp32.000'", () => harapkan(formatRupiah(32000), "Rp32.000"));
uji("formatRupiah() tanpa argumen -> 'Rp0' (parameter default)", () => harapkan(formatRupiah(), "Rp0"));
uji("formatPotongan(5000) -> '-Rp5.000' dan formatPotongan(0) -> 'Rp0'", () => {
  harapkan(formatPotongan(5000), "-Rp5.000");
  harapkan(formatPotongan(0), "Rp0");
});

uji("hitungPersenDiskon: 74.999 -> 0, 75.000 -> 5, 150.000 -> 10", () => {
  harapkan(hitungPersenDiskon(74999), 0);
  harapkan(hitungPersenDiskon(75000), 5);
  harapkan(hitungPersenDiskon(150000), 10);
});

uji("hitungDiskon: 50.000 -> 0, 100.000 -> 5.000, 200.000 -> 20.000", () => {
  harapkan(hitungDiskon(50000), 0);
  harapkan(hitungDiskon(100000), 5000);
  harapkan(hitungDiskon(200000), 20000);
});

uji("buatKupon(10) mengembalikan FUNCTION, dan function itu menghitung 10%", () => {
  const kupon10 = buatKupon(10);
  harapkan(typeof kupon10, "function");
  harapkan(kupon10(200000), 20000);
}, "level 2");

uji("buatKupon(5) dan buatKupon(20) bekerja sendiri-sendiri (closure)", () => {
  const kupon5 = buatKupon(5);
  const kupon20 = buatKupon(20);
  harapkan(kupon5(100000), 5000);
  harapkan(kupon20(100000), 20000);
}, "level 2");

uji("daftarKupon adalah Map: has('HEMAT10') true, has('NGAWUR') false", () => {
  harapkan(daftarKupon instanceof Map, true);
  harapkan(daftarKupon.has("HEMAT10"), true);
  harapkan(daftarKupon.has("NGAWUR"), false);
}, "level 2");

uji("daftarKupon.get('KELAS11A') adalah function yang menghitung 15%", () => {
  harapkan(daftarKupon.get("KELAS11A")(100000), 15000);
}, "level 2");

uji("hitungRingkasan(100.000): diskon 5.000, total 95.000", () => {
  const { diskon, potonganKupon, total } = hitungRingkasan(100000);
  harapkan(diskon, 5000);
  harapkan(potonganKupon, 0);
  harapkan(total, 95000);
});

uji("hitungRingkasan(80.000, kupon 10%): diskon 4.000, kupon 8.000, total 68.000", () => {
  const { diskon, potonganKupon, total } = hitungRingkasan(80000, buatKupon(10));
  harapkan(diskon, 4000);
  harapkan(potonganKupon, 8000);
  harapkan(total, 68000);
}, "level 2");

uji("pembulatan ke bawah kelipatan 100: hitungRingkasan(77.000) -> total 73.100", () => {
  const { pembulatan, total } = hitungRingkasan(77000);
  harapkan(pembulatan, 50);
  harapkan(total, 73100);
});

uji("hitungRingkasan(0) -> semuanya 0", () => {
  const { total, diskon } = hitungRingkasan(0);
  harapkan(total, 0);
  harapkan(diskon, 0);
});

// ============================================================
console.log("\nKERANJANG (keranjang.js) — Map dengan key berupa object produk");
// ============================================================
uji("keranjang awalnya kosong", () => {
  kosongkanKeranjang();
  harapkan(keranjang instanceof Map, true);
  harapkan(keranjang.size, 0);
});

uji("tambahItem pertama: has() true, jumlah 1, mengembalikan true", () => {
  kosongkanKeranjang();
  harapkan(tambahItem(apel), true);
  harapkan(keranjang.has(apel), true);
  harapkan(keranjang.get(apel), 1);
});

uji("tambahItem dua kali pada produk yang sama -> jumlah 2, size tetap 1", () => {
  kosongkanKeranjang();
  tambahItem(apel);
  tambahItem(apel);
  harapkan(keranjang.get(apel), 2);
  harapkan(keranjang.size, 1);
});

uji("tambahItem tidak boleh melebihi stok (stok jeruk = 2)", () => {
  kosongkanKeranjang();
  harapkan(tambahItem(jeruk), true);
  harapkan(tambahItem(jeruk), true);
  harapkan(tambahItem(jeruk), false);
  harapkan(keranjang.get(jeruk), 2);
});

uji("kurangiItem: 2 -> 1, lalu 1 -> item hilang dari keranjang", () => {
  kosongkanKeranjang();
  tambahItem(apel);
  tambahItem(apel);
  kurangiItem(apel);
  harapkan(keranjang.get(apel), 1);
  kurangiItem(apel);
  harapkan(keranjang.has(apel), false);
});

uji("hapusItem membuang item berapa pun jumlahnya", () => {
  kosongkanKeranjang();
  tambahItem(apel);
  tambahItem(apel);
  harapkan(keranjang.has(apel), true);
  hapusItem(apel);
  harapkan(keranjang.has(apel), false);
});

uji("hitungSubtotal: 2 apel (30.000) + 1 jeruk (20.000) = 80.000", () => {
  kosongkanKeranjang();
  tambahItem(apel);
  tambahItem(apel);
  tambahItem(jeruk);
  harapkan(hitungSubtotal(), 80000);
});

uji("hitungJumlahItem: 2 apel + 1 jeruk = 3", () => {
  harapkan(hitungJumlahItem(), 3);
});

uji("hitungSubtotal keranjang kosong = 0", () => {
  kosongkanKeranjang();
  harapkan(hitungSubtotal(), 0);
});

// ============================================================
console.log("\nRIWAYAT (riwayat.js) — [BONUS] push, shift, pop, Array.from, reverse");
// ============================================================
uji("catatPesanan menambah pesanan ke belakang array (push)", () => {
  riwayat.length = 0;
  catatPesanan({ nomor: 1 });
  catatPesanan({ nomor: 2 });
  harapkan(riwayat.length, 2);
  harapkan(riwayat[1].nomor, 2);
}, "bonus");

uji(`riwayat dibatasi ${MAKS_RIWAYAT} pesanan, yang paling lama dibuang (shift)`, () => {
  riwayat.length = 0;
  for (let nomor = 1; nomor <= MAKS_RIWAYAT + 2; nomor++) {
    catatPesanan({ nomor });
  }
  harapkan(riwayat.length, MAKS_RIWAYAT);
  harapkan(riwayat[0].nomor, 3);
}, "bonus");

uji("batalkanPesananTerakhir mengembalikan pesanan terbaru dan membuangnya (pop)", () => {
  riwayat.length = 0;
  catatPesanan({ nomor: 1 });
  catatPesanan({ nomor: 2 });
  harapkan(batalkanPesananTerakhir().nomor, 2);
  harapkan(riwayat.length, 1);
}, "bonus");

uji("batalkanPesananTerakhir pada riwayat kosong -> undefined", () => {
  riwayat.length = 0;
  harapkan(batalkanPesananTerakhir(), undefined);
}, "bonus");

uji("ambilRiwayatTerbaruDulu membalik urutan TANPA mengubah array asli", () => {
  riwayat.length = 0;
  catatPesanan({ nomor: 1 });
  catatPesanan({ nomor: 2 });
  harapkan(ambilRiwayatTerbaruDulu()[0].nomor, 2);
  harapkan(riwayat[0].nomor, 1);
}, "bonus");

// ---------- Ringkasan ----------
console.log("\nRINGKASAN");
let adaYangSalah = false;
Object.keys(hasil).forEach((tingkat) => {
  const { benar, salah } = hasil[tingkat];
  console.log(`  ${tingkat.toUpperCase().padEnd(8)}: ${benar} benar, ${salah} salah`);
  if (salah > 0) {
    adaYangSalah = true;
  }
});
console.log("");
if (adaYangSalah) {
  process.exitCode = 1;
}
