// Set up a model to use in our Store
Ext.define('PayrollEntry2.model.Delimiter', {
    extend: 'Ext.data.Model',
   fields: [{
                type: 'string',
                name: 'char'
            }, {
                type: 'string',
                name: 'name'
            } 
    ]

});