function mostrarCampos() {
  var tipoDocumento = document.getElementById("tipoDocumento").value;
  var selectDiv = document.getElementById("tipoDocumentoSelectDiv");
  var camposEmisor = document.getElementById("camposEmisor");
  var camposReceptor = document.getElementById("camposReceptor");
  var camposToken = document.getElementById("camposToken"); // Nuevo: Obtener el div de tokens
  var opcionesBtn = document.getElementById("opcionesBtn");
  var emisorLink = document.getElementById("emisorLink");
  var camposDescripcion = document.getElementById("camposDescripcion"); // Nuevo: Obtener el div de descripción

  // Ocultar los campos de tokens al cambiar de vista
  camposToken.style.display = "none";

  // Ocultar los campos de descripción al cambiar de vista
  camposDescripcion.style.display = "none";

  if (tipoDocumento == "1") {
    camposEmisor.style.display = "block";
    selectDiv.style.display = "none";
    camposReceptor.style.display = "none";
    opcionesBtn.style.display = "none";
    emisorLink.classList.add("disabled");
  } else {
    camposEmisor.style.display = "none";
    selectDiv.style.display = "block";
    camposReceptor.style.display = "none";
    opcionesBtn.style.display = "block";
    emisorLink.classList.remove("disabled");
  }
}

// Función para mostrar el select y ocultar los campos del emisor al hacer clic en el enlace "Tipo de Documento"
document
  .getElementById("tipoDocumentoLink")
  .addEventListener("click", function (event) {
    event.preventDefault();

    var selectDiv = document.getElementById("tipoDocumentoSelectDiv");
    var camposEmisor = document.getElementById("camposEmisor");
    var camposReceptor = document.getElementById("camposReceptor");
    var camposToken = document.getElementById("camposToken"); // Nuevo: Obtener el div de tokens
    var opcionesBtn = document.getElementById("opcionesBtn");
    var emisorLink = document.getElementById("emisorLink");
    var camposDescripcion = document.getElementById("camposDescripcion"); // Nuevo: Obtener el div de descripción

    // Ocultar los campos de tokens al cambiar de vista
    camposToken.style.display = "none";

    // Ocultar los campos de descripción al cambiar de vista
    camposDescripcion.style.display = "none";

    selectDiv.style.display = "block";
    camposEmisor.style.display = "none";
    camposReceptor.style.display = "none";
    opcionesBtn.style.display = "block";
    emisorLink.classList.remove("disabled"); // En caso de que se esté mostrando el emisor y se haga clic en Tipo de Documento, quitamos la clase 'disabled'
  });

// Función para mostrar los campos del Receptor al hacer clic en el enlace "Receptor"
document
  .getElementById("receptorLink")
  .addEventListener("click", function (event) {
    event.preventDefault();

    var selectDiv = document.getElementById("tipoDocumentoSelectDiv");
    var camposEmisor = document.getElementById("camposEmisor");
    var camposReceptor = document.getElementById("camposReceptor");
    var camposToken = document.getElementById("camposToken"); // Nuevo: Obtener el div de tokens
    var opcionesBtn = document.getElementById("opcionesBtn");
    var emisorLink = document.getElementById("emisorLink");
    var camposDescripcion = document.getElementById("camposDescripcion"); // Nuevo: Obtener el div de descripción

    // Ocultar los campos de tokens al cambiar de vista
    camposToken.style.display = "none";

    // Ocultar los campos de descripción al cambiar de vista
    camposDescripcion.style.display = "none";

    selectDiv.style.display = "none";
    camposEmisor.style.display = "none";
    camposReceptor.style.display = "block";
    opcionesBtn.style.display = "none";
    emisorLink.classList.remove("disabled"); // En caso de que se esté mostrando el emisor y se haga clic en Receptor, quitamos la clase 'disabled'
  });

// Función para mostrar los datos de tokens al hacer clic en el enlace "Tokens"
document.getElementById("Tokens").addEventListener("click", function (event) {
  event.preventDefault();

  var camposToken = document.getElementById("camposToken");
  var selectDiv = document.getElementById("tipoDocumentoSelectDiv");
  var camposEmisor = document.getElementById("camposEmisor");
  var camposReceptor = document.getElementById("camposReceptor");
  var opcionesBtn = document.getElementById("opcionesBtn");
  var emisorLink = document.getElementById("emisorLink");
  var camposDescripcion = document.getElementById("camposDescripcion"); // Nuevo: Obtener el div de descripción

  // Mostrar los campos de tokens
  camposToken.style.display = "block";

  // Ocultar los campos de descripción al mostrar los datos de tokens
  camposDescripcion.style.display = "none";

  // Ocultar los campos de emisor y receptor al mostrar los datos de tokens
  camposEmisor.style.display = "none";
  camposReceptor.style.display = "none";

  // Ocultar otras vistas al mostrar los datos de tokens
  selectDiv.style.display = "none";
  opcionesBtn.style.display = "none";
  emisorLink.classList.remove("disabled"); // En caso de que se esté mostrando el emisor y se haga clic en Tokens, quitamos la clase 'disabled'
});

// Función para mostrar los campos de descripción al hacer clic en el enlace "Descripción"
document
  .getElementById("descripcionLink")
  .addEventListener("click", function (event) {
    event.preventDefault();

    var camposDescripcion = document.getElementById("camposDescripcion");
    var selectDiv = document.getElementById("tipoDocumentoSelectDiv");
    var camposEmisor = document.getElementById("camposEmisor");
    var camposReceptor = document.getElementById("camposReceptor");
    var camposToken = document.getElementById("camposToken");
    var opcionesBtn = document.getElementById("opcionesBtn");
    var emisorLink = document.getElementById("emisorLink");

    // Mostrar los campos de descripción
    camposDescripcion.style.display = "block";

    // Ocultar los campos de emisor, receptor y tokens al mostrar los campos de descripción
    camposEmisor.style.display = "none";
    camposReceptor.style.display = "none";
    camposToken.style.display = "none";

    // Ocultar otras vistas al mostrar los campos de descripción
    selectDiv.style.display = "none";
    opcionesBtn.style.display = "none";
    emisorLink.classList.remove("disabled"); // En caso de que se esté mostrando el emisor y se haga clic en Descripción, quitamos la clase 'disabled'
  });

/// no te olvides de comentar todo lo que se haga que aveces la cagas
// Función para limpiar todos los campos del formulario
// Función para limpiar los campos de una vista específica
// Obtener referencias a los elementos relevantes
const camposEmisor = document.getElementById("camposEmisor");
const camposReceptor = document.getElementById("camposReceptor");
const camposToken = document.getElementById("camposToken");
const camposDescripcion = document.getElementById("camposDescripcion");

// Inicializar el índice de la vista actual
let vistaActual = 0;

// Función para actualizar la visibilidad de los campos según la vista actual
function actualizarVisibilidad() {
  switch (vistaActual) {
    case 0:
      camposEmisor.style.display = "block";
      camposReceptor.style.display = "none";
      camposToken.style.display = "none";
      camposDescripcion.style.display = "none";
      break;
    case 1:
      camposEmisor.style.display = "none";
      camposReceptor.style.display = "block";
      camposToken.style.display = "none";
      camposDescripcion.style.display = "none";
      break;
    case 2:
      camposEmisor.style.display = "none";
      camposReceptor.style.display = "none";
      camposToken.style.display = "block";
      camposDescripcion.style.display = "none";
      break;
    case 3:
      camposEmisor.style.display = "none";
      camposReceptor.style.display = "none";
      camposToken.style.display = "none";
      camposDescripcion.style.display = "block";
      break;
    default:
      break;
  }
}

// Event listener para el botón "Vista Anterior"
document.getElementById("anteriorBtn").addEventListener("click", () => {
  vistaActual = Math.max(vistaActual - 1, 0);
  actualizarVisibilidad();
});

// Event listener para el botón "Siguiente"
document.getElementById("siguienteBtn").addEventListener("click", () => {
  vistaActual = Math.min(vistaActual + 1, 3);
  actualizarVisibilidad();
});

// Llamar a la función para establecer la visibilidad inicial
mostrarCampos();








/// mas validaciones ricas ñam ñam

// Función para limpiar los campos de una vista específica
function limpiarCamposVista(vista) {
  switch (vista) {
    case 0:
      // Limpiar campos de la vista de emisor
      document.getElementById("inputNombre").value = "";
      document.getElementById("nombreComercial").value = "";
      document.getElementById("selectNit").selectedIndex = 0;
      document.getElementById("selectMunicipio").selectedIndex = 0;
      document.getElementById("selectDepartamento").selectedIndex = 0;
      document.getElementById("complemento").selectedIndex = 0;
      document.getElementById("telefono").value = "";
      document.getElementById("selectTipoDocumento").selectedIndex = 0;
      document.getElementById("nrc").value = "";
      document.getElementById("correo").value = "";
      break;
    case 1:
      // Limpiar campos de la vista de receptor
      document.getElementById("inputPassword").value = "";
      document.getElementById("nombreComercial").value = "";
      document.getElementById("select").selectedIndex = 0;
      document.getElementById("selectMunicipio").selectedIndex = 0;
      document.getElementById("selectDepartamento").selectedIndex = 0;
      document.getElementById("complemento").selectedIndex = 0;
      document.getElementById("telefono").value = "";
      document.getElementById("selectTipoDocumento").selectedIndex = 0;
      document.getElementById("nrc").value = "";
      document.getElementById("correo").value = "";
      break;
    case 2:
      // Limpiar campos de la vista de tokens
      document.getElementById("nit").value = "";
      document.getElementById("contrasena").value = "";
      document.getElementById("comentarios").value = "";
      break;
    case 3:
      // Limpiar campos de la vista de descripción (si es necesario)
      // No hay campos específicos para limpiar en esta vista según el código proporcionado
      break;
    default:
      break;
  }
}

// Función para limpiar todos los campos del formulario
function limpiarTodosLosCampos() {
  limpiarCamposVista(0); // Limpiar campos de la vista de emisor
  limpiarCamposVista(1); // Limpiar campos de la vista de receptor
  limpiarCamposVista(2); // Limpiar campos de la vista de tokens
  // No es necesario limpiar campos de la vista de descripción ya que no hay campos específicos definidos en el código proporcionado
}

// Event listener para el botón "Limpiar Campos"
document.getElementById("limpiarBtn").addEventListener("click", limpiarTodosLosCampos);




//////kokoko gallo 

// Función para mostrar los campos del Emisor al hacer clic en el enlace "Emisor"
document.getElementById("emisorLink").addEventListener("click", function (event) {
  event.preventDefault();

  var selectDiv = document.getElementById("tipoDocumentoSelectDiv");
  var camposEmisor = document.getElementById("camposEmisor");
  var camposReceptor = document.getElementById("camposReceptor");
  var camposToken = document.getElementById("camposToken");
  var camposDescripcion = document.getElementById("camposDescripcion");
  var opcionesBtn = document.getElementById("opcionesBtn");

  // Ocultar los campos de tokens al cambiar de vista
  camposToken.style.display = "none";

  // Ocultar los campos de descripción al cambiar de vista
  camposDescripcion.style.display = "none";

  // Mostrar los campos del emisor y ocultar otros
  selectDiv.style.display = "none";
  camposEmisor.style.display = "block";
  camposReceptor.style.display = "none";
  opcionesBtn.style.display = "none";
});





// GET DATOS EMISOR
// Función para obtener los datos del emisor desde Google Sheets
// Función para limpiar el JSON eliminando cualquier contenido no deseado
function limpiarJSON(jsonString) {
  const cleanedString = jsonString.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, ''); // Eliminar comentarios
  const jsonContent = cleanedString.match(/(?<=google\.visualization\.Query\.setResponse\()(.*)(?=\);)/s); // Extraer el contenido JSON entre google.visualization.Query.setResponse() y );
  
  if (jsonContent) {
    return jsonContent[0];
  } else {
    throw new Error('Error al limpiar el JSON: no se encontró contenido JSON válido');
  }
}

// Función para obtener los datos del emisor desde Google Sheets
async function obtenerDatosEmisor(nombreEmisor) {
  try {
    // Obtener la respuesta de Google Sheets
    const response = await fetch('https://docs.google.com/spreadsheets/d/1g_CM6AXmiNrpx0TVHW5TXycjD5TxlqAMRpfu9Ji2pFM/gviz/tq?tqx=out:json&gid=0');
    const data = await response.text();

    // Limpiar el JSON eliminando cualquier contenido no deseado (como comentarios)
    const cleanedData = limpiarJSON(data);

    // Analizar el JSON ahora válido
    const jsonData = JSON.parse(cleanedData);

    // Acceder a los datos necesarios
    const rows = jsonData.table.rows;

    // Buscar el emisor por nombre en los datos obtenidos
    for (const row of rows) {
      const emisorNombre = row.c[0].v; // Suponiendo que el nombre está en la primera columna

      if (emisorNombre === nombreEmisor) {
        // Llenar los campos del formulario con los datos del emisor encontrado
        document.getElementById('nombreComercial').value = row.c[1].v;
        document.getElementById('actividad').value = row.c[2].v;
        document.getElementById('municipio').value = row.c[3].v;
        document.getElementById('departamento').value = row.c[4].v;
        document.getElementById('complemento').value = row.c[5].v;
        document.getElementById('telefono').value = row.c[6].v;
        document.getElementById('nit').value = row.c[7].v;
        document.getElementById('nrc').value = row.c[8].v;
        document.getElementById('correo').value = row.c[9].v;

        // Salir del bucle porque ya encontramos el emisor
        break;
      }
    }
  } catch (error) {
    console.error('Error al obtener datos del emisor:', error);
  }
}

// Evento cuando se cambia el valor del campo de nombre del emisor
document.getElementById('nombre').onchange = function() {
  const nombreEmisor = this.value;
  obtenerDatosEmisor(nombreEmisor);
};






