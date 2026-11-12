const ICON = {
  music:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.7 2Z"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
  calendar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  students:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/></svg>',
  cash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/></svg>',
  tag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m20.6 13.4-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="7.5" r="1.2"/></svg>',
  logout:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>',
  menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
};

const DIAS = ['Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
const PLANOS = {1:{label:'1x / semana',valor:60},2:{label:'2x / semana',valor:120},3:{label:'3x / semana',valor:180}};

const esc = s => String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ini = n => n.trim().split(/\s+/).slice(0,2).map(w=>w[0]||'').join('').toUpperCase();
const maskPhone = v => {
  let d=(v||'').replace(/\D/g,'').slice(0,11);
  if(d.length>10) return d.replace(/(\d{2})(\d{5})(\d{0,4})/,(_,a,b,c)=>c?`(${a}) ${b}-${c}`:`(${a}) ${b}`);
  if(d.length>6)  return d.replace(/(\d{2})(\d{4})(\d{0,4})/,(_,a,b,c)=>c?`(${a}) ${b}-${c}`:`(${a}) ${b}`);
  if(d.length>2)  return d.replace(/(\d{2})(\d*)/,(_,a,b)=>b?`(${a}) ${b}`:`(${a}`);
  return d.length?`(${d}`:'';
};

// ── TEMA ESCURO (SINCRONIZADO COM INDEX.HTML) ───────────────────
function aplicarTemaSalvo() {
  const isDark = localStorage.getItem('theme') === 'dark';
  document.body.classList.toggle('dark-mode', isDark);
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  atualizarBotaoTema();
}

function atualizarBotaoTema() {
  const isDark = document.body.classList.contains('dark-mode');
  const iconEl = document.getElementById('theme-toggle-icon');
  const textEl = document.getElementById('theme-toggle-text');
  if (iconEl) iconEl.textContent = isDark ? '☀️' : '🌙';
  if (textEl) textEl.textContent = isDark ? 'Modo Claro' : 'Modo Escuro';
}

aplicarTemaSalvo();

// ── DADOS DA SESSÃO E ARMAZENAMENTO ─────────────────────────────
let alunos = JSON.parse(localStorage.getItem("edmusys_alunos")) || [];
let professores = JSON.parse(localStorage.getItem("edmusys_professores")) || [];
let horarios = JSON.parse(localStorage.getItem("edmusys_horarios")) || [];

async function sincronizarDadosDoBanco() {
  const token = localStorage.getItem("edmusys_token");
  if (!token) return;
  try {
    const headers = { "Authorization": `Bearer ${token}` };
    const [rAlunos, rProfs, rAgend] = await Promise.all([
      fetch("/api/alunos", { headers }),
      fetch("/api/professores", { headers }),
      fetch("/api/agendamentos", { headers })
    ]);
    if (rAlunos.ok && rProfs.ok && rAgend.ok) {
      const [listaAlunos, listaProfs, listaAgend] = await Promise.all([
        rAlunos.json(),
        rProfs.json(),
        rAgend.json()
      ]);
      const pagamentosLocal = JSON.parse(localStorage.getItem("edmusys_pagamentos")) || {};
      alunos = (listaAlunos || []).map(a => {
        const idStr = String(a.id_aluno || a.id);
        return {
          id: idStr,
          nome: a.nome,
          instrumento: a.instrumento || "A definir",
          telefone: a.telefone || "",
          email: a.email || "",
          nascimento: a.data_nascimento || a.dataNascimento || "",
          plano: Number(a.plano) || 1,
          pago: Boolean(pagamentosLocal[idStr] ?? a.pago ?? false)
        };
      });
      professores = (listaProfs || []).map(p => ({
        id: String(p.id_professor || p.id),
        nome: p.nome,
        instrumento: p.especialidade || p.instrumento || "A definir",
        telefone: p.telefone || "",
        email: p.email || "",
        nascimento: p.data_nascimento || p.dataNascimento || ""
      }));
      horarios = (listaAgend || []).map(h => ({
        id: String(h.id_agendamento || h.id),
        dia: h.dia,
        hora: h.hora,
        instrumento: h.instrumento,
        alunoId: String(h.id_aluno || h.alunoId),
        professorId: String(h.id_professor || h.professorId)
      }));
      render();
    }
  } catch (e) {
    console.warn("Usando cache local:", e);
  }
}

function sidebarAluno(activeTab) {
  return `<aside class="sidebar" id="sidebar">
    <button class="brand-btn" onclick="goHome()">
      <span class="mark">${ICON.music}</span>
      <span class="name">EdMusys</span>
    </button>
    <nav class="nav-group">
      <button class="nav-btn ${activeTab==='agenda'?'active':''}" onclick="showTab('agenda')">${ICON.calendar} Minha Agenda</button>
      <button class="nav-btn ${activeTab==='professor'?'active':''}" onclick="showTab('professor')">${ICON.user} Meu Professor</button>
      <button class="nav-btn ${activeTab==='pagamento'?'active':''}" onclick="showTab('pagamento')">${ICON.cash} Pagamento</button>
      <button class="nav-btn ${activeTab==='perfil'?'active':''}" onclick="showTab('perfil')">${ICON.tag} Meu Perfil</button>
    </nav>
    <div class="sidebar-foot">
      <button class="logout-btn" onclick="doLogout()">${ICON.logout} Sair</button>
    </div>
  </aside>`;
}

function goHome(){ window.location.href='landing_page_edmusys.html'; }
function doLogout(){
  localStorage.removeItem("edmusys_aluno_logado");
  localStorage.removeItem("edmusys_token");
  localStorage.removeItem("edmusys_role");
  localStorage.removeItem("edmusys_user");
  window.location.href = "landing_page_edmusys.html";
}
function toggleSidebar(){
  const sb = document.getElementById('sidebar');
  if (sb) sb.classList.toggle('open');
}

let currentAlunoId = null;
let currentTab = 'agenda';
let selectedDay = 'Segunda';

const alunoLogado = JSON.parse(localStorage.getItem("edmusys_aluno_logado")) || JSON.parse(localStorage.getItem("edmusys_user"));

function doLogin() {
  if (!alunoLogado) {
    window.location.href = "landing_page_edmusys.html";
    return;
  }

  let alunoEncontrado = alunos.find(aluno => String(aluno.id) === String(alunoLogado.id) || aluno.email === alunoLogado.email);

  if (!alunoEncontrado) {
    alunoEncontrado = {
      id: alunoLogado.id,
      nome: alunoLogado.nome || "Aluno",
      email: alunoLogado.email || "",
      instrumento: alunoLogado.instrumento || "A definir",
      plano: Number(alunoLogado.plano) || 1,
      pago: Boolean(alunoLogado.pago ?? false),
      telefone: alunoLogado.telefone || ""
    };
    alunos.push(alunoEncontrado);
  }

  currentAlunoId = alunoEncontrado.id;

  const appElem = document.getElementById('app');
  if (appElem) appElem.classList.remove('hidden');

  render();
  showPaymentStatusPopup(alunoEncontrado);
  sincronizarDadosDoBanco();
}

if (!alunoLogado) {
  window.location.href = "landing_page_edmusys.html";
} else {
  doLogin();
}

function showPaymentStatusPopup(aluno) {
  const plano = PLANOS[aluno.plano] || { label: '1x / semana', valor: 60 };
  const isPago = aluno.pago;
  const isDark = document.body.classList.contains('dark-mode');

  const statusColor = isPago ? '#2E7D32' : '#E5484D';
  const statusBg = isPago
    ? (isDark ? 'rgba(63, 178, 94, 0.16)' : '#E8F5E9')
    : (isDark ? 'rgba(229, 72, 77, 0.16)' : '#FFEBEE');
  const statusLabel = isPago ? 'Mensalidade paga' : 'Mensalidade pendente';
  const statusDesc = isPago 
    ? 'Obrigado! Seu pagamento foi confirmado pelo administrador.' 
    : 'Identificamos uma pendência na sua mensalidade. Por favor, entre em contato com a escola para regularizar.';

  const popupHTML = `
  <div id="pay-popup-overlay" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.65);display:flex;align-items:center;justify-content:center;z-index:9999;padding:20px;">
    <div class="pay-popup-card">
      <div class="pay-popup-head">
        <h3 style="margin:0;font-family:var(--font-display);font-size:20px;color:var(--text-main);">Status da Mensalidade</h3>
        <button onclick="closePaymentPopup()" style="background:none;border:none;font-size:22px;cursor:pointer;color:var(--text-sub);">✕</button>
      </div>
      <div style="padding:24px;">
        <div style="background:${statusBg};border-radius:12px;padding:18px 20px;display:flex;align-items:center;gap:14px;margin-bottom:20px;border:1px solid ${statusColor}44;">
          <div class="pay-status-icon" style="background:${statusColor};">
            ${isPago ? '✓' : '!'}
          </div>
          <div>
            <div style="font-size:17px;font-weight:700;color:${statusColor};">${statusLabel}</div>
            <div style="font-size:13.5px;color:var(--text-sub);margin-top:2px;">${statusDesc}</div>
          </div>
        </div>

        <div class="pay-popup-grid">
          <div><div style="font-size:11px;color:var(--text-sub);text-transform:uppercase;">Plano Atual</div><div style="font-weight:700;font-size:14px;color:var(--text-main);">${esc(plano.label)}</div></div>
          <div><div style="font-size:11px;color:var(--text-sub);text-transform:uppercase;">Valor Mensal</div><div style="font-weight:800;font-size:18px;color:var(--text-main);">R$ ${plano.valor}</div></div>
          <div><div style="font-size:11px;color:var(--text-sub);text-transform:uppercase;">Instrumento</div><div style="font-weight:600;font-size:14px;color:var(--text-main);">${esc(aluno.instrumento)}</div></div>
          <div><div style="font-size:11px;color:var(--text-sub);text-transform:uppercase;">Aulas por Semana</div><div style="font-weight:600;font-size:14px;color:var(--text-main);">${aluno.plano}x / semana</div></div>
        </div>
      </div>
      <div class="pay-popup-foot">
        <button onclick="closePaymentPopup()" class="btn btn-gold" style="padding:10px 24px;border-radius:8px;font-weight:700;cursor:pointer;background:#F0B90B;border:none;color:#121110;">Entendi</button>
      </div>
    </div>
  </div>`;

  const div = document.createElement('div');
  div.id = 'pay-popup-root';
  div.innerHTML = popupHTML;
  document.body.appendChild(div);
}

function closePaymentPopup() {
  const el = document.getElementById('pay-popup-root');
  if (el) el.remove();
}

function showTab(t) { currentTab = t; render(); }

function render() {
  const aluno = alunos.find(a => String(a.id) === String(currentAlunoId) || (alunoLogado && a.email === alunoLogado.email));
  if (!aluno) return;
  currentAlunoId = aluno.id;

  const myHorarios = horarios.filter(h => String(h.alunoId) === String(aluno.id));
  const myProfIds = [...new Set(myHorarios.map(h => h.professorId))];
  const myProfs = myProfIds.map(id => professores.find(p => String(p.id) === String(id))).filter(Boolean);

  let viewHTML = '';
  let title = '', sub = '';
  if (currentTab === 'agenda') { viewHTML = renderAgenda(aluno, myHorarios, myProfs); title='Minha Agenda'; sub='Seus dias e horários de aula'; }
  else if (currentTab === 'professor') { viewHTML = renderProfessor(aluno, myHorarios, myProfs); title='Meu Professor'; sub='Informações do seu professor'; }
  else if (currentTab === 'pagamento') { viewHTML = renderPagamento(aluno); title='Pagamento'; sub='Status da sua mensalidade'; }
  else { viewHTML = renderPerfil(aluno, myHorarios, myProfs); title='Meu Perfil'; sub='Seus dados cadastrais'; }

  const isDark = document.body.classList.contains('dark-mode');

  document.getElementById('shell').innerHTML = `
    <div class="app">
      ${sidebarAluno(currentTab)}
      <div class="main">
        <div class="topbar">
          <div style="display:flex;align-items:center;gap:12px;">
            <button class="menu-toggle" onclick="toggleSidebar()">${ICON.menu}</button>
            <div>
              <h2>${title}</h2>
              <div class="sub">${sub}</div>
            </div>
          </div>
          <div class="topbar-right">
            ${currentTab==='pagamento'?`<span class="badge ${aluno.pago?'pago':'pendente'}">${aluno.pago?'✓ PAGO':'⚠ PENDENTE'}</span>`:''}
            <button id="theme-toggle" class="btn-theme" type="button" onclick="toggleTheme()" aria-label="Alternar tema">
              <span id="theme-toggle-icon">${isDark ? '☀️' : '🌙'}</span>
              <span id="theme-toggle-text">${isDark ? 'Modo Claro' : 'Modo Escuro'}</span>
            </button>
          </div>
        </div>
        <div class="view">${viewHTML}</div>
      </div>
    </div>`;
}

// ── AGENDA ─────────────────────────────────────────────
function renderAgenda(aluno, myHorarios, myProfs) {
  if (!DIAS.includes(selectedDay)) selectedDay = 'Segunda';

  const dayHorarios = myHorarios.filter(h => h.dia === selectedDay)
    .sort((a,b) => a.hora.localeCompare(b.hora));

  const pills = DIAS.map(d => {
    const cnt = myHorarios.filter(h => h.dia === d).length;
    const act = d === selectedDay;
    const isPositive = cnt > 0;
    const cntStyle = isPositive ? 'style="background-color: #2E7D32; color: #FFFFFF; font-weight: 700;"' : '';
    return `<button class="day-pill ${act?'active':''}" onclick="selDay('${d}')">
      ${d} <span class="cnt ${isPositive ? 'has-count' : ''}" ${cntStyle}>${cnt}</span>
    </button>`;
  }).join('');

  const cards = dayHorarios.length === 0
    ? `<div class="empty">${ICON.calendar}<p>Nenhuma aula neste dia.</p></div>`
    : `<div class="schedule-grid">
      ${dayHorarios.map(h => {
        const pr = professores.find(p => String(p.id) === String(h.professorId));
        return `<div class="ticket-card">
          <div class="ticket-band">
            <span class="day">${esc(h.dia)}</span>
            <span class="time">${esc(h.hora)}</span>
          </div>
          <div class="ticket-perf"></div>
          <div class="ticket-body">
            <div class="ticket-instrument">${ICON.music} ${esc(h.instrumento)}</div>
            <div class="ticket-people">
              <div class="side">
                <div class="lbl">Professor</div>
                <div class="val">${esc(pr ? pr.nome : '—')}</div>
              </div>
            </div>
            ${pr ? `<div class="ticket-phone">
              ${ICON.phone} <span>${maskPhone(pr.telefone) || 'Sem telefone'}</span>
            </div>` : ''}
          </div>
        </div>`;
      }).join('')}
      </div>`;

  const diasComAula = DIAS.filter(d => myHorarios.some(h => h.dia === d));

  return `<div class="content-card" style="margin-top:0;">
    <div class="content-card-head">${ICON.calendar} <h3>Calendário semanal</h3></div>
    <div class="content-card-body">
      <div class="week-nav">${pills}</div>
      ${cards}
    </div>
  </div>

  <div class="content-card">
    <div class="content-card-head">${ICON.clock} <h3>Resumo semanal</h3></div>
    <div class="content-card-body">
      ${diasComAula.length === 0
        ? `<div class="empty">${ICON.clock}<p>Nenhuma aula agendada na semana.</p></div>`
        : `<div class="summary-grid">
        ${diasComAula.map(d => {
          const dh = myHorarios.filter(h => h.dia === d).sort((a,b) => a.hora.localeCompare(b.hora));
          return `<div class="summary-day-card">
            <div class="summary-day-head">
              ${d}
            </div>
            <div class="summary-day-list">
              ${dh.map(h => {
                const pr = professores.find(p => String(p.id) === String(h.professorId));
                return `<div class="summary-day-item">
                  <span style="font-family:var(--font-mono);font-weight:700;color:var(--gold-deep);">${h.hora}</span>
                  <span style="font-weight:600;margin-left:6px;">${esc(h.instrumento)}</span>
                  <div style="font-size:11.5px;color:var(--text-sub);margin-top:1px;">Prof. ${esc(pr?pr.nome:'—')}</div>
                </div>`;
              }).join('')}
            </div>
          </div>`;
        }).join('')}
      </div>`}
    </div>
  </div>`;
}

function selDay(d) { selectedDay = d; render(); }

// ── MEU PROFESSOR ──────────────────────────────────────
function renderProfessor(aluno, myHorarios, myProfs) {
  if (!myProfs.length) return `<div class="empty">${ICON.user}<p>Nenhum professor vinculado.</p></div>`;

  return myProfs.map(prof => {
    const aulas = myHorarios.filter(h => String(h.professorId) === String(prof.id));
    return `
    <div class="content-card" style="margin-top:0;margin-bottom:20px;">
      <div style="background:var(--black);padding:24px 22px;display:flex;align-items:center;gap:14px;border-bottom:1px solid var(--line);">
        <div class="avatar lg">${ini(prof.nome)}</div>
        <div>
          <div style="font-family:var(--font-display);color:var(--white);font-size:20px;font-weight:700;">${esc(prof.nome)}</div>
          <span class="badge">${esc(prof.instrumento)}</span>
        </div>
      </div>
      <div class="content-card-body">
        <div class="info-grid" style="margin-bottom:20px;">
          <div class="info-item"><div class="lbl">Especialidade</div><div class="val">${esc(prof.instrumento)}</div></div>
          <div class="info-item"><div class="lbl">Telefone</div><div class="val">${maskPhone(prof.telefone) || '—'}</div></div>
          <div class="info-item"><div class="lbl">E-mail</div><div class="val">${esc(prof.email||'—')}</div></div>
        </div>
        <div style="font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--text-sub);margin-bottom:10px;">Suas aulas com este professor</div>
        <div style="display:flex;flex-wrap:wrap;gap:8px;">
          ${aulas.map(h => `<div style="background:var(--gold-pale);border-radius:var(--radius-md);padding:10px 16px;">
            <div style="font-family:var(--font-mono);font-weight:700;color:var(--gold-deep);font-size:16px;">${h.hora}</div>
            <div style="font-size:12px;font-weight:600;color:var(--black);margin-top:2px;">${h.dia} · ${esc(h.instrumento)}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>`;
  }).join('');
}

// ── PAGAMENTO ──────────────────────────────────────────
function renderPagamento(aluno) {
  const plano = PLANOS[aluno.plano];
  const isDark = document.body.classList.contains('dark-mode');
  const statusColor = aluno.pago ? 'var(--success)' : 'var(--danger)';
  const statusBg = aluno.pago
    ? (isDark ? 'rgba(63, 178, 94, 0.16)' : '#D7F2E2')
    : (isDark ? 'rgba(229, 72, 77, 0.16)' : '#FFE8E8');
  const statusLabel = aluno.pago ? 'Mensalidade paga' : 'Pagamento pendente';

  return `
    <div class="content-card" style="margin-top:0;">
      <div class="content-card-head">${ICON.cash} <h3>Status da mensalidade</h3></div>
      <div class="content-card-body">
        <div style="background:${statusBg};border-radius:var(--radius-md);padding:18px 20px;display:flex;align-items:center;gap:14px;margin-bottom:20px;">
          <div class="pay-status-icon" style="background:${statusColor};">
            ${aluno.pago ? ICON.check : '!'}
          </div>
          <div>
            <div style="font-size:16px;font-weight:700;color:${statusColor};">${statusLabel}</div>
            <div style="font-size:13px;color:var(--text-sub);margin-top:2px;">${aluno.pago?'Obrigado! Seu pagamento foi confirmado.':'Entre em contato com a escola para regularizar.'}</div>
          </div>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <div class="lbl">Plano atual</div>
            <div class="val"><span class="plan-chip">${esc(plano?plano.label:'—')}</span></div>
          </div>
          <div class="info-item">
            <div class="lbl">Valor mensal</div>
            <div style="font-size:28px;font-weight:800;font-family:var(--font-display);color:var(--text-main);">R$ ${plano?plano.valor:'—'}</div>
          </div>
          <div class="info-item">
            <div class="lbl">Instrumento</div>
            <div class="val">${esc(aluno.instrumento)}</div>
          </div>
          <div class="info-item">
            <div class="lbl">Aulas por semana</div>
            <div class="val">${aluno.plano}x / semana</div>
          </div>
        </div>

        <div style="margin-top:20px;padding-top:20px;border-top:1px solid var(--border-main);">
          <div style="font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--text-sub);margin-bottom:12px;">O que está incluso</div>
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${[
              `${aluno.plano}x aula(s) de ${aluno.instrumento} por semana`,
              'Material de apoio incluso',
              'Reagendamento com 24h de antecedência',
            ].map(item => `<div style="display:flex;align-items:center;gap:10px;font-size:13.5px;color:var(--text-main);">
              <div class="pay-check-icon">${ICON.check}</div>
              ${item}
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

// ── PERFIL ─────────────────────────────────────────────
function renderPerfil(aluno, myHorarios, myProfs) {
  const plano = PLANOS[aluno.plano];
  return `
    <div class="profile-hero">
      <div class="profile-hero-id">
        <div class="avatar lg">${ini(aluno.nome)}</div>
        <div>
          <h2>${esc(aluno.nome)}</h2>
          <span class="badge">${esc(aluno.instrumento)}</span>
        </div>
      </div>
      <div class="profile-hero-info">
        <div class="info-chip">${ICON.phone} ${maskPhone(aluno.telefone) || '—'}</div>
        ${aluno.email?`<div class="info-chip">${ICON.mail} ${esc(aluno.email)}</div>`:''}
        <div class="info-chip">${ICON.calendar} ${aluno.plano}x / semana</div>
        <div class="info-chip">${ICON.cash} R$ ${plano?plano.valor:'—'}/mês</div>
      </div>
    </div>

    <div class="content-card">
      <div class="content-card-head">${ICON.user} <h3>Dados pessoais</h3></div>
      <div class="content-card-body">
        <div class="info-grid">
          <div class="info-item"><div class="lbl">Nome completo</div><div class="val">${esc(aluno.nome)}</div></div>
          <div class="info-item"><div class="lbl">Instrumento</div><div class="val">${esc(aluno.instrumento)}</div></div>
          <div class="info-item"><div class="lbl">Telefone</div><div class="val">${maskPhone(aluno.telefone) || '—'}</div></div>
          <div class="info-item"><div class="lbl">E-mail</div><div class="val">${esc(aluno.email||'—')}</div></div>
          <div class="info-item"><div class="lbl">Data de nascimento</div><div class="val">${aluno.nascimento||'—'}</div></div>
          <div class="info-item"><div class="lbl">Status pagamento</div><div class="val"><span class="badge ${aluno.pago?'pago':'pendente'}">${aluno.pago?'PAGO':'PENDENTE'}</span></div></div>
        </div>
      </div>
    </div>

    <div class="content-card">
      <div class="content-card-head">${ICON.tag} <h3>Plano & Aulas</h3></div>
      <div class="content-card-body">
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
          <span class="plan-chip" style="font-size:14px;padding:8px 18px;">${esc(plano?plano.label:'—')}</span>
          <div style="font-size:24px;font-weight:800;font-family:var(--font-display);color:var(--text-main);">R$ ${plano?plano.valor:'—'}<span style="font-size:13px;color:var(--text-sub);font-weight:500;font-family:var(--font-body);">/mês</span></div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:7px;">
          ${myHorarios.map(h=>{
            const pr=professores.find(p=>String(p.id)===String(h.professorId));
            return `<div style="background:var(--bg-surface-alt);border:1px solid var(--border-main);border-radius:var(--radius-sm);padding:8px 13px;font-size:12.5px;">
              <div style="font-family:var(--font-mono);font-weight:700;color:var(--gold-deep);">${h.dia} ${h.hora}</div>
              <div style="font-size:11px;color:var(--text-sub);margin-top:2px;">${esc(h.instrumento)} · Prof. ${esc(pr?pr.nome:'—')}</div>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
}
