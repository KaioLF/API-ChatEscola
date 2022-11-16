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

//*************************DISCIPLINA*****************************/
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
		alert('Cadastro efetuado! :D')
	})
	//trata erro
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível efetuar o cadastro! :(')
	})
}

function validaNomeDisciplina(id){

	let divNomeDisciplina = document.getElementById(id)
	console.log(divNomeDisciplina .value)

	if(divNomeDisciplina.value.trim().split(' ').length >= 2){
		divNomeDisciplina .classList.remove("erro-input")
		return true
	}
	else{
		if(!divNomeDisciplina.classList.contains("erro-input")){
			divNomeDisciplina.classList.add('erro-input')
		}
		return false
	}

}

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
		//pega div que vai conter a lista de disciplinas
		let listaDiscipinas = document.getElementById('listar-disciplinas')
		
		//limpa div
        while(listaDiscipinas.firstChild){
            listaDiscipinas.removeChild(listaDiscipinas.firstChild)
        }
		
		//preenche div com disciplinas recebidas do GET
		for(let disciplina of disciplinas)
		{
			//cria div para as informacoes de uma disciplina
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
			
			//insere a div da disciplina na div com a lista de disciplinas
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

//*************************PROFESSOR*******************************/
function cadastrarProfessor(){

	if(!validaDiaDisponivel("dia-disponivel")){
		return
	}
	if(!validaHorarioDisponivel("horario-disponivel")){
		return
	}

	let body ={
		"nome": document.getElementById("nome-professor").value,
		"nomeDisciplina": document.getElementById("nome-disciplina").value,
		"diaDisponivel": document.getElementById("dia-disponivel").value,
		"horarioDisponivel": document.getElementById("horario-disponivel").value
	}

	//configuracao e realizacao do POST no endpoint "professor"
	fetch(url + "/cadastrar/professor",
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

function validaNomeProfessor(id){

	let divNomeProfessor = document.getElementById(id)
	console.log(divNomeProfessor.value)

	if(divNomeProfessor.value.trim().split(' ').length >= 2){
		divNomeProfessor.classList.remove("erro-input")
		return true
	}
	else{
		if(!divNomeProfessor.classList.contains("erro-input")){

			divNomeProfessor.classList.add('erro-input')
		}
		return false
	}

}
function validaNomeDisciplinaProfessor(id){

	let divNomeDiciplinaProfessor = document.getElementById(id)
	console.log(divNomeDiciplinaProfessor.value)


	if(divNomeDiciplinaProfessor.value.trim().split(' ').length >= 2){
		divNomeDiciplinaProfessor.classList.remove("erro-input")
		return true
	}
	else{
		if(!divNomeDiciplinaProfessor.classList.contains("erro-input")){

			divNomeDiciplinaProfessor.classList.add('erro-input')
		}
		return false
	}

}

function validaDiaProfessor(id){
    let divDiaSemanaDisponivel = document.getElementById(id)
	console.log(divDiaSemanaDisponivel.value)
	if(divDiaSemanaDisponivel.value == "Segunda-Feira" || divDiaSemanaDisponivel.value == "Terça-Feira" || divDiaSemanaDisponivel.value == "Quarta-Feira" || divDiaSemanaDisponivel.value == "Quinta-Feira" || divDiaSemanaDisponivel == "Sexta-Feira"){
		divDiaSemanaDisponivel.classList.remove('erro-input')
		return true
	}
	else
	{
		if(!divDiaSemanaDisponivel.classList.contains('erro-input'))
		{
			divDiaSemanaDisponivel.classList.add('erro-input')
		}
		return false
	}
}

function validaDiaDisponivel(id){
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
function validaHorarioDisponivel(id){
    let divHorarioDisponivel = document.getElementById(id)
	console.log(divHorarioDisponivel.value)
	if(divHorarioDisponivel.value == "Manhã" || divHorarioDisponivel.value == "Tarde" || divHorarioDisponivel.value == "Noite"){
		divHorarioDisponivel.classList.remove('erro-input')
		return true
	}
	else
	{
		if(!divHorarioDisponivel.classList.contains('erro-input'))
		{
			divHorarioDisponivel.classList.add('erro-input')
		}
		return false
	}
}
function listarProfessor(){
	//da um GET no endpoint "professores"
	fetch(url + '/professores')
	.then(response => response.json())
	.then((professores) =>
	{

		//pega div que vai conter a lista de professores
		let listaProfessores = document.getElementById('listar-professores')
		
		//limpa div
        while(listaProfessores.firstChild){
            listaProfessores.removeChild(listaProfessores.firstChild)
        }
		
		//preenche div com professores recebidos do GET
		for(let professor of professores)
		{
			//cria div para as informacoes de um professor
			let divProfessor = document.createElement('div')
			divProfessor.setAttribute('class', 'form')
			
			//pega o nome do professor
			let divNomeProfessor = document.createElement('input')
			divNomeProfessor.placeholder = 'Nome'
			divNomeProfessor.value = professor.nome
			divProfessor.appendChild(divNomeProfessor)

			//pega o nome da disciplina cadastrado no professor
			let divNomeDisciplina = document.createElement('input')
			divNomeDisciplina.placeholder = "Nome da Disciplina"
			divNomeDisciplina.value = professor.nomeDisciplina
			divProfessor.appendChild(divNomeDisciplina)

			//pega o dia da semana disponível do professor
			let divDiaSemanaDisponivel = document.createElement('input')
			divDiaSemanaDisponivel.placeholder = 'Dia da Semana Disponível'
			divDiaSemanaDisponivel.value = professor.diaDisponivel.value
			divProfessor.appendChild(divDiaSemanaDisponivel)

			//pega o horario disponível do professor
			let divHorarioDisponivel = document.createElement('input')
			divHorarioDisponivel.placeholder = 'Dia da Semana'
			divHorarioDisponivel.value = professor.horarioDisponivel
			divProfessor.appendChild(divHorarioDisponivel)

			//cria o botao para remover o professor
			let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => removerProfessor(professor.id)
			btnRemover.style.marginRight = '5px'
			
			//cria o botao para atualizar o professor
			let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizarProfessor(professor.id,divNomeProfessor,divNomeDisciplina, divDiaSemanaDisponivel, divHorarioDisponivel)
			btnAtualizar.style.marginLeft = '5px'
			
			//cria a div com os dois botoes
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divProfessor.appendChild(divBotoes)
			
			//insere a div do aluno na div com a lista de alunos
			listaProfessores.appendChild(divProfessor)
		}
	})
}
function atualizarProfessor(id, divNomeProfessor, divNomeDisciplina, divDiaSemanaDisponivel, divHorarioDisponivel)
{
	let body ={
		"nome": divNomeProfessor.value,
		"nomeDisciplina": divNomeDisciplina.value,
		"diaDisponivel": divDiaSemanaDisponivel.value,
		"horarioDisponivel": divHorarioDisponivel.value
	}
	
	fetch(url + "/atualizar/professor/" + id,
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
		listarProfessor()
		console.log(output)
		alert('Professor atualizado! \\o/')
	})
	.catch((error) =>
	{
		console.log(error)
		console.log("erro")
		alert('Não foi possível atualizar o Professor :/')
	})
}
function removerProfessor(id)
{
    console.log(url + '/deletar/professor/' + id)
	fetch(url + '/deletar/profes/' + id,
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
		alert('Professor removido! >=]')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível remover o professor :/')
	})
}

//*************************************TURMA************************************* */

function cadastrarTurma(){
	//TODO VALIDAR CAPACIDADE
	
	let body =
	{
        "idDisciplina": document.getElementById("codigo-disciplina").value,
		"nomeDisciplina": document.getElementById("nome-disciplina"),
		"alunos": document.getElementById("lista-alunos"),
	};
	
	//envio da requisicao usando a FETCH API
	
	//configuracao e realizacao do POST no endpoint "alunos"
	fetch(url + "/cadastrar/turma",
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
		alert('Cadastro efetuado! :D')
	})
	//trata erro
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível efetuar o cadastro! :(')
	})
}

//TODO OUTRAS FUNCOES
//TODO VALIDACOES
//***********************************SALA************************************ */

function cadastrarSala(){
	let body = {
		"capacidade": document.getElementById("capacidade").value
	}

	fetch(url + "/cadastrar/sala",
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
		alert('Cadastro efetuado! :D')
	})
	//trata erro
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível efetuar o cadastro! :(')
	})
}

function listarSala()
{
	//da um GET no endpoint "alunos"
	fetch(url + '/salas')
	.then(response => response.json())
	.then((salas) =>
	{
		//pega div que vai conter a lista de alunos
		let listaSalas = document.getElementById('listar-salas')
		
		//limpa div
        while(listaSalas.firstChild){
            listaSalas.removeChild(listaSalas.firstChild)
        }
		
		//preenche div com salas recebidos do GET
		for(let sala of salas)
		{
			//cria div para as informacoes de um sala
			let divSala = document.createElement('div')
			divSala.setAttribute('class', 'form')
			
			//pega a capacidade da sala
			let divCapacidade = document.createElement('input')
			divCapacidade.placeholder = 'Capacidade de Alunos'
			divCapacidade.value = sala.capacidade
			divSala.appendChild(divCapacidade)
			
			//cria o botao para remover a sala
			let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => removerSala(sala.id)
			btnRemover.style.marginRight = '5px'
			
			//cria o botao para atualizar a sala
			let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizarSala(sala.id, divCapacidade)
			btnAtualizar.style.marginLeft = '5px'
			
			//cria a div com os dois botoes
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divSala.appendChild(divBotoes)
			
			//insere a div do aluno na div com a lista de alunos
			listaSalas.appendChild(divSala)
		}
	})
}

function atualizarSala(id, divCapacidade)
{
	let body =
	{
		'capacidade': divCapacidade.value
	}
	
	fetch(url + "/atualizar/sala/" + id,
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
		listarSala()
		console.log(output)
		alert('Sala atualizada! \\o/')
	})
	.catch((error) =>
	{
		console.log(error)
		console.log("erro")
		alert('Não foi possível atualizar a sala :/')
	})
}
function removerSala(id)
{
    console.log(url + '/deletar/sala/' + id)
	fetch(url + '/deletar/sala/' + id,
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
		alert('Sala removida! >=]')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível remover a sala :/')
	})
}

//TODO FUNCTION validaCapacidade


//TODO ENSALAMENTO
