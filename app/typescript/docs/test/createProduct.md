Funcionalidade criar produto

Cenário: Criar produto com dados válidos
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como "Produto Teste"
  E preencheu a descrição como "Descrição detalhada do produto"
  E selecionou a categoria "Eletrônicos"
  E definiu o preço como 199.99
  E definiu o estoque como 15 unidades
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 201 Created
  E a resposta deve conter a mensagem "Product created"
  E a resposta deve conter os dados do produto com o nome "Produto Teste"
  E a imagem deve estar hospedada em um link do Google Cloud Storage


Cenário: Criar produto com nome inválido
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como ""
  E preencheu a descrição como "Descrição detalhada do produto"
  E selecionou a categoria "Eletrônicos"
  E definiu o preço como 199.99
  E definiu o estoque como 15 unidades
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid name. Please check and try again."

Cenário: Criar produto com nome menor que 4 caracteres
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como "abc"
  E preencheu a descrição como "Descrição detalhada do produto"
  E selecionou a categoria "Eletrônicos"
  E definiu o preço como 199.99
  E definiu o estoque como 15 unidades
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid name. Please check and try again."

Cenário: Criar produto com nome maior que 15 caracteres
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como "aaaaaaaaaaaaaaaa"
  E preencheu a descrição como "Descrição detalhada do produto"
  E selecionou a categoria "Eletrônicos"
  E definiu o preço como 199.99
  E definiu o estoque como 15 unidades
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid name. Please check and try again."

Cenário: Criar produto com categoria inválida
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como "abcdee"
  E preencheu a descrição como "Descrição detalhada do produto"
  E selecionou a categoria ""
  E definiu o preço como 199.99
  E definiu o estoque como 15 unidades
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid name. Please check and try again."

Cenário: Criar produto com categoria maior que 15 caracteres
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como "abcdee"
  E preencheu a descrição como "Descrição detalhada do produto"
  E selecionou a categoria "aaaaaaaaaaaaaaaaa"
  E definiu o preço como 199.99
  E definiu o estoque como 15 unidades
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid name. Please check and try again."

Cenário: Criar produto com categoria menor que 4 caracteres
  Dado que a API de criação de produto está disponível
  E o usuário preencheu o nome do produto como "abcdee"
  E preencheu a descrição como "Descrição detalhada do produto"
  E selecionou a categoria "abc"
  E definiu o preço como 199.99
  E definiu o estoque como 15 unidades
  E anexou uma imagem válida chamada "produto.jpg"
  Quando o usuário envia uma requisição POST para "/product"
  Então a API deve retornar o status 422 Unprocessable Entity
  E a resposta deve conter a mensagem "Invalid name. Please check and try again."