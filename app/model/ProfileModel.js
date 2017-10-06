// Set up a model to use in our Store
Ext.define('PayrollEntry2.model.ProfileModel', {
    extend: 'Ext.data.Model',
    requires: [ 'Ext.data.Types', 'PayrollEntry2.model.ProfileFieldModel'],

    fields: [
       {name: 'group',  type: Ext.data.Types.STRING},
       {name: "profileId",  type: Ext.data.Types.STRING},
       {name: "company",  type: Ext.data.Types.STRING},
       {name: "ignoreRows",  type: Ext.data.Types.INT},
       {name: "lastRow",  type: Ext.data.Types.INT},
       {name: "profileName",  type: Ext.data.Types.STRING},
       {name: "effDate",  type: Ext.data.Types.DATE},
       {name: "effStatus",  type: Ext.data.Types.STRING},
       {name: "headerDetail",  type: Ext.data.Types.BOOL},
       {name: "dateFormat", type: Ext.data.Types.STRING},
       {name: "delimiter", type: Ext.data.Types.STRING},
       {name: "currencyChar", type: Ext.data.Types.STRING},
       {name: "alternateEmployeeId", type: Ext.data.Types.STRING},
       {name: "lastUsedDate", type: Ext.data.Types.DATE}
    ],

    hasMany: {model: 'PayrollEntry.model.ProfileFieldModel', name: 'profileFields'}

});