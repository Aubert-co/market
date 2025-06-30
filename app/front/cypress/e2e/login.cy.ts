describe('template spec', () => {
  it('passes', () => {
   
    cy.visit('http://localhost:5173/login')
    cy.contains('h1','Login')
    cy.get('input[placeholder="Digite seu email"]')
    
    cy.get('button')
    .click()
    
    cy.contains('Digite um email valido')

  })
})