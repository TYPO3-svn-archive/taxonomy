Ext.ns("TYPO3.Taxonomy.Concept");

/**
 * @class TYPO3.Taxonomy.Concept.GridPanel
 * @namespace TYPO3.Taxonomy.Concept
 * @extends Ext.Container
 *
 * Class for the main content
 *
 * $Id: GridPanel.js 35001 2010-06-28 13:44:42Z fabien_u $
 */
TYPO3.Taxonomy.Concept.GridPanel = Ext.extend(Ext.grid.GridPanel, {

	initComponent: function() {


		var config = {
//			frame:true,
			//		 title: 'Movie Database',
			height:200,
			//		  width:500,
			store: TYPO3.Taxonomy.Stores.initConceptStore(),
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
		};



		Ext.apply(this, config);
		TYPO3.Taxonomy.Concept.GridPanel.superclass.initComponent.call(this);
		//TYPO3.Taxonomy.Application.fireEvent('TYPO3.Taxonomy.ConceptTree.afterInit', this);
	}
	
});


Ext.reg('TYPO3.Taxonomy.Concept.GridPanel', TYPO3.Taxonomy.Concept.GridPanel);