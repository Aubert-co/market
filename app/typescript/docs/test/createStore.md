Funcionalidade: Criar Loja

Cenário: Criar loja com dados válidos
  Dado que a API de criação de loja está disponível
  E o usuário preencheu o nome da loja como "Loja Teste"
  E preencheu a descrição como "Descrição da loja"
  E anexou uma imagem válida chamada "image.jpeg"
  Quando o usuário envia uma requisição POST para "/store"
  Então a API deve retornar o status 201 Created
  E a resposta deve conter a mensagem "Store created"
  E a resposta deve conter os dados da loja com o nome "Loja Teste"
  E a imagem deve estar hospedada em um link do Google Cloud Storage


Cenário: Tentativa de criar loja sem autenticação
  Dado que a API de criação de loja está disponível
  E o usuário preencheu o nome da loja como "Loja Teste"
  E preencheu a descrição como "Descrição da loja"
  E anexou uma imagem válida chamada "image.jpeg"
  Quando o usuário envia uma requisição POST para "/store" sem fornecer um token de autenticação
  Então a API deve retornar o status 401 Unauthorized
  E a resposta deve conter a mensagem "Acess denied"
