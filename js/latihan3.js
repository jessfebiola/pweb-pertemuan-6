const form = document.getElementById("formRegistrasi");
const hasil = document.getElementById("hasilRegistrasi3");

const nama = document.getElementById("nama");
const alamat = document.getElementById("alamat");
const email = document.getElementById("email");
const password = document.getElementById("password");
const matkul = document.getElementById("matkul");
const kampus = document.getElementById("kampus");
const persetujuan = document.getElementById("persetujuan");

function tampilkanError(id, pesan) {
    document.getElementById(id).textContent = pesan;
}

function hapusError() {
    document.querySelectorAll("#formRegistrasi .error")
        .forEach(function (elemen) {
            elemen.textContent = "";
        });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    hapusError();
    hasil.hidden = true;

    let valid = true;

    if (nama.value.trim() === "") {
        tampilkanError("errorNama", "Nama wajib diisi.");
        valid = false;
    }

    if (alamat.value.trim() === "") {
        tampilkanError("errorAlamat", "Alamat wajib diisi.");
        valid = false;
    }

    const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {
        tampilkanError("errorEmail", "Email wajib diisi.");
        valid = false;
    } else if (!polaEmail.test(email.value.trim())) {
        tampilkanError("errorEmail", "Format email tidak valid.");
        valid = false;
    }

    if (password.value === "") {
        tampilkanError("errorPassword", "Password wajib diisi.");
        valid = false;
    } else if (password.value.length < 8) {
        tampilkanError(
            "errorPassword",
            "Password harus minimal 8 karakter."
        );
        valid = false;
    }

    if (matkul.value === "") {
        tampilkanError("errorMatkul", "Pilih mata kuliah.");
        valid = false;
    }

    if (kampus.value.trim() === "") {
        tampilkanError(
            "errorKampus",
            "Nama perguruan tinggi wajib diisi."
        );
        valid = false;
    }

    if (!persetujuan.checked) {
        tampilkanError(
            "errorPersetujuan",
            "Kamu harus menyetujui informasi di atas."
        );
        valid = false;
    }

    if (!valid) {
        return;
    }

    hasil.innerHTML = `
        <h3>Registrasi Berhasil!</h3>
        <p><strong>Nama:</strong> ${nama.value.trim()}</p>
        <p><strong>Alamat:</strong> ${alamat.value.trim()}</p>
        <p><strong>Email:</strong> ${email.value.trim()}</p>
        <p><strong>Mata Kuliah:</strong> ${matkul.value}</p>
        <p><strong>Perguruan Tinggi:</strong> ${kampus.value.trim()}</p>
        <p class="status-berhasil">
            Semua data berhasil divalidasi.
        </p>
    `;

    hasil.hidden = false;
});

form.addEventListener("reset", function () {
    hapusError();
    hasil.hidden = true;
    hasil.innerHTML = "";
});
