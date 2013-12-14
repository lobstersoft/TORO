Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.TicketDefects = {

  

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
    
    if (typeof TicketDefectsgrdDefects_Strings === 'undefined') {
        TicketDefectsgrdDefects_Strings = {};
    }

    var options = {		
		        context: runtimeConfig,		
						previewField: 'Defect.DefectProblem.Notes',
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
    	field: 'Defect.DefectNumber',
				name:  TicketDefectsgrdDefects_Strings['grdDefects_a27fcbf1_eda2_4d7c_97b5_4991afda77f3_ColumnHeading']  || 'Defect Number',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'Defect'
    ,idField: 'Defect.$key'
 }
  	,
{
		field: 'Defect.CreateDate',
				name:  TicketDefectsgrdDefects_Strings['grdDefects_c979d17e_94af_476a_9590_64bb7659afae_ColumnHeading']  || 'Reported Date',
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
		field: 'Defect.PriorityCode',
				name:  TicketDefectsgrdDefects_Strings['grdDefects_df03034d_3803_4366_910c_caebf9fe5e18_ColumnHeading']  || 'Priority',
	sortable: false,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: PickList,
	pickListName: 'Defect Priority',		
	storageMode:  'id' ,
	displayMode: 'AsText'
}
  	,
{
		field: 'Defect.SeverityCode',
				name:  TicketDefectsgrdDefects_Strings['grdDefects_be120163_290b_4bf5_b836_bc6d5e3bb4eb_ColumnHeading']  || 'Severity',
	sortable: false,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: PickList,
	pickListName: 'Defect Severity',		
	storageMode:  'id' ,
	displayMode: 'AsText'
}
  	,
{
		field: 'Defect.StatusCode',
				name:  TicketDefectsgrdDefects_Strings['grdDefects_3806343b_0b0a_4f79_9e5b_b1daa45b624a_ColumnHeading']  || 'Status',
	sortable: false,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: PickList,
	pickListName: 'Defect Status',		
	storageMode:  'id' ,
	displayMode: 'AsText'
}
  	,
{
		field: 'Defect.Area',
				name:  TicketDefectsgrdDefects_Strings['grdDefects_92200584_0557_4984_853a_35a53f147669_ColumnHeading']  || 'Area',
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
		field: 'Defect.DefectSolution.Notes',
				name:  TicketDefectsgrdDefects_Strings['grdDefects_d1c5e38f_ac43_43eb_9df5_3d0bd4e02a8c_ColumnHeading']  || 'Resolution',
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
            resourceKind: 'defectTickets',
            newItemParentReferenceProperty: 'Ticket',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'TicketDefectsgrdDefects_DataCarrier',
            sort: [
    { attribute: "Defect.DefectNumber"
     }
                        ]
        },
        tools: [

 {
    id : 'TicketDefects_btnCreate',
  displayInInsert : false,
  imageClass: 'icon_plus_16x16',  'alternateText' : TicketDefectsgrdDefects_Strings['grdDefects_btnCreate_ToolTip'] || 'Create Defect...',
          'handler' : function() { location.href = "InsertDefect.aspx?modeid=Insert" }
}
  ,
{
  displayInInsert : false,
  type : 'Sage.UI.SDataLookup',
  controlConfig : 
{
  id : 'grdDefects_AddRelationTool',
  btnToolTip :  TicketDefectsgrdDefects_AddRelationTool_Strings['grdDefects_AddRelationTool_ButtonTooltip']  ||  'Associate Defect', 
  btnIcon:  '~/ImageResource.axd?scope=global&type=Global_Images&key=associate_16x16'  ,
  dialogButtonText : TicketDefectsgrdDefects_AddRelationTool_Strings['grdDefects_AddRelationTool_DialogButtonText']  ||  'Add Selected', 
  displayMode : 4, //$ {qf control . LookupDisplayMode}  When adding other dijit templates, need to convert control to use enum values
  dialogTitle : TicketDefectsgrdDefects_AddRelationTool_Strings['grdDefects_AddRelationTool_LookupDialogTitle']  ||  'Lookup Defect',
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
		   name: TicketDefectsgrdDefects_AddRelationTool_Strings['grdDefects_AddRelationTool_LookupProperties_DefectNumber_PropertyHeader']  || 'Defect Number',
		   field: 'DefectNumber',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 17,
		   sortable: true
         }
         ,
		 {
		   name: TicketDefectsgrdDefects_AddRelationTool_Strings['grdDefects_AddRelationTool_LookupProperties_Subject_PropertyHeader']  || 'Subject',
		   field: 'Subject',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 8,
		   sortable: true
         }
         ,
		 {
		   name: TicketDefectsgrdDefects_AddRelationTool_Strings['grdDefects_AddRelationTool_LookupProperties_DefectProblem_Notes_PropertyHeader']  || 'Defect Problem',
		   field: 'DefectProblem.Notes',
		   propertyType: 'System.String',
		   				   excludeFromFilters: true,		   
		   		   width: 8,
		   sortable: false
         }
         ,
		 {
		   name: TicketDefectsgrdDefects_AddRelationTool_Strings['grdDefects_AddRelationTool_LookupProperties_DefectSolution_Notes_PropertyHeader']  || 'Defect Solution',
		   field: 'DefectSolution.Notes',
		   propertyType: 'System.String',
		   				   excludeFromFilters: true,		   
		   		   width: 8,
		   sortable: false
         }
         ,
		 {
		   name: TicketDefectsgrdDefects_AddRelationTool_Strings['grdDefects_AddRelationTool_LookupProperties_AssignedTo_OwnerDescription_PropertyHeader']  || 'Assigned To',
		   field: 'AssignedTo.OwnerDescription',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 8,
		   sortable: true
         }
         ,
		 {
		   name: TicketDefectsgrdDefects_AddRelationTool_Strings['grdDefects_AddRelationTool_LookupProperties_Owner_OwnerDescription_PropertyHeader']  || 'Owner',
		   field: 'Owner.OwnerDescription',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 8,
		   sortable: true
         }
       ]      }    ],   storeOptions: {
            sort: [ { attribute: 'DefectNumber' } ],    
    resourceKind : 'defects',
	select : ['DefectNumber','Subject','DefectProblem.Notes','DefectSolution.Notes','AssignedTo.OwnerDescription','Owner.OwnerDescription']
  },
  gridOptions: {
		    selectionMode : 'Multi',
    rowsPerPage : 15
  }

} // end of sdata lookup config object

}
  ,
{
    id : 'TicketDefects_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : TicketDefectsgrdDefects_Strings['grdDefects_Delete_ToolTip'] || 'Remove',
          'handler' : function() { this.deleteSelected(); }
}
           ],
        contextualCondition: function() { return 'Ticket.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
				     slxContext: dojo.mixin({ tabId : 'TicketDefects' }, runtimeConfig),	   
				id : 'TicketDefectsgrdDefects',
        rowsPerPage: 20,
        singleClickEdit: true
    };

	
	var grid = new SLXPreviewGrid.Grid(options, 'TicketDefectsgrdDefects_Grid');
	    window.setTimeout(function () { grid.startup(); }, 1);
	aspect.after(grid, 'startup', function () {
		// This is not a typo.  The dijit.layout.ContentPane is not affectively determining all of it's layout information
		// on the first pass through resize.  Calling resize twice effectively renders the grid to fill it's container.
		var localTC = dijit.byId('tabContent');
		localTC.resize(); localTC.resize();
	});
      var lup = dijit.byId('grdDefects_AddRelationTool');
    if (lup) {
      lup.doSelected = function (items) {
        var grid = dijit.byId('TicketDefectsgrdDefects');        
        grid.addAssociatedItems(items, "Ticket", "Defect", lup);
      };
    }
    
});
}

  ,

    init : function(runtimeConfig) {
        setTimeout(function() { Sage.UI.Forms.TicketDefects.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();