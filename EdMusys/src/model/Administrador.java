public class Administrador() {
    String nome;
    String email;
    String cpf;
    String senha;

    public Administrador(String nome, String email, String cpf, String senha) {
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.senha = senha;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.nome = email;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.nome = cpf;
    }

    public void setSenha(String senha) {
        this.nome = senha;
    }
}