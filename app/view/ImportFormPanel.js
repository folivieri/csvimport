Ext.define('PayrollEntry2.view.ImportFormPanel', {
    extend: 'Ext.form.Panel',
    
    xtype: 'trinet-importForm',

    title: 'Header Count',
    id: 'profileForm',
    width: 500,
    bodyPadding: 10,
    margin: 20,
    defaults: {
        labelWidth: 330,
    	width: 500
    },
    
    enableImportButton : function (enable) {
            Ext.getCmp('save_profile_button').setDisabled(enable == 'ok');
            //Ext.getCmp('profileForm').setDisabled(enable=='ok');

            Ext.getCmp('import_button').setDisabled(!(enable == 'ok'));
            
    },


    listeners: {
        dirtychange: function (f, isDirty) {
            alert('dirtychange');
        }
    },

    items: [{
        xtype: 'combobox',
        name: "profileName",
        id: 'profileNameField',
        fieldLabel: 'Profile Name',
        name: "profileSelector",
        emptyText: 'New Profile',
        displayField: 'profileName',
        valueField: 'profileName',
        store: 'ProfileStore',
        value: 'Default',
        listeners: {
            select: function(cBox, newValue, oldValue, eOpts) {
                var fPanel =  this.up('form');
                var r = cBox.getSelectedRecord();
                fPanel.loadRecord(r);
                var _cols = [];
                for (var i = 0; i < r.raw.profileFields.length; i++) {
                    var col = r.raw.profileFields[i];
                    _cols.push({
                        text: col.description,
                        dataIndex: col.name
                    });
                }
				var importGrid = Ext.getCmp('importGrid');
                importGrid.reconfigure(null, _cols);
            },
            change: function(cBox, newValue, oldValue, eOpts) {
                var r = cBox.getSelectedRecord();
                if(r.raw && r.raw.enabled == "false"){
                    var fPanel =  this.up('form');
                    Ext.each(fPanel.items.items, function (_i) {
                        _i.setDisabled(true);
                    });
                }
                cBox.setDisabled(false);
            }
        }
    }, {
        xtype: 'radiogroup',
        name: "headerDetail",
        fieldLabel: 'Imported File Contains Column Header',
        //labelWidth: 330,
        items: [{
            boxLabel: 'Yes',
            name: 'cb-head',
            inputValue: 'Y',
            checked: true
        }, {
            boxLabel: 'No',
            name: 'cb-head',
            inputValue: 'N'
        }]
    }, {
        xtype: 'numberfield',
        name: "ignoreRows",
        //labelWidth: 330,
        fieldLabel: 'Number of rows to ignore',
        value: 0,

        // Add change handler to force user-entered numbers to evens
        listeners: {
            change: function(field, value) {
                value = parseInt(value, 10);
                var v = value++;
                field.setValue(v);
                TriNet.Payroll.Global.headerRows = v;
            }
        }
    }, {
        xtype: 'numberfield',
        name: "lastRow",
        //labelWidth: 330,
        fieldLabel: 'Number of LAST row',
        value: 0,

        // Add change handler to force user-entered numbers to evens
        listeners: {
            change: function(field, value) {
                value = parseInt(value, 10);
                var v = value++;
                field.setValue(v);
            }
        }
    }, {
        xtype: 'textfield',
        name: "dateFormat",
        fieldLabel: 'Date Format',
        emptyText: "YYYY-MMM-DD"
    }, {
        xtype: 'textfield',
        name: "currencyChar",
        fieldLabel: 'Currency Symbol',
        emptyText: "$"
    }, {
        xtype: 'radiogroup',
        name: "alternateEmployeeId",
        fieldLabel: 'Using Alternate Employee ID in file instead of Empl ID',
        items: [{
            boxLabel: 'Yes',
            name: 'cb-altId',
            inputValue: true
        }, {
            boxLabel: 'No',
            name: 'cb-altId',
            inputValue: false,
            checked: true
        }]
    }, {
        xtype: 'combobox',
        name: 'delimiter',
        fieldLabel: 'Columns in a .txt File Separated By',
        displayField: 'name',
        valueField: 'delimiter',
        store: 'Delimiter',
        queryMode: 'local',
        typeAhead: true,
        value: 'Comma'
    }],

    buttons: [{
            text: 'New Profile',
            id: 'new_button',
            disabled: false,
            handler: function() {
                var fPanel =  this.up('form');
                fPanel.getForm().reset();
                Ext.getStore('ProfileStore').add({
                    profileName: 'New Profile',
                    enabled : "true",
                    profileId: "",
                    company: "7NU",
                    ignoreRows: "1",
                    lastRow: "10",
                    effDate: "",
                    effStatus: "A",
                    headerDetail: "N",
                    dateFormat: "YYY-MMM-DD",
                    delimiter: "\t",
                    currencyChar: "",
                    alternateEmployeeId: "false",
                    lastUsedDate: "",
                    profileFields: TriNet.Payroll.Global.defaultColumns

                }); //first row
                var profileNameCombo = Ext.getCmp('profileNameField');

                var fPanel =  this.up('form');
                Ext.each(fPanel.items.items, function (_i) {
                    _i.setDisabled(false)
                });
                profileNameCombo.select('New Profile');
                var r = profileNameCombo.getSelectedRecord()
                fPanel.loadRecord(r);
                var _cols = [];
                for (var i = 0; i < r.raw.profileFields.length; i++) {
                    var col = r.raw.profileFields[i];
                    _cols.push({
                        text: col.description,
                        dataIndex: col.name
                    });
                }

                importGrid.reconfigure(null, _cols);
                // Ext.getStore('ProfileStore').reload();
            }
        },
        {
            text: 'Save Profile',
            id: 'save_profile_button',
            handler: function() {
                var fPanel =  this.up('form');
                fPanel.getForm().isValid();

                var importGrid = Ext.getCmp('importGrid');

                Ext.MessageBox.show({
                    title: 'JSON',
                    height: 300,
                    width: 500,
                    defaultTextHeight: 200,
                    multiline: true,
                    value: JSON.stringify(importGrid.columnManager.columns, undefined, 2),
                    buttons: Ext.MessageBox.OKCANCEL,
                    animateTarget: 'mb3',
                    layout: 'vbox',
                    autoScroll: true,
                    fn: fPanel.enableImportButton
                });
            }
        }, {
            text: 'Import Data',
            id: 'import_button',
            disabled: true,
            handler: function() {
                this.up('form').getForm().reset();
            }
        }, {
            text: 'Load Data',
            id: 'load_button',
            disabled: false,
            handler: function() {
                var fPanel =  this.up('form');
                var s11 = Ext.getStore('ProfileStore');
                var record = s11.getAt(0);
                fPanel.loadRecord(record);
            }
        }
    ]
});
