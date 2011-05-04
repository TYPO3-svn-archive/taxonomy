Ext.ns("TYPO3.Taxonomy.Concept");

/**
 * @class TYPO3.Taxonomy.Concept.TreePanel
 * @namespace TYPO3.Taxonomy.Concept
 * @extends Ext.Container
 *
 * Class for the main content
 *
 * $Id: TreePanel.js 35001 2010-06-28 13:44:42Z fabien_u $
 */
TYPO3.Taxonomy.Concept.TreePanel = Ext.extend(Ext.tree.TreePanel, {

	initComponent: function() {
		
		var config = {
			id: 'tree-panel',
			split: true,
			height: 300,
			minSize: 150,
			autoScroll: true,

			// tree-specific configs:
			rootVisible: false,
			//			lines: true,
			//			useArrows: true,
			singleExpand: true,

			loader: new Ext.tree.TreeLoader({
				dataUrl:'/typo3conf/ext/taxonomy/tree-data.json'
			}),

			root: new Ext.tree.AsyncTreeNode(),
		//			listeners: {
		//				click: function(node, event){
		//					if(node.isLeaf()){
		//						console.log(123);
		//						// do what you need to with the node.
		//					}
		//				}
		//			}

		};


		//contect menu
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
		this.on(
			'click',
			this.onClick,
			this
		);


		Ext.apply(this, config);
		TYPO3.Taxonomy.Concept.TreePanel.superclass.initComponent.call(this);
		//TYPO3.Taxonomy.Application.fireEvent('TYPO3.Taxonomy.ConceptTree.afterInit', this);
	},

	/**
	 * Renders the severity column
	 *
	 * @access private
	 * @method _renderSeverity
	 * @param {int} value: -1 OK, 0 Info, 1 Notice, 2 Warning, 3 Error
	 * @return string
	 */
	onClick: function(node, event) {
		if(node.isLeaf()){
			console.log(node.text);
			console.log(node.id);
			console.log(node);
		// do what you need to with the node.
		}
	}
});


Ext.reg('TYPO3.Taxonomy.Concept.TreePanel', TYPO3.Taxonomy.Concept.TreePanel);