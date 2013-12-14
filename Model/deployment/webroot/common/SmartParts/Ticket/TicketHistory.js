Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.TicketHistory = {

  

makeGrid : function(runtimeConfig) {
    require(['Sage/UI/EditableGrid',
             'Sage/UI/Columns/DateTime',
             'Sage/UI/Columns/SlxLink',
             'Sage/UI/Columns/SlxEdit',
             'Sage/UI/Columns/PickList',
             'Sage/UI/Columns/Phone',
             'Sage/UI/Columns/Email',
             'Sage/UI/Columns/CheckBox',
             'Sage/UI/Columns/Numeric',
             'Sage/UI/Columns/Currency',
             'Sage/UI/Columns/Lookup',
             'dojo/aspect',
             'Sage/UI/SLXPreviewGrid',
             'Sage/UI/Columns/SlxUser'],
			 
			 function(EditableGrid, DateTime, SlxLink, SlxEdit, PickList, Phone, Email, CheckBox,
			   Numeric, Currency, Lookup, aspect, SLXPreviewGrid, SlxUser) {
    
    if (typeof TicketHistoryQFSDataGrid_Strings === 'undefined') {
        TicketHistoryQFSDataGrid_Strings = {};
    }

    var options = {		
		        context: runtimeConfig,		
		        noDataMessage: TicketHistoryQFSDataGrid_Strings['QFSDataGrid_EmptyTableRowText']  ||  'No records match the selection criteria.', 
				        		//Set to the value of the ReadOnlyCondition property
		          readOnly: false,
			        columns: [
    {
        field: '$key',
        editable: false,
		excludeFromFilters: true,
        hidden: true,
        id: 'id',
        formatter: function (value, rowIdx, cel) {
            var insertId = [cel.grid.id, '-row', rowIdx].join('');
            var id = (Sage.Utility.getModeId() === 'insert') ? insertId : value;
            var anchor = ['<div id=', id, ' >', id, '</ div>'].join('');
            return anchor;
        }
    },

{
		field: 'CreateDate',
				name:  TicketHistoryQFSDataGrid_Strings['QFSDataGrid_172d76f3_99b4_4ea1_8414_da75e5e88912_ColumnHeading']  || 'Date Changed',
	sortable: true,
		width: 12,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	dateOnly: false,
		type: DateTime
}
  	,
{
		field: 'CreateUser',
				name:  TicketHistoryQFSDataGrid_Strings['QFSDataGrid_51deac7c_b02d_44ec_97ca_b8fea21eea43_ColumnHeading']  || 'User',
	sortable: true,
		width: 12,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	type: Sage.UI.Columns.SlxUser
}
  	,
{
		field: 'FieldName',
				name:  TicketHistoryQFSDataGrid_Strings['QFSDataGrid_d1f6b256_d567_40b6_ae8a_8a3bc328b642_ColumnHeading']  || 'Field Changed',
	sortable: false,
		width: 12,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	,
{
		field: 'OldValue',
				name:  TicketHistoryQFSDataGrid_Strings['QFSDataGrid_19b71659_8053_4cb9_8f99_81170e06c1f7_ColumnHeading']  || 'Old Value',
	sortable: true,
		width: 12,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				,formatter: (function () {
		    var cache = {};
		    return function (value, inRowIndex, cell) {
		        // Special format for some of the history fields
		        var item = cell.grid.getItem(inRowIndex);
                var fieldName = cell.grid.store.getValue(item, "FieldName").toUpperCase();

                if(cache[fieldName + "/" + value]){
                    return cache[fieldName + "/" + value];
                }		        
		        var formatPicklistid = function (pickListName, itemid) {
		            var deferred = new dojo.Deferred();
		            var result = itemid;
		            var config = {
		                pickListName: pickListName, // Required
		                storeMode: "id",
		                displayMode: "text"
		            };
		            this.pickList = new Sage.UI.Controls.PickList(config);
		            this.pickList.getPickListData(deferred);
		            deferred.then(dojo.hitch(this,
                        function (data) {
                            dojo.forEach(data.items.$resources, function (pickListItem, index, array) {
                                //console.log(item.id + ' === ' + id);
                                if (pickListItem.$key === itemid) {
                                    result = pickListItem.text;
                                }
                            }, this);

                        }),
                        function (e) {
                            console.error(e); // errback
                        }
                    );
		            return result;
		        };
		        var formatSdata = function (resourceKind, id) {
		            console.log("Format sdata: " + resourceKind + " / " + id);
		            var def = new dojo.Deferred();
		            dojo.xhrGet({
		                url: "slxdata.ashx/slx/dynamic/-/" + resourceKind + "('" + id + "')?format=json&select=Id",
		                handleAs: "json",
		                load: function (data) {
                            cache[fieldName + "/" + value] = data.$descriptor;
		                    def.resolve(data.$descriptor);
		                }
		            });
		            return def;
		        };
		        
		        switch (fieldName) {
		            case "STATUSCODE":
		                return formatPicklistid("Ticket Status", value);
		            case "ASSIGNEDTOID": case "RECEIVEDBYID": case "COMPLETEDBYID":
		                return formatSdata("owners", value);
		            case "ACCOUNTID":
		                return formatSdata("accounts", value);
		            case "CONTACTID":
		                return formatSdata("contacts", value);
		        }
		        return value;
		    };
		})()

		}
  	,
{
		field: 'NewValue',
				name:  TicketHistoryQFSDataGrid_Strings['QFSDataGrid_de9a042c_2163_485e_8896_186e17d886ca_ColumnHeading']  || 'New Value',
	sortable: true,
		width: 12,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				,formatter: (function () {
		    var cache = {};
		    return function (value, inRowIndex, cell) {
		        // Special format for some of the history fields
		        var item = cell.grid.getItem(inRowIndex);
                var fieldName = cell.grid.store.getValue(item, "FieldName").toUpperCase();

                if(cache[fieldName + "/" + value]){
                    return cache[fieldName + "/" + value];
                }		        
		        var formatPicklistid = function (pickListName, itemid) {
		            var deferred = new dojo.Deferred();
		            var result = itemid;
		            var config = {
		                pickListName: pickListName, // Required
		                storeMode: "id",
		                displayMode: "text"
		            };
		            this.pickList = new Sage.UI.Controls.PickList(config);
		            this.pickList.getPickListData(deferred);
		            deferred.then(dojo.hitch(this,
                        function (data) {
                            dojo.forEach(data.items.$resources, function (pickListItem, index, array) {
                                //console.log(item.id + ' === ' + id);
                                if (pickListItem.$key === itemid) {
                                    result = pickListItem.text;
                                }
                            }, this);

                        }),
                        function (e) {
                            console.error(e); // errback
                        }
                    );
		            return result;
		        };
		        var formatSdata = function (resourceKind, id) {
		            console.log("Format sdata: " + resourceKind + " / " + id);
		            var def = new dojo.Deferred();
		            dojo.xhrGet({
		                url: "slxdata.ashx/slx/dynamic/-/" + resourceKind + "('" + id + "')?format=json&select=Id",
		                handleAs: "json",
		                load: function (data) {
                            cache[fieldName + "/" + value] = data.$descriptor;
		                    def.resolve(data.$descriptor);
		                }
		            });
		            return def;
		        };
		        
		        switch (fieldName) {
		            case "STATUSCODE":
		                return formatPicklistid("Ticket Status", value);
		            case "ASSIGNEDTOID": case "RECEIVEDBYID": case "COMPLETEDBYID":
		                return formatSdata("owners", value);
		            case "ACCOUNTID":
		                return formatSdata("accounts", value);
		            case "CONTACTID":
		                return formatSdata("contacts", value);
		        }
		        return value;
		    };
		})()

		}
  	,
{
		field: 'Note',
				name:  TicketHistoryQFSDataGrid_Strings['QFSDataGrid_0bed4c04_75b7_4c30_b38f_adc480b39157_ColumnHeading']  || 'Note',
	sortable: false,
		width: '10',
	 	styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
			,formatter: Sage.Format.abbreviationFormatter(128)
				,formatter: Sage.Format.abbreviationFormatter(128)
	}
  	          ],
        storeOptions: {
            resourceKind: 'ticketHistory',
            newItemParentReferenceProperty: 'Ticket',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'TicketHistoryQFSDataGrid_DataCarrier',
            sort: [
    { attribute: "CreateDate"
     }
                       ]
        },
        tools: [
         ],
        contextualCondition: function() { return 'Ticket.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'TicketHistory',
		gridNodeId: 'TicketHistoryQFSDataGrid_Grid',
				id : 'TicketHistoryQFSDataGrid',
        rowsPerPage: 20,
        singleClickEdit: true
    };

		var grid = new EditableGrid(options);
	var container = dijit.byId(grid.gridNodeId);
	container.addChild(grid);
	    window.setTimeout(function () { grid.startup(); }, 1);
	aspect.after(grid, 'startup', function () {
		// This is not a typo.  The dijit.layout.ContentPane is not affectively determining all of it's layout information
		// on the first pass through resize.  Calling resize twice effectively renders the grid to fill it's container.
		var localTC = dijit.byId('tabContent');
		localTC.resize(); localTC.resize();
	});
 
});
}

  ,

    init : function(runtimeConfig) {
        setTimeout(function() { Sage.UI.Forms.TicketHistory.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();