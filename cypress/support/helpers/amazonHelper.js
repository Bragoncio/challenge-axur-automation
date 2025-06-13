import { parsePrecoTexto } from '../../utils/parseUtils';

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

export function adicionarProdutoAoCarrinho(quantidadeAdicionar = 1) {
  Cypress.env('quantidadeCarrinho', quantidadeAdicionar);

  if (quantidadeAdicionar > 1) {
    cy.get('span.a-dropdown-label').contains('Quantidade:').parent().click();
    cy.get('ul.a-nostyle.a-list-link')
      .find('a')
      .contains(`${quantidadeAdicionar}`)
      .click();
  }

  cy.get('#add-to-cart-button').click();

  cy.get('#NATC_SMART_WAGON_CONF_MSG_SUCCESS', { timeout: 10000 })
    .should('be.visible')
    .within(() => {
      cy.get('h1.sw-atc-text').should('contain.text', 'Adicionado ao carrinho');
    });

  cy.contains('a.a-button-text', 'Ir para o carrinho').click();
}

export function validarValorCarrinho() {
  const quantidadeEsperada = Cypress.env('quantidadeCarrinho');
  if (!quantidadeEsperada) {
    throw new Error('Quantidade esperada não definida no Cypress.env.quantidadeCarrinho');
  }

  cy.get('.sc-item-price-block', { timeout: 10000 })
    .first()
    .invoke('text')
    .then((valorBaseTexto) => {
      const valorUnitario = parsePrecoTexto(valorBaseTexto);
      const valorTotalEsperado = valorUnitario * quantidadeEsperada;

      cy.get('#sc-subtotal-amount-activecart .sc-price.sc-white-space-nowrap')
        .invoke('text')
        .then((textoActiveCart) => {
          const valorActiveCart = parsePrecoTexto(textoActiveCart);
          expect(valorActiveCart).to.eq(valorTotalEsperado);
        });

      cy.get('#sc-subtotal-amount-buybox .sc-price.sc-white-space-nowrap')
        .invoke('text')
        .then((textoBuybox) => {
          const valorBuybox = parsePrecoTexto(textoBuybox);
          expect(valorBuybox).to.eq(valorTotalEsperado);
        });
    });
}

export function alterarQuantidadeNoCarrinho(quantidade, acao) {
  if (!['adicionar', 'reduzir'].includes(acao)) {
    throw new Error(`Ação inválida: ${acao}. Use "adicionar" ou "reduzir".`);
  }

  const quantidadeAtual = Cypress.env('quantidadeCarrinho') || 0;

  let quantidadeDeCliques;
  let novaQuantidade;

  if (acao === 'adicionar') {
    quantidadeDeCliques = quantidade;
    novaQuantidade = quantidadeAtual + quantidade;
  } else {
    quantidadeDeCliques = Math.min(quantidade, quantidadeAtual);
    novaQuantidade = quantidadeAtual - quantidadeDeCliques;
  }

  const seletor = acao === 'adicionar'
    ? '[aria-label="Aumentar a quantidade em um"] > .a-icon'
    : '[data-action="a-stepper-decrement"]';

  for (let i = 0; i < quantidadeDeCliques; i++) {
    cy.get(seletor).first().click();
  }

  cy.contains('#sc-subtotal-label-activecart', `${novaQuantidade} produto`, { timeout: 10000 });

  Cypress.env('quantidadeCarrinho', novaQuantidade);
}
