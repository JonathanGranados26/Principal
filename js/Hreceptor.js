// Función para cargar los datos de Receptores desde Sheety y actualizar la tabla
async function cargarDatosReceptores() {
    try {
        const response = await fetch('https://api.sheety.co/4e9a8c8d3bd6da2c8145e2df35353aaf/receptores/hoja1');
        const responseData = await response.json();
        
        // Verificar si la respuesta contiene la propiedad 'hoja1' que contiene el array de datos
        if (responseData.hoja1 && Array.isArray(responseData.hoja1)) {
            var data = responseData.hoja1;
            
            var tabla = document.getElementById('datosReceptores');
            tabla.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

            data.forEach(function (row) {
                var fila = tabla.insertRow();
                Object.values(row).forEach(function (cell) {
                    var celda = fila.insertCell();
                    celda.textContent = cell;
                });

                var accionesCell = fila.insertCell();

                var botonModificar = document.createElement('button');
                botonModificar.textContent = 'Modificar';
                botonModificar.classList.add('btn', 'btn-warning', 'me-2');
                botonModificar.onclick = function () {
                    abrirFormularioModificacion(row);
                };
                accionesCell.appendChild(botonModificar);

                var botonEliminar = document.createElement('button');
                botonEliminar.textContent = 'Eliminar';
                botonEliminar.classList.add('btn', 'btn-danger');
                botonEliminar.onclick = function () {
                    eliminarReceptor(row);
                };
                accionesCell.appendChild(botonEliminar);
            });
        } else {
            console.error('Formato de respuesta de la API de Sheety incorrecto:', responseData);
        }
    } catch (error) {
        console.error('Error al cargar los datos de Receptores desde Sheety:', error);
    }
}

// Función para guardar los cambios de un Receptor en Sheety
async function guardarCambiosReceptor() {
    var nombre = document.getElementById('nombre').value;
    var numDocumento = document.getElementById('numDocumento').value;
    var tipoDocumento = document.getElementById('tipoDocumento').value;
    var municipio = document.getElementById('municipio').value;
    var departamento = document.getElementById('departamento').value;
    var complemento = document.getElementById('complemento').value;
    var telefono = document.getElementById('telefono').value;
    var actividad = document.getElementById('actividad').value;
    var nrc = document.getElementById('nrc').value;
    var correo = document.getElementById('correo').value;

    var datos = {
        nombre: nombre,
        numDocumento: numDocumento,
        tipoDocumento: tipoDocumento,
        municipio: municipio,
        departamento: departamento,
        complemento: complemento,
        telefono: telefono,
        actividad: actividad,
        nrc: nrc,
        correo: correo
    };

    try {
        // Obtener el ID del receptor a modificar mediante el nombre y el correo electrónico
        const response = await fetch('https://api.sheety.co/4e9a8c8d3bd6da2c8145e2df35353aaf/receptores/hoja1');
        const data = await response.json();

        // Buscar el receptor con el nombre y el correo electrónico especificados
        const receptor = data.hoja1.find(receptor => receptor.nombre === nombre && receptor.correo === correo);

        if (receptor) {
            const idReceptor = receptor.id; // Obtener el ID del receptor encontrado
            const updateResponse = await fetch(`https://api.sheety.co/4e9a8c8d3bd6da2c8145e2df35353aaf/receptores/hoja1/${idReceptor}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ hoja1: datos }),
            });

            const updateData = await updateResponse.json();
            console.log('Receptor actualizado:', updateData);

            alert('Cambios guardados correctamente.');
            cargarDatosReceptores(); // Recargar datos después de guardar cambios
            $('#modalModificarDatos').modal('hide'); // Ocultar el modal
        } else {
            console.error('No se encontró ningún receptor con el nombre y correo electrónico especificados.');
            alert('No se encontró ningún receptor con el nombre y correo electrónico especificados.');
        }
    } catch (error) {
        console.error('Error al guardar los cambios en Sheety:', error);
        alert('Error al guardar los cambios. Consulta la consola para más detalles.');
    }
}

// Función para abrir el modal de modificación con los datos del Receptor seleccionado
function abrirFormularioModificacion(datosReceptor) {
    $('#modalModificarDatos').modal('show');
    document.getElementById('nombre').value = datosReceptor.nombre;
    document.getElementById('numDocumento').value = datosReceptor.numDocumento;
    document.getElementById('tipoDocumento').value = datosReceptor.tipoDocumento;
    document.getElementById('municipio').value = datosReceptor.municipio;
    document.getElementById('departamento').value = datosReceptor.departamento;
    document.getElementById('complemento').value = datosReceptor.complemento;
    document.getElementById('telefono').value = datosReceptor.telefono;
    document.getElementById('actividad').value = datosReceptor.actividad;
    document.getElementById('nrc').value = datosReceptor.nrc;
    document.getElementById('correo').value = datosReceptor.correo;
}

// Función para eliminar un receptor
async function eliminarReceptor(datosReceptor) {
    var idReceptor = datosReceptor.id; // Obtener el ID del receptor a eliminar

    try {
        const response = await fetch(`https://api.sheety.co/4e9a8c8d3bd6da2c8145e2df35353aaf/receptores/hoja1/${idReceptor}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Receptor eliminado correctamente:', idReceptor);
            alert('Receptor eliminado correctamente.');
            cargarDatosReceptores(); // Recargar datos después de eliminar el receptor
        } else {
            console.error('Error al eliminar el receptor:', response.statusText);
            alert('Error al eliminar el receptor. Consulta la consola para más detalles.');
        }
    } catch (error) {
        console.error('Error al eliminar el receptor:', error);
        alert('Error al eliminar el receptor. Consulta la consola para más detalles.');
    }
}




// Esperar a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Agregar el evento click al botón de descarga PDF
// Función para generar el PDF al hacer clic en el botón
document.getElementById('descargarPDF').addEventListener('click', function() {
    // Crear un nuevo documento PDF
    window.jsPDF = window.jspdf.jsPDF;
    const doc = new jsPDF();

    // Agregar contenido al PDF
    doc.text('Información de Receptores', 10, 10); // Título
    doc.autoTable({ html: '#tablaReceptores' }); // Agregar tabla con id 'tablaEmisores'

    // Descargar el PDF
    doc.save('informacion_Receptores.pdf');
});
});
