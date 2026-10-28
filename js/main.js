
console.log("Selamat datang di JavaScript Practice!");

const menuCards = document.querySelectorAll(".menu-card");
menuCards.forEach(function (card) {
    card.addEventListener("click", function () {
        const namaLatihan = card.querySelector("h3").textContent;

        console.log("Kamu memilih: " + namaLatihan);
    });
});
