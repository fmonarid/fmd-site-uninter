document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav__link");
  const sections = document.querySelectorAll("section");

  function removeActiveClasses() {
    navLinks.forEach((link) => link.classList.remove("nav__link--active"));
  }

  function setActiveLink(id) {
    removeActiveClasses();
    const activeLink = document.querySelector(`.nav__link[href="#${id}"]`);
    if (activeLink) activeLink.classList.add("nav__link--active");
  }

  // Use um array de thresholds e ajuste rootMargin para mobile
  const observerOptions = {
    root: null,
    threshold: [0, 0.25, 0.5, 0.75, 1],
    // Para mobile, "puxe" a área de interseção para cima
    rootMargin: window.innerWidth < 768 ? "0px 0px -40% 0px" : "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    const visibleEntries = entries.filter((entry) => entry.isIntersecting);
    if (visibleEntries.length > 0) {
      // Seleciona a entrada com maior interseção
      let bestEntry = visibleEntries.reduce((prev, current) => {
        return prev.intersectionRatio > current.intersectionRatio
          ? prev
          : current;
      });
      setActiveLink(bestEntry.target.id);
    }
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // Força o primeiro link ativo se o scroll estiver perto do topo
  window.addEventListener("scroll", function () {
    if (window.scrollY < 50) {
      setActiveLink(sections[0].id);
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      removeActiveClasses();
      this.classList.add("nav__link--active");
    });
  });
});

/* 
Smooth Scroll
Script para substituir o scroll-behavior: smooth no CSS, pois não funciona corretamente
*/
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Formulário de contato
document
  .getElementById("contact__form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Impede o envio real do formulário

    // Validação dos campos
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !email || !mensagem) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um email válido.");
      return;
    }

    // Mostrar modal de sucesso
    document.getElementById("contact__modal").style.display = "block";

    // Limpar formulário
    this.reset();
  });

// Função para fechar o modal
function closeModal() {
  document.getElementById("contact__modal").style.display = "none";
}

// Fechar modal ao clicar fora dele
window.onclick = function (event) {
  const modal = document.getElementById("contact__modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};
