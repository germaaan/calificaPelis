// Dependencias
var pg = require("pg");
var connectionString = "postgres://calificador:calificador@localhost/calificaciones";

exports.crearPeliculas = function(req, res) {
    res.render("peliculas_get", {
        title: "CalificaPelis: Añadir película"
    });
};

exports.nuevasPeliculas = function(req, res) {
		console.log(req.body);

		/*
    var results = [];

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({
                success: false,
                data: err
            });
        }

        client.query("INSERT INTO peliculas (nombre, director, anio, genero) VALUES ($1, $2, $3, $4)", [req.params.nombre, req.params.director, req.params.anio, req.params.genero]);

        var query = client.query("SELECT * FROM peliculas");

        query.on('row', function(row) {
            results.push(row);
        });

        query.on('end', function() {
            done();

            res.json(results);
        });
    });
		*/

    res.render("peliculas_post", {
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
