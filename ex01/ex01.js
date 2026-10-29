function calcularMedia(n1, n2) {
    return (n1 + n2) / 2;
}
function dadosValidos(n1, n2, frequencia) {
    return (Number.isFinite(n1) &&
        Number.isFinite(n2) &&
        Number.isFinite(frequencia) &&
        n1 >= 0 &&
        n1 <= 10 &&
        n2 >= 0 &&
        n2 <= 10 &&
        frequencia >= 0 &&
        frequencia <= 100);
}
function situacao(media, frequencia) {
    if (frequencia < 75) {
        return "Reprovado por falta";
    }
    else if (media >= 7) {
        return "Aprovado";
    }
    else if (media >= 4) {
        return `Exame final (precisa tirar ${(10 - media).toFixed(1)})`;
    }
    else {
        return "Reprovado por nota";
    }
}
const campoNome = document.getElementById("nome");
const campoN1 = document.getElementById("n1");
const campoN2 = document.getElementById("n2");
const campoFrequencia = document.getElementById("frequencia");
const botaoCalcular = document.getElementById("calcular");
const resultado = document.getElementById("resultado");
botaoCalcular.addEventListener("click", () => {
    const nome = campoNome.value.trim();
    const n1 = campoN1.valueAsNumber;
    const n2 = campoN2.valueAsNumber;
    const frequencia = campoFrequencia.valueAsNumber;
    if (!dadosValidos(n1, n2, frequencia)) {
        resultado.textContent = "Dados inválidos";
        resultado.className = "erro";
        return;
    }
    const media = calcularMedia(n1, n2);
    const textoSituacao = situacao(media, frequencia);
    resultado.textContent =
        `${nome}: média ${media.toFixed(1)}. ${textoSituacao}`;
    resultado.className = textoSituacao === "Aprovado" ? "sucesso" : "erro";
});
export {};
//# sourceMappingURL=ex01.js.map