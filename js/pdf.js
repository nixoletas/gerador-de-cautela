async function gerarPDF(dadosCautela) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const itens = dadosCautela.itens;
    const cautela = dadosCautela;

    // Título
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // 🔹 Carregar imagem como Base64
    const loadImageAsBase64 = async (imagePath) => {
        const response = await fetch(imagePath);
        const blob = await response.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });
    };

    const brasaoBase64 = await loadImageAsBase64("./brasao.png");

    // 🔹 Adicionar imagem no cabeçalho (centralizada)
    const brasaoWidth = 30;
    const brasaoX = (pageWidth - brasaoWidth) / 2;
    doc.addImage(brasaoBase64, "PNG", brasaoX, 5, brasaoWidth, 15);

    let y = 25;

    const ministerio = "MINISTÉRIO DA DEFESA";
    const exercito = "EXÉRCITO BRASILEIRO";
    const bcom = "9º BATALHÃO DE COMUNICAÇÕES E GUERRA ELETRÔNICA";
    const denominacao = "(BATALHÃO MAJOR RONDON)";
    
    // Função para centralizar e imprimir o texto
    const centralizarTexto = (texto, posY) => {
        const textWidth = doc.getTextWidth(texto);
        const textX = (pageWidth - textWidth) / 2;
        doc.text(texto, textX, posY);
    };

    // Imprimir os textos centralizados
    centralizarTexto(ministerio, y);
    y += 5;
    centralizarTexto(exercito, y);
    y += 5;
    centralizarTexto(bcom, y);
    y += 5;
    centralizarTexto(denominacao, y);
    
    y += 12;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    centralizarTexto(`${cautela.cautelanteSU}`, y);
    
    y += 6;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    const titulo = "CAUTELA DE MATERIAL";
    centralizarTexto(titulo, y);

    y += 8;
    // Caixa de borda
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(10, y, 190, 40);

    y += 10;
    const chaveX = 50;
    const valorX = 100;

    // Dados da cautela dentro da caixa
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(`P/G Nome:`, chaveX, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${cautela.pgnome}`, valorX, y);
    doc.setFont("helvetica", "bold");
    y += 5;
    doc.text(`Idt:`, chaveX, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${cautela.idt}`, valorX, y);
    doc.setFont("helvetica", "bold");
    y += 5;
    doc.text(`CPF:`, chaveX, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${cautela.cpf}`, valorX, y);
    doc.setFont("helvetica", "bold");
    y += 5;
    doc.text(`Celular:`, chaveX, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${cautela.phone}`, valorX, y);
    doc.setFont("helvetica", "bold");
    y += 5;
    doc.text(`SU/Seç:`, chaveX, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${cautela.cia}`, valorX, y);
    doc.setFont("helvetica", "bold");
    y += 5;
    doc.text(`Motivo da cautela:`, chaveX, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${cautela.motivo}`, valorX, y);
    y += 15;

    doc.setFont("helvetica", "bold");
    const descricao = "Itens da Cautela";
    const descricaoWidth = doc.getTextWidth(descricao);
    const descricaoX = (pageWidth - descricaoWidth) / 2;
    doc.text(descricao, descricaoX, y);

    doc.line(10, y + 2, 200, y + 2);
    y += 10;
    doc.setFont("helvetica", "normal");

    itens.forEach((item) => {
        doc.setFontSize(8);
        doc.text(`- ${item.tipo} ${item.descricao} (+ ${item.componentes}) - Qtde: ${item.qtde}`, 15, y);
        y += 3;
        doc.setFontSize(6);
        doc.text(`  Nr Série: ${item.nrserie} | Nr Patr: ${item.nrpatr} (*Obs: ${item.condicao})`, 15, y);
        y += 7;
    });

    y += 5;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    const options = { day: "numeric", month: "long", year: "numeric" };
    const dataSaida = new Date(cautela.dataSaida);

    // Ajusta a data para o horário local
    dataSaida.setMinutes(dataSaida.getMinutes() + dataSaida.getTimezoneOffset());
    dataSaida.setHours(12, 0, 0, 0);

    const dataFormatada = dataSaida.toLocaleDateString("pt-BR", options);
    centralizarTexto(`Campo Grande, MS, ${dataFormatada}`, y);
    
    y += 5;

    const prevDevolucao = new Date(cautela.prevDevolucao);
    prevDevolucao.setMinutes(prevDevolucao.getMinutes() + prevDevolucao.getTimezoneOffset());
    prevDevolucao.setHours(12, 0, 0, 0);


    doc.setFont("helvetica", "normal");
    const devolucaoFormatada = prevDevolucao.toLocaleDateString("pt-BR", options);
    centralizarTexto(`Previsão de devolução: ${devolucaoFormatada}`, y);

    // Campos de assinatura
    doc.line(20, y + 20, 90, y + 20);
    doc.text(`${cautela.pgnome} (${cautela.cpf})`, 30, y + 25);
    doc.line(120, y + 20, 190, y + 20);
    doc.text(`${cautela.cautelantePgnome}`, 130, y + 25);

    // 🔹 Adicionando retângulo no canto inferior direito
    const rectWidth = 190;
    const rectHeight = 20;
    const rectX = pageWidth - rectWidth - 10;
    const rectY = pageHeight - rectHeight - 10;

    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(rectX, rectY, rectWidth, rectHeight);

    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text("Devolvido em: ____/_________/_________ Recebido por:", rectX + 5, rectY + 8);
    doc.text("Obs:", rectX + 5, rectY + 16);

    // doc.save(`Cautela-${cautela.cautelanteSUAbrev}-${cautela.pgnome}`);
    const pdfBlob = doc.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);
    window.open(blobUrl, "_blank");
}
