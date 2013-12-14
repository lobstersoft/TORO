Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.AccountReturns = {

  

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
    
    if (typeof AccountReturnsgrdReturns_Strings === 'undefined') {
        AccountReturnsgrdReturns_Strings = {};
    }

    var options = {		
		        context: runtimeConfig,		
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
    	field: 'ReturnNumber',
				name:  AccountReturnsgrdReturns_Strings['grdReturns_a719a4f3_4738_446f_95fb_2c4a41e6c964_ColumnHeading']  || 'Return',
	sortable: true,
		width: 8,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'Return'
    ,idField: '$key'
 }
  	,
{
		field: 'CreateDate',
				name:  AccountReturnsgrdReturns_Strings['grdReturns_5378f3e2_6c0b_4fa8_9ab0_a8fda06e1f42_ColumnHeading']  || 'Created',
	sortable: true,
		width: 8,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	dateOnly: false,
		type: DateTime
}
  	,
{
		field: 'Status',
				name:  AccountReturnsgrdReturns_Strings['grdReturns_f69b4bf7_18de_461f_ae76_03b63a502ab2_ColumnHeading']  || 'Status',
	sortable: true,
		width: 8,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	,
{
		field: 'ReturnType',
				name:  AccountReturnsgrdReturns_Strings['grdReturns_a610750c_5002_4893_9143_454e0ac568cd_ColumnHeading']  || 'Type',
	sortable: true,
		width: 8,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	,
{
		field: 'Priority',
				name:  AccountReturnsgrdReturns_Strings['grdReturns_8950b6fc_990f_4abb_935b_8706242a9777_ColumnHeading']  || 'Priority',
	sortable: true,
		width: 8,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	          ],
        storeOptions: {
            resourceKind: 'returns',
            newItemParentReferenceProperty: 'Account',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'AccountReturnsgrdReturns_DataCarrier',
            sort: [
                    ]
        },
        tools: [
         ],
        contextualCondition: function() { return 'Account.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'AccountReturns',
		gridNodeId: 'AccountReturnsgrdReturns_Grid',
				id : 'AccountReturnsgrdReturns',
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
        setTimeout(function() { Sage.UI.Forms.AccountReturns.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();