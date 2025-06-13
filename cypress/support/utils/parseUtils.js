export function parsePrecoTexto(texto) {
    return parseFloat(
      texto.replace('R$', '').replace(/\s/g, '').replace(',', '.')
    );
  }