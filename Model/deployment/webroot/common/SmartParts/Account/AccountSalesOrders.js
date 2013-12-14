Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.AccountSalesOrders = {

  

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
    
    if (typeof AccountSalesOrdersgrdSalesOrders_Strings === 'undefined') {
        AccountSalesOrdersgrdSalesOrders_Strings = {};
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
    	field: 'SalesOrderNumber',
				name:  AccountSalesOrdersgrdSalesOrders_Strings['grdSalesOrders_776cf92c_180a_4437_bd02_0aa109134b8b_ColumnHeading']  || 'Sales Order #',
	sortable: true,
		width: 9,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'SalesOrder'
    ,idField: '$key'
 }
  	,
{
		field: 'IsQuote',
				name:  AccountSalesOrdersgrdSalesOrders_Strings['grdSalesOrders_52126107_e77d_4216_a3ce_f5e5e177b319_ColumnHeading']  || 'Is Quote',
	sortable: false,
		width: '10',
	 	styles: 'width:auto;',
    cellClasses: '  aligncenter ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: CheckBox,
	defaultValue: "x"   }
  	,
{
		field: 'Status',
				name:  AccountSalesOrdersgrdSalesOrders_Strings['grdSalesOrders_7410d76d_21aa_4d48_aaea_9095c1d85966_ColumnHeading']  || 'Status',
	sortable: true,
		width: 9,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	,
{
		field: 'BillToName',
				name:  AccountSalesOrdersgrdSalesOrders_Strings['grdSalesOrders_f01ce137_e017_47c5_9a5e_7644db9ed01d_ColumnHeading']  || 'Billing Contact',
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
		field: 'ShipToName',
				name:  AccountSalesOrdersgrdSalesOrders_Strings['grdSalesOrders_9c6e0ed3_b071_4db4_ad09_65e2c6e62614_ColumnHeading']  || 'Shipping Contact',
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
		field: 'ShipVia',
				name:  AccountSalesOrdersgrdSalesOrders_Strings['grdSalesOrders_772d4037_0107_4cd2_9812_1b7af967da29_ColumnHeading']  || 'Ship Via',
	sortable: true,
		width: 9,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	,
{
		field: 'CustomerPurchaseOrderNumber',
				name:  AccountSalesOrdersgrdSalesOrders_Strings['grdSalesOrders_30e419bf_d5b7_43ac_8eb1_277c486f59c7_ColumnHeading']  || 'Customer PO',
	sortable: true,
		width: 11,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	          ],
        storeOptions: {
            resourceKind: 'salesOrders',
            newItemParentReferenceProperty: 'Account',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'AccountSalesOrdersgrdSalesOrders_DataCarrier',
            sort: [
    { attribute: "SalesOrderNumber"
     }
                        ]
        },
        tools: [

 {
    id : 'AccountSalesOrders_btnAddSalesOrder',
  displayInInsert : false,
  imageClass: 'icon_plus_16x16',  'alternateText' : AccountSalesOrdersgrdSalesOrders_Strings['grdSalesOrders_btnAddSalesOrder_ToolTip'] || 'Insert Sales Order',
     appliedSecurity : 'Entities/SalesOrder/Add',      'handler' : function() {
location.href = "InsertSalesOrder.aspx?modeid=Insert";
}
}
  ,
{
    id : 'AccountSalesOrders_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : AccountSalesOrdersgrdSalesOrders_Strings['grdSalesOrders_Delete_ToolTip'] || 'Delete',
     appliedSecurity : 'Entities/SalesOrder/Delete',      'handler' : function() { this.deleteSelected(); }
}
           ],
        contextualCondition: function() { return 'Account.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'AccountSalesOrders',
		gridNodeId: 'AccountSalesOrdersgrdSalesOrders_Grid',
				id : 'AccountSalesOrdersgrdSalesOrders',
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
        setTimeout(function() { Sage.UI.Forms.AccountSalesOrders.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();