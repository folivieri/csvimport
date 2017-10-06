// Set up a model to use in our Store
Ext.define('PayrollEntry2.model.Profile', {
    extend: 'Ext.data.Model',
   fields: [{
                type: 'string',
                name: 'abbr'
            }, {
                type: 'string',
                name: 'name'
            } ]

});