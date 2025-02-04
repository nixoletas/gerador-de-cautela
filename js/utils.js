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

// máscara telefone

document.addEventListener("DOMContentLoaded", function () {
    const phoneInput = document.getElementById("phone");

    phoneInput.addEventListener("input", function (event) {
        let value = phoneInput.value.replace(/\D/g, ""); // Remove tudo que não for número
        
        if (value.length > 11) {
            value = value.slice(0, 11); // Limita ao tamanho de um celular com DDD
        }

        let formattedValue = "";

        if (value.length > 2) {
            formattedValue = `(${value.slice(0, 2)}) `;
            if (value.length > 7) {
                formattedValue += `${value.slice(2, 7)}-${value.slice(7)}`;
            } else {
                formattedValue += value.slice(2);
            }
        } else {
            formattedValue = value;
        }

        phoneInput.value = formattedValue;
    });
});

// máscara patrimônio

document.addEventListener("DOMContentLoaded", function () {
    const patrimonioInput = document.getElementById("item-nrpatr");

    if (patrimonioInput) {
        patrimonioInput.addEventListener("input", function () {
            let value = patrimonioInput.value.replace(/\D/g, ""); // Remove tudo que não for número
            value = value.slice(0, 5); // Limita a 5 dígitos
            
            patrimonioInput.value = value;
        });
    }
});
