const formatarReal = (valor) => {
    return `R$ ${valor.toFixed(2)}`;
};
function lerPrecos(texto) {
    const linhas = texto.split('\n');
    const precos = [];
    let ignorados = 0;
    for (let i = 0; i < linhas.length; i++) {
        const linha = linhas[i].trim();
        // Linhas vazias são ignoradas sem aumentar o contador.
        if (linha === '') {
            continue;
        }
        // Ao atingir 20 itens válidos, não processa as linhas seguintes.
        if (precos.length >= 20) {
            break;
        }
        // Aceita ponto ou vírgula como separador decimal.
        const valor = Number(linha.replace(',', '.'));
        if (!Number.isFinite(valor) || valor <= 0) {
            ignorados++;
            continue;
        }
        precos.push(valor);
    }
    return { precos, ignorados };
}
function somarItens(...precos) {
    let total = 0;
    for (const preco of precos) {
        total += preco;
    }
    return total;
}
function calcularDesconto(total, percentualOuCupom) {
    if (typeof percentualOuCupom === 'number') {
        return total * percentualOuCupom / 100;
    }
    switch (percentualOuCupom.toUpperCase()) {
        case 'BEMVINDO':
            return total * 0.10;
        case 'PROMO20':
            return total * 0.20;
        case 'MENOS15':
            return total >= 100 ? 15 : 0;
        default:
            return 0;
    }
}
const campoItens = document.getElementById('itens');
const campoCupom = document.getElementById('cupom');
const campoFidelidade = document.getElementById('fidelidade');
const botaoFechar = document.getElementById('fechar');
const resultado = document.getElementById('resultado');
botaoFechar.addEventListener('click', () => {
    resultado.textContent = '';
    resultado.className = '';
    const leitura = lerPrecos(campoItens.value);
    const precos = leitura.precos;
    const ignorados = leitura.ignorados;
    if (precos.length === 0) {
        resultado.textContent = 'Nenhum item válido';
        resultado.className = 'erro';
        return;
    }
    const subtotal = somarItens(...precos);
    const cupomDigitado = campoCupom.value.trim();
    const cupom = cupomDigitado.toUpperCase();
    let descontoCupom = 0;
    let mensagemCupom = '';
    if (cupom !== '') {
        switch (cupom) {
            case 'BEMVINDO':
            case 'PROMO20':
                descontoCupom = calcularDesconto(subtotal, cupom);
                mensagemCupom =
                    `Cupom ${cupom}: - ${formatarReal(descontoCupom)}`;
                break;
            case 'MENOS15':
                if (subtotal >= 100) {
                    descontoCupom = calcularDesconto(subtotal, cupom);
                    mensagemCupom =
                        `Cupom ${cupom}: - ${formatarReal(descontoCupom)}`;
                }
                else {
                    mensagemCupom = 'Cupom inválido ou não aplicável';
                }
                break;
            default:
                mensagemCupom = 'Cupom inválido ou não aplicável';
                break;
        }
    }
    const aposCupom = subtotal - descontoCupom;
    const descontoFidelidade = campoFidelidade.checked
        ? calcularDesconto(aposCupom, 5)
        : 0;
    const total = aposCupom - descontoFidelidade;
    const linhas = [];
    let textoItens = `Itens: ${precos.length}`;
    if (ignorados > 0) {
        textoItens += ` (${ignorados} ${ignorados === 1 ? 'linha ignorada' : 'linhas ignoradas'})`;
    }
    linhas.push(textoItens);
    linhas.push(`Subtotal: ${formatarReal(subtotal)}`);
    if (mensagemCupom !== '') {
        if (descontoCupom > 0) {
            linhas.push(mensagemCupom);
        }
        else {
            linhas.push(mensagemCupom);
        }
    }
    if (campoFidelidade.checked) {
        linhas.push(`Fidelidade (5%): - ${formatarReal(descontoFidelidade)}`);
    }
    linhas.push(`Total a pagar: ${formatarReal(total)}`);
    resultado.textContent = linhas.join('\n');
    resultado.className = 'sucesso';
});
export {};
//# sourceMappingURL=ex05.js.map