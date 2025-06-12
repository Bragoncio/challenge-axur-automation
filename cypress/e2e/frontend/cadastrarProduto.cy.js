/// <reference types="cypress" />


describe('Testes de Cadastro de Produto', () => {


    beforeEach(() => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
        cy.visit('/');
      });

    context('Cadastrar Produtos', () => {
        it('Fluxo completo adicionando ao carrinho e validando', () => {
            cy.buscarProdutoNaAmazon('Huggies Fralda Premium Natural Care M 32 Un');
            cy.selecionarProdutoPorNome(['Huggies', 'Natural Care']);
            
            cy.adicionarProdutoAoCarrinho(1);
            cy.validarMensagemAdicionadoCarrinho();
          
            cy.validarValorCarrinho();

            cy.voltarParaPaginaProduto();
          
            cy.adicionarProdutoAoCarrinho(2);
            cy.validarMensagemAdicionadoCarrinho();
            cy.validarValorCarrinho();
          });
    });

   
});
