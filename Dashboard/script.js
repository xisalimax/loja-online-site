
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add("show");
        }, 200 * index);
    });
});

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        const titulo = card.querySelector("h3").innerText;
        alert(`Você abriu: ${titulo}`);
    });
});


const navLinks = document.querySelectorAll("header nav ul li a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {

        navLinks.forEach(item => item.classList.remove("active"));

        link.classList.add("active");
    });
});


function carregarConteudo(texto) {
    const main = document.querySelector(".content h1");
    main.innerText = texto;
}

document.querySelectorAll(".card")[1].addEventListener("click", () => {
    carregarConteudo("Acompanhamento de Pedidos");
});

localStorage.setItem("chave", "valor");
const valor = localStorage.getItem("chave");
