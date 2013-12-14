Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.ICEditSalesOrderItem = {

  

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
    
    if (typeof ICEditSalesOrderItemgrdWarehouses_Strings === 'undefined') {
        ICEditSalesOrderItemgrdWarehouses_Strings = {};
    }

    dojo.require('Sage.Data.ProxySDataStore');
    var options = {		
		        context: runtimeConfig,		
				        		//Set to the value of the ReadOnlyCondition property
		          readOnly: true,
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
		field: 'location.name',
				name:  ICEditSalesOrderItemgrdWarehouses_Strings['grdWarehouses_49800e87_d0d1_4d40_ad6e_514d1e8e9ff5_ColumnHeading']  || 'Warehouse',
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
		field: 'availableQuantity',
				name:  ICEditSalesOrderItemgrdWarehouses_Strings['grdWarehouses_281d6953_be65_4149_a88a_d26a11947904_ColumnHeading']  || 'Available Quantity',
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
		field: 'reservedQuantity',
				name:  ICEditSalesOrderItemgrdWarehouses_Strings['grdWarehouses_3381d323_7851_43d5_9cac_76d152f17685_ColumnHeading']  || 'Reserved Quantity',
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
		field: 'totalQuantity',
				name:  ICEditSalesOrderItemgrdWarehouses_Strings['grdWarehouses_446128f8_42dc_4691_a432_b4a09da1d58d_ColumnHeading']  || 'Total Quanity',
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
	 	         store : new Sage.Data.ProxySDataStore({
            service : Sage.Utility.getSDataService('proxy', true),
            resourceKind: 'commodities',
            getResourcePredicate: function() {
     var clientContextService = Sage.Services.getService("ClientContextService");
     if (clientContextService && clientContextService.containsKey("CommodityId"))
     {
          return dojo.string.substitute("$uuid eq '${0}'", [clientContextService.getValue("CommodityId")]);
     }
},
            getAppId: function() {
     var clientContextService = Sage.Services.getService("ClientContextService");
     if (clientContextService && clientContextService.containsKey("OperatingCompany"))
     {
          return clientContextService.getValue("OperatingCompany");
     }
},
            include: ['location'],
            select: ['$key'],
            pathSegments: [
                 {
                    'text' : 'commodityIdentifiers'
                 }
              ]
        }),
        tools: [
         ],
        
						tabId : 'ICEditSalesOrderItem',
		gridNodeId: 'ICEditSalesOrderItemgrdWarehouses_Grid',
				id : 'ICEditSalesOrderItemgrdWarehouses',
        rowsPerPage: 10,
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
        setTimeout(function() { Sage.UI.Forms.ICEditSalesOrderItem.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();