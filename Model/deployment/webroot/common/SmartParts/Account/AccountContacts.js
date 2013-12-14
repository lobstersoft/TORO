Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.AccountContacts = {

  

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
    
    if (typeof AccountContactsgrdContacts_Strings === 'undefined') {
        AccountContactsgrdContacts_Strings = {};
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
    	field: 'NameLF',
				name:  AccountContactsgrdContacts_Strings['grdContacts_10d885e5_3fb4_4984_b9bb_80c18b9328ec_ColumnHeading']  || 'Name',
	sortable: true,
		width: '10',
	 	styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'Contact'
    ,idField: '$key'
 }
  	,
{
		field: 'IsPrimary',
				name:  AccountContactsgrdContacts_Strings['grdContacts_c41d5d37_4319_49f9_88de_b21dd1d0b16c_ColumnHeading']  || 'Primary',
	sortable: true,
		width: 6,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: CheckBox,
	defaultValue: "x"   }
  	,
{
		field: 'WorkPhone',
				name:  AccountContactsgrdContacts_Strings['grdContacts_41bb1751_36a5_46cf_9198_43cc531a3cd1_ColumnHeading']  || 'Work Phone',
	sortable: true,
		width: '10',
	 	styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	editable: true,
	type: Phone
}
  	,
{
		field: 'Email',
				name:  AccountContactsgrdContacts_Strings['grdContacts_45ced659_1a1a_499c_a285_c81037121f46_ColumnHeading']  || 'Email',
	sortable: true,
		width: '10',
	 	styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	editable: true,
	type: Email
}
  	,
{
		field: 'Title',
				name:  AccountContactsgrdContacts_Strings['grdContacts_421bd512_8d4c_46c6_991a_f9f1cb0f4761_ColumnHeading']  || 'Title',
	sortable: true,
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
		field: 'Address.City',
				name:  AccountContactsgrdContacts_Strings['grdContacts_41801972_a525_4bec_ba50_c39a1becfdab_ColumnHeading']  || 'City',
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
		field: 'Address.State',
				name:  AccountContactsgrdContacts_Strings['grdContacts_0570e9b7_d850_4b94_9d6b_aa925c0e71da_ColumnHeading']  || 'State',
	sortable: true,
		width: 4,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	,
{
		field: 'Type',
				name:  AccountContactsgrdContacts_Strings['grdContacts_b0797739_f9b8_4191_80d0_f5ab72498f4e_ColumnHeading']  || 'Type',
	sortable: true,
		width: 5,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	,
{
		field: 'Department',
				name:  AccountContactsgrdContacts_Strings['grdContacts_0a4b0474_13d7_4742_8a38_9740f1c970d4_ColumnHeading']  || 'Department',
	sortable: true,
		width: 6,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	          ],
        storeOptions: {
            resourceKind: 'contacts',
            newItemParentReferenceProperty: 'Account',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'AccountContactsgrdContacts_DataCarrier',
            sort: [
    { attribute: "LastName"
     }
       , { attribute: "WorkPhone"
     }
                        ]
        },
        tools: [
         ],
        contextualCondition: function() { return 'Account.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'AccountContacts',
		gridNodeId: 'AccountContactsgrdContacts_Grid',
				id : 'AccountContactsgrdContacts',
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
        setTimeout(function() { Sage.UI.Forms.AccountContacts.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();