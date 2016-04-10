$(document).ready(function() {
	$.getJSON("/peliculas", function(data) {
		data = $(data).sort(ordenarNombres);

		$.each(data, function(clave, valor) {
			$("#pelicula").append("<option>" + valor.nombre + "</option>");
		});
	});

	function ordenarNombres(a, b) {
		return a.nombre.toLowerCase() > b.nombre.toLowerCase() ? 1 : -1;
	}
});