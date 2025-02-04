const { jsPDF } = window.jspdf;
const ip = "localhost";

let itensCautela = [];

function adicionarItem() {
    const tipo = document.getElementById("item-tipo").value;
    const descricao = document.getElementById("item-descricao").value;
    const componentes = document.getElementById("item-componentes").value;
    const condicao = document.getElementById("item-condicao").value;
    const nrserie = document.getElementById("item-nrserie").value;
    const nrpatr = document.getElementById("item-nrpatr").value;

    if (!tipo || !descricao) {
        alert("Preencha pelo menos o tipo e a descrição do item.");
        return;
    }

    const novoItem = { tipo, descricao, componentes, condicao, nrserie, nrpatr };
    itensCautela.push(novoItem);

    atualizarListaItens();
}

function atualizarListaItens() {
    const container = document.getElementById("itens-container");
    container.innerHTML = "";

    itensCautela.forEach((item, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="div-item">
            <p>${item.tipo} - ${item.descricao} (${item.componentes}) *${item.condicao}</p>
            <p class="p-item">S/N:${item.nrserie} / Nr Patr:${item.nrpatr}
            <button class="remover" data-index="${index}">Remover</button></p>
            </div>
        `;
        container.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("itens-container").addEventListener("click", function(event) {
        if (event.target.classList.contains("remover")) {
            const index = Number(event.target.getAttribute("data-index")); // Converte para número
            itensCautela.splice(index, 1);
            atualizarListaItens();
        }
    });
});

function gerarCautela() {
    const cautelanteSU = document.getElementById("cautelante-subunidade").value;
    const cautelanteSUAbrev = document.getElementById("cautelante-subunidadeAbrev").value;
    const cautelantePgnome = document.getElementById("cautelante-pgnome").value;

    const pgnome = document.getElementById("pgnome").value;
    const idt = document.getElementById("idt").value;
    const cpf = document.getElementById("cpf").value;
    const phone = document.getElementById("phone").value;
    const cia = document.getElementById("cia").value;
    const motivo = document.getElementById("motivo").value;
    const dataSaida = document.getElementById("saida").value;
    const prevDevolucao = document.getElementById("devolucao").value;

    if (!pgnome || !phone || !cia || !cautelanteSU || !cautelantePgnome || !dataSaida || !motivo) {
        alert("Preencha todos os campos obrigatórios antes de criar a cautela.");
        return;
    }

    if (itensCautela.length === 0) {
        alert("Você precisa adicionar pelo menos um item.");
        return;
    }

    const dadosCautela = {
        cautelanteSU,
        cautelanteSUAbrev,
        cautelantePgnome,
        pgnome,
        idt,
        cpf,
        phone,
        cia,
        motivo,
        dataSaida,
        prevDevolucao,
        itens: itensCautela
    };

    console.log(dadosCautela);

    gerarPDF(dadosCautela);
}
