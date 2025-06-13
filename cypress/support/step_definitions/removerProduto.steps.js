import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import * as carrinhoHelper from '../../support/helpers/carrinhoHelper';

When('reduzo a quantidade do carrinho em {int} unidade', (qtd) => {
  cy.alterarQuantidadeNoCarrinho(qtd, 'reduzir');
});

Then('deve exibir a mensagem que o produto foi removido do carrinho', () => {
  cy.contains('foi removido de Carrinho de compras.').should('be.visible');
});
