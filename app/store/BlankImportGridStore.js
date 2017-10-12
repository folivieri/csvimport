Ext.define('PayrollEntry2.store.BlankImportGridStore', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'PayrollEntry2.model.ImportFieldModel',

    proxy : {
        type : 'ajax',
        url  : 'Data/blankGrid.json',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    listeners: {
        'metachange': function(store, meta) {
            var importGrid = Ext.getCmp('importGrid');
            importGrid.reconfigure(store, meta.columns);
        }
    }
});
