function formatarIdentidade(input) {
    let valor = input.value.replace(/\D/g, ""); // Remove tudo que não for número    
    if (valor.length > 9) valor = valor.substring(0, 10); // Limita a 10 caracteres (9 números + 1 traço)
    if (valor.length > 9) {
        valor = valor.slice(0, 9) + "-" + valor.slice(9); // Adiciona o traço antes do último número
    }
    input.value = valor;
}


function formatarCPF(input) {
    let valor = input.value.replace(/\D/g, ""); // Remove tudo que não for número
    if (valor.length > 11) valor = valor.substring(0, 11); // Limita a 11 dígitos
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{2})$/, "$1-$2");
    input.value = valor;
}
