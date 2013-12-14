Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.StandardProblems = {

  

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
    
    if (typeof StandardProblemsQFSDataGrid_Strings === 'undefined') {
        StandardProblemsQFSDataGrid_Strings = {};
    }

    var options = {		
		        context: runtimeConfig,		
						previewField: 'TicketProblemType.Notes',
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
    	field: 'TicketProblemType.Description',
				name:  StandardProblemsQFSDataGrid_Strings['QFSDataGrid_40f3fb19_647e_49a3_8729_111e27ef8fb5_ColumnHeading']  || 'Description',
	sortable: true,
		width: 20,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'TicketProblemType'
    ,idField: 'TicketProblemType.$key'
 }
  	,
{
		field: 'TicketProblemType.Area',
				name:  StandardProblemsQFSDataGrid_Strings['QFSDataGrid_94fea8be_6ba0_47b0_86cc_fd3d87210149_ColumnHeading']  || 'Area',
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
		field: 'TicketProblemType.Category',
				name:  StandardProblemsQFSDataGrid_Strings['QFSDataGrid_08152593_e4a5_4b97_a8c6_fdbd26960f83_ColumnHeading']  || 'Category',
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
		field: 'TicketProblemType.Issue',
				name:  StandardProblemsQFSDataGrid_Strings['QFSDataGrid_f4f354df_e285_41c2_bf0f_3b17d235d0e7_ColumnHeading']  || 'Issue',
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
		field: 'TicketProblemType.Notes',
				name:  StandardProblemsQFSDataGrid_Strings['QFSDataGrid_60265654_16c8_4eed_b375_1c3a3bbc040b_ColumnHeading']  || 'Notes',
	sortable: true,
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
            newItemParentReferenceProperty: 'TicketSolutionType',
            include: [],
            select: ['TicketProblemType.Id'],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'StandardProblemsQFSDataGrid_DataCarrier',
            sort: [
    { attribute: "TicketProblemType.Description"
     }
                      ]
        },
        tools: [

{
  displayInInsert : false,
  type : 'Sage.UI.SDataLookup',
  controlConfig : 
{
  id : 'btnAddRelationship',
  btnToolTip :  StandardProblemsbtnAddRelationship_Strings['btnAddRelationship_ButtonTooltip']  ||  'Associate Problem', 
  btnIcon:  '~/ImageResource.axd?scope=global&type=Global_Images&key=plus_16x16'  ,
  dialogButtonText : StandardProblemsbtnAddRelationship_Strings['btnAddRelationship_DialogButtonText']  ||  'Add Selected', 
  displayMode : 4, //$ {qf control . LookupDisplayMode}  When adding other dijit templates, need to convert control to use enum values
  dialogTitle : StandardProblemsbtnAddRelationship_Strings['btnAddRelationship_LookupDialogTitle']  ||  'Lookup Standard Problem',
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
		   name: StandardProblemsbtnAddRelationship_Strings['btnAddRelationship_LookupProperties_Area_PropertyHeader']  || 'Area',
		   field: 'Area',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 17,
		   sortable: true
         }
         ,
		 {
		   name: StandardProblemsbtnAddRelationship_Strings['btnAddRelationship_LookupProperties_Description_PropertyHeader']  || 'Description',
		   field: 'Description',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 36,
		   sortable: true
         }
       ]      }    ],   storeOptions: {
            sort: [ { attribute: 'Area' } ],    
    resourceKind : 'ticketProblemTypes',
	select : ['Area','Description']
  },
  gridOptions: {
		    selectionMode : 'Single',
    rowsPerPage : 15
  }

} // end of sdata lookup config object

}
  ,
{
    id : 'StandardProblems_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : StandardProblemsQFSDataGrid_Strings['QFSDataGrid_Delete_ToolTip'] || 'Remove',
          'handler' : function() { this.deleteSelected(); }
}
           ],
        contextualCondition: function() { return 'TicketSolutionType.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
				     slxContext: dojo.mixin({ tabId : 'StandardProblems' }, runtimeConfig),	   
				id : 'StandardProblemsQFSDataGrid',
        rowsPerPage: 20,
        singleClickEdit: true
    };

	
	var grid = new SLXPreviewGrid.Grid(options, 'StandardProblemsQFSDataGrid_Grid');
	    window.setTimeout(function () { grid.startup(); }, 1);
	aspect.after(grid, 'startup', function () {
		// This is not a typo.  The dijit.layout.ContentPane is not affectively determining all of it's layout information
		// on the first pass through resize.  Calling resize twice effectively renders the grid to fill it's container.
		var localTC = dijit.byId('tabContent');
		localTC.resize(); localTC.resize();
	});
     var lup = dijit.byId('btnAddRelationship');
    if (lup) {
      lup.doSelected = function (items) {
        var grid = dijit.byId('StandardProblemsQFSDataGrid');        
        grid.addAssociatedItems(items, "TicketSolutionType", "TicketProblemType", lup);
      };
    }
    
});
}

  ,

    init : function(runtimeConfig) {
        setTimeout(function() { Sage.UI.Forms.StandardProblems.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();