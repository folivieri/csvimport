Ext.ns("Ext.ux.grid");

Ext.define('Ext.plugins.CSVImport', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.csvimport',

    grid : null,
    strDelimiter : ",",
    endLine :"\n",

    csvToArray: function(strData, strDelimiter) {
        var arrData = [
            []
        ];
        var arrMatches = null;
        var objPattern = new RegExp((
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ), "gi");

        while (arrMatches = objPattern.exec(strData)) {
            var strMatchedDelimiter = arrMatches[1];
            if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
                arrData.push([]);
            }
            if (arrMatches[2]) {
                var strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
            } else {
                var strMatchedValue = arrMatches[3];
            }
            arrData[arrData.length - 1].push(strMatchedValue);
        }

        return (arrData);
    },

    addRow: function(row) {
        row = csvToArray(row, strDelimiter);
        grid.store.loadData(row, true);
    },

    createStore: function(rows, keys) {
    	var me = this;
        var d = [];
        Ext.each(rows, function (row) {
            row = me.csvToArray(row, ",");
            d.push(row[0])
        });
        return Ext.create('Ext.data.ArrayStore', {
            fields: keys,
            data: d
        });
    },

    processFile: function(file) {
        var me = this;
        var reader = new FileReader();
        reader.onload = function (e) {
            var rows = atob(e.target.result.split(",")[1]).split(TriNet.Payroll.Global.endLine);
            for(var h = 0; h< TriNet.Payroll.Global.headerRows; h++){
                rows.shift();
            }
            var cols = rows[0].split(",");
            rows.shift();
            var _cols = [];
            var keys = [];
            for (var i = 0; i < cols.length; i++) {
                var col = cols[i];
                _cols.push({
                    text: "<span style='color:red'>--" + col.trim() + "--</span>",
                    dataIndex: col.trim()
                });
                keys.push(col.trim());
            }
            grid.reconfigure(grid.plugins[0].createStore(rows, keys), _cols);
            grid.fireEvent("read", grid, file, rows, reader);

            var menu = grid.view.headerCt.getMenu();

            menu.removeAll();

            var fields = "<span style='color:red'>-- IGNORE --</span>,EMPLID,T2_DUR,DEPTID,JOBCODE,LOCATION,ERNCD,EARNS_BEGIN_DT,EARNS_END_DT,HOURS_EARNED,T2_PE_OVR_HRLY_RT,T2_PE_AMOUNT,T2_PE_UNITS,T2_PE_OVR_UNIT_RT";
            var earnCodes= [ { text: 'ADM', data: 'ADM - Admin Pay', dType: 'Amount'},
                { text: 'BNM', data: 'BNM - Discretionary Mo Preferred BNS', dType: 'Amount'},
                { text: 'BNS', data: 'BNS - Discretionary Supplemental BNS', dType: 'Amount'},
                { text: 'BNT', data: 'BNT - Discretionary Supple Bonus II', dType: 'Amount'},
                { text: 'BON', data: 'BON - Discretionary Acm Bonus', dType: 'Amount'},
                { text: 'BP', data: 'BP - Nondiscretionary Perform Bonus', dType: 'Amount'},
                { text: 'BRV', data: 'BRV - Bereavement', dType: 'Hours'},
                { text: 'FHO', data: 'FHO - Unrestricted Floating Holiday', dType: 'Hours'},
                { text: 'HOL', data: 'HOL - Holiday', dType: 'Hours'},
                { text: 'JD', data: 'JD - Jury Duty', dType: 'Hours'},
                { text: 'LP', data: 'LP - Leave with Pay', dType: 'Hours'},
                { text: 'LWP', data: 'LWP - Leave Without Pay', dType: 'Hours'},
                { text: 'OR', data: 'OR - Other Supp Rate', dType: 'Amount'},
                { text: 'OVT', data: 'OVT - Overtime', dType: 'Hours'},
                { text: 'PDR', data: 'PDR - Pay Differential Regular Time', dType: 'Amount'},
                { text: 'PER', data: 'PER - Personal Time', dType: 'Hours'},
                { text: 'PTO', data: 'PTO - PTO', dType: 'Hours'},
                { text: 'REG', data: 'REG - Regular', dType: 'Hours'},
                { text: 'SCK', data: 'SCK - Sick', dType: 'Hours'},
                { text: 'SPB', data: 'SPB - Discretionary Spot Bonus', dType: 'Amount'},
                { text: 'SPS', data: 'SPS - Stipend Suppl', dType: 'Amount'} ];
            var fArray = fields.split(",");
            var fieldArray = [];

            var checkIfUsed = function(id){

            }


            for(var a = 0; a < fArray.length; a++){
                if(fArray[a] == 'ERNCD'){
                    var ecArray = [];
                     for(var b = 0; b < earnCodes.length; b++){
                        ecArray.push({
                            text: earnCodes[b].data,
                            key: earnCodes[b].text,
                            dType: earnCodes[b].dType,
                            handler: function (item, evObi) {
                                var cm = this.up('grid').columnManager;
                                var h_ = cm.getHeaderById(this.parentMenu.up('menu').ownerButton.id);
                                var origVal = h_.text;
                                if(item.dType != 'Amount' && item.dType != 'Hours'){
                                    h_.setText(item.key + " [ERNCD]");
                                } if(item.dType == 'Amount' ){
                                    h_.setText(item.key + " [Amount]");
                                } if(item.dType == 'Hours' ){
                                    h_.setText(item.key + " [Hours]");
                                }
                                // unselect previous selection if you can
                                Ext.each(item.ownerCt.items.items, function (_i) {
                                    if(_i.text == origVal){
                                        _i.setDisabled(!_i.disabled);
                                    }
                                });
                                item.setDisabled(true);
                                //@TODO re-enable the previous selction
                            }
                        });
                     }
                      fieldArray.push({ text: "EARN CODES", menu: ecArray });
                }

                    fieldArray.push({
                        text: fArray[a],
                        key: fArray[a],
                        handler: function (item, evObi) {
                            var cm = this.up('grid').columnManager;
                            var h_ = cm.getHeaderById(this.up('menu').ownerButton.id);
                            var origVal = h_.text;
                            h_.setText(item.text);
                            // unselect previous selection if you can
                            Ext.each(item.ownerCt.items.items, function (_i) {
                                if(_i.text == origVal){
                                    _i.setDisabled(!_i.disabled);
                                }
                            });
                            if(!(item.text.indexOf("IGNORE")>=0)){
                                item.setDisabled(true);
                            }
                            //@TODO re-enable the previous selction
                        }
                    });

            }

            menu.add(fieldArray);

        };
        reader.readAsDataURL(file);
    },

    getMappingFields: function(){

        return null;
    },

    initDD: function() {
    	var me = this;
        grid.body.on({
            scope: grid,
            dragover: function (e) {
                e.stopPropagation();
                e.preventDefault();
                if (!Ext.isGecko) { // prevents drop in FF ;-(
                    e.browserEvent.dataTransfer.dropEffect = 'copy';
                }
                grid.fireEvent("dragstart", grid);
                return;
            },
            dragleave: function (e) {
                e.stopPropagation();
                e.preventDefault();
                grid.fireEvent("dragstop", grid);
                return;
            },
            drop: function(e) {
				e.stopPropagation();
				e.preventDefault();
				var files = e.browserEvent.dataTransfer.files;
				if (
					files && files.length &&
					grid.fireEvent("beforedrop", grid, files) !== false
				) {
					// no defer, no load mask...
					Ext.defer(function () {
						Ext.each(files, me.plugins[0].processFile);
						grid.fireEvent("drop", grid, files);
					}, 50);
				}
			}
        });
    },

    init: function(component) {
    	var me = this;
        grid = component;
        grid.on({
            afterrender: me.initDD
        })
    }
});
