// Función para obtener los datos del receptor desde Google Sheets
async function obtenerDatosReceptor(nombreReceptor) {
    try {
      // Obtener la respuesta de Google Sheets
      const response = await fetch('https://docs.google.com/spreadsheets/d/1Z0ksHZXkEXiSkJj5PIfzgJHfkE6uGgcfOLHRpu2AvQ0/gviz/tq?tqx=out:json&gid=1');
      const data = await response.text();
  
      // Limpiar el JSON eliminando cualquier contenido no deseado (como comentarios)
      const cleanedData = limpiarJSON(data);
  
      // Analizar el JSON ahora válido
      const jsonData = JSON.parse(cleanedData);
  
      // Acceder a los datos necesarios
      const rows = jsonData.table.rows;
  
      // Buscar el receptor por nombre en los datos obtenidos
      for (const row of rows) {
        const receptorNombre = row.c[0].v; // Suponiendo que el nombre está en la primera columna
  
        if (receptorNombre === nombreReceptor) {
          // Llenar los campos del formulario con los datos del receptor encontrado
          document.getElementById('numeroDocumentoE').value = row.c[1].v;
          document.getElementById('tipoDocumentoE').value = row.c[2].v;
          document.getElementById('municipioE').value = row.c[3].v;
          document.getElementById('departamentoE').value = row.c[4].v;
          document.getElementById('complementoE').value = row.c[5].v;
          document.getElementById('telefonoE').value = row.c[6].v;
          document.getElementById('actividadE').value = row.c[7].v;
          document.getElementById('nrcE').value = row.c[8].v;
          document.getElementById('correoE').value = row.c[9].v;
  
          // Salir del bucle porque ya encontramos el receptor
          break;
        }
      }
    } catch (error) {
      console.error('Error al obtener datos del receptor:', error);
    }
  }
  
  // Evento cuando se cambia el valor del campo de nombre del receptor
  document.getElementById('nombreE').addEventListener('change', function() {
    const nombreReceptor = this.value;
    obtenerDatosReceptor(nombreReceptor);
  });
  





document.addEventListener('DOMContentLoaded', function () {
const precioInputs = document.querySelectorAll('input[type="number"]');
precioInputs.forEach(input => {
input.addEventListener('input', calcularSumas);
});

function calcularSumas() {
let ivaTotal = 0;
let subTotal = 0;
let ivaRetenido = 0;
let ventasNoSujetas = 0;
let ventasExcentas = 0;

precioInputs.forEach(input => {
const precio = parseFloat(input.value);
if (!isNaN(precio)) {
subTotal += precio;
ivaTotal += precio * 0.13; // Calcula el 13% de IVA
}
});

ivaRetenido = subTotal * 0.10; // Calcula el 10% de IVA Retenido
ventasNoSujetas = subTotal * 0.05; // Calcula el 5% de Ventas no Sujetas
ventasExcentas = 0; // Puedes calcular esto según tu lógica

const ventaTotal = subTotal + ivaTotal - ivaRetenido;

document.getElementById('ivaTotal').textContent = `$${ivaTotal.toFixed(2)}`;
document.getElementById('subTotal').textContent = `$${subTotal.toFixed(2)}`;
document.getElementById('ivaRetenido').textContent = `$${ivaRetenido.toFixed(2)}`;
document.getElementById('ventasNoSujetas').textContent = `$${ventasNoSujetas.toFixed(2)}`;
document.getElementById('ventasExcentas').textContent = `$${ventasExcentas.toFixed(2)}`;
document.getElementById('ventaTotal').textContent = `$${ventaTotal.toFixed(2)}`;
}
});




////generar token 
function generarToken() {
  const nit = document.getElementById('nit2').value;
  const contrasena = document.getElementById('contrasena').value;
  const url = `https://apitest.dtes.mh.gob.sv/seguridad/auth?user=${nit}&pwd=${contrasena}`;

  axios.post(url)
      .then(response => {
          if (response.data && response.data.body && response.data.body.token) {
              const token = response.data.body.token;
              document.getElementById('token').value = token;

              // Guardar el token en localStorage
              let tokensGenerados = JSON.parse(localStorage.getItem('tokensGenerados')) || [];
              tokensGenerados.push(token);
              localStorage.setItem('tokensGenerados', JSON.stringify(tokensGenerados));

              // Enviar el token al backend para guardarlo en la base de datos
              axios.post('http://localhost:3000/api/tokens', { token })
                  .then(() => {
                      console.log('Token guardado en la base de datos');
                  })
                  .catch(error => {
                      console.error('Error al guardar el token en la base de datos:', error);
                  });
          } else {
              document.getElementById('token').value = 'Token no encontrado en la respuesta';
          }
      })
      .catch(error => {
          console.error('Error al generar el token:', error);
          document.getElementById('token').value = 'Error al generar el token';
      });
}

function mostrarHistorial() {
  window.location.href = 'htokens.html'; // Reemplaza con la ruta real a la vista de historial de tokens
}
