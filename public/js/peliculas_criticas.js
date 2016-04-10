$(document).ready(function() {
	$.getJSON("/peliculas", function(data) {
		data = $(data).sort(ordenarPeliculas);

		$.each(data, function(clave, valor) {
			$("#pelicula").append("<option>" + valor.nombre + "</option>");
		});
	});

	function ordenarPeliculas(a, b) {
		return a.nombre.toLowerCase() > b.nombre.toLowerCase() ? 1 : -1;
	}
});