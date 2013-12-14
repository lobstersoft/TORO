Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.TicketActivities = {

  

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
    
    if (typeof TicketActivitiesgrdTicketActivities_Strings === 'undefined') {
        TicketActivitiesgrdTicketActivities_Strings = {};
    }

    var options = {		
		        context: runtimeConfig,		
						previewField: 'ActivityDescription',
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
    	field: '',
	    displayFields: [''],
    displayFormatString: TicketActivitiesgrdTicketActivities_Strings['grdTicketActivities_0509cdb3_ff22_44fb_940f_19a24860e02f_FormatString']  || 'Edit',
				name:  TicketActivitiesgrdTicketActivities_Strings['grdTicketActivities_0509cdb3_ff22_44fb_940f_19a24860e02f_ColumnHeading']  || ' ',
	sortable: false,
		width: 5,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'TicketActivity'
    ,idField: '$key'
 }
  	,
{
		field: 'ActivityTypeCode',
				name:  TicketActivitiesgrdTicketActivities_Strings['grdTicketActivities_999ab82e_6b24_4741_b77b_4dc90b785593_ColumnHeading']  || 'Type',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: PickList,
	pickListName: 'Ticket Activity',		
	storageMode:  'id' ,
	displayMode: 'AsText'
}
  	,
{
		field: 'User.UserInfo.NameLF',
				name:  TicketActivitiesgrdTicketActivities_Strings['grdTicketActivities_1a8f67b9_1c52_4b9f_9eab_718774e3c741_ColumnHeading']  || 'User',
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
		field: 'AssignedDate',
				name:  TicketActivitiesgrdTicketActivities_Strings['grdTicketActivities_12352d75_17a5_419a_a592_2d80ea965b55_ColumnHeading']  || 'Received Date',
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
		field: 'PublicAccessCode',
				name:  TicketActivitiesgrdTicketActivities_Strings['grdTicketActivities_79a654ac_e61e_4e5f_b371_7f8500df8ad5_ColumnHeading']  || 'Public',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: PickList,
	pickListName: 'Ticket Activity Public Access',		
	storageMode:  'id' ,
	displayMode: 'AsText'
}
  	,
{
		field: 'TotalFee',
				name:  TicketActivitiesgrdTicketActivities_Strings['grdTicketActivities_e1fe0285_a9a6_4f96_9e9c_a9002dc6c4f1_ColumnHeading']  || 'Total',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
		type: Currency,
	constraints: {  places: 2  },  

			exchangeRateType:  'BaseRate' ,
	displayCurrencyCode: true,
		    displayMode: 'AsControl',
    multiCurrency: isMultiCurrencyEnabled()	 //TODO: Move this method to Sage.IntegrationContractService.isMultiCurrencyEnabled()
}
  										          ],
        storeOptions: {
            resourceKind: 'ticketActivities',
            newItemParentReferenceProperty: 'Ticket',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'TicketActivitiesgrdTicketActivities_DataCarrier',
            sort: [
       { attribute: "AssignedDate"
     ,descending: true
     }
                    ]
        },
        tools: [
         ],
        contextualCondition: function() { return 'Ticket.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
				     slxContext: dojo.mixin({ tabId : 'TicketActivities' }, runtimeConfig),	   
				id : 'TicketActivitiesgrdTicketActivities',
        rowsPerPage: 20,
        singleClickEdit: true
    };

	
	var grid = new SLXPreviewGrid.Grid(options, 'TicketActivitiesgrdTicketActivities_Grid');
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
        setTimeout(function() { Sage.UI.Forms.TicketActivities.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();