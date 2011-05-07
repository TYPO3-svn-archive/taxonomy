Ext.ns("TYPO3.Taxonomy.UserInterface");

/**
 * @class TYPO3.Taxonomy.UserInterface.FullDoc
 * @namespace TYPO3.Taxonomy.UserInterface
 * @extends Ext.Container
 *
 * Class for the main content
 *
 * $Id: FullDoc.js 35001 2010-06-28 13:44:42Z fabien_u $
 */
TYPO3.Taxonomy.UserInterface.FullDoc = Ext.extend(Ext.Container, {

	initComponent: function() {
		
		var config = {
			renderTo: 'typo3-fullDoc',
			plugins: ['TYPO3.Taxonomy.FitToParent'],

//			autoHeight: true,
			// items are set dynamically through method handleNavigationToken() located in every bootstrapper
			// this method is called whenever event TYPO3.Taxonomy.Application.navigate is fired (at least once when application is loaded)

			layout:'border',
			defaults: {
				collapsible: false,
				split: true,
				bodyStyle: 'padding:15px'
			},
			items: [

				/*
				 * WEST PANEL
				 */
				{
	//				title: 'Concepts',
					xtype: 'panel',
					region:'west',
					margins: '0',
					padding: '0',
					//				cmargins: '5 5 0 0',
					width: 200,
					//				minSize: 100,
					//				maxSize: 250,
					items: [{

						xtype: 'panel',
						border: false,
						layout:'border',
						id: 'typo3-pagetree',
						items: [

							{
								xtype: 'TYPO3.Taxonomy.UserInterface.TopPanel',
								ref: 'topPanel'
							},
							{
								xtype: 'panel',
								id: 'typo3-pagetree-treeContainer',
								region: 'center',
								layout: 'fit',
								items: [{
										xtype: 'TYPO3.Taxonomy.Concept.TreePanel',
										ref: '../conceptTree'
									}
								]
							}
						]
					}]
				},

				/*
				 * CENTER PANEL
				 */
				{
					region:'center',
					margins: '0 0 0 -5',
					padding: '0',
					items: [{
						xtype: 'panel',
						border: false,
						layout:'border',
						cls: 'typo3-fullDoc',
						items: [
							{
								xtype: 'TYPO3.Taxonomy.UserInterface.DocHeader',
								ref: 'docHeader'

							},
							{
								xtype: 'panel',
								region: 'center',
								id: 'typo3-inner-docbody',
//								style: {
//									paddingTop: '10px'
//								},
								layout: 'fit',
								items: [
									{
										xtype: 'TYPO3.Taxonomy.Concept.GridPanel',
										ref: '../conceptGrid'
									}
								]
							}
						]
					}
						

					]
				}
			]
		};

		Ext.apply(this, config);
		TYPO3.Taxonomy.UserInterface.FullDoc.superclass.initComponent.call(this);
	}

});
