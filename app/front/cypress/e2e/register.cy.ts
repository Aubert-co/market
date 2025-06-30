import {url} from '../../src/Services/index'
describe('template spec', () => {
    beforeEach(()=>{
        cy.visit('http://localhost:5173/registro')
    })
  it('should register a new user sucessfuly', () => {
    cy.contains('h1','Cadastro')
    cy.contains('Descontos Exclusivos: Mais Vantagens para Você')
    .click()

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

    cy.url().should('eq', Cypress.config().baseUrl + '/login');
  })
})