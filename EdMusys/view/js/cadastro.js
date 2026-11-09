document.addEventListener("DOMContentLoaded", () => {
  const formCadastro = document.getElementById("formCadastro") || document.querySelector("form");

  if (!formCadastro) return;

  formCadastro.addEventListener("submit", async (e) => {
    e.preventDefault();

    const senha = document.getElementById("senha")?.value.trim() || "";
    const confirmarSenha = document.getElementById("confirmarSenha")?.value.trim() || "";

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
