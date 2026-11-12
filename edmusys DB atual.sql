use edmusys;
SELECT * FROM aluno;
SELECT * FROM professor;
SELECT * FROM agendamento;
select * from administrador;

-- Permite que os agendamentos permaneçam salvos caso o administrador exclua sua conta
ALTER TABLE agendamento
MODIFY COLUMN id_administrador INT NULL;
