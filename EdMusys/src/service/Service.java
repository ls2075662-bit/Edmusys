package service;

import model.Aluno;
import repository.RepositoryAdm;
import java.util.List;

public class AlunoService {
    private RepositoryAdm repository = new RepositoryAdm();

    public List<Aluno> listarTodos() {
        return repository.buscarAlunos(); // Método do Repository
    }

    public boolean salvar(Aluno aluno) {
        if (aluno.getNome() == null || aluno.getNome().isEmpty()) {
            return false; // Validação simples
        }
        return repository.salvarAluno(aluno);
    }
}