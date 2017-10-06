Ext.define('PayrollEntry2.store.ProfileStore', {
    extend: 'Ext.data.Store',
    alias  : 'store.payrollEntry-profile',

    autoLoad: true,
    model: 'PayrollEntry2.model.ProfileModel',

    proxy : {
        type : 'ajax',
        url  : 'Data/profiles.json'
    },

    listeners: {
        load: function(){
            //Ext.Msg.alert('PayrollEntry', 'ProfileStore loaded!');
        }
    }
});