Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.TicketReturns = {

  

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
    
    if (typeof TicketReturnsgrdReturns_Strings === 'undefined') {
        TicketReturnsgrdReturns_Strings = {};
    }

    var options = {		
		        context: runtimeConfig,		
						previewField: 'ReturnDetailNotes',
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
				name:  TicketReturnsgrdReturns_Strings['grdReturns_94c843df_1d4b_4d41_9b43_c73ef6e843a4_ColumnHeading']  || 'Return ID',
	sortable: true,
		width: 14,
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
				name:  TicketReturnsgrdReturns_Strings['grdReturns_92eb8a79_7cc1_47e6_bac0_0e40df056d7f_ColumnHeading']  || 'Received Date',
	sortable: true,
		width: 10,
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
				name:  TicketReturnsgrdReturns_Strings['grdReturns_0c58998b_d2f8_4d2f_945e_12cf35d78407_ColumnHeading']  || 'Status',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	,
{
		field: 'ClosedDate',
				name:  TicketReturnsgrdReturns_Strings['grdReturns_ba575b41_d536_4082_93de_2a013218e7da_ColumnHeading']  || 'Closed Date',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	dateOnly: false,
		type: DateTime
}
  	,
{
		field: 'ReturnDetailNotes',
				name:  TicketReturnsgrdReturns_Strings['grdReturns_df65e5ff_1f9e_4869_8d48_1d9fc60b578f_ColumnHeading']  || 'Return Information',
	sortable: false,
		width: 20,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
			,formatter: Sage.Format.abbreviationFormatter(128)
				,formatter: Sage.Format.abbreviationFormatter(128)
	}
  	,
{
		field: 'ShortNotes',
				name:  TicketReturnsgrdReturns_Strings['grdReturns_9f0be066_8950_4daa_ba54_9105d385db3e_ColumnHeading']  || 'Ship Information',
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
            resourceKind: 'returns',
            newItemParentReferenceProperty: 'Ticket',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'TicketReturnsgrdReturns_DataCarrier',
            sort: [
    { attribute: "ReturnNumber"
     }
                       ]
        },
        tools: [
         ],
        contextualCondition: function() { return 'Ticket.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
				     slxContext: dojo.mixin({ tabId : 'TicketReturns' }, runtimeConfig),	   
				id : 'TicketReturnsgrdReturns',
        rowsPerPage: 20,
        singleClickEdit: true
    };

	
	var grid = new SLXPreviewGrid.Grid(options, 'TicketReturnsgrdReturns_Grid');
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
        setTimeout(function() { Sage.UI.Forms.TicketReturns.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();