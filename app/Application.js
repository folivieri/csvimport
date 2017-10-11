Ext.define('PayrollEntry2.Application', {
    name: 'PayrollEntry2',

    extend: 'Ext.app.Application',

    views: [
        // TODO: add views here
    ],

    controllers: [
        // TODO: add controllers here
    ],

    stores: [
        'ProfileStore',
        'Delimiter',
        'ProfileFieldStore',
        'ImportFieldStore'
    ]
});
