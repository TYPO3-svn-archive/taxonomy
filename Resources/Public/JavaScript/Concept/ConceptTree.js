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

	/**
	 * Tree Editor Instance (Inline Edit)
	 *
	 * @type {TYPO3.Components.PageTree.TreeEditor}
	 */
	treeEditor: null,
	
	/**
	 * Indicates if the label should be editable
	 *
	 * @cfg {Boolean}
	 */
	labelEdit: true,

	/**
	 * Enable the drag and drop feature
	 *
	 * @cfg {Boolean}
	 */
	enableDD: true,

	/**
	 * Drag and Drop Group
	 *
	 * @cfg {String}
	 */
	ddGroup: 'typo3-pagetree',

	/**
	 * Id of the deletion drop zone if any
	 *
	 * @cfg {String}
	 */
	deletionDropZoneId: '',

	/**
	 * Root Node Configuration
	 *
	 * @type {Object}
	 */
	rootNodeConfig: {
		id: 'root',
		expanded: true,
		nodeData: {
			id: 'root'
		}
	},

	/**
	 * Indicator if the control key is pressed
	 *
	 * @type {Boolean}
	 */
	isControlPressed: false,

	/**
	 * Context Node
	 *
	 * @type {Ext.tree.TreeNode}
	 */
	t3ContextNode: null,

	/**
	 * Context Information
	 *
	 * @type {Object}
	 */
	t3ContextInfo: {
		inCopyMode: false,
		inCutMode: false
	},

	/**
	 * Registered clicks for the double click feature
	 *
	 * @type {int}
	 */
	clicksRegistered: 0,

	/**
	 * Indicator if the control key was pressed
	 *
	 * @type {Boolean}
	 */
	controlKeyPressed: false,


	/**
	 * Initializes the component
	 *
	 * @return {void}
	 */
	initComponent: function() {

		if (!this.uiProvider) {
			this.uiProvider = TYPO3.Taxonomy.UserInterface.TreeNodeUI;
		}

		this.treeDataProvider = TYPO3.Taxonomy.ExtDirect;

		var config = {
//			id: 'tree-panel',
			id: 'typo3-pagetree-tree',
			split: true,
			height: 300,
			minSize: 150,
			autoScroll: true,
			enableDrop:true,

			// tree-specific configs:
			rootVisible: false,
			singleExpand: true,

			//root: new Ext.tree.AsyncTreeNode()
			root: new Ext.tree.AsyncTreeNode(this.rootNodeConfig),
			
			loader: new Ext.tree.TreeLoader({
				directFn: this.treeDataProvider.getNextTreeLevel,
				paramOrder: 'nodeId,attributes',
				nodeParameter: 'nodeId',
				baseAttrs: {
					uiProvider: this.uiProvider
				},

					// an id can never be zero in ExtJS, but this is needed
					// for the root line feature or it will never be working!
				createNode: function(attr) {
					if (attr.id == 0) {
						attr.id = 'siteRootNode';
					}
					return Ext.tree.TreeLoader.prototype.createNode.call(this, attr);
				},

				listeners: {
					beforeload: function(treeLoader, node) {
						treeLoader.baseParams.nodeId = node.id;
						treeLoader.baseParams.attributes = node.attributes.nodeData;
					}
				}
			})
		};


		// late binding of ExtDirect
//		TYPO3.Workspaces.Toolbar.selectActionStore.proxy = new Ext.data.DirectProxy({
//			directFn : TYPO3.Workspaces.ExtDirect.getStageActions
//		});
		//contect menu
//		this.on('contextmenu', function treeContextHandler(node) {
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

		// Listeners:
		// Event handlers that handle click events and synchronizes the label edit,
		// double click and single click events in a useful way.
		this.on(
			'click',
			this.onClick,
			this,
			{delay: 400}
		);

		this.on(
			'beforeclick',
			this.beforeclick,
			this
		);

		this.on(
			'beforedblclick',
			this.beforedblclick,
			this
		);


		if (this.labelEdit) {
			this.treeEditor = new TYPO3.Taxonomy.UserInterface.TreeEditor(this);
		}

		if (this.enableDD) {
			this.dragConfig = {ddGroup: this.ddGroup};
			this.enableDragAndDrop();
		}

		Ext.apply(this, config);
		TYPO3.Taxonomy.Concept.TreePanel.superclass.initComponent.call(this);
		//TYPO3.Taxonomy.Application.fireEvent('TYPO3.Taxonomy.ConceptTree.afterInit', this);
	},

/**
	 * prevent the expanding / collapsing on double click
	 *
	 * @return void
	 */
	beforedblclick: function(node, event) {
		return false;
	},

	/**
	 * prevents label edit on a selected node
	 *
	 * @return void
	 */
	beforeclick: function(node, event) {
		if (!this.clicksRegistered && this.getSelectionModel().isSelected(node)) {
			node.fireEvent('click', node, event);
			++this.clicksRegistered;
			return false;
		}
		++this.clicksRegistered;
	},

	/**
	 * prevents label edit on a selected node
	 *
	 * @return void
	 */
	beforeclick: function(node, event) {
		if (!this.clicksRegistered && this.getSelectionModel().isSelected(node)) {
			node.fireEvent('click', node, event);
			++this.clicksRegistered;
			return false;
		}
		++this.clicksRegistered;
	},

	/**
	 * Action when leaf is clicked
	 *
	 * single click handler that only triggers after a delay to let the double click event
	 * a possibility to be executed (needed for label edit)
	 *
	 * @return void
	 */
	onClick: function(node, event) {

		if (this.clicksRegistered === 2) {
			this.clicksRegistered = 0;
			event.stopEvent();
			return false;
		}

		this.clicksRegistered = 0;
		if(node.isLeaf()){
//			console.log(node.text);
//			console.log(node.id);
//			console.log(node);
		// do what you need to with the node.
		}
//		if (this.commandProvider.singleClick) {
//			this.commandProvider.singleClick(node, this);
//		}
	},

	/**
	 * Enables the drag and drop feature
	 *
	 * return {void}
	 */
	enableDragAndDrop: function() {
			// init proxy element
		this.on('startdrag', this.initDd, this);
		this.on('enddrag', this.stopDd, this);
			// node is moved
		this.on('movenode', this.moveNode, this);

			// new node is created/copied
		this.on('beforenodedrop', this.beforeDropNode, this);
		this.on('nodedrop', this.dropNode, this);

			// listens on the ctrl key to toggle the copy mode
		(new Ext.KeyMap(document, {
			key: Ext.EventObject.CONTROL,
			scope: this,
			buffer: 250,
			fn: function() {
				if (!this.controlKeyPressed && this.dragZone.dragging && this.copyHint) {
					if (this.shouldCopyNode) {
						this.copyHint.show();
					} else {
						this.copyHint.hide();
					}

					this.shouldCopyNode = !this.shouldCopyNode;
					this.dragZone.proxy.el.toggleClass('typo3-pagetree-copy');
				}
				this.controlKeyPressed = true;
			}
		}, 'keydown'));

		(new Ext.KeyMap(document, {
			key: Ext.EventObject.CONTROL,
			scope: this,
			fn: function() {
				this.controlKeyPressed = false;
			}
		}, 'keyup'));

			// listens on the escape key to stop the dragging
		(new Ext.KeyMap(document, {
			key: Ext.EventObject.ESC,
			scope: this,
			buffer: 250,
			fn: function(event) {
				if (this.dragZone.dragging) {
					Ext.dd.DragDropMgr.stopDrag(event);
					this.dragZone.onInvalidDrop(event);
				}
			}
		}, 'keydown'));
	},

	/**
	 * Disables the deletion drop zone if configured
	 *
	 * @return {void}
	 */
	stopDd: function() {
		if (this.deletionDropZoneId) {
			Ext.getCmp(this.deletionDropZoneId).hide();
			this.app.doLayout();
		}
	},

	/**
	 * Enables the deletion drop zone if configured. Also it creates the
	 * shown dd proxy element.
	 *
	 * @param {TYPO3.Components.PageTree.Tree} treePanel
	 * @param {Ext.tree.TreeNode} node
	 * @return {void}
	 */
	initDd: function(treePanel, node) {
		var nodeHasChildNodes = (node.hasChildNodes() || node.isExpandable());
		if (this.deletionDropZoneId &&
			(!nodeHasChildNodes ||
			(nodeHasChildNodes && TYPO3.Components.PageTree.Configuration.canDeleteRecursivly)
		)) {
			Ext.getCmp(this.deletionDropZoneId).show();
			this.app.doLayout();
		}
		this.initDDProxyElement();
	},

	/**
	 * Adds the copy hint to the proxy element
	 *
	 * @return {void}
	 */
	initDDProxyElement: function() {
		this.shouldCopyNode = false;
		this.copyHint = new Ext.Element(document.createElement('div')).addClass(this.id + '-copy');
		this.copyHint.dom.appendChild(document.createTextNode(TYPO3.Taxonomy.Language.copyHint));
		this.copyHint.setVisibilityMode(Ext.Element.DISPLAY);
		this.dragZone.proxy.el.shadow = false;
		this.dragZone.proxy.ghost.dom.appendChild(this.copyHint.dom);
	},

	/**
	 * Creates a Fake Node
	 *
	 * This must be done to prevent the calling of the moveNode event.
	 *
	 * @param {object} dragElement
	 */
	beforeDropNode: function(dragElement) {
		if (dragElement.data && dragElement.data.item && dragElement.data.item.shouldCreateNewNode) {
			this.t3ContextInfo.serverNodeType = dragElement.data.item.nodeType;
			dragElement.dropNode = new Ext.tree.TreeNode({
				text: TYPO3.Components.PageTree.LLL.fakeNodeHint,
				leaf: true,
				isInsertedNode: true
			});

				// fix incorrect cancel value
			dragElement.cancel = false;

		} else if (this.shouldCopyNode) {
			dragElement.dropNode.ui.onOut();
			var attributes = dragElement.dropNode.attributes;
			attributes.isCopiedNode = true;
			attributes.id = 'fakeNode';
			dragElement.dropNode = new Ext.tree.TreeNode(attributes);
		}

		return true;
	},

	/**
	 * Differentiate between the copy and insert event
	 *
	 * @param {Ext.tree.TreeDropZone} dragElement
	 * return {void}
	 */
	dropNode: function(dragElement) {
		this.controlKeyPressed = false;
		if (dragElement.dropNode.attributes.isInsertedNode) {
			dragElement.dropNode.attributes.isInsertedNode = false;
			this.insertNode(dragElement.dropNode);
		} else if (dragElement.dropNode.attributes.isCopiedNode) {
			dragElement.dropNode.attributes.isCopiedNode = false;
			this.copyNode(dragElement.dropNode)
		}
	},

	/**
	 * Moves a node
	 *
	 * @param {TYPO3.Components.PageTree.Tree} tree
	 * @param {Ext.tree.TreeNode} movedNode
	 * @param {Ext.tree.TreeNode} oldParent
	 * @param {Ext.tree.TreeNode} newParent
	 * @param {int} position
	 * return {void}
	 */
	moveNode: function(tree, movedNode, oldParent, newParent, position) {
		this.controlKeyPressed = false;
		tree.t3ContextNode = movedNode;
		if (position === 0) {
			console.log('@todo moveNodeToFirstChildOfDestination');
			//this.commandProvider.moveNodeToFirstChildOfDestination(newParent, tree);
		} else {
			var previousSiblingNode = newParent.childNodes[position - 1];
			console.log('@todo moveNodeAfterDestination');
			//this.commandProvider.moveNodeAfterDestination(previousSiblingNode, tree);
		}
	},

	/**
	 * Inserts a node
	 *
	 * @param {Ext.tree.TreeNode} movedNode
	 * return {void}
	 */
	insertNode: function(movedNode) {
		this.t3ContextNode = movedNode.parentNode;

		movedNode.disable();
		if (movedNode.previousSibling) {
			console.log('@todo insertNodeAfterDestination');
//			this.commandProvider.insertNodeAfterDestination(movedNode, this);
		} else {
			console.log('@todo insertNodeToFirstChildOfDestination');
//			this.commandProvider.insertNodeToFirstChildOfDestination(movedNode, this);
		}
	},

	/**
	 * Copies a node
	 *
	 * @param {Ext.tree.TreeNode} movedNode
	 * return {void}
	 */
	copyNode: function(movedNode) {
		this.t3ContextNode = movedNode;

		movedNode.disable();
		if (movedNode.previousSibling) {
			console.log('@todo copyNodeAfterDestination');
			//this.commandProvider.copyNodeAfterDestination(movedNode, this);
		} else {
			console.log('@todo copyNodeToFirstChildOfDestination');
			//this.commandProvider.copyNodeToFirstChildOfDestination(movedNode, this);
		}
	}

});


Ext.reg('TYPO3.Taxonomy.Concept.TreePanel', TYPO3.Taxonomy.Concept.TreePanel);