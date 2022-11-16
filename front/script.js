var url = 'http://localhost:3013'
    //carregar aqui a URL da API(base do projeto)
function cadastrar() {
    //validacao de alguns dos inputs

    if (!validaNome('nome-aluno')) {
        return
    }
}
// function cadastraraluno() {

//     if (!validaNome('nome-completo')) {
//         return
//     }
// }

// function cadastrardisciplina() {


//     if (!validaNome('nome')) {
//         return
//     }

//     if (!validaDia('dia-da-semana')) {
//         return
//     }

//     if (!validaHorario('horario')) {
//         return
//     }

// function cadastrarprofessor() {


// if (!validaNome('nome-completo')) {
//     return
// }

// if (!validaDisciplina('disciplina')) {
//     return
// }

// if (!validaDia('dia-disponivel')) {
//     return
// }

// if (!confirmaHorario('horario-disponivel')) {
//     return
// }
// function cadastrarturma() {
//     //validacao de alguns dos inputs

//     if (!validaNome('nome-disciplina')) {
//         return
//     }
// }
// function cadastrarsala() {
//     //validacao de alguns dos inputs

//     if (!validaNumero('numero')) {
//         return
//     }
//     if (!confirmaCapacidade('capacidade')) {
//         return
//     }
// }
// function cadastrarensalamento() {
//     //validacao de alguns dos inputs

//     if (!validaSala('nome-completo')) {
//         return
//     }

//     if (!validaProfessor('data-nascimento')) {
//         return
//     }

//     if (!validaTurma('senha')) {
//         return
//     }
// }

//construcao do json que vai no body da criacao de usuario	

let body = {
    'Nome do Aluno': document.getElementById('nome').value
};

//envio da requisicao usando a FETCH API

//configuracao e realizacao do POST no endpoint "usuarios"
fetch(url + "/cadastrar/aluno", {
        'method': 'POST',
        'redirect': 'follow',
        'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        'body': JSON.stringify(body)
    })
    //checa se requisicao deu certo
    .then((response) => {
        if (response.ok) {
            return response.text()
        } else {
            return response.text().then((text) => {
                throw new Error(text)
            })
        }
    })
    //trata resposta
    .then((output) => {
        console.log(output)
        alert('Cadastro efetuado! :D')
    })
    //trata erro
    .catch((error) => {
        console.log(error)
        alert('Não foi possível efetuar o cadastro! :(')
    })


function validaNome(id) {
    let divNome = document.getElementById(id)
    if (divNome.value.trim().split(' ').length >= 2) {
        divNome.classList.remove('erro-input')
        return true
    } else {
        if (!divNome.classList.contains('erro-input')) {
            divNome.classList.add('erro-input')
        }
        return false
    }
}

function listar() {
    //da um GET no endpoint "usuarios"
    fetch(url + 'alunos')
        .then(response => response.json())
        .then((alunos) => {
            //pega div que vai conter a lista de usuarios
            let listaaluno = document.getElementById('lista-aluno')

            //limpa div
            while (listarUsuarios.firstChild) {
                listaAluno.removeChild(listaAluno.firstChild)
            }

            //preenche div com usuarios recebidos do GET
            for (let aluno of alunos) {
                //cria div para as informacoes de um usuario
                let divAluno = document.createElement('div')
                divAluno.setAttribute('class', 'form')

                //pega o nome do usuario
                let divNome = document.createElement('input')
                divNome.placeholder = 'Nome'
                divNome.value = aluno.nome
                divAluno.appendChild(divNome)



                //cria o botao para remover o usuario
                let btnRemover = document.createElement('button')
                btnRemover.innerHTML = 'Remover'
                btnRemover.onclick = u => remover(aluno.id)
                btnRemover.style.marginRight = '5px'

                //cria o botao para atualizar o usuario
                let btnAtualizar = document.createElement('button')
                btnAtualizar.innerHTML = 'Atualizar'
                btnAtualizar.onclick = u => atualizar(nome.id, divNome,)
                btnAtualizar.style.marginLeft = '5px'

                //cria a div com os dois botoes
                let divBotoes = document.createElement('div')
                divBotoes.style.display = 'flex'
                divBotoes.appendChild(btnRemover)
                divBotoes.appendChild(btnAtualizar)
                divUsuario.appendChild(divBotoes)

                //insere a div do usuario na div com a lista de usuarios
                listaUsuarios.appendChild(divAluno)
            }
        })
}

//EXEMPLO DE FUNCAO QUE CRIA OPTION DE SELECAO DE USUARIOS
function foo() {
    //da um GET no endpoint "usuarios"
    fetch(url + 'usuarios')
        .then(response => response.json())
        .then((alunos) => {
            //PEGA OPTION VAZIA NO HTML
            let selUsuarios = document.getElementById('option-usuarios')

            //PREENCHE ELA COM O NOME E O ID DOS USUARIOS
            for (let usuario of usuarios) {
                let optUsuario = document.createElement('option')
                optUsuario.innerHTML = usuario.nome
                optUsuario.value = usuario.id
                selUsuarios.appendChild(optUsuario)
            }
        })
}

function atualizar(id, divNome) {
    let body = {
        'Nome': divNome.value,
    }

    fetch(url + "alunos/" + id, {
            'method': 'PUT',
            'redirect': 'follow',
            'headers': {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            'body': JSON.stringify(body)
        })
        .then((response) => {
            if (response.ok) {
                return response.text()
            } else {
                return response.text().then((text) => {
                    throw new Error(text)
                })
            }
        })
        .then((output) => {
            listar()
            console.log(output)
            alert('Usuário atualizado! \\o/')
        })
        .catch((error) => {
            console.log(error)
            alert('Não foi possível atualizar o usuário :/')
        })
}

function remover(id) {
    fetch(url + 'alunos/' + id, {
            'method': 'DELETE',
            'redirect': 'follow'
        })
        .then((response) => {
            if (response.ok) {
                return response.text()
            } else {
                return response.text().then((text) => {
                    throw new Error(text)
                })
            }
        })
        .then((output) => {
            listar()
            console.log(output)
            alert('Aluno removido! >=]')
        })
        .catch((error) => {
            console.log(error)
            alert('Não foi possível remover o aluno :/')
        })

}
