// Set up a model to use in our Store
Ext.define('PayrollEntry2.model.ImportFieldEarnCodesModel', {
    extend: 'Ext.data.Model',
    requires: [ 'Ext.data.Types'],

    fields: [
        {name: 'code',  type: Ext.data.Types.STRING},
        {name: "description",  type: Ext.data.Types.STRING},
        {name: "dType",  type: Ext.data.Types.STRING}
    ],

    belongsTo: 'PayrollEntry.model.ImportFieldModel'

});
