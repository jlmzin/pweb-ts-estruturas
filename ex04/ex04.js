const formatarReal = (valor) => {
    return `R$ ${valor.toFixed(2)}`;
};
const formatarMeses = (meses) => {
    const anos = Math.floor(meses / 12);
    const mesesRestantes = meses % 12;
    if (anos === 0) {
        return `${mesesRestantes} ${mesesRestantes === 1 ? 'mês' : 'meses'}`;
    }
    if (mesesRestantes === 0) {
        return `${anos} ${anos === 1 ? 'ano' : 'anos'}`;
    }
    return `${anos} ${anos === 1 ? 'ano' : 'anos'} e ` +
        `${mesesRestantes} ${mesesRestantes === 1 ? 'mês' : 'meses'}`;
};
function calcularMeses(meta, deposito, taxa = 0.5) {
    let saldo = 0;
    let depositado = 0;
    let meses = 0;
    while (saldo < meta) {
        meses++;
        // Primeiro, o saldo recebe o rendimento mensal.
        saldo = saldo * (1 + taxa / 100);
        // Em dezembro, o depósito é dobrado por causa do 13º salário.
        const depositoDoMes = meses % 12 === 0 ? deposito * 2 : deposito;
        saldo += depositoDoMes;
        depositado += depositoDoMes;
        if (meses >= 600) {
            break;
        }
    }
    return {
        meses,
        saldo,
        depositado
    };
}
function exibirValor(rotulo, valor, formatar) {
    return `${rotulo}: ${formatar(valor)}`;
}
const campoMeta = document.getElementById('meta');
const campoDeposito = document.getElementById('deposito');
const campoTaxa = document.getElementById('taxa');
const botaoCalcular = document.getElementById('calcular');
const resultado = document.getElementById('resultado');
botaoCalcular.addEventListener('click', () => {
    const meta = campoMeta.valueAsNumber;
    const deposito = campoDeposito.valueAsNumber;
    const taxaTexto = campoTaxa.value;
    resultado.textContent = '';
    resultado.className = '';
    if (!Number.isFinite(meta) ||
        !Number.isFinite(deposito) ||
        meta <= 0 ||
        deposito <= 0) {
        resultado.textContent = 'Informe valores positivos';
        resultado.className = 'erro';
        return;
    }
    let dados;
    if (taxaTexto === '') {
        // Sem terceiro argumento, será usada a taxa padrão de 0,5%.
        dados = calcularMeses(meta, deposito);
    }
    else {
        const taxa = campoTaxa.valueAsNumber;
        if (!Number.isFinite(taxa)) {
            resultado.textContent = 'Informe um rendimento válido';
            resultado.className = 'erro';
            return;
        }
        dados = calcularMeses(meta, deposito, taxa);
    }
    if (dados.saldo < meta) {
        resultado.textContent =
            'Meta inalcançável em 50 anos.\n' +
                exibirValor('Saldo após 600 meses', dados.saldo, formatarReal);
        resultado.className = 'erro';
        return;
    }
    const rendimento = dados.saldo - dados.depositado;
    resultado.textContent =
        `Você atinge a meta em ${dados.meses} meses ` +
            `(${formatarMeses(dados.meses)}).\n` +
            exibirValor('Saldo final', dados.saldo, formatarReal) + '\n' +
            exibirValor('Total depositado', dados.depositado, formatarReal) + '\n' +
            exibirValor('Rendimento', rendimento, formatarReal);
    resultado.className = 'sucesso';
});
export {};
//# sourceMappingURL=ex04.js.map