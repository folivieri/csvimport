Ext.define('PayrollEntry2.store.ImportFieldStore', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    sorters : {
        property  : 'position',
        direction : 'ASC'
    },
    model: 'PayrollEntry2.model.ImportFieldModel',

    proxy : {
        type : 'ajax',
        url  : 'Data/importFields.json'
    }
});
