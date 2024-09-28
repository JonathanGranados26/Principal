function enviarDatos() {
    try {
        const data = {
            emisor: {
                nombre: document.getElementById('nombre').value,
                nombreComercial: document.getElementById('nombreComercial').value,
                actividad: document.getElementById('actividad').value,
                municipio: document.getElementById('municipio').value,
                departamento: document.getElementById('departamento').value,
                complemento: document.getElementById('complemento').value,
                telefono: document.getElementById('telefono').value,
                nit: document.getElementById('nit').value,
                nrc: document.getElementById('nrc').value,
                correo: document.getElementById('correo').value
            },
            receptor: {
                nombre: document.getElementById('nombreE').value,
                numeroDocumento: document.getElementById('numeroDocumentoE').value,
                tipoDocumento: document.getElementById('tipoDocumentoE').value,
                municipio: document.getElementById('municipioE').value,
                departamento: document.getElementById('departamentoE').value,
                complemento: document.getElementById('complementoE').value,
                telefono: document.getElementById('telefonoE').value,
                actividad: document.getElementById('actividadE').value,
                nrc: document.getElementById('nrcE').value,
                correo: document.getElementById('correoE').value
            },
            descripcion: [
                {
                    cantidad: document.getElementById('cantidad1').value,
                    descripcion: document.getElementById('descripcion1').value,
                    precioUnitario: document.getElementById('precioUnitario1').value,
                    ventasNoSujetas: document.getElementById('ventasNoSujetas1').value,
                    ventasExentas: document.getElementById('ventasExentas1').value,
                    ventasAfectadas: document.getElementById('ventasAfectadas1').value,
                    total: document.getElementById('total1').value
                },
                {
                    cantidad: document.getElementById('cantidad2').value,
                    descripcion: document.getElementById('descripcion2').value,
                    precioUnitario: document.getElementById('precioUnitario2').value,
                    ventasNoSujetas: document.getElementById('ventasNoSujetas2').value,
                    ventasExentas: document.getElementById('ventasExentas2').value,
                    ventasAfectadas: document.getElementById('ventasAfectadas2').value,
                    total: document.getElementById('total2').value
                }
            ]
        };

        fetch('https://localhost:8113/firmardocumento/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            alert('Datos enviados correctamente');
        })
        .catch((error) => {
            console.error('Error:', error.message);
            alert('Error al enviar los datos: ' + error.message);
        });
    } catch (error) {
        console.error('Error al obtener los valores de los campos:', error);
        alert('Error al obtener los valores de los campos: ' + error.message);
    }
}
