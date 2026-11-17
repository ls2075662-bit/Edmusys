create database edmusys;

DROP DATABASE IF EXISTS edmusys;
CREATE DATABASE edmusys CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE edmusys;

-- 1. Tabela Administrador
CREATE TABLE administrador (
    id_administrador INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

-- 2. Tabela Aluno
CREATE TABLE aluno (
    id_aluno INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    instrumento VARCHAR(50) NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    dias_disponiveis VARCHAR(100) NOT NULL,
    horarios_disponiveis VARCHAR(100) NOT NULL,
    plano VARCHAR(50) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- 3. Tabela Professor
CREATE TABLE professor (
    id_professor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    especialidade VARCHAR(90) NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    dias_disponiveis VARCHAR(100) NOT NULL,
    horarios_disponiveis VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- 4. Tabela Agendamento
CREATE TABLE agendamento (
    id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
    instrumento VARCHAR(50) NOT NULL,
    dia DATE NOT NULL,
    horario TIME NOT NULL,
    id_professor INT NOT NULL,
    id_aluno INT NOT NULL,
    id_administrador INT NULL,
    FOREIGN KEY (id_professor) REFERENCES professor(id_professor) ON DELETE CASCADE,
    FOREIGN KEY (id_aluno) REFERENCES aluno(id_aluno) ON DELETE CASCADE,
    FOREIGN KEY (id_administrador) REFERENCES administrador(id_administrador) ON DELETE SET NULL
);

use edmusys;
select * from administrador;
select * from aluno;
select * from professor;
select * from agendamento;

-- Permite que os agendamentos permaneçam salvos caso o administrador exclua sua conta
ALTER TABLE agendamento
MODIFY COLUMN id_administrador INT NULL;

