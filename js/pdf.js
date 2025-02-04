async function gerarPDF(dadosCautela) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const itens = dadosCautela.itens;
        const cautela = dadosCautela;

        // Título
        doc.setFont("helvetica", "bold");
        doc.setFontSize(10);
        const pageWidth = doc.internal.pageSize.width;

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
        y += 5; // Espaçamento entre linhas
        centralizarTexto(exercito, y);
        y += 5;
        centralizarTexto(bcom, y);
        y += 5;
        centralizarTexto(denominacao, y);
        
        y += 15;
        doc.setFontSize(14);
        doc.setFont("helvetica", "normal");
        centralizarTexto(`SEÇÃO DE TECNOLOGIA DA INFORMAÇÃO`, y);
        
        y += 10;
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        const titulo = "CAUTELA DE MATERIAL";
        centralizarTexto(titulo, y);

        y += 10;
        // Caixa de borda
        doc.setDrawColor(0);
        doc.setLineWidth(0.5);
        doc.rect(10, y, 190, 40);

        y += 10;
        chaveX = 50;
        valorX = 100;
        // Dados da cautela dentro da caixa
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(`Nome:`, chaveX, y);
        doc.setFont("helvetica", "normal");
        doc.text(`${dadosCautela.usuario}`, valorX, y);
        doc.setFont("helvetica", "bold");
        y += 27;
        
        doc.setFont("helvetica", "bold");
        const descricao = "Itens da Cautela";
        const descricaoWidth = doc.getTextWidth(descricao); // Largura do texto
        const descricaoX = (pageWidth - descricaoWidth) / 2; // Centraliza horizontalmente
        doc.text(descricao, descricaoX, y);

        doc.line(10, y + 2, 200, y + 2); // Linha separadora
        y += 15;
        doc.setFont("helvetica", "normal");

        itens.forEach((item) => {
            
            doc.setFontSize(12);
            doc.text(`- ${item.tipo} ${item.descricao}`, 15, y);
            y += 5;
            doc.setFontSize(10);
            doc.text(`  ${item.condicao} (${item.nrpatr})`, 15, y);
            y += 10;
        });

        y += 5;

        doc.setFont("helvetica", "bold");
        const options = { day: "numeric", month: "long", year: "numeric" };
        console.log(cautela.datasaida);
        const dataSaida = new Date(cautela.datasaida);

        // Ajusta a data para o horário local
        dataSaida.setMinutes(dataSaida.getMinutes() + dataSaida.getTimezoneOffset());

        // Ajusta a hora para 12:00:00 (meio-dia)
        dataSaida.setHours(12, 0, 0, 0);

        const dataFormatada = dataSaida.toLocaleDateString("pt-BR", options);
        console.log(dataFormatada);
        centralizarTexto(`Campo Grande, MS, ${dataFormatada}`, y);




        // Campos de assinatura
        doc.line(20, y + 20, 90, y + 20);
        doc.text(`${cautela.usuario} (${cautela.phone})`, 30, y + 25);
        doc.line(120, y + 20, 190, y + 20);
        doc.text(`${cautela.responsavel}`, 130, y + 25);

        doc.save(`${cautela.id} Cautela ${cautela.usuario}`);
        // doc.save(`${cautela.id} Cautela ${cautela.usuario}`);
}