
function calcularTotal(valor: number, parcelas: number): number {
  if (parcelas <= 3) {
    return valor;
  }

  return valor * 1.02 ** parcelas;
}

function simularParcelamento(preco: number, entrada?: number): string {
  let financiado = preco;

  if (typeof entrada !== 'undefined') {
    financiado = preco - entrada;
  }

  let linhas = '';

  for (let parcelas = 1; parcelas <= 12; parcelas++) {
    if (
      parcelas === 7 ||
      parcelas === 8 ||
      parcelas === 9 ||
      parcelas === 11
    ) {
      continue;
    }

    const total = calcularTotal(financiado, parcelas);
    const valorParcela = total / parcelas;

    if (valorParcela < 50) {
      break;
    }

    const juros = parcelas <= 3 ? 'sem juros' : '2% a.m.';

    linhas += `
      <tr>
        <td>${parcelas}x</td>
        <td>R$ ${valorParcela.toFixed(2)}</td>
        <td>R$ ${total.toFixed(2)}</td>
        <td>${juros}</td>
      </tr>
    `;
  }

  return linhas;
}

const campoPreco = document.getElementById('preco') as HTMLInputElement;
const campoEntrada = document.getElementById('entrada') as HTMLInputElement;
const botaoSimular = document.getElementById('simular') as HTMLButtonElement;
const resultado = document.getElementById('resultado') as HTMLDivElement;
const tabelaParcelas = document.getElementById('parcelas') as HTMLTableSectionElement;

botaoSimular.addEventListener('click', () => {
  const preco = campoPreco.valueAsNumber;
  const entradaTexto = campoEntrada.value;

  resultado.textContent = '';
  resultado.className = '';
  tabelaParcelas.innerHTML = '';

  if (!Number.isFinite(preco) || preco <= 0) {
    resultado.textContent = 'Informe um preço válido.';
    resultado.className = 'erro';
    return;
  }

  if (entradaTexto === '') {
    resultado.textContent = `Valor financiado: R$ ${preco.toFixed(2)}`;
    tabelaParcelas.innerHTML = simularParcelamento(preco);
    return;
  }

  const entrada = campoEntrada.valueAsNumber;

  if (!Number.isFinite(entrada) || entrada < 0) {
    resultado.textContent = 'Informe uma entrada válida.';
    resultado.className = 'erro';
    return;
  }

  if (entrada >= preco) {
    resultado.textContent =
      'A entrada cobre o valor total. Não há parcelas.';
    resultado.className = 'alerta';
    return;
  }

  const financiado = preco - entrada;

  resultado.textContent = `Valor financiado: R$ ${financiado.toFixed(2)}`;
  tabelaParcelas.innerHTML = simularParcelamento(preco, entrada);
});
