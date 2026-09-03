(function(){
"use strict";

/* ============================================================
   icones do sistema-Armazena os SVGs utilizados pelos botões e componentes
   da interface para evitar repetição de código.
   ============================================================ */
const ICON = {
  music:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  calendar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  user:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .6 2.9a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.9.5 2.9.6a2 2 0 0 1 1.7 2Z"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
  cake:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16h16"/><path d="M12 3v4M8 3v2M16 3v2"/></svg>',
  tag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m20.6 13.4-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="7.5" r="1.2"/></svg>',
  cash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  edit:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
  trash:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>',
  x:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
};

/* ============================================================
   constantes do sistema-Define dias da semana, horários disponíveis e planos
   de mensalidade utilizados pelo sistema.
   ============================================================ */
const DIAS = ['Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
const HORAS = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'];
const PLANOS = {1:{label:'1x / semana', valor:60}, 2:{label:'2x / semana', valor:120}, 3:{label:'3x / semana', valor:180}};

/* ============================================================
   dados iniciais-Contém os dados utilizados inicialmente para alunos,
   professores e horários da escola.
   ============================================================ */
let uid = 1000;
const nextId = () => (++uid).toString(36);

let alunos = [
  {id:'a1', nome:'Marina Costa', instrumento:'Violão', dias:['Segunda','Quarta'], horarios:['15:00','16:00'], telefone:'84991234567', email:'marina.costa@email.com', nascimento:'2011-03-14', plano:2, pago:true},
  {id:'a2', nome:'Bento Alves', instrumento:'Piano', dias:['Terça','Quinta','Sábado'], horarios:['09:00','09:00','10:00'], telefone:'84998765432', email:'bento.alves@email.com', nascimento:'2014-07-02', plano:3, pago:false},
  {id:'a3', nome:'Yasmin Rocha', instrumento:'Bateria', dias:['Sexta'], horarios:['17:00'], telefone:'84987654321', email:'', nascimento:'2009-11-21', plano:1, pago:true},
  {id:'a4', nome:'Davi Nunes', instrumento:'Canto', dias:['Segunda','Sexta'], horarios:['18:00','18:00'], telefone:'84996655443', email:'davi.nunes@email.com', nascimento:'2013-01-09', plano:2, pago:true},
];

let professores = [
  {id:'p1', nome:'Renato Souza', instrumento:'Violão', dias:['Segunda','Quarta'], horarios:['15:00','16:00'], telefone:'84991112222', email:'renato.souza@edmusys.com', nascimento:'1988-05-12'},
  {id:'p2', nome:'Camila Duarte', instrumento:'Piano', dias:['Terça','Quinta','Sábado'], horarios:['09:00','09:00','10:00'], telefone:'84993334444', email:'camila.duarte@edmusys.com', nascimento:'1991-09-30'},
  {id:'p3', nome:'João Prado', instrumento:'Bateria', dias:['Sexta'], horarios:['17:00'], telefone:'84995556666', email:'joao.prado@edmusys.com', nascimento:'1985-12-04'},
  {id:'p4', nome:'Larissa Melo', instrumento:'Canto', dias:['Segunda','Sexta'], horarios:['18:00','18:00'], telefone:'84997778888', email:'larissa.melo@edmusys.com', nascimento:'1993-02-18'},
];

let horarios = [
  {id:'h1', dia:'Segunda', hora:'15:00', instrumento:'Violão', alunoId:'a1', professorId:'p1'},
  {id:'h2', dia:'Quarta', hora:'16:00', instrumento:'Violão', alunoId:'a1', professorId:'p1'},
  {id:'h3', dia:'Terça', hora:'09:00', instrumento:'Piano', alunoId:'a2', professorId:'p2'},
  {id:'h4', dia:'Quinta', hora:'09:00', instrumento:'Piano', alunoId:'a2', professorId:'p2'},
  {id:'h5', dia:'Sábado', hora:'10:00', instrumento:'Piano', alunoId:'a2', professorId:'p2'},
  {id:'h6', dia:'Sexta', hora:'17:00', instrumento:'Bateria', alunoId:'a3', professorId:'p3'},
  {id:'h7', dia:'Segunda', hora:'18:00', instrumento:'Canto', alunoId:'a4', professorId:'p4'},
  {id:'h8', dia:'Sexta', hora:'18:00', instrumento:'Canto', alunoId:'a4', professorId:'p4'},
];

/* ============================================================
   ESTADO DA APLICAÇÃO
   Armazena informações temporárias sobre a tela atual,
   dia selecionado e horário em edição.
   ============================================================ */
let state = {
  view:'overview',
  selectedDay:'Segunda',
  editingHorarioId:null,
};

const $ = (sel,root=document)=>root.querySelector(sel);
const $$ = (sel,root=document)=>[...root.querySelectorAll(sel)];
const escapeHtml = (s='')=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const initials = (name='')=> name.trim().split(/\s+/).slice(0,2).map(w=>w[0]||'').join('').toUpperCase();

function maskPhone(v){
  let d = v.replace(/\D/g,'').slice(0,11);
  if(d.length>10) return d.replace(/(\d{2})(\d{5})(\d{0,4})/,(m,a,b,c)=> c?`(${a}) ${b}-${c}`:`(${a}) ${b}`);
  if(d.length>6) return d.replace(/(\d{2})(\d{4})(\d{0,4})/,(m,a,b,c)=> c?`(${a}) ${b}-${c}`:`(${a}) ${b}`);
  if(d.length>2) return d.replace(/(\d{2})(\d{0,5})/,(m,a,b)=> b?`(${a}) ${b}`:`(${a}`);
  if(d.length>0) return `(${d}`;
  return '';
}
function phoneDigits(v){ return (v||'').replace(/\D/g,''); }
function isValidEmail(v){
  if(!v) return true;
  return /^[^\s@]+@[^\s@]+\.com([.\w-]*)?$/i.test(v.trim());
}

/* ============================================================
   IField builder
   ============================================================ */
function ifield({id, label, icon, type='text', value='', placeholder='', dark=false, readonly=false, options=null, errorId=null}){
  const cls = ['ifield']; if(dark) cls.push('dark'); if(readonly) cls.push('readonly');
  let control;
  if(options){
    control = `<select id="${id}" ${readonly?'disabled':''}>${options.map(o=>`<option value="${escapeHtml(o.value)}" ${String(o.value)===String(value)?'selected':''}>${escapeHtml(o.label)}</option>`).join('')}</select>`;
  } else {
    control = `<input id="${id}" type="${type}" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}" ${readonly?'readonly':''} ${type==='tel'?'inputmode="numeric"':''} autocomplete="off">`;
  }
  return `<div class="${cls.join(' ')}">
    <label for="${id}">${label}</label>
    <div class="icontainer">${control}${icon?`<span aria-hidden="true">${icon}</span>`:''}</div>
    ${errorId?`<div class="err" id="${errorId}"></div>`:''}
  </div>`;
}

/* ============================================================
   LOGIN
   ============================================================ */
const loginUser = $('#login-user');
const loginPass = $('#login-pass');

[loginUser, loginPass].forEach(inp => {
  inp.addEventListener('input', () => {
    const clean = inp.value.replace(/\s/g, '');

    if (clean !== inp.value) {
      inp.value = clean;
    }
  });
});

$('#login-form').addEventListener('submit', e => {

  e.preventDefault();

  const u = loginUser.value.trim().toLowerCase();
  const p = loginPass.value.trim();

  const err = $('#login-error');


  // ==========================================================
  // LOGIN PADRÃO DO SISTEMA
  // Usuário: admin
  // Senha: admin
  // ==========================================================

  const loginPadrao =
    u === 'admin' && p === 'admin';


  // ==========================================================
  // BUSCAR ADMINISTRADORES CADASTRADOS
  // ==========================================================

  const administradores =
    JSON.parse(localStorage.getItem('edmusys_admins')) || [];


  // ==========================================================
  // VERIFICAR ADMINISTRADOR CADASTRADO
  // ==========================================================

  const administradorCadastrado =
    administradores.some(admin =>
      admin.email === u &&
      admin.senha === p
    );


  // ==========================================================
  // VALIDAR LOGIN
  // ==========================================================

  if (loginPadrao || administradorCadastrado) {

    // Login correto
    err.classList.remove('show');

    // Esconde tela de login
    $('#login-screen').classList.add('hidden');

    // Mostra o sistema
    $('#app').classList.remove('hidden');

    // Mostra calendário
    $('#fab-calendar').classList.remove('hidden');

    // Carrega página inicial
    renderView();

  } else {

    // Login incorreto
    err.classList.add('show');

  }

})//atualizacao daqui pra cima//alteracoes daqui pra cima.OK

/* ============================================================
   navagação do sistema-Controla logout, menu lateral, botão do menu responsivo,
   retorno à Visão Geral e abertura do calendário.
   ============================================================ */
$('#logout-btn').addEventListener('click', ()=>{
  $('#app').classList.add('hidden');
  $('#fab-calendar').classList.add('hidden');
  $('#calendar-overlay').classList.add('hidden');
  $('#login-screen').classList.remove('hidden');
  loginPass.value=''; loginUser.value='';
});
$$('.nav-btn').forEach(btn=>btn.addEventListener('click', ()=>{
  state.view = btn.dataset.view;
  $('#sidebar').classList.remove('open');
  renderView();
}));
$('#menu-toggle').addEventListener('click', ()=> $('#sidebar').classList.toggle('open'));
$('#brand-btn').addEventListener('click', ()=>{
  $('#calendar-overlay').classList.add('hidden');
  state.view = 'overview';
  renderView();
});
$('#fab-calendar').addEventListener('click', renderCalendarOverlay);

/* ============================================================
   VIEW ROUTER
   ============================================================ */
const TITLES = {
  overview:['Visão Geral','Resumo da escola de música'],
  alunos:['Alunos','Cadastro e agenda dos alunos'],
  professores:['Professores','Cadastro e agenda dos professores'],
  horarios:['Horários','Agenda de aulas por dia da semana'],
};
function renderView(){
  $$('.nav-btn').forEach(b=> b.classList.toggle('active', b.dataset.view===state.view));
  const [title,sub] = TITLES[state.view];
  $('#view-title').textContent = title;
  $('#view-sub').textContent = sub;
  const topActions = $('#topbar-actions');
  topActions.innerHTML='';
  if(state.view==='alunos') topActions.innerHTML = `<button class="btn btn-gold" id="btn-novo-aluno">${ICON.plus} Novo aluno</button>`;
  if(state.view==='professores') topActions.innerHTML = `<button class="btn btn-gold" id="btn-novo-professor">${ICON.plus} Novo professor</button>`;
  if(state.view==='horarios') topActions.innerHTML = `<button class="btn btn-gold" id="btn-novo-horario">${ICON.plus} Novo horário</button>`;

  const c = $('#view-container');
  if(state.view==='overview') c.innerHTML = viewOverview();
  if(state.view==='alunos') c.innerHTML = viewAlunos();
  if(state.view==='professores') c.innerHTML = viewProfessores();
  if(state.view==='horarios') c.innerHTML = viewHorarios();

  attachViewHandlers();
}

/* ---------------- OVERVIEW ---------------- */
function viewOverview(){
  const totalMensal = alunos.reduce((s,a)=> s + (PLANOS[a.plano]?.valor||0), 0);
  const pendentes = alunos.filter(a=>!a.pago).length;
  const proximas = [...horarios].sort((a,b)=> DIAS.indexOf(a.dia)-DIAS.indexOf(b.dia) || a.hora.localeCompare(b.hora)).slice(0,5);
  return `
  <div class="stat-grid">
    <div class="stat-card"><div class="num">${alunos.length}</div><div class="lbl">Alunos ativos</div></div>
    <div class="stat-card"><div class="num">${professores.length}</div><div class="lbl">Professores</div></div>
    <div class="stat-card"><div class="num">${horarios.length}</div><div class="lbl">Aulas na semana</div></div>
    <div class="stat-card"><div class="num">R$ ${totalMensal.toLocaleString('pt-BR')}</div><div class="lbl">Receita mensal prevista</div></div>
    <div class="stat-card"><div class="num">${pendentes}</div><div class="lbl">Mensalidades pendentes</div></div>
  </div>
  <div class="overview-sec">
    <h3>Próximas aulas</h3>
    ${proximas.map(h=>{
      const al = alunos.find(a=>a.id===h.alunoId), pr = professores.find(p=>p.id===h.professorId);
      return `<div class="mini-row"><span>${escapeHtml(al?al.nome:'—')} · ${escapeHtml(h.instrumento)} com ${escapeHtml(pr?pr.nome:'—')}</span><span class="tag">${h.dia} ${h.hora}</span></div>`;
    }).join('') || '<div class="mini-row">Nenhuma aula cadastrada.</div>'}
  </div>
  <div class="overview-sec">
    <h3>Tabela de mensalidades</h3>
    ${Object.entries(PLANOS).map(([k,v])=>`<div class="mini-row"><span>${v.label}</span><span class="tag">R$ ${v.valor}</span></div>`).join('')}
  </div>`;
}

/* ---------------- ALUNOS ---------------- */
function viewAlunos(){
  if(alunos.length===0) return emptyState('Nenhum aluno cadastrado ainda.','btn-novo-aluno-empty','Cadastrar aluno');
  return `<div class="people-grid">${alunos.map(a=>{
    const dc = a.dias.map((d,i)=>`${d} ${a.horarios[i]||''}`).join(' · ');
    return `<div class="person-card">
      <div class="person-top">
        <div class="avatar">${initials(a.nome)}</div>
        <div style="flex:1;min-width:0;">
          <div class="person-name">${escapeHtml(a.nome)}</div>
          <div class="person-sub">${escapeHtml(a.instrumento)}</div>
        </div>
        <span class="badge ${a.pago?'paid':'pending'}">${a.pago?'Pago':'Pendente'}</span>
      </div>
      <div class="person-meta">${a.dias.map(d=>`<span class="chip">${d}</span>`).join('')}</div>
      <div class="person-schedule">Horários: <b>${dc||'—'}</b></div>
      <div class="person-actions">
        <span class="badge">${PLANOS[a.plano]?.label} · R$${PLANOS[a.plano]?.valor}</span>
        <button class="icon-btn edit-aluno" data-id="${a.id}" style="margin-left:auto;" aria-label="Editar aluno">${ICON.edit}</button>
        <button class="icon-btn danger del-aluno" data-id="${a.id}" aria-label="Excluir aluno">${ICON.trash}</button>
      </div>
    </div>`;
  }).join('')}</div>`;
}

/* ---------------- PROFESSORES ---------------- */
function viewProfessores(){
  if(professores.length===0) return emptyState('Nenhum professor cadastrado ainda.','btn-novo-professor-empty','Cadastrar professor');
  return `<div class="people-grid">${professores.map(p=>{
    const dc = p.dias.map((d,i)=>`${d} ${p.horarios[i]||''}`).join(' · ');
    return `<div class="person-card">
      <div class="person-top">
        <div class="avatar">${initials(p.nome)}</div>
        <div style="flex:1;min-width:0;">
          <div class="person-name">${escapeHtml(p.nome)}</div>
          <div class="person-sub">${escapeHtml(p.instrumento)}</div>
        </div>
        <span class="badge">${escapeHtml(p.instrumento)}</span>
      </div>
      <div class="person-meta">${p.dias.map(d=>`<span class="chip">${d}</span>`).join('')}</div>
      <div class="person-schedule">Horários: <b>${dc||'—'}</b></div>
      <div class="person-actions">
        <button class="icon-btn edit-professor" data-id="${p.id}" style="margin-left:auto;" aria-label="Editar professor">${ICON.edit}</button>
        <button class="icon-btn danger del-professor" data-id="${p.id}" aria-label="Excluir professor">${ICON.trash}</button>
      </div>
    </div>`;
  }).join('')}</div>`;
}

/* ---------------- HORARIOS ---------------- */
function viewHorarios(){
  const countByDay = d => horarios.filter(h=>h.dia===d).length;
  const pills = DIAS.map(d=>`<button class="day-pill ${state.selectedDay===d?'active':''}" data-day="${d}">${d} <span class="cnt">${countByDay(d)}</span></button>`).join('');
  const dayItems = horarios.filter(h=>h.dia===state.selectedDay).sort((a,b)=>a.hora.localeCompare(b.hora));

  let body;
  if(dayItems.length===0){
    body = `<div class="empty-state">${ICON.calendar}<p>Nenhuma aula agendada para ${state.selectedDay}.</p>
      <button class="btn btn-dark" id="btn-agendar-dia">${ICON.plus} Agendar aula em ${state.selectedDay}</button></div>`;
  } else {
    body = `<div class="schedule-grid">${dayItems.map(h=> renderTicket(h)).join('')}</div>`;
  }
  return `<div class="day-pills">${pills}</div>${body}`;
}

function renderTicket(h){
  const al = alunos.find(a=>a.id===h.alunoId);
  const pr = professores.find(p=>p.id===h.professorId);
  if(state.editingHorarioId === h.id){
    return `<div class="ticket-card ticket-edit" data-id="${h.id}">
      <div class="ticket-edit-head">
        <span>Editar horário</span>
        <div class="ticket-edit-actions">
          <button class="btn-sm cancel" data-cancel-edit="${h.id}">Cancelar</button>
          <button class="btn-sm save" data-save-edit="${h.id}">Salvar</button>
        </div>
      </div>
      <div class="ticket-edit-body">
        ${ifield({id:`e-hora-${h.id}`, label:'Hora', icon:ICON.clock, type:'time', value:h.hora, dark:true})}
        ${ifield({id:`e-dia-${h.id}`, label:'Dia', icon:ICON.calendar, dark:true, options:DIAS.map(d=>({value:d,label:d})), value:h.dia})}
        ${ifield({id:`e-instr-${h.id}`, label:'Instrumento', icon:ICON.music, value:h.instrumento, dark:true})}
        ${ifield({id:`e-aluno-${h.id}`, label:'Aluno', icon:ICON.user, dark:true, options:alunos.map(a=>({value:a.id,label:a.nome})), value:h.alunoId})}
        ${ifield({id:`e-prof-${h.id}`, label:'Professor', icon:ICON.user, dark:true, options:professores.map(p=>({value:p.id,label:p.nome})), value:h.professorId})}
      </div>
      <div class="ticket-edit-foot">
        <button class="link-danger" data-del-horario="${h.id}">${ICON.trash} Excluir este horário</button>
      </div>
    </div>`;
  }
  return `<div class="ticket-card">
    <div class="ticket-band"><span class="day">${h.dia}</span><span class="time">${h.hora}</span></div>
    <div class="ticket-perf"></div>
    <div class="ticket-body">
      <div class="ticket-instrument">${ICON.music}${escapeHtml(h.instrumento)}</div>
      <div class="ticket-people">
        <div class="side"><div class="lbl">Aluno</div><div class="val">${escapeHtml(al?al.nome:'—')}</div></div>
        <div class="ticket-divider"></div>
        <div class="side"><div class="lbl">Professor</div><div class="val">${escapeHtml(pr?pr.nome:'—')}</div></div>
      </div>
      <div class="ticket-actions">
        <button class="icon-btn" data-edit-horario="${h.id}" aria-label="Editar">${ICON.edit}</button>
        <button class="icon-btn danger" data-del-horario="${h.id}" aria-label="Excluir">${ICON.trash}</button>
      </div>
    </div>
  </div>`;
}

function emptyState(msg,btnId,btnLabel){
  return `<div class="empty-state">${ICON.calendar}<p>${msg}</p><button class="btn btn-dark" id="${btnId}">${ICON.plus} ${btnLabel}</button></div>`;
}

/* ============================================================
   VIEW EVENT HANDLERS
   ============================================================ */
function attachViewHandlers(){
  $('#btn-novo-aluno')?.addEventListener('click', ()=> openModalNovoAluno());
  $('#btn-novo-aluno-empty')?.addEventListener('click', ()=> openModalNovoAluno());
  $('#btn-novo-professor')?.addEventListener('click', ()=> openModalNovoProfessor());
  $('#btn-novo-professor-empty')?.addEventListener('click', ()=> openModalNovoProfessor());
  $('#btn-novo-horario')?.addEventListener('click', ()=> openModalNovoHorario());
  $('#btn-agendar-dia')?.addEventListener('click', ()=> openModalNovoHorario(state.selectedDay));

  $$('.edit-aluno').forEach(b=> b.addEventListener('click', ()=> openProfile('aluno', b.dataset.id)));
  $$('.edit-professor').forEach(b=> b.addEventListener('click', ()=> openProfile('professor', b.dataset.id)));
  $$('.del-aluno').forEach(b=> b.addEventListener('click', ()=>{
    if(confirm('Excluir este aluno? As aulas vinculadas também serão removidas.')){
      alunos = alunos.filter(a=>a.id!==b.dataset.id);
      horarios = horarios.filter(h=>h.alunoId!==b.dataset.id);
      renderView();
    }
  }));
  $$('.del-professor').forEach(b=> b.addEventListener('click', ()=>{
    if(confirm('Excluir este professor? As aulas vinculadas também serão removidas.')){
      professores = professores.filter(p=>p.id!==b.dataset.id);
      horarios = horarios.filter(h=>h.professorId!==b.dataset.id);
      renderView();
    }
  }));

  $$('.day-pill').forEach(b=> b.addEventListener('click', ()=>{ state.selectedDay=b.dataset.day; state.editingHorarioId=null; renderView(); }));
  $$('[data-edit-horario]').forEach(b=> b.addEventListener('click', ()=>{ state.editingHorarioId=b.dataset.editHorario; renderView(); }));
  $$('[data-cancel-edit]').forEach(b=> b.addEventListener('click', ()=>{ state.editingHorarioId=null; renderView(); }));
  $$('[data-del-horario]').forEach(b=> b.addEventListener('click', ()=>{
    const id = b.dataset.delHorario;
    if(confirm('Excluir este horário?')){ horarios = horarios.filter(h=>h.id!==id); state.editingHorarioId=null; renderView(); }
  }));
  $$('[data-save-edit]').forEach(b=> b.addEventListener('click', ()=>{
    const id = b.dataset.saveEdit;
    const h = horarios.find(x=>x.id===id);
    h.hora = $(`#e-hora-${id}`).value || h.hora;
    h.dia = $(`#e-dia-${id}`).value;
    h.instrumento = $(`#e-instr-${id}`).value.trim() || h.instrumento;
    h.alunoId = $(`#e-aluno-${id}`).value;
    h.professorId = $(`#e-prof-${id}`).value;
    state.editingHorarioId = null;
    renderView();
  }));
}

/* ============================================================
   MODALS
   ============================================================ */
function closeModal(){ $('#modal-root').innerHTML=''; }

function pillGroup(name, opts, selected){
  return `<div class="pill-select" data-group="${name}">${opts.map(o=>`<button type="button" class="pill-opt dark ${selected.includes(o)?'on':''}" data-val="${o}">${o}</button>`).join('')}</div>`;
}

function attachPhoneEmailValidation(root, phoneId, emailId, errPhoneId, errEmailId, onChange){
  const phoneInp = $(`#${phoneId}`, root), emailInp = $(`#${emailId}`, root);
  phoneInp.addEventListener('input', ()=>{ phoneInp.value = maskPhone(phoneInp.value); validate(); });
  emailInp.addEventListener('input', validate);
  function validate(){
    const digits = phoneDigits(phoneInp.value);
    const errP = $(`#${errPhoneId}`, root);
    errP.classList.toggle('show', digits.length>0 && digits.length<11);
    errP.textContent = 'Telefone incompleto — informe os 11 dígitos.';
    const errE = $(`#${errEmailId}`, root);
    const emailTouched = emailInp.value.length>0;
    const emailOk = isValidEmail(emailInp.value);
    errE.classList.toggle('show', emailTouched && !emailOk);
    errE.textContent = 'Informe um e-mail válido (ex: nome@dominio.com).';
    onChange && onChange({phoneOk: digits.length===11, emailOk});
  }
  return validate;
}

function openModalNovoAluno(){ /*pedir cpf aqui tambem| OK*/
  const dias=[], horas=[];
  const html = `<div class="modal-overlay" id="modal-overlay">
    <div class="modal">
      <div class="modal-head"><h3>Novo aluno</h3><button class="modal-close" id="modal-close">${ICON.x}</button></div>
      <div class="modal-body">
        ${ifield({id:'na-nome', label:'Nome', icon:ICON.user})}
        ${ifield({id:'np-cpf', label:'CPF', icon:ICON.user, placeholder:'000.000.000-00'})}
        ${ifield({id:'na-nascimento', label:'Data de nascimento', icon:ICON.cake, type:'date'})}
        ${ifield({id:'na-telefone', label:'Telefone', icon:ICON.phone, type:'tel', placeholder:'(84) 90000-0000', errorId:'err-na-telefone'})}
        ${ifield({id:'na-email', label:'E-mail', icon:ICON.mail, type:'email', errorId:'err-na-email'})}
        ${ifield({id:'na-instrumento', label:'Instrumento', icon:ICON.music})}
        <div>
          <div class="field-group-lbl" style="margin-bottom:8px;">Dias disponíveis</div>
          ${pillGroup('dias', DIAS, dias)}
        </div>
        <div>
          <div class="field-group-lbl" style="margin-bottom:8px;">Horários disponíveis</div>
          ${pillGroup('horas', HORAS, horas)}
        </div>
        ${ifield({id:'na-plano', label:'Plano', icon:ICON.tag, options:Object.entries(PLANOS).map(([k,v])=>({value:k,label:v.label}))})}
        ${ifield({id:'na-mensalidade', label:'Mensalidade', icon:ICON.cash, readonly:true, value:'R$ 60'})}
      </div>
      <div class="modal-foot"><button class="btn btn-gold" id="na-submit" disabled>${ICON.plus} Cadastrar aluno</button></div>
    </div>
  </div>`;
  $('#modal-root').innerHTML = html;
  const root = $('#modal-root');
  $('#modal-close',root).addEventListener('click', closeModal);
  $('#modal-overlay',root).addEventListener('click', e=>{ if(e.target.id==='modal-overlay') closeModal(); });

  $$('.pill-opt', root).forEach(p=> p.addEventListener('click', ()=>{
    p.classList.toggle('on');
    checkValid();
  }));
  $('#na-plano',root).addEventListener('change', ()=>{
    const v = $('#na-plano',root).value;
    $('#na-mensalidade',root).value = 'R$ ' + PLANOS[v].valor;
  });

  const nomeInp = $('#na-nome',root);
  function checkValid(){
    const digits = phoneDigits($('#na-telefone',root).value);
    const emailOk = isValidEmail($('#na-email',root).value);
    const nomeOk = nomeInp.value.trim().length>0;
    $('#na-submit',root).disabled = !(nomeOk && digits.length===11 && emailOk);
  }
  nomeInp.addEventListener('input', checkValid);
  attachPhoneEmailValidation(root,'na-telefone','na-email','err-na-telefone','err-na-email', checkValid);

  $('#na-submit',root).addEventListener('click', ()=>{
    const selDias = $$('.pill-select[data-group="dias"] .pill-opt.on', root).map(p=>p.dataset.val);
    const selHoras = $$('.pill-select[data-group="horas"] .pill-opt.on', root).map(p=>p.dataset.val);
    const novo = {
      id: nextId(),
      nome: nomeInp.value.trim(),
      cpf: $('#np-cpf',root).value.trim(),
      instrumento: $('#na-instrumento',root).value.trim() || 'A definir',
      dias: selDias, horarios: selHoras,
      telefone: phoneDigits($('#na-telefone',root).value),
      email: $('#na-email',root).value.trim(),
      nascimento: $('#na-nascimento',root).value,
      plano: Number($('#na-plano',root).value),
      pago:false,
    };
    alunos.push(novo);
    closeModal();
    state.view='alunos'; renderView();
  });
}

function openModalNovoProfessor(){/*form ja pedindo cpf|OK*/
  const dias=[], horas=[];
  const html = `<div class="modal-overlay" id="modal-overlay">
    <div class="modal">
      <div class="modal-head"><h3>Novo professor</h3><button class="modal-close" id="modal-close">${ICON.x}</button></div>
      <div class="modal-body">
        ${ifield({id:'np-nome', label:'Nome', icon:ICON.user})}
        ${ifield({id:'np-cpf', label:'CPF', icon:ICON.user, placeholder:'000.000.000-00'})}
        ${ifield({id:'np-nascimento', label:'Data de nascimento', icon:ICON.cake, type:'date'})}
        ${ifield({id:'np-telefone', label:'Telefone', icon:ICON.phone, type:'tel', placeholder:'(84) 90000-0000', errorId:'err-np-telefone'})}
        ${ifield({id:'np-email', label:'E-mail (opcional)', icon:ICON.mail, type:'email', errorId:'err-np-email'})}
        ${ifield({id:'np-instrumento', label:'Especialidade', icon:ICON.music})}
        <div>
          <div class="field-group-lbl" style="margin-bottom:8px;">Dias disponíveis</div>
          ${pillGroup('dias', DIAS, dias)}
        </div>
        <div>
          <div class="field-group-lbl" style="margin-bottom:8px;">Horários disponíveis</div>
          ${pillGroup('horas', HORAS, horas)}
        </div>
      </div>
      <div class="modal-foot"><button class="btn btn-gold" id="np-submit" disabled>${ICON.plus} Cadastrar professor</button></div>
    </div>
  </div>`;
  $('#modal-root').innerHTML = html;
  const root = $('#modal-root');
  $('#modal-close',root).addEventListener('click', closeModal);
  $('#modal-overlay',root).addEventListener('click', e=>{ if(e.target.id==='modal-overlay') closeModal(); });
  $$('.pill-opt', root).forEach(p=> p.addEventListener('click', ()=>{ p.classList.toggle('on'); }));

  const nomeInp = $('#np-nome',root);
  function checkValid(){
    const digits = phoneDigits($('#np-telefone',root).value);
    const emailOk = isValidEmail($('#np-email',root).value);
    const nomeOk = nomeInp.value.trim().length>0;
    $('#np-submit',root).disabled = !(nomeOk && digits.length===11 && emailOk);
  }
  nomeInp.addEventListener('input', checkValid);
  attachPhoneEmailValidation(root,'np-telefone','np-email','err-np-telefone','err-np-email', checkValid);

  $('#np-submit',root).addEventListener('click', ()=>{
    const selDias = $$('.pill-select[data-group="dias"] .pill-opt.on', root).map(p=>p.dataset.val);
    const selHoras = $$('.pill-select[data-group="horas"] .pill-opt.on', root).map(p=>p.dataset.val);
    const novo = {
      id: nextId(),
      nome: nomeInp.value.trim(),
      cpf: $('#np-cpf',root).value.trim(),
      instrumento: $('#np-instrumento',root).value.trim() || 'A definir',
      dias: selDias, horarios: selHoras,
      telefone: phoneDigits($('#np-telefone',root).value),
      email: $('#np-email',root).value.trim(),
      nascimento: $('#np-nascimento',root).value,
    };
    professores.push(novo);
    closeModal();
    state.view='professores'; renderView();
  });
}

function openModalNovoHorario(defaultDia){
  const html = `<div class="modal-overlay" id="modal-overlay">
    <div class="modal">
      <div class="modal-head"><h3>Novo horário</h3><button class="modal-close" id="modal-close">${ICON.x}</button></div>
      <div class="modal-body">
        ${ifield({id:'nh-aluno', label:'Aluno', icon:ICON.user, options:alunos.map(a=>({value:a.id,label:a.nome}))})}
        ${ifield({id:'nh-professor', label:'Professor', icon:ICON.user, options:professores.map(p=>({value:p.id,label:p.nome}))})}
        ${ifield({id:'nh-instrumento', label:'Instrumento', icon:ICON.music})}
        ${ifield({id:'nh-dia', label:'Dia', icon:ICON.calendar, options:DIAS.map(d=>({value:d,label:d})), value:defaultDia||DIAS[0]})}
        ${ifield({id:'nh-hora', label:'Hora', icon:ICON.clock, type:'time', value:'09:00'})}
      </div>
      <div class="modal-foot"><button class="btn btn-gold" id="nh-submit">${ICON.plus} Agendar aula</button></div>
    </div>
  </div>`;
  $('#modal-root').innerHTML = html;
  const root = $('#modal-root');
  $('#modal-close',root).addEventListener('click', closeModal);
  $('#modal-overlay',root).addEventListener('click', e=>{ if(e.target.id==='modal-overlay') closeModal(); });

  const alunoSel = $('#nh-aluno',root);
  const instrInp = $('#nh-instrumento',root);
  function syncInstrumento(){
    const al = alunos.find(a=>a.id===alunoSel.value);
    if(al && !instrInp.dataset.touched) instrInp.value = al.instrumento;
  }
  alunoSel.addEventListener('change', syncInstrumento);
  instrInp.addEventListener('input', ()=> instrInp.dataset.touched='1');
  syncInstrumento();

  $('#nh-submit',root).addEventListener('click', ()=>{
    if(alunos.length===0 || professores.length===0){ alert('Cadastre ao menos um aluno e um professor antes de agendar.'); return; }
    horarios.push({
      id: nextId(),
      dia: $('#nh-dia',root).value,
      hora: $('#nh-hora',root).value || '09:00',
      instrumento: instrInp.value.trim() || 'Aula',
      alunoId: alunoSel.value,
      professorId: $('#nh-professor',root).value,
    });
    closeModal();
    state.view='horarios'; state.selectedDay = $('#nh-dia',root)?.value || state.selectedDay;
    renderView();
  });
}

/* ============================================================
   PROFILE (FULLSCREEN)
   ============================================================ */
function closeProfile(){ $('#profile-root').innerHTML=''; }

function openProfile(type, id){
  if(type==='aluno') renderAlunoProfile(id); else renderProfessorProfile(id);
}

function renderAlunoProfile(id){
  const a = alunos.find(x=>x.id===id);
  if(!a) return;
  const html = `<div id="profile-overlay">
    <div class="profile-head">
      <button class="profile-back" id="profile-back">${ICON.back}</button>
      <div class="profile-id">
        <div class="profile-avatar">${initials(a.nome)}</div>
        <div>
          <h2>${escapeHtml(a.nome)}</h2>
          <span class="badge">${PLANOS[a.plano].label}</span>
        </div>
      </div>
    </div>
    <div class="profile-body">
      <div class="profile-panel">
        <div class="pay-toggle-wrap">
          <span>Situação da mensalidade</span>
          <label class="switch"><input type="checkbox" id="pf-pago" ${a.pago?'checked':''}><span class="track"></span></label>
        </div>
        <h4>${ICON.user} Dados pessoais</h4>
        <div class="field-row">
          ${ifield({id:'pf-nome', label:'Nome', icon:ICON.user, value:a.nome})}
          ${ifield({id:'qf-cpf', label:'CPF', icon:ICON.user, value:a.cpf||'', placeholder:'000.000.000-00'})}
          ${ifield({id:'pf-nascimento', label:'Data de nascimento', icon:ICON.cake, type:'date', value:a.nascimento})}
        </div>
        <div class="field-row">
          ${ifield({id:'pf-telefone', label:'Telefone', icon:ICON.phone, type:'tel', value:maskPhone(a.telefone), errorId:'err-pf-telefone'})}
          ${ifield({id:'pf-email', label:'E-mail', icon:ICON.mail, type:'email', value:a.email, errorId:'err-pf-email'})}
        </div>
        <div class="field-row">
          ${ifield({id:'pf-plano', label:'Plano', icon:ICON.tag, options:Object.entries(PLANOS).map(([k,v])=>({value:k,label:v.label})), value:a.plano})}
          ${ifield({id:'pf-mensalidade', label:'Mensalidade', icon:ICON.cash, readonly:true, value:'R$ '+PLANOS[a.plano].valor})}
        </div>
      </div>
      <div class="profile-panel">
        <h4>${ICON.calendar} Disponibilidade</h4>
        <div class="field-group-lbl" style="margin-bottom:8px;">Dias disponíveis</div>
        ${pillGroup('dias', DIAS, a.dias)}
        <div class="field-group-lbl" style="margin:16px 0 8px;">Horários disponíveis</div>
        ${pillGroup('horas', HORAS, a.horarios)}
      </div>
      <div class="profile-save-bar">
        <button class="btn btn-dark" id="pf-save" disabled>Salvar alterações</button>
      </div>
    </div>
  </div>`;
  $('#profile-root').innerHTML = html;
  const root = $('#profile-root');
  $('#profile-back',root).addEventListener('click', closeProfile);

  const saveBtn = $('#pf-save',root);
  function markDirty(){ saveBtn.disabled=false; }
  $$('input, select', root).forEach(inp=> { inp.addEventListener('input', markDirty); inp.addEventListener('change', markDirty); });
  $$('.pill-opt', root).forEach(p=> p.addEventListener('click', ()=>{ p.classList.toggle('on'); markDirty(); }));

  $('#pf-telefone',root).addEventListener('input', ()=>{
    const inp=$('#pf-telefone',root); inp.value = maskPhone(inp.value);
    const digits = phoneDigits(inp.value);
    const err = $('#err-pf-telefone',root);
    err.classList.toggle('show', digits.length>0 && digits.length<11);
    err.textContent='Telefone incompleto — informe os 11 dígitos.';
  });
  $('#pf-email',root).addEventListener('input', ()=>{
    const v=$('#pf-email',root).value; const err=$('#err-pf-email',root);
    err.classList.toggle('show', v.length>0 && !isValidEmail(v));
    err.textContent='Informe um e-mail válido (ex: nome@dominio.com).';
  });
  $('#pf-plano',root).addEventListener('change', ()=>{
    const v = $('#pf-plano',root).value;
    $('#pf-mensalidade',root).value = 'R$ ' + PLANOS[v].valor;
  });

  saveBtn.addEventListener('click', ()=>{
    a.nome = $('#pf-nome',root).value.trim() || a.nome;
    a.cpf = $('#qf-cpf',root).value.trim();
    a.nascimento = $('#pf-nascimento',root).value;
    a.telefone = phoneDigits($('#pf-telefone',root).value) || a.telefone;
    a.email = $('#pf-email',root).value.trim();
    a.plano = Number($('#pf-plano',root).value);
    a.pago = $('#pf-pago',root).checked;
    a.dias = $$('.pill-select[data-group="dias"] .pill-opt.on', root).map(p=>p.dataset.val);
    a.horarios = $$('.pill-select[data-group="horas"] .pill-opt.on', root).map(p=>p.dataset.val);
    closeProfile();
    renderView();
  });
}

function renderProfessorProfile(id){
  const p = professores.find(x=>x.id===id);
  if(!p) return;
  const html = `<div id="profile-overlay">
    <div class="profile-head">
      <button class="profile-back" id="profile-back">${ICON.back}</button>
      <div class="profile-id">
        <div class="profile-avatar">${initials(p.nome)}</div>
        <div>
          <h2>${escapeHtml(p.nome)}</h2>
          <span class="badge">${escapeHtml(p.instrumento)}</span>
        </div>
      </div>
    </div>
    <div class="profile-body">
      <div class="profile-panel">
        <h4>${ICON.user} Dados pessoais</h4>
        <div class="field-row">
          ${ifield({id:'qf-nome', label:'Nome completo', icon:ICON.user, value:p.nome})}
          ${ifield({id:'qf-cpf', label:'CPF', icon:ICON.user, value:p.cpf})}
          ${ifield({id:'qf-instrumento', label:'Instrumento / especialidade', icon:ICON.music, value:p.instrumento})}
        </div>
        <div class="field-row">
          ${ifield({id:'qf-nascimento', label:'Data de nascimento', icon:ICON.cake, type:'date', value:p.nascimento})}
        </div>
        <div class="field-row">
          ${ifield({id:'qf-telefone', label:'Telefone', icon:ICON.phone, type:'tel', value:maskPhone(p.telefone), errorId:'err-qf-telefone'})}
          ${ifield({id:'qf-email', label:'E-mail', icon:ICON.mail, type:'email', value:p.email, errorId:'err-qf-email'})}
        </div>
      </div>
      <div class="profile-panel">
        <h4>${ICON.calendar} Disponibilidade</h4>
        <div class="field-group-lbl" style="margin-bottom:8px;">Dias disponíveis</div>
        ${pillGroup('dias', DIAS, p.dias)}
        <div class="field-group-lbl" style="margin:16px 0 8px;">Horários disponíveis</div>
        ${pillGroup('horas', HORAS, p.horarios)}
      </div>
      <div class="profile-save-bar">
        <button class="btn btn-dark" id="qf-save" disabled>Salvar alterações</button>
      </div>
    </div>
  </div>`;
  $('#profile-root').innerHTML = html;
  const root = $('#profile-root');
  $('#profile-back',root).addEventListener('click', closeProfile);

  const saveBtn = $('#qf-save',root);
  function markDirty(){ saveBtn.disabled=false; }
  $$('input, select', root).forEach(inp=> { inp.addEventListener('input', markDirty); inp.addEventListener('change', markDirty); });
  $$('.pill-opt', root).forEach(pl=> pl.addEventListener('click', ()=>{ pl.classList.toggle('on'); markDirty(); }));

  $('#qf-telefone',root).addEventListener('input', ()=>{
    const inp=$('#qf-telefone',root); inp.value = maskPhone(inp.value);
    const digits = phoneDigits(inp.value);
    const err = $('#err-qf-telefone',root);
    err.classList.toggle('show', digits.length>0 && digits.length<11);
    err.textContent='Telefone incompleto — informe os 11 dígitos.';
  });
  $('#qf-email',root).addEventListener('input', ()=>{
    const v=$('#qf-email',root).value; const err=$('#err-qf-email',root);
    err.classList.toggle('show', v.length>0 && !isValidEmail(v));
    err.textContent='Informe um e-mail válido (ex: nome@dominio.com).';
  });

  saveBtn.addEventListener('click', ()=>{
    p.nome = $('#qf-nome',root).value.trim() || p.nome;
    p.cpf = $('#qf-cpf',root).value.trim();
    p.instrumento = $('#qf-instrumento',root).value.trim() || p.instrumento;
    p.nascimento = $('#qf-nascimento',root).value;
    p.telefone = phoneDigits($('#qf-telefone',root).value) || p.telefone;
    p.email = $('#qf-email',root).value.trim();
    p.dias = $$('.pill-select[data-group="dias"] .pill-opt.on', root).map(pl=>pl.dataset.val);
    p.horarios = $$('.pill-select[data-group="horas"] .pill-opt.on', root).map(pl=>pl.dataset.val);
    closeProfile();
    renderView();
  });
}

/* ============================================================
   CALENDAR OVERLAY
   ============================================================ */
function renderCalendarOverlay(){
  const cal = $('#calendar-overlay');
  cal.innerHTML = `
    <div class="cal-head">
      <div><h2 style="font-family:var(--font-display);font-size:22px;">Calendário semanal</h2><div class="sub" style="color:var(--muted);font-size:13px;margin-top:2px;">Clique no logo ou no X para voltar ao painel</div></div>
      <button class="cal-close" id="cal-close" aria-label="Fechar calendário">${ICON.x}</button>
    </div>
    <div class="cal-grid">
      ${DIAS.map(d=>{
        const items = horarios.filter(h=>h.dia===d).sort((a,b)=>a.hora.localeCompare(b.hora));
        return `<div class="cal-col">
          <h4>${d}</h4>
          <div class="slots">
            ${items.map(h=>{
              const al = alunos.find(a=>a.id===h.alunoId), pr = professores.find(p=>p.id===h.professorId);
              return `<div class="cal-slot">${h.hora} — ${escapeHtml(h.instrumento)}<small>${escapeHtml(al?al.nome:'—')} / ${escapeHtml(pr?pr.nome:'—')}</small></div>`;
            }).join('') || `<div style="font-size:11.5px;color:var(--muted);padding:6px 2px;">Sem aulas</div>`}
          </div>
        </div>`;
      }).join('')}
    </div>`;
  cal.classList.remove('hidden');
  $('#cal-close').addEventListener('click', ()=> cal.classList.add('hidden'));
}

})();
