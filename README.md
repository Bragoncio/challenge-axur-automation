<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&height=250&color=00FA9A&text=Axur%20QA&descAlign=50&descAlignY=50&textBg=false&animation=twinkling&descSize=1&stroke=E6E6FA&section=header&reversal=false">
<h1 align="center">🚀 Projeto de Automação Axur QA</h1>
</p>


<p align="center">
  <a href="#-produto">💻 Produto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-stack">⚙ Stack</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-objetivo">🎯 Objetivo</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-estrutura">🌌 Estrutura</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-execução">⏩ Execução</a>
</p>

<p align="center">
  <img alt="Cypress" src="https://img.shields.io/badge/cypress-%2317202C.svg?style=for-the-badge&logo=cypress&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black">
  <img alt="GitHub" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white">
</p>

<p align="center">
  <b>👤 Participante: Leonardo Braga Protasio</b>
</p>

---

## 💻 Produto

<p align="justify">
O <strong>Projeto de Automação Axur QA </strong> foi desenvolvido para atender ao desafio Axur QA Front, com foco na automação de testes de qualidade para a interface de usuário.
</p>

---

## ⚙ Stack

Este projeto foi construído com as seguintes tecnologias:

| **Tecnologia**   | **Descrição**                       |
| ---------------- | ----------------------------------- |
| <a href="https://www.cypress.io/"><img src="https://img.shields.io/badge/Cypress-00FA9A?style=for-the-badge&logo=cypress&logoColor=white"></a> | Framework de teste end-to-end para a web. |
| <a href="https://www.javascript.com/"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"></a> | Linguagem de programação utilizada no desenvolvimento do projeto. |

---

## 🎯 Objetivo

<p align="justify">
Este projeto de automação tem como objetivo garantir a execução confiável e repetitiva de um grande número de casos de teste em diversos ambientes. Além de proporcionar uma execução escalável, busca-se aprimorar a qualidade do software, oferecendo uma cobertura abrangente, especialmente em testes de regressão para verificar a reincidência de defeitos anteriormente corrigidos.
</p>

---

## 🌌 Estrutura

A organização do projeto segue uma estrutura lógica e modularizada, com foco em manutenibilidade, reaproveitamento e clareza. Está dividida em pastas específicas para cada responsabilidade, atendendo tanto testes de **frontend**, e promovendo boas práticas como o uso de **helpers reutilizáveis**.

---

### 🗂️ challenge-axur-automation

#### 📁 cypress

- **📁 e2e**  
  Contém os arquivos de testes end-to-end (E2E), separados por funcionalidades.  
  **Subpastas:**  
  - `features/` – Arquivos `.feature` no padrão Gherkin, descrevendo os cenários de teste.

- **📁 fixtures**  
  Contém dados estáticos (JSON) utilizados nos testes, podendo incluir mocks de usuários, produtos ou dados esperados.

- **📁 screenshots**  
  Pasta onde o Cypress salva os screenshots automaticamente em caso de falhas nos testes.

- **📁 downloads**  
  Armazena arquivos que são baixados durante a execução dos testes, quando aplicável.

- **📁 support**  
  Responsável por comandos personalizados, configuração global e helpers de apoio.  
  **Subpastas:**  
    - `commands/` – Arquivos com comandos customizados do Cypress.  
    - `helpers/` – Métodos auxiliares reutilizáveis para organização dos testes.  
    - `step_definitions/` – Contém os arquivos `.steps.js` responsáveis pela implementação dos passos descritos nos arquivos `.feature`.  
    - `utils/` – Funções utilitárias e funções auxiliares gerais.  
  **Arquivos:**  
    - `amazonHelper.js` – Métodos de apoio para interações com a Amazon.  
    - `carrinhoHelper.js` – Métodos específicos para manipular o carrinho de compras.  
    - `parseUtils.js` – Funções de conversão e manipulação de textos, preços, etc.  
    - `commands.js` – Arquivo com carregamento global dos comandos customizados.  
    - `e2e.js` – Arquivo de configuração global do Cypress e dos plugins, carregado antes da execução dos testes.

- **📁 allure-results**  
  Pasta onde são gerados os resultados brutos após a execução dos testes, necessários para geração dos relatórios Allure.

- **📁 allure-report**  
  Relatório gerado de forma interativa através do Allure, contendo o histórico, métricas e execução dos testes.

---

## ⏩ Execução

### Local

- Clone o repositório
- Baixe o Node.js - [NodeJs](https://nodejs.org/pt)
- Instale o *Cypress*: ```npm install cypress --save-dev```
- Executar o ```npx cypress open``` no terminal do projeto
- Executar o comando ```npx cypress run ou npm run report``` para rodar os testes