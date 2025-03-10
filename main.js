// document.documentElement.classList.toggle('dark');

// Verifica a preferência do sistema e aplica automaticamente
// if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
//     document.documentElement.classList.add("dark");
//   }
  
//   // Alterna manualmente o tema ao clicar em um botão
//   document.getElementById("themeToggle").addEventListener("click", function () {
//     document.documentElement.classList.toggle("dark");
//   });


// Manipulação do formulário de contato
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validação dos campos
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
    
    if (!nome || !email || !mensagem) {
        alert('Por favor, preencha todos os campos.');
        return;
    }
    
    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }
    
    // Mostrar modal de sucesso
    document.getElementById('success-modal').style.display = 'block';
    
    // Limpar formulário
    this.reset();
});

// Fechar modal
function closeModal() {
    document.getElementById('success-modal').style.display = 'none';
}

// Fechar modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('success-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Adicionar classe active ao link da seção atual
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.side-menu nav a');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - sectionHeight/3)) {
            const currentSection = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === currentSection) {
                    link.classList.add('active');
                }
            });
        }
    });
});