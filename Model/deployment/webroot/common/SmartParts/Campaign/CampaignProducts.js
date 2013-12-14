Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.CampaignProducts = {

  

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
    
    if (typeof CampaignProductsgrdProducts_Strings === 'undefined') {
        CampaignProductsgrdProducts_Strings = {};
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
				name:  CampaignProductsgrdProducts_Strings['grdProducts_68440dbf_604e_46b0_ab44_c195f213b66b_ColumnHeading']  || 'Name',
	sortable: true,
		width: 20,
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
				name:  CampaignProductsgrdProducts_Strings['grdProducts_53fc90dc_0eee_4f3c_a007_8e280e660e76_ColumnHeading']  || 'SKU',
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
		field: 'Product.Family',
				name:  CampaignProductsgrdProducts_Strings['grdProducts_d1452578_605c_4279_a847_b5d0c34e2074_ColumnHeading']  || 'Family',
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
            resourceKind: 'campaignProducts',
            newItemParentReferenceProperty: 'Campaign',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'CampaignProductsgrdProducts_DataCarrier',
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
  id : 'grdProducts_AddRelationTool',
  btnToolTip :  CampaignProductsgrdProducts_AddRelationTool_Strings['grdProducts_AddRelationTool_ButtonTooltip']  ||  'Associate Products', 
  btnIcon:  '~/ImageResource.axd?scope=global&type=Global_Images&key=plus_16x16'  ,
  dialogButtonText : CampaignProductsgrdProducts_AddRelationTool_Strings['grdProducts_AddRelationTool_DialogButtonText']  ||  'Add Selected', 
  displayMode : 4, //$ {qf control . LookupDisplayMode}  When adding other dijit templates, need to convert control to use enum values
  dialogTitle : CampaignProductsgrdProducts_AddRelationTool_Strings['grdProducts_AddRelationTool_LookupDialogTitle']  ||  'Lookup Product',
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
		   name: CampaignProductsgrdProducts_AddRelationTool_Strings['grdProducts_AddRelationTool_LookupProperties_Name_PropertyHeader']  || 'Name',
		   field: 'Name',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 17,
		   sortable: true
         }
         ,
		 {
		   name: CampaignProductsgrdProducts_AddRelationTool_Strings['grdProducts_AddRelationTool_LookupProperties_ActualId_PropertyHeader']  || 'SKU',
		   field: 'ActualId',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 18,
		   sortable: true
         }
         ,
		 {
		   name: CampaignProductsgrdProducts_AddRelationTool_Strings['grdProducts_AddRelationTool_LookupProperties_Family_PropertyHeader']  || 'Family',
		   field: 'Family',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 18,
		   sortable: true
         }
       ]      }    ],   storeOptions: {
            sort: [ { attribute: 'Name' } ],    
    resourceKind : 'products',
	select : ['Name','ActualId','Family']
  },
  gridOptions: {
		    selectionMode : 'Multi',
    rowsPerPage : 15
  }

} // end of sdata lookup config object

}
  ,
{
    id : 'CampaignProducts_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : CampaignProductsgrdProducts_Strings['grdProducts_Delete_ToolTip'] || 'Remove',
          'handler' : function() { this.deleteSelected(); }
}
           ],
        contextualCondition: function() { return 'Campaign.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'CampaignProducts',
		gridNodeId: 'CampaignProductsgrdProducts_Grid',
				id : 'CampaignProductsgrdProducts',
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
     var lup = dijit.byId('grdProducts_AddRelationTool');
    if (lup) {
      lup.doSelected = function (items) {
        var grid = dijit.byId('CampaignProductsgrdProducts');        
        grid.addAssociatedItems(items, "Campaign", "Product", lup);
      };
    }
    
});
}

  ,

    init : function(runtimeConfig) {
        setTimeout(function() { Sage.UI.Forms.CampaignProducts.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();