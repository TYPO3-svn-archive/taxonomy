Ext.ns('TYPO3.Newsletter.UserInterface');

/**
 * @class TYPO3.Newsletter.UserInterface.SectionMenu
 * @namespace TYPO3.Newsletter.UserInterface
 * @extends Ext.Panel
 *
 * Class for the main menu
 *
 * $Id: SectionMenu.js 37081 2010-08-21 11:26:34Z fabien_u $
 */
TYPO3.Newsletter.UserInterface.SectionMenu = Ext.extend(Ext.Panel, {

	initComponent: function() {
		var config = {
			renderTo: 't3-newsletter-menu',
			layout: 'hbox',
			width: 300,
//			layoutConfig: {
//				padding: '5px',
//				width: '200px'
//			},
			border: false,
			bodyStyle: 'background-color: #DADADA',
			items: this._getMenuItems()
		};
		Ext.apply(this, config);
		TYPO3.Newsletter.UserInterface.SectionMenu.superclass.initComponent.call(this);
	},

	/**
	 * Returns the section menu
	 *
	 * @access private
	 * @return array
	 */
	_getMenuItems: function() {
		var modules = [];

		// Get menus
		Ext.each(TYPO3.Newsletter.Application.MenuRegistry.items.mainMenu, function(menuItem) {
			modules.push(
				{
					xtype: 'button',
//					itemId: menuItem.itemId,
					text: menuItem.text,
					iconCls: 't3-newsletter-button-' + menuItem.itemId,
					handler: function(){
						var token = menuItem.itemId;
						Ext.state.Manager.set('token', token);
						Ext.History.add(token);
						if (! menuItem.isLoaded) {
							TYPO3.Newsletter.Application.fireEvent('TYPO3.Newsletter.Application.busy');
							menuItem.isLoaded = true;
						}
					}
				}
			);
		});
		return modules;
	}

});
Ext.reg('TYPO3.Newsletter.UserInterface.SectionMenu', TYPO3.Newsletter.UserInterface.SectionMenu);