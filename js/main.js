// main.js — urusan TAMPILAN (DOM) dan EVENT saja.
// Hitung-hitungan ada di helper.js dan keranjang.js, data ada di data.js.
//
// Alur kerja halaman ini selalu sama:
//   1. data berubah (tambah ke nota, ganti kategori, dst.)
//   2. panggil fungsi render...()  -> HTML dibangun ulang dari data
//   3. pasang addEventListener pada tombol yang baru dibuat
//
// Tanda di file ini:
//   [DISEDIAKAN]  sudah ditulis guru. Baca, pahami, boleh ditanyakan.
//   [TODO]        bagian yang HARUS kamu tulis. Ada petunjuk bertahap di komentarnya.

// ============================================================
// 1. IMPORT (ES Module) [DISEDIAKAN]
// ============================================================
// MATERI: named import, default import, dan "import * as" -> modularisasi/main.mjs
import { produk } from "./data.js";
import {
  formatRupiah,
  formatPotongan,
  sapaByWaktu,
  hitungPersenDiskon,
  hitungRingkasan,
  jamSekarang,
  daftarKupon,
  BATAS_DISKON_SEDANG,
  BATAS_DISKON_TINGGI,
} from "./helper.js";
import keranjang, {
  tambahItem,
  kurangiItem,
  hapusItem,
  kosongkanKeranjang,
  hitungSubtotal,
  hitungJumlahItem,
} from "./keranjang.js";
import * as riwayat from "./riwayat.js";

// ============================================================
// 2. MEMEGANG ELEMEN (DOM) [DISEDIAKAN]
// ============================================================
// MATERI: querySelector -> dom/index.html. Setiap id di bawah ada di index.html (lihat "PETA ID" di sana).
const sapaan = document.querySelector("#sapaan");
const papanInfo = document.querySelector("#papan-info");
const tombolTema = document.querySelector("#tombol-tema");
const badgeNota = document.querySelector("#badge-nota");

const pilihKategori = document.querySelector("#pilih-kategori");
const pilihUrutan = document.querySelector("#pilih-urutan");
const jumlahHasil = document.querySelector("#jumlah-hasil");
const katalog = document.querySelector("#katalog");

const notaKosong = document.querySelector("#nota-kosong");
const daftarNota = document.querySelector("#daftar-nota");
const teksSubtotal = document.querySelector("#subtotal");
const labelDiskon = document.querySelector("#label-diskon");
const teksDiskon = document.querySelector("#diskon");
const teksPotonganKupon = document.querySelector("#potongan-kupon");
const teksPembulatan = document.querySelector("#pembulatan");
const teksTotal = document.querySelector("#total");

const inputKupon = document.querySelector("#input-kupon");
const tombolKupon = document.querySelector("#tombol-kupon");
const pesanKupon = document.querySelector("#pesan-kupon");
const inputBayar = document.querySelector("#input-bayar");
const teksKembalian = document.querySelector("#kembalian");
const tombolBayar = document.querySelector("#tombol-bayar");

const riwayatKosong = document.querySelector("#riwayat-kosong");
const daftarRiwayat = document.querySelector("#daftar-riwayat");
const tombolBatal = document.querySelector("#tombol-batal");

const toast = document.querySelector("#toast");

// ============================================================
// 3. STATE (data yang berubah selama halaman terbuka) [DISEDIAKAN]
// ============================================================
let kategoriAktif = "Semua";
let urutanAktif = "asli";
let kodeKupon = ""; // "" artinya belum ada kupon yang dipakai
let nomorPesanan = 1;
let timerToast;

// ============================================================
// 4. FUNGSI KECIL PEMBANTU [DISEDIAKAN]
// ============================================================

// MATERI: first-class function — setTimeout menerima FUNCTION sebagai parameter.
function tampilkanToast(pesan) {
  toast.textContent = pesan;
  toast.className = "toast tampil";
  clearTimeout(timerToast);
  timerToast = setTimeout(() => {
    toast.className = "toast";
  }, 2400);
}

function loncatkanBadge() {
  badgeNota.className = "badge loncat";
  setTimeout(() => {
    badgeNota.className = "badge";
  }, 350);
}

// Ringkasan dihitung ulang setiap dibutuhkan, tidak disimpan di variabel,
// supaya tidak pernah "basi" (berbeda dengan isi nota yang sebenarnya).
// daftarKupon.get("") -> undefined -> parameter default di hitungRingkasan yang dipakai.
const ambilRingkasan = () =>
  hitungRingkasan(hitungSubtotal(), daftarKupon.get(kodeKupon));

// ============================================================
// 5. RENDER: papan info di bagian atas [TODO — LANGKAH 5.1]
// ============================================================
// Tujuan: mengisi <ul id="papan-info"> dengan 3 stiker (lihat struktur .stiker di style.css):
//     <li class="stiker"><strong>Diskon 5%</strong><span>belanja mulai Rp75.000</span></li>
//     <li class="stiker"><strong>Diskon 10%</strong><span>belanja mulai Rp150.000</span></li>
//     <li class="stiker"><strong>Kode kupon</strong><span>HEMAT5, HEMAT10, KELAS11A</span></li>
// Syaratnya: angka 5, 10, dan batas rupiah TIDAK boleh ditulis manual. Ambil dari fungsi dan
// konstanta di helper.js (hitungPersenDiskon, formatRupiah, BATAS_DISKON_...), dan daftar kode
// kupon diambil dari daftarKupon (petunjuk: Array.from(daftarKupon.keys()).join(", ")).
// Gunakan template literal (`...${...}...`) dan papanInfo.innerHTML = ...
function renderPapanInfo() {
  // TODO
}

// ============================================================
// 6. RENDER: katalog buah [TODO — LANGKAH 2.2 dan 2.3]
// ============================================================

// buatKartu(item) mengembalikan STRING HTML satu kartu produk.
// Struktur HTML-nya sama persis dengan kartu contoh statis di index.html (salin strukturnya,
// lalu ganti nilai-nilai tetap dengan ${...} dari object item).
// Yang harus berubah mengikuti data:
//   - className kartu : "kartu" jika stok > 0, "kartu habis" jika stok 0  (ternary)
//   - style="--warna: ${warna}"
//   - foto            : src=${gambar}, alt=${name}, serta id="gambar-${id}"
//   - harga           : formatRupiah(price)
//   - info stok       : "Habis" jika stok 0, "Tinggal N kg" jika stok <= 5, selain itu "Stok N kg"
//   - tombol tambah   : id="tambah-${id}", atribut disabled jika stok habis, teks "Stok habis" jika habis
//   - tombol "Ganti warna" HANYA muncul jika item punya gambarAlt (id="ganti-${id}")  [BONUS]
// MATERI: object destructuring -> const { id, name, price, ... } = item;   (struktur-data/object.js)
const buatKartu = (item) => {
  const { id, name, price, category, stok, gambar, gambarAlt, warna } = item;
  const isAvailable = stok > 0;
  const labelStok = !isAvailable
    ? "Habis"
    : stok <= 5
      ? `Tinggal ${stok} lagi`
      : `Stok ${stok} kg`;

  const tombolGanti = gambarAlt
    ? `<button id="ganti-${id}" class="ganti-warna" type="button">Ganti warna</button>`
    : "";

  const labelNota = isAvailable ? "Tambah ke Nota" : "Stok Habis";
  return `
  <article class="kartu" style="--warna: ${warna}">
              <div class="kartu-foto">
                <img id="gambar-${id}" src="${gambar}" alt="${name}" width="200" height="200">
                ${tombolGanti}
                <span class="harga-tag">${formatRupiah(price)}<small>/kg</small></span>
              </div>
              <div class="kartu-isi">
                <h3>${name}</h3>
                <p class="kartu-info">
                  <span>${category}</span>
                  <span>${labelStok}</span>
                </p>
                <button id="tambah-${id}" class="tombol tombol-hijau tombol-lebar" type="button" ${isAvailable ? "" : "disabled"}>${labelNota}</button>
              </div>
            </article>
  `;
};

function renderKatalog() {
  // TODO Langkah A: salin array produk -> let daftar = Array.from(produk);
  //                 (jangan sort/filter array aslinya)
  // TODO Langkah B: susun HTML. Buat let html = ""; lalu daftar.forEach((item) => { html += buatKartu(item); });
  //                 lalu katalog.innerHTML = html;
  // TODO Langkah C: isi jumlahHasil.textContent, contoh "6 jenis buah ditampilkan"
  // TODO Langkah D (dikerjakan nanti di LANGKAH 3.3, bukan sekarang): pasang event klik pada tombol "tambah-<id>" setiap produk.
  //                 Tombolnya BARU ada setelah innerHTML diisi, jadi pemasangan event harus setelah itu.
  //                 daftar.forEach((item) => {
  //                   document.querySelector(`#tambah-${item.id}`).addEventListener("click", () => { tambahKeNota(item); });
  //                 });
  //
  // BONUS (Pertemuan 5), tambahkan SEBELUM langkah B:
  //   - filter kategori : jika kategoriAktif bukan "Semua", daftar = daftar.filter((item) => item.category === kategoriAktif)
  //   - urutkan         : daftar.sort((a, b) => a.price - b.price)   (murah ke mahal; untuk "mahal" balik a dan b)
  //   - tombol "Ganti warna" : tukar gambar dan gambarAlt dengan array destructuring, lalu ubah img.src

  let daftar = Array.from(produk);

  let html = "";

  daftar.forEach((item) => {
    html += buatKartu(item);
  });

  katalog.innerHTML = html;
  jumlahHasil.textContent = `${daftar.length} jenis buath yang tampil`;

}

// ============================================================
// 7. RENDER: nota belanja (keranjang) [TODO — LANGKAH 3.2 dan 4.3]
// ============================================================
function tambahKeNota(item) {
  // TODO (Langkah 3.2):
  //   1. const berhasil = tambahItem(item);
  //   2. jika berhasil: tampilkanToast(`${item.name} ditambahkan ke nota.`) dan loncatkanBadge()
  //      jika gagal   : tampilkanToast(`Stok ${item.name} tinggal ${item.stok} kg, tidak bisa ditambah lagi.`)
  //   3. renderNota();
}

function renderNota() {
  // TODO Langkah 3.2 — daftar item:
  //   a. badgeNota.textContent = hitungJumlahItem();
  //   b. notaKosong.className = keranjang.size === 0 ? "nota-kosong" : "nota-kosong sembunyi";
  //   c. bangun HTML tiap baris dengan keranjang.forEach((jumlah, item) => { ... })   <- urutan parameter: (value, key)!
  //      Struktur satu baris (lihat CSS .baris-nota): foto kecil, nama + "Rp... x N kg", tombol - [jumlah] +,
  //      subtotal baris (item.price * jumlah), dan tombol Hapus.
  //      Beri tiap tombol id unik: kurang-${item.id}, tambah-nota-${item.id}, hapus-${item.id}
  //      Tombol + dinonaktifkan jika jumlah >= item.stok: tambahkan atribut  disabled  secara kondisional (ternary).
  //   d. daftarNota.innerHTML = html;
  //   e. pasang event klik untuk tiap tombol tadi (keranjang.forEach lagi, sama seperti renderKatalog langkah D):
  //        kurang -> kurangiItem(item); renderNota();
  //        tambah -> tambahKeNota(item);
  //        hapus  -> hapusItem(item); renderNota();
  //
  // TODO Langkah 4.3 — ringkasan harga:
  //   f. const { subtotal, persenDiskon, diskon, potonganKupon, pembulatan, total } = ambilRingkasan();
  //   g. isi teksSubtotal, teksDiskon, teksPotonganKupon, teksPembulatan, teksTotal dengan .textContent
  //      (gunakan formatRupiah untuk subtotal dan total, formatPotongan untuk yang berupa potongan)
  //   h. labelDiskon.textContent: "Diskon 5%" jika persenDiskon > 0, selain itu "Diskon"
  //   i. panggil renderKembalian() di baris terakhir
}

function renderKembalian() {
  // TODO (Langkah 4.3):
  //   1. const { total } = ambilRingkasan();
  //   2. jika keranjang kosong ATAU inputBayar.value === "": kosongkan teksKembalian (textContent = "", className = "pesan") lalu return
  //   3. const bayar = Number(inputBayar.value);   <- KONVERSI EKSPLISIT. Kenapa wajib? (lihat konversi-eksplisit.js)
  //   4. jika bayar >= total: "Kembalian Rp..." dengan className "pesan ok"
  //      selain itu         : "Uang kurang Rp..." dengan className "pesan salah"
}

// ============================================================
// 8. RENDER: riwayat pesanan [BONUS — LANGKAH 5.2]
// ============================================================
function renderRiwayat() {
  // TODO (bonus). Petunjuk:
  //   - const daftar = riwayat.ambilRiwayatTerbaruDulu();
  //   - riwayatKosong.className = daftar.length === 0 ? "redam" : "redam sembunyi";
  //   - tombolBatal.disabled = daftar.length === 0;
  //   - bangun <li class="riwayat-baris"> berisi nomor, "N jenis, N kg, pukul ..." dan total
  //     (struktur: lihat .riwayat-baris di style.css)
}

// ============================================================
// 9. EVENT: kontrol di luar kartu dan nota [TODO]
// ============================================================
// Pola umum:   elemen.addEventListener("jenis-event", () => { ... });   (lihat dom/event.html)

// TODO (Langkah 5.2, BONUS) pilihKategori dan pilihUrutan: event "change".
//   Isi kategoriAktif / urutanAktif dari .value, lalu renderKatalog().

// TODO (Langkah 5.1) tombolTema: event "click".
//   const sedangGelap = document.body.className === "gelap";
//   document.body.className = sedangGelap ? "" : "gelap";
//   tombolTema.textContent = sedangGelap ? "Mode gelap" : "Mode terang";

// TODO (Langkah 4.5, LEVEL 2) tombolKupon: event "click".
//   const kode = inputKupon.value.trim().toUpperCase();   (trim dan toUpperCase: method string)
//   jika daftarKupon.has(kode): kodeKupon = kode; pesanKupon.textContent = `Kupon ${kode} dipakai.`; className "pesan ok"
//   selain itu: kodeKupon = ""; pesan "Kode kupon tidak dikenal. Periksa lagi kodenya."; className "pesan salah"
//   lalu renderNota();

// TODO (Langkah 4.3) inputBayar: event "input" -> panggil renderKembalian.
//   Tips: inputBayar.addEventListener("input", renderKembalian);   <- TANPA tanda kurung. Kenapa?

// TODO (Langkah 4.4) tombolBayar: event "click".
//   1. jika keranjang.size === 0: tampilkanToast("Nota masih kosong. Tambahkan buah dulu."); return;
//   2. const ringkasan = ambilRingkasan(); const bayar = Number(inputBayar.value);
//   3. jika bayar < ringkasan.total: tampilkanToast(`Uang kurang ${formatRupiah(ringkasan.total - bayar)}.`); return;
//   4. buat object pesanan = { nomor: nomorPesanan, jam: jamSekarang(), items: Array.from(keranjang), ringkasan, bayar }
//   5. kurangi stok: keranjang.forEach((jumlah, item) => { item.stok -= jumlah; });
//   6. nomorPesanan++;   (WAJIB)     dan     riwayat.catatPesanan(pesanan);   (BONUS, Langkah 5.2)
//   7. reset: kosongkanKeranjang(); kodeKupon = ""; inputKupon.value = ""; pesanKupon.textContent = ""; inputBayar.value = "";
//   8. renderKatalog(); renderNota(); renderRiwayat();
//   9. tampilkanToast(`Pesanan #${pesanan.nomor} dibayar. Kembalian ${formatRupiah(bayar - ringkasan.total)}.`);

// TODO (BONUS, Langkah 5.2) tombolBatal: event "click".
//   const pesanan = riwayat.batalkanPesananTerakhir();
//   jika pesanan === undefined: toast "Belum ada pesanan yang bisa dibatalkan." lalu return
//   kembalikan stok: pesanan.items.forEach(([item, jumlah]) => { item.stok += jumlah; });   <- destructuring di parameter
//   renderKatalog(); renderRiwayat(); toast "Pesanan #N dibatalkan. Stok dikembalikan."

// ============================================================
// 10. MULAI [TODO — LANGKAH 2.3, dilengkapi di 5.1 dan 5.2]
// ============================================================
function mulai() {
  // TODO Langkah 2.3 : panggil renderKatalog() dan renderNota()
  renderKatalog();
  // TODO Langkah 5.1 : tambahkan  sapaan.textContent = sapaByWaktu(new Date().getHours()) + "!";  dan  renderPapanInfo()
  // TODO Langkah 5.2 : tambahkan renderRiwayat()  (bonus)
}

mulai();
