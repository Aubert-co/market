Funcionalidade: Listar produtos com paginação

  Cenário: Requisitar a primeira página de produtos com sucesso
    Dado que existem mais de 10 produtos cadastrados no banco de dados
    E o cache para a chave "product:page:1" está vazio
    Quando o usuário envia uma requisição GET para "/product/page/1"
    Então a API deve retornar o status 200 OK
    E a resposta deve conter a propriedade "datas" com até 10 produtos
    E a resposta deve conter a propriedade "totalPages"
    E a resposta deve conter a propriedade "currentPage" com o valor 1

  Cenário: Requisitar uma página de produtos já presente no cache
    Dado que a chave "product:page:2" está presente no cache Redis
    Quando o usuário envia uma requisição GET para "/product/page/2"
    Então a API deve retornar o status 200 OK
    E a resposta deve conter os dados diretamente do cache
    E a resposta deve conter a propriedade "currentPage" com o valor 2

  Cenário: Requisitar uma página inválida
    Dado que o usuário envia uma query param inválida como "abc"
    Quando o usuário envia uma requisição GET para "/product/page/abc"
    Então a API deve retornar a primeira página de resultados
    E a resposta deve conter a propriedade "currentPage" com o valor 1

  Cenário: Ocorre um erro ao contar os produtos no banco
    Dado que ocorre uma falha no banco ao tentar contar os produtos
    Quando o usuário envia uma requisição GET para "/product/page/1"
    Então a API deve retornar o status 500 Internal Server Error
    E a resposta deve conter uma mensagem de erro apropriada
