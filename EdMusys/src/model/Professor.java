package model;

import java.time.LocalDate;

public class Professor {
    private String nome;
    private String telefone;
    private String email;
    private String cpf;
    private String especialidade;
    private String dias_disponiveis;
    private String horarios_disponiveis;
    private String plano;
    private LocalDate dataNascimento;

    public Professor(String nome, String especialidade, String telefone, String email, String cpf, String dias_disponiveis, String horarios_disponiveis, String plano, LocalDate dataNascimento) {
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.cpf = cpf;
        this.especialidade = especialidade;
        this.dias_disponiveis = dias_disponiveis;
        this.horarios_disponiveis = horarios_disponiveis;
        this.plano = plano;
        this.dataNascimento = dataNascimento;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEspecialidade() {
        return instrumento;
    }

    public void setEspecialidade(String instrumento) {
        this.instrumento = instrumento;
    }

    public String getDiasdisponiveis() {
        return dias_disponiveis;
    }

    public void setDiasdisponiveis(String dias_disponiveis) {
        this.dias_disponiveis = dias_disponiveis;
    }

    public String getHorariosdisponiveis() {
        return horarios_disponiveis;
    }

    public void setHorariosdisponiveis(String horarios_disponiveis) {
        this.horarios_disponiveis = horarios_disponiveis;
    }

    public LocalDate getDataNascimento(){return dataNascimento;}
    public void setDataNascimento(LocalDate dataNascimento){
        this.dataNascimento = dataNascimento;
    }
}
