Ext.ns("TYPO3.Taxonomy.UserInterface");

/**
 * @class TYPO3.Taxonomy.UserInterface.ViewPort
 * @namespace TYPO3.Taxonomy.UserInterface
 * @extends Ext.Container
 *
 * Class for the main content
 *
 * $Id: ViewPort.js 35001 2010-06-28 13:44:42Z fabien_u $
 */
TYPO3.Taxonomy.UserInterface.ViewPort = Ext.extend(Ext.Container, {

	initComponent: function() {






		// Data grid
		var store = new Ext.data.Store({
			data: [
			[
			1,
			"Office Space",
			"Mike Judge",
			"1999-02-19",
			1,
			"Work Sucks",
			"19.95",
			1
			],[
			3,
			"Super Troopers",
			"Jay Chandrasekhar",
			"2002-02-15",
			1,
			"Altered State Police",
			"14.95",
			1
			]
			//...more rows of data removed for readability...//
			],
			reader: new Ext.data.ArrayReader({
				id:'id'
			}, [
			'id',
			'title',
			'director',
			{
				name: 'released',
				type: 'date',
				dateFormat: 'Y-m-d'
			},
			'genre',
			'tagline',
			'price',
			'available'
			])
		});



		var grid = new Ext.grid.GridPanel({
//			frame:true,
			//		 title: 'Movie Database',
			height:200,
			//		  width:500,
			store: store,
			columns: [
			{
				header: "Title",
				dataIndex: 'title'
			},

			{
				header: "Director",
				dataIndex: 'director'
			},

			{
				header: "Released",
				dataIndex: 'released',
				renderer: Ext.util.Format.dateRenderer('m/d/Y')
				},

				{
				header: "Genre",
				dataIndex: 'genre'
			},

			{
				header: "Tagline",
				dataIndex: 'tagline'
			}
			],

			// Top Bar
//			tbar: [
//				{
//					xtype: 'button',
//					text: 'button'
//				}
//			],

			// Bottom Bar
			bbar: [
				{
					xtype: 'button',
					text: 'button'
				}
			]

		});








		var topPanel = new Ext.Panel({
			border: false,
			height: 49,
			/**
			 * Component Id
			 *
			 * @type {String}
			 */
			id: 'typo3-pagetree-topPanel',

			/**
			 * Border
			 *
			 * @type {Boolean}
			 */
			border: false,
			html: 'top panel under work!'
		});

		// top panel
		var topPanelItems = new Ext.Panel({
			id: 'typo3-pagetree-topPanelItems',
			border: false,
			region: 'north',
			height: 49,
			items: [
				topPanel, {
					border: false,
					id: 'typo3-pagetree-indicatorBar'
				}
			]
		});














	
		var config = {
			renderTo: 'typo3-viewPort',
			height: 700,
			// items are set dynamically through method handleNavigationToken() located in every bootstrapper
			// this method is called whenever event TYPO3.Taxonomy.Application.navigate is fired (at least once when application is loaded)

			layout:'border',
			defaults: {
				collapsible: false,
				split: true,
				bodyStyle: 'padding:15px'
			},
			items: [{
//				title: 'Concepts',
				xtype: 'panel',
				region:'west',
				margins: '0 0 0 0',
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
						topPanelItems,
						{
						xtype: 'panel',
						id: 'typo3-pagetree-treeContainer',
						region: 'center',
						layout: 'fit',
						items: [{
								xtype: 'TYPO3.Taxonomy.Concept.TreePanel',
								ref: '../timeList'
							}
						]
					}]
				}]
			},{
//				title: 'Content',
				region:'center',
				margins: '5 0 0 0',
				padding: '0',
				cls: 'x-panel-center',
				items: [
					grid
				]
			}]
		};

		Ext.apply(this, config);
		TYPO3.Taxonomy.UserInterface.ViewPort.superclass.initComponent.call(this);
	}
});