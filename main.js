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
