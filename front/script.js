var url = 'https://localhost:3013'
//*****************************ALUNO**************************** */
function cadastrarAluno()
{
	//validacao de alguns dos inputs
	
	if(!validaNome('nome-aluno'))
	{
		return
	}
	//construcao do json que vai no body da criacao de aluno	
	
	let body =
	{
        "nome": document.getElementById("nome-aluno").value,
	};
	
	//envio da requisicao usando a FETCH API
	
	//configuracao e realizacao do POST no endpoint "alunos"
	fetch(url + "/cadastrar/aluno",
	{   'method': 'POST',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})
	//checa se requisicao deu certo
	.then((response) =>
	{
        console.log(response)
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	//trata resposta
	.then((output) =>
	{
		console.log(output)
        alert.
		alert('Cadastro efetuado! :D')
	})
	//trata erro
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível efetuar o cadastro! :(')
	})
}

function validaNome(id)
{
	let divNome = document.getElementById(id)
	if(divNome.value.trim().split(' ').length >= 2)
	{
		//divNome.style.border = 0
		divNome.classList.remove('erro-input')
		return true
	}
	else
	{
		//divNome.style.border = 'solid 1px red'
		if(!divNome.classList.contains('erro-input'))
		{
			divNome.classList.add('erro-input')
		}
		return false
	}
}

function listar()
{
	//da um GET no endpoint "alunos"
	fetch(url + '/alunos')
	.then(response => response.json())
	.then((alunos) =>
	{
		//pega div que vai conter a lista de alunos
		let listaAlunos = document.getElementById('listar-alunos')
		
		//limpa div
        while(listaAlunos.firstChild){
            listaAlunos.removeChild(listaAlunos.firstChild)
        }
		
		//preenche div com alunos recebidos do GET
		for(let aluno of alunos)
		{
			//cria div para as informacoes de um aluno
			let divAluno = document.createElement('div')
			divAluno.setAttribute('class', 'form')
			
			//pega o nome do aluno
			let divNome = document.createElement('input')
			divNome.placeholder = 'Nome'
			divNome.value = aluno.nome
			divAluno.appendChild(divNome)
			
			//cria o botao para remover o aluno
			let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => remover(aluno.id)
			btnRemover.style.marginRight = '5px'
			
			//cria o botao para atualizar o aluno
			let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizar(aluno.id, divNome)
			btnAtualizar.style.marginLeft = '5px'
			
			//cria a div com os dois botoes
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divAluno.appendChild(divBotoes)
			
			//insere a div do aluno na div com a lista de alunos
			listaAlunos.appendChild(divAluno)
		}
	})
}

function atualizar(id, divNome)
{
	let body =
	{
		'nome': divNome.value
	}
	
	fetch(url + "/atualizar/alunos/" + id,
	{
		'method': 'PUT',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listar()
		console.log(output)
		alert('Aluno atualizado! \\o/')
	})
	.catch((error) =>
	{
		console.log(error)
		console.log("erro")
		alert('Não foi possível atualizar o aluno :/')
	})
}

function remover(id)
{
    console.log(url + '/deletar/aluno/' + id)
	fetch(url + '/deletar/aluno/' + id,
	{
		'method': 'POST',
		'redirect': 'follow'
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listar()
		console.log(output)
		alert('Aluno removido! >=]')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível remover o aluno :/')
	})
}

//*************************DISCIPLINA**************************** */
function cadastrarDisciplina(){
    if(!validaNome("nome-disciplina")){
        return;
    }

    if (!validaDia("dia-semana")) {
        return;
    }
    
    if (!validaHorario("horario-disciplina")) {
        return;
    }

    let body ={
        "nome":document.getElementById("nome-disciplina").value,
        "diaSemana":document.getElementById("dia-semana").value,
        "horario":document.getElementById("horario-disciplina").value
    }

//configuracao e realizacao do POST no endpoint "alunos"
	fetch(url + "/cadastrar/disciplina",
	{   'method': 'POST',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})
	//checa se requisicao deu certo
	.then((response) =>
	{
        console.log(response)
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	//trata resposta
	.then((output) =>
	{
		console.log(output)
        alert.
		alert('Cadastro efetuado! :D')
	})
	//trata erro
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível efetuar o cadastro! :(')
	})
}

function validaNomeDisciplina(){

}

/*function validaNome(id)
{
	let divNome = document.getElementById(id)
	if(divNome.value.trim().split(' ').length >= 2)
	{
		//divNome.style.border = 0
		divNome.classList.remove('erro-input')
		return true
	}
	else
	{
		//divNome.style.border = 'solid 1px red'
		if(!divNome.classList.contains('erro-input'))
		{
			divNome.classList.add('erro-input')
		}
		return false
	}
}*/
function validaDia(id){
    let divDiaSemana = document.getElementById(id)
	console.log(divDiaSemana.value)
	if(divDiaSemana.value == "Segunda-Feira" || divDiaSemana.value == "Terça-Feira" || divDiaSemana.value == "Quarta-Feira" || divDiaSemana.value == "Quinta-Feira" || divDiaSemana.value == "Sexta-Feira"){
		divDiaSemana.classList.remove('erro-input')
		return true
	}
	else
	{
		if(!divDiaSemana.classList.contains('erro-input'))
		{
			divDiaSemana.classList.add('erro-input')
		}
		return false
	}
}
function validaHorario(id){
    let divHorario = document.getElementById(id)
	console.log(divHorario.value)
	if(divHorario.value == "Manhã" || divHorario.value == "Tarde" || divHorario.value == "Noite"){
		divHorario.classList.remove('erro-input')
		return true
	}
	else
	{
		if(!divHorario.classList.contains('erro-input'))
		{
			divHorario.classList.add('erro-input')
		}
		return false
	}
}

function listarDisciplinas()
{
	//da um GET no endpoint "disciplinas"
	fetch(url + '/disciplinas')
	.then(response => response.json())
	.then((disciplinas) =>
	{
		//pega div que vai conter a lista de alunos
		let listaDiscipinas = document.getElementById('listar-disciplinas')
		
		//limpa div
        while(listaDiscipinas.firstChild){
            listaDiscipinas.removeChild(listaDiscipinas.firstChild)
        }
		
		//preenche div com alunos recebidos do GET
		for(let disciplina of disciplinas)
		{
			//cria div para as informacoes de um aluno
			let divDisciplina = document.createElement('div')
			divDisciplina.setAttribute('class', 'form')
			
			//pega o nome da disciplina
			let divNomeDisciplina = document.createElement('input')
			divNomeDisciplina.placeholder = 'Nome'
			divNomeDisciplina.value = disciplina.nome
			divDisciplina.appendChild(divNomeDisciplina)

			//pega o dia da semana da disciplina
			let divDiaSemana = document.createElement('input')
			divDiaSemana.placeholder = 'Dia da Semana'
			divDiaSemana.value = disciplina.diaSemana
			divDisciplina.appendChild(divDiaSemana)

			//pega o horario da disciplina
			let divHorario = document.createElement('input')
			divHorario.placeholder = 'Dia da Semana'
			divHorario.value = disciplina.horario
			divDisciplina.appendChild(divHorario)

			//cria o botao para remover a disciplina
			let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => removerDisciplina(disciplina.id)
			btnRemover.style.marginRight = '5px'
			
			//cria o botao para atualizar a disciplina
			let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizarDisciplina(disciplina.id, divNomeDisciplina, divDiaSemana, divHorario)
			btnAtualizar.style.marginLeft = '5px'
			
			//cria a div com os dois botoes
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divDisciplina.appendChild(divBotoes)
			
			//insere a div do aluno na div com a lista de alunos
			listaDiscipinas.appendChild(divDisciplina)
		}
	})
}

function atualizarDisciplina(id, divNomeDisciplina, divDiaSemana, divHorario)
{
	let body =
	{
		'nome': divNomeDisciplina.value,
		"diaSemana": divDiaSemana.value,
		"horario": divHorario.value
	}
	
	fetch(url + "/atualizar/disciplina/" + id,
	{
		'method': 'POST',
		'redirect': 'follow',
		'headers':
		{
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		'body': JSON.stringify(body)
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listarDisciplinas()
		console.log(output)
		alert('Disciplina atualizada! \\o/')
	})
	.catch((error) =>
	{
		console.log(error)
		console.log("erro")
		alert('Não foi possível atualizar a disciplina :/')
	})
}

function removerDisciplina(id)
{
    console.log(url + '/deletar/disciplina/' + id)
	fetch(url + '/deletar/disciplina/' + id,
	{
		'method': 'POST',
		'redirect': 'follow'
	})
	.then((response) =>
	{
		if(response.ok)
		{
			return response.text()
		}
		else
		{
			return response.text().then((text) =>
			{
				throw new Error(text)
			})
		}
	})
	.then((output) =>
	{
		listar()
		console.log(output)
		alert('Disciplina removida! >=]')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível remover a disciplina :/')
	})
}

//*************************PROFESSOR****************************** */
function cadastrarProfessor(){
	
}