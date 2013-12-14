Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.TicketActivityItems = {

  

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
    
    if (typeof TicketActivityItemsgrdActivityParts_Strings === 'undefined') {
        TicketActivityItemsgrdActivityParts_Strings = {};
    }

    var options = {		
		        context: runtimeConfig,		
		        noDataMessage: TicketActivityItemsgrdActivityParts_Strings['grdActivityParts_EmptyTableRowText']  ||  'No records match the selection criteria.', 
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
    			field: '',
				    //Set to the value of the visibleCondition property
	    hidden: function () {
    if (Sage.Utility.getModeId() === 'insert') {
        return true;
    }
}(),
		name:  TicketActivityItemsgrdActivityParts_Strings['grdActivityParts_a116eddf_12f1_44ba_b510_7e40e6f6e59c_ColumnHeading']  || '',
	sortable: false,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	   	type: SlxEdit,
		cellValue: TicketActivityItemsgrdActivityParts_Strings['grdActivityParts_a116eddf_12f1_44ba_b510_7e40e6f6e59c_Text']  || 'Edit Part',
		entityType: 'Sage.Entity.Interfaces.ITicketActivityItem, Sage.Entity.Interfaces',
		smartPart: 'AddEditTicketActivityItem',
		dialogTitle: TicketActivityItemsgrdActivityParts_Strings['c66600f9_1fe4_4821_9ece_c93d5457d9f6_DialogTitleOverride'] || '',
		isCentered: true ,
		dialogTop: 0,
		dialogLeft: 0,
		dialogHeight: 400,
		dialogWidth: 400,
    	formObjectName: 'Sage.UI.Forms.TicketActivityItems'
    	    }
  	,
{
		field: 'AccountProduct.ProductName',
				name:  TicketActivityItemsgrdActivityParts_Strings['grdActivityParts_9d3402ca_f3c1_4cb5_b118_016de4349de1_ColumnHeading']  || 'Product',
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
		field: 'AccountProduct.SerialNumber',
				name:  TicketActivityItemsgrdActivityParts_Strings['grdActivityParts_b1165945_e43b_4cc8_bb56_630e3e80535c_ColumnHeading']  || 'Serial Number',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: true
				}
  	,
{
		field: 'AccountProduct.ActualId',
				name:  TicketActivityItemsgrdActivityParts_Strings['grdActivityParts_5ece826e_d3e3_482d_8c0f_ea72bc664897_ColumnHeading']  || 'SKU',
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
		field: 'ItemAmount',
				name:  TicketActivityItemsgrdActivityParts_Strings['grdActivityParts_8e9dc831_b1fd_43e0_b6f5_dfb0c44d751f_ColumnHeading']  || 'Price',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: true,
		type: Currency,
	constraints: {  places: Sys.CultureInfo.CurrentCulture.numberFormat.CurrencyDecimalDigits  },  

			exchangeRateType:  'BaseRate' ,
	displayCurrencyCode: true,
		    displayMode: 'AsControl',
    multiCurrency: isMultiCurrencyEnabled()	 //TODO: Move this method to Sage.IntegrationContractService.isMultiCurrencyEnabled()
}
  										,
{
		field: 'ItemDescription',
				name:  TicketActivityItemsgrdActivityParts_Strings['grdActivityParts_86f7a539_714d_4ae1_ae45_af0c526e277b_ColumnHeading']  || 'Description',
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
            resourceKind: 'ticketActivityItems',
            newItemParentReferenceProperty: 'TicketActivity',
            include: [],
            select: ['TicketActivity.Id'],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'TicketActivityItemsgrdActivityParts_DataCarrier',
            sort: [
     { attribute: "AccountProduct.ProductName"
     }
                      ]
        },
        tools: [

{
  displayInInsert : true,
  type : 'Sage.UI.SDataLookup',
  controlConfig : 
{
  id : 'grdActivityParts_AddRelationTool',
  btnToolTip :  TicketActivityItemsgrdActivityParts_AddRelationTool_Strings['grdActivityParts_AddRelationTool_ButtonTooltip']  ||  'Associate Part', 
  btnIcon:  '~/ImageResource.axd?scope=global&type=Global_Images&key=plus_16x16'  ,
  dialogButtonText : TicketActivityItemsgrdActivityParts_AddRelationTool_Strings['grdActivityParts_AddRelationTool_DialogButtonText']  ||  'Add Selected', 
  displayMode : 4, //$ {qf control . LookupDisplayMode}  When adding other dijit templates, need to convert control to use enum values
  dialogTitle : TicketActivityItemsgrdActivityParts_AddRelationTool_Strings['grdActivityParts_AddRelationTool_LookupDialogTitle']  ||  'Lookup Part',
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
		   name: TicketActivityItemsgrdActivityParts_AddRelationTool_Strings['grdActivityParts_AddRelationTool_LookupProperties_ActualId_PropertyHeader']  || 'SKU',
		   field: 'ActualId',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 17,
		   sortable: true
         }
         ,
		 {
		   name: TicketActivityItemsgrdActivityParts_AddRelationTool_Strings['grdActivityParts_AddRelationTool_LookupProperties_Name_PropertyHeader']  || 'Name',
		   field: 'Name',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 18,
		   sortable: true
         }
         ,
		 {
		   name: TicketActivityItemsgrdActivityParts_AddRelationTool_Strings['grdActivityParts_AddRelationTool_LookupProperties_Status_PropertyHeader']  || 'Status',
		   field: 'Status',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 18,
		   sortable: true
         }
       ]      }    ],   storeOptions: {
            sort: [ { attribute: 'ActualId' } ],    
    resourceKind : 'products',
	select : ['ActualId','Name','Status']
  },
  gridOptions: {
		    selectionMode : 'Multi',
    rowsPerPage : 15
  }
  ,
  doSelected : function (items) {
        dojo.require('Sage.UI.Dialogs');
        if (!items.length) return;
        var grid = dijit.byId('TicketActivityItemsgrdActivityParts');
        if (grid && grid.store) {
            var arrItems = [];
            var iCurrentCount = 0;
            var iTotalCount = 0;
            grid.store.newItem({
                onComplete: function (ticketActivityItem) {
                    var addProduct = function (prod) {
                        var price = 0;
                        var sSelect = "select=Id,Description,Family,Name,ActualId,";
                        sSelect += "ProductProgram/Program,ProductProgram/Price,ProductProgram/DefaultProgram";
                        var sWhere = dojo.string.substitute("where=Id eq '${0}'", [prod.$key]);
                        var sUrl = dojo.string.substitute("slxdata.ashx/slx/dynamic/-/products?${0}&${1}&format=json&_t=${2}",
                            [sSelect, sWhere, (new Date().getTime().toString())]);
                        dojo.xhrGet({
                            url: sUrl,
                            handleAs: 'json',
                            load: function (prodResponse) {
                                if (prodResponse.$resources != null && prodResponse.$resources.length > 0) {
                                    for (var x = 0; x < prodResponse.$resources.length; x++) {
                                        var newTicketActivityItem = {};
                                        var newAccountProduct = {};
                                        var product = prodResponse.$resources[x];
                                        if (Sage.Utility.getModeId() === 'insert') {
                                            product.$cacheID = new Date().getTime();
                                        } else {
                                            ticketActivityItem.TicketActivity = { $key: Sage.Utility.getCurrentEntityId() };
                                        }
                                        ticketActivityItem.Product = {};
                                        ticketActivityItem.AccountProduct = {};

                                        delete product.index;
                                        Sage.Utility.extend(ticketActivityItem.Product, product);
                                        var accountProduct = {};
                                        accountProduct.ProductDescription = product.Description;
                                        accountProduct.ProductName = product.Name;
                                        accountProduct.ActualId = product.ActualId;
                                        accountProduct.Product = product;
                                        Sage.Utility.extend(true, newAccountProduct, ticketActivityItem.AccountProduct, accountProduct);
                                        Sage.Utility.extend(ticketActivityItem.AccountProduct, newAccountProduct);

                                        ticketActivityItem.ItemQuantity = 1;
                                        ticketActivityItem.ProductDescription = product.Description;
                                        ticketActivityItem.ProductName = product.Name;
                                        ticketActivityItem.ActualId = product.ActualId;
                                        product.Price = 0;
                                        ticketActivityItem.ItemAmount = 0;
                                        ticketActivityItem.ItemTotalAmount = 0;

                                        if (prodResponse.$resources[x].ProductProgram != null &&
                                            prodResponse.$resources[x].ProductProgram.$resources != null &&
                                                prodResponse.$resources[x].ProductProgram.$resources.length > 0) {
                                            for (var j = 0; j < prodResponse.$resources[x].ProductProgram.$resources.length; j++) {
                                                /* Grab the price for the default program. */
                                                if (prodResponse.$resources[x].ProductProgram.$resources[j].DefaultProgram) {
                                                    if (prodResponse.$resources[x].ProductProgram.$resources[j].Price != null) {
                                                        price = prodResponse.$resources[x].ProductProgram.$resources[j].Price;
                                                    }
                                                    product.Price = price;
                                                    ticketActivityItem.ItemAmount = price;
                                                    ticketActivityItem.ItemTotalAmount = price * ticketActivityItem.ItemQuantity;
                                                    break;
                                                }
                                            }
                                        }

                                        delete product.$key;
                                        delete product.$name;
                                        delete product.$url;
                                        Sage.Utility.extend(true, newTicketActivityItem, ticketActivityItem, product);
                                        Sage.Utility.extend(true, newTicketActivityItem, newAccountProduct, accountProduct);
                                        arrItems.push(newTicketActivityItem);
                                        iCurrentCount++;
                                        if (iCurrentCount === iTotalCount) {
                                            grid.createItems(arrItems, function () {
                                                if (Sage.Utility.getModeId() !== 'insert') {
                                                    __doPostBack("MainContent", "");
                                                }
                                            });
                                        }
                                    }
                                }
                            },
                            data: {},
                            error: function (request) {
                                var sError = dojo.string.substitute(TicketActivityItemsResources['error_ExecutingRequest'], [sUrl, request.statusText, request.status]);
                                if (dojo.isString(request.responseText)) {
                                    if ((request.responseText.indexOf("[", 0) == 0) && (request.responseText.lastIndexOf("]") == request.responseText.length - 1)) {
                                        var oSDataError = dojo.fromJson(request.responseText);
                                        if (dojo.isArray(oSDataError)) {
                                            sError = dojo.string.substitute(TicketActivityItemsResources['error_ExecutingRequestExt'],
                                                [sUrl, oSDataError[0].severity, oSDataError[0].sdataCode, oSDataError[0].message, oSDataError[0].applicationCode, request.statusText, request.status]);
                                        }
                                    }
                                }
                                Sage.UI.Dialogs.showError(sError);
                            }
                        });
                    };
                    iTotalCount = items.length;
                    for (var i = 0; i < items.length; i += 1) {
                        addProduct(items[i]);
                    }
                }
            });
        }
    }

} // end of sdata lookup config object

}
  ,
 {
    id : 'TicketActivityItems_btnCopy',
  displayInInsert : false,
  imageClass: 'icon_Copy_16x16',  'alternateText' : TicketActivityItemsgrdActivityParts_Strings['grdActivityParts_btnCopy_ToolTip'] || 'Copy Part',
          'handler' : function () {
         // Execute the "CopyPart" method on each selected record
         var grid = this;
         var selectedItems = grid.selection.getSelected();
         if (selectedItems.length < 1) {
             Sage.UI.Dialogs.showError(grid.noSelectionsText);
             return;
         }
         var store = grid.store;
         grid.showLoading();
         var service = Sage.Data.SDataServiceRegistry.getSDataService('dynamic');
         var fnCopy = function (i) {
             if (store.isItem(selectedItems[i])) {
                 var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
	                .setResourceKind('ticketActivityItems')
	                .setOperationName('CopyPart');
                 var id = store.getValue(selectedItems[i], "$key");
                 var actId = store.getValue(selectedItems[i], "TicketActivity");
                 var entry = {
                     "$name": "CopyPart",
                     "request": {
                         "TicketActivityItemId": id,
                         "ticketActivity": actId
                     }
                 };
                 request.execute(entry, {
                     success: function (result) {
                         i++;
                         if (i < selectedItems.length) {
                             fnCopy(i);
                         } else {
                             grid.refresh();
                         }
                     },
                     failure: function (result) {
                         Sage.UI.Dialogs.showError(dojo.string.substitute(TicketActivityItemsResources['error_CopyingPart'], [result]));
                     }
                 });
             }
         };
         fnCopy(0);
     }
}
  ,
{
    id : 'TicketActivityItems_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : TicketActivityItemsgrdActivityParts_Strings['grdActivityParts_Delete_ToolTip'] || 'Remove',
          'handler' : function() { this.deleteSelected(function () { __doPostBack("MainContent", ""); }); }
}
           ],
        contextualCondition: function() { return 'TicketActivity.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'TicketActivityItems',
		gridNodeId: 'TicketActivityItemsgrdActivityParts_Grid',
				id : 'TicketActivityItemsgrdActivityParts',
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
        setTimeout(function() { Sage.UI.Forms.TicketActivityItems.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();