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
  const quantidadeAnterior = Cypress.env('quantidadeCarrinho') || 0;
  const quantidadeTotalCalculada = quantidadeAnterior + quantidadeAdicionar;

  cy.log(`Quantidade anterior no carrinho (salva): ${quantidadeAnterior}`);
  cy.log(`Quantidade que será adicionada agora: ${quantidadeAdicionar}`);
  cy.log(`Quantidade total calculada para valor esperado: ${quantidadeTotalCalculada}`);

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

  cy.get('.a-price .a-offscreen', { log: false }).first()
    .invoke('text')
    .then((precoTexto) => {
      const precoUnitario = parseFloat(
        precoTexto.replace('R$', '').replace(/\s/g, '').replace(',', '.')
      );
      const valorTotalEsperado = precoUnitario * quantidadeTotalCalculada;

      Cypress.env('valorTotalEsperado', valorTotalEsperado);

      cy.log(`Valor unitário capturado: R$ ${precoUnitario.toFixed(2)}`);
      cy.log(`Quantidade adicionada ao carrinho agora: ${quantidadeAdicionar}`);
      cy.log(`Quantidade total calculada para validar valor: ${quantidadeTotalCalculada}`);
      cy.log(`Valor total esperado calculado (unitário x total calculado): R$ ${valorTotalEsperado.toFixed(2)}`);

      Cypress.env('quantidadeCarrinho', quantidadeTotalCalculada);
    });

  cy.get('#add-to-cart-button', { log: false }).click({ log: false });
});



Cypress.Commands.add('validarValorCarrinho', () => {
  const valorEsperado = Cypress.env('valorTotalEsperado');

  cy.get('#sw-subtotal', { log: false })
    .find('.a-offscreen', { log: false })
    .invoke('text')
    .then((textoSubtotal) => {
      const valorCarrinho = parseFloat(
        textoSubtotal.replace('R$', '').replace(/\s/g, '').replace(',', '.')
      );

      cy.log(`Valor no carrinho: R$ ${valorCarrinho.toFixed(2)}`);
      cy.log(`Valor esperado: R$ ${valorEsperado.toFixed(2)}`);

      expect(valorCarrinho).to.eq(valorEsperado);
    });
});

Cypress.Commands.add('validarMensagemAdicionadoCarrinho', () => {
  cy.get('#NATC_SMART_WAGON_CONF_MSG_SUCCESS', { timeout: 10000 })
    .should('be.visible')
    .within(() => {
      cy.get('h1.sw-atc-text').should('contain.text', 'Adicionado ao carrinho');
    });
});

Cypress.Commands.add('voltarParaPaginaProduto', () => {
  const urlProduto = Cypress.env('urlProduto');
  if (urlProduto) {
    cy.visit(urlProduto);
  } else {
    throw new Error('URL do produto não está definida no Cypress.env');
  }
});
  
  
  