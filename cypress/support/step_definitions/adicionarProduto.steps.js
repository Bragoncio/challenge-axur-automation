import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import * as amazonHelper from '../../support/helpers/amazonHelper';
import * as carrinhoHelper from '../../support/helpers/carrinhoHelper';

When('aumento a quantidade do carrinho em {int} unidades', (qtd) => {
  cy.alterarQuantidadeNoCarrinho(qtd, 'adicionar');
});

Then('o valor total do carrinho deve ser atualizado corretamente', () => {
  cy.validarValorCarrinho();
});
