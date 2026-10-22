package controller;

import model.Aluno;
import service.AlunoService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/alunos")
@CrossOrigin(origins = "*")
public class AlunoController {

    private AlunoService alunoService = new AlunoService();

    @GetMapping
    public List<Aluno> listar() {
        return alunoService.listarTodos();
    }

    @PostMapping
    public boolean cadastrar(@RequestBody Aluno aluno) {
        return alunoService.salvar(aluno);
    }
}
