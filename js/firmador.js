async function obtenerDatosEmisor() {
    try {
        const response = await axios.get('http://localhost:3000/api/emisor');
        return response.data; 
    } catch (error) {
        console.error('Error al obtener datos del emisor:', error);
    }
}

async function obtenerDatosReceptor() {
    try {
        const response = await axios.get('http://localhost:3000/api/receptor');
        return response.data; 
    } catch (error) {
        console.error('Error al obtener datos del receptor:', error);
    }
}

async function actualizarFacturaElectronica() {
    const emisor = await obtenerDatosEmisor();
    const receptor = await obtenerDatosReceptor();

    if (!emisor || !receptor) {
        console.error('No se pudieron obtener los datos del emisor o receptor');
        return;
    }

    const numControl = await obtenerNumeroControl();
    const uuid = codigoUUID();
    const fechaEmision = obtenerFechaActual();
    const horaEmision = obtenerHoraActual();

    var data = {
        nit: "06141101171056",
        activo: true,
        passwordPri: "Am@z2Ll3rm0$ñ@",
        dteJson: {
            identificacion: {
                version: 1,
                ambiente: "00",
                tipoDte: "01",
                numeroControl: numControl,
                codigoGeneracion: uuid,
                tipoModelo: 1,
                tipoOperacion: 1,
                tipoContingencia: null,
                motivoContin: null,
                fecEmi: fechaEmision,
                horEmi: horaEmision,
                tipoMoneda: "USD"
            },
            documentoRelacionado: null,
            emisor: {
                nit: emisor.nit,
                nrc: emisor.nrc,
                nombre: emisor.nombre,
                codActividad: emisor.codActividad,
                descActividad: emisor.descActividad,
                nombreComercial: emisor.nombreComercial,
                tipoEstablecimiento: emisor.tipoEstablecimiento,
                direccion: {
                    departamento: emisor.departamento,
                    municipio: emisor.municipio,
                    complemento: emisor.complemento
                },
                telefono: emisor.telefono,
                codEstableMH: emisor.codEstableMH,
                codEstable: emisor.codEstable,
                codPuntoVentaMH: emisor.codPuntoVentaMH,
                codPuntoVenta: emisor.codPuntoVenta,
                correo: emisor.correo
            },
            receptor: {
                tipoDocumento: receptor.tipoDocumento,
                numDocumento: receptor.numDocumento,
                nrc: receptor.nrc,
                nombre: receptor.nombre,
                codActividad: receptor.codActividad,
                descActividad: receptor.descActividad,
                direccion: {
                    departamento: receptor.departamento,
                    municipio: receptor.municipio,
                    complemento: receptor.complemento
                },
                telefono: receptor.telefono,
                correo: receptor.correo
            },
            otrosDocumentos: null,
            ventaTercero: null,
            cuerpoDocumento: [
                {
                    numItem: 1,
                    tipoItem: 2,
                    numeroDocumento: null,
                    cantidad: 1,
                    codigo: null,
                    codTributo: null,
                    uniMedida: 99,
                    descripcion: "EMISIÓN DE CERTIFICADOS DE FIRMA ELECTRÓNICA 1",
                    precioUni: 100,
                    montoDescu: 0,
                    ventaNoSuj: 0,
                    ventaExenta: 0,
                    ventaGravada: 100,
                    tributos: null,
                    psv: 0,
                    noGravado: 5,
                    ivaItem: 11.50
                },
                {
                    numItem: 2,
                    tipoItem: 2,
                    numeroDocumento: null,
                    cantidad: 1,
                    codigo: null,
                    codTributo: null,
                    uniMedida: 99,
                    descripcion: "EMISIÓN DE CERTIFICADOS DE FIRMA ELECTRÓNICA 2",
                    precioUni: 25,
                    montoDescu: 25,
                    ventaNoSuj: 0,
                    ventaExenta: 0,
                    ventaGravada: 0,
                    tributos: null,
                    psv: 0,
                    noGravado: 0,
                    ivaItem: 0
                }
            ],
            resumen: {
                totalNoSuj: 0,
                totalExenta: 0,
                totalGravada: 100,
                subTotalVentas: 100,
                descuNoSuj: 0,
                descuExenta: 0,
                descuGravada: 0,
                porcentajeDescuento: 0,
                totalDescu: 25,
                tributos: null,
                subTotal: 100,
                ivaRete1: 0,
                reteRenta: 0,
                montoTotalOperacion: 100,
                totalNoGravado: 5,
                totalPagar: 105,
                totalLetras: "pendiente",
                totalIva: 11.50,
                saldoFavor: -500,
                condicionOperacion: 1,
                pagos: [
                    {
                        codigo: "01",
                        montoPago: 50,
                        referencia: null,
                        plazo: null,
                        periodo: null
                    },
                    {
                        codigo: "03",
                        montoPago: 25,
                        referencia: null,
                        plazo: null,
                        periodo: null
                    },
                    {
                        codigo: "99",
                        montoPago: 25,
                        referencia: null,
                        plazo: null,
                        periodo: null
                    }
                ],
                numPagoElectronico: null
            },
            extension: {
                nombEntrega: null,
                docuEntrega: null,
                nombRecibe: null,
                docuRecibe: null,
                observaciones: null,
                placaVehiculo: null
            },
            apendice: null
        }
    };

    console.log('Datos de la factura electrónica actualizados:', data);
}

async function obtenerNumeroControl(){
    try {
        let numControl = parseInt(codigo[0][0].match(/\d+$/)[0], 10);
        numControl++;
        const nuevoCodigo = `DTE-01-0001ONEC-000${numControl.toString().padStart(12, '0')}`;
        return nuevoCodigo;
    } catch (error) {
        console.error("Error:", error.message);
        return null;
    }
}

function codigoUUID(){
    const uuid = uuidv4();
    const codigo = uuid.toUpperCase();
    return codigo;
}

function obtenerFechaActual() {
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    return `${anio}-${mes}-${dia}`;
}

function obtenerHoraActual() {
    const fecha = new Date();
    const horas = String(fecha.getHours()).padStart(2, "0");
    const minutos = String(fecha.getMinutes()).padStart(2, "0");
    const segundos = String(fecha.getSeconds()).padStart(2, "0");
    return `${horas}:${minutos}:${segundos}`;
}



