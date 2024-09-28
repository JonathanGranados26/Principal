// Llama a la función para obtener los datos de Emisores
var datosEmisores = obtenerDatosEmisores();

// Actualiza la tabla en la vista de Emisor con los datos obtenidos
var tablaEmisores = document.getElementById('datosEmisores');
datosEmisores.forEach(function(fila) {
  var filaHTML = '<tr>' +
    '<th scope="row">Nombre:</th><td>' + fila[0] + '</td>' +
    '<th scope="row">Actividad:</th><td>' + fila[1] + '</td>' +
    '<th scope="row">NIT:</th><td>' + fila[2] + '</td>' +
    '<th scope="row">Correo:</th><td>' + fila[3] + '</td>' +
    '<th scope="row">Teléfono:</th><td>' + fila[4] + '</td>' +
    '</tr>';
  tablaEmisores.innerHTML += filaHTML;
});
