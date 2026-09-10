import java.time.LocalDate;

public class Aluno {
    private String nome;
    private String tel;
    private String email;
    private String cpf;
    private String instrumento;
    private String dias_disponiveis;
    private String horarios_disponiveis;
    private String plano;
    private LocalDate dataNasci;

    public Aluno(String nome, String instrumento, String tel, String email, String cpf, String dias_disponiveis, String horarios_disponiveis, String plano, LocalDate dataNasci) {
        this.nome = nome;
        this.tel = tel;
        this.email = email;
        this.cpf = cpf;
        this.instrumento = instrumento;
        this.dias_disponiveis = dias_disponiveis;
        this.horarios_disponiveis = horarios_disponiveis;
        this.plano = plano;
        this.dataNasci = dataNasci;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
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

    public String getPlano() {
        return plano;
    }

    public void setPlano(String plano) {
        this.plano = plano;
    }

    public LocalDate getDatanasci() {
        return dataNasci;
    }

    public void setDatanasci(LocalDate dataNasci) {
        this.dataNasci = dataNasci;
    }
}