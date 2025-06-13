import * as amazonHelper from '../helpers/amazonHelper';
import * as carrinhoHelper from '../helpers/carrinhoHelper';
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
  return amazonHelper.buscarProdutoNaAmazon(nomeProduto);
});

Cypress.Commands.add('selecionarProdutoPorNome', (palavrasChave = []) => {
  return amazonHelper.selecionarProdutoPorNome(palavrasChave);
});

Cypress.Commands.add('adicionarProdutoAoCarrinho', (quantidadeAdicionar = 1) => {
  return carrinhoHelper.adicionarProdutoAoCarrinho(quantidadeAdicionar);
});

Cypress.Commands.add('validarValorCarrinho', () => {
  return carrinhoHelper.validarValorCarrinho();
});

Cypress.Commands.add('alterarQuantidadeNoCarrinho', (quantidade, acao) => {
  return carrinhoHelper.alterarQuantidadeNoCarrinho(quantidade, acao);
});

