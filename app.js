/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/

Ext.define('TriNet.Payroll.Global', {
    singleton: true,
    headerRows: 0,
    strDelimiter : ",",
    endLine :"\n",
    defaultColumns:  [
          {
             "name" : "EMPLID",
             "description" : "Empl ID/Alternate Employee ID",
             "position" : 1
          },
          {
             "name" : "ERNCD",
             "description" : "Earnings Code",
             "position" : 2
          },
          {
             "name" : "LOCATION",
             "description" : "Location Code",
             "position" : 3
          },
          {
             "name" : "T2_PE_AMOUNT",
             "description" : "Amount",
             "position" : 4
          },
          {
             "name" : "DEPTID",
             "description" : "Department",
             "position" : 5
          },
          {
             "name" : "EARNS_BEGIN_DT",
             "description" : "Earnings Begin Date",
             "position" : 6
          },
          {
             "name" : "EARNS_END_DT",
             "description" : "Earnings End Date",
             "position" : 7
          },
          {
             "name" : "T2_DUR",
             "description" : "Date Under Report (MM/DD/YYYY)",
             "position" : 8
          },
          {
             "name" : "HOURS_EARNED",
             "description" : "Hours Earned",
             "position" : 9
          },
          {
             "name" : "T2_PE_OVR_HRLY_RT",
             "description" : "Override Pay Rate",
             "position" : 10
          },
          {
             "name" : "T2_PE_OVR_UNIT_RT",
             "description" : "Override Unit Rate",
             "position" : 11
          },
          {
             "name" : "JOBCODE",
             "description" : "Job Code",
             "position" : 12
          },
          {
             "name" : "T2_PE_UNITS",
             "description" : "Units",
             "position" : 13
          }
       ]
});

Ext.override(Ext.form.ComboBox, {
    getSelectedRecord: function () {
        return this.findRecord(this.valueField || this.displayField, this.getValue());
    },
    getSelectedIndex: function () {
        return this.store.indexOf(this.getSelectedRecord());
    }
});



Ext.application({
    name: 'PayrollEntry2',

    extend: 'PayrollEntry2.Application',
    
    autoCreateViewport: true
    
    
});
