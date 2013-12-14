Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.ContactLeadSources = {

  

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
    
    if (typeof ContactLeadSourcesgrdLeadsources_Strings === 'undefined') {
        ContactLeadSourcesgrdLeadsources_Strings = {};
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
				name:  ContactLeadSourcesgrdLeadsources_Strings['grdLeadsources_695d6166_3a4c_4926_aedc_0b03745f94da_ColumnHeading']  || '',
	sortable: false,
		width: 7,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	   	type: SlxEdit,
		cellValue: ContactLeadSourcesgrdLeadsources_Strings['grdLeadsources_695d6166_3a4c_4926_aedc_0b03745f94da_Text']  || 'Edit',
		entityType: 'Sage.Entity.Interfaces.IContactLeadSource, Sage.Entity.Interfaces',
		smartPart: 'AddEditContactLeadSource',
		dialogTitle: ContactLeadSourcesgrdLeadsources_Strings['70d484a4_a0c1_4788_92d9_c1c5394d6b4a_DialogTitleOverride'] || '',
		isCentered: true ,
		dialogTop: 0,
		dialogLeft: 0,
		dialogHeight: 275,
		dialogWidth: 600,
    	formObjectName: 'Sage.UI.Forms.ContactLeadSources'
    	    }
  	,
{
		field: 'LeadDate',
				name:  ContactLeadSourcesgrdLeadsources_Strings['grdLeadsources_8ce544ef_0153_4964_8859_07c43d667321_ColumnHeading']  || 'Lead Date',
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
		field: 'LeadSource.Description',
				name:  ContactLeadSourcesgrdLeadsources_Strings['grdLeadsources_e6f3ffc9_c775_4bd4_b5bb_283f28b8789a_ColumnHeading']  || 'Description',
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
		field: 'LeadSource.AbbrevDescription',
				name:  ContactLeadSourcesgrdLeadsources_Strings['grdLeadsources_1235ec31_bc8e_490c_942b_17d94e9b0ac8_ColumnHeading']  || 'Source Code',
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
		field: 'LeadSource.SourceDate',
				name:  ContactLeadSourcesgrdLeadsources_Strings['grdLeadsources_d221bbda_fea3_4a1a_8b15_f27ee1a813f7_ColumnHeading']  || 'Source Date',
	sortable: true,
		width: 12,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	dateOnly: true,
		type: DateTime
}
  	          ],
	 	         storeOptions: {
            resourceKind: 'contactLeadSources',
            newItemParentReferenceProperty: 'Contact',
            include: ['Contact','LeadSource'],
            select: ['Id'],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'ContactLeadSourcesgrdLeadsources_DataCarrier',
            sort: [
     { attribute: "LeadDate"
     }
                     ]
        },
        tools: [

 {
    id : 'ContactLeadSources_btnAddLeadSource',
  displayInInsert : false,
  imageClass: 'icon_plus_16x16',  'alternateText' : ContactLeadSourcesgrdLeadsources_Strings['grdLeadsources_btnAddLeadSource_ToolTip'] || 'Add Lead Source',
          'handler' : function() {
Sage.ClientLinkHandler.request({request: 'ShowDialog', type: 'Sage.Entity.Interfaces.IContactLeadSource, Sage.Entity.Interfaces', 
   isCentered: true, dialogHeight: 275, dialogWidth: 600, smartPart: 'AddEditContactLeadSource'});
}
}
  ,
{
    id : 'ContactLeadSources_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : ContactLeadSourcesgrdLeadsources_Strings['grdLeadsources_Delete_ToolTip'] || 'Remove',
          'handler' : function() { this.deleteSelected(); }
}
           ],
        contextualCondition: function() { return 'Contact.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'ContactLeadSources',
		gridNodeId: 'ContactLeadSourcesgrdLeadsources_Grid',
				id : 'ContactLeadSourcesgrdLeadsources',
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
        setTimeout(function() { Sage.UI.Forms.ContactLeadSources.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();