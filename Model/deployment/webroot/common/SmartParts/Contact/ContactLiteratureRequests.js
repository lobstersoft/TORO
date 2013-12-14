Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.ContactLiteratureRequests = {

  

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
    
    if (typeof ContactLiteratureRequestsgrdLitRequests_Strings === 'undefined') {
        ContactLiteratureRequestsgrdLitRequests_Strings = {};
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
    	field: 'RequestDate',
				name:  ContactLiteratureRequestsgrdLitRequests_Strings['grdLitRequests_e7f469f0_3d94_4372_95f8_b4f0d40fbda0_ColumnHeading']  || 'Request Date',
	sortable: true,
		width: '10',
	 	styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'LitRequest'
    ,idField: '$key'
 }
  	,
{
		field: 'RequestUser.UserInfo.UserName',
				name:  ContactLiteratureRequestsgrdLitRequests_Strings['grdLitRequests_aeecc6e1_3d8b_460c_bab9_23dbea9deb47_ColumnHeading']  || 'Request User',
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
		field: 'Description',
				name:  ContactLiteratureRequestsgrdLitRequests_Strings['grdLitRequests_5d2f6e8d_d1e6_468a_9c60_635418083989_ColumnHeading']  || 'Description',
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
		field: 'SendVia',
				name:  ContactLiteratureRequestsgrdLitRequests_Strings['grdLitRequests_e7610a78_b7b7_4ca2_9dfd_a792c25a64fa_ColumnHeading']  || 'Send Via',
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
				name:  ContactLiteratureRequestsgrdLitRequests_Strings['grdLitRequests_75d2bdc6_ca3f_4569_adcd_63656e0b25a9_ColumnHeading']  || 'Priority',
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
            resourceKind: 'litRequests',
            newItemParentReferenceProperty: 'Contact',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'ContactLiteratureRequestsgrdLitRequests_DataCarrier',
            sort: [
                    ]
        },
        tools: [
         ],
        contextualCondition: function() { return 'Contact.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'ContactLiteratureRequests',
		gridNodeId: 'ContactLiteratureRequestsgrdLitRequests_Grid',
				id : 'ContactLiteratureRequestsgrdLitRequests',
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
        setTimeout(function() { Sage.UI.Forms.ContactLiteratureRequests.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();