Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.AccountResponses = {

  

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
    
    if (typeof AccountResponsesgrdResponses_Strings === 'undefined') {
        AccountResponsesgrdResponses_Strings = {};
    }

    var options = {		
		        context: runtimeConfig,		
		        noDataMessage: AccountResponsesgrdResponses_Strings['grdResponses_EmptyTableRowText']  ||  'No records match the selection criteria.', 
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
				name:  AccountResponsesgrdResponses_Strings['grdResponses_7b0f684c_ad48_4a0b_9a91_885995c698e6_ColumnHeading']  || '',
	sortable: false,
		width: 3,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	   	type: SlxEdit,
		cellValue: AccountResponsesgrdResponses_Strings['grdResponses_7b0f684c_ad48_4a0b_9a91_885995c698e6_Text']  || 'Edit',
		entityType: 'Sage.Entity.Interfaces.ITargetResponse, Sage.Entity.Interfaces',
		smartPart: 'AddEditTargetResponse',
		dialogTitle: AccountResponsesgrdResponses_Strings['813cfef8_17e7_4aab_93df_42d4cad331d7_DialogTitleOverride'] || 'Edit Response',
		isCentered: true ,
		dialogTop: 0,
		dialogLeft: 0,
		dialogHeight: 600,
		dialogWidth: 800,
    	formObjectName: 'Sage.UI.Forms.AccountResponses'
    	    }
  	,
{ 
    	field: 'Contact.NameLF',
				name:  AccountResponsesgrdResponses_Strings['grdResponses_dec5bb94_152c_4726_ae75_ffc0691742aa_ColumnHeading']  || 'Contact',
	sortable: true,
		width: 15,
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
		field: 'ResponseDate',
				name:  AccountResponsesgrdResponses_Strings['grdResponses_235f513a_11aa_4c76_92a9_0501b38a5e4a_ColumnHeading']  || 'Response Date',
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
		field: 'Interest',
				name:  AccountResponsesgrdResponses_Strings['grdResponses_cc52fa5d_c79a_4a54_b50b_f6a81b9885d8_ColumnHeading']  || 'Interest',
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
		field: 'Status',
				name:  AccountResponsesgrdResponses_Strings['grdResponses_5dbb5e30_846c_4968_993c_04abca77903a_ColumnHeading']  || 'Status',
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
		field: 'InterestLevel',
				name:  AccountResponsesgrdResponses_Strings['grdResponses_be218a1f_3f44_4d47_9ae1_4b2a82a76da7_ColumnHeading']  || 'Interest Level',
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
		field: 'LeadSource',
				name:  AccountResponsesgrdResponses_Strings['grdResponses_4da2d8c3_4f66_4bbb_8b61_c637107bfc3f_ColumnHeading']  || 'Lead Source',
	sortable: true,
		width: 13,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	,
{
		field: 'Campaign.CampaignName',
				name:  AccountResponsesgrdResponses_Strings['grdResponses_f5061018_ffad_45e0_ae6c_1f1243b6cf6c_ColumnHeading']  || 'Campaign',
	sortable: true,
		width: 15,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	          ],
        storeOptions: {
            resourceKind: 'targetResponses',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'AccountResponsesgrdResponses_DataCarrier',
            sort: [
                       ]
        },
        tools: [

{
    id : 'AccountResponses_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : AccountResponsesgrdResponses_Strings['grdResponses_Delete_ToolTip'] || 'Remove',
       mergePosition : 'After',   mergeControlId : 'btnAdd',  'handler' : function() { this.deleteSelected(); }
}
           ],
        contextualCondition: function() { 
  return "Contact.Account.Id eq'" + Sage.Utility.getCurrentEntityId() + "'";
},
        
						tabId : 'AccountResponses',
		gridNodeId: 'AccountResponsesgrdResponses_Grid',
				id : 'AccountResponsesgrdResponses',
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
        setTimeout(function() { Sage.UI.Forms.AccountResponses.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();