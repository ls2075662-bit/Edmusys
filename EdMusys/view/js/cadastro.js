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
