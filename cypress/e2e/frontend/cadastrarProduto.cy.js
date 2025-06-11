/// <reference types="cypress" />


describe('Testes de Cadastro de Produto', () => {


    beforeEach(() => {
        cy.visit('/');
    });

    context('Cadastrar Produtos', () => {
        it('Deve realizar o Cadastro de um Produto com sucesso', () => {
            cy.buscarProdutoNaAmazon('Huggies Fralda Premium Natural Care M 32 Un');
            cy.selecionarProdutoPorNome(['Huggies', 'Natural Care']);
        });
    });

   
});
