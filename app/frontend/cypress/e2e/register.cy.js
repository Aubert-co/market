import { url } from "../../src/services";


describe('Registro de usuário', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/register');
  });

  it('should sucessfully create a new user', () => {
    cy.get('input[placeholder="Digite seu email"]').type('joao@example.com');
    cy.get('input[placeholder="Digite seu nome"]').type('lucas da silva');
    cy.get('input[placeholder="Digite sua senha"]').type('senhaSegura123');
    cy.get('input[placeholder="Repita sua senha"]').type('senhaSegura123');

    cy.intercept('POST', `${url}/register`, {
      statusCode: 201,
      body: { message: 'Usuário criado com sucesso' },
    }).as('registerUser');

    cy.contains('button', 'Enviar').click();
    cy.wait('@registerUser');

    cy.contains('Você criou sua conta com sucesso, você será redirecionado').should('be.visible');
    cy.url({ timeout: 10000 }).should('include', '/login');

  });
});
