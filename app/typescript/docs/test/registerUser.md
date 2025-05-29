Funcionalidade: Registrar Usúario

Cenário: Cadastrar usuário com dados válidos (nome, email ou senha)
  Dado que um usuário envia uma requisição para a rota POST/register
  E informou um nome e uma senha válidos
  E não existe um usuário com esse nome
  Então a API deve retornar o status 201
  E uma mensagem de sucesso: "success"

Cenário: Tentativa de cadastro com  nome vázio
  Dado que a API de registro está disponível
  Quando o usuário envia uma requisição POST para "/register" com o nome igual á "".
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro 'Invalid name. Please check and try again.'.

Cenário: Tentativa de cadastro com nome curto (abaixo de 4 caracteres)
  Dado que a API de registro está disponível
  Quando o usuário envia uma requisição POST para "/register" com um nome de comprimento "3" (ex: "abc").
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro 'Invalid name. Please check and try again.'.

Cenário: Tentativa de cadastro com nome longo (acima de 15 caracteres)
  Dado que a API de registro está disponível
  Quando o usuário envia uma requisição POST para "/register" com um nome de comprimento "16" (ex: "abcdefghijklmnop").
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro 'Invalid name. Please check and try again.'.


Cenário: Tentativa de cadastro com senha longa (acima de 15 caracteres)
  Dado que a API de registro está disponível
  Quando o usuário envia uma requisição POST para "/register" com uma senha de comprimento "16" (ex: "abcdefghijklmnop").
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro 'Invalid password. Please check and try again.'.

Cenário: Tentativa de cadastro com senha curta (abaixo de 4 caracteres)
  Dado que a API de registro está disponível
  Quando o usuário envia uma requisição POST para "/register" com uma senha de comprimento "3" (ex: "abc").
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro 'Invalid password. Please check and try again.'

Cenário: Tentativa de cadastro com senha vázia
  Dado que a API de registro está disponível
  Quando o usuário envia uma requisição POST para "/register" com uma senha igual a "".
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro 'Invalid password. Please check and try again.'

Cenário : Usuario tenta cadastrar ,mas já existe um usuario com aquele email
  Dado que um usuário envia uma requisição para a rota POST/register
  E informou um nome e uma senha válidos
  E existe um usuário com esse nome
  Então a API deve retornar o status 409
  E uma mensagem de erro: "User already exists"
