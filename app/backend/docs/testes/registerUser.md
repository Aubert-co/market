Funcionalidade: Registrar Usúario

Cenário: Cadastrar usuário com dados válidos
Dado que um usuário envia uma requisição para a rota POST/register
E informou um nome e uma senha válidos
E não existe um usuário com esse nome
Então a API deve retornar o status 201
E uma mensagem de sucesso: "success"

Cenário : Usúario tenta cadastrar com nome ou senha invalidos
Dado que um usuário envia uma requisição para a rota POST/register
E informou um nome e uma senha inválidos
Então a API deve retornar o status 400
E uma mensagem de erro: "Invalid username or password."

Cenário : Usuario tenta cadastrar ,mas já existe um usuario com aquele nome
Dado que um usuário envia uma requisição para a rota POST/register
E informou um nome e uma senha válidos
E existe um usuário com esse nome
Então a API deve retornar o status 409
E uma mensagem de erro: "User already exists"
