// Dependencias
var pg = require("pg");
var connectionString = "postgres://calificador:calificador@localhost/calificaciones";

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

			res.render("ver", {
				title: "CalificaPelis: Ver críticas",
				data: results
			});
		});
	});
};

exports.leer = function(req, res) {
	res.render("listado", {
		title: "CalificaPelis: Listado"
	});
};