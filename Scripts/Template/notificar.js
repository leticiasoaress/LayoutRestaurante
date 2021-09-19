function truncar(texto,limite){
	if(texto.length>limite){	
		limite--;
		last = texto.substr(limite-1,1);
		while(last!=' ' && limite > 0){
			limite--;
			last = texto.substr(limite-1,1);
		}
		last = texto.substr(limite-2,1);
		if(last == ',' || last == ';'  || last == ':'){
			 texto = texto.substr(0,limite-2) + '...';
		} else if(last == '.' || last == '?' || last == '!'){
			 texto = texto.substr(0,limite-1);
		} else {
			 texto = texto.substr(0,limite-1) + '...';
		}
	}
	return texto;
}
function notificar(img, titulo, texto, data){
    var texto_final = "";
    if(img != ""){
        img = '<img src='+img+' class="img-mini" style="width:70px">';
    }
    if(titulo != ""){
        titulo = '<h2>'+titulo+'</h2>';
    }
    if(texto != ""){
        var style='';
        if(texto.length < 63){
            style = 'style="line-height: 35px;"';
        }else if(texto.length > 110) {
            texto = truncar(texto,110);
        }
        texto = '<p '+style+'>'+texto+'</p>';
    }
    if(data != ""){
        data = '<div class="data">'+data+'</div>';
    }
    texto_final = '<div class="row"><div class="col-md-3">'+img+'</div><div class="col-md-9 aviso">'+titulo+texto+data+'</div></div>';
    noty({text: texto_final, modal: false, killer: false, layout: 'bottomRight', type: 'alert', timeout: 5000, closeWith:['button']});                                                 
}
function alertar(texto, tipo){
    noty({
        text: texto, 
        modal: false, 
        killer: false, 
        layout: 'topCenter', 
        type: tipo, 
        timeout: 3000,
        animation   : {
            open: 'animated slow bounceInDown', // Animate.css class names
            close: 'animated slow bounceOutUp', // Animate.css class names
        }
    });    
}