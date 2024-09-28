
function descargarDatosEmisores() {
    const tabla = document.getElementById('datosEmisores');
    const doc = new jsPDF();
    doc.autoTable({ html: tabla });

    // Descargar el PDF al hacer clic en el botón
    doc.save('datos_emisores.pdf');
}