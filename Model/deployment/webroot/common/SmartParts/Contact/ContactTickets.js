Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.ContactTickets = {

  

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
    
    if (typeof ContactTicketsQFSDataGrid_Strings === 'undefined') {
        ContactTicketsQFSDataGrid_Strings = {};
    }

    var options = {		
		        context: runtimeConfig,		
						previewField: 'TicketSolution.Notes',
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
    	field: 'TicketNumber',
				name:  ContactTicketsQFSDataGrid_Strings['QFSDataGrid_3d7bddac_1d7d_4770_95da_2f23c63c05ab_ColumnHeading']  || 'Ticket ID',
	sortable: true,
		width: 13,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'Ticket'
    ,idField: '$key'
 }
  	,
{
		field: 'ReceivedDate',
				name:  ContactTicketsQFSDataGrid_Strings['QFSDataGrid_f7907532_7acd_443b_b4c2_57d7068408c8_ColumnHeading']  || 'Received Date',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	dateOnly: true,
		type: DateTime
}
  	,
{
		field: 'StatusCode',
				name:  ContactTicketsQFSDataGrid_Strings['QFSDataGrid_c162237d_ad8f_4827_a7b7_242c72d0d1f2_ColumnHeading']  || 'Status',
	sortable: true,
		width: 7,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: PickList,
	pickListName: 'Ticket Status',		
	storageMode:  'id' ,
	displayMode: 'AsText'
}
  	,
{
		field: 'Urgency.Description',
				name:  ContactTicketsQFSDataGrid_Strings['QFSDataGrid_eff160f5_1982_4037_a6c1_beb0b460a998_ColumnHeading']  || 'Urgency',
	sortable: true,
		width: 7,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	,
{
		field: 'NeededByDate',
				name:  ContactTicketsQFSDataGrid_Strings['QFSDataGrid_54f2bc72_1f1b_4cbd_b211_b561e0289e9f_ColumnHeading']  || 'Needed Date',
	sortable: true,
		width: 9,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	dateOnly: true,
		type: DateTime
}
  	,
{
		field: 'TicketProblem.Notes',
				name:  ContactTicketsQFSDataGrid_Strings['QFSDataGrid_214db48b_6183_466e_ae7e_5a2e55baa0d4_ColumnHeading']  || 'Description',
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
            resourceKind: 'tickets',
            newItemParentReferenceProperty: 'Contact',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'ContactTicketsQFSDataGrid_DataCarrier',
            sort: [
                     ]
        },
        tools: [
         ],
        contextualCondition: function() { return 'Contact.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
				     slxContext: dojo.mixin({ tabId : 'ContactTickets' }, runtimeConfig),	   
				id : 'ContactTicketsQFSDataGrid',
        rowsPerPage: 20,
        singleClickEdit: true
    };

	
	var grid = new SLXPreviewGrid.Grid(options, 'ContactTicketsQFSDataGrid_Grid');
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
        setTimeout(function() { Sage.UI.Forms.ContactTickets.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();