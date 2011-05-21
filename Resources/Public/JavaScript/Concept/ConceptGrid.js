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
					text: this.recordType + this.nodeId
				}
			]
		};

//		this.repositoryStore = new Ext.data.DirectStore({
//			storeId: 'repositories',
//			idProperty: 'uid',
//			directFn: TYPO3.EM.ExtDirect.getRepositories,
//			root: 'data',
//			totalProperty: 'length',
//			fields : ['title', 'uid', 'updated', 'count', 'selected'],
//			paramsAsHash: true
//		});

		this.repositoryListStore = new Ext.data.DirectStore({
			storeId: 'repositoryliststore',
			directFn: TYPO3.Taxonomy.ExtDirect.getRemoteExtensionList,
			idProperty: 'extkey',
			root: 'data',
			totalProperty: 'length',
			fields:[
				{name:'install'},
				{name:'title'},
				{name:'extkey'},
				{name:'category', type: 'int'},
				{name:'version'},
				{name:'alldownloadcounter', type: 'int'},
				{name:'downloadcounter', type: 'int'},
				{name:'statevalue'},
				{name:'state'},
				{name:'stateCls'},
				{name:'icon'},
				{name:'description'},
				{name:'lastuploaddate', type: 'date', dateFormat: 'timestamp'},
				{name:'authorname'},
				{name:'authoremail'},
				{name:'versions', type: 'int'},
				{name:'installed', type: 'int'},
				{name:'versionislower', type: 'bool'},
				{name:'existingVersion'},
				{name:'exists', type: 'int'},
				{name:'relevance', type: 'int'}
			],
			paramNames: {
				start : 'start',
				limit : 'limit',
				sort : 'sort',
				dir : 'dir',
				query: 'query'
			},
			baseParams: {
				query: '',
				repository: 1,
				start: 0,
				limit: 50

			},
			remoteSort: true,
			sortInfo:{
				field:'title',
				direction:"ASC"
			},
//			listeners: {
//				beforeload: function(store, records){
//					var control = Ext.getCmp('rsearchField');
//					if (control.getValue == '') {
//						return false;
//					}
//					store.setBaseParam('rep', Ext.getCmp('repCombo').getValue());
//					store.setBaseParam('installedOnly', this.showInstalledOnly);
//					if (!this.showInstalledOnly) {
//						this.filterMenuButton.removeClass('bold');
//					} else {
//						this.filterMenuButton.addClass('bold');
//					}
//
//				},
//				load: function(store, records){
//					var hasFilters = false;
//					TYPO3.EM.RemoteFilters.filters.each(function (filter) {
//						if (filter.active) {
//							hasFilters = true;
//						}
//					});
//					if (hasFilters) {
//						this.doClearFilters.show();
//					} else {
//						this.doClearFilters.hide();
//					}
//					if (records.length === 0) {
//
//					} else {
//
//					}
//				},
//				scope: this
//			},
//			highlightSearch: function(value) {
//				var control = Ext.getCmp('rsearchField');
//				if (control) {
//					var filtertext = control.getRawValue();
//					if (filtertext) {
//						var re = new RegExp(Ext.escapeRe(filtertext), 'gi');
//						var result = re.exec(value) || [];
//						if (result.length) {
//							return value.replace(result[0], '<span class="filteringList-highlight">' + result[0] + '</span>');
//						}
//					}
//				}
//				return value;
//			}
//
		}
		);

		Ext.apply(this, config);
		TYPO3.Taxonomy.Concept.GridPanel.superclass.initComponent.call(this);
		//TYPO3.Taxonomy.Application.fireEvent('TYPO3.Taxonomy.ConceptTree.afterInit', this);
	}
	
});


Ext.reg('TYPO3.Taxonomy.Concept.GridPanel', TYPO3.Taxonomy.Concept.GridPanel);