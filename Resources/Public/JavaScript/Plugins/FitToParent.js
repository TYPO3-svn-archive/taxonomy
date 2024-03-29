Ext.ns("TYPO3.Taxonomy.Plugins");

/**
 * @class TYPO3.Taxonomy.Plugins.FitToParent
 * @extends Object
 * <p>Plugin for {@link Ext.BoxComponent BoxComponent} and descendants that adjusts the size of the component to fit inside a parent element</p>
 * <p>The following example will adjust the size of the panel to fit inside the element with id="some-el":<pre><code>
var panel = new Ext.Panel({
    title: 'Test',
    renderTo: 'some-el',
    plugins: ['fittoparent']
});</code></pre></p>
 * <p>It is also possible to specify additional parameters:<pre><code>
var panel = new Ext.Panel({
    title: 'Test',
    renderTo: 'other-el',
    autoHeight: true,
    plugins: [
        new TYPO3.Taxonomy.Plugins.FitToParent({
            parent: 'parent-el',
            fitHeight: false,
            offsets: [10, 0]
        })
    ]
});</code></pre></p>
 * <p>The element the component is rendered to needs to have <tt>style="overflow:hidden"</tt>, otherwise the component will only grow to fit the parent element, but it will never shrink.</p>
 * <p>Note: This plugin should not be used when the parent element is the document body. In this case you should use a {@link Ext.Viewport Viewport} container.</p>
 */
TYPO3.Taxonomy.Plugins.FitToParent = Ext.extend(Object, {
    /**
     * @cfg {HTMLElement/Ext.Element/String} parent The element to fit the component size to (defaults to the element the component is rendered to).
     */
    /**
     * @cfg {Boolean} fitWidth If the plugin should fit the width of the component to the parent element (default <tt>true</tt>).
     */
    fitWidth: true,
    /**
     * @cfg {Boolean} fitHeight If the plugin should fit the height of the component to the parent element (default <tt>true</tt>).
     */
    fitHeight: true,
    /**
     * @cfg {Boolean} offsets Decreases the final size with [width, height] (default <tt>[0, 0]</tt>).
     */
    offsets: [0, 0],
    /**
     * @constructor
     * @param {HTMLElement/Ext.Element/String/Object} config The parent element or configuration options.
     * @ptype fittoparent
     */
    constructor: function(config) {
        config = config || {};
        if(config.tagName || config.dom || Ext.isString(config)){
            config = {parent: config};
        }
        Ext.apply(this, config);
    },
    init: function(c) {
        this.component = c;
        c.on('render', function(c) {
            this.parent = Ext.get(this.parent || c.getPositionEl().dom.parentNode);
            if(c.doLayout){
                c.monitorResize = true;
                c.doLayout = c.doLayout.createInterceptor(this.fitSize, this);
            } else {
                this.fitSize();
                Ext.EventManager.onWindowResize(this.fitSize, this);
            }
        }, this, {single: true});
    },
    fitSize: function() {
        var pos = this.component.getPosition(true),
            size = this.parent.getViewSize();
        this.component.setSize(
            this.fitWidth ? size.width - pos[0] - this.offsets[0] : undefined,
            this.fitHeight ? size.height - pos[1] - this.offsets[1] : undefined);
    }
});

Ext.preg('TYPO3.Taxonomy.FitToParent', TYPO3.Taxonomy.Plugins.FitToParent);
