Funcionalidade: Buscar produtos por categoria
  Como um usuário do sistema
  Quero buscar produtos filtrando por categoria
  Para visualizar apenas os produtos relevantes ao meu interesse

  Cenário: Buscar produtos pela categoria "Eletrônicos"
    Dado que existem produtos cadastrados nas categorias "Eletrônicos" , "Moda" , "Acessorios,"Informatica"
    E a API de listagem por categoria está disponível
    Quando o usuário envia uma requisição GET para "/product/category/Eletrônicos"
    Então a API deve retornar apenas os produtos da categoria "Eletrônicos"
    E o status da resposta deve ser 200
    E o campo "fromCache" deve ser false
    E o campo "currentPage" deve ser igual a 1
    E o campo "totalPages" deve refletir a quantidade de produtos retornados
