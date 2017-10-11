// Set up a model to use in our Store
Ext.define('PayrollEntry2.model.ImportFieldModel', {
    extend: 'Ext.data.Model',
    requires: [ 'Ext.data.Types', 'PayrollEntry2.model.ImportFieldEarnCodesModel'],

    fields: [
        {name: 'name',  type: Ext.data.Types.STRING},
        {name: "description",  type: Ext.data.Types.STRING},
        {name: "position",  type: Ext.data.Types.INT}
    ],

    hasMany: {model: 'PayrollEntry.model.ImportFieldEarnCodesModel', name: 'earnCodes'}

});
