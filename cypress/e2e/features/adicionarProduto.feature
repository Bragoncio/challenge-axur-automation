Feature: Adicionar produto ao carrinho

  Scenario: Adicionar produto e validar total
    Given que estou na página inicial da Amazon
    When eu busco por "Huggies Fralda Premium Natural Care M 32 Un"
    And seleciono o produto contendo "Huggies" e "Natural Care"
    And adiciono 1 unidade ao carrinho
    Then o valor total do carrinho deve estar correto
    When aumento a quantidade do carrinho em 3 unidades
    Then o valor total do carrinho deve ser atualizado corretamente