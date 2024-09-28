document.addEventListener('DOMContentLoaded', function () {
    const precioInputs = document.querySelectorAll('input[type="number"]');
    precioInputs.forEach(input => {
        input.addEventListener('input', calcularSumas);
    });

    function calcularSumas() {
        let ivaTotal = 0;
        let subTotal = 0;

        precioInputs.forEach(input => {
            const precio = parseFloat(input.value);
            if (!isNaN(precio)) {
                subTotal += precio;
                ivaTotal += precio * 0.13; // Calcula el 13% de IVA
            }
        });

        document.getElementById('ivaTotal').textContent = `$${ivaTotal.toFixed(2)}`;
        document.getElementById('subTotal').textContent = `$${subTotal.toFixed(2)}`;
        // Calcula y actualiza los demás campos según tus necesidades
    }
});
