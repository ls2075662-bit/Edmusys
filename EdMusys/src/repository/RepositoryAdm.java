package repository;

import model.Aluno;
import java.util.ArrayList;
import java.util.List;

public class RepositoryAdm {
    private List<Aluno> alunos = new ArrayList<>();

    public List<Aluno> buscarAlunos() {
        return alunos;
    }

    public boolean salvarAluno(Aluno aluno) {
        return alunos.add(aluno);
    }
}
