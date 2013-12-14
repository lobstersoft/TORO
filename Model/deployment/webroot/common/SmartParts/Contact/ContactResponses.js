Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.ContactResponses = {

  

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
    
    if (typeof ContactResponsesgrdContactResponses_Strings === 'undefined') {
        ContactResponsesgrdContactResponses_Strings = {};
    }

    var options = {		
		        context: runtimeConfig,		
		        noDataMessage: ContactResponsesgrdContactResponses_Strings['grdContactResponses_EmptyTableRowText']  ||  'No records match the selection criteria.', 
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
				name:  ContactResponsesgrdContactResponses_Strings['grdContactResponses_591535e9_5451_4587_927f_8b638ebd0d94_ColumnHeading']  || '',
	sortable: false,
		width: 3,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	   	type: SlxEdit,
		cellValue: ContactResponsesgrdContactResponses_Strings['grdContactResponses_591535e9_5451_4587_927f_8b638ebd0d94_Text']  || 'Edit',
		entityType: 'Sage.Entity.Interfaces.ITargetResponse, Sage.Entity.Interfaces',
		smartPart: 'AddEditTargetResponse',
		dialogTitle: ContactResponsesgrdContactResponses_Strings['5a83cf45_9c4c_4203_8bc4_70a4084121ee_DialogTitleOverride'] || 'Edit Response',
		isCentered: true ,
		dialogTop: 0,
		dialogLeft: 0,
		dialogHeight: 550,
		dialogWidth: 800,
    	formObjectName: 'Sage.UI.Forms.ContactResponses'
    	    }
  	,
{
		field: 'ResponseDate',
				name:  ContactResponsesgrdContactResponses_Strings['grdContactResponses_29477564_fdbf_4146_bee3_f460d04b2985_ColumnHeading']  || 'Response Date',
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
		field: 'Interest',
				name:  ContactResponsesgrdContactResponses_Strings['grdContactResponses_16dd03c6_e97c_451c_8b48_37d26897904c_ColumnHeading']  || 'Interest',
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
		field: 'Status',
				name:  ContactResponsesgrdContactResponses_Strings['grdContactResponses_030bd65a_3778_408e_975f_25699680bb0c_ColumnHeading']  || 'Status',
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
		field: 'InterestLevel',
				name:  ContactResponsesgrdContactResponses_Strings['grdContactResponses_8ac77e05_47e4_4671_893d_90bb65fb2cfa_ColumnHeading']  || 'Interest Level',
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
				name:  ContactResponsesgrdContactResponses_Strings['grdContactResponses_1772a2cd_316e_4674_9d68_f615d4a08347_ColumnHeading']  || 'Lead Source',
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
    	field: 'Campaign.CampaignName',
				name:  ContactResponsesgrdContactResponses_Strings['grdContactResponses_001e1312_12f3_4fa2_952d_3284b022b0d4_ColumnHeading']  || 'Campaign',
	sortable: true,
		width: '10',
	 	styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'Campaign'
    ,idField: 'Campaign.$key'
 }
  	          ],
        storeOptions: {
            resourceKind: 'targetResponses',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'ContactResponsesgrdContactResponses_DataCarrier',
            sort: [
                      ]
        },
        tools: [

{
    id : 'ContactResponses_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : ContactResponsesgrdContactResponses_Strings['grdContactResponses_Delete_ToolTip'] || 'Remove',
       mergePosition : 'After',   mergeControlId : 'btnAdd',  'handler' : function() { this.deleteSelected(); }
}
           ],
        contextualCondition: function() { return "CampaignTarget.EntityId eq '" + Sage.Utility.getCurrentEntityId() + "'" },
        
						tabId : 'ContactResponses',
		gridNodeId: 'ContactResponsesgrdContactResponses_Grid',
				id : 'ContactResponsesgrdContactResponses',
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
        setTimeout(function() { Sage.UI.Forms.ContactResponses.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();