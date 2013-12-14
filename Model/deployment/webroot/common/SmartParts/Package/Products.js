Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.Products = {

  

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
    
    if (typeof ProductsgrdProducts_Strings === 'undefined') {
        ProductsgrdProducts_Strings = {};
    }

    var options = {		
		        context: runtimeConfig,		
		        noDataMessage: ProductsgrdProducts_Strings['grdProducts_EmptyTableRowText']  ||  'No records match the selection criteria.', 
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
				name:  ProductsgrdProducts_Strings['grdProducts_63070c7b_2051_481c_9405_fe6ad87623a5_ColumnHeading']  || 'Product',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'Product'
    ,idField: 'Product.$key'
 }
  	,
{
		field: 'Product.ActualId',
				name:  ProductsgrdProducts_Strings['grdProducts_ed7f9593_9015_4ea6_9a4a_e57d50365177_ColumnHeading']  || 'SKU',
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
		field: 'Quantity',
				name:  ProductsgrdProducts_Strings['grdProducts_52b53a4c_380f_4645_96a8_f03da36569e7_ColumnHeading']  || 'Quantity',
	sortable: true,
		width: 8,
		styles: 'width:auto;',
    cellClasses: '  alignright ',
	headerClasses: ' alignleft '
,
	editable: true,
	type: Numeric,
	    constraints: { places:   '0,0'  ,  round: -1 },  
	formatType: 'Number'
}
  	,
{
		field: 'Product.Status',
				name:  ProductsgrdProducts_Strings['grdProducts_c08798ea_cd3a_4223_989a_7b24d51b7cf6_ColumnHeading']  || 'Status',
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
				name:  ProductsgrdProducts_Strings['grdProducts_5804d8a4_c6ca_44d2_bede_e053dde97439_ColumnHeading']  || 'Family',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	          ],
        storeOptions: {
            resourceKind: 'packageProducts',
            newItemParentReferenceProperty: 'Package',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'ProductsgrdProducts_DataCarrier',
            sort: [
    { attribute: "Product.Name"
     }
                      ]
        },
        tools: [

{
    id : 'Products_Save',
  displayInInsert : false,
  imageClass: 'icon_Save_16x16',  'alternateText' : ProductsgrdProducts_Strings['grdProducts_Save_ToolTip'] || 'Save',
     appliedSecurity : 'Entities/Package/Edit',     'handler' : function() {
    this.saveChanges(function () { if (Sage.Utility.getModeId() !== 'insert') { __doPostBack('MainContent', ''); } });
 }
}
  ,
{
  displayInInsert : true,
  type : 'Sage.UI.SDataLookup',
  controlConfig : 
{
  id : 'lueAddProduct',
  btnToolTip :  ProductslueAddProduct_Strings['lueAddProduct_ButtonTooltip']  ||  'Associate Product', 
  btnIcon:  '~/ImageResource.axd?scope=global&type=Global_Images&key=plus_16x16'  ,
  dialogButtonText : ProductslueAddProduct_Strings['lueAddProduct_DialogButtonText']  ||  'Add Selected', 
  displayMode : 4, //$ {qf control . LookupDisplayMode}  When adding other dijit templates, need to convert control to use enum values
  dialogTitle : ProductslueAddProduct_Strings['lueAddProduct_LookupDialogTitle']  ||  'Lookup Product',
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
		   name: ProductslueAddProduct_Strings['lueAddProduct_LookupProperties_Name_PropertyHeader']  || 'Name',
		   field: 'Name',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 17,
		   sortable: true
         }
         ,
		 {
		   name: ProductslueAddProduct_Strings['lueAddProduct_LookupProperties_Family_PropertyHeader']  || 'Family',
		   field: 'Family',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 12,
		   sortable: true
         }
         ,
		 {
		   name: ProductslueAddProduct_Strings['lueAddProduct_LookupProperties_Status_PropertyHeader']  || 'Status',
		   field: 'Status',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 12,
		   sortable: true
         }
         ,
		 {
		   name: ProductslueAddProduct_Strings['lueAddProduct_LookupProperties_ActualId_PropertyHeader']  || 'SKU',
		   field: 'ActualId',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 12,
		   sortable: true
         }
       ]      }    ],   storeOptions: {
            sort: [ { attribute: 'Name' } ],    
    resourceKind : 'products',
	select : ['Name','Family','Status','ActualId']
  },
  gridOptions: {
		    selectionMode : 'Multi',
    rowsPerPage : 15
  }

} // end of sdata lookup config object

}
  ,
{
    id : 'Products_Cancel',
  displayInInsert : false,
  imageClass: 'icon_Reset_16x16',  'alternateText' : ProductsgrdProducts_Strings['grdProducts_Cancel_ToolTip'] || 'Reset',
          'handler' : function() { this.cancelChanges(); }
}
  ,
{
    id : 'Products_Delete',
  displayInInsert : true,
  imageClass: 'icon_Delete_16x16',  'alternateText' : ProductsgrdProducts_Strings['grdProducts_Delete_ToolTip'] || 'Remove',
     appliedSecurity : 'Entities/Package/Delete',      'handler' : function() { this.deleteSelected(function () { if (Sage.Utility.getModeId() !== 'insert') { __doPostBack('MainContent', ''); } }); }
}
           ],
        contextualCondition: function() { return 'Package.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'Products',
		gridNodeId: 'ProductsgrdProducts_Grid',
				id : 'ProductsgrdProducts',
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
      var lup = dijit.byId('lueAddProduct');
    if (lup) {
      lup.doSelected = function (items) {
        var grid = dijit.byId('ProductsgrdProducts');        
        grid.addAssociatedItems(items, "Package", "Product", lup);
      };
    }
     
});
}

  ,

    init : function(runtimeConfig) {
        setTimeout(function() { Sage.UI.Forms.Products.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();