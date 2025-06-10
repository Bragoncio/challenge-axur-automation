/// <reference types="cypress" />


describe('Testes de Cadastro de Produto', () => {
    let usuarioAdmin;



    beforeEach(() => {
        cy.visit('/');
    });

    context('Cadastrar Produtos', () => {
        it('Deve realizar o Cadastro de um Produto com sucesso', () => {
            cy.buscarProdutoNaAmazon('Huggies Fralda Premium Natural Care M 32 Un');
        });
    });

    // context('Validação de campos obrigatórios', () => {
    //     it('Deve exibir erro ao tentar cadastrar sem informar o nome', () => {
    //         const produto = gerarProdutoAleatorio();
    //         produto.nome = undefined;
    //         cy.navigateToIncluirCadastrarProduto();
    //         tentarCadastrarProduto(produto);
    //         cy.contains('Nome é obrigatório').should('be.visible');
    //     });

    //     it('Deve exibir erro ao tentar cadastrar sem informar o preço', () => {
    //         const produto = gerarProdutoAleatorio();
    //         produto.preco = undefined;
    //         cy.navigateToIncluirCadastrarProduto();
    //         tentarCadastrarProduto(produto);
    //         cy.contains('Preco é obrigatório').should('be.visible');
    //     });

    //     it('Deve exibir erro ao tentar cadastrar sem informar a descrição', () => {
    //         const produto = gerarProdutoAleatorio();
    //         produto.descricao = undefined;
    //         cy.navigateToIncluirCadastrarProduto();
    //         tentarCadastrarProduto(produto);
    //         cy.contains('Descricao é obrigatório').should('be.visible');
    //     });

    //     it('Deve exibir erro ao tentar cadastrar sem informar a quantidade', () => {
    //         const produto = gerarProdutoAleatorio();
    //         produto.quantidade = undefined;
    //         cy.navigateToIncluirCadastrarProduto();
    //         tentarCadastrarProduto(produto);
    //         cy.contains('Quantidade é obrigatório').should('be.visible');
    //     });
    // });
});
