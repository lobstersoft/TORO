Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.StandardResolutions = {

  

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
    
    if (typeof StandardResolutionsgrdResolutions_Strings === 'undefined') {
        StandardResolutionsgrdResolutions_Strings = {};
    }

    var options = {		
		        context: runtimeConfig,		
						previewField: 'TicketSolutionType.Notes',
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
    	field: 'TicketSolutionType.Description',
				name:  StandardResolutionsgrdResolutions_Strings['grdResolutions_030a57a3_a7fd_417c_9651_f11d8eb509d2_ColumnHeading']  || 'Description',
	sortable: true,
		width: 20,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'TicketSolutionType'
    ,idField: 'TicketSolutionType.$key'
 }
  	,
{
		field: 'TicketSolutionType.Notes',
				name:  StandardResolutionsgrdResolutions_Strings['grdResolutions_de8ad268_5d40_4cea_8f91_d13ca741b72e_ColumnHeading']  || 'Notes',
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
            resourceKind: 'ticketProblemSolutionTypes',
            newItemParentReferenceProperty: 'TicketProblemType',
            include: [],
            select: ['TicketSolutionType.Id'],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'StandardResolutionsgrdResolutions_DataCarrier',
            sort: [
    { attribute: "TicketSolutionType.Description"
     }
                   ]
        },
        tools: [

{
  displayInInsert : false,
  type : 'Sage.UI.SDataLookup',
  controlConfig : 
{
  id : 'grdResolutions_AddRelationTool',
  btnToolTip :  StandardResolutionsgrdResolutions_AddRelationTool_Strings['grdResolutions_AddRelationTool_ButtonTooltip']  ||  'Associate Resolution', 
  btnIcon:  '~/ImageResource.axd?scope=global&type=Global_Images&key=plus_16x16'  ,
  dialogButtonText : StandardResolutionsgrdResolutions_AddRelationTool_Strings['grdResolutions_AddRelationTool_DialogButtonText']  ||  'Add Selected', 
  displayMode : 4, //$ {qf control . LookupDisplayMode}  When adding other dijit templates, need to convert control to use enum values
  dialogTitle : StandardResolutionsgrdResolutions_AddRelationTool_Strings['grdResolutions_AddRelationTool_LookupDialogTitle']  ||  'Lookup Standard Resolution',
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
		   name: StandardResolutionsgrdResolutions_AddRelationTool_Strings['grdResolutions_AddRelationTool_LookupProperties_Description_PropertyHeader']  || 'Description',
		   field: 'Description',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 17,
		   sortable: true
         }
         ,
		 {
		   name: StandardResolutionsgrdResolutions_AddRelationTool_Strings['grdResolutions_AddRelationTool_LookupProperties_Notes_PropertyHeader']  || 'Notes',
		   field: 'Notes',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 36,
		   sortable: true
         }
       ]      }    ],   storeOptions: {
            sort: [ { attribute: 'Description' } ],    
    resourceKind : 'ticketSolutionTypes',
	select : ['Description','Notes']
  },
  gridOptions: {
		    selectionMode : 'Multi',
    rowsPerPage : 15
  }

} // end of sdata lookup config object

}
  ,
{
    id : 'StandardResolutions_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : StandardResolutionsgrdResolutions_Strings['grdResolutions_Delete_ToolTip'] || 'Remove',
          'handler' : function() { this.deleteSelected(); }
}
           ],
        contextualCondition: function() { return 'TicketProblemType.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
				     slxContext: dojo.mixin({ tabId : 'StandardResolutions' }, runtimeConfig),	   
				id : 'StandardResolutionsgrdResolutions',
        rowsPerPage: 20,
        singleClickEdit: true
    };

	
	var grid = new SLXPreviewGrid.Grid(options, 'StandardResolutionsgrdResolutions_Grid');
	    window.setTimeout(function () { grid.startup(); }, 1);
	aspect.after(grid, 'startup', function () {
		// This is not a typo.  The dijit.layout.ContentPane is not affectively determining all of it's layout information
		// on the first pass through resize.  Calling resize twice effectively renders the grid to fill it's container.
		var localTC = dijit.byId('tabContent');
		localTC.resize(); localTC.resize();
	});
     var lup = dijit.byId('grdResolutions_AddRelationTool');
    if (lup) {
      lup.doSelected = function (items) {
        var grid = dijit.byId('StandardResolutionsgrdResolutions');        
        grid.addAssociatedItems(items, "TicketProblemType", "TicketSolutionType", lup);
      };
    }
    
});
}

  ,

    init : function(runtimeConfig) {
        setTimeout(function() { Sage.UI.Forms.StandardResolutions.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();