Ext.define('PayrollEntry2.view.ImportGrid', {
    extend: 'Ext.grid.GridPanel',
    
    xtype: 'trinet-importGrid',
    
    id: 'importGrid',

    width: 500,
    height: 400,
    emptyText: 'Drag CSV or Pipe Separated file here',
    plugins: [
        { ptype: 'csvimport' }
    ],
    store: 'BlankImportGridStore',
    columns: [],
    listeners: {
        dragstart: function(grid) {
            //grid.view.scroller.setStyle("background-color", "#FFFDF6");
        },
        dragstop: function(grid) {
            //grid.view.scroller.setStyle("background-color", "#FFFFFF");
        },
        beforedrop: function(grid, files) {
            if (!grid.mask) {
                grid.mask = new Ext.LoadMask(
                    grid.body, {
                        msg: "Loading data, please wait..."
                    }
                );
            }
            grid.setLoading(true); // <-- show default load mask to grid
            grid.setLoading('some text'); // <-- show load mask with your text
            // return false to cancel import
        },
        drop: function(grid, files) {
            //grid.view.scroller.setStyle("background-color", "#FFFFFF");
        },
        read: function(grid, file, content, reader) {
            grid.setLoading(false);
        }
    }
});
