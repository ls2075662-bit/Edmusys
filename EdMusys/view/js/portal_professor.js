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

function garantirProfessorNaLista(logado) {
  if (!logado) return null;
  let profEncontrado = professores.find(
    p => String(p.id) === String(logado.id) || (logado.email && p.email === logado.email)
  );
  if (!profEncontrado) {
    profEncontrado = {
      id: String(logado.id),
      nome: logado.nome || "Professor",
      email: logado.email || "",
      instrumento: logado.especialidade || logado.instrumento || "A definir",
      telefone: logado.telefone || ""
    };
    professores.push(profEncontrado);
  }
  return profEncontrado;
}

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
      garantirProfessorNaLista(professorLogado);
      render();
    }
  } catch (e) {
    console.warn("Usando cache local:", e);
  }
}

function sidebar(activeTab) {
  return `<aside class="sidebar" id="sidebar">
    <button class="brand-btn" onclick="goHome()">
      <span class="mark">${ICON.music}</span>
      <span class="name">EdMusys</span>
    </button>
    <nav class="nav-group">
      <button class="nav-btn ${activeTab==='horarios'?'active':''}" onclick="showTab('horarios')">${ICON.calendar} Minha Agenda</button>
      <button class="nav-btn ${activeTab==='alunos_prof'?'active':''}" onclick="showTab('alunos_prof')">${ICON.students} Meus Alunos</button>
      <button class="nav-btn ${activeTab==='perfil'?'active':''}" onclick="showTab('perfil')">${ICON.user} Meu Perfil</button>
    </nav>
    <div class="sidebar-foot">
      <button class="logout-btn" onclick="doLogout()">${ICON.logout} Sair</button>
    </div>
  </aside>`;
}

function goHome(){ window.location.href='landing_page_edmusys.html'; }
function doLogout(){
  localStorage.removeItem("edmusys_professor_logado");
  localStorage.removeItem("edmusys_token");
  localStorage.removeItem("edmusys_role");
  localStorage.removeItem("edmusys_user");
  window.location.href = "landing_page_edmusys.html";
}
function toggleSidebar(){
  const sb = document.getElementById('sidebar');
  if (sb) sb.classList.toggle('open');
}

// ── INICIALIZAÇÃO DA SESSÃO ─────────────────────────────
let currentProfId = null;
let currentTab = 'horarios';
let selectedDay = 'Segunda';

const professorLogado = JSON.parse(localStorage.getItem("edmusys_professor_logado")) || JSON.parse(localStorage.getItem("edmusys_user"));

if (!professorLogado) {
  window.location.href = "landing_page_edmusys.html";
} else {
  const profEncontrado = garantirProfessorNaLista(professorLogado);
  currentProfId = profEncontrado.id;

  const appElem = document.getElementById('app');
  if (appElem) appElem.classList.remove('hidden');
  render();
  sincronizarDadosDoBanco();
}

function showTab(t) { currentTab = t; render(); }

// ── RENDER ─────────────────────────────────────────────
function render() {
  const prof = garantirProfessorNaLista(professorLogado) || professores.find(p => String(p.id) === String(currentProfId));
  if (!prof) return;
  currentProfId = prof.id;

  const myHorarios = horarios.filter(h => String(h.professorId) === String(prof.id));
  const myAlunoIds = [...new Set(myHorarios.map(h => h.alunoId))];
  const myAlunos = myAlunoIds.map(id => alunos.find(a => String(a.id) === String(id))).filter(Boolean);

  let viewHTML = '';

  if (currentTab === 'horarios') viewHTML = renderAgenda(prof, myHorarios, myAlunos);
  else if (currentTab === 'alunos_prof') viewHTML = renderMeusAlunos(prof, myAlunos, myHorarios);
  else viewHTML = renderPerfil(prof, myHorarios, myAlunos);

  const isDark = document.body.classList.contains('dark-mode');

  document.getElementById('shell').innerHTML = `
    <div class="app">
      ${sidebar(currentTab)}
      <div class="main">
        <div class="topbar">
          <div style="display:flex;align-items:center;gap:12px;">
            <button class="menu-toggle" onclick="toggleSidebar()">${ICON.menu}</button>
            <div>
              <h2>${currentTab==='horarios'?'Minha Agenda':currentTab==='alunos_prof'?'Meus Alunos':'Meu Perfil'}</h2>
              <div class="sub">${currentTab==='horarios'?'Seus dias e horários de aula':currentTab==='alunos_prof'?'Alunos vinculados a você':'Seus dados cadastrais'}</div>
            </div>
          </div>
          <div class="topbar-right">
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
function renderAgenda(prof, myHorarios, myAlunos) {
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
        const al = alunos.find(a => String(a.id) === String(h.alunoId));
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
                <div class="lbl">Aluno</div>
                <div class="val">${esc(al ? al.nome : '—')}</div>
              </div>
            </div>
            ${al ? `<div class="ticket-phone">
              ${ICON.phone} <span>${maskPhone(al.telefone) || 'Sem telefone'}</span>
            </div>` : ''}
          </div>
        </div>`;
      }).join('')}
      </div>`;

  const diasComAula = DIAS.filter(d => myHorarios.some(h => h.dia === d));

  return `
    <div class="content-card" style="margin-top:0;">
      <div class="content-card-head">${ICON.calendar} <h3>Calendário semanal</h3></div>
      <div class="content-card-body">
        <div class="week-nav">${pills}</div>
        ${cards}
      </div>
    </div>

    <div class="content-card">
      <div class="content-card-head">${ICON.clock} <h3>Resumo semanal completo</h3></div>
      <div class="content-card-body">
        ${diasComAula.length === 0
          ? `<div class="empty">${ICON.clock}<p>Nenhuma aula agendada na semana.</p></div>`
          : `<div class="summary-grid">
          ${diasComAula.map(d => {
            const dh = myHorarios.filter(h => h.dia === d).sort((a,b) => a.hora.localeCompare(b.hora));
            return `<div class="summary-day-card">
              <div class="summary-day-head">
                ${d} <span style="font-family:var(--font-mono);font-size:12px;">${dh.length} aula${dh.length>1?'s':''}</span>
              </div>
              <div class="summary-day-list">
                ${dh.map(h => {
                  const al = alunos.find(a => String(a.id) === String(h.alunoId));
                  return `<div class="summary-day-item">
                    <span style="font-family:var(--font-mono);font-weight:700;color:var(--gold-deep);min-width:44px;">${h.hora}</span>
                    <span style="font-weight:600;">${esc(h.instrumento)}</span>
                    <span style="color:var(--text-sub);flex:1;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(al?al.nome:'—')}</span>
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

// ── MEUS ALUNOS ────────────────────────────────────────
function renderMeusAlunos(prof, myAlunos, myHorarios) {
  if (!myAlunos.length) return `<div class="empty">${ICON.students}<p>Nenhum aluno vinculado.</p></div>`;

  const rows = myAlunos.map(a => {
    const aulas = myHorarios.filter(h => String(h.alunoId) === String(a.id));
    const plano = PLANOS[a.plano];
    return `<tr>
      <td>
        <div class="student-row-name">
          <div class="av">${ini(a.nome)}</div>
          <div>
            <div style="font-weight:700;">${esc(a.nome)}</div>
            <div style="font-size:11.5px;color:var(--text-sub);margin-top:1px;">${esc(a.email||'—')}</div>
          </div>
        </div>
      </td>
      <td><span class="badge">${esc(a.instrumento)}</span></td>
      <td>
        ${aulas.map(h => `<span style="font-family:var(--font-mono);font-size:12px;background:var(--gold-pale);color:var(--gold-deep);border-radius:6px;padding:3px 8px;margin:2px;display:inline-block;font-weight:700;">${h.dia} ${h.hora}</span>`).join('')}
      </td>
      <td><span class="plan-chip">${esc(plano?plano.label:'—')}</span></td>
      <td><span class="badge ${a.pago?'pago':'pendente'}">${a.pago?'PAGO':'PENDENTE'}</span></td>
      <td style="font-size:13px;white-space:nowrap;">${maskPhone(a.telefone) || '—'}</td>
    </tr>`;
  }).join('');

  return `<div class="content-card" style="margin-top:0;">
    <div class="content-card-head">${ICON.students} <h3>Alunos — ${myAlunos.length} total</h3></div>
    <div style="overflow-x:auto;">
      <table class="students-table">
        <thead>
          <tr>
            <th>Nome</th><th>Instrumento</th><th>Horários</th><th>Plano</th><th>Mensalidade</th><th>Telefone</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  </div>`;
}

// ── PERFIL ─────────────────────────────────────────────
function renderPerfil(prof, myHorarios, myAlunos) {
  const totalAulas = myHorarios.length;
  return `
    <div class="profile-hero">
      <div class="profile-hero-id">
        <div class="avatar lg">${ini(prof.nome)}</div>
        <div>
          <h2>${esc(prof.nome)}</h2>
          <span class="badge">${esc(prof.instrumento)}</span>
        </div>
      </div>
      <div class="profile-hero-info">
        <div class="info-chip">${ICON.phone} ${maskPhone(prof.telefone) || '—'}</div>
        ${prof.email?`<div class="info-chip">${ICON.mail} ${esc(prof.email)}</div>`:''}
        <div class="info-chip">${ICON.students} ${myAlunos.length} aluno${myAlunos.length!==1?'s':''}</div>
        <div class="info-chip">${ICON.calendar} ${totalAulas} aula${totalAulas!==1?'s':''}/semana</div>
      </div>
    </div>

    <div class="content-card">
      <div class="content-card-head">${ICON.user} <h3>Dados pessoais</h3></div>
      <div class="content-card-body">
        <div class="info-grid">
          <div class="info-item"><div class="lbl">Nome completo</div><div class="val">${esc(prof.nome)}</div></div>
          <div class="info-item"><div class="lbl">Instrumento / especialidade</div><div class="val">${esc(prof.instrumento)}</div></div>
          <div class="info-item"><div class="lbl">Telefone</div><div class="val">${maskPhone(prof.telefone) || '—'}</div></div>
          <div class="info-item"><div class="lbl">E-mail</div><div class="val">${esc(prof.email||'—')}</div></div>
          <div class="info-item"><div class="lbl">Data de nascimento</div><div class="val">${prof.nascimento||'—'}</div></div>
        </div>
      </div>
    </div>

    <div class="stat-mini-grid">
      ${[
        {icon:ICON.students, lbl:'Total de alunos', val:myAlunos.length},
        {icon:ICON.calendar, lbl:'Aulas por semana', val:totalAulas},
        {icon:ICON.clock, lbl:'Dias ativos', val:[...new Set(myHorarios.map(h=>h.dia))].length},
      ].map(s=>`<div class="stat-mini-card">
        <div class="stat-mini-icon">${s.icon}</div>
        <div class="stat-mini-val">${s.val}</div>
        <div class="stat-mini-lbl">${s.lbl}</div>
      </div>`).join('')}
    </div>`;
}
