Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.DefectTasks = {

  

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
    
    if (typeof DefectTasksQFSDataGrid_Strings === 'undefined') {
        DefectTasksQFSDataGrid_Strings = {};
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
		field: 'DefectActivityCode',
				name:  DefectTasksQFSDataGrid_Strings['QFSDataGrid_0f31a545_b3eb_4376_9be1_d782280951bd_ColumnHeading']  || 'Activity Type',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: PickList,
	pickListName: 'Defect Activity',		
	storageMode:  'id' ,
	displayMode: 'AsText'
}
  	,
{
		field: 'User.UserInfo.UserName',
				name:  DefectTasksQFSDataGrid_Strings['QFSDataGrid_1f81c6a0_6b8f_41cd_9b79_f4494ef9b93f_ColumnHeading']  || 'User',
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
		field: 'PerformedDate',
				name:  DefectTasksQFSDataGrid_Strings['QFSDataGrid_3c192154_b97f_4114_a0b3_98006c84c0f9_ColumnHeading']  || 'Received Date',
	sortable: true,
		width: 12,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	dateOnly: false,
		type: DateTime
}
  	,
{
		field: 'CompletedDate',
				name:  DefectTasksQFSDataGrid_Strings['QFSDataGrid_d69bde13_9701_4f76_831e_7b628c6e7a70_ColumnHeading']  || 'Completed Date',
	sortable: true,
		width: 12,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	dateOnly: false,
		type: DateTime
}
  	,
{
		field: 'DefectActivityRate.RateTypeCode',
				name:  DefectTasksQFSDataGrid_Strings['QFSDataGrid_eb485934_e8fb_4779_8c8c_c2fc4a6f96f2_ColumnHeading']  || 'Rate Type',
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
		field: 'Units',
				name:  DefectTasksQFSDataGrid_Strings['QFSDataGrid_0882c553_d70c_4e00_955f_86fbd1b8ab8d_ColumnHeading']  || 'Time Units',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: Numeric,
	    constraints: { places:  Sys.CultureInfo.CurrentCulture.numberFormat.NumberDecimalDigits ,  round: -1 },  
	formatType: 'Number'
}
  	,
{
		field: 'ElapsedUnits',
				name:  DefectTasksQFSDataGrid_Strings['QFSDataGrid_d710efdf_15a0_47bf_9bf3_5fd75236109e_ColumnHeading']  || 'Elapsed Hours',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: Numeric,
	    constraints: { places:   '0,2'  ,  round: -1 },  
	formatType: 'Number'
}
  	,
{
		field: 'TotalRate',
				name:  DefectTasksQFSDataGrid_Strings['QFSDataGrid_32c60f20_75c4_486a_b342_0c083e1d80ef_ColumnHeading']  || 'Total Fee',
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
    			field: '',
				name:  DefectTasksQFSDataGrid_Strings['QFSDataGrid_e922b190_ae70_4d7f_af2a_5f4ddbed026b_ColumnHeading']  || '',
	sortable: false,
		width: 5,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	   	type: SlxEdit,
		cellValue: DefectTasksQFSDataGrid_Strings['QFSDataGrid_e922b190_ae70_4d7f_af2a_5f4ddbed026b_Text']  || 'Edit',
		entityType: 'Sage.Entity.Interfaces.IDefectActivityItem, Sage.Entity.Interfaces',
		smartPart: 'AddEditDefectTask',
		dialogTitle: DefectTasksQFSDataGrid_Strings['29ccadbc_442d_4f0d_aad8_e3f169ba8859_DialogTitleOverride'] || 'Edit Defect Task',
		isCentered: true ,
		dialogTop: 0,
		dialogLeft: 0,
		dialogHeight: 400,
		dialogWidth: 600,
    	formObjectName: 'Sage.UI.Forms.DefectTasks'
    	    }
  	          ],
        storeOptions: {
            resourceKind: 'defectActivityItems',
            newItemParentReferenceProperty: 'Defect',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'DefectTasksQFSDataGrid_DataCarrier',
            sort: [
      { attribute: "PerformedDate"
     ,descending: true
     }
                        ]
        },
        tools: [

{
    id : 'DefectTasks_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : DefectTasksQFSDataGrid_Strings['QFSDataGrid_Delete_ToolTip'] || 'Delete',
       mergePosition : 'After',   mergeControlId : 'cmdAddTask',  'handler' : function() { this.deleteSelected(); }
}
           ],
        contextualCondition: function() { return 'Defect.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'DefectTasks',
		gridNodeId: 'DefectTasksQFSDataGrid_Grid',
				id : 'DefectTasksQFSDataGrid',
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
        setTimeout(function() { Sage.UI.Forms.DefectTasks.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();