Ext.define('PayrollEntry2.view.ImportGrid', {
    extend: 'Ext.grid.GridPanel',
    
    xtype: 'trinet-importGrid',
    
    id: 'importGrid',

    width: 500,
    height: 400,
    emptyText: 'Drag CSV or Pipe Separated file here',
    /*plugins: [
        { ptype: 'csvimport' }
    ],*/
    columns: [{
        dataIndex: "EMPLID",
        header: "Employee Id"
    }, {
        dataIndex: "T2_DUR",
        header: "Date Under Report"
    }, {
        dataIndex: "DEPTID",
        header: "Department"
    }, {
        dataIndex: "JOBCODE",
        header: "Job Code"
    }, {
        dataIndex: "LOCATION",
        header: "Location"
    }, {
        dataIndex: "ERNCD",
        header: "Earn Code"
    }, {
        dataIndex: "EARNS_BEGIN_DT",
        header: "Earnings Begin Date"
    }, {
        dataIndex: "EARNS_END_DT",
        header: "Earnings End Date"
    }, {
        dataIndex: "HOURS_EARNED",
        header: "Hours"
    }, {
        dataIndex: "T2_PE_OVR_HRLY_RT",
        header: "Override Hourly Rate"
    }, {
        dataIndex: "T2_PE_AMOUNT",
        header: "Amount"
    }, {
        dataIndex: "T2_PE_UNITS",
        header: "Units"
    }, {
        dataIndex: "T2_PE_OVR_UNIT_RT",
        header: "Override Unit Rate"
    }],
    listeners: {
        dragstart: function(grid) {
            //grid.view.scroller.setStyle("background-color", "#FFFDF6");
        },
        dragstop: function(grid) {
            //grid.view.scroller.setStyle("background-color", "#FFFFFF");
        },
        beforedrop: function(grid, files) {
            if (!grid.mask) {
                grid.mask = new Ext.LoadMask(
                    grid.body, {
                        msg: "Loading data, please wait..."
                    }
                );
            }
            grid.setLoading(true); // <-- show default load mask to grid
            grid.setLoading('some text'); // <-- show load mask with your text
            // return false to cancel import
        },
        drop: function(grid, files) {
            //grid.view.scroller.setStyle("background-color", "#FFFFFF");
        },
        read: function(grid, file, content, reader) {
            grid.setLoading(false);
        }
    }
});