import { parsePrecoTexto } from '../utils/parseUtils'

export function buscarProdutoNaAmazon(nomeProduto) {
  cy.get('#twotabsearchtextbox', { timeout: 10000, log: false })
    .should('be.visible')
    .clear({ log: false })
    .type(`${nomeProduto}{enter}`, { log: false });

  cy.get('.s-main-slot', { timeout: 15000, log: false }).should('be.visible');
}

export function selecionarProdutoPorNome(palavrasChave = []) {
  cy.get('[data-cy="asin-faceout-container"]').each(($el) => {
    const titulo = $el.text().toLowerCase();

    const todasPresentes = palavrasChave.every(palavra =>
      titulo.includes(palavra.toLowerCase())
    );

    if (todasPresentes) {
      cy.wrap($el).find('a').first().click();

      cy.url().then((url) => {
        Cypress.env('urlProduto', url);
      });

      return false;
    }
  });
}


