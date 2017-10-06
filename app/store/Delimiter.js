Ext.define('PayrollEntry2.store.Delimiter', {
    extend: 'Ext.data.Store',
    alias  : 'store.payrollEntry-delimiter',

    autoLoad: true,
    model: 'PayrollEntry2.model.Delimiter',
    
	data: [{
		delimiter: ",",
		name: "Comma"
	}, {
		delimiter: "\t",
		name: "Tab"
	}, {
		delimiter: ";",
		name: "Semicolon"
	}, {
		delimiter: "|",
		name: "Vertical Line or Pipe"
	}]
});