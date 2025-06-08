Funcionalidade: Login de Usuário

Cenário: Login bem-sucedido com credenciais válidas
  Dado que um usuário envia uma requisição POST para a rota "/login"
  E informa um email e uma senha válidos
  Então a API deve responder com o status 200
  E retornar uma mensagem de sucesso: "Login realizado com sucesso"
  E deve retornar um token JWT válido para o usuário



Cenário: Tentativa de login com senha longa (acima de 15 caracteres)
  Dado que a API de login está disponível
  Quando o usuário envia uma requisição POST para "/login" com uma senha de 16 caracteres (por exemplo, "abcdefghijklmnop")
  Então a API deve responder com o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro: "Invalid password. Please check and try again."


Cenário: Tentativa de login com senha curta (abaixo de 4 caracteres)
  Dado que a API de login está disponível
  Quando o usuário envia uma requisição POST para "/login" com uma senha de 3 caracteres (por exemplo, "abc")
  Então a API deve responder com o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro: "Invalid password. Please check and try again."


Cenário: Tentativa de login com senha vazia
  Dado que a API de login está disponível
  Quando o usuário envia uma requisição POST para "/login" com uma senha vazia ("")
  Então a API deve responder com o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro: "Invalid password. Please check and try again."


Cenário: Tentativa de login com email vazio
  Dado que a API de login está disponível
  Quando o usuário envia uma requisição POST para "/login" com um email vazio ("")
  Então a API deve responder com o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro: "Invalid email. Please check and try again."


Cenário: Tentativa de login com email inválido
  Dado que a API de login está disponível
  Quando o usuário envia uma requisição POST para "/login" com um email inválido "test@gmail"
  Então a API deve responder com o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem de erro: "Invalid email. Please check and try again."




Cenário: Usuário tenta logar, mas ocorre um erro no banco de dados
  Dado que a API de login está disponível
  E o usuário envia uma requisição POST para "/login" com email e senha válidos
  E o usuário existe no banco de dados
  E ocorre um erro no banco de dados ao verificar as credenciais
  Então a API deve responder com o status 401 Unauthorized
  E a resposta deve conter a mensagem de erro: "Failed to find an user"


Cenário: Usuário tenta se registrar, mas ocorre um erro no banco de dados
  Dado que a API de registro está disponível
  E o usuário envia uma requisição POST para "/register" com email e senha válidos
  E ocorre um erro no banco de dados ao tentar criar a conta
  Então a API deve responder com o status 500 Internal Server Error
  E a resposta deve conter a mensagem de erro: "Failed to create a new user"
