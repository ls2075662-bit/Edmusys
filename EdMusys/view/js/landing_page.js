let sistemaVirgem = false;

function isModoAdminAtivo() {
  const btnAdmin = document.getElementById('btn-administrador');
  const adminFields = document.getElementById('adminLoginFields');
  return Boolean(
    (btnAdmin && btnAdmin.classList.contains('on')) ||
    (adminFields && adminFields.style.display !== 'none')
  );
}

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
  const exibir = sistemaVirgem && isModoAdminAtivo();

  if (avisoVirgem) avisoVirgem.style.display = exibir ? 'block' : 'none';
  if (btnNovoAdmin) btnNovoAdmin.style.display = exibir ? 'block' : 'none';
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

  // Impede que o botão #novoAdmin apareça fora da aba Administrador ou quando já houver admin cadastrado
  const btnNovoAdmin = document.getElementById('novoAdmin');
  if (btnNovoAdmin) {
    const observer = new MutationObserver(() => {
      const podeExibir = sistemaVirgem && isModoAdminAtivo();
      if (!podeExibir && btnNovoAdmin.style.display !== 'none') {
        btnNovoAdmin.style.display = 'none';
      }
    });
    observer.observe(btnNovoAdmin, { attributes: true, attributeFilter: ['style'] });
  }

  // Atualiza automaticamente sempre que a aba Administrador for ativada ou desativada
  const btnAdmin = document.getElementById('btn-administrador');
  if (btnAdmin) {
    const tabObserver = new MutationObserver(aplicarEstadoSistemaVirgem);
    tabObserver.observe(btnAdmin, { attributes: true, attributeFilter: ['class'] });
  }

  document.getElementById('roleGroup')?.addEventListener('click', () => {
    setTimeout(aplicarEstadoSistemaVirgem, 0);
  });

  verificarSistemaVirgem();
});
