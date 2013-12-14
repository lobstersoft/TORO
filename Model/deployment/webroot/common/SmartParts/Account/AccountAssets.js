Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.AccountAssets = {

  

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
    
    if (typeof AccountAssetsgrdAssets_Strings === 'undefined') {
        AccountAssetsgrdAssets_Strings = {};
    }

    var options = {		
		        context: runtimeConfig,		
		        noDataMessage: AccountAssetsgrdAssets_Strings['grdAssets_EmptyTableRowText']  ||  'No records match the selection criteria.', 
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
    			field: 'Id',
				name:  AccountAssetsgrdAssets_Strings['grdAssets_a4124a04_6c17_4e29_a35c_27f340e36dc5_ColumnHeading']  || ' ',
	sortable: false,
		width: 4,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	   	type: SlxEdit,
		cellValue: AccountAssetsgrdAssets_Strings['grdAssets_a4124a04_6c17_4e29_a35c_27f340e36dc5_Text']  || '',
		entityType: 'Sage.Entity.Interfaces.IAccountProduct, Sage.Entity.Interfaces',
		smartPart: 'AddEditAccountProduct',
		dialogTitle: AccountAssetsgrdAssets_Strings['1044d27e_4703_4469_ad55_9c8b676e31c7_DialogTitleOverride'] || '',
		isCentered: true ,
		dialogTop: 0,
		dialogLeft: 0,
		dialogHeight: 600,
		dialogWidth: 750,
    	formObjectName: 'Sage.UI.Forms.AccountAssets'
    	    }
  	,
{
		field: 'Product.Name',
				name:  AccountAssetsgrdAssets_Strings['grdAssets_59e59e62_db7d_4146_adda_cd7d7136745b_ColumnHeading']  || 'Product Name',
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
		field: 'Product.ActualId',
				name:  AccountAssetsgrdAssets_Strings['grdAssets_c48be44d_1fcc_4e50_8eda_778820212af3_ColumnHeading']  || 'SKU',
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
		field: 'SerialNumber',
				name:  AccountAssetsgrdAssets_Strings['grdAssets_6728e16d_efef_4879_8d68_65f599ecbf35_ColumnHeading']  || 'Serial #',
	sortable: true,
		width: 8,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: true
				}
  	,
{
		field: 'Quantity',
				name:  AccountAssetsgrdAssets_Strings['grdAssets_2d388020_65ff_4d69_92e9_000e482fd94d_ColumnHeading']  || 'Qty',
	sortable: true,
		width: 7,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: true,
	type: Numeric,
	    constraints: { places:   '0,0'  ,  round: -1 },  
	formatType: 'Number'
}
  	,
{ 
    	field: 'Contact.NameLF',
				name:  AccountAssetsgrdAssets_Strings['grdAssets_c9b81fd8_e256_463f_a1c8_24aa2cd769e4_ColumnHeading']  || 'Contact',
	sortable: true,
		width: 10,
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
		field: 'Location',
				name:  AccountAssetsgrdAssets_Strings['grdAssets_92a21ea1_16f7_4fb0_9753_1d8b021e03e0_ColumnHeading']  || 'Location',
	sortable: true,
		width: 8,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: true
				}
  	,
{
		field: 'AssetCode',
				name:  AccountAssetsgrdAssets_Strings['grdAssets_6beb1b27_2f6b_4f69_98a3_0f01cf7090a2_ColumnHeading']  || 'Asset #',
	sortable: true,
		width: 8,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: true
				}
  	          ],
        storeOptions: {
            resourceKind: 'accountproducts',
            newItemParentReferenceProperty: 'Account',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'AccountAssetsgrdAssets_DataCarrier',
            sort: [
                       ]
        },
        tools: [

{
    id : 'AccountAssets_Save',
  displayInInsert : false,
  imageClass: 'icon_Save_16x16',  'alternateText' : AccountAssetsgrdAssets_Strings['grdAssets_Save_ToolTip'] || 'Save',
         'handler' : function() {
    this.saveChanges();
 }
}
  ,
{
    id : 'AccountAssets_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : AccountAssetsgrdAssets_Strings['grdAssets_Delete_ToolTip'] || 'Delete',
       mergePosition : 'After',   mergeControlId : 'btnAddAsset',  'handler' : function() { this.deleteSelected(); }
}
  ,
{
    id : 'AccountAssets_Cancel',
  displayInInsert : false,
  imageClass: 'icon_Reset_16x16',  'alternateText' : AccountAssetsgrdAssets_Strings['grdAssets_Cancel_ToolTip'] || 'Reset',
       mergePosition : 'After',   mergeControlId : 'btnAddAsset',  'handler' : function() { this.cancelChanges(); }
}
           ],
        contextualCondition: function() { return 'Account.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'AccountAssets',
		gridNodeId: 'AccountAssetsgrdAssets_Grid',
				id : 'AccountAssetsgrdAssets',
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
        setTimeout(function() { Sage.UI.Forms.AccountAssets.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();