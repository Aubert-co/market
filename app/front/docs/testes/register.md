Funcionalidade: Registro de novo usuário


  Cenário: Usuário faz registro com dados válidos
    Dado que o usuário acessa a página de registro
    Quando ele preenche o campo de email com "teste@exemplo.com"
    E preenche o campo de nome com "Lucas"
    E preenche o campo de senha com "SenhaForte123"
    E confirma o campo de senha com "SenhaForte123"
    E envia o formulário de registro
    E a API de registro retorna um status 201 de sucesso
    Então o sistema deve exibir a mensagem "Registro realizado com sucesso"
    E redirecionar o usuário para /login 

  Cenário: Usuário tenta registrar com email inválido
    Dado que o usuário acessa a página de registro
    Quando ele preenche o campo de email com "teste"
    E preenche o campo de nome com "Lucas"
    E preenche o campo de senha com "SenhaForte123"
    E confirma o campo de senha com "SenhaForte123"
    E envia o formulário de registro
    Então o sistema deve exibir a mensagem "Por favor, insira um email válido"

  Cenário: Usuário tenta registrar sem preencher o email
    Dado que o usuário acessa a página de registro
    Quando ele não preenche o campo de email
    E preenche o campo de senha com "SenhaForte123"
    E confirma o campo de senha com "SenhaForte123"
    E envia o formulário de registro
    Então o sistema deve exibir a mensagem "Campo de email obrigatório"

  Cenário: Usuário tenta registrar com senhas que não conferem
    Dado que o usuário acessa a página de registro
    Quando ele preenche o campo de email com "teste@exemplo.com"
    E preenche o campo de senha com "SenhaForte123"
    E confirma o campo de senha com "SenhaErrada123"
    E envia o formulário de registro
    Então o sistema deve exibir a mensagem "As senhas não conferem"


Cenário: Usuário tenta registrar com nome muito curto
  Dado que o usuário acessa a página de registro
  Quando ele preenche o campo de nome com "Ana"
  E preenche o campo de email com "teste@exemplo.com"
  E preenche o campo de senha com "SenhaForte123"
  E confirma o campo de senha com "SenhaForte123"
  E envia o formulário de registro
  Então o sistema deve exibir a mensagem "Digite um nome valido"

Cenário: Usuário tenta registrar com nome muito longo
  Dado que o usuário acessa a página de registro
  Quando ele preenche o campo de nome com "NomeExtremamenteGrande123"
  E preenche o campo de email com "teste@exemplo.com"
  E preenche o campo de senha com "SenhaForte123"
  E confirma o campo de senha com "SenhaForte123"
  E envia o formulário de registro
  Então o sistema deve exibir a mensagem "Digite um nome valido"

Cenário: Usuário tenta registrar sem preencher o nome
  Dado que o usuário acessa a página de registro
  Quando ele não preenche o campo de nome
  E preenche o campo de email com "teste@exemplo.com"
  E preenche o campo de senha com "SenhaForte123"
  E confirma o campo de senha com "SenhaForte123"
  E envia o formulário de registro
  Então o sistema deve exibir a mensagem "Digite um nome valido"