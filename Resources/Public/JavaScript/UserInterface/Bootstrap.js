"use strict";

Ext.ns("TYPO3.Taxonomy.UserInterface");

/**
 * @class TYPO3.Taxonomy.UserInterface.Bootstrap
 * @namespace TYPO3.Taxonomy.UserInterface
 * @extends TYPO3.Taxonomy.Application.AbstractBootstrap
 *
 * Bootrap application
 *
 * $Id: Bootstrap.js 37081 2010-08-21 11:26:34Z fabien_u $
 */
TYPO3.Taxonomy.UserInterface.Bootstrap = Ext.apply(new TYPO3.Taxonomy.Application.AbstractBootstrap, {
	initialize: function() {

//		this.addToMenu(['mainMenu'], [
//			{
//				text: TYPO3.Taxonomy.Language.newsletter_button,
//				itemId: 'planner'
//			},
//			{
//				text: TYPO3.Taxonomy.Language.statistics_button + ' (' + TYPO3.Taxonomy.Data.numberOfStatistics + ')',
//				itemId: 'statistics'
//			}
//		]);
		
		TYPO3.Taxonomy.Application.on('TYPO3.Taxonomy.Application.afterBootstrap', this.initViewPort, this);
//		TYPO3.Taxonomy.Application.on('TYPO3.Taxonomy.Application.afterBootstrap', this.initSectionMenu, this);
	},
	
	initViewPort: function() {
		TYPO3.Taxonomy.UserInterface.viewPort = new TYPO3.Taxonomy.UserInterface.ViewPort();
	},
//
//	initSectionMenu: function() {
//		TYPO3.Taxonomy.UserInterface.sectionMenu = new TYPO3.Taxonomy.UserInterface.SectionMenu();
//	}
});

TYPO3.Taxonomy.Application.registerBootstrap(TYPO3.Taxonomy.UserInterface.Bootstrap);