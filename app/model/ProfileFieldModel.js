// Set up a model to use in our Store
Ext.define('PayrollEntry2.model.ProfileFieldModel', {
    extend: 'Ext.data.Model',
    requires: [ 'Ext.data.Types'],

    fields: [
       {name: 'name',  type: Ext.data.Types.STRING},
       {name: "description",  type: Ext.data.Types.STRING},
       {name: "position",  type: Ext.data.Types.INT}
    ],
    belongsTo: 'PayrollEntry.model.ProfileModel'

});