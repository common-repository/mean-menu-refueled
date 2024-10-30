=== Mean Menu Refueled ===
Contributors: jweathe
Tags: mobile,responsive,menu,navigation
Donate link: https://planetjon.ca
Requires at least: 5.0
Tested up to: 5.8
Requires PHP: 5.4
Stable tag: 1.3.1
License: GPL2
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Make your site navigation menu mobile-ready.

== Description ==
Make your site navigation menu mobile-ready. When the threshold is reached, the targeted menu will collapse into a hamburger menu.

This plugin is a zero-dependency refresh on Mean Theme's MeanMenu plugin. This means that it does not require jQuery.

Image by [Gerd Altmann](https://pixabay.com/users/geralt-9301/?utm_source=link-attribution) from Pixabay.

== How To Use ==
The Mean Menu is configured with the WordPress Customizer in the menu section, and there are several options for customization.

- **Menu target** A CSS selector to the closest container where the menu resides. Leave blank for an attempt at auto-detection with ul.menu (The WP default).
- **Menu anchor** A CSS selector to the container where the mean menu will reside. If you're unsure, try `body`.
- **Bar colour** The background colour of the mean menu bar.
- **Menu colour** The background colour of the expanded mean menu.
- **Menu close** The symbol that will be used when the menu is expanded. This can be any unicode character or HTML entity.
- **Menu open** The symbol that will be used when the menu is collapsed. This can be any unicode character or HTML entity.
- **Reveal position** The justification of the mean menu state symbol.
- **Reveal position offset** Horizontal offset applied to the mean menu state symbol. This is intelligently applied depending on the justification, and has no effect when centered.
- **Reveal colour** The background colour of the mean menu state symbol.
- **Responsive threshold** The viewport threshold of when the mean menu replaced the standard menu.
- **Nav push** Vertical offset applied to the expanded component of the mean menu.
- **Show children** Check this to include nested levels in the mean menu.
- **Expandable children** Check this to allow nested levels to be expanded and collapsed. Otherwise, nested levels will be displayed by default.
- **Submenu open** Requires expandable children. The symbol that will be used when menu children are collapsed.
- **Submenu close** Requires expandable children.  The symbol that will be used when menu children are expanded.
- **Remove attributes** Remove classes and IDs from all elements of the default menu while the mean menu is active.
- **Hide elements** A CSS selector to any elements that should be hidden while the mean menu is active.
- **Single Page Site** Collapses the mean menu when a menu item is clicked.
- **Container display** The CSS display type of the mean menu container. inline, block, flex, etc

== Installation ==
Simply upload the zip using the Add New Plugin feature within WordPress admin as per usual.

== Frequently Asked Questions ==

= Can I target more than one menu =

Mean Menu Refueled currently supports only one configuration and is intended to be applied to the primary menu.

== Screenshots ==
1. The collapsed menu on viewports smaller than the activation threshold.
2. The expanded menu to the first level.
3. The expanded menu with a second level expanded.
4. Finding the Mean Menu in the menu section of the Customizer.
5. Mean Menu options (1 of 4)
6. Mean Menu options (2 of 4)
7. Mean Menu options (3 of 4)
8. Mean Menu options (4 of 4)


== Changelog ==

= 1.3 =
* Mean Menu now adapts to window resize
* Corrected some configuration text labels

= 1.2 =
* Automatic menu detection as a feature
