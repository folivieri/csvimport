Ext.define('PayrollEntry2.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'PayrollEntry2.view.ImportFormPanel',
        'PayrollEntry2.view.ImportGrid'
    ],
    
    xtype: 'app-main',

    layout: {
        type: 'border'
    },

    items: [{
        region: 'center',
        xtype: 'trinet-importForm',
        title: 'Form',
        width: 150
    },{
        region: 'south',
        xtype: 'trinet-importGrid'
    }]
});