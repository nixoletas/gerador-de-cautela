const { jsPDF } = window.jspdf;
const ip = "localhost";

function formatDateToBR(dateString) {
    const date = new Date(dateString);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

function toUpper(input) {
    input.value = input.value.toUpperCase();
}

document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => toUpper(input));
});

let itensCautela = [];

function adicionarItem() {
    const tipo = document.getElementById("item-tipo").value;
    const descricao = document.getElementById("item-descricao").value;
    const condicao = document.getElementById("item-condicao").value;
    const nrserie = document.getElementById("item-nrserie").value;
    const nrpatr = document.getElementById("item-nrpatr").value;
    
    if (!tipo || !descricao) {
        alert("Preencha pelo menos o tipo e a descrição do item.");
        return;
    }
    
    const novoItem = { tipo, descricao, condicao, nrserie, nrpatr };
    itensCautela.push(novoItem);
    
    atualizarListaItens();
    
    // Limpar campos
    document.getElementById("item-condicao").value = "";
    document.getElementById("item-nrserie").value = "";
    document.getElementById("item-nrpatr").value = "";
}

function atualizarListaItens() {
    const container = document.getElementById("itens-container");
    container.innerHTML = "";
    
    itensCautela.forEach((item, index) => {
        const div = document.createElement("div");
        div.innerHTML = `
            <p>${item.tipo} - ${item.descricao} (${item.condicao}) 
            <button class="remover" onclick="removerItem(${index})">Remover</button></p>
        `;
        container.appendChild(div);
    });
}

function removerItem(index) {
    itensCautela.splice(index, 1);
    atualizarListaItens();
}

function gerarCautela() {
    const cautelanteSU = document.getElementById("cautelante-subunidade").value;
    const cautelantePgnome = document.getElementById("cautelante-pgnome").value;

    const pgnome = document.getElementById("pgnome").value;
    const idt = document.getElementById("idt").value;
    const cpf = document.getElementById("cpf").value;
    const phone = document.getElementById("phone").value;
    const cia = document.getElementById("cia").value;
    const motivo = document.getElementById("task-motivo").value;
    const saida = document.getElementById("saida").value;
    const devolucao = document.getElementById("devolucao").value;

    if (!usuario || !phone || !cia || !responsavel || !datasaida || !motivo) {
        alert("Preencha todos os campos antes de criar a cautela.");
        return;
    }

    if (itensCautela.length === 0) {
        alert("Você precisa adicionar pelo menos um item.");
        return;
    }

    // Objeto com os dados da cautela
    const dadosCautela = {
        usuario,
        phone,
        cia,
        responsavel,
        datasaida,
        motivo,
        itens: itensCautela
    };

    console.log(dadosCautela)

    // Chama a função de geração de PDF
    gerarPDF(dadosCautela);
}