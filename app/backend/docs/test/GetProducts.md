Funcionalidade: Listagem de produtos com paginação

Cenário: Listar produtos com página inválida (zero)
  Dado que existem 20 produtos cadastrados no banco de dados
  E a API de listagem de produtos está disponível
  Quando o usuário envia uma requisição GET para "/product/page=0"
  Então a API deve retornar 10 produtos
  E o campo "currentPage" na resposta deve ser igual a 1
  E o campo "totalPages" na resposta deve ser igual a 2
  E o status deve ser 200


Cenário: Listar produtos com dados vindos do cache
Dado que a página 1 já foi requisitada anteriormente e seus dados estão armazenados em cache
E a API de listagem de produtos está disponível
Quando o usuário envia uma requisição GET para "/product/page=1"
Então a API deve retornar 10 produtos
E os dados devem ter sido recuperados a partir do cache
E o campo "currentPage" na resposta deve ser igual a 1
E o campo "totalPages" na resposta deve ser igual a 2
E o status deve ser 200

Cenário: Retornar erro ao tentar acessar os dados no cache
Dado que a API de listagem de produtos está disponível
E a chave de cache para a página 1 existe, mas ocorre um erro ao tentar acessá-la
Quando o usuário envia uma requisição GET para "/product/page=1"
Então a API não deve retornar os dados do cache
E deve continuar o fluxo normal de obtenção dos dados diretamente do banco de dados
E deve retornar 10 produtos
E o campo "fromCache" deve ser falso ou ausente
E o campo "currentPage" na resposta deve ser igual a 1
E o status deve ser 200


Cenário: Continuar o fluxo normalmente mesmo com erro ao salvar produtos no cache
Dado que existem 20 produtos cadastrados no banco de dados
E a API de listagem de produtos está disponível
E o cache para a página 1 ainda não foi criado
E ocorre um erro ao tentar salvar os dados da página 1 no cache
Quando o usuário envia uma requisição GET para "/product/page=1"
Então a API deve retornar 10 produtos
E o campo "currentPage" na resposta deve ser igual a 1
E o campo "totalPages" na resposta deve ser igual a 2
E o campo "fromCache" deve ser falso ou ausente
E o status deve ser 200


Cenário: Retornar os dados da última página disponível quando a página solicitada excede o total de páginas
Dado que existem 20 produtos cadastrados no banco de dados
E a API de listagem de produtos está disponível
Quando o usuário envia uma requisição GET para "/product/page=999"
Então a API deve retornar os produtos da última página disponível
E o campo "currentPage" na resposta deve ser igual a 2
E o campo "totalPages" na resposta deve ser igual a 2
E o campo "products" deve conter 10 itens
E o status da resposta deve ser 200