const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

//lo del cifraddo de contraseña
const bcrypt = require('bcrypt');
const saltRounds = 10;


const app = express();
const port = 3000;

app.use(cors());  // Habilita CORS para todas las rutas
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Factura'
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    throw err;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta para registrar un usuario
app.post('/api/usuarios', (req, res) => {
  const { usuario, correo, contrasenia } = req.body;

  if (!usuario || !correo || !contrasenia) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  // Cifrar la contraseña
  bcrypt.hash(contrasenia, saltRounds, (err, hash) => {
    if (err) {
      console.error('Error al cifrar la contraseña:', err);
      return res.status(500).send('Error al registrar el usuario');
    }

    const sql = 'INSERT INTO login (usuario, correo, contrasenia) VALUES (?, ?, ?)';
    db.query(sql, [usuario, correo, hash], (err, result) => {
      if (err) {
        console.error('Error al registrar el usuario:', err);
        return res.status(500).send('Error al registrar el usuario');
      }
      res.send('Usuario registrado correctamente');
    });
  });
});

// Ruta Para verificar un usuario
app.post('/api/login', (req, res) => {
  const { usuario, contrasenia } = req.body;

  if (!usuario || !contrasenia) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  const sql = 'SELECT * FROM login WHERE usuario = ?';
  db.query(sql, [usuario], (err, results) => {
    if (err) {
      console.error('Error al autenticar el usuario:', err);
      return res.status(500).send('Error al autenticar el usuario');
    }

    if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(contrasenia, user.contrasenia, (err, isMatch) => {
        if (err) {
          console.error('Error al comparar la contraseña:', err);
          return res.status(500).send('Error al autenticar el usuario');
        }

        if (isMatch) {
          res.send('Autenticación exitosa');
        } else {
          res.status(401).send('Credenciales incorrectas');
        }
      });
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  });
});

// Ruta para insertar un emisor
app.post('/api/emisores', (req, res) => {
  const { nombre, nombreComercial, actividad, municipio, departamento, complemento, telefono, nit, nrc, correo } = req.body;

  // Verificar que todos los campos estén presentes
  if (!nombre || !nombreComercial || !actividad || !municipio || !departamento || !complemento || !telefono || !nit || !nrc || !correo) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  const sql = 'INSERT INTO Emisor (nombre, nombreComercial, actividad, municipio, departamento, complemento, telefono, nit, nrc, correo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [nombre, nombreComercial, actividad, municipio, departamento, complemento, telefono, nit, nrc, correo], (err, result) => {
    if (err) {
      console.error('Error al registrar el emisor:', err);
      return res.status(500).send('Error al registrar el emisor');
    }
    res.send('Emisor registrado correctamente');
  });
});

// Ruta para insertar un receptor
app.post('/api/receptores', (req, res) => {
    const { nombre, numeroDocumento, tipoDocumento, municipio, departamento, complemento, telefono, actividad, nrc, correo } = req.body;
  
    // Verificar que todos los campos estén presentes
    if (!nombre || !numeroDocumento || !tipoDocumento || !municipio || !departamento || !telefono || !actividad || !nrc || !correo) {
      return res.status(400).send('Todos los campos son obligatorios');
    }
  
    const sql = 'INSERT INTO Receptor (nombre, numeroDocumento, tipoDocumento, municipio, departamento, complemento, telefono, actividad, nrc, correo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [nombre, numeroDocumento, tipoDocumento, municipio, departamento, complemento, telefono, actividad, nrc, correo], (err, result) => {
      if (err) {
        console.error('Error al registrar el receptor:', err);
        return res.status(500).send('Error al registrar el receptor');
      }
      res.send('Receptor registrado correctamente');
    });
  });


// Ruta para guardar el token
app.post('/api/tokens', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: 'Token es requerido' });
  }

  const query = 'INSERT INTO Tokens (token) VALUES (?)';
  db.query(query, [token], (error, results) => { 
    if (error) {
      console.error('Error al guardar el token:', error);
      return res.status(500).json({ error: 'Error al guardar el token' });
    }
    res.status(200).json({ message: 'Token guardado exitosamente' });
  });
});


// Ruta de ejemplo para probar la conexión
app.get('/api/emisores', (req, res) => {
  const sql = 'SELECT * FROM Emisor';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener los emisores:', err);
      throw err;
    }
    res.send(results);
  });
});

app.listen(port, () => {
  console.log('Servidor corriendo en el puerto$',{port});
});



// Ruta para insertar datos de la descripción volvi =(
  app.post('/api/descripcion', (req, res) => {
    const { cantidad1, descripcion1, precioUnitario1, ventasNoSujetas1, ventasExentas1, ventasAfectadas1, total1,
            cantidad2, descripcion2, precioUnitario2, ventasNoSujetas2, ventasExentas2, ventasAfectadas2, total2 } = req.body;

    if (!cantidad1 || !descripcion1 || !precioUnitario1 || !ventasNoSujetas1 || !ventasExentas1 || !ventasAfectadas1 || !total1 ||
        !cantidad2 || !descripcion2 || !precioUnitario2 || !ventasNoSujetas2 || !ventasExentas2 || !ventasAfectadas2 || !total2) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const sql = 'INSERT INTO Descripcion (cantidad, descripcion, precioUnitario, ventasNoSujetas, ventasExentas, ventasAfectadas, total) VALUES ?';
    const values = [
        [cantidad1, descripcion1, precioUnitario1, ventasNoSujetas1, ventasExentas1, ventasAfectadas1, total1],
        [cantidad2, descripcion2, precioUnitario2, ventasNoSujetas2, ventasExentas2, ventasAfectadas2, total2]
    ];

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error('Error al insertar la descripción:', err);
            return res.status(500).json({ error: 'Error al insertar la descripción' });
        }
        res.status(200).json({ message: 'Descripción insertada correctamente' });
    });
});