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
  let d=v.replace(/\D/g,'').slice(0,11);
  if(d.length>10) return d.replace(/(\d{2})(\d{5})(\d{0,4})/,(_,a,b,c)=>c?`(${a}) ${b}-${c}`:`(${a}) ${b}`);
  if(d.length>6)  return d.replace(/(\d{2})(\d{4})(\d{0,4})/,(_,a,b,c)=>c?`(${a}) ${b}-${c}`:`(${a}) ${b}`);
  if(d.length>2)  return d.replace(/(\d{2})(\d*)/,(_,a,b)=>b?`(${a}) ${b}`:`(${a}`);
  return d.length?`(${d}`:'';
};

// ── DATA (mirrors script.js seed) ─────────────────────────────
let alunos = [
  {id:'a1',nome:'Marina Costa',instrumento:'Violão',dias:['Segunda','Quarta'],horarios:['15:00','16:00'],telefone:'84991234567',email:'marina.costa@email.com',nascimento:'2011-03-14',plano:2,pago:true},
  {id:'a2',nome:'Bento Alves',instrumento:'Piano',dias:['Terça','Quinta','Sábado'],horarios:['09:00','09:00','10:00'],telefone:'84998765432',email:'bento.alves@email.com',nascimento:'2014-07-02',plano:3,pago:false},
  {id:'a3',nome:'Yasmin Rocha',instrumento:'Bateria',dias:['Sexta'],horarios:['17:00'],telefone:'84987654321',email:'',nascimento:'2009-11-21',plano:1,pago:true},
  {id:'a4',nome:'Davi Nunes',instrumento:'Canto',dias:['Segunda','Sexta'],horarios:['18:00','18:00'],telefone:'84996655443',email:'davi.nunes@email.com',nascimento:'2013-01-09',plano:2,pago:true},
];
let professores = [
  {id:'p1',nome:'Renato Souza',instrumento:'Violão',dias:['Segunda','Quarta'],horarios:['15:00','16:00'],telefone:'84991112222',email:'renato.souza@edmusys.com',nascimento:'1988-05-12'},
  {id:'p2',nome:'Camila Duarte',instrumento:'Piano',dias:['Terça','Quinta','Sábado'],horarios:['09:00','09:00','10:00'],telefone:'84993334444',email:'camila.duarte@edmusys.com',nascimento:'1991-09-30'},
  {id:'p3',nome:'João Prado',instrumento:'Bateria',dias:['Sexta'],horarios:['17:00'],telefone:'84995556666',email:'joao.prado@edmusys.com',nascimento:'1985-12-04'},
  {id:'p4',nome:'Larissa Melo',instrumento:'Canto',dias:['Segunda','Sexta'],horarios:['18:00','18:00'],telefone:'84997778888',email:'larissa.melo@edmusys.com',nascimento:'1993-02-18'},
];
let horarios = [
  {id:'h1',dia:'Segunda',hora:'15:00',instrumento:'Violão',alunoId:'a1',professorId:'p1'},
  {id:'h2',dia:'Quarta',hora:'16:00',instrumento:'Violão',alunoId:'a1',professorId:'p1'},
  {id:'h3',dia:'Terça',hora:'09:00',instrumento:'Piano',alunoId:'a2',professorId:'p2'},
  {id:'h4',dia:'Quinta',hora:'09:00',instrumento:'Piano',alunoId:'a2',professorId:'p2'},
  {id:'h5',dia:'Sábado',hora:'10:00',instrumento:'Piano',alunoId:'a2',professorId:'p2'},
  {id:'h6',dia:'Sexta',hora:'17:00',instrumento:'Bateria',alunoId:'a3',professorId:'p3'},
  {id:'h7',dia:'Segunda',hora:'18:00',instrumento:'Canto',alunoId:'a4',professorId:'p4'},
  {id:'h8',dia:'Sexta',hora:'18:00',instrumento:'Canto',alunoId:'a4',professorId:'p4'},
];

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

function goHome(){ window.location.href='index.html'; }
function doLogout(){ window.location.href='index.html'; }
function toggleSidebar(){
  document.getElementById('sidebar').classList.toggle('open');
}


// ── LOGIN ──────────────────────────────────────────────
const sel = document.getElementById('sel-prof');
professores.forEach(p => {
  const o = document.createElement('option');
  o.value = p.id; o.textContent = p.nome;
  sel.appendChild(o);
});

let currentProfId = null;
let currentTab = 'horarios';
let selectedDay = 'Segunda';

function doLogin() {
  const v = sel.value;
  if (!v) { document.getElementById('login-err').classList.add('show'); return; }
  currentProfId = v;
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  render();
}

function showTab(t) { currentTab = t; render(); }

// ── RENDER ─────────────────────────────────────────────
function render() {
  const prof = professores.find(p => p.id === currentProfId);
  if (!prof) return;
  const myHorarios = horarios.filter(h => h.professorId === prof.id);
  const myAlunoIds = [...new Set(myHorarios.map(h => h.alunoId))];
  const myAlunos = myAlunoIds.map(id => alunos.find(a => a.id === id)).filter(Boolean);

  let viewHTML = '';

  if (currentTab === 'horarios') viewHTML = renderAgenda(prof, myHorarios, myAlunos);
  else if (currentTab === 'alunos_prof') viewHTML = renderMeusAlunos(prof, myAlunos, myHorarios);
  else viewHTML = renderPerfil(prof, myHorarios, myAlunos);

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
        </div>
        <div class="view">${viewHTML}</div>
      </div>
    </div>`;
}

// ── AGENDA ─────────────────────────────────────────────
function renderAgenda(prof, myHorarios, myAlunos) {
  const diasAtivos = [...new Set(myHorarios.map(h => h.dia))];
  if (!diasAtivos.includes(selectedDay)) selectedDay = diasAtivos[0] || 'Segunda';

  const dayHorarios = myHorarios.filter(h => h.dia === selectedDay)
    .sort((a,b) => a.hora.localeCompare(b.hora));

  const pills = DIAS.map(d => {
    const cnt = myHorarios.filter(h => h.dia === d).length;
    if (cnt === 0) return '';
    const act = d === selectedDay;
    return `<button class="day-pill ${act?'active':''}" onclick="selDay('${d}')">
      ${d} <span class="cnt">${cnt}</span>
    </button>`;
  }).join('');

  const cards = dayHorarios.length === 0
    ? `<div class="empty">${ICON.calendar}<p>Nenhuma aula neste dia.</p></div>`
    : `<div class="schedule-grid">
      ${dayHorarios.map(h => {
        const al = alunos.find(a => a.id === h.alunoId);
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
            ${al ? `<div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--line-light);display:flex;align-items:center;gap:8px;font-size:12px;color:var(--muted);">
              ${ICON.phone} ${maskPhone(al.telefone)}
            </div>` : ''}
          </div>
        </div>`;
      }).join('')}
      </div>`;

  return `
    <div class="content-card" style="margin-top:0;">
      <div class="content-card-head">${ICON.calendar} <h3>Calendário semanal</h3></div>
      <div class="content-card-body">
        <div class="week-nav">${pills}</div>
        ${cards}
      </div>
    </div>

    <!-- FULL WEEK SUMMARY -->
    <div class="content-card">
      <div class="content-card-head">${ICON.clock} <h3>Resumo semanal completo</h3></div>
      <div class="content-card-body">
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;">
          ${DIAS.map(d => {
            const dh = myHorarios.filter(h => h.dia === d).sort((a,b) => a.hora.localeCompare(b.hora));
            if (!dh.length) return '';
            return `<div style="background:var(--cream-dim);border-radius:var(--radius-md);overflow:hidden;">
              <div style="background:var(--black);color:var(--gold);padding:9px 14px;font-family:var(--font-display);font-weight:700;font-size:14px;display:flex;justify-content:space-between;align-items:center;">
                ${d} <span style="font-family:var(--font-mono);font-size:12px;">${dh.length} aula${dh.length>1?'s':''}</span>
              </div>
              <div style="padding:10px 12px;display:flex;flex-direction:column;gap:7px;">
                ${dh.map(h => {
                  const al = alunos.find(a => a.id === h.alunoId);
                  return `<div style="display:flex;align-items:center;gap:8px;font-size:12.5px;">
                    <span style="font-family:var(--font-mono);font-weight:700;color:var(--gold-deep);min-width:44px;">${h.hora}</span>
                    <span style="font-weight:600;">${esc(h.instrumento)}</span>
                    <span style="color:var(--muted);flex:1;text-align:right;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${esc(al?al.nome:'—')}</span>
                  </div>`;
                }).join('')}
              </div>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
}

function selDay(d) { selectedDay = d; render(); }

// ── MEUS ALUNOS ────────────────────────────────────────
function renderMeusAlunos(prof, myAlunos, myHorarios) {
  if (!myAlunos.length) return `<div class="empty">${ICON.students}<p>Nenhum aluno vinculado.</p></div>`;

  const rows = myAlunos.map(a => {
    const aulas = myHorarios.filter(h => h.alunoId === a.id);
    const plano = PLANOS[a.plano];
    return `<tr>
      <td>
        <div class="student-row-name">
          <div class="av">${ini(a.nome)}</div>
          <div>
            <div style="font-weight:700;">${esc(a.nome)}</div>
            <div style="font-size:11.5px;color:var(--muted);margin-top:1px;">${esc(a.email||'—')}</div>
          </div>
        </div>
      </td>
      <td><span class="badge">${esc(a.instrumento)}</span></td>
      <td>
        ${aulas.map(h => `<span style="font-family:var(--font-mono);font-size:12px;background:var(--gold-pale);color:var(--gold-deep);border-radius:6px;padding:3px 8px;margin:2px;display:inline-block;font-weight:700;">${h.dia} ${h.hora}</span>`).join('')}
      </td>
      <td><span class="plan-chip">${esc(plano?plano.label:'—')}</span></td>
      <td><span class="badge ${a.pago?'pago':'pendente'}">${a.pago?'PAGO':'PENDENTE'}</span></td>
      <td style="font-size:13px;">${maskPhone(a.telefone)}</td>
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
  </div>

  <!-- CARDS ALUNOS -->
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;margin-top:20px;">
    ${myAlunos.map(a => {
      const aulas = myHorarios.filter(h => h.alunoId === a.id);
      return `<div style="background:var(--white);border-radius:var(--radius-lg);box-shadow:var(--shadow-card);padding:20px;">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
          <div class="av" style="width:48px;height:48px;font-size:17px;border-radius:50%;background:var(--black);color:var(--gold);display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0;">${ini(a.nome)}</div>
          <div>
            <div style="font-weight:700;font-size:15px;">${esc(a.nome)}</div>
            <span class="badge">${esc(a.instrumento)}</span>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:7px;font-size:13px;">
          <div style="display:flex;align-items:center;gap:8px;color:var(--muted);">${ICON.phone} ${maskPhone(a.telefone)}</div>
          ${a.email?`<div style="display:flex;align-items:center;gap:8px;color:var(--muted);">${ICON.mail} ${esc(a.email)}</div>`:''}
          <div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:6px;padding-top:10px;border-top:1px solid var(--line-light);">
            ${aulas.map(h=>`<span style="font-family:var(--font-mono);font-size:11px;background:var(--gold-pale);color:var(--gold-deep);border-radius:6px;padding:4px 9px;font-weight:700;">${h.dia} · ${h.hora}</span>`).join('')}
          </div>
        </div>
      </div>`;
    }).join('')}
  </div>`;
}

// ── PERFIL ─────────────────────────────────────────────
function renderPerfil(prof, myHorarios, myAlunos) {
  const totalAulas = myHorarios.length;
  return `
    <!-- HERO -->
    <div class="profile-hero">
      <div class="profile-hero-id">
        <div class="avatar lg">${ini(prof.nome)}</div>
        <div>
          <h2>${esc(prof.nome)}</h2>
          <span class="badge">${esc(prof.instrumento)}</span>
        </div>
      </div>
      <div class="profile-hero-info">
        <div class="info-chip">${ICON.phone} ${maskPhone(prof.telefone)}</div>
        ${prof.email?`<div class="info-chip">${ICON.mail} ${esc(prof.email)}</div>`:''}
        <div class="info-chip">${ICON.students} ${myAlunos.length} aluno${myAlunos.length!==1?'s':''}</div>
        <div class="info-chip">${ICON.calendar} ${totalAulas} aula${totalAulas!==1?'s':''}/semana</div>
      </div>
    </div>

    <!-- INFO CARD -->
    <div class="content-card">
      <div class="content-card-head">${ICON.user} <h3>Dados pessoais</h3></div>
      <div class="content-card-body">
        <div class="info-grid">
          <div class="info-item"><div class="lbl">Nome completo</div><div class="val">${esc(prof.nome)}</div></div>
          <div class="info-item"><div class="lbl">Instrumento / especialidade</div><div class="val">${esc(prof.instrumento)}</div></div>
          <div class="info-item"><div class="lbl">Telefone</div><div class="val">${maskPhone(prof.telefone)}</div></div>
          <div class="info-item"><div class="lbl">E-mail</div><div class="val">${esc(prof.email||'—')}</div></div>
          <div class="info-item"><div class="lbl">Data de nascimento</div><div class="val">${prof.nascimento||'—'}</div></div>
        </div>
      </div>
    </div>

    <!-- STATS -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin-top:20px;">
      ${[
        {icon:ICON.students, lbl:'Total de alunos', val:myAlunos.length},
        {icon:ICON.calendar, lbl:'Aulas por semana', val:totalAulas},
        {icon:ICON.clock, lbl:'Dias ativos', val:[...new Set(myHorarios.map(h=>h.dia))].length},
      ].map(s=>`<div style="background:var(--white);border-radius:var(--radius-md);box-shadow:var(--shadow-card);padding:18px 20px;">
        <div style="color:var(--gold-deep);margin-bottom:8px;">${s.icon}</div>
        <div style="font-size:28px;font-weight:800;font-family:var(--font-display);">${s.val}</div>
        <div style="font-size:12px;color:var(--muted);margin-top:2px;">${s.lbl}</div>
      </div>`).join('')}
    </div>`;
}
