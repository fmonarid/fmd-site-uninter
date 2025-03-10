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

  // Configuração do IntersectionObserver
  const observerOptions = {
    root: null,
    threshold: 0.5, // 50% da seção visível
  };

  const observer = new IntersectionObserver((entries) => {
    // Filtra as seções que estão visíveis
    const visibleEntries = entries.filter((entry) => entry.isIntersecting);
    if (visibleEntries.length > 0) {
      // Ordena as seções visíveis pela posição do topo (aquela mais próxima do topo vem primeiro)
      visibleEntries.sort(
        (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
      );
      // Atualiza o link ativo para a seção mais próxima do topo
      setActiveLink(visibleEntries[0].target.id);
    }
  }, observerOptions);

  // Observa cada seção
  sections.forEach((section) => observer.observe(section));

  // Listener para garantir que, se o usuário estiver no topo (scrollY < 20), o primeiro link seja ativo
  window.addEventListener("scroll", function () {
    if (window.scrollY < 20) {
      setActiveLink(sections[0].id);
    }
  });

  // Atualiza o link ativo ao clicar
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
