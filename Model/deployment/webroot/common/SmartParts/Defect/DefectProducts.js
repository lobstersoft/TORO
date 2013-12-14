Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.DefectProducts = {

  

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
    
    if (typeof DefectProductsQFSDataGrid_Strings === 'undefined') {
        DefectProductsQFSDataGrid_Strings = {};
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
		field: 'Product.Name',
				name:  DefectProductsQFSDataGrid_Strings['QFSDataGrid_a76dde7c_9ab7_4c43_81bf_7494751fb0a8_ColumnHeading']  || 'Product Name',
	sortable: true,
		width: 15,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	,
{
		field: 'Product.ActualId',
				name:  DefectProductsQFSDataGrid_Strings['QFSDataGrid_82bea8fa_4081_457b_9b55_4ebbad99bd65_ColumnHeading']  || 'SKU',
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
		field: 'Product.Description',
				name:  DefectProductsQFSDataGrid_Strings['QFSDataGrid_813b9306_7406_4224_ae72_3edc6db45327_ColumnHeading']  || 'Description',
	sortable: true,
		width: '10',
	 	styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	          ],
        storeOptions: {
            resourceKind: 'defectProducts',
            newItemParentReferenceProperty: 'Defect',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'DefectProductsQFSDataGrid_DataCarrier',
            sort: [
    { attribute: "Product.Name"
     }
                    ]
        },
        tools: [

{
  displayInInsert : false,
  type : 'Sage.UI.SDataLookup',
  controlConfig : 
{
  id : 'QFSDataGrid_AddRelationTool',
  btnToolTip :  DefectProductsQFSDataGrid_AddRelationTool_Strings['QFSDataGrid_AddRelationTool_ButtonTooltip']  ||  'Associate Product', 
  btnIcon:  '~/ImageResource.axd?scope=global&type=Global_Images&key=plus_16x16'  ,
  dialogButtonText : DefectProductsQFSDataGrid_AddRelationTool_Strings['QFSDataGrid_AddRelationTool_DialogButtonText']  ||  'Add Selected', 
  displayMode : 4, //$ {qf control . LookupDisplayMode}  When adding other dijit templates, need to convert control to use enum values
  dialogTitle : DefectProductsQFSDataGrid_AddRelationTool_Strings['QFSDataGrid_AddRelationTool_LookupDialogTitle']  ||  'Lookup Product',
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
		   name: DefectProductsQFSDataGrid_AddRelationTool_Strings['QFSDataGrid_AddRelationTool_LookupProperties_Name_PropertyHeader']  || 'Name',
		   field: 'Name',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 17,
		   sortable: true
         }
         ,
		 {
		   name: DefectProductsQFSDataGrid_AddRelationTool_Strings['QFSDataGrid_AddRelationTool_LookupProperties_ActualId_PropertyHeader']  || 'SKU',
		   field: 'ActualId',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 18,
		   sortable: true
         }
         ,
		 {
		   name: DefectProductsQFSDataGrid_AddRelationTool_Strings['QFSDataGrid_AddRelationTool_LookupProperties_Description_PropertyHeader']  || 'Description',
		   field: 'Description',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 18,
		   sortable: true
         }
       ]      }    ],   storeOptions: {
            sort: [ { attribute: 'Name' } ],    
    resourceKind : 'products',
	select : ['Name','ActualId','Description']
  },
  gridOptions: {
		    selectionMode : 'Multi',
    rowsPerPage : 15
  }

} // end of sdata lookup config object

}
  ,
{
    id : 'DefectProducts_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : DefectProductsQFSDataGrid_Strings['QFSDataGrid_Delete_ToolTip'] || 'Delete',
          'handler' : function() { this.deleteSelected(); }
}
           ],
        contextualCondition: function() { return 'Defect.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'DefectProducts',
		gridNodeId: 'DefectProductsQFSDataGrid_Grid',
				id : 'DefectProductsQFSDataGrid',
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
     var lup = dijit.byId('QFSDataGrid_AddRelationTool');
    if (lup) {
      lup.doSelected = function (items) {
        var grid = dijit.byId('DefectProductsQFSDataGrid');        
        grid.addAssociatedItems(items, "Defect", "Product", lup);
      };
    }
    
});
}

  ,

    init : function(runtimeConfig) {
        setTimeout(function() { Sage.UI.Forms.DefectProducts.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();