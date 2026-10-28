
const jenisProduk = document.getElementById("jenisProduk");
const merkProduk = document.getElementById("merkProduk");
const hasilProduk = document.getElementById("hasilProduk");

const daftarMerk = {
    desktop: ["ASUS", "Acer", "HP", "Lenovo", "Dell"],
    laptop: ["ASUS", "Acer", "Lenovo", "HP", "Apple"],
    smartphone: ["Samsung", "Apple", "Xiaomi", "OPPO", "Vivo"]
};

jenisProduk.addEventListener("change", function () {
    const jenisDipilih = jenisProduk.value;

    // Reset dropdown merk
    merkProduk.innerHTML = '<option value="">Pilih Merk</option>';
    hasilProduk.hidden = true;

    if (jenisDipilih === "") {
        merkProduk.disabled = true;
        return;
    }

    // Mengambil daftar merk berdasarkan jenis produk
    const merk = daftarMerk[jenisDipilih];

    // Menambahkan pilihan merk ke dropdown
    merk.forEach(function (namaMerk) {
        const option = document.createElement("option");
        option.value = namaMerk;
        option.textContent = namaMerk;
        merkProduk.appendChild(option);
    });

    merkProduk.disabled = false;
});

merkProduk.addEventListener("change", function () {
    const jenis = jenisProduk.options[jenisProduk.selectedIndex].text;
    const merk = merkProduk.value;

    if (merk === "") {
        hasilProduk.hidden = true;
        return;
    }

    hasilProduk.innerHTML = `
        <h3>Produk Dipilih</h3>
        <p><strong>Jenis Produk:</strong> ${jenis}</p>
        <p><strong>Merk:</strong> ${merk}</p>
    `;

    hasilProduk.hidden = false;
});
