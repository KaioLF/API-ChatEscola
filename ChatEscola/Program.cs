using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Trabalho
{
    public class Aluno
    {
        public int id { get; set; }
        public string? nome { get; set; }
    }

    public class Disciplina
    {
        public int id { get; set; }
        public string? nome { get; set; }
        public string? diaSemana { get; set; }
        public string? horario { get; set; }
    }

    public class Professor
    {//VALIDAR PROFS E HORARIOS
        public int id { get; set; }
        public string? nome { get; set; }
        public string? nomeDisciplina { get; set; }
        public string? diaDisponivel { get; set; }
        public string? horarioDisponivel { get; set; }
    }

    public class Turma
    {//NUM DE ALUNOS + COD DISCIPLINA
        public int id { get; set; }
        public int idDisciplina { get; set; }
        public string? nomeDisciplina { get; set; }
        public virtual List<Aluno>? alunos { get; set; }
    }

    public class Sala
    {
        public int id { get; set; }
        public int capacidade { get; set; }
    }

    public class Ensalamento
    {//TURMA, SALA E HORARIO

        public int id { get; set; }
        public int idSala { get; set; }
        public int idProfessor { get; set; }
        public int idTurma { get; set; }
    }


    //SALA COM NUMERO DE LUGARES+VALIDACAO
    //DISCIPLINAS NOME E HORARIO
    //HORARIO COM DIA E TURNO


    public class ChatEscolaDB : DbContext
    {
        public ChatEscolaDB(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Aluno>? Alunos { get; set; } = null!;
        public DbSet<Disciplina>? Disciplinas { get; set; } = null!;
        public DbSet<Professor>? Professores { get; set; } = null!;
        public DbSet<Turma>? Turmas { get; set; } = null!;
        public DbSet<Sala>? Salas { get; set; } = null!;
        public DbSet<Ensalamento>? Ensalamentos { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }

    public class Program
    {
        static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var connectionString = builder.Configuration.GetConnectionString("ChatEscola") ?? "Data Source=ChatEscola.db";
            builder.Services.AddSqlite<ChatEscolaDB>(connectionString);
            //adiciona politica permissiva de cross-origin ao builder
            builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
            var app = builder.Build();
            app.UseCors();


            #region FUNCOES ALUNOS
            //*************FUNÇÕES ALUNOS*************

            //listar todos os alunos
            app.MapGet("/alunos", (ChatEscolaDB chatEscolaDB) =>
            {
                return chatEscolaDB.Alunos.ToList();
            });

            //listar aluno específico por id
            app.MapGet("/aluno/{id}", (ChatEscolaDB chatEscolaDB, int id) =>
            {
                return chatEscolaDB.Alunos.Find(id);
            });

            //cadastrar aluno
            app.MapPost("/cadastrar/aluno", (ChatEscolaDB chatEscolaDB, Aluno aluno) =>
            { string a = "Falha no cadastro.";
                if(aluno.nome.Length != 0 && aluno.nome != "" && aluno.nome != null){
                    chatEscolaDB.Alunos.Add(aluno);
                    chatEscolaDB.SaveChanges();
                    a = "cadastro realizado com sucesso.";
                    
                }
                return a;
                
            });

            //atualizar aluno
            app.MapPost("/atualizar/aluno/{id}", (ChatEscolaDB chatEscolaDB, Aluno alunoAtualizado, int id) =>
            {
                var aluno = chatEscolaDB.Alunos.Find(id);
                if(alunoAtualizado.nome.Length != 0 && alunoAtualizado.nome != "" && alunoAtualizado.nome != null){
                aluno.nome = alunoAtualizado.nome;
                chatEscolaDB.SaveChanges();
                return "Aluno Atualizado"; 
                }
                else {
                    return "Novo nome inválido!";
                }
            });

            //deletar aluno
            app.MapPost("/deletar/aluno/{id}", (ChatEscolaDB chatEscolaDB, int id) =>
            {
                var aluno = chatEscolaDB.Alunos.Find(id);
                chatEscolaDB.Remove(aluno);
                chatEscolaDB.SaveChanges();
                return "Aluno Deletado";
            });
            #endregion

            #region FUNCOES DISCIPLINAS
            //*************FUNCOES DISCIPLINAS*************
            //lista todoas as disciplinas
            app.MapGet("/disciplinas", (ChatEscolaDB chatEscolaDB) =>
            {
                return chatEscolaDB.Disciplinas.ToList();
            });
            //lista disciplina por id
            app.MapGet("/disciplina/{id}", (ChatEscolaDB chatEscolaDB, int id) =>
            {
                return chatEscolaDB.Disciplinas.Find(id);
            });
            //cadastrar disciplina
            app.MapPost("/cadastrar/disciplina", (ChatEscolaDB chatEscolaDB, Disciplina disciplina) =>
            {
                //var disc = chatEscolaDB.Disciplinas.Find(disciplina.id);
                if (disciplina.nome.Length == 0)
                {
                    return "Nome da disciplina inválido";
                }
                //VALIDACAO DIA DA SEMANA
                if (disciplina.diaSemana == "Segunda-Feira")
                {
                    if (disciplina.horario == "Manhã")
                    {
                        chatEscolaDB.Disciplinas.Add(disciplina);
                        chatEscolaDB.SaveChanges();
                        return "Disciplina Cadastrada";
                    }
                    else if (disciplina.horario == "Tarde")
                    {
                        chatEscolaDB.Disciplinas.Add(disciplina);
                        chatEscolaDB.SaveChanges();
                        return "Disciplina Cadastrada";

                    }
                    else if (disciplina.horario == "Noite")
                    {
                        chatEscolaDB.Disciplinas.Add(disciplina);
                        chatEscolaDB.SaveChanges();
                        return "Disciplina Cadastrada";
                    }
                    else
                    {
                        return "Horário Inválido";
                    }
                }
                else if (disciplina.diaSemana == "Terça-Feira")
                {
                    if (disciplina.horario == "Manhã")
                    {
                        chatEscolaDB.Disciplinas.Add(disciplina);
                        chatEscolaDB.SaveChanges();
                        return "Disciplina Cadastrada";
                    }
                    else if (disciplina.horario == "Tarde")
                    {
                        chatEscolaDB.Disciplinas.Add(disciplina);
                        chatEscolaDB.SaveChanges();
                        return "Disciplina Cadastrada";
                    }
                    else if (disciplina.horario == "Noite")
                    {
                        chatEscolaDB.Disciplinas.Add(disciplina);
                        chatEscolaDB.SaveChanges();
                        return "Disciplina Cadastrada";
                    }
                    else
                    {
                        return "Horário Inválido";
                    }
                }
                else if (disciplina.diaSemana == "Quarta-Feira")
                {
                    if (disciplina.horario == "Manhã")
                    {
                        chatEscolaDB.Disciplinas.Add(disciplina);
                        chatEscolaDB.SaveChanges();
                        return "Disciplina Cadastrada";
                    }
                    else if (disciplina.horario == "Tarde")
                    {
                        chatEscolaDB.Disciplinas.Add(disciplina);
                        chatEscolaDB.SaveChanges();
                        return "Disciplina Cadastrada";
                    }
                    else if (disciplina.horario == "Noite")
                    {
                        chatEscolaDB.Disciplinas.Add(disciplina);
                        chatEscolaDB.SaveChanges();
                        return "Disciplina Cadastrada";
                    }
                    else
                    {
                        return "Horário Inválido";
                    }
                }
                else if (disciplina.diaSemana == "Quinta-Feira")
                {
                    if (disciplina.horario == "Manhã")
                    {
                        chatEscolaDB.Disciplinas.Add(disciplina);
                        chatEscolaDB.SaveChanges();
                        return "Disciplina Cadastrada";
                    }
                    else if (disciplina.horario == "Tarde")
                    {
                        chatEscolaDB.Disciplinas.Add(disciplina);
                        chatEscolaDB.SaveChanges();
                        return "Disciplina Cadastrada";

                    }
                    else if (disciplina.horario == "Noite")
                    {
                        chatEscolaDB.Disciplinas.Add(disciplina);
                        chatEscolaDB.SaveChanges();
                        return "Disciplina Cadastrada";
                    }
                    else
                    {
                        return "Horário Inválido";
                    }
                }
                else if (disciplina.diaSemana == "Sexta-Feira")
                {
                    if (disciplina.horario == "Manhã")
                    {
                        chatEscolaDB.Disciplinas.Add(disciplina);
                        chatEscolaDB.SaveChanges();
                        return "Disciplina Cadastrada";
                    }
                    else if (disciplina.horario == "Tarde")
                    {
                        chatEscolaDB.Disciplinas.Add(disciplina);
                        chatEscolaDB.SaveChanges();
                        return "Disciplina Cadastrada";

                    }
                    else if (disciplina.horario == "Noite")
                    {
                        chatEscolaDB.Disciplinas.Add(disciplina);
                        chatEscolaDB.SaveChanges();
                        return "Disciplina Cadastrada";
                    }
                    else
                    {
                        return "Horário Inválido";
                    }
                }
                else
                {
                    return "Dia inválido!";
                }
            });
            //atualizar disciplina
            app.MapPost("/atualizar/disciplina/{id}", (ChatEscolaDB chatEscolaDB, Disciplina disciplinaAtualizada, int id) =>
            {
                var disc = chatEscolaDB.Disciplinas.Find(id);

                if (disciplinaAtualizada.nome.Length == 0 || disciplinaAtualizada.nome == null || disciplinaAtualizada.nome == "")
                {
                    return "Nome da disciplina inválido";
                }
                else
                {
                    //VALIDACAO DIA DA SEMANA
                    if (disciplinaAtualizada.diaSemana == "Segunda-Feira")
                    {
                        if (disciplinaAtualizada.horario == "Manhã")
                        {
                            disc.nome = disciplinaAtualizada.nome;
                            disc.horario = disciplinaAtualizada.horario;
                            disc.diaSemana = disciplinaAtualizada.diaSemana;
                            chatEscolaDB.SaveChanges();
                            return "Disciplina Atualizado!";
                        }
                        else if (disciplinaAtualizada.horario == "Tarde")
                        {
                            disc.nome = disciplinaAtualizada.nome;
                            disc.horario = disciplinaAtualizada.horario;
                            disc.diaSemana = disciplinaAtualizada.diaSemana;
                            chatEscolaDB.SaveChanges();
                            return "Disciplina Atualizado!";

                        }
                        else if (disciplinaAtualizada.horario == "Noite")
                        {
                            disc.nome = disciplinaAtualizada.nome;
                            disc.horario = disciplinaAtualizada.horario;
                            disc.diaSemana = disciplinaAtualizada.diaSemana;
                            chatEscolaDB.SaveChanges();
                            return "Disciplina Atualizado!";
                        }
                        else
                        {
                            return "Horário Inválido";
                        }
                    }
                    else if (disciplinaAtualizada.diaSemana == "Terça-Feira")
                    {
                        if (disciplinaAtualizada.horario == "Manhã")
                        {
                            disc.nome = disciplinaAtualizada.nome;
                            disc.horario = disciplinaAtualizada.horario;
                            disc.diaSemana = disciplinaAtualizada.diaSemana;
                            chatEscolaDB.SaveChanges();
                            return "Disciplina Atualizado!";
                        }
                        else if (disciplinaAtualizada.horario == "Tarde")
                        {
                            disc.nome = disciplinaAtualizada.nome;
                            disc.horario = disciplinaAtualizada.horario;
                            disc.diaSemana = disciplinaAtualizada.diaSemana;
                            chatEscolaDB.SaveChanges();
                            return "Disciplina Atualizado!";
                        }
                        else if (disciplinaAtualizada.horario == "Noite")
                        {
                            disc.nome = disciplinaAtualizada.nome;
                            disc.horario = disciplinaAtualizada.horario;
                            disc.diaSemana = disciplinaAtualizada.diaSemana;
                            chatEscolaDB.SaveChanges();
                            return "Disciplina Atualizado!";
                        }
                        else
                        {
                            return "Horário Inválido";
                        }
                    }
                    else if (disciplinaAtualizada.diaSemana == "Quarta-Feira")
                    {
                        if (disciplinaAtualizada.horario == "Manhã")
                        {
                            disc.nome = disciplinaAtualizada.nome;
                            disc.horario = disciplinaAtualizada.horario;
                            disc.diaSemana = disciplinaAtualizada.diaSemana;
                            chatEscolaDB.SaveChanges();
                            return "Disciplina Atualizado!";
                        }
                        else if (disciplinaAtualizada.horario == "Tarde")
                        {
                            disc.nome = disciplinaAtualizada.nome;
                            disc.horario = disciplinaAtualizada.horario;
                            disc.diaSemana = disciplinaAtualizada.diaSemana;
                            chatEscolaDB.SaveChanges();
                            return "Disciplina Atualizado!";
                        }
                        else if (disciplinaAtualizada.horario == "Noite")
                        {
                            disc.nome = disciplinaAtualizada.nome;
                            disc.horario = disciplinaAtualizada.horario;
                            disc.diaSemana = disciplinaAtualizada.diaSemana;
                            chatEscolaDB.SaveChanges();
                            return "Disciplina Atualizado!";
                        }
                        else
                        {
                            return "Horário Inválido";
                        }
                    }
                    else if (disciplinaAtualizada.diaSemana == "Quinta-Feira")
                    {
                        if (disciplinaAtualizada.horario == "Manhã")
                        {
                            disc.nome = disciplinaAtualizada.nome;
                            disc.horario = disciplinaAtualizada.horario;
                            disc.diaSemana = disciplinaAtualizada.diaSemana;
                            chatEscolaDB.SaveChanges();
                            return "Disciplina Atualizado!";
                        }
                        else if (disciplinaAtualizada.horario == "Tarde")
                        {
                            disc.nome = disciplinaAtualizada.nome;
                            disc.horario = disciplinaAtualizada.horario;
                            disc.diaSemana = disciplinaAtualizada.diaSemana;
                            chatEscolaDB.SaveChanges();
                            return "Disciplina Atualizado!";

                        }
                        else if (disciplinaAtualizada.horario == "Noite")
                        {
                            disc.nome = disciplinaAtualizada.nome;
                            disc.horario = disciplinaAtualizada.horario;
                            disc.diaSemana = disciplinaAtualizada.diaSemana;
                            chatEscolaDB.SaveChanges();
                            return "Disciplina Atualizado!";
                        }
                        else
                        {
                            return "Horário Inválido";
                        }
                    }
                    else if (disciplinaAtualizada.diaSemana == "Sexta-Feira")
                    {
                        if (disciplinaAtualizada.horario == "Manhã")
                        {
                            disc.nome = disciplinaAtualizada.nome;
                            disc.horario = disciplinaAtualizada.horario;
                            disc.diaSemana = disciplinaAtualizada.diaSemana;
                            chatEscolaDB.SaveChanges();
                            return "Disciplina Atualizado!";
                        }
                        else if (disciplinaAtualizada.horario == "Tarde")
                        {
                            disc.nome = disciplinaAtualizada.nome;
                            disc.horario = disciplinaAtualizada.horario;
                            disc.diaSemana = disciplinaAtualizada.diaSemana;
                            chatEscolaDB.SaveChanges();
                            return "Disciplina Atualizado!";

                        }
                        else if (disciplinaAtualizada.horario == "Noite")
                        {
                            disc.nome = disciplinaAtualizada.nome;
                            disc.horario = disciplinaAtualizada.horario;
                            disc.diaSemana = disciplinaAtualizada.diaSemana;
                            chatEscolaDB.SaveChanges();
                            return "Disciplina Atualizado!";
                        }
                        else
                        {
                            return "Horário Inválido";
                        }
                    }
                    else
                    {
                        return "Dia inválido!";
                    }
                }


            });
            //deletar disciplina
            app.MapPost("/deletar/disciplina/{id}", (ChatEscolaDB chatEscolaDB, int id) =>
            {
                var disciplina = chatEscolaDB.Disciplinas.Find(id);
                chatEscolaDB.Remove(disciplina);
                chatEscolaDB.SaveChanges();
                return "Disciplina Deletada";
            });
            #endregion

            #region FUNCOES PROFESSORES
            //*************FUNCOES PROFESSORES*************

            //listar todos os professores
            app.MapGet("/professores", (ChatEscolaDB chatEscolaDB) =>
            {
                return chatEscolaDB.Professores.ToList();
            });

            //listar professor específico por id
            app.MapGet("/professor/{id}", (ChatEscolaDB chatEscolaDB, int id) =>
            {
                return chatEscolaDB.Professores.Find(id);
            });

            //cadastrar professor
            app.MapPost("/cadastrar/professor", (ChatEscolaDB chatEscolaDB, Professor professor) =>
            { string a = "Erro ao cadastrar.";
                if(professor.nome.Length > 0){
                    foreach(var disciplina in chatEscolaDB.Disciplinas){
                        if(professor.nomeDisciplina == disciplina.nome){
                            if(professor.diaDisponivel == disciplina.diaSemana){
                                if(professor.horarioDisponivel == disciplina.horario){
                                    chatEscolaDB.Professores.Add(professor);
                					chatEscolaDB.SaveChanges();
                                    a = "Cadastro do professor efetuado com sucesso!";
                                } 
                                else {
                                    a ="Falha ao cadastrar, a disciplina não é ofertada neste horário.";
                                    }
                            } 
                            else {
                                a ="Falha ao cadastrar, a disciplina não é ofertada neste dia.";
                                }
                        } 
                        else {
                            a ="Falha ao cadastrar, nome da disciplina não bate.";
                            }
                    }
                }
                
                else{
                    return "O nome do professor é inválido!";
                }
                return a;
            });

            //atualizar professor
            app.MapPost("/atualizar/professor/{id}", (ChatEscolaDB chatEscolaDB, Professor professorAtualizado, int id) =>
            {
                var professor = chatEscolaDB.Professores.Find(id);

                 string a = "Erro ao cadastrar.";
                if(professorAtualizado.nome.Length > 0){
                    professor.nome = professorAtualizado.nome;
                    foreach(var disciplina in chatEscolaDB.Disciplinas){
                        if(professorAtualizado.nomeDisciplina == disciplina.nome){
                            if(professorAtualizado.diaDisponivel == disciplina.diaSemana){
                                if(professorAtualizado.horarioDisponivel == disciplina.horario){
                                    professor.nomeDisciplina = professorAtualizado.nomeDisciplina;
                                    professor.diaDisponivel = professorAtualizado.diaDisponivel;
                                    professor.horarioDisponivel = professorAtualizado.horarioDisponivel;
                                    chatEscolaDB.SaveChanges();
                                    a = "Cadastro da atualização dos dados do professor efetuado com sucesso!";
                                } 
                                else {
                                    a ="Falha ao atualizar, a disciplina não é ofertada neste horário.";
                                    }
                            } 
                            else {
                                a ="Falha ao atualizar, a disciplina não é ofertada neste dia.";
                                }
                        } 
                        else {
                            a ="Falha ao atualizar, nome da disciplina não bate.";
                            }
                    }
                }
                else{
                    a = "O novo nome do professor é inválido!";
                }
                return a;

            });

            //deletar professor
            app.MapPost("/deletar/professor/{id}", (ChatEscolaDB chatEscolaDB, int id) =>
            {
                var professor = chatEscolaDB.Professores.Find(id);
                chatEscolaDB.Remove(professor);
                chatEscolaDB.SaveChanges();
                return "Professor Deletado";
            });
            #endregion

            #region FUNCOES TURMAS\
            //*************FUNCOES TURMAS*************

            //listar todas as turmas
            app.MapGet("/turmas", (ChatEscolaDB chatEscolaDB) =>
            {
                return chatEscolaDB.Turmas.ToList();
            });

            //listar turma específica por id
            app.MapGet("/turma/{id}", (ChatEscolaDB chatEscolaDB, int id) =>
            {
                return chatEscolaDB.Turmas.Find(id);
            });

            //cadastrar turma
            app.MapPost("/cadastrar/turma", (ChatEscolaDB chatEscolaDB, Turma turma) =>
            { 
                chatEscolaDB.Turmas.Add(turma);
                chatEscolaDB.SaveChanges();
                return "Cadastro efetuado com sucesso!";

             //   string a = "Falha no cadastro da turma.";

                var disci = chatEscolaDB.Disciplinas.Find(turma.idDisciplina);
                
                //TODO VERIFICAR DISCI CADASTRADA
                //Console.WriteLine(alunonobanco.nome == alunonaturma.nome);             
                            

                /*    foreach(var alunonobanco in chatEscolaDB.Alunos) {
                        Console.WriteLine(alunonobanco.nome);

                        foreach(var alunonaturma in turma.alunos) {
                            Console.WriteLine(alunonaturma.nome); 

                            if(alunonobanco.nome == alunonaturma.nome) {  
                                Console.WriteLine(alunonobanco.nome == alunonaturma.nome);             
                            chatEscolaDB.Turmas.Add(turma);
                            chatEscolaDB.SaveChanges();
                            a = "Turma Cadastrada"; 
                            }
                        }
                    }
                
                return a; */
            }); 

            //atualizar turma
            app.MapPost("/atualizar/turma/{id}", (ChatEscolaDB chatEscolaDB, Turma turmaAtualizada, int id) =>
            {
                var turma = chatEscolaDB.Turmas.Find(id);
                chatEscolaDB.SaveChanges();
                return "Turma Atualizada";
            });

            //deletar turma
            app.MapPost("/deletar/turma/{id}", (ChatEscolaDB chatEscolaDB, int id) =>
            {
                var turma = chatEscolaDB.Turmas.Find(id);
                chatEscolaDB.Remove(turma);
                chatEscolaDB.SaveChanges();
                return "Turma Deletada";
            });
            #endregion

            #region FUNCOES SALA
            //*************FUNCOES SALA*************
            //listar todas as salas
            app.MapGet("/salas", (ChatEscolaDB chatEscolaDB) =>
            {
                return chatEscolaDB.Salas.ToList();
            });

            //listar sala específica por id
            app.MapGet("/sala/{id}", (ChatEscolaDB chatEscolaDB, int id) =>
            {
                return chatEscolaDB.Salas.Find(id);
            });

            //cadastrar sala
            app.MapPost("/cadastrar/sala", (ChatEscolaDB chatEscolaDB, Sala sala) =>
            {
                chatEscolaDB.Salas.Add(sala);
                chatEscolaDB.SaveChanges();
                return "Sala Cadastrada";
            });

            //atualizar sala
            app.MapPost("/atualizar/sala/{id}", (ChatEscolaDB chatEscolaDB, Sala salaAtualizada, int id) =>
            {
                var sala = chatEscolaDB.Salas.Find(id);
                sala.capacidade = salaAtualizada.capacidade;
                chatEscolaDB.SaveChanges();
                return "Sala Atualizada";
            });

            //deletar sala
            app.MapPost("/deletar/sala/{id}", (ChatEscolaDB chatEscolaDB, int id) =>
            {
                var sala = chatEscolaDB.Salas.Find(id);
                chatEscolaDB.Remove(sala);
                chatEscolaDB.SaveChanges();
                return "Sala Deletada";
            });
            #endregion

            #region FUNCOES ENSALAMENTO
            //*************FUNCOES ENSALAMENTO*************

            //listar todos os ensalamentos
            app.MapGet("/ensalamentos", (ChatEscolaDB chatEscolaDB) =>
            {
                return chatEscolaDB.Ensalamentos.ToList();
            });

            //listar ensalamento específico por id
            app.MapGet("/ensalamento/{id}", (ChatEscolaDB chatEscolaDB, int id) =>
            {
                return chatEscolaDB.Ensalamentos.Find(id);
            });

            //cadastrar ensalamento
            app.MapPost("/cadastrar/ensalamento", (ChatEscolaDB chatEscolaDB, Ensalamento ensalamento) =>
            {
                //var aluno = chatEscolaDB.Alunos.Find(ensalamento.idAluno);
                var turma = chatEscolaDB.Turmas.Find(ensalamento.idTurma);
                var professor = chatEscolaDB.Professores.Find(ensalamento.idProfessor);
                var sala = chatEscolaDB.Salas.Find(ensalamento.idSala);

                int qtdalunos = 0;

                string b = "bananinha";

                foreach (var aluno in turma.alunos) 
                {
                    qtdalunos = qtdalunos + 1; 
                }
                if (turma == null)
                { 
                    b = "Turma Inexistente";
                }
                else if (professor == null)
                { 
                    b = "Professor inexistente";
                }
                else if(sala.capacidade < qtdalunos) {
                    b = "Não há lugar suficiente para todos os alunos da turma na sala.";
                } 
                else
                { 
                    chatEscolaDB.Ensalamentos.Add(ensalamento);
                    chatEscolaDB.SaveChanges();
                    b = "Ensalamento Cadastrado";
                }
                return b;

            });

            //atualizar ensalamento
            app.MapPost("/atualizar/ensalamento/{id}", (ChatEscolaDB chatEscolaDB, Ensalamento ensalamentoAtualizado, int id) =>
            {

                
                var ensalamento = chatEscolaDB.Ensalamentos.Find(id);

                //TODO VERIFICACOES

                //ensalamento.idAluno = ensalamentoAtualizado.idAluno;
                ensalamento.idProfessor = ensalamentoAtualizado.idProfessor;
                ensalamento.idTurma = ensalamentoAtualizado.idTurma;
                chatEscolaDB.SaveChanges();
                return "Ensalamento Atualizado";
            });

            //deletar ensalamento
            app.MapPost("/deletar/ensalamento/{id}", (ChatEscolaDB chatEscolaDB, int id) =>
            {
                var ensalamento = chatEscolaDB.Ensalamentos.Find(id);
                chatEscolaDB.Remove(ensalamento);
                chatEscolaDB.SaveChanges();
                return "Ensalamento Deletado";
            });
            #endregion

            app.Run("https://localhost:3013");
        }
    }
}
