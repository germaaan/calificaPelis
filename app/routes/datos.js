var pg = require("pg");
var connectionString = "postgres://calificador:calificador@localhost/calificaciones";

// Sección "Consultar"
exports.consultar = function(req, res) {
	res.render("consultar", {
		titulo: "CalificaPelis: Consultar",
	});
};

// Sección "Añadir películas"
exports.crearPeliculas = function(req, res) {
	res.render("peliculas_get", {
		titulo: "CalificaPelis: Añadir película"
	});
};

// Sección "Hacer críticas"
exports.crearCriticas = function(req, res) {
	res.render("criticas_get", {
		titulo: "CalificaPelis: Añadir crítica"
	});
};

// Inserta película en base de datos
exports.nuevasPeliculas = function(req, res) {
	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			error(err, res, "Error: no se ha podido conectar a la base de datos.");
		}

		client.query("INSERT INTO peliculas (nombre, director, anio, genero) VALUES ($1, $2, $3, $4)", [req.body.nombre, req.body.director, req.body.anio, req.body.genero], function(err, result) {
			if (err) {
				done();
				error(err, res, "No se ha podido añadir la película introducida, posiblemente ya exista en la base de datos.");
			} else {
				done();

				res.render("peliculas_post", {
					titulo: "CalificaPelis: Añadir película",
					datos: {
						"nombre": req.body.nombre,
						"director": req.body.director,
						"anio": req.body.anio,
						"genero": req.body.genero
					}
				});
			}
		});
	});
};

// Inserta crítica en base de datos
exports.nuevasCriticas = function(req, res) {
	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			error(err, res, "Error: no se ha podido conectar a la base de datos.");
		}

		client.query("INSERT INTO criticas (pelicula, usuario, texto, nota) VALUES ((SELECT id FROM peliculas WHERE nombre = $1), $2, $3, $4)", [req.body.pelicula, req.body.usuario, req.body.texto, req.body.nota], function(err, result) {
			if (err) {
				done();
				error(err, res, "No se ha podido añadir la crítica introducida. Compruebe los datos introducidos.");
			} else {
				done();

				res.render("criticas_post", {
					titulo: "CalificaPelis: Añadir crítica",
					datos: {
						"pelicula": req.body.pelicula,
						"usuario": req.body.usuario,
						"texto": req.body.texto,
						"nota": req.body.nota
					}
				});
			}
		});
	});
};

// Devuelve el nombre de todas las películas en formato JSON
exports.nombresPeliculas = function(req, res) {
	var results = [];

	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			error(err, res, "Error: no se ha podido conectar a la base de datos.");
		}

		var query = client.query("SELECT nombre FROM peliculas");

		query.on("row", function(row) {
			results.push(row);
		});

		query.on("end", function() {
			done();

			res.setHeader("Content-Type", "application/json");
			res.send(results);
		});
	});
};

// Devuelve los datos de una película en formato JSON
exports.datosPeliculas = function(req, res) {
	var nombre = req.params.nombre.substr(1, req.params.nombre.length);
	var results = [];

	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			error(err, res, "Error: no se ha podido conectar a la base de datos.");
		}

		var query = client.query("SELECT nombre, director, anio, genero FROM peliculas WHERE nombre=$1", [nombre]);

		query.on("row", function(row) {
			results.push(row);
		});

		query.on("end", function() {
			done();

			res.setHeader("Content-Type", "application/json");
			res.send(results);
		});
	});
};

// Devuelve las críticas de una película en formato JSON
exports.datosCriticas = function(req, res) {
	var pelicula = req.params.pelicula.substr(1, req.params.pelicula.length);
	var results = [];

	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			error(err, res, "Error: no se ha podido conectar a la base de datos.");
		}

		var query = client.query("SELECT peliculas.nombre, criticas.usuario, criticas.fecha, criticas.texto, criticas.nota FROM peliculas INNER JOIN criticas ON peliculas.id=criticas.pelicula WHERE peliculas.nombre=$1", [pelicula]);

		query.on("row", function(row) {
			results.push(row);
		});

		query.on("end", function() {
			done();

			res.setHeader("Content-Type", "application/json");
			res.send(results);
		});
	});
};

// Manejador de errores
function error(err, res, mensaje) {
	console.log(err);
	res.status(500);
	res.render("error", {
		mensaje: mensaje
	});
}