Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.TicketActivityParts = {

  

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
    
    if (typeof TicketActivityPartsgrdActivityParts_Strings === 'undefined') {
        TicketActivityPartsgrdActivityParts_Strings = {};
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
		field: 'TicketActivity.ActivityTypeCode',
				name:  TicketActivityPartsgrdActivityParts_Strings['grdActivityParts_2373a41b_87d9_4b7c_90da_971b0b54d0c5_ColumnHeading']  || 'Ticket Activity',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: PickList,
	pickListName: 'Ticket Activity',		
	storageMode:  'id' ,
	displayMode: 'AsText'
}
  	,
{
		field: 'AccountProduct.ProductName',
				name:  TicketActivityPartsgrdActivityParts_Strings['grdActivityParts_9d3402ca_f3c1_4cb5_b118_016de4349de1_ColumnHeading']  || 'Product',
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
				name:  TicketActivityPartsgrdActivityParts_Strings['grdActivityParts_b1165945_e43b_4cc8_bb56_630e3e80535c_ColumnHeading']  || 'Serial Number',
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
		field: 'AccountProduct.ActualId',
				name:  TicketActivityPartsgrdActivityParts_Strings['grdActivityParts_5ece826e_d3e3_482d_8c0f_ea72bc664897_ColumnHeading']  || 'SKU',
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
				name:  TicketActivityPartsgrdActivityParts_Strings['grdActivityParts_8e9dc831_b1fd_43e0_b6f5_dfb0c44d751f_ColumnHeading']  || 'Price',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
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
		field: 'ItemDescription',
				name:  TicketActivityPartsgrdActivityParts_Strings['grdActivityParts_86f7a539_714d_4ae1_ae45_af0c526e277b_ColumnHeading']  || 'Description',
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
  	,
{ 
    	field: 'TicketActivity.Id',
	    displayFields: ['TicketActivity.Id'],
    displayFormatString: TicketActivityPartsgrdActivityParts_Strings['grdActivityParts_80f6dedf_57fe_47b3_9298_4403df4612f9_FormatString']  || 'Edit Ticket Activity',
				name:  TicketActivityPartsgrdActivityParts_Strings['grdActivityParts_80f6dedf_57fe_47b3_9298_4403df4612f9_ColumnHeading']  || ' ',
	sortable: false,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'TicketActivity'
    ,idField: 'TicketActivity.$key'
 }
  	,
{
    			field: '',
				name:  TicketActivityPartsgrdActivityParts_Strings['grdActivityParts_a116eddf_12f1_44ba_b510_7e40e6f6e59c_ColumnHeading']  || '',
	sortable: false,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	   	type: SlxEdit,
		cellValue: TicketActivityPartsgrdActivityParts_Strings['grdActivityParts_a116eddf_12f1_44ba_b510_7e40e6f6e59c_Text']  || 'Edit Part',
		entityType: 'Sage.Entity.Interfaces.ITicketActivityItem, Sage.Entity.Interfaces',
		smartPart: 'AddEditTicketActivityItem',
		dialogTitle: TicketActivityPartsgrdActivityParts_Strings['c66600f9_1fe4_4821_9ece_c93d5457d9f6_DialogTitleOverride'] || 'Edit Ticket Activity Part',
		isCentered: true ,
		dialogTop: 0,
		dialogLeft: 0,
		dialogHeight: 400,
		dialogWidth: 400,
    	formObjectName: 'Sage.UI.Forms.TicketActivityParts'
    	    }
  	          ],
	 	         storeOptions: {
            resourceKind: 'ticketActivityItems',
            include: [],
            select: ['TicketActivity.Id'],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'TicketActivityPartsgrdActivityParts_DataCarrier',
            sort: [
     { attribute: "AccountProduct.ProductName"
     }
                        ]
        },
        tools: [

{
    id : 'TicketActivityParts_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : TicketActivityPartsgrdActivityParts_Strings['grdActivityParts_Delete_ToolTip'] || 'Remove',
          'handler' : function() { this.deleteSelected(); }
}
  ,
 {
    id : 'TicketActivityParts_btnCopy',
  displayInInsert : false,
  imageClass: 'icon_Copy_16x16',  'alternateText' : TicketActivityPartsgrdActivityParts_Strings['grdActivityParts_btnCopy_ToolTip'] || 'Copy Part',
          'handler' : 
              function () {
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
              Sage.UI.Dialogs.showError(dojo.string.substitute('An error occured copying part: ${0}', [result]));
              }
              });
              }
              };
              fnCopy(0);
              }
            
}
           ],
        contextualCondition: function() { return 'TicketActivity.Ticket.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'TicketActivityParts',
		gridNodeId: 'TicketActivityPartsgrdActivityParts_Grid',
				id : 'TicketActivityPartsgrdActivityParts',
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
        setTimeout(function() { Sage.UI.Forms.TicketActivityParts.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();