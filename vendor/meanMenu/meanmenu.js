function MeanMenu( target, conf = {} ) {
	const defaults = {
		meanMenuContainer: "body", // Choose where meanmenu will be placed within the HTML
		meanBarColour: "#0c1923", // override CSS colour for the bar background
		meanNavColour: "inherit", // override CSS colour for the menu background
		meanMenuClose: "x", // single character you want to represent the close menu button
		meanMenuOpen: "≡", // text/markup you want when menu is closed
		meanRevealPosition: "right", // left right or center positions
		meanRevealPositionDistance: "0", // Tweak the position of the menu
		meanRevealColour: "none", // override CSS colour for the reveal background
		meanScreenWidth: 640, // set the screen width px you want meanmenu to kick in at
		meanNavPush: false, // set a height here in px, em or % if you want to budge your layout now the navigation is missing.
		meanShowChildren: true, // true to show children in the menu, false to hide them
		meanExpandableChildren: true, // true to allow expand/collapse children
		meanExpand: "+", // single character you want to represent the expand for ULs
		meanContract: "-", // single character you want to represent the contract for ULs
		meanRemoveAttrs: false, // true to remove classes and IDs, false to keep them
		onePage: false, // set to true for one page sites
		removeElements: null, // set to hide page elements
		meanDisplay: "block" // override display method for table cell based layouts e.g. table-cell
	}
	
	const options = Object.assign( {}, defaults, conf )
	const meanMenu = target instanceof Element ? target : document.querySelector( target )
	const meanMenuContainer = document.querySelector( options.meanMenuContainer )
	const state = {
		menuOn: false,
		menuOpen: false
	}

	// set menu reveal placement
	function placeReveal( meanRevealPosition ) {
		let meanRevealPos
		switch( meanRevealPosition ) {
			case "right" :
			meanRevealPos = { right: options.meanRevealPositionDistance, left: "auto" }
			break

			case "left" :
			meanRevealPos = { left: options.meanRevealPositionDistance, right: "auto" }
			break

			case "center" :
			meanRevealPos = { left: 0, right: 0, marginLeft: "auto", marginRight: "auto" }
			break
		}

		return meanRevealPos
	}

	// set menu reveal glyph
	function toggleRevealVisual() {
		var toggler = meanMenuContainer.querySelector( ".mean-reveal" )
		var glyph = toggler.classList.contains( "mean-close" ) ? options.meanMenuClose : options.meanMenuOpen
		toggler.innerHTML = glyph
	}

	// re-instate original nav (and call this on window.width functions)
	function showMeanOriginal() {
		state.menuOn = false
		meanMenu.style.display = options.meanDisplay
		meanMenuContainer.classList.remove( "mean-container" )
		meanMenuContainer.querySelectorAll( ".mean-bar, .mean-push" ).forEach( function(e) {
			e.parentNode.removeChild(e)
		} )
		options.removeElements && document.querySelectorAll( options.removeElements ).forEach( function(e){ 
			e.classList.remove( "mean-remove" )
		} )
	}

	// navigation reveal
	function showMeanMenu() {
		state.menuOn = true
		const meanBarStyles = { backgroundColor: options.meanBarColour }
		const meanNavStyles = { backgroundColor: options.meanNavColour }
		const meanRevealStyles = Object.assign( {}, placeReveal( options.meanRevealPosition ), { backgroundColor: options.meanRevealColour } )
		
		meanMenuContainer.classList.add( "mean-container" )

		const meanBar = document.createElement( "div" )
		meanBar.classList.add( "mean-bar" )
		for( let s in meanBarStyles ) {
			meanBar.style[s] = meanBarStyles[s]
		}

		const meanReveal = document.createElement( "a" )
		meanReveal.setAttribute( "href", "#nav" )
		meanReveal.setAttribute( "title", "Toggle navigation" )
		meanReveal.className = "mean-reveal"
		for( let s in meanRevealStyles ) {
			meanReveal.style[s] = meanRevealStyles[s]
		}

		const meanNav = document.createElement( "nav" )
		meanNav.className = "mean-nav"
		for( let s in meanNavStyles ) {
			meanNav.style[s] = meanNavStyles[s]
		}

		// copy meanMenu navigation into .mean-nav
		meanNav.innerHTML = meanMenu.innerHTML

		meanBar.append( meanReveal, meanNav )
		meanMenuContainer.prepend( meanBar )
		
		// add classes for things that will be hidden when mean menu is displayed
		options.removeElements && document.querySelectorAll( options.removeElements ).forEach( function(e){ 
			e.classList.add( "mean-remove" )
		} )

		// remove all classes from EVERYTHING inside meanmenu nav
		options.meanRemoveAttrs && meanMenuContainer.querySelectorAll( "nav.mean-nav ul, nav.mean-nav ul *" ).each(function(e) {
			e.removeAttribute( "id" )
			e.className = ""
		} )

		// push in a holder div (this can be used if removal of nav is causing layout issues)
		if( options.meanNavPush ) {
			const meanNavPush = document.createElement( "div" )
			meanNavPush.className = "nav-push"
			meanNavPush.style = "height:" + options.meanNavPush
			meanMenu.parentNode.insertBefore( meanNavPush, meanMenu )
		}
		
		// hide current navigation
		meanMenu.style.display = "none"
		
		// hide mean-nav ul
		meanMenuContainer.querySelectorAll( ".mean-nav ul" ).forEach( function(e) {
			e.style.display = "none"
		} )
		
		// toggle, show, or hide sub nav
		meanMenuContainer.querySelectorAll( ".mean-nav ul ul" ).forEach( function(e) {
			if( options.meanShowChildren && options.meanExpandableChildren ) {
				if( !e.hasChildNodes() ) {
					return
				}

				const meanExpand = document.createElement( "a" )
				meanExpand.setAttribute( "href", "#nav" )
				meanExpand.setAttribute( "title", "Toggle submenu" )
				meanExpand.className = "mean-expand"
				meanExpand.innerHTML = options.meanExpand

				e.parentNode.append( meanExpand )
			}
			else {
				e.style.display = options.meanShowChildren ? "inline" : "none"
			}
		} )
	}

	function applyMean() {
		var currentWidth = window.innerWidth || document.documentElement.clientWidth

		if( currentWidth <= options.meanScreenWidth && !state.menuOn ) {
			showMeanMenu()
			toggleRevealVisual()
		}
		else if( currentWidth > options.meanScreenWidth && state.menuOn ) {
			showMeanOriginal()
		}
	}

	// for one page websites, reset all variables...
	function meanSinglePageClick() {
		state.menuOpen = false
		meanMenuContainer.querySelector( ".mean-nav ul" ).style.display = "none"
		meanMenuContainer.querySelector( ".mean-reveal" ).classList.toggle( "mean-close" )
		toggleRevealVisual()
	}

	options.onePage && meanMenuContainer.querySelectorAll( ".mean-nav ul > li > a:first-child" ).forEach( function(e) {
		e.addEventListener( "click", meanSinglePageClick )
	} )

	// defer menu expansion
	meanMenuContainer.addEventListener( "click", function(e) {
		if( !e.target.matches(".mean-reveal") ) {
			return
		}

		e.preventDefault()

		state.menuOpen = !state.menuOpen
		const meanNav = meanMenuContainer.querySelector( ".mean-nav ul" )
		const display = meanNav.style.display === "block" ? "none" : "block"
		meanNav.style.display = display
		meanMenuContainer.querySelector( ".mean-reveal" ).classList.toggle( "mean-close" )
		toggleRevealVisual()
	} )

	// defer submenu expansion
	meanMenuContainer.addEventListener( "click", function(e) {
		if( !e.target.matches(".mean-expand") ) {
			return
		}

		e.preventDefault()

		const closing = e.target.classList.contains( "mean-clicked" )
		const previousSiblingDisplay = e.target.previousElementSibling.style.display

		e.target.classList.toggle( "mean-clicked" )
		e.target.innerHTML = closing ? options.meanExpand : options.meanContract
		e.target.previousElementSibling.style.display = previousSiblingDisplay === "block" ? "none" : "block"
	} )

	window.addEventListener( "resize", function(e) {
		applyMean()
	} )

	applyMean()
}
