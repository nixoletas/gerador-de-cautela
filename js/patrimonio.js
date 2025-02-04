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
