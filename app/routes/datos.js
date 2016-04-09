// Dependencias
var pg = require("pg");
var connectionString = "postgres://calificador:calificador@localhost/calificaciones";

exports.crearPeliculas = function(req, res) {
	res.render("peliculas", {
		title: "CalificaPelis: Añadir película"
	});
};

exports.crearCriticas = function(req, res) {
	res.render("criticas", {
		title: "CalificaPelis: Añadir crítica"
	});
};

exports.seleccionar = function(req, res) {
	var results = [];

	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			console.log(err);
			return res.status(500).json({
				success: false,
				data: err
			});
		}

		var query = client.query("SELECT nombre FROM peliculas");

		query.on("row", function(row) {
			results.push(row);
		});

		query.on("end", function() {
			done();

			res.render("datos", {
				title: "CalificaPelis: Ver críticas",
				data: results
			});
		});
	});
};

exports.nombresPeliculas = function(req, res) {
	var results = [];

	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			console.log(err);
			return res.status(500).json({
				success: false,
				data: err
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

exports.peliculas = function(req, res) {
	var nombre = req.params.nombre.substr(1, req.params.nombre.length);
	var results = [];

	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			console.log(err);
			return res.status(500).json({
				success: false,
				data: err
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

exports.criticas = function(req, res) {
	var pelicula = req.params.pelicula.substr(1, req.params.pelicula.length);
	console.log(pelicula);
	var results = [];

	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			console.log(err);
			return res.status(500).json({
				success: false,
				data: err
			});
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
