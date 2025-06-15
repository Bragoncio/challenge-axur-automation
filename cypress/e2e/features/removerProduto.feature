@regressao
Feature: Remover produto do carrinho

  Scenario: Remover produto após adicionar
    Given que estou na página inicial da Amazon
    When eu busco por "Huggies Fralda Premium Natural Care M 32 Un"
    And seleciono o produto contendo "Huggies" e "Natural Care"
    And adiciono 1 unidade ao carrinho
    Then o valor total do carrinho deve estar correto
    When reduzo a quantidade do carrinho em 1 unidade
    Then deve exibir a mensagem que o produto foi removido do carrinho