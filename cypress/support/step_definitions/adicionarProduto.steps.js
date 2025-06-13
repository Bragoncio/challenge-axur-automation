import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('aumento a quantidade do carrinho em {int} unidades', (qtd) => {
  cy.alterarQuantidadeNoCarrinho(qtd, 'adicionar');
});

Then('o valor total do carrinho deve ser atualizado corretamente', () => {
  cy.validarValorCarrinho();
});
