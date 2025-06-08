Funcionalidade: Registrar Usuário

Cenário: Cadastrar usuário com dados válidos (nome, email e senha)
  Dado que um usuário envia uma requisição para a rota POST "/register"
  E informou um nome, email e senha válidos
  E não existe um usuário com esse email
  Então a API deve retornar o status 201 Created
  E a resposta deve conter a mensagem de sucesso: "User created successfully"


Cenário: Tentativa de cadastro com nome vazio
  Dado que a API de registro está disponível
  Quando o usuário envia uma requisição POST para "/register" com o nome igual a ""
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro: "Invalid name. Please check and try again."


Cenário: Tentativa de cadastro com nome curto (abaixo de 4 caracteres)
  Dado que a API de registro está disponível
  Quando o usuário envia uma requisição POST para "/register" com um nome de comprimento 3 (ex: "abc")
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro: "Invalid name. Please check and try again."


Cenário: Tentativa de cadastro com nome longo (acima de 15 caracteres)
  Dado que a API de registro está disponível
  Quando o usuário envia uma requisição POST para "/register" com um nome de comprimento "16" (ex: "abcdefghijklmnop").
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro 'Invalid name. Please check and try again.'.


Cenário: Tentativa de cadastro com senha longa (acima de 15 caracteres)
  Dado que a API de registro está disponível
  Quando o usuário envia uma requisição POST para "/register" com uma senha de comprimento 16 (ex: "abcdefghijklmnop")
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro: "Invalid password. Please check and try again."


Cenário: Tentativa de cadastro com senha curta (abaixo de 4 caracteres)
  Dado que a API de registro está disponível
  Quando o usuário envia uma requisição POST para "/register" com uma senha de comprimento 3 (ex: "abc")
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro: "Invalid password. Please check and try again."


Cenário: Tentativa de cadastro com senha vazia
  Dado que a API de registro está disponível
  Quando o usuário envia uma requisição POST para "/register" com a senha igual a ""
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro: "Invalid password. Please check and try again."


Cenário: Tentativa de cadastro com email vazio
  Dado que a API de registro está disponível
  Quando o usuário envia uma requisição POST para "/register" com o email igual a ""
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro: "Invalid email. Please check and try again."


Cenário: Tentativa de cadastro com email inválido
  Dado que a API de registro está disponível
  Quando o usuário envia uma requisição POST para "/register" com o email igual a "test@gmail"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro: "Invalid email. Please check and try again."


Cenário: Usuário tenta cadastrar, mas já existe um usuário com aquele email
  Dado que um usuário envia uma requisição para a rota POST /register
  E informou um nome, email e senha válidos
  E já existe um usuário com esse email
  Então a API deve retornar o status 409 Conflict
  E uma mensagem de erro: "User already exists"


Cenário : Usuario tenta cadastrar ,mas algo da errado no banco de dados
  Dado que um usuário envia uma requisição para a rota POST/register
  E informou um nome,email e uma senha válidos
  E algo da errado na hora de checar se o email já existe
  Então a API deve retornar o status 500
  E uma mensagem de erro: "Failed to find an user"

Cenário: Usuário tenta cadastrar, mas algo dá errado no banco de dados
  Dado que um usuário envia uma requisição para a rota POST /register
  E informou um nome, email e uma senha válidos
  E ocorreu um erro ao criar a conta no banco de dados
  Então a API deve retornar o status 500
  E uma mensagem de erro: "Failed to create a new user"
