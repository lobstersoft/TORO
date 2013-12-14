Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.OpportunityContacts = {

  

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
    
    if (typeof OpportunityContactsgrdContacts_Strings === 'undefined') {
        OpportunityContactsgrdContacts_Strings = {};
    }

    var options = {		
		        context: runtimeConfig,		
		        noDataMessage: OpportunityContactsgrdContacts_Strings['grdContacts_EmptyTableRowText']  ||  'No records match the selection criteria.', 
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
				    //Set to the value of the visibleCondition property
	    hidden: function () {
    if (Sage.Utility.getModeId() === 'insert') {
        return true;
    }
}(),
		name:  OpportunityContactsgrdContacts_Strings['grdContacts_ebb97896_7b49_4f42_841e_b0691c7082ef_ColumnHeading']  || '',
	sortable: false,
		width: 4,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	   	type: SlxEdit,
		cellValue: OpportunityContactsgrdContacts_Strings['grdContacts_ebb97896_7b49_4f42_841e_b0691c7082ef_Text']  || '',
		entityType: 'Sage.Entity.Interfaces.IOpportunityContact, Sage.Entity.Interfaces',
		smartPart: 'EditOpportunityContact',
		dialogTitle: OpportunityContactsgrdContacts_Strings['cb2b003f_bb83_4f79_ae29_9a7df36aae9d_DialogTitleOverride'] || '',
		isCentered: true ,
		dialogTop: 0,
		dialogLeft: 0,
		dialogHeight: 400,
		dialogWidth: 750,
    	formObjectName: 'Sage.UI.Forms.OpportunityContacts'
    				,appliedSecurity: 'Entities/Opportunity/Edit'
    	    }
  	,
{ 
    	field: 'Contact.NameLF',
				name:  OpportunityContactsgrdContacts_Strings['grdContacts_4d2f53cb_d5a8_4b35_a692_52338cc459e8_ColumnHeading']  || 'Contact',
	sortable: true,
		width: 12,
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
		field: 'Contact.Title',
				name:  OpportunityContactsgrdContacts_Strings['grdContacts_8d492f7c_a115_4e0a_b392_c39eae576428_ColumnHeading']  || 'Title',
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
		field: 'SalesRole',
				name:  OpportunityContactsgrdContacts_Strings['grdContacts_c3b7f9ef_e728_4e71_91f9_cfed1ad93e97_ColumnHeading']  || 'Role',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: PickList,
	pickListName: 'Role',		
	storageMode:  'text' ,
	displayMode: 'AsText'
}
  	,
{
		field: 'IsPrimary',
				name:  OpportunityContactsgrdContacts_Strings['grdContacts_0b348cda_aed0_4447_97a0_2cf9a75fc7e5_ColumnHeading']  || 'Primary',
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
		field: 'Contact.WorkPhone',
				name:  OpportunityContactsgrdContacts_Strings['grdContacts_53466a16_c110_4cc9_a255_766895b39c4a_ColumnHeading']  || 'Phone',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	editable: false,
	type: Phone
}
  	,
{
		field: 'Contact.Email',
				name:  OpportunityContactsgrdContacts_Strings['grdContacts_9134df93_3411_44af_9c46_0be921f191ab_ColumnHeading']  || 'E-Mail',
	sortable: true,
		width: 12,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	editable: false,
	type: Email
}
  	          ],
        storeOptions: {
            resourceKind: 'opportunityContacts',
            newItemParentReferenceProperty: 'Opportunity',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'OpportunityContactsgrdContacts_DataCarrier',
            sort: [
     { attribute: "Contact.LastName"
     }
                       ]
        },
        tools: [

{
    id : 'OpportunityContacts_Save',
  displayInInsert : false,
  imageClass: 'icon_Save_16x16',  'alternateText' : OpportunityContactsgrdContacts_Strings['grdContacts_Save_ToolTip'] || 'Save',
     appliedSecurity : 'Entities/Opportunity/Edit',     'handler' : function() {
    this.saveChanges(function () { if (Sage.Utility.getModeId() !== 'insert') { __doPostBack('MainContent', ''); } });
 }
}
  ,
{
  displayInInsert : true,
  type : 'Sage.UI.SDataLookup',
  controlConfig : 
{
  id : 'lueAddContact',
  btnToolTip :  OpportunityContactslueAddContact_Strings['lueAddContact_ButtonTooltip']  ||  'Include Contact', 
  btnIcon:  '~/ImageResource.axd?scope=global&type=Global_Images&key=plus_16x16'  ,
  dialogButtonText : OpportunityContactslueAddContact_Strings['lueAddContact_DialogButtonText']  ||  'Add Selected', 
  displayMode : 4, //$ {qf control . LookupDisplayMode}  When adding other dijit templates, need to convert control to use enum values
  dialogTitle : OpportunityContactslueAddContact_Strings['lueAddContact_LookupDialogTitle']  ||  'Lookup Contact',
      structure : [
     {
       defaultCell: { width: 8, editable: false, styles: 'text-align: left;' },
       cells: [
	       {
        field: '$key',
        editable: false,
        hidden: true,
        id: 'id',
		excludeFromFilters: true,
        formatter: function (value, rowIdx, grid) {
            var anchor = ['<div id=', value, ' >', value, '</ div>'].join('');
		return anchor;
        }
    },
          
		 {
		   name: OpportunityContactslueAddContact_Strings['lueAddContact_LookupProperties_NameLF_PropertyHeader']  || 'Name',
		   field: 'NameLF',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 17,
		   sortable: true
         }
         ,
		 {
		   name: OpportunityContactslueAddContact_Strings['lueAddContact_LookupProperties_Title_PropertyHeader']  || 'Title',
		   field: 'Title',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 8,
		   sortable: true
         }
         ,
		 {
		   name: OpportunityContactslueAddContact_Strings['lueAddContact_LookupProperties_AccountName_PropertyHeader']  || 'Account Name',
		   field: 'AccountName',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 8,
		   sortable: true
         }
         ,
		 {
		   name: OpportunityContactslueAddContact_Strings['lueAddContact_LookupProperties_Address_City_PropertyHeader']  || 'City',
		   field: 'Address.City',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 8,
		   sortable: true
         }
         ,
		 {
		   name: OpportunityContactslueAddContact_Strings['lueAddContact_LookupProperties_Address_State_PropertyHeader']  || 'State',
		   field: 'Address.State',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 8,
		   sortable: true
         }
         ,
		 {
		   name: OpportunityContactslueAddContact_Strings['lueAddContact_LookupProperties_WorkPhone_PropertyHeader']  || 'Phone',
		   field: 'WorkPhone',
		   propertyType: 'System.String',
		   				   type: Sage.Utility.SDataLookup.setFormatType({
		             propertyFormat: 'Phone'
		        }),
				   excludeFromFilters: false,		   
		   		   width: 8,
		   sortable: true
         }
         ,
		 {
		   name: OpportunityContactslueAddContact_Strings['lueAddContact_LookupProperties_Email_PropertyHeader']  || 'Email',
		   field: 'Email',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 8,
		   sortable: true
         }
       ]      }    ],   storeOptions: {
            sort: [ { attribute: 'NameLF' } ],    
    resourceKind : 'contacts',
	select : ['NameLF','Title','AccountName','Address.City','Address.State','WorkPhone','Email']
  },
  gridOptions: {
		    selectionMode : 'Multi',
    rowsPerPage : 15
  }

} // end of sdata lookup config object

}
  ,
{
    id : 'OpportunityContacts_Cancel',
  displayInInsert : false,
  imageClass: 'icon_Reset_16x16',  'alternateText' : OpportunityContactsgrdContacts_Strings['grdContacts_Cancel_ToolTip'] || 'Revert Changes',
          'handler' : function() { this.cancelChanges(); }
}
  ,
{
    id : 'OpportunityContacts_Delete',
  displayInInsert : true,
  imageClass: 'icon_Delete_16x16',  'alternateText' : OpportunityContactsgrdContacts_Strings['grdContacts_Delete_ToolTip'] || 'Remove Selected Contacts',
     appliedSecurity : 'Entities/Opportunity/Delete',      'handler' : function() { this.deleteSelected(function () { if (Sage.Utility.getModeId() !== 'insert') { __doPostBack('MainContent', ''); } }); }
}
           ],
        contextualCondition: function() { return 'Opportunity.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'OpportunityContacts',
		gridNodeId: 'OpportunityContactsgrdContacts_Grid',
				id : 'OpportunityContactsgrdContacts',
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
      var lup = dijit.byId('lueAddContact');
    if (lup) {
      lup.doSelected = function (items) {
        var grid = dijit.byId('OpportunityContactsgrdContacts');        
        grid.addAssociatedItems(items, "Opportunity", "Contact", lup);
      };
    }
     
});
}

  ,

    init : function(runtimeConfig) {
        setTimeout(function() { Sage.UI.Forms.OpportunityContacts.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();