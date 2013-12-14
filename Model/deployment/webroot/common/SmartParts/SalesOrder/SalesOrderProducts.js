Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.SalesOrderProducts = {

  

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
    
    if (typeof SalesOrderProductsgrdItems_Strings === 'undefined') {
        SalesOrderProductsgrdItems_Strings = {};
    }

    var options = {		
		        context: runtimeConfig,		
				        		//Set to the value of the ReadOnlyCondition property
		          readOnly: function() {
    if (isIntegrationContractEnabled()) {
        var clientContextService = Sage.Services.getService("ClientContextService");
        if (clientContextService) {
            if (clientContextService.containsKey("SalesOrderStatus") && clientContextService.containsKey("GlobalSyncId")) {
                var status = clientContextService.getValue("SalesOrderStatus");
                var globalSyncId = clientContextService.getValue("GlobalSyncId");
                if (globalSyncId != "" && (status != "Open" || status != "Rejected")) { 
                    return true;
                }
            }
        }
    }
    return false;
}(),
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
				    //Set to the value of the visibleCondition property
	    hidden: function () {
    if (Sage.Utility.getModeId() === 'insert') {
        return true;
    }
    return isIntegrationContractEnabled();
}(),
		name:  SalesOrderProductsgrdItems_Strings['grdItems_a8c6d9fd_1bde_4d02_b2a8_f56adc076935_ColumnHeading']  || ' ',
	sortable: false,
		width: 4,
		styles: 'width:auto;',
    cellClasses: '  aligncenter ',
	headerClasses: ' alignleft '
,
	   	type: SlxEdit,
		cellValue: SalesOrderProductsgrdItems_Strings['grdItems_a8c6d9fd_1bde_4d02_b2a8_f56adc076935_Text']  || 'Edit',
		entityType: 'Sage.Entity.Interfaces.ISalesOrderItem, Sage.Entity.Interfaces',
		smartPart: 'EditSalesOrderItem',
		dialogTitle: SalesOrderProductsgrdItems_Strings['f842ee53_0b9f_43c7_858c_57afa8508f76_DialogTitleOverride'] || 'Edit Product',
		isCentered: true ,
		dialogTop: 0,
		dialogLeft: 0,
		dialogHeight: 375,
		dialogWidth: 600,
    	formObjectName: 'Sage.UI.Forms.SalesOrderProducts'
    				,appliedSecurity: 'Entities/SalesOrder/Edit'
    	    }
  	,
{
    			field: 'Id',
				    //Set to the value of the visibleCondition property
	    hidden: function () {
    if (Sage.Utility.getModeId() === 'insert') {
        return true;
    }
    return !isIntegrationContractEnabled();
}(),
		name:  SalesOrderProductsgrdItems_Strings['grdItems_3160cbc2_c14d_4e58_94c9_5277e17b3951_ColumnHeading']  || ' ',
	sortable: false,
		width: 4,
		styles: 'width:auto;',
    cellClasses: '  aligncenter ',
	headerClasses: ' alignleft '
,
	   	type: SlxEdit,
		cellValue: SalesOrderProductsgrdItems_Strings['grdItems_3160cbc2_c14d_4e58_94c9_5277e17b3951_Text']  || 'Edit',
		entityType: 'Sage.Entity.Interfaces.ISalesOrderItem, Sage.Entity.Interfaces',
		smartPart: 'ICEditSalesOrderItem',
		dialogTitle: SalesOrderProductsgrdItems_Strings['0475f9ec_f5ca_4fbd_9241_6d93fbcbdaf7_DialogTitleOverride'] || 'Edit Product',
		isCentered: true ,
		dialogTop: 0,
		dialogLeft: 0,
		dialogHeight: 750,
		dialogWidth: 700,
    	formObjectName: 'Sage.UI.Forms.SalesOrderProducts'
    				,appliedSecurity: 'Entities/SalesOrder/Edit'
    	    }
  	,
{
		field: 'ItemLocked',
				    //Set to the value of the visibleCondition property
	    hidden: function () {
    return !isIntegrationContractEnabled();
}(),
		name:  SalesOrderProductsgrdItems_Strings['grdItems_eae77157_0570_48d4_bd9a_d78df7b84496_ColumnHeading']  || 'Locked',
	sortable: false,
		width: '10',
	 	styles: 'width:auto;',
    cellClasses: '  aligncenter ',
	headerClasses: ' alignleft '
,
	editable: true,
	type: CheckBox,
	defaultValue: "x"   }
  	,
{
		field: 'LineNumber',
				name:  SalesOrderProductsgrdItems_Strings['grdItems_530b7cdb_cef1_4e94_a46a_cf8d931ff779_ColumnHeading']  || 'Line #',
	sortable: true,
		width: 3,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	,
{
		field: 'ProductName',
				name:  SalesOrderProductsgrdItems_Strings['grdItems_0c39de35_d246_4c4b_a1fa_57a0a9be41c6_ColumnHeading']  || 'Product',
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
		field: 'Family',
				name:  SalesOrderProductsgrdItems_Strings['grdItems_506f0947_d9d3_441f_bfed_329263b9df81_ColumnHeading']  || 'Family',
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
		field: 'Program',
				    //Set to the value of the visibleCondition property
	    hidden: function () {
    return isIntegrationContractEnabled();
}(),
		name:  SalesOrderProductsgrdItems_Strings['grdItems_a74f322c_ebd9_49d4_ad41_3bcd939e8b41_ColumnHeading']  || 'Price Level',
	sortable: true,
		width: '10',
	 	styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,  
	editable: true,
	type: Lookup,
	lookupOptions: {
		field: 'Program',
		seedOnRowEntity: false,
		seedOnRelatedEntity: 'Product',
		returnObject:  false ,
		displayMode: 'DropDownList'
	},
	lookupStructure: [{
            cells: [{
		     name: 'Program',
		     field: 'Program'
		 }]
    }],
	lookupStoreOptions: {		
        resourceKind:  'productPrograms'      },
	lookupGridOptions: {
			  }
		}
  	,
{
		field: 'Price',
				name:  SalesOrderProductsgrdItems_Strings['grdItems_3ef53358_80dd_4e3f_99fb_355cb397a797_ColumnHeading']  || 'Price',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignright ',
	headerClasses: ' alignleft '
,
	editable: false,
		type: Currency,
	constraints: {  places: Sys.CultureInfo.CurrentCulture.numberFormat.CurrencyDecimalDigits  },  

			exchangeRateType:  'BaseRate' ,
	displayCurrencyCode: true,
		    displayMode: 'AsControl',
    multiCurrency: isMultiCurrencyEnabled()	 //TODO: Move this method to Sage.IntegrationContractService.isMultiCurrencyEnabled()
}
  										,
{
		field: 'Discount',
				name:  SalesOrderProductsgrdItems_Strings['grdItems_983c7b9b_3c12_48e3_add2_73ff8cd065c2_ColumnHeading']  || 'Discount',
	sortable: true,
		width: '10',
	 	styles: 'width:auto;',
    cellClasses: '  alignright ',
	headerClasses: ' alignleft '
,
	editable: true,
	type: Numeric,
	    constraints: { places:   '0,2'  ,  round: -1 },  
	formatType: 'Percent'
}
  	,
{
		field: 'CalculatedPrice',
				name:  SalesOrderProductsgrdItems_Strings['grdItems_5cd443a0_928c_44a2_86f2_a4246f8223c7_ColumnHeading']  || 'Adj. Price',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignright ',
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
		field: 'CalculatedPrice',
				    //Set to the value of the visibleCondition property
	    hidden: function () {
    return !isMultiCurrencyEnabled();
}(),
		name:  SalesOrderProductsgrdItems_Strings['grdItems_28d57a8b_13ca_47c0_b41e_d969ed17dc28_ColumnHeading']  || 'Adj. Price',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignright ',
	headerClasses: ' alignleft '
,
	editable: false,
		type: Currency,
	constraints: {  places: Sys.CultureInfo.CurrentCulture.numberFormat.CurrencyDecimalDigits  },  

			exchangeRateType:  'EntityRate' ,
	displayCurrencyCode: true,
	    exchangeRateField: 'SalesOrder.ExchangeRate', 
		    exchangeRateCodeField: 'SalesOrder.CurrencyCode', 
	    displayMode: 'AsControl',
    multiCurrency: isMultiCurrencyEnabled()	 //TODO: Move this method to Sage.IntegrationContractService.isMultiCurrencyEnabled()
}
  															 			 			,
{
		field: 'Quantity',
				name:  SalesOrderProductsgrdItems_Strings['grdItems_0fd9479b_1d6f_497f_a870_26efbf44550d_ColumnHeading']  || 'Quantity',
	sortable: true,
		width: '10',
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
		field: 'UnitOfMeasure',
				    //Set to the value of the visibleCondition property
	    hidden: function () {
    return !isIntegrationContractEnabled();
}(),
		name:  SalesOrderProductsgrdItems_Strings['grdItems_eef3d53b_092f_4f1b_9429_22cfd8dd2bf4_ColumnHeading']  || 'Unit',
	sortable: true,
		width: '10',
	 	styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,  
	editable: true,
	type: Lookup,
	lookupOptions: {
		field: 'Name',
		seedOnRowEntity: false,
		seedOnRelatedEntity: '',
		returnObject: true ,
		displayMode: 'DropDownList'
	},
	lookupStructure: [{
            cells: [{
		     name: 'Name',
		     field: 'Name'
		 }]
    }],
	lookupStoreOptions: {		
        resourceKind:  'unitsOfMeasure'      },
	lookupGridOptions: {
					contextualCondition: function () {
	        var sCondition = '';
	        var showError = function (msg) {
	            var msgService = Sage.Services.getService("WebClientMessageService");
	            if (msgService != null && typeof msgService !== "undefined") {
	                msgService.showClientError(msg);
	            }
	            else {
	                alert(msg);
	            }
	        }
	        var service = Sage.Services.getService("IntegrationContractService");
	        if (service != null && typeof service !== "undefined") {
	            if (service.isIntegrationEnabled) {
	                var bFoundOperatingCompany = false;
	                var bFoundSlxPriceList = false;
	                var clientContextService = Sage.Services.getService("ClientContextService");
	                if (clientContextService != null && typeof clientContextService !== "undefined") {
	                    if (clientContextService.containsKey("OperatingCompany")) {
	                        var sOperatingCompanyId = clientContextService.getValue("OperatingCompany");
	                        bFoundOperatingCompany = (dojo.isString(sOperatingCompanyId) && String(sOperatingCompanyId).length == 12);
	                        if (bFoundOperatingCompany) {
	                            sCondition = 'AppId eq "' + sOperatingCompanyId + '" ' + "And ActiveFlag eq true";
	                        }
	                    }
	                    var sError = "";
	                    if (!bFoundOperatingCompany) {
	                        sError = "The Operating Company could not be determined.";
	                        showError(sError);
	                        throw new Error(sError);
	                    }
	                }
	                else {
	                    sError = "The ClientContextService is unavailable.";
	                    showError(sError);
	                    throw new Error(sError);
	                }
	            }
	        }
	        return sCondition;
        }

			  }
		}
  	,
{
		field: 'ExtendedPrice',
				    //Set to the value of the visibleCondition property
	    hidden: function () {
    return isMultiCurrencyEnabled();
}(),
		name:  SalesOrderProductsgrdItems_Strings['grdItems_68096333_c869_44c2_9b19_51d9058e50d8_ColumnHeading']  || 'Extended Price',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignright ',
	headerClasses: ' alignleft '
,
	editable: false,
		type: Currency,
	constraints: {  places: Sys.CultureInfo.CurrentCulture.numberFormat.CurrencyDecimalDigits  },  

			exchangeRateType:  'BaseRate' ,
	displayCurrencyCode: true,
		    displayMode: 'AsControl',
    multiCurrency: isMultiCurrencyEnabled()	 //TODO: Move this method to Sage.IntegrationContractService.isMultiCurrencyEnabled()
}
  										,
{
		field: 'ExtendedPrice',
				    //Set to the value of the visibleCondition property
	    hidden: function () {
    return !isMultiCurrencyEnabled();
}(),
		name:  SalesOrderProductsgrdItems_Strings['grdItems_ff4abcfa_992a_4721_8841_c0c0b6e89485_ColumnHeading']  || 'Extended Price',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignright ',
	headerClasses: ' alignleft '
,
	editable: false,
		type: Currency,
	constraints: {  places: Sys.CultureInfo.CurrentCulture.numberFormat.CurrencyDecimalDigits  },  

			exchangeRateType:  'EntityRate' ,
	displayCurrencyCode: true,
	    exchangeRateField: 'SalesOrder.ExchangeRate', 
		    exchangeRateCodeField: 'SalesOrder.CurrencyCode', 
	    displayMode: 'AsControl',
    multiCurrency: isMultiCurrencyEnabled()	 //TODO: Move this method to Sage.IntegrationContractService.isMultiCurrencyEnabled()
}
  																					,
{
		field: 'LineType',
				    //Set to the value of the visibleCondition property
	    hidden: function () {
    if (Sage.Utility.getModeId() === 'insert') {
        return true;
    }
    return !isIntegrationContractEnabled();
}(),
		name:  SalesOrderProductsgrdItems_Strings['grdItems_ca87da6c_54ec_4780_b7c9_ff6e49313f91_ColumnHeading']  || 'Line Type',
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
		field: 'CommodityType',
				    //Set to the value of the visibleCondition property
	    hidden: function () {
    return !isIntegrationContractEnabled();
}(),
		name:  SalesOrderProductsgrdItems_Strings['grdItems_7f13becf_d7b7_41ec_82af_24215aec5077_ColumnHeading']  || 'Product Type',
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
            resourceKind: 'salesOrderItems',
            newItemParentReferenceProperty: 'SalesOrder',
            include: ['SalesOrder','Product','UnitOfMeasure'],
            select: ['SalesOrder.ExchangeRate','SalesOrder.CurrencyCode','Id','Product.Id','SalesOrder.OperatingCompany.Id','SalesOrder.SlxPriceList.Id','UnitOfMeasure.Id','UnitOfMeasure.Name','UnitOfMeasure.AppId'],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'SalesOrderProductsgrdItems_DataCarrier',
            sort: [
       { attribute: "LineNumber"
     }
                               ]
        },
        tools: [

{
    id : 'SalesOrderProducts_Save',
  displayInInsert : false,
  imageClass: 'icon_Save_16x16',  'alternateText' : SalesOrderProductsgrdItems_Strings['grdItems_Save_ToolTip'] || 'Save',
         'handler' : function() {
    this.saveChanges(function () { if (Sage.Utility.getModeId() !== 'insert') { __doPostBack('MainContent', ''); } });
 }
}
  ,
{
  displayInInsert : true,
  type : 'Sage.UI.SDataLookup',
  controlConfig : 
{
  id : 'luProduct',
  btnToolTip :  SalesOrderProductsluProduct_Strings['luProduct_ButtonTooltip']  ||  'Include Product', 
  btnIcon:  '~/ImageResource.axd?scope=global&type=Global_Images&key=add_products_16x16'  ,
  dialogButtonText : SalesOrderProductsluProduct_Strings['luProduct_DialogButtonText']  ||  'Add Selected', 
  displayMode : 4, //$ {qf control . LookupDisplayMode}  When adding other dijit templates, need to convert control to use enum values
  dialogTitle : SalesOrderProductsluProduct_Strings['luProduct_LookupDialogTitle']  ||  'Lookup Products',
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
		   name: SalesOrderProductsluProduct_Strings['luProduct_LookupProperties_Name_PropertyHeader']  || 'Name',
		   field: 'Name',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 17,
		   formatter: function (value, rowIdx, grid) {
				return Sage.Utility.SDataLookup.childObjectFormatter({
					value: value, rowIdx: rowIdx, grid: grid,
					fieldName: 'Name', 
							includeButton: true, 
						childentity: 'PackageKitChildViews'
		        });
		   },
		   sortable: true
         }
         ,
		 {
		   name: SalesOrderProductsluProduct_Strings['luProduct_LookupProperties_Family_PropertyHeader']  || 'Family',
		   field: 'Family',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 12,
		   formatter: function (value, rowIdx, grid) {
				return Sage.Utility.SDataLookup.childObjectFormatter({
					value: value, rowIdx: rowIdx, grid: grid,
					fieldName: 'Family', 
							includeButton: false, 
						childentity: 'PackageKitChildViews'
		        });
		   },
		   sortable: true
         }
         ,
		 {
		   name: SalesOrderProductsluProduct_Strings['luProduct_LookupProperties_Status_PropertyHeader']  || 'Status',
		   field: 'Status',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 12,
		   formatter: function (value, rowIdx, grid) {
				return Sage.Utility.SDataLookup.childObjectFormatter({
					value: value, rowIdx: rowIdx, grid: grid,
					fieldName: 'Status', 
							includeButton: false, 
						childentity: 'PackageKitChildViews'
		        });
		   },
		   sortable: true
         }
         ,
		 {
		   name: SalesOrderProductsluProduct_Strings['luProduct_LookupProperties_ActualId_PropertyHeader']  || 'SKU',
		   field: 'ActualId',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 12,
		   formatter: function (value, rowIdx, grid) {
				return Sage.Utility.SDataLookup.childObjectFormatter({
					value: value, rowIdx: rowIdx, grid: grid,
					fieldName: 'ActualId', 
							includeButton: false, 
						childentity: 'PackageKitChildViews'
		        });
		   },
		   sortable: true
         }
       ]      }    ],   storeOptions: {
            sort: [ { attribute: 'Name' } ],    
    resourceKind : 'productPackageKit',
	select : ['PackageKitChildViews/Name','PackageKitChildViews/Family','PackageKitChildViews/Status','PackageKitChildViews/ActualId','PackageKitChildViews/ProductId','PackageKitChildViews/ProdPackageKitType','PackageKitChildViews/CommodityType','PackageKitChildViews/Program','PackageKitChildViews/AppId','PackageKitChildViews/Quantity','PackageKitChildViews/ActiveFlag','Name','Family','Status','ActualId','ProductId','ProdPackageKitType','CommodityType','Program','AppId','Quantity','ActiveFlag']
  },
  gridOptions: {
	        contextualShow: function () {
            var oResult = { result: true, reason: '' };
            var service = Sage.Services.getService('IntegrationContractService');
            if (service != null && typeof service !== 'undefined') {
                if (service.isIntegrationEnabled) {
                    var bFoundOperatingCompany = false;
                    var bFoundSlxPriceList = false;
                    var clientContextService = Sage.Services.getService('ClientContextService');
                    if (clientContextService != null && typeof clientContextService !== 'undefined') {
                        if (clientContextService.containsKey('OperatingCompany')) {
                            var sOperatingCompanyId = clientContextService.getValue('OperatingCompany');
                            bFoundOperatingCompany = (dojo.isString(sOperatingCompanyId) && String(sOperatingCompanyId).length == 12);
                        }
                        if (clientContextService.containsKey('SlxPriceList')) {
                            var sSlxPriceListId = clientContextService.getValue('SlxPriceList');
                            bFoundSlxPriceList = (dojo.isString(sSlxPriceListId) && String(sSlxPriceListId).length == 12);
                        }
                        if (!bFoundOperatingCompany || !bFoundSlxPriceList) {
                            oResult.result = false;
                            oResult.reason = 'Products cannot be added to the Sales Order because the Accounting System or Price List is undefined.';
                        }
                    }
                    else {
                        oResult.result = false;
                        oResult.reason = 'The ClientContextService is unavailable.';
                    }
                }
            }
            return oResult;
        },
		        contextualCondition: function () {
                var sCondition = '';
                var showError = function (msg) {
                    var msgService = Sage.Services.getService("WebClientMessageService");
                    if (msgService != null && typeof msgService !== "undefined") {
                        msgService.showClientError(msg);
                    }
                    else {
                        alert(msg);
                    }
                }
                var service = Sage.Services.getService("IntegrationContractService");
                if (service != null && typeof service !== "undefined") {
                    if (service.isIntegrationEnabled) {
                        var bFoundOperatingCompany = false;
                        var bFoundSlxPriceList = false;
                        var clientContextService = Sage.Services.getService("ClientContextService");
                        if (clientContextService != null && typeof clientContextService !== "undefined") {
                            if (clientContextService.containsKey("OperatingCompany")) {
                                var sOperatingCompanyId = clientContextService.getValue("OperatingCompany");
                                bFoundOperatingCompany = (dojo.isString(sOperatingCompanyId) && String(sOperatingCompanyId).length == 12);
                                if (bFoundOperatingCompany) {
                                    sCondition = 'AppId eq "' + sOperatingCompanyId + '" ' + "And ActiveFlag eq true";
                                }
                            }
                            var sError = "";
                            if (!bFoundOperatingCompany) {
                                sError = "The Operating Company could not be determined.";
                                showError(sError);
                                throw new Error(sError);
                            }
                        }
                        else {
                            sError = "The ClientContextService is unavailable.";
                            showError(sError);
                            throw new Error(sError);
                        }
                    }
                }
                return sCondition;
            }
,
	    selectionMode : 'Multi',
    rowsPerPage : 15
  }
  ,
  doSelected : function (items) {
      if (!items.length) return;
      dojo.require('Sage.UI.Dialogs');
      var undefinedAccountingSystem = "Products cannot be added to the Sales Order because the Accounting System or Price List is undefined. Please close this message and the Add Product lookup to return to the main window.";
            var grid = dijit.byId('SalesOrderProductsgrdItems');
            if (grid && grid.store) {
                var recordCount = grid.rowCount;
                var iCurrentCount = 0;
                var iTotalCount = 0;
                var oService = Sage.Services.getService("IntegrationContractService");
                var bIsICEnabled = (typeof oService !== "undefined" && oService != null && oService.isIntegrationEnabled);
                var sAppId = "";
                if (bIsICEnabled) {
                    var sOperatingCompanyId = "";
                    var sPriceListId = "";
                    var clientContextService = Sage.Services.getService("ClientContextService");
                    if (clientContextService != null && typeof clientContextService !== "undefined") {
                        if (clientContextService.containsKey("OperatingCompany")) {
                            sOperatingCompanyId = clientContextService.getValue("OperatingCompany");
                            if (dojo.isString(sOperatingCompanyId) && String(sOperatingCompanyId).length == 12) {
                                sAppId = sOperatingCompanyId;
                            }
                        }
                        if (clientContextService.containsKey("SlxPriceList")) {
                            var sValue = clientContextService.getValue("SlxPriceList");
                            if (dojo.isString(sValue) && String(sValue).length == 12) {
                                sPriceListId = sValue;
                            }
                        }
                    }
                    if (sAppId === "" || sPriceListId === "") {
                        Sage.UI.Dialogs.showError(undefinedAccountingSystem);
                        return;
                    }
                }
                var arrItems = [];
                grid.store.newItem({ onComplete: function (soItem) {
                    var addProduct = function (prod, refresh, quantity) {
                        var sSelect = "select=Id,ActualId,CommodityType,Description,Family,Name,";
                        sSelect += (bIsICEnabled) ? "UnitOfMeasure/Id,UnitOfMeasure/Name,Prices/Price,Prices/Currency,Prices/UnitOfMeasure,Prices/SlxPriceList,Prices/SlxPriceList.Id" : "ProductProgram/Program,ProductProgram/Price,ProductProgram/DefaultProgram";
                        var sWhere = dojo.string.substitute("where=Id eq '${0}'", [prod.$key]);
                        sWhere += (bIsICEnabled) ? dojo.string.substitute(" and UnitOfMeasure eq Prices.UnitOfMeasure and Prices.SlxPriceList.Id eq '${0}' and Prices.AppId eq '${1}' and Prices.ActiveFlag = true", [sPriceListId, sAppId]) : "";
                        var sUrl = dojo.string.substitute("slxdata.ashx/slx/dynamic/-/products?${0}&${1}&format=json&_t=${2}",
                                        [sSelect, sWhere, (new Date().getTime().toString())]);
                        $.ajax({
                            type: "GET",
                            contentType: "application/json",
                            url: sUrl,
                            dataType: 'json',
                            success: function (prodResponse) {
                                var bIsICEnabled = isIntegrationContractEnabled();
                                if (prodResponse.$resources == null || prodResponse.$resources.length == 0) {
                                    if (bIsICEnabled) {
                                        /* Check without using an SlxPriceList.Id. */
                                        sSelect = "select=Id,ActualId,CommodityType,Description,Family,Name,";
                                        sSelect += "UnitOfMeasure/Id,UnitOfMeasure/Name,Prices/Price,Prices/Currency,Prices/UnitOfMeasure";
                                        sWhere = dojo.string.substitute("where=Id eq '${0}'", [prod.$key]);
                                        sWhere += dojo.string.substitute(" and UnitOfMeasure eq Prices.UnitOfMeasure and Prices.AppId eq '${0}' and Prices.ActiveFlag = true", [sAppId]);
                                        sUrl = dojo.string.substitute("slxdata.ashx/slx/dynamic/-/products?${0}&${1}&format=json&_t=${2}",
                                            [sSelect, sWhere, (new Date().getTime().toString())]);
                                        $.ajax({
                                            type: "GET",
                                            async: false,
                                            contentType: "application/json",
                                            url: sUrl,
                                            dataType: 'json',
                                            success: function (prodResponse) {
                                                if (prodResponse.$resources == null || prodResponse.$resources.length == 0) {
                                                    var newEntity = {};
                                                    var product = prod;
                                                    //Insert mode check
                                                    if (Sage.Utility.getModeId() === 'insert') {
                                                        product.$cacheID = new Date().getTime();
                                                    }
                                                    else {
                                                        soItem.SalesOrder = { $key: Sage.Utility.getCurrentEntityId() };
                                                    }
                                                    soItem.Product = {};
                                                    delete product.index;
                                                    Sage.Utility.extend(soItem.Product, product);
                                                    soItem.Product.Family = product.Family;
                                                    soItem.ActualId = product.ActualId;
                                                    soItem.CommodityType = product.CommodityType;
                                                    soItem.Discount = 0;
                                                    soItem.Family = product.Family;
                                                    soItem.ProductName = product.Name;
                                                    soItem.Quantity = quantity;
                                                    soItem.LineNumber = recordCount += 1;
                                                    if (bIsICEnabled) {
                                                        product.Price = 0; // Required because of Sage.Utility.extend().
                                                        soItem.Price = 0;
                                                        soItem.ExtendedPrice = 0;
                                                        soItem.CalculatedPrice = 0;
                                                    }
                                                    else {
                                                        soItem.Price = product.Price;
                                                        soItem.ExtendedPrice = product.Price;
                                                        soItem.CalculatedPrice = product.Price;
                                                    }
                                                    delete product.$key;
                                                    delete product.$name;
                                                    delete product.$url;
                                                    Sage.Utility.extend(true, newEntity, soItem, product);
                                                    arrItems.push(newEntity);
                                                    iCurrentCount++;
                                                    if (iCurrentCount === iTotalCount) {
                                                        grid.createItems(arrItems, function () { if (Sage.Utility.getModeId() !== 'insert') { __doPostBack("MainContent", ""); } });
                                                    }
                                                }
                                                else {
                                                    if (prodResponse.$resources != null && prodResponse.$resources.length > 0) {
                                                        for (var x = 0; x < prodResponse.$resources.length; x++) {
                                                            var newEntity = {};
                                                            var product = prodResponse.$resources[x];
                                                            //Insert mode check
                                                            if (Sage.Utility.getModeId() === 'insert') {
                                                                product.$cacheID = new Date().getTime();
                                                            }
                                                            else {
                                                                soItem.SalesOrder = { $key: Sage.Utility.getCurrentEntityId() };
                                                            }
                                                            soItem.Product = {};
                                                            delete product.index;
                                                            Sage.Utility.extend(soItem.Product, product);
                                                            soItem.ActualId = product.ActualId;
                                                            soItem.CommodityType = product.CommodityType;
                                                            soItem.Discount = 0;
                                                            soItem.Family = product.Family;
                                                            soItem.ProductName = product.Name;
                                                            soItem.Quantity = quantity;
                                                            soItem.LineNumber = recordCount += 1;
                                                            var price = 0;
                                                            soItem.UnitOfMeasure = product.UnitOfMeasure;
                                                            product.Price = 0; // Required because of Sage.Utility.extend().
                                                            soItem.Price = 0;
                                                            soItem.ExtendedPrice = 0;
                                                            soItem.CalculatedPrice = 0;
                                                            soItem.Program = null;
                                                            if (prodResponse.$resources[x].Prices != null &&
                                                            prodResponse.$resources[x].Prices.$resources != null &&
                                                            prodResponse.$resources[x].Prices.$resources.length > 0) {
                                                                for (var j = 0; j < prodResponse.$resources[x].Prices.$resources.length; j++) {
                                                                    if (prodResponse.$resources[x].Prices.$resources[j].UnitOfMeasure.$key === product.UnitOfMeasure.$key) {
                                                                        if (prodResponse.$resources[x].Prices.$resources[j].Price != null) {
                                                                            price = prodResponse.$resources[x].Prices.$resources[j].Price;
                                                                        }
                                                                        product.Price = price; // Required because of Sage.Utility.extend().
                                                                        soItem.Price = price;
                                                                        soItem.ExtendedPrice = price;
                                                                        soItem.CalculatedPrice = price;
                                                                        break;
                                                                    }
                                                                }
                                                            }
                                                            delete product.$key;
                                                            delete product.$name;
                                                            delete product.$url;
                                                            Sage.Utility.extend(true, newEntity, soItem, product);
                                                            arrItems.push(newEntity);
                                                            iCurrentCount++;
                                                            if (iCurrentCount === iTotalCount) {
                                                                grid.createItems(arrItems, function () { if (Sage.Utility.getModeId() !== 'insert') { __doPostBack("MainContent", ""); } });
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        iTotalCount--;
                                                        if (iCurrentCount === iTotalCount) {
                                                            grid.createItems(arrItems, function () { if (Sage.Utility.getModeId() !== 'insert') { __doPostBack("MainContent", ""); } });
                                                        }
                                                    }
                                                }
                                            },
                                            data: {},
                                            error: function (request, status, error) {
                                                if (iTotalCount > 0) {
                                                    iTotalCount--;
                                                }
                                                var sError = dojo.string.substitute("There was an error opening ${0}. StatusText: ${1}; StatusCode: ${2}.", [sUrl, request.statusText, request.status]);
                                                if (dojo.isString(request.responseText)) {
                                                    if ((request.responseText.indexOf("[", 0) == 0) && (request.responseText.lastIndexOf("]") == request.responseText.length - 1)) {
                                                        var oSDataError = dojo.fromJson(request.responseText);
                                                        if (dojo.isArray(oSDataError)) {
                                                            sError = dojo.string.substitute("There was an error opening ${0}. Severity: ${1}; SDataCode: ${2}; Message: ${3}; ApplicationCode: {4}; StatusText: ${5}; StatusCode: ${6}.",
                                        [sUrl, oSDataError[0].severity, oSDataError[0].sdataCode, oSDataError[0].message, oSDataError[0].applicationCode, request.statusText, request.status]);
                                                        }
                                                    }
                                                }
                                                Sage.UI.Dialogs.showError(sError);
                                            }
                                        })
                                    }
                                    else {
                                        var newEntity = {};
                                        var product = prod;
                                        //Insert mode check
                                        if (Sage.Utility.getModeId() === 'insert') {
                                            product.$cacheID = new Date().getTime();
                                        }
                                        else {
                                            soItem.SalesOrder = { $key: Sage.Utility.getCurrentEntityId() };
                                        }
                                        soItem.Product = {};
                                        delete product.index;
                                        Sage.Utility.extend(soItem.Product, product);
                                        soItem.Product.Family = product.Family;
                                        soItem.ActualId = product.ActualId;
                                        soItem.CommodityType = product.CommodityType;
                                        soItem.Discount = 0;
                                        soItem.Family = product.Family;
                                        soItem.ProductName = product.Name;
                                        soItem.Quantity = quantity;
                                        soItem.LineNumber = recordCount += 1;
                                        if (bIsICEnabled) {
                                            product.Price = 0; // Required because of Sage.Utility.extend().
                                            soItem.Price = 0;
                                            soItem.ExtendedPrice = 0;
                                            soItem.CalculatedPrice = 0;
                                        }
                                        else {
                                            soItem.Price = product.Price;
                                            soItem.ExtendedPrice = product.Price;
                                            soItem.CalculatedPrice = product.Price;
                                        }
                                        delete product.$key;
                                        delete product.$name;
                                        delete product.$url;
                                        Sage.Utility.extend(true, newEntity, soItem, product);
                                        arrItems.push(newEntity);
                                        iCurrentCount++;
                                        if (iCurrentCount === iTotalCount) {
                                            grid.createItems(arrItems, function () { if (Sage.Utility.getModeId() !== 'insert') { __doPostBack("MainContent", ""); } });
                                        }
                                    }
                                }
                                else {
                                    if (prodResponse.$resources != null && prodResponse.$resources.length > 0) {
                                        for (var x = 0; x < prodResponse.$resources.length; x++) {
                                            var newEntity = {};
                                            var product = prodResponse.$resources[x];
                                            //Insert mode check
                                            if (Sage.Utility.getModeId() === 'insert') {
                                                product.$cacheID = new Date().getTime();
                                            }
                                            else {
                                                soItem.SalesOrder = { $key: Sage.Utility.getCurrentEntityId() };
                                            }
                                            soItem.Product = {};
                                            delete product.index;
                                            Sage.Utility.extend(soItem.Product, product);
                                            soItem.ActualId = product.ActualId;
                                            soItem.CommodityType = product.CommodityType;
                                            soItem.Discount = 0;
                                            soItem.Family = product.Family;
                                            soItem.ProductName = product.Name;
                                            soItem.Quantity = quantity;
                                            soItem.LineNumber = recordCount += 1;
                                            var price = 0;
                                            if (bIsICEnabled) {
                                                /* IC */
                                                soItem.UnitOfMeasure = product.UnitOfMeasure;
                                                product.Price = 0; // Required because of Sage.Utility.extend().
                                                soItem.Price = 0;
                                                soItem.ExtendedPrice = 0;
                                                soItem.CalculatedPrice = 0;
                                                soItem.Program = null;
                                                if (prodResponse.$resources[x].Prices != null &&
                                                            prodResponse.$resources[x].Prices.$resources != null &&
                                                            prodResponse.$resources[x].Prices.$resources.length > 0) {
                                                    for (var j = 0; j < prodResponse.$resources[x].Prices.$resources.length; j++) {
                                                        if (prodResponse.$resources[x].Prices.$resources[j].UnitOfMeasure.$key === product.UnitOfMeasure.$key) {
                                                            if (prodResponse.$resources[x].Prices.$resources[j].Price != null) {
                                                                price = prodResponse.$resources[x].Prices.$resources[j].Price;
                                                            }
                                                            product.Price = price; // Required because of Sage.Utility.extend().
                                                            soItem.Price = price;
                                                            soItem.ExtendedPrice = price;
                                                            soItem.CalculatedPrice = price;
                                                            break;
                                                        }
                                                    }
                                                }
                                            }
                                            else {
                                                /* NON-IC */
                                                product.Price = 0; // Required because of Sage.Utility.extend().
                                                soItem.UnitOfMeasure = null;
                                                soItem.Price = 0;
                                                soItem.ExtendedPrice = 0;
                                                soItem.CalculatedPrice = 0;
                                                soItem.Program = null;
                                                if (prodResponse.$resources[x].ProductProgram != null &&
                                                            prodResponse.$resources[x].ProductProgram.$resources != null &&
                                                            prodResponse.$resources[x].ProductProgram.$resources.length > 0) {
                                                    for (var j = 0; j < prodResponse.$resources[x].ProductProgram.$resources.length; j++) {
                                                        /* Grab the price for the default program. */
                                                        if (prodResponse.$resources[x].ProductProgram.$resources[j].DefaultProgram) {
                                                            if (prodResponse.$resources[x].ProductProgram.$resources[j].Price != null) {
                                                                price = prodResponse.$resources[x].ProductProgram.$resources[j].Price;
                                                            }
                                                            product.Price = price; // Required because of Sage.Utility.extend().
                                                            soItem.Price = price;
                                                            soItem.ExtendedPrice = price;
                                                            soItem.CalculatedPrice = price;
                                                            soItem.Program = prodResponse.$resources[x].ProductProgram.$resources[j].Program;
                                                            break;
                                                        }
                                                    }
                                                }
                                            }
                                            delete product.$key;
                                            delete product.$name;
                                            delete product.$url;
                                            Sage.Utility.extend(true, newEntity, soItem, product);
                                            arrItems.push(newEntity);
                                            iCurrentCount++;
                                            if (iCurrentCount === iTotalCount) {
                                                grid.createItems(arrItems, function () { if (Sage.Utility.getModeId() !== 'insert') { __doPostBack("MainContent", ""); } });
                                            }
                                        }
                                    }
                                    else {
                                        iTotalCount--;
                                        if (iCurrentCount === iTotalCount) {
                                            grid.createItems(arrItems, function () { if (Sage.Utility.getModeId() !== 'insert') { __doPostBack("MainContent", ""); } });
                                        }
                                    }
                                }
                            },
                            data: {},
                            error: function (request, status, error) {
                                if (iTotalCount > 0) {
                                    iTotalCount--;
                                }
                                var sError = dojo.string.substitute("There was an error opening ${0}. StatusText: ${1}; StatusCode: ${2}.", [sUrl, request.statusText, request.status]);
                                if (dojo.isString(request.responseText)) {
                                    if ((request.responseText.indexOf("[", 0) == 0) && (request.responseText.lastIndexOf("]") == request.responseText.length - 1)) {
                                        var oSDataError = dojo.fromJson(request.responseText);
                                        if (dojo.isArray(oSDataError)) {
                                            sError = dojo.string.substitute("There was an error opening ${0}. Severity: ${1}; SDataCode: ${2}; Message: ${3}; ApplicationCode: ${4}; StatusText: ${5}; StatusCode: ${6}.",
                                                            [sUrl, oSDataError[0].severity, oSDataError[0].sdataCode, oSDataError[0].message, oSDataError[0].applicationCode, request.statusText, request.status]);
                                        }
                                    }
                                }
                                Sage.UI.Dialogs.showError(sError);
                            }
                        })
                    }
                    var getTotalCount = function () {
                        var iResult = 0;
                        var i;
                        for (i = 0; i < items.length; i += 1) {
                            var item = items[i];
                            if (item.ProdPackageKitType === 'PKG') {
                                for (var j = 0; j < item.PackageKitChildViews.$resources.length; j++) {
                                    iResult++;
                                }
                            } else {
                                iResult++;
                            }
                        }
                        return iResult;
                    }
                    iTotalCount = getTotalCount();
                    var iCount = 0;
                    var i;
                    for (i = 0; i < items.length; i += 1) {
                        var quantity = 1;
                        var item = items[i];
                        if (item.ProdPackageKitType === 'PKG') {
                            for (var j = 0; j < item.PackageKitChildViews.$resources.length; j++) {
                                var prod = item.PackageKitChildViews.$resources[j];
                                prod.$key = item.PackageKitChildViews.$resources[j].ProductId;
                                if (prod.Quantity != null) {
                                    quantity = prod.Quantity;
                                }
                                iCount++;
                                addProduct(prod, true, quantity);
                            }
                        } else {
                            iCount++;
                            addProduct(item, true, quantity);
                        }
                    }
                }
                });
            }
        }

} // end of sdata lookup config object

}
  ,
{
    id : 'SalesOrderProducts_Delete',
  displayInInsert : true,
  imageClass: 'icon_Delete_16x16',  'alternateText' : SalesOrderProductsgrdItems_Strings['grdItems_Delete_ToolTip'] || 'Remove',
       mergePosition : 'After',   mergeControlId : 'btnRenumber',  'handler' : function() { this.deleteSelected(function () { if (Sage.Utility.getModeId() !== 'insert') { __doPostBack('MainContent', ''); } }); }
}
  ,
{
    id : 'SalesOrderProducts_Cancel',
  displayInInsert : false,
  imageClass: 'icon_Reset_16x16',  'alternateText' : SalesOrderProductsgrdItems_Strings['grdItems_Cancel_ToolTip'] || 'Reset',
       mergePosition : 'After',   mergeControlId : 'btnRenumber',  'handler' : function() { this.cancelChanges(); }
}
           ],
        onDataChange : function (entity, attribute, oldValue, newValue) {
    if (oldValue === newValue) {
        return;
    }
    if (attribute === 'Discount') {
        entity.CalculatedPrice = entity.Price - (entity.Price * entity.Discount);
    } else if (attribute === 'CalculatedPrice') {
		if (entity.Price == 0) {
            entity.Discount = 0;
        } else {
            entity.Discount = 1 - entity.CalculatedPrice / entity.Price;
        }
    }
    if ((attribute === 'Discount') || (attribute === 'CalculatedPrice') || (attribute === 'Quantity')) {
        entity.ExtendedPrice = entity.CalculatedPrice * entity.Quantity;
    }
    if (attribute === 'Program') {
        if (!entity.Product || typeof entity.Product.$key === 'undefined') {
            /* Custom product (FreeText). */
            entity.Program = null;
            return;
        }
        var sUrl = dojo.string.substitute("slxdata.ashx/slx/dynamic/-/productPrograms?select=Price&where=Product.Id eq '${0}' and Program eq '${1}'&format=json",
        [entity.Product.$key, escape(newValue)]);
        dojo.xhrGet({
            cache: false,
            preventCache: true,
            handleAs: 'json',
            url: sUrl,
            load: function (programPrice) {
                if (programPrice.$resources != null && programPrice.$resources.length == 1) {
                    entity.Price = programPrice.$resources[0].Price;
                    entity.CalculatedPrice = entity.Price - (entity.Price * entity.Discount);
                    entity.ExtendedPrice = entity.CalculatedPrice * entity.Quantity;
					grid.update();
                }
            },
            data: {},
            error: function (request, status, error) {
                var sError = dojo.string.substitute("There was an error opening ${0}. StatusText: ${1}; StatusCode: ${2}.", [sUrl, request.statusText, request.status]);
                if (dojo.isString(request.responseText)) {
                    if ((request.responseText.indexOf("[", 0) == 0) && (request.responseText.lastIndexOf("]") == request.responseText.length - 1)) {
                        var oSDataError = dojo.fromJson(request.responseText);
                        if (dojo.isArray(oSDataError)) {
                            sError = dojo.string.substitute("There was an error opening ${0}. Severity: ${1}; SDataCode: ${2}; Message: ${3}; ApplicationCode: ${4}; StatusText: ${5}; StatusCode: ${6}.",
                            [sUrl, oSDataError[0].severity, oSDataError[0].sdataCode, oSDataError[0].message, oSDataError[0].applicationCode, request.statusText, request.status]);
                        }
                    }
                }
                Sage.UI.Dialogs.showError(sError);
            }
        })
    }
    if (attribute === 'UnitOfMeasure') {
        if (!isIntegrationContractEnabled()) return;
        if (!entity.Product) return;
        var sUrl = dojo.string.substitute("slxdata.ashx/slx/dynamic/-/slxPrices?select=Price,Currency&where=UnitOfMeasure.Id eq '${0}' and AppId eq '${1}' and Product.Id eq '${2}' and SlxPriceList.Id eq '${3}' and ActiveFlag = true&format=json&_t=${4}",
            [newValue.$key, entity.SalesOrder.OperatingCompany.$key, entity.Product.$key, entity.SalesOrder.SlxPriceList.$key, (new Date().getTime().toString())]);
        dojo.xhrGet({
            cache: false,
            preventCache: true,
            handleAs: 'json',
            url: sUrl,
            load: function (slxPrice) {
                if (slxPrice.$resources != null && slxPrice.$resources.length == 1) {
                    entity.Price = slxPrice.$resources[0].Price;
                    entity.CalculatedPrice = entity.Price - (entity.Price * entity.Discount);
                    entity.ExtendedPrice = entity.CalculatedPrice * entity.Quantity;
                }
                else {
                    entity.Price = 0;
                    entity.CalculatedPrice = 0;
                    entity.ExtendedPrice = 0;
                }
				grid.update();
            },
            data: {},
            error: function (request, status, error) {
                var sError = dojo.string.substitute("There was an error opening ${0}. StatusText: ${1}; StatusCode: ${2}.", [sUrl, request.statusText, request.status]);
                if (dojo.isString(request.responseText)) {
                    if ((request.responseText.indexOf("[", 0) == 0) && (request.responseText.lastIndexOf("]") == request.responseText.length - 1)) {
                        var oSDataError = dojo.fromJson(request.responseText);
                        if (dojo.isArray(oSDataError)) {
                            sError = dojo.string.substitute("There was an error opening ${0}. Severity: ${1}; SDataCode: ${2}; Message: ${3}; ApplicationCode: ${4}; StatusText: ${5}; StatusCode: ${6}.",
                    [sUrl, oSDataError[0].severity, oSDataError[0].sdataCode, oSDataError[0].message, oSDataError[0].applicationCode, request.statusText, request.status]);
                        }
                    }
                }
                Sage.UI.Dialogs.showError(sError);
            }
        })
    }
},
        contextualCondition: function() { return 'SalesOrder.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'SalesOrderProducts',
		gridNodeId: 'SalesOrderProductsgrdItems_Grid',
				id : 'SalesOrderProductsgrdItems',
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
        setTimeout(function() { Sage.UI.Forms.SalesOrderProducts.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();