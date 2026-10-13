const roleButtons = document.querySelectorAll(".pill-opt");
  const loginError = document.getElementById("loginError");
  let perfilSelecionado = "professor";

  roleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      roleButtons.forEach(b => b.classList.remove("on"));
      btn.classList.add("on");

      perfilSelecionado = btn.dataset.role || "administrador"

      loginError.classList.remove("show");
    });
  });

  //iniciar com professor selecionado
  const btnAdministrador = document.getElementById("btn-administrador");
  const adminLoginFields = document.getElementById("adminLoginFields");
  const userLoginFields = document.getElementById("userLoginFields");

  const adminUser = document.getElementById("adminUser");
  const adminPass = document.getElementById("adminPass");

  const userLogin = document.getElementById("userLogin");
  const userPassword = document.getElementById("userPassword");

  const enterBtn = document.getElementById("enterBtn");
  const novoAdminBtn = document.getElementById("novoAdmin");

  enterBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // LOGIN DO PROFESSOR
  if (perfilSelecionado === "professor") {

    const usuario = userLogin.value;
    const senha = userPassword.value;

    const professores =
      JSON.parse(localStorage.getItem("edmusys_professores")) || [];

    const identificador = usuario.trim().toLowerCase();
    const cpfDigitado = usuario.replace(/\D/g, "");

    const professorLogado = professores.find(professor => {

      const nome = (professor.nome || "").trim().toLowerCase();
      const email = (professor.email || "").trim().toLowerCase();
      const cpf = (professor.cpf || "").replace(/\D/g, "");

      return (
        (
          nome === identificador ||
          email === identificador ||
          (cpfDigitado.length === 11 && cpf === cpfDigitado)
        ) &&
        professor.senha === senha
      );
    });

    if (professorLogado) {

      localStorage.setItem(
        "edmusys_professor_logado",
        JSON.stringify(professorLogado)
      );

      window.location.href = "portal_professor.html";

    } else {

      alert("Nome, CPF, e-mail ou senha incorretos!");

    }

    return;
  }


  // LOGIN DO ADMINISTRADOR
  if (perfilSelecionado === "administrador") {

    const usuario = adminUser.value;
    const senha = adminPass.value;

    const administradores =
      JSON.parse(localStorage.getItem("edmusys_admins")) || [];

    const administradorCadastrado = administradores.some(admin => {

      const nome = (admin.nome || "").trim().toLowerCase();
      const email = (admin.email || "").trim().toLowerCase();
      const cpf = (admin.cpf || "").replace(/\D/g, "");

      const identificador = usuario.trim().toLowerCase();
      const cpfDigitado = usuario.replace(/\D/g, "");

      return (
        (
          nome === identificador ||
          email === identificador ||
          (cpfDigitado.length === 11 && cpf === cpfDigitado)
        ) &&
        admin.senha === senha
      );
    });

    if (
      (usuario === "admin" && senha === "admin") ||
      administradorCadastrado
    ) {

      localStorage.setItem("adminLogado", "true");

      window.location.href = "index.html";

    } else {

      alert("Usuário ou senha incorretos!");

    }

    return;
  }

  // LOGIN DO ALUNO
if (perfilSelecionado === "aluno") {

const usuario = userLogin.value;
const senha = userPassword.value;

const alunos =
  JSON.parse(localStorage.getItem("edmusys_alunos")) || [];

const identificador = usuario.trim().toLowerCase();
const cpfDigitado = usuario.replace(/\D/g, "");

const alunoLogado = alunos.find(aluno => {

  const nome = (aluno.nome || "").trim().toLowerCase();
  const email = (aluno.email || "").trim().toLowerCase();
  const cpf = (aluno.cpf || "").replace(/\D/g, "");

  return (
    (
      nome === identificador ||
      email === identificador ||
      (cpfDigitado.length === 11 && cpf === cpfDigitado)
    ) &&
    aluno.senha === senha
  );
});

if (alunoLogado) {

  localStorage.setItem(
    "edmusys_aluno_logado",
    JSON.stringify(alunoLogado)
  );

  window.location.href = "portal_aluno.html";

} else {

  alert("Nome, CPF, e-mail ou senha incorretos!");

}

return;
}

});

  btnAdministrador.addEventListener("click", () => {
    adminLoginFields.style.display = "block";
    userLoginFields.style.display = "none";
    novoAdminBtn.style.display = "block";
  });

document.querySelector('[data-role="professor"]').addEventListener("click", () => {
  adminLoginFields.style.display = "none";
  userLoginFields.style.display = "block";
  novoAdminBtn.style.display = "none";
});

document.querySelector('[data-role="aluno"]').addEventListener("click", () => {
  adminLoginFields.style.display = "none";
  userLoginFields.style.display = "block";
  novoAdminBtn.style.display = "none";
});