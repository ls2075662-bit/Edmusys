document.addEventListener("DOMContentLoaded", () => {
  const roleButtons = document.querySelectorAll(".pill-opt");
  const loginError = document.getElementById("loginError");
  let perfilSelecionado = "professor";

  roleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      roleButtons.forEach(b => b.classList.remove("on"));
      btn.classList.add("on");
      perfilSelecionado = btn.dataset.role || "administrador";
      if (loginError) loginError.classList.remove("show");
    });
  });

  const btnAdministrador = document.getElementById("btn-administrador");
  const adminLoginFields = document.getElementById("adminLoginFields");
  const userLoginFields = document.getElementById("userLoginFields");

  const adminUser = document.getElementById("adminUser");
  const adminPass = document.getElementById("adminPass");

  const userLogin = document.getElementById("userLogin");
  const userPassword = document.getElementById("userPassword");

  const enterBtn = document.getElementById("enterBtn");
  const novoAdminBtn = document.getElementById("novoAdmin");

  if (btnAdministrador) {
    btnAdministrador.addEventListener("click", () => {
      adminLoginFields.style.display = "block";
      userLoginFields.style.display = "none";
      perfilSelecionado = "administrador";
      if (novoAdminBtn) novoAdminBtn.style.display = "block";
    });
  }

  const profBtn = document.querySelector('[data-role="professor"]');
  if (profBtn) {
    profBtn.addEventListener("click", () => {
      adminLoginFields.style.display = "none";
      userLoginFields.style.display = "block";
      perfilSelecionado = "professor";
      if (novoAdminBtn) novoAdminBtn.style.display = "none";
    });
  }

  const alunoBtn = document.querySelector('[data-role="aluno"]');
  if (alunoBtn) {
    alunoBtn.addEventListener("click", () => {
      adminLoginFields.style.display = "none";
      userLoginFields.style.display = "block";
      perfilSelecionado = "aluno";
      if (novoAdminBtn) novoAdminBtn.style.display = "none";
    });
  }

  enterBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    let usuario = perfilSelecionado === "administrador" 
      ? (adminUser ? adminUser.value.trim() : "")
      : (userLogin ? userLogin.value.trim() : "");

    let senha = perfilSelecionado === "administrador"
      ? (adminPass ? adminPass.value.trim() : "")
      : (userPassword ? userPassword.value.trim() : "");

    if (!usuario || !senha) {
      alert("Por favor, preencha o e-mail/CPF e a senha.");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: usuario, senha: senha })
      });

      const data = await response.json();

      if (!response.ok) {
        const mensagemErro = data.detail || "E-mail ou senha incorretos!";
        if (loginError) {
          loginError.textContent = mensagemErro;
          loginError.classList.add("show");
        } else {
          alert(mensagemErro);
        }
        return;
      }

      const userData = {
        id: data.user_id,
        nome: data.nome,
        email: data.email
      };

      // Sessão JWT genérica
      localStorage.setItem("edmusys_token", data.access_token);
      localStorage.setItem("edmusys_role", data.role);
      localStorage.setItem("edmusys_user", JSON.stringify(userData));

      // Gravação das chaves esperadas por cada portal
      switch (data.role) {
        case "admin":
          localStorage.setItem("adminLogado", "true");
          window.location.href = "index.html";
          break;

        case "professor":
          localStorage.setItem("edmusys_professor_logado", JSON.stringify(userData));
          window.location.href = "portal_professor.html";
          break;

        case "aluno":
          localStorage.setItem("edmusys_aluno_logado", JSON.stringify(userData));
          window.location.href = "portal_aluno.html";
          break;

        default:
          alert("Perfil de usuário não reconhecido.");
      }

    } catch (error) {
      console.error("Erro no login:", error);
      alert("Erro de conexão com o servidor. Verifique se a aplicação Python está rodando.");
    }
  });
});
