let sistemaVirgem = false;

// Rolar suavemente até a caixa de login
function scrollToLogin() {
  const loginSection = document.getElementById('login-section');
  if (loginSection) {
    loginSection.style.display = 'block';
    aplicarEstadoSistemaVirgem();
    loginSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function fecharLogin() {
  const loginSection = document.getElementById('login-section');
  if (loginSection) {
    loginSection.style.display = 'none';
  }
}

function aplicarEstadoSistemaVirgem() {
  const avisoVirgem = document.getElementById('aviso-sistema-virgem');
  const btnNovoAdmin = document.getElementById('novoAdmin');

  if (sistemaVirgem) {
    if (avisoVirgem) avisoVirgem.style.display = 'block';
    if (btnNovoAdmin) btnNovoAdmin.style.display = 'block';
  } else {
    if (avisoVirgem) avisoVirgem.style.display = 'none';
    if (btnNovoAdmin) btnNovoAdmin.style.display = 'none';
  }
}

async function verificarSistemaVirgem() {
  try {
    const resp = await fetch('/api/admins/status');
    if (!resp.ok) return;
    const data = await resp.json();
    sistemaVirgem = data.sistema_virgem === true;
    aplicarEstadoSistemaVirgem();
  } catch (err) {
    console.error('Erro ao verificar status inicial do sistema:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Controle do Menu Mobile
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Garante que o botão #novoAdmin nunca apareça se já existir administrador cadastrado,
  // mesmo quando o usuário clicar na aba "Administrador"
  const btnNovoAdmin = document.getElementById('novoAdmin');
  if (btnNovoAdmin) {
    const observer = new MutationObserver(() => {
      if (!sistemaVirgem && btnNovoAdmin.style.display !== 'none') {
        btnNovoAdmin.style.display = 'none';
      }
    });
    observer.observe(btnNovoAdmin, { attributes: true, attributeFilter: ['style'] });
  }

  document.getElementById('roleGroup')?.addEventListener('click', () => {
    setTimeout(aplicarEstadoSistemaVirgem, 0);
  });

  verificarSistemaVirgem();
});
