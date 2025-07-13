import {url} from '../../src/Services/index'
import { storeDatas } from '../fixtures'
storeDatas

describe('Page registro', () => {
  

  beforeEach(()=>{
    cy.visit('/my-stores')
     cy.intercept('GET', url + '/store/mystores', {
      statusCode: 201,
      body: { message: "Produto criado com sucesso",datas:storeDatas }
    }).as('serviceCreateStore');
    cy.contains('Crie sua loja agora mesmo e comece a faturar com facilidade e segurança.')
  
  })
  it("should create a new store sucessfully",()=>{
   
    cy.contains('h1','Criar Loja!')
    cy.get("input[placeholder='Ex: EletronicArts']")
    .type('Lorem ipstu')

    cy.get("textarea[placeholder='Ex: Produtos eletrônicos diversos']")
    .type('Tesging loreqmeqe ipstu tests')

    cy.get('input[type="file"]').selectFile('cypress/fixtures/image.jpeg', {
        force: true
    });

     cy.intercept('POST', url + '/store/create', {
      statusCode: 201,
      body: { message: "Produto criado com sucesso" }
    }).as('serviceCreateStore');

    cy.contains('button', 'Enviar')
    .click()
  })
})