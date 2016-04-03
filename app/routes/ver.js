// Dependencias
var pg = require("pg");
var connectionString = "postgres://calificador:calificador@localhost/calificaciones";

// Obtener datos de todas las películas
exports.content = function(req, res) {
	var results = [];

	// Conectar con el cliente PostgreSQL
	pg.connect(connectionString, function(err, client, done) {
		if (err) {
			done();
			console.log(err);
			return res.status(500).json({
				success: false,
				data: err
			});
		}

		// Consulta de selección
		var query = client.query("SELECT * FROM peliculas");

		// Devolvemos los resultados de la consulta de selección
		query.on("row", function(row) {
			results.push(row);
		});

		// Cerramos la conexión y devolvemos los datos
		query.on("end", function() {
			done();

			res.render("ver", {
				title: "CalificaPelis: Ver críticas",
				data: results
			});
		});
	});
};
