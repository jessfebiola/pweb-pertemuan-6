
const daftarNama = [
    "Jessica Febiola",
    "Jessica Iskandar",
    "Vijivika Nala",
    "Verena Tirza",
    "Rafifah Rahma Admayana",
    "Rafifah Nabil Rahmadian",
    "Kezia Livina",
    "Kezia Benyamin",
    "Stephanie Linggawan",
    "Stephani Linggawan",
    "Yuki Kanato",
    "Yuchannie",
    "Aga Manta",
    "Agra Oliver",
    "Arga Yonanta"
];

const inputNama = document.getElementById("nama");
const daftarSaran = document.getElementById("suggestions");
const form = document.getElementById("registrationForm");
const hasil = document.getElementById("hasilRegistrasi");

inputNama.addEventListener("input", function () {
    const kataKunci = inputNama.value.trim().toLowerCase();

    daftarSaran.innerHTML = "";
    hasil.hidden = true;

    if (kataKunci === "") {
        return;
    }

    const namaCocok = daftarNama.filter(function (nama) {
        return nama.toLowerCase().startsWith(kataKunci);
    });

    namaCocok.forEach(function (nama) {
        const tombol = document.createElement("button");

        tombol.type = "button";
        tombol.textContent = nama;
        tombol.classList.add("suggestion-item");

        tombol.addEventListener("click", function () {
            inputNama.value = nama;
            daftarSaran.innerHTML = "";
        });

        daftarSaran.appendChild(tombol);
    });
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = inputNama.value.trim();
    const nim = document.getElementById("nim").value.trim();
    const matkul = document.getElementById("matkul").value;
    const dosen = document.getElementById("dosen").value;

    if (!nama || !nim || !matkul || !dosen) {
        alert("Silakan lengkapi semua data registrasi.");
        return;
    }

    hasil.innerHTML = `
        <h3>Registrasi Berhasil!</h3>
        <p><strong>Nama:</strong> ${nama}</p>
        <p><strong>NIM:</strong> ${nim}</p>
        <p><strong>Mata Kuliah:</strong> ${matkul}</p>
        <p><strong>Dosen:</strong> ${dosen}</p>
    `;

    hasil.hidden = false;
});

form.addEventListener("reset", function () {
    daftarSaran.innerHTML = "";
    hasil.hidden = true;
});
