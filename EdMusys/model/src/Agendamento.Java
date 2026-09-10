public class agendamento() {
    String codigo;
    String instrumento;
    String dia;
    String hora;

    public agendamento(String codigo, String instrumento, String dia, String hora) {
        this.codigo = codigo;
        this.instrumento = instrumento;
        this.dia = dia;
        this.hora = hora;
    }
    
    public String getCodigo() {
        return codigo;
    }

    public String getInstrumento() {
        return instrumento;
    }

    public void setInstrumento(String instrumento) {
        this.instrumento = instrumento;
    }

    public String getDia() {
        return dia;
    }

    public void setDia(String dia) {
        this.dia = dia;
    }

    public String getHora() {
        return hora;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }
}