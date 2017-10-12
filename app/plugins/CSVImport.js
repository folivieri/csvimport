Ext.ns("Ext.ux.grid");

Ext.define('Ext.plugins.CSVImport', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.csvimport',

    grid : null,

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

    // addRow: function(row) {
//         row = csvToArray(row, strDelimiter);
//         grid.store.loadData(row, true);
//     },

    createStore: function(rows, keys, delimiter) {
    	var me = this;
        var d = [];
        Ext.each(rows, function (row) {
            row = me.csvToArray(row, delimiter);
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
        var DELIMITER = ',', HEADER_ROWS = 0;
        {
            var fPanel =  Ext.getCmp('profileForm');
            var r = fPanel.getRecord();
            DELIMITER = r && r.get('delimiter') ? r.get('delimiter') : DELIMITER;
            var iRows = fPanel.getForm().findField('ignoreRows');
            HEADER_ROWS = iRows && iRows.getValue() ? iRows.getValue() : HEADER_ROWS;
            HEADER_ROWS = parseInt(HEADER_ROWS, 10);
        }
        reader.onload = function (e) {
            try {
                var rows = atob(e.target.result.split(",")[1]).split(TriNet.Payroll.Global.endLine);
                for (var h = 0; h < HEADER_ROWS; h++) {
                    rows.shift();
                }
                var cols = rows[0].split(DELIMITER);
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
                grid.reconfigure(grid.plugins[0].createStore(rows, keys, DELIMITER), _cols);
                grid.fireEvent("read", grid, file, rows, reader);

                var menu = grid.view.headerCt.getMenu();

                menu.removeAll();

                var fieldStore = Ext.getStore('ImportFieldStore');

                var fieldArray = [];

                for (var a = 0; a < fieldStore.count(); a++) {
                    var field = fieldStore.getAt(a);
                    if (field.get('name') == 'ERNCD') {
                        var ecArray = [];
                        var earnCodes = field.raw.earnCodes;
                        for (var b = 0; b < earnCodes.length; b++) {
                            ecArray.push({
                                text: earnCodes[b].description,
                                key: earnCodes[b].code,
                                dType: earnCodes[b].dType,
                                handler: function (item, evObi) {
                                    var cm = this.up('grid').columnManager;
                                    var h_ = cm.getHeaderById(this.parentMenu.up('menu').ownerButton.id);
                                    var origVal = h_.text;
                                    if (item.dType != 'Amount' && item.dType != 'Hours') {
                                        h_.setText(item.key + " [ERNCD]");
                                    }
                                    if (item.dType == 'Amount') {
                                        h_.setText(item.key + " [Amount]");
                                    }
                                    if (item.dType == 'Hours') {
                                        h_.setText(item.key + " [Hours]");
                                    }
                                    // unselect previous selection if you can
                                    Ext.each(item.ownerCt.items.items, function (_i) {
                                        if (_i.text == origVal) {
                                            _i.setDisabled(!_i.disabled);
                                        }
                                    });
                                    item.setDisabled(true);
                                    //@TODO re-enable the previous selction
                                }
                            });
                        }
                        fieldArray.push({text: "EARN CODES", menu: ecArray});
                    }

                    fieldArray.push({
                        text: fieldStore.getAt(a).get('description'),
                        key: fieldStore.getAt(a).get('name'),
                        handler: function (item, evObi) {
                            var cm = this.up('grid').columnManager;
                            var h_ = cm.getHeaderById(this.up('menu').ownerButton.id);
                            var origVal = h_.text;
                            h_.setText(item.text);
                            // unselect previous selection if you can
                            Ext.each(item.ownerCt.items.items, function (_i) {
                                if (_i.text == origVal) {
                                    _i.setDisabled(!_i.disabled);
                                }
                            });
                            if (!(item.text.indexOf("IGNORE") >= 0)) {
                                item.setDisabled(true);
                            }
                            //@TODO re-enable the previous selction
                        }
                    });

                }

                menu.add(fieldArray);
            }
            catch(err) {
                Ext.Msg.alert('PayrollEntry', 'Error loading file: '  + err.message);
                console.error( err.message);
                var importGrid = Ext.getCmp('importGrid');
                importGrid.setLoading(false); // <-- show default load mask to grid
            }

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
