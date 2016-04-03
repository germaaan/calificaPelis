DROP DATABASE IF EXISTS calificaciones;
CREATE DATABASE calificaciones;
\c calificaciones

CREATE TABLE peliculas(
  id SERIAL PRIMARY KEY,
  nombre CHAR(100) NOT NULL UNIQUE,
  director CHAR(50) NOT NULL,
  anio SMALLINT NOT NULL,
  genero CHAR(20) NOT NULL
);

CREATE TABLE criticas(
  pelicula SERIAL REFERENCES peliculas(id),
  usuario CHAR(50) NOT NULL,
  fecha TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  texto CHAR(500) NOT NULL,
  nota DECIMAL NOT NULL,
  PRIMARY KEY (pelicula, usuario, fecha),
  CHECK (nota >= 0 AND nota <= 10)
);

INSERT INTO peliculas (nombre, director, anio, genero) VALUES ('El padrino', 'Francis Ford Coppola', 1972, 'Drama');
INSERT INTO peliculas (nombre, director, anio, genero) VALUES ('El caballero oscuro', 'Christopher Nolan', 2008, 'Acción');
INSERT INTO peliculas (nombre, director, anio, genero) VALUES ('La lista de Schindler', 'Steven Spielberg', 1993, 'Drama');
INSERT INTO peliculas (nombre, director, anio, genero) VALUES ('El señor de los anillos: El retorno del rey', 'Peter Jackson', 2003, 'Aventura');
INSERT INTO peliculas (nombre, director, anio, genero) VALUES ('Origen', 'Christopher Nolan', 2010, 'Acción');

INSERT INTO criticas (pelicula, usuario, texto, nota) VALUES ((SELECT id FROM peliculas WHERE nombre = 'El padrino'), 'germaaan', 'Clásico.', 9.2);
INSERT INTO criticas (pelicula, usuario, texto, nota) VALUES ((SELECT id FROM peliculas WHERE nombre = 'El caballero oscuro'), 'germaaan', 'La mejor película de la saga.', 8.9);
INSERT INTO criticas (pelicula, usuario, texto, nota) VALUES ((SELECT id FROM peliculas WHERE nombre = 'Origen'), 'germaaan', 'Todavía me duele la cabeza de pensar.', 8.7);

DROP USER IF EXISTS calificador;
CREATE USER calificador WITH PASSWORD 'calificador';
GRANT ALL PRIVILEGES ON DATABASE calificaciones to calificador;
GRANT ALL PRIVILEGES ON TABLE peliculas TO calificador;
GRANT ALL PRIVILEGES ON TABLE criticas TO calificador;
