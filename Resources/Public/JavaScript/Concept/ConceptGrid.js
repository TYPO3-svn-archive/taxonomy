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

	store: null,
	
	initComponent: function() {
		
		var config = {
//			frame:true,
			height:200,
			//		  width:500,
			store: null,
			columns: [
			{
				id: 'title',
				dataIndex: 'title',
				header: 'Tile',
				sortable: true
			},
			{
				id: 'command',
				dataIndex: 'uid',
				header: '',
				sortable: false,
				renderer: this._getRendererCommand
			},
//			{
//				header: "Released",
//				dataIndex: 'released',
//				renderer: Ext.util.Format.dateRenderer('m/d/Y')
//				},
//
//				{
//				header: "Genre",
//				dataIndex: 'genre'
//			},
//
//			{
//				header: "Tagline",
//				dataIndex: 'tagline'
//			}
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

		Ext.apply(this, config);
		TYPO3.Taxonomy.Concept.GridPanel.superclass.initComponent.call(this);
		//TYPO3.Taxonomy.Application.fireEvent('TYPO3.Taxonomy.ConceptTree.afterInit', this);
	},


	/**
	 * When object is rendered
	 *
	 * @access public
	 * @method onRender
	 * @return void
	 */
	onRender: function() {

		this._initStore();

		this.store.load({
			callback: function() {
//				console.log(this.getCount());
			}
		});
		TYPO3.Taxonomy.Concept.GridPanel.superclass.onRender.apply(this, arguments);
	},


	/**
	 * Return the store
	 *
	 * @access private
	 * @method _initStore
	 * @return object
	 */
	_initStore: function() {
		this.store = new Ext.data.DirectStore({
//			storeId: 'store',
			directFn: TYPO3.Taxonomy.ExtDirect.getRecords,
			idProperty: 'extkey',
			root: 'data',
			totalProperty: 'length',
			fields:[
				{name:'uid', type: 'int'},
				{name:'title'}
//				{name:'extkey'},
//				{name:'category', type: 'int'},
//				{name:'version'},
//				{name:'alldownloadcounter', type: 'int'},
//				{name:'downloadcounter', type: 'int'},
//				{name:'statevalue'},
//				{name:'state'},
//				{name:'stateCls'},
//				{name:'icon'},
//				{name:'description'},
//				{name:'lastuploaddate', type: 'date', dateFormat: 'timestamp'},
//				{name:'authorname'},
//				{name:'authoremail'},
//				{name:'versions', type: 'int'},
//				{name:'installed', type: 'int'},
//				{name:'versionislower', type: 'bool'},
//				{name:'existingVersion'},
//				{name:'exists', type: 'int'},
//				{name:'relevance', type: 'int'}
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
	},

	/**
	 * Renders the "create" column
	 *
	 * @access private
	 * @method _renderLocation
	 * @param {string} value
	 * @param {Object} parent
	 * @param {Object} record
	 * @return string
	 */
	_getRendererCommand: function(value, parent, record) {
		var iconsPath = '../typo3conf/ext/taxonomy/Temporary/';
		var output;
		//			output = '<img class="pointer" src="' + iconsPath + 'zoom.png" alt="view" onclick=""/>&nbsp;';
		output = '<img class="pointer" src="' + iconsPath + 'pencil.png" alt="edit" onclick="TYPO3.Taxonomy.UserInterface.doc.content.grid.test()"/>&nbsp;';
		// typo3/alt_doc.php?returnUrl=mod.php&M=web_list&id=51&edit[tt_content][210]=edit
		output += '<img class="pointer" src="' + iconsPath + 'clip_copy.png" alt="copy" onclick="Contact.window.edit(\'copy\')"/>&nbsp;';
		output += '<img class="pointer" src="' + iconsPath + 'garbage.png" alt="delete" onclick="Contact.grid.deleteRecords()"/>&nbsp;';
		return output;
		var format = TYPO3.Devlog.Preferences.dateFormat + ' ' + TYPO3.Devlog.Preferences.timeFormat;
		var result = Ext.util.Format.date(record.data['crdate'], format);
		return '<a href="#" class="devlog-link-crdate" id="devlog-link-generated-' + record.id + '" onclick="return false">' + result + '</a>';
	},

	test: function() {
	if(!win){
            win = new Ext.Window({
                applyTo:'hello-win',
                layout:'fit',
                width:500,
                height:300,
                closeAction:'hide',
                plain: true,
				modal: true,

                items: new Ext.TabPanel({
                    applyTo: 'hello-tabs',
                    autoTabs:true,
                    activeTab:0,
                    deferredRender:false,
                    border:false
                }),

                buttons: [{
                    text:'Submit',
                    disabled:true
                },{
                    text: 'Close',
                    handler: function(){
                        win.hide();
                    }
                }]
            });
        }
        win.show(this);

	}
});

var win;

Ext.reg('TYPO3.Taxonomy.Concept.GridPanel', TYPO3.Taxonomy.Concept.GridPanel);