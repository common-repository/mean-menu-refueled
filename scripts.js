document.addEventListener( "DOMContentLoaded", function() {
	var target = _MMF.target;

	if( !target ) {
		target = document.querySelector( "ul.menu" );
		target = target && target.parentElement;
	}

	MeanMenu( target, _MMF );
} );
