function enviarEmisor() {
  const emisorData = {
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
  };

  fetch('http://localhost:3000/api/emisor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(emisorData)
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
    alert('Emisor registrado con éxito');
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error al registrar el emisor');
  });
}
