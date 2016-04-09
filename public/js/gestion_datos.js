$(document).ready(function() {
	$.getJSON("peliculas", function(data) {
		$.each(data, function(clave, valor) {
			$("#listado").append("<option>" + valor.nombre + "</option>");
		});

		cambiaInfoPelicula();
	});

	$("#listado").on("change", function() {
		cambiaInfoPelicula();
	});

	function cambiaInfoPelicula() {
		$.getJSON("peliculas/:" + $("#listado").val(), function(data) {
			$("#director").val(data[0].director);
			$("#anio").val(data[0].anio);
			$("#genero").val(data[0].genero);
		});
	}
});