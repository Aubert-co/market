Funcionalidade: Registrar Usúario

Cenário: Cadastrar usuário com dados válidos (nome, email ou senha)
Dado que um usuário envia uma requisição para a rota POST/register
E informou um nome e uma senha válidos
E não existe um usuário com esse nome
Então a API deve retornar o status 201
E uma mensagem de sucesso: "success"

Cenário: Tentativa de cadastro com dados inválidos (nome, email ou senha)
  Dado que a API de registro está disponível
  Quando o usuário envia uma requisição POST para "/register" com dados de nome, email ou senha inválidos
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro 'Invalid name. Please check and try again.'.

Cenário : Usuario tenta cadastrar ,mas já existe um usuario com aquele nome
Dado que um usuário envia uma requisição para a rota POST/register
E informou um nome e uma senha válidos
E existe um usuário com esse nome
Então a API deve retornar o status 409
E uma mensagem de erro: "User already exists"
