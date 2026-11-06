document.addEventListener("DOMContentLoaded", () => {
  const roleButtons = document.querySelectorAll(".pill-opt");
  const loginError = document.getElementById("loginError");
  let perfilSelecionado = "professor";

  // Alternância visual dos botões de perfil (Professor, Administrador, Aluno)
  roleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      roleButtons.forEach(b => b.classList.remove("on"));
      btn.classList.add("on");

      perfilSelecionado = btn.dataset.role || "administrador";

      if (loginError) {
        loginError.classList.remove("show");
      }
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

  // Alternância de campos de formulário entre Admin e Usuário
  if (btnAdministrador) {
    btnAdministrador.addEventListener("click", () => {
      adminLoginFields.style.display = "block";
      userLoginFields.style.display = "none";
      if (novoAdminBtn) novoAdminBtn.style.display = "block";
    });
  }

  const profBtn = document.querySelector('[data-role="professor"]');
  if (profBtn) {
    profBtn.addEventListener("click", () => {
      adminLoginFields.style.display = "none";
      userLoginFields.style.display = "block";
      if (novoAdminBtn) novoAdminBtn.style.display = "none";
    });
  }

  const alunoBtn = document.querySelector('[data-role="aluno"]');
  if (alunoBtn) {
    alunoBtn.addEventListener("click", () => {
      adminLoginFields.style.display = "none";
      userLoginFields.style.display = "block";
      if (novoAdminBtn) novoAdminBtn.style.display = "none";
    });
  }

  // --- INTEGRAÇÃO COM A API FASTAPI ---
  enterBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    let usuario = "";
    let senha = "";

    // Captura os valores dos campos visíveis de acordo com o perfil
    if (perfilSelecionado === "administrador") {
      usuario = adminUser ? adminUser.value.trim() : "";
      senha = adminPass ? adminPass.value.trim() : "";
    } else {
      usuario = userLogin ? userLogin.value.trim() : "";
      senha = userPassword ? userPassword.value.trim() : "";
    }

    if (!usuario || !senha) {
      alert("Por favor, preencha o e-mail e a senha.");
      return;
    }

    try {
      // Requisição POST para a API Python
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: usuario,
          senha: senha
        })
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

      // Salva as informações da sessão no navegador
      localStorage.setItem("edmusys_token", data.access_token);
      localStorage.setItem("edmusys_role", data.role);
      localStorage.setItem(
        "edmusys_user",
        JSON.stringify({
          id: data.user_id,
          nome: data.nome,
          email: data.email
        })
      );

      // Redireciona de acordo com o perfil retornado pela API
      switch (data.role) {
        case "admin":
          localStorage.setItem("adminLogado", "true");
          window.location.href = "index.html";
          break;

        case "professor":
          window.location.href = "portal_professor.html";
          break;

        case "aluno":
          window.location.href = "portal_aluno.html";
          break;

        default:
          alert("Perfil não reconhecido.");
      }

    } catch (error) {
      console.error("Erro na autenticação:", error);
      alert("Erro de conexão com o servidor. Verifique se o servidor Python está ativo.");
    }
  });
});
