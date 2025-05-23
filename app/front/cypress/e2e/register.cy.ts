import {url} from '../../src/Services/index'
describe('Page registro', () => {
  beforeEach(()=>{
    cy.visit('/registro')
    cy.contains('h1','Cadastro')
    cy.contains('Descontos Exclusivos: Mais Vantagens para Você')
      .click()
  })
  it('should register a new user sucessfuly', () => {
    cy.get('input[placeholder="Digite seu email"]')
      .type('teste@exemplo.com')

    cy.get('input[placeholder="Digite seu nome"]')
      .type('lucas')
    cy.get('input[placeholder="Digite sua senha"]')
      .type('SenhaForte123')
    cy.get('input[placeholder="Repita sua senha"]')
      .type('SenhaForte123')


    cy.intercept('POST', url + '/register', {
      statusCode: 201,
      body: { message: "Registro realizado com sucesso" }
    }).as('serviceRegister');

    cy.get('button')
      .click()
        
    cy.contains('Você criou sua conta com sucesso, você será redirecionado').should('be.visible');

    cy.url().should('include','/login');
  })
 
})

describe('Page /registro with invalid email',()=>{
  beforeEach(()=>{
      cy.visit('/registro')
      cy.contains('h1','Cadastro')
      cy.contains('Descontos Exclusivos: Mais Vantagens para Você')
      .click()
    })
    it("should not register a new user when the email is invalid",()=>{
      cy.get('input[placeholder="Digite seu email"]')
      .type('teste')

      cy.get('input[placeholder="Digite seu nome"]')
      .type('lucas')
      cy.get('input[placeholder="Digite sua senha"]')
      .type('SenhaForte123')
      cy.get('input[placeholder="Repita sua senha"]')
      .type('SenhaForte123')

      cy.get('button')
      .click()

      cy.contains('Digite um email valido').should('be.visible');
    })
  it("should not register a new user when the email is empty",()=>{
      //cy.get('input[placeholder="Digite seu email"]')
      //.type('')

     cy.get('input[placeholder="Digite seu nome"]')
     .type('lucas')
     cy.get('input[placeholder="Digite sua senha"]')
     .type('SenhaForte123')
     cy.get('input[placeholder="Repita sua senha"]')
     .type('SenhaForte123')

     cy.get('button')
    .click()

    cy.contains('Digite um email valido').should('be.visible');
  })
})

describe('Page /registro with invalid name',()=>{
  beforeEach(()=>{
    cy.visit('/registro')
    cy.contains('h1','Cadastro')
    cy.contains('Descontos Exclusivos: Mais Vantagens para Você')
      .click()
  })
  it("should not register a new user when the name is greater than 15",()=>{

    cy.get('input[placeholder="Digite seu email"]')
      .type('teste@gmail.com')

    cy.get('input[placeholder="Digite seu nome"]')
      .type('NomeExtremamenteGrande123')
    cy.get('input[placeholder="Digite sua senha"]')
      .type('SenhaForte123')
    cy.get('input[placeholder="Repita sua senha"]')
      .type('SenhaForte123')

    cy.get('button')
      .click()

    cy.contains('Digite um nome valido').should('be.visible');
  })
   it("should not register a new user when the name is smaller than 4",()=>{

    cy.get('input[placeholder="Digite seu email"]')
      .type('teste@gmail.com')

    cy.get('input[placeholder="Digite seu nome"]')
      .type('Nom')
    cy.get('input[placeholder="Digite sua senha"]')
      .type('SenhaForte123')
    cy.get('input[placeholder="Repita sua senha"]')
      .type('SenhaForte123')

    cy.get('button')
      .click()

    cy.contains('Digite um nome valido').should('be.visible');
  })
  it("should not register a new user when the name is empty",()=>{

    cy.get('input[placeholder="Digite seu email"]')
      .type('teste@gmail.com')

    //cy.get('input[placeholder="Digite seu nome"]')
    //  .type('Nom')
    cy.get('input[placeholder="Digite sua senha"]')
      .type('SenhaForte123')
    cy.get('input[placeholder="Repita sua senha"]')
      .type('SenhaForte123')

    cy.get('button')
      .click()

    cy.contains('Digite um nome valido').should('be.visible');
  })
})

describe('Page /registro with invalid password',()=>{
  beforeEach(()=>{
    cy.visit('/registro')
    cy.contains('h1','Cadastro')
    cy.contains('Descontos Exclusivos: Mais Vantagens para Você')
      .click()
  })
  it("should not register a new user when the password is greater than 15",()=>{

    cy.get('input[placeholder="Digite seu email"]')
      .type('teste@gmail.com')

    cy.get('input[placeholder="Digite seu nome"]')
      .type('lucas')
    cy.get('input[placeholder="Digite sua senha"]')
      .type('SenhaForte12323456666')
    cy.get('input[placeholder="Repita sua senha"]')
      .type('SenhaForte12323456666')

    cy.get('button')
      .click()

    cy.contains('Digite uma senha valida').should('be.visible');
  })
   it("should not register a new user when the password is smaller than 4",()=>{

    cy.get('input[placeholder="Digite seu email"]')
      .type('teste@gmail.com')

    cy.get('input[placeholder="Digite seu nome"]')
      .type('Nom')
    cy.get('input[placeholder="Digite sua senha"]')
      .type('sen')
    cy.get('input[placeholder="Repita sua senha"]')
      .type('SenhaForte123')

    cy.get('button')
      .click()

    cy.contains('Digite uma senha valida').should('be.visible');
  })
  it("should not register a new user when the password is empty",()=>{

    cy.get('input[placeholder="Digite seu email"]')
      .type('teste@gmail.com')

    cy.get('input[placeholder="Digite seu nome"]')
      .type('lucas')
    //cy.get('input[placeholder="Digite sua senha"]')
    //  .type('')
    cy.get('input[placeholder="Repita sua senha"]')
      .type('SenhaForte123')

    cy.get('button')
      .click()

    cy.contains('Digite uma senha valida').should('be.visible');
  })
  it("should not register a new user when the repeat password is empty",()=>{
     cy.get('input[placeholder="Digite seu email"]')
      .type('teste@gmail.com')

    cy.get('input[placeholder="Digite seu nome"]')
      .type('lucas')
    cy.get('input[placeholder="Digite sua senha"]')
      .type('senhaforte')
    //cy.get('input[placeholder="Repita sua senha"]')
    //  .type('SenhaForte123')

    cy.get('button')
      .click()

    cy.contains('As senhas não coincidem').should('be.visible');
  })
  it("should not register a new user when the repeat password is diferent from password",()=>{
     cy.get('input[placeholder="Digite seu email"]')
      .type('teste@gmail.com')

    cy.get('input[placeholder="Digite seu nome"]')
      .type('lucas')
    cy.get('input[placeholder="Digite sua senha"]')
      .type('senhaforte')
    cy.get('input[placeholder="Repita sua senha"]')
      .type('senhaforte1')

    cy.get('button')
      .click()

    cy.contains('As senhas não coincidem').should('be.visible');
  })
})

describe.only('Page /registro with internal error',()=>{
  beforeEach(()=>{
    cy.visit('/registro')
    cy.contains('h1','Cadastro')
    cy.contains('Descontos Exclusivos: Mais Vantagens para Você')
      .click()
  })
  it("should not create a new user account when status 500 returns",()=>{
    cy.get('input[placeholder="Digite seu email"]')
      .type('teste@exemplo.com')

    cy.get('input[placeholder="Digite seu nome"]')
      .type('lucas')
    cy.get('input[placeholder="Digite sua senha"]')
      .type('SenhaForte123')
    cy.get('input[placeholder="Repita sua senha"]')
      .type('SenhaForte123')


    cy.intercept('POST', url + '/register', {
      statusCode: 500,
      body: { message: "Internal error" }
    }).as('serviceRegister');

    cy.get('button')
      .click()

    cy.contains('Ocorreu um erro inesperado.').should('be.visible');
  })
  it.only("should not create a new user account when status 409 returns",()=>{
    cy.get('input[placeholder="Digite seu email"]')
      .type('teste@exemplo.com')

    cy.get('input[placeholder="Digite seu nome"]')
      .type('lucas')
    cy.get('input[placeholder="Digite sua senha"]')
      .type('SenhaForte123')
    cy.get('input[placeholder="Repita sua senha"]')
      .type('SenhaForte123')


    cy.intercept('POST', url + '/register', {
      statusCode: 409,
      body: { message: "Internal error" }
    }).as('serviceRegister');

    cy.get('button')
      .click()

    cy.contains('Este email já está cadastrado.').should('be.visible');
  })
  it("should not create a new user account when status 422 returns",()=>{
    cy.get('input[placeholder="Digite seu email"]')
      .type('teste@exemplo.com')

    cy.get('input[placeholder="Digite seu nome"]')
      .type('lucas')
    cy.get('input[placeholder="Digite sua senha"]')
      .type('SenhaForte123')
    cy.get('input[placeholder="Repita sua senha"]')
      .type('SenhaForte123')


    cy.intercept('POST', url + '/register', {
      statusCode: 422,
      body: { message: "Internal error" }
    }).as('serviceRegister');

    cy.get('button')
      .click()

    cy.contains('Nome, email ou senha inválidos.').should('be.visible');
  })
})