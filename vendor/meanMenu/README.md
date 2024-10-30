MeanMenu v3.1.2
===========

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

THIS SOFTWARE AND DOCUMENTATION IS PROVIDED "AS IS," AND COPYRIGHT
HOLDERS MAKE NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY OR
FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE SOFTWARE
OR DOCUMENTATION WILL NOT INFRINGE ANY THIRD PARTY PATENTS,
COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.COPYRIGHT HOLDERS WILL NOT
BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL OR CONSEQUENTIAL
DAMAGES ARISING OUT OF ANY USE OF THE SOFTWARE OR DOCUMENTATION.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://gnu.org/licenses/>.

A menu system for converting a standard menu into a mobile/tablet responsive menu, media query independent.

Just include this file (meanmenu.js)

in your HTML e.g.

    <script src="meanmenu.js"></script>

Then add the CSS for this after all of your other CSS in the &lt;head&gt; section.

	<link rel="stylesheet" href="meanmenu.css" media="all" />

Then in your usual document.ready, this is working under the assumption your navigation is in <header><nav> structure...

    document.addEventListener( "DOMContentLoaded", function() {
    	MeanMenu('header nav');
    });

There are the following options (Options are shown with their defaults)...

- **Menu target** A CSS selector to the closest container where the WordPress menu resides. The menu is usually an unordered list with a `menu` class.
- **Menu anchor** A CSS selector to the container where the mean menu will reside. If you're unsure, try `body`.
- **Bar colour** The bckground colour of the mean menu bar.
- **Menu colour** The background colour of the expanded mean menu.
- **Menu close** The symbol that will be used when the menu is expanded. This can be any unicode character or HTML entity.
- **Menu open** The symbol that will be used when the menu is collapsed. This can be any unicode character or HTML entity.
- **Reveal position** The justification of the mean menu state symbol.
- **Reveal position offset** Horizontal offset applied to the mean menu state symbol. This is intelligently applied depending on the justification, and has no effect when centered.
- **Reveal colour** The font colour of the mean menu state symbol.
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
