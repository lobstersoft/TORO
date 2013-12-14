Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.AccountLiteratureRequests = {

  

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
    
    if (typeof AccountLiteratureRequestsgrdLitRequests_Strings === 'undefined') {
        AccountLiteratureRequestsgrdLitRequests_Strings = {};
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
				name:  AccountLiteratureRequestsgrdLitRequests_Strings['grdLitRequests_72f0dac8_3353_4abe_a332_b905fd256640_ColumnHeading']  || 'Request Date',
	sortable: true,
		width: 10,
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
    	field: 'Contact.NameLF',
				name:  AccountLiteratureRequestsgrdLitRequests_Strings['grdLitRequests_8c2a9e41_44eb_4ee8_bb10_12624c7ba571_ColumnHeading']  || 'Contact',
	sortable: true,
		width: 14,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'Contact'
    ,idField: 'Contact.$key'
 }
  	,
{
		field: 'RequestUser.UserInfo.UserName',
				name:  AccountLiteratureRequestsgrdLitRequests_Strings['grdLitRequests_aeecc6e1_3d8b_460c_bab9_23dbea9deb47_ColumnHeading']  || 'Request User',
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
				name:  AccountLiteratureRequestsgrdLitRequests_Strings['grdLitRequests_56a8cf11_1aa2_4252_814c_74a1f2eea63e_ColumnHeading']  || 'Description',
	sortable: true,
		width: '10',
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
				name:  AccountLiteratureRequestsgrdLitRequests_Strings['grdLitRequests_e7610a78_b7b7_4ca2_9dfd_a792c25a64fa_ColumnHeading']  || 'Send Via',
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
				name:  AccountLiteratureRequestsgrdLitRequests_Strings['grdLitRequests_75d2bdc6_ca3f_4569_adcd_63656e0b25a9_ColumnHeading']  || 'Priority',
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
            newItemParentReferenceProperty: 'Contact.Account',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'AccountLiteratureRequestsgrdLitRequests_DataCarrier',
            sort: [
                     ]
        },
        tools: [
         ],
        contextualCondition: function() { return 'Contact.Account.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'AccountLiteratureRequests',
		gridNodeId: 'AccountLiteratureRequestsgrdLitRequests_Grid',
				id : 'AccountLiteratureRequestsgrdLitRequests',
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
        setTimeout(function() { Sage.UI.Forms.AccountLiteratureRequests.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();