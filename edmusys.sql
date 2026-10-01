create database edmusys;
use edmusys;

show databases;

create table administrador(
id_administrador int auto_increment primary key,
nome varchar(90) not null,
cpf char(14) not null,
email varchar(150) not null,
senha varchar(90) not null
);

show tables;
describe administrador;

create table aluno(
id_aluno int auto_increment primary key,
nome varchar(90) not null,
cpf char(14) not null,
instrumento varchar(50) not null,
data_nascimento date not null,
telefone varchar(20) not null,
email varchar(150) not null,
dias_disponiveis varchar(100) not null,
horarios_disponiveis varchar(100) not null,
plano varchar(50) not null,
senha varchar(90) not null
);

show tables;
describe aluno;

create table professor (
id_professor int auto_increment primary key,
nome varchar(90) not null,
cpf char(14) not null,
especialidade varchar(90) not null,
data_nascimento date not null,
telefone varchar(20) not null,
email varchar(150) not null,
dias_disponiveis varchar(100) not null,
horarios_disponiveis varchar(100) not null,
senha varchar(90) not null
);

show tables;
describe professor;

create table agendamento(
id_agendamento int auto_increment primary key,
instrumento varchar(50) not null,
dia date not null,
horario time not null,
id_professor int not null,
id_aluno int not null,
id_administrador int not null,

foreign key(id_professor)
references professor(id_professor),

foreign key(id_aluno)
references aluno(id_aluno),

foreign key(id_administrador)
references administrador(id_administrador)
);

show tables;
describe agendamento;

#teste admin
insert into administrador
(nome, cpf, email, senha)
values ('fabin do gas', '111.111.111-11', 'fabindogas@gmail.com', 'fabindogas123');

select * from administrador;

#teste aluno
insert into aluno (nome,cpf, instrumento, data_nascimento, telefone, email,dias_disponiveis, horarios_disponiveis, plano, senha)
values('joao da silva','222.222.222-22', 'violao', '2005-04-14', '84 99999-8822', 'joao@gmail.com, segunda, quarta, sexta','14:00, 16:00, 18:00', 'mensal', '12345678');

select * from aluno;
#teste professor
