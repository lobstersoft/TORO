Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.TicketAssets = {

  

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
    
    if (typeof TicketAssetsgrdAssets_Strings === 'undefined') {
        TicketAssetsgrdAssets_Strings = {};
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
		field: 'AccountProduct.ProductName',
				name:  TicketAssetsgrdAssets_Strings['grdAssets_64b4b79d_3d5d_4684_b2d6_58e254ecb5a5_ColumnHeading']  || 'Product',
	sortable: true,
		width: 16,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	,
{
		field: 'AccountProduct.SerialNumber',
				name:  TicketAssetsgrdAssets_Strings['grdAssets_59d0704d_d027_49f4_a56d_8db1a962b742_ColumnHeading']  || 'Serial Number',
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
		field: 'AccountProduct.ActualId',
				name:  TicketAssetsgrdAssets_Strings['grdAssets_89c9ff56_1550_42ee_9c64_5fa5c4d78310_ColumnHeading']  || 'SKU',
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
		field: 'AccountProduct.Evaluation',
				name:  TicketAssetsgrdAssets_Strings['grdAssets_71c49a91_4d57_4214_99a2_ceadda55e3c0_ColumnHeading']  || 'Evaluation',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: CheckBox,
	defaultValue: "x"   }
  	          ],
        storeOptions: {
            resourceKind: 'ticketAccountProducts',
            newItemParentReferenceProperty: 'Ticket',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'TicketAssetsgrdAssets_DataCarrier',
            sort: [
    { attribute: "AccountProduct.ProductName"
     }
                     ]
        },
        tools: [

{
  displayInInsert : false,
  type : 'Sage.UI.SDataLookup',
  controlConfig : 
{
  id : 'lueAddAsset',
  btnToolTip :  TicketAssetslueAddAsset_Strings['lueAddAsset_ButtonTooltip']  ||  'Associate Asset', 
  btnIcon:  '~/ImageResource.axd?scope=global&type=Global_Images&key=plus_16x16'  ,
  dialogButtonText : TicketAssetslueAddAsset_Strings['lueAddAsset_DialogButtonText']  ||  'Add Selected', 
  displayMode : 4, //$ {qf control . LookupDisplayMode}  When adding other dijit templates, need to convert control to use enum values
  dialogTitle : TicketAssetslueAddAsset_Strings['lueAddAsset_LookupDialogTitle']  ||  'Lookup Asset',
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
		   name: TicketAssetslueAddAsset_Strings['lueAddAsset_LookupProperties_SerialNumber_PropertyHeader']  || 'Serial Number',
		   field: 'SerialNumber',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 17,
		   sortable: true
         }
         ,
		 {
		   name: TicketAssetslueAddAsset_Strings['lueAddAsset_LookupProperties_ProductName_PropertyHeader']  || 'Product Name',
		   field: 'ProductName',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 18,
		   sortable: true
         }
         ,
		 {
		   name: TicketAssetslueAddAsset_Strings['lueAddAsset_LookupProperties_ActualId_PropertyHeader']  || 'SKU',
		   field: 'ActualId',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 18,
		   sortable: true
         }
       ]      }    ],   storeOptions: {
            sort: [ { attribute: 'SerialNumber' } ],    
    resourceKind : 'accountProducts',
	select : ['SerialNumber','ProductName','ActualId']
  },
  gridOptions: {
		    selectionMode : 'Multi',
    rowsPerPage : 15
  }

} // end of sdata lookup config object

}
  ,
{
    id : 'TicketAssets_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : TicketAssetsgrdAssets_Strings['grdAssets_Delete_ToolTip'] || 'Remove',
          'handler' : function() { this.deleteSelected(); }
}
           ],
        contextualCondition: function() { return 'Ticket.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'TicketAssets',
		gridNodeId: 'TicketAssetsgrdAssets_Grid',
				id : 'TicketAssetsgrdAssets',
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
     var lup = dijit.byId('lueAddAsset');
    if (lup) {
      lup.doSelected = function (items) {
        var grid = dijit.byId('TicketAssetsgrdAssets');        
        grid.addAssociatedItems(items, "Ticket", "AccountProduct", lup);
      };
    }
    
});
}

  ,

    init : function(runtimeConfig) {
        setTimeout(function() { Sage.UI.Forms.TicketAssets.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();