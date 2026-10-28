
const dataWilayah = [
    {
        provinsi: "Jawa Timur",
        kota: "Surabaya",
        kecamatan: "Sukolilo",
        kodePos: "60111"
    },
    {
        provinsi: "Jawa Timur",
        kota: "Surabaya",
        kecamatan: "Gubeng",
        kodePos: "60281"
    },
    {
        provinsi: "Jawa Timur",
        kota: "Malang",
        kecamatan: "Lowokwaru",
        kodePos: "65141"
    },
    {
        provinsi: "Jawa Barat",
        kota: "Bandung",
        kecamatan: "Coblong",
        kodePos: "40132"
    },
    {
        provinsi: "DKI Jakarta",
        kota: "Jakarta Selatan",
        kecamatan: "Kebayoran Baru",
        kodePos: "12110"
    }
];

const provinsi = document.getElementById("provinsi");
const kota = document.getElementById("kota");
const kecamatan = document.getElementById("kecamatan");
const formKodePos = document.getElementById("formKodePos");
const hasil = document.getElementById("hasilKodePos");

function isiDropdown(dropdown, daftar, teksAwal) {
    dropdown.innerHTML = "";

    const pilihanAwal = document.createElement("option");
    pilihanAwal.value = "";
    pilihanAwal.textContent = teksAwal;

    dropdown.appendChild(pilihanAwal);

    daftar.forEach(function (item) {
        const option = document.createElement("option");

        option.value = item;
        option.textContent = item;

        dropdown.appendChild(option);
    });
}

const daftarProvinsi = [...new Set(
    dataWilayah.map(function (wilayah) {
        return wilayah.provinsi;
    })
)];

isiDropdown(provinsi, daftarProvinsi, "Pilih provinsi");

provinsi.addEventListener("change", function () {
    const provinsiDipilih = provinsi.value;

    isiDropdown(kota, [], "Pilih kabupaten/kota");
    isiDropdown(kecamatan, [], "Pilih kecamatan");

    kota.disabled = true;
    kecamatan.disabled = true;
    hasil.hidden = true;

    if (provinsiDipilih === "") {
        return;
    }

    const daftarKota = [...new Set(
        dataWilayah
            .filter(function (wilayah) {
                return wilayah.provinsi === provinsiDipilih;
            })
            .map(function (wilayah) {
                return wilayah.kota;
            })
    )];

    isiDropdown(kota, daftarKota, "Pilih kabupaten/kota");
    kota.disabled = false;
});

kota.addEventListener("change", function () {
    const provinsiDipilih = provinsi.value;
    const kotaDipilih = kota.value;

    isiDropdown(kecamatan, [], "Pilih kecamatan");
    kecamatan.disabled = true;
    hasil.hidden = true;

    if (kotaDipilih === "") {
        return;
    }

    const daftarKecamatan = [...new Set(
        dataWilayah
            .filter(function (wilayah) {
                return wilayah.provinsi === provinsiDipilih &&
                       wilayah.kota === kotaDipilih;
            })
            .map(function (wilayah) {
                return wilayah.kecamatan;
            })
    )];

    isiDropdown(
        kecamatan,
        daftarKecamatan,
        "Pilih kecamatan"
    );

    kecamatan.disabled = false;
});

formKodePos.addEventListener("submit", function (event) {
    event.preventDefault();

    const provinsiDipilih = provinsi.value;
    const kotaDipilih = kota.value;
    const kecamatanDipilih = kecamatan.value;

    const wilayahDitemukan = dataWilayah.find(function (wilayah) {
        return wilayah.provinsi === provinsiDipilih &&
               wilayah.kota === kotaDipilih &&
               wilayah.kecamatan === kecamatanDipilih;
    });

    hasil.innerHTML = "";
    hasil.hidden = false;

    if (wilayahDitemukan) {
        const judul = document.createElement("h3");
        judul.textContent = "Wilayah Ditemukan!";

        const infoWilayah = [
            ["Provinsi", wilayahDitemukan.provinsi],
            ["Kabupaten/Kota", wilayahDitemukan.kota],
            ["Kecamatan", wilayahDitemukan.kecamatan]
        ];

        hasil.appendChild(judul);

        infoWilayah.forEach(function (data) {
            const paragraf = document.createElement("p");
            const label = document.createElement("strong");

            label.textContent = data[0] + ": ";
            paragraf.appendChild(label);
            paragraf.appendChild(document.createTextNode(data[1]));

            hasil.appendChild(paragraf);
        });

        const labelKodePos = document.createElement("p");
        labelKodePos.textContent = "Kode Pos:";

        const kodePos = document.createElement("p");
        kodePos.className = "kode-pos";
        kodePos.textContent = wilayahDitemukan.kodePos;

        hasil.appendChild(labelKodePos);
        hasil.appendChild(kodePos);
    } else {
        hasil.textContent = "Data kode pos tidak ditemukan.";
    }
});

formKodePos.addEventListener("reset", function () {
    setTimeout(function () {
        isiDropdown(provinsi, daftarProvinsi, "Pilih provinsi");
        isiDropdown(kota, [], "Pilih kabupaten/kota");
        isiDropdown(kecamatan, [], "Pilih kecamatan");

        kota.disabled = true;
        kecamatan.disabled = true;
        hasil.hidden = true;
        hasil.innerHTML = "";
    }, 0);
});
