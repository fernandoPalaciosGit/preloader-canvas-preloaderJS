var arrImgPreloader = [
'img/10.jpg', 'img/9.png',
'img/2.jpg', 'img/1.png',
'img/3.jpg', 'img/2.png',
'img/4.jpg', 'img/3.png',
'img/5.jpg', 'img/4.png',
'img/6.jpg', 'img/5.png',
'img/7.jpg', 'img/6.png',
'img/8.jpg', 'img/7.png',
'img/8.png', 'img/9.jpg',
'img/family.JPG',
'img/IMG_20131208_152251.jpg',
'img/IMG_20131208_152319.jpg',
'img/IMG_20131208_152340.jpg',
'img/IMG_20131208_152355.jpg',
'img/IMG_20131208_152403.jpg',
'img/IMG_20131208_152419.jpg',
'img/IMG_20131208_152437.jpg',
'img/IMG_20140731_211843.jpg',
'img/IMG_20140731_211851.jpg',
'img/IMG_20140731_211923.jpg',
'img/IMG_20140731_211935.jpg',
'img/IMG_20140731_212005.jpg',
'img/IMG_20140731_212028.jpg',
'img/IMG_20140731_212036.jpg',
'img/IMG_20140731_212049.jpg'
];

var prepararCanvas = function (){
	var ctx = canvas.getContext('2d');

	// dibujar arco de preloader sobre el lienzo
	var	radio = ( canvas.width/2 ) - 16, //reducimos el radio para que se vea nuestro circulo
			posX = (canvas.width/2), // centrado del circulo
			posY = (canvas.height/2);		
	ctx.arc(posX, posY, radio, 0, 2*Math.PI, false);
	ctx.strokeStyle = 'gray';
	ctx.lineWidth = 8;
	ctx.stroke();

	//cargar imagenes sobre el lienzo
	cargar();
};

// para cargar todas las imagenes a traves de PreloaderJS
var cargar = function (){
	// vamos eliminando elementos del array y cargandolos en la pagina hasta que vaciemos el array
	while( arrImgPreloader.length > 0 ){
		// extraer un elemento desde el principio de la pila 
		var imagen = arrImgPreloader.shift();
		// cargar las imagenes y callback de eventos onProgress , onProgress
		preloader.loadFile(imagen);
	}
};

// controlar el progreso de carga de la imagen en el html
var progresoCarga = function (event){
	//dibujar graficamente el preloader sobre el lienzo
	var ctx = canvas.getContext('2d');
	ctx.beginPath();
	var	radio = ( canvas.width/2 ) - 16,
			posX = (canvas.width/2),
			posY = (canvas.height/2);

	// el arco que muestra la carga de la imagen es un trozo de radiovector.
	// igual al tamaño de carga : preloader.progress = decimal de la  carga : 0.0 -> 1.0
	var endAngle = preloader.progress * (2 * Math.PI);
	ctx.arc(posX, posY, radio, 0, endAngle, false);
	ctx.strokeStyle = '#fff';
	ctx.lineWidth = 8;
	ctx.stroke();

	//mostrar el porcentanje de carga
	var progresoEntero = parseInt( preloader.progress *100);

	// cuando lleguemos al final de la carga mostramos el wrapper de imagenes
	if ( progresoEntero === 100 ) {
		$('#porcentaje').text('listo');
		$('#wrapperImages').fadeIn();
		$('#canvasPreloader').fadeOut(1000);
		$('#porcentaje').fadeOut(1000);	
	} else {
		$('#porcentaje').text( progresoEntero + "%" );
	}

	/* Una vez que finaliza la carga de CADA IMAGEN ,
		PreloaderJS lanza el evento onFileLoad = cargaCompleta() */
};

//carga de cada imagen indi vidualmente
var cargaCompleta = function (event){
	$('#wrapperImages').append('<img src="'+event.src+'"/>')
};

(function (w, $, PreloadJS){
	////////////////
	// PreloadJS //
	////////////////
	//variables globales para reutilizar
	preloader = new PreloadJS();
	canvas = document.getElementById('canvasPreloader');

	//resetear las dimensiones de canvas al de CSS
	canvas.height = 200;
	canvas.width = 200;

	//pasamos la funcion de carga y progreso a los eventos de PreloaderJS
	// se ejecuta cada vez que preloader carga una imagen a traes de .loadFile()
	preloader.onFileLoad = cargaCompleta;
	preloader.onProgress = progresoCarga;

	//inicializar preloader
	prepararCanvas();
}(window, jQuery, PreloadJS));
