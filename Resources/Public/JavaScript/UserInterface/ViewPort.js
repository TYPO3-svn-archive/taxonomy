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

		// Go ahead and create the TreePanel now so that we can use it below
		// proof of concept
		var treePanel = new Ext.tree.TreePanel({
			id: 'tree-panel',
			split: true,
			height: 500,
			minSize: 150,
			autoScroll: true,

			// tree-specific configs:
			rootVisible: false,
			lines: false,
			singleExpand: true,
			useArrows: true,

			loader: new Ext.tree.TreeLoader({
				dataUrl:'/typo3conf/ext/taxonomy/tree-data.json'
			}),

			root: new Ext.tree.AsyncTreeNode()
		});

		console.log(treePanel.getSelectionModel());

		// contect menu
//		treePanel.on('contextmenu', function treeContextHandler(node) {
//			node.select();
//			// Context menu & setup
//			var contextMenu = new Ext.menu.Menu({
//				items: [
//				{
//					text: 'Delete',
//					handler: 	function deleteHandler() {
//						treePanel.getSelectionModel().getSelectedNode().remove();
//					}
//
//				}, {
//					text: 'Sort',
//					handler: 	function sortHandler() {
//						treePanel.getSelectionModel().getSelectedNode().sort(
//							function (leftNode, rightNode) {
//								return (leftNode.text.toUpperCase() < rightNode.text.toUpperCase() ? 1 : -1);
//							}
//							);
//					}
//
//				}, {
//					text: 'Filter',
//					handler: 	function filterHandler() {
//						var node = treePanel.getSelectionModel().getSelectedNode();
//						treePanel.filter('Bee', 'text', node);
//					}
//
//				}
//				]
//			});
//			contextMenu.show(node.ui.getAnchor());
//		});

		// Assign the changeLayout function to be called on tree node click.
		treePanel.getSelectionModel().on('select', function(selModel, record) {
			console.log(record);
			console.log(123);
		//			if (record.get('leaf')) {
		//				Ext.getCmp('content-panel').layout.setActiveItem(record.getId() + '-panel');
		//				if (!detailEl) {
		//					var bd = Ext.getCmp('details-panel').body;
		//					bd.update('').setStyle('background','#fff');
		//					detailEl = bd.createChild(); //create default empty div
		//				}
		//				detailEl.hide().update(Ext.getDom(record.getId() + '-details').innerHTML).slideIn('l', {
		//					stopFx:true,
		//					duration: 200
		//				});
		//			}
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
				title: 'Concepts',
				region:'west',
				margins: '5 0 0 0',
				cmargins: '5 5 0 0',
				width: 200,
				minSize: 100,
				maxSize: 250,
				items: [
				treePanel
				]
			},{
				title: 'Content',
				region:'center',
				margins: '5 0 0 0'
			}]
		};

		Ext.apply(this, config);
		TYPO3.Taxonomy.UserInterface.ViewPort.superclass.initComponent.call(this);
	}
});