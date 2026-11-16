(async function validarAcessoCadastro() {
  try {
    const resp = await fetch("/api/admins/status");
    if (!resp.ok) {
      window.location.replace("/");
      return;
    }
    const data = await resp.json();
    if (data.sistema_virgem !== true) {
      window.location.replace("/");
    }
  } catch (e) {
    window.location.replace("/");
  }
})();

const EYE_OPEN_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_OFF_SVG  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';

function formatarCpf(v) {
  let d = (v || "").replace(/\D/g, "").slice(0, 11);
  if (d.length > 9) return d.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (_, a, b, c, e) => `${a}.${b}.${c}-${e}`);
  if (d.length > 6) return d.replace(/(\d{3})(\d{3})(\d{0,3})/, (_, a, b, c) => `${a}.${b}.${c}`);
  if (d.length > 3) return d.replace(/(\d{3})(\d{0,3})/, (_, a, b) => `${a}.${b}`);
  return d;
}

document.addEventListener("DOMContentLoaded", () => {
  const formCadastro = document.getElementById("formCadastro") || document.querySelector("form");
  const cpfInput = document.getElementById("cpf");

  // Alternar visibilidade das senhas (Criar Senha e Confirmar Senha)
  document.querySelectorAll(".toggle-pass-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const wrapper = btn.closest(".input-wrapper");
      const input = wrapper ? wrapper.querySelector("input") : null;
      if (!input) return;

      const mostrar = input.type === "password";
      input.type = mostrar ? "text" : "password";
      btn.innerHTML = mostrar ? EYE_OFF_SVG : EYE_OPEN_SVG;
      btn.setAttribute("aria-label", mostrar ? "Ocultar senha" : "Mostrar senha");
    });
  });

  if (cpfInput) {
    cpfInput.addEventListener("input", () => {
      cpfInput.value = formatarCpf(cpfInput.value);
    });
  }

  if (!formCadastro) return;

  formCadastro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const senha = document.getElementById("senha")?.value.trim() || "";
    const confirmarSenha = document.getElementById("confirmarSenha")?.value.trim() || "";

    if (senha.length < 8) {
      alert("A senha deve ter no mínimo 8 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas digitadas não coincidem. Por favor, verifique.");
      return;
    }

    const dados = {
      cpf: document.getElementById("cpf")?.value.trim() || "",
      nome: document.getElementById("nome")?.value.trim() || "",
      email: document.getElementById("email")?.value.trim() || "",
      senha: senha
    };

    try {
      const response = await fetch("/api/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
      });

      const resData = await response.json();

      if (!response.ok) {
        alert(resData.detail || "Erro ao realizar o cadastro de administrador.");
        return;
      }

      alert("Administrador cadastrado com sucesso! Pode realizar o login.");
      formCadastro.reset();
      window.location.href = "/";

    } catch (error) {
      console.error("Erro na comunicação com a API:", error);
      alert("Não foi possível conectar ao servidor Python.");
    }
  });
});
