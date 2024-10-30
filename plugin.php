<?php

/*
Plugin Name: Mean Menu Refueled
Plugin URI: https://planetjon.ca/projects/mean-menu-refueled/
Description: Make any menu suitable for mobile
Version: 1.3.1
Requires at least: 5.0.0
Tested up to: 5.8
Requires PHP: 5.4
Author: Jonathan Weatherhead
Author URI: https://planetjon.ca
License: GPL2
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

namespace planetjon\mean_menu_refueled;

$fields = [
	'target' => [ 'type' => 'text', 'label' => 'Menu target', 'description' => 'Where is target menu contained? Leave blank for auto-detection of parent of first ul.menu element', 'input_attrs' => [] ],
	'container' => [ 'type' => 'text', 'label' => 'Menu container', 'description' => 'Where should mean menu be anchored?', 'input_attrs' => [ 'placeholder' => 'body' ] ],
	'barColour' => [ 'type' => 'color', 'label' => 'Bar colour', 'description' => 'Background colour of the mean bar', 'default' => '#0c1923' ],
	'navColour' => [ 'type' => 'color', 'label' => 'Menu colour', 'description' => 'Background colour of the expanded menu', 'default' => '#0c1923' ],
	'menuClose' => [ 'type' => 'text', 'label' => 'Menu close', 'description' => 'Symbol shown to close the menu', 'input_attrs' => [ 'placeholder' => 'x' ] ],
	'menuOpen' => [ 'type' => 'text', 'label' => 'Menu open', 'description' => 'Symbol shown to open the menu', 'input_attrs' => [ 'placeholder' => '≡' ] ],
	'revealPosition' => [ 'type' => 'select', 'label' => 'Reveal position', 'description' => 'Position of the reveal', 'choices' => [ 'right' => 'right', 'center' => 'center', 'left' => 'left' ], 'default' => 'right' ],
	'revealPositionDistance' => [ 'type' => 'text', 'label' => 'Reveal position offset', 'description' => 'Offset of the reveal', 'input_attrs' => [ 'placeholder' => '0' ] ],
	'revealColour' => [ 'type' => 'color', 'label' => 'Reveal colour', 'description' => 'Background colour of the reveal', 'default' => 'none' ],
	'screenWidth' => [ 'type' => 'number', 'label' => 'Responsive threshold', 'description' => 'Threshold when menu is activated (pixels)', 'input_attrs' => [ 'placeholder' => '640' ] ],
	'navPush' => [ 'type' => 'text', 'label' => 'Nav push', 'description' => 'Vertical push when mobile menu is shown', 'input_attrs' => [ 'placeholder' => '0' ] ],
	'showChildren' => [ 'type' => 'checkbox', 'label' => 'Show children', 'description' => 'Include submenus', 'default' => true ],
	'expandableChildren' => [ 'type' => 'checkbox', 'label' => 'Expandable children', 'description' => 'Allow submenus to be expanded', 'default' => true ],
	'expand' => [ 'type' => 'text', 'label' => 'Submenu open', 'description' => 'Symbol to open the submenu', 'input_attrs' => [ 'placeholder' => '+' ] ],
	'contract' => [ 'type' => 'text', 'label' => 'Submenu close', 'description' => 'Symbol to close the submenu', 'input_attrs' => [ 'placeholder' => '-' ] ],
	'removeAttrs' => [ 'type' => 'checkbox', 'label' => 'Remove attributes', 'description' => 'Remove class and IDs from the original menu when in mobile' ],
	'removeElements' => [ 'type' => 'text', 'label' => 'Hide elements', 'description' => 'Hide these elements when in mobile', 'input_attrs' => [] ],
	'onePage' => [ 'type' => 'checkbox', 'label' => 'Single Page Site', 'description' => 'Check for single page sites' ],
	'display' => [ 'type' => 'text', 'label' => 'Container display', 'description' => 'How to render the menu container', 'input_attrs' => [ 'placeholder' => 'block' ] ]
];

add_action( 'customize_register', function( $wp_customize ) use ( $fields ) {
	$wp_customize->add_section( 'mean_menu_refueled_section', [
		'panel' => 'nav_menus',
		'title' => 'Mean Menu Refueled',
		'description' => 'make your navigation menu mobile responsive.',
	] );

	foreach( $fields as $field => $props ) {
		$wp_customize->add_setting( "mmf[{$field}]", [
			'type' => 'option',
			'default' => $props['default']
		] );
   
		switch( $props['type'] ) {
			case 'color':
			$control = new \WP_Customize_Color_Control( $wp_customize, "mmf[{$field}]", [ 'section' => 'mean_menu_refueled_section' ] + $props );
			break;

			default:
			$control = new \WP_Customize_Control( $wp_customize, "mmf[{$field}]", [ 'section' => 'mean_menu_refueled_section' ] + $props );
		}

		$wp_customize->add_control( $control );
	}
} );

add_action( 'wp_enqueue_scripts', function() {
	wp_enqueue_style( 'meanmenu.css', plugin_dir_url(  __FILE__ ) . 'vendor/meanMenu/meanmenu.min.css' );

	wp_enqueue_script( 'meanmenu.js', plugin_dir_url(  __FILE__ ) . 'vendor/meanMenu/meanmenu.min.js' );
	wp_enqueue_script( 'meanmenu-refueled.js', plugin_dir_url(  __FILE__ ) . 'scripts.js', ['meanmenu.js'] );

	wp_localize_script( 'meanmenu-refueled.js', '_MMF', buildJSConfig() );
} );

function buildJSConfig() {
	$meanCFG = get_option( 'mmf', [] );
	$jsCFG = [];

	$meanCFG['target'] && $jsCFG['target'] = $meanCFG['target'];	
	$meanCFG['container'] && $jsCFG['meanMenuContainer'] = $meanCFG['container'];
	$meanCFG['barColour'] && $jsCFG['meanBarColour'] = $meanCFG['barColour'];
	$meanCFG['navColour'] && $jsCFG['meanNavColour'] = $meanCFG['navColour'];
	$meanCFG['menuClose'] && $jsCFG['meanMenuClose'] = $meanCFG['menuClose'];
	$meanCFG['menuOpen'] && $jsCFG['meanMenuOpen'] = $meanCFG['menuOpen'];
	$meanCFG['revealPosition'] && $jsCFG['meanRevealPosition'] = $meanCFG['revealPosition'];
	$meanCFG['revealPositionDistance'] && $jsCFG['meanRevealPositionDistance'] = $meanCFG['revealPositionDistance'];
	$meanCFG['revealColour'] && $jsCFG['meanRevealColour'] = $meanCFG['revealColour'];
	$meanCFG['screenWidth'] && $jsCFG['meanScreenWidth'] = $meanCFG['screenWidth'];
	$meanCFG['navPush'] && $jsCFG['meanNavPush'] = $meanCFG['navPush'];
	$meanCFG['showChildren'] && $jsCFG['meanShowChildren'] = $meanCFG['showChildren'];
	$meanCFG['expandableChildren'] && $jsCFG['meanExpandableChildren'] = $meanCFG['expandableChildren'];
	$meanCFG['expand'] && $jsCFG['meanExpand'] = $meanCFG['expand'];
	$meanCFG['contract'] && $jsCFG['meanContract'] = $meanCFG['contract'];
	$meanCFG['removeAttrs'] && $jsCFG['meanRemoveAttrs'] = $meanCFG['removeAttrs'];
	$meanCFG['removeElements'] && $jsCFG['removeElements'] = $meanCFG['removeElements'];
	$meanCFG['onePage'] && $jsCFG['onePage'] = $meanCFG['onePage'];
	$meanCFG['display'] && $jsCFG['meanDisplay'] = $meanCFG['display'];

	return $jsCFG;
}
