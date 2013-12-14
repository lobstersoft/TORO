Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.ContractCoveredAssets = {

  

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
    
    if (typeof ContractCoveredAssetsgrdAssets_Strings === 'undefined') {
        ContractCoveredAssetsgrdAssets_Strings = {};
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
		field: 'Asset.ProductName',
				name:  ContractCoveredAssetsgrdAssets_Strings['grdAssets_d6d15772_06ee_4b25_a62e_981991ddeb1d_ColumnHeading']  || 'Product Name',
	sortable: true,
		width: 14,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	,
{
		field: 'Asset.ActualId',
				name:  ContractCoveredAssetsgrdAssets_Strings['grdAssets_59048bd8_65e8_4738_8090_6ba56e6117a7_ColumnHeading']  || 'SKU',
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
		field: 'Asset.SerialNumber',
				name:  ContractCoveredAssetsgrdAssets_Strings['grdAssets_af8c6561_89f7_44ef_8612_3ce13251f52c_ColumnHeading']  || 'Serial Number',
	sortable: false,
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
		field: 'Asset.Quantity',
				name:  ContractCoveredAssetsgrdAssets_Strings['grdAssets_501d2ec3_e2cf_4491_8f48_7e2b1af03336_ColumnHeading']  || 'Quantity',
	sortable: true,
		width: 8,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	,
{ 
    	field: 'Asset.Contact.NameLF',
				name:  ContractCoveredAssetsgrdAssets_Strings['grdAssets_bc2f61f4_5049_4b0b_a062_891b9609b28b_ColumnHeading']  || 'Contact',
	sortable: true,
		width: 12,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'Contact'
    ,idField: 'Asset.Contact.$key'
 }
  	,
{
		field: 'Asset.Location',
				name:  ContractCoveredAssetsgrdAssets_Strings['grdAssets_bab779e0_89dd_469e_893b_da44d5fa90c8_ColumnHeading']  || 'Location',
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
		field: 'Asset.AssetCode',
				name:  ContractCoveredAssetsgrdAssets_Strings['grdAssets_141e8d00_61ca_4889_804a_5f75090ba2ad_ColumnHeading']  || 'Asset Code',
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
		field: 'Asset.Returned',
				name:  ContractCoveredAssetsgrdAssets_Strings['grdAssets_1c82ae1f_b3a3_498f_bc75_45f5b6aae145_ColumnHeading']  || 'Returned',
	sortable: true,
		width: 8,
		styles: 'width:auto;',
    cellClasses: '  aligncenter ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: CheckBox,
	defaultValue: "x"   }
  	,
{
		field: 'Asset.Evaluation',
				name:  ContractCoveredAssetsgrdAssets_Strings['grdAssets_8f97f70a_252e_4ad9_bcbf_f385752df26d_ColumnHeading']  || 'Evaluation',
	sortable: true,
		width: 8,
		styles: 'width:auto;',
    cellClasses: '  aligncenter ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: CheckBox,
	defaultValue: "x"   }
  	          ],
	 	         storeOptions: {
            resourceKind: 'contractItems',
            newItemParentReferenceProperty: 'Contract',
            include: [],
            select: ['Asset.Contact.Id'],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'ContractCoveredAssetsgrdAssets_DataCarrier',
            sort: [
    { attribute: "Asset.ProductName"
     }
                          ]
        },
        tools: [

{
  displayInInsert : false,
  type : 'Sage.UI.SDataLookup',
  controlConfig : 
{
  id : 'lueAddProduct',
  btnToolTip :  ContractCoveredAssetslueAddProduct_Strings['lueAddProduct_ButtonTooltip']  ||  'Associate Asset', 
  btnIcon:  '~/ImageResource.axd?scope=global&type=Global_Images&key=plus_16x16'  ,
  dialogButtonText : ContractCoveredAssetslueAddProduct_Strings['lueAddProduct_DialogButtonText']  ||  'Add Selected', 
  displayMode : 4, //$ {qf control . LookupDisplayMode}  When adding other dijit templates, need to convert control to use enum values
  dialogTitle : ContractCoveredAssetslueAddProduct_Strings['lueAddProduct_LookupDialogTitle']  ||  'Lookup Assets',
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
		   name: ContractCoveredAssetslueAddProduct_Strings['lueAddProduct_LookupProperties_ActualId_PropertyHeader']  || 'SKU',
		   field: 'ActualId',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 17,
		   sortable: true
         }
         ,
		 {
		   name: ContractCoveredAssetslueAddProduct_Strings['lueAddProduct_LookupProperties_ProductName_PropertyHeader']  || 'Product',
		   field: 'ProductName',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 18,
		   sortable: true
         }
         ,
		 {
		   name: ContractCoveredAssetslueAddProduct_Strings['lueAddProduct_LookupProperties_SerialNumber_PropertyHeader']  || 'Serial Number',
		   field: 'SerialNumber',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 18,
		   sortable: true
         }
       ]      }    ],   storeOptions: {
            sort: [ { attribute: 'ActualId' } ],    
    resourceKind : 'accountProducts',
	select : ['ActualId','ProductName','SerialNumber']
  },
  gridOptions: {
		        contextualCondition: function() {
	var clientContextService = Sage.Services.getService("ClientContextService");
	if (clientContextService != null && typeof clientContextService !== "undefined") {
		if (clientContextService.containsKey("ContractAccount")) {
			return dojo.string.substitute("Account.Id eq '${0}'", [clientContextService.getValue("ContractAccount")]);
		}
	}
},
	    selectionMode : 'Multi',
    rowsPerPage : 15
  }

} // end of sdata lookup config object

}
  ,
{
    id : 'ContractCoveredAssets_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : ContractCoveredAssetsgrdAssets_Strings['grdAssets_Delete_ToolTip'] || 'Remove',
          'handler' : function() { this.deleteSelected(); }
}
           ],
        contextualCondition: function() { return 'Contract.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'ContractCoveredAssets',
		gridNodeId: 'ContractCoveredAssetsgrdAssets_Grid',
				id : 'ContractCoveredAssetsgrdAssets',
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
        var grid = dijit.byId('ContractCoveredAssetsgrdAssets');        
        grid.addAssociatedItems(items, "Contract", "Asset", lup);
      };
    }
    
});
}

  ,

    init : function(runtimeConfig) {
        setTimeout(function() { Sage.UI.Forms.ContractCoveredAssets.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();