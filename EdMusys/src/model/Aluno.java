package model;

import java.time.LocalDate;

public class Aluno {
    private String nome;
    private String telefone;
    private String email;
    private String cpf;
    private String instrumento;
    private String diasDisponiveis;
    private String horariosDisponiveis;
    private String plano;
    private LocalDate dataNascimento;

    public Aluno() {
    }

    public Aluno(String nome, String instrumento, String telefone, String email, String cpf, String diasDisponiveis, String horariosDisponiveis, String plano, LocalDate dataNascimento) {
        this.nome = nome;
        this.instrumento = instrumento;
        this.telefone = telefone;
        this.email = email;
        this.cpf = cpf;
        this.diasDisponiveis = diasDisponiveis;
        this.horariosDisponiveis = horariosDisponiveis;
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

    public String getInstrumento() {
        return instrumento;
    }

    public void setInstrumento(String instrumento) {
        this.instrumento = instrumento;
    }

    public String getDiasDisponiveis() {
        return diasDisponiveis;
    }

    public void setDiasDisponiveis(String diasDisponiveis) {
        this.diasDisponiveis = diasDisponiveis;
    }

    public String getHorariosDisponiveis() {
        return horariosDisponiveis;
    }

    public void setHorariosDisponiveis(String horariosDisponiveis) {
        this.horariosDisponiveis = horariosDisponiveis;
    }

    public String getPlano() {
        return plano;
    }

    public void setPlano(String plano) {
        this.plano = plano;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }
}
