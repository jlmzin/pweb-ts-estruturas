function tarifaPorKwh(tipo) {
    switch (tipo) {
        case 'residencial':
        case 'rural':
            return 0.80;
        case 'comercial':
        case 'industrial':
            return 0.95;
        default:
            return 0;
    }
}
function adicionalBandeira(consumo, bandeira = 'verde') {
    switch (bandeira) {
        case 'verde':
            return consumo * 0;
        case 'amarela':
            return consumo * 0.02;
        case 'vermelha1':
            return consumo * 0.04;
        case 'vermelha2':
            return consumo * 0.08;
        default:
            return 0;
    }
}
function mensagemBandeira(bandeira) {
    switch (bandeira) {
        case 'verde':
            return 'Condições favoráveis de geração de energia.';
        case 'amarela':
            return 'Condições de geração menos favoráveis.';
        case 'vermelha1':
        case 'vermelha2':
            return 'Condições mais caras de geração. Economize!';
        default:
            return 'Bandeira tarifária não identificada.';
    }
}
// Sem informar a bandeira, o parâmetro padrão será 'verde'.
// Resultado: 0, pois 100 kWh × R$ 0,00 = R$ 0,00.
console.log(adicionalBandeira(100));
const campoConsumo = document.getElementById('consumo');
const campoTipo = document.getElementById('tipo');
const campoBandeira = document.getElementById('bandeira');
const botaoCalcular = document.getElementById('calcular');
const resultado = document.getElementById('resultado');
botaoCalcular.addEventListener('click', () => {
    const consumo = campoConsumo.valueAsNumber;
    const tipo = campoTipo.value;
    const bandeira = campoBandeira.value;
    if (!Number.isFinite(consumo) || consumo <= 0) {
        resultado.textContent = 'Informe um consumo válido';
        resultado.className = 'erro';
        return;
    }
    const energia = consumo * tarifaPorKwh(tipo);
    const adicional = adicionalBandeira(consumo, bandeira);
    const total = energia + adicional;
    const mensagem = mensagemBandeira(bandeira);
    resultado.textContent =
        `Energia: R$ ${energia.toFixed(2)}\n` +
            `Bandeira ${bandeira.replace('vermelha1', 'vermelha patamar 1').replace('vermelha2', 'vermelha patamar 2')}: R$ ${adicional.toFixed(2)}\n` +
            `Total: R$ ${total.toFixed(2)}\n` +
            mensagem;
    resultado.className = bandeira === 'verde' ? '' : 'alerta';
});
export {};
//# sourceMappingURL=ex02.js.map