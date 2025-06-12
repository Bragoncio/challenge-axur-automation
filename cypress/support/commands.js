// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('buscarProdutoNaAmazon', (nomeProduto) => {
  cy.get('#twotabsearchtextbox', { timeout: 10000, log: false })
    .should('be.visible')
    .clear({ log: false })
    .type(`${nomeProduto}{enter}`, { log: false });

  cy.get('.s-main-slot', { timeout: 15000, log: false }).should('be.visible');
});

Cypress.Commands.add('selecionarProdutoPorNome', (palavrasChave = []) => {
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
});

Cypress.Commands.add('adicionarProdutoAoCarrinho', (quantidadeAdicionar = 1) => {
  Cypress.env('quantidadeCarrinho', quantidadeAdicionar);

  if (quantidadeAdicionar > 1) {
    cy.get('span.a-dropdown-label', { log: false })
      .contains('Quantidade:', { log: false })
      .parent({ log: false })
      .click({ log: false });

    cy.get('ul.a-nostyle.a-list-link', { log: false })
      .find('a', { log: false })
      .contains(`${quantidadeAdicionar}`, { log: false })
      .click({ log: false });
  }

  cy.get('#add-to-cart-button', { log: false }).click({ log: false });

  cy.get('#NATC_SMART_WAGON_CONF_MSG_SUCCESS', { timeout: 10000 })
    .should('be.visible')
    .within(() => {
      cy.get('h1.sw-atc-text').should('contain.text', 'Adicionado ao carrinho');
    });

  cy.contains('a.a-button-text', 'Ir para o carrinho').click();
});

Cypress.Commands.add('validarValorCarrinho', () => {
  const quantidadeEsperada = Cypress.env('quantidadeCarrinho');

  if (!quantidadeEsperada) {
    throw new Error('Quantidade esperada não definida no Cypress.env.quantidadeCarrinho');
  }

  cy.get('.sc-item-price-block', { timeout: 10000 })
    .first()
    .invoke('text')
    .then((valorBaseTexto) => {
      const valorUnitario = parseFloat(
        valorBaseTexto.replace('R$', '').replace(/\s/g, '').replace(',', '.')
      );
      const valorTotalEsperado = valorUnitario * quantidadeEsperada;

      cy.log(` Valor base capturado: R$ ${valorUnitario.toFixed(2)}`);
      cy.log(` Quantidade esperada do env: ${quantidadeEsperada}`);
      cy.log(` Valor total esperado (unitário x quantidade): R$ ${valorTotalEsperado.toFixed(2)}`);

      cy.get('#sc-subtotal-amount-activecart .sc-price.sc-white-space-nowrap', { timeout: 10000 })
        .invoke('text')
        .then((textoActiveCart) => {
          const valorActiveCart = parseFloat(
            textoActiveCart.replace('R$', '').replace(/\s/g, '').replace(',', '.')
          );
          cy.log(' Subtotal nos detalhes do carrinho (activecart):');
          cy.log(` Valor exibido: R$ ${valorActiveCart.toFixed(2)}`);
          expect(valorActiveCart).to.eq(valorTotalEsperado);
        });

      cy.get('#sc-subtotal-amount-buybox .sc-price.sc-white-space-nowrap', { timeout: 10000 })
        .invoke('text')
        .then((textoBuybox) => {
          const valorBuybox = parseFloat(
            textoBuybox.replace('R$', '').replace(/\s/g, '').replace(',', '.')
          );
          cy.log('Subtotal no fechar pedido (buybox):');
          cy.log(` Valor exibido: R$ ${valorBuybox.toFixed(2)}`);
          expect(valorBuybox).to.eq(valorTotalEsperado);
        });
    });
});


Cypress.Commands.add('aumentarQuantidadeNoCarrinho', (quantidadeParaAdicionar) => {
  const quantidadeAtual = Cypress.env('quantidadeCarrinho') || 0;
  const novaQuantidade = quantidadeAtual + quantidadeParaAdicionar;

  cy.log(`Quantidade atual no env: ${quantidadeAtual}`);
  cy.log(`Quantidade para adicionar: ${quantidadeParaAdicionar}`);
  cy.log(`Nova quantidade total no env (após cliques): ${novaQuantidade}`);

  for (let i = 0; i < quantidadeParaAdicionar; i++) {
    cy.get('[aria-label="Aumentar a quantidade em um"] > .a-icon')
      .first()
      .click();
  }

  cy.contains('#sc-subtotal-label-activecart', `${novaQuantidade} produto`, { timeout: 10000 });

  Cypress.env('quantidadeCarrinho', novaQuantidade);
});



  
  