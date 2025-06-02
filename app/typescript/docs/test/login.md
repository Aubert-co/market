Funcionalidade: Logar Usúario

Cenário: Logar usuário com dados válidos ( email e senha)
  Dado que um usuário envia uma requisição para a rota POST/login
  E informou um email e uma senha válidos
  Então a API deve retornar o status 201
  E uma mensagem de sucesso:"User created successfully"
  E um jsonwebtoken deverá retornar para o usuario


Cenário: Tentativa de login com senha longa (acima de 15 caracteres)
  Dado que a API de registro está disponível
  Quando o usuário envia uma requisição POST para "/login" com uma senha de comprimento "16" (ex: "abcdefghijklmnop").
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro 'Invalid password. Please check and try again.'.

Cenário: Tentativa de login com senha curta (abaixo de 4 caracteres)
  Dado que a API de registro está disponível
  Quando o usuário envia uma requisição POST para "/login" com uma senha de comprimento "3" (ex: "abc").
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro 'Invalid password. Please check and try again.'

Cenário: Tentativa de login com senha vázia
  Dado que a API de registro está disponível
  Quando o usuário envia uma requisição POST para "/login" com uma senha igual a "".
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro 'Invalid password. Please check and try again.'

Cenário: Tentativa de login com email vázio
  Dado que a API de registro está disponível
  Quando o usuário envia uma requisição POST para "/login" com um email igual a "".
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro 'Invalid email. Please check and try again.'

Cenário: Tentativa de login com email inválido
  Dado que a API de registro está disponível
  Quando o usuário envia uma requisição POST para "/login" com um email igual a "test@gmail".
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro 'Invalid email. Please check and try again.'



Cenário : Usuario tenta Logar ,mas algo da errado no banco de dados
  Dado que um usuário envia uma requisição para a rota POST/login
  E informou um email e uma senha válidos
  E existe tal usuario no banco de dados
  E algo da errado no banco de dados na hora de verificar se os dados informados coinciedem
  Então a API deve retornar o status 401
  E uma mensagem de erro: "Failed to find an user"

Cenário : Usuario tenta Logar ,mas algo da errado no banco de dados
  Dado que um usuário envia uma requisição para a rota POST/login
  E informou um email e uma senha válidos
  E algo da errado na hora de criar a conta
  Então a API deve retornar o status 500
  E uma mensagem de erro: "Failed to create a new user"