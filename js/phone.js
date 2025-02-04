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
