// Rolar suavemente até a caixa de login
function scrollToLogin() {
    const loginSection = document.getElementById('login-section');
    if (loginSection) {
      loginSection.style.display = 'block';
      loginSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  function fecharLogin() {
    const loginSection = document.getElementById('login-section');
    if (loginSection) {
      loginSection.style.display = 'none'; // Oculta a caixinha
    }
  }
  // Controle do Menu Mobile
  document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
  
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }
  });
