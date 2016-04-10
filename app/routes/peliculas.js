var pg = require("pg");
var db = require("./db");

// Sección "Consultar"
exports.peliculasDataForm = function(req, res) {
	res.render("peliculas_data_form", {
		titulo: "CalificaPelis: Consultar películas",
	});
};

// Sección "Añadir películas"
exports.peliculasInsertForm = function(req, res) {
	res.render("peliculas_insert_form", {
		titulo: "CalificaPelis: Añadir película"
	});
};

// Sección "Editar película"
exports.peliculasUpdateForm = function(req, res) {
	res.render("peliculas_update_form", {
		titulo: "CalificaPelis: Editar películas"
	});
};

// Inserta película en base de datos
exports.peliculasInsert = function(req, res) {
	pg.connect(db.connectionString, function(err, client, done) {
		if (err) {
			done();
			db.error(err, res, "Error: no se ha podido conectar a la base de datos.");
		}

		client.query("INSERT INTO peliculas (nombre, director, anio, genero) VALUES ($1, $2, $3, $4)", [req.body.nombre, req.body.director, req.body.anio, req.body.genero], function(err, result) {
			if (err) {
				done();
				db.error(err, res, "No se ha podido añadir la película introducida, posiblemente ya exista en la base de datos.");
			} else {
				done();

				res.render("peliculas_data", {
					titulo: "CalificaPelis: Añadir/actualizar película",
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

// Actualiza película en base de datos
exports.peliculasUpdate = function(req, res) {
	pg.connect(db.connectionString, function(err, client, done) {
		if (err) {
			done();
			db.error(err, res, "Error: no se ha podido conectar a la base de datos.");
		}

		client.query("UPDATE peliculas SET director=($1),anio=($2),genero=($3) WHERE nombre=($4)", [req.body.director.trim(), req.body.anio, req.body.genero.trim(), req.body.nombre.trim()], function(err, result) {
			if (err) {
				done();
				db.error(err, res, "No se ha podido actualizar la película introducida. Compruebe los datos introducidos.");
			} else {
				done();

				res.render("peliculas_data", {
					titulo: "CalificaPelis: Añadir/actualizar película",
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

// Devuelve el nombre de todas las películas en formato JSON
exports.peliculasNombres = function(req, res) {
	var results = [];

	pg.connect(db.connectionString, function(err, client, done) {
		if (err) {
			done();

			res.setHeader("Content-Type", "application/json");
			res.send({
				"nombre": "ERROR"
			});
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
exports.peliculasData = function(req, res) {
	var nombre = req.params.nombre.substr(1, req.params.nombre.length);
	var results = [];

	pg.connect(db.connectionString, function(err, client, done) {
		if (err) {
			done();

			res.setHeader("Content-Type", "application/json");
			res.send({
				"nombre": "ERROR",
				"director": "ERROR",
				"anio": -1,
				"genero": "ERROR"
			});
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