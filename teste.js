var url = 'https://localhost:3013'

function cadastrarTeste()
{
	//validacao de alguns dos inputs
	
	if(!validaNome('nome-aluno'))
	{
		return
	}
	//construcao do json que vai no body da criacao de usuario	
	
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
		while(listaAlunos.firstChild)
		{
			listaAlunos.removeChild(listaAlunos.firstChild)
		}
		
		//preenche div com alunos recebidos do GET
		for(let usuario of alunos)
		{
			//cria div para as informacoes de um usuario
			let divAluno = document.createElement('div')
			divAluno.setAttribute('class', 'form')
			
			//pega o nome do usuario
			let divNome = document.createElement('input')
			divNome.placeholder = 'Nome'
			divNome.value = usuario.nome
			divAluno.appendChild(divNome)
			
			//cria o botao para remover o usuario
			let btnRemover = document.createElement('button')
			btnRemover.innerHTML = 'Remover'
			btnRemover.onclick = u => remover(usuario.id)
			btnRemover.style.marginRight = '5px'
			
			//cria o botao para atualizar o usuario
			let btnAtualizar = document.createElement('button')
			btnAtualizar.innerHTML = 'Atualizar'
			btnAtualizar.onclick = u => atualizar(usuario.id, divNome, divEmail, divCpf)
			btnAtualizar.style.marginLeft = '5px'
			
			//cria a div com os dois botoes
			let divBotoes = document.createElement('div')
			divBotoes.style.display = 'flex'
			divBotoes.appendChild(btnRemover)
			divBotoes.appendChild(btnAtualizar)
			divAluno.appendChild(divBotoes)
			
			//insere a div do usuario na div com a lista de alunos
			listaAlunos.appendChild(divAluno)
		}
	})
}

//EXEMPLO DE FUNCAO QUE CRIA OPTION DE SELECAO DE alunos
function foo()
{
	//da um GET no endpoint "alunos"
	fetch(url + '/alunos')
	.then(response => response.json())
	.then((alunos) =>
	{
		//PEGA OPTION VAZIA NO HTML
		let selALunos = document.getElementById('option-alunos')
				
		//PREENCHE ELA COM O NOME E O ID DOS alunos
		for(let alunos of alunos)
		{
			let optAlunos = document.createElement('option')
			optAlunos.innerHTML = aluno.nome
			optAlunos.value = aluno.id
			selALunos.appendChild(optAlunos)
		}
	})
}

function atualizar(id, divNome, divEmail, divCpf)
{
	let body =
	{
		'Nome': divNome.value,
		'Email': divEmail.value,
		'Cpf': divCpf.value
	}
	
	fetch(url + "alunos/" + id,
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
		alert('Usuário atualizado! \\o/')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível atualizar o usuário :/')
	})
}

function remover(id)
{
	fetch(url + 'alunos/' + id,
	{
		'method': 'DELETE',
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
		alert('Usuário removido! >=]')
	})
	.catch((error) =>
	{
		console.log(error)
		alert('Não foi possível remover o usuário :/')
	})
}