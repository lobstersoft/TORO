Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.LeadResponses = {

  

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
    
    if (typeof LeadResponsesgrdLeadResponses_Strings === 'undefined') {
        LeadResponsesgrdLeadResponses_Strings = {};
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
    			field: '',
				name:  LeadResponsesgrdLeadResponses_Strings['grdLeadResponses_7682d31e_586d_4d11_938e_b1d1993f9473_ColumnHeading']  || '',
	sortable: false,
		width: 8,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	   	type: SlxEdit,
		cellValue: LeadResponsesgrdLeadResponses_Strings['grdLeadResponses_7682d31e_586d_4d11_938e_b1d1993f9473_Text']  || '',
		entityType: 'Sage.Entity.Interfaces.ITargetResponse, Sage.Entity.Interfaces',
		smartPart: 'AddEditTargetResponse',
		dialogTitle: LeadResponsesgrdLeadResponses_Strings['617b157e_4487_4efe_bb8b_4b3bbd93e502_DialogTitleOverride'] || 'Edit Response',
		isCentered: true ,
		dialogTop: 0,
		dialogLeft: 0,
		dialogHeight: 550,
		dialogWidth: 800,
    	formObjectName: 'Sage.UI.Forms.LeadResponses'
    	    }
  	,
{
		field: 'ResponseDate',
				name:  LeadResponsesgrdLeadResponses_Strings['grdLeadResponses_900ce248_d5d4_4759_b2c0_67207e1243d8_ColumnHeading']  || 'Response Date',
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
				name:  LeadResponsesgrdLeadResponses_Strings['grdLeadResponses_c1ca32c0_0234_4113_ba5a_cf8a28e2a831_ColumnHeading']  || 'Interest',
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
				name:  LeadResponsesgrdLeadResponses_Strings['grdLeadResponses_61198b31_25b1_49fa_9599_887975a70317_ColumnHeading']  || 'Status',
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
				name:  LeadResponsesgrdLeadResponses_Strings['grdLeadResponses_f112f065_f9ed_4efb_ab19_243f175e46ec_ColumnHeading']  || 'Interest Level',
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
		field: 'LeadSource',
				name:  LeadResponsesgrdLeadResponses_Strings['grdLeadResponses_6f59b7d7_f86e_48a1_bdcd_d9b306e2a3e2_ColumnHeading']  || 'Lead Source',
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
				name:  LeadResponsesgrdLeadResponses_Strings['grdLeadResponses_32652b96_3a37_4bf0_9b4b_116c78bf41f6_ColumnHeading']  || 'Campaign',
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
            dataCarrierId: 'LeadResponsesgrdLeadResponses_DataCarrier',
            sort: [
     { attribute: "ResponseDate"
     }
                       ]
        },
        tools: [

{
    id : 'LeadResponses_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : LeadResponsesgrdLeadResponses_Strings['grdLeadResponses_Delete_ToolTip'] || 'Remove',
       mergePosition : 'After',   mergeControlId : 'btnAddResponse',  'handler' : function() { this.deleteSelected(); }
}
           ],
        contextualCondition: function() { return "CampaignTarget.EntityId eq '" + Sage.Utility.getCurrentEntityId() + "'" },
        
						tabId : 'LeadResponses',
		gridNodeId: 'LeadResponsesgrdLeadResponses_Grid',
				id : 'LeadResponsesgrdLeadResponses',
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
        setTimeout(function() { Sage.UI.Forms.LeadResponses.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();