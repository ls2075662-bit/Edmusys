let sistemaVirgem = false;

const EYE_OPEN_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_OFF_SVG  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';

function isModoAdminAtivo() {
  const btnAdmin = document.getElementById('btn-administrador');
  const adminFields = document.getElementById('adminLoginFields');
  return Boolean(
    (btnAdmin && btnAdmin.classList.contains('on')) ||
    (adminFields && adminFields.style.display !== 'none')
  );
}

function isCpfOuEmailValido(valor) {
  const v = (valor || '').trim();
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const digitosCpf = v.replace(/\D/g, '');
  const isCpf = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/.test(v) && digitosCpf.length === 11;
  return isEmail || isCpf;
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

  // Bloqueia login por nome: exige CPF (11 dígitos) ou E-mail em Admin, Professor e Aluno
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      const modoAdmin = isModoAdminAtivo();
      const identificador = (modoAdmin
        ? document.getElementById('adminUser')?.value
        : document.getElementById('userLogin')?.value || ''
      ).trim();
      const senha = modoAdmin
        ? document.getElementById('adminPass')?.value || ''
        : document.getElementById('userPassword')?.value || '';

      if (!identificador || !senha) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (loginError) {
          loginError.textContent = 'Preencha seu CPF ou e-mail e sua senha.';
          loginError.style.display = 'block';
        }
        return;
      }

      if (!isCpfOuEmailValido(identificador)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (loginError) {
          loginError.textContent = 'Acesso permitido apenas com CPF (11 dígitos) ou e-mail válido.';
          loginError.style.display = 'block';
        }
      }
    }, true);
  }

  // Alternar visibilidade da senha nos logins de Administrador, Professor e Aluno
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.toggle-pass-btn');
    if (!btn) return;
    const container = btn.closest('.icontainer');
    const input = container ? container.querySelector('input') : null;
    if (!input) return;

    const mostrar = input.type === 'password';
    input.type = mostrar ? 'text' : 'password';
    btn.innerHTML = mostrar ? EYE_OFF_SVG : EYE_OPEN_SVG;
    btn.setAttribute('aria-label', mostrar ? 'Ocultar senha' : 'Mostrar senha');
  });

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
