import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('que estou na página inicial da Amazon', () => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.visit('/');
});

When('eu busco por {string}', (produto) => {
  cy.buscarProdutoNaAmazon(produto);
});

When('seleciono o produto contendo {string} e {string}', (nomeProduto, tipoProduto) => {
  cy.selecionarProdutoPorNome([nomeProduto, tipoProduto]);
});

When('adiciono {int} unidade ao carrinho', (qtd) => {
  cy.adicionarProdutoAoCarrinho(qtd);
});

Then('o valor total do carrinho deve estar correto', () => {
  cy.validarValorCarrinho();
});
