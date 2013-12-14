Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.AccountContracts = {

  

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
    
    if (typeof AccountContractsgrdContracts_Strings === 'undefined') {
        AccountContractsgrdContracts_Strings = {};
    }

    var options = {		
		        context: runtimeConfig,		
						previewField: 'Notes',
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
    	field: 'ReferenceNumber',
				name:  AccountContractsgrdContracts_Strings['grdContracts_34c4bcf8_16f7_4316_b289_21d1ca7210bf_ColumnHeading']  || 'Reference #',
	sortable: true,
		width: 8,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'Contract'
    ,idField: '$key'
 }
  	,
{
		field: 'ServiceCode',
				name:  AccountContractsgrdContracts_Strings['grdContracts_34e74768_3ecb_4d9c_903a_785dd249e4ee_ColumnHeading']  || 'Service Type',
	sortable: true,
		width: 9,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: PickList,
	pickListName: 'Contract Service Type',		
	storageMode:  'id' ,
	displayMode: 'AsText'
}
  	,
{
		field: 'TypeCode',
				name:  AccountContractsgrdContracts_Strings['grdContracts_e8caaaf4_3f93_4acd_9011_f6e132ebe808_ColumnHeading']  || 'Contract Type',
	sortable: true,
		width: 9,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: PickList,
	pickListName: 'Contract Type',		
	storageMode:  'id' ,
	displayMode: 'AsText'
}
  	,
{
		field: 'IsActive',
				name:  AccountContractsgrdContracts_Strings['grdContracts_5551fa7f_8c5f_4d99_89ea_2e4312e11d2d_ColumnHeading']  || 'Active',
	sortable: true,
		width: 5,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: CheckBox,
	defaultValue: "x"   }
  	,
{
		field: 'Period',
				name:  AccountContractsgrdContracts_Strings['grdContracts_d546f63e_6d3e_4160_abae_336e0ba9dc56_ColumnHeading']  || 'Quantity',
	sortable: true,
		width: 5,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	,
{
		field: 'Remaining',
				name:  AccountContractsgrdContracts_Strings['grdContracts_787e79ab_fe3b_4e94_8f3e_08897ca94a76_ColumnHeading']  || 'Remaining',
	sortable: true,
		width: 5,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	,
{
		field: 'StartDate',
				name:  AccountContractsgrdContracts_Strings['grdContracts_000ad7ad_e800_4eb3_b528_19c98d4fe801_ColumnHeading']  || 'Start Date',
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
		field: 'EndingDate',
				name:  AccountContractsgrdContracts_Strings['grdContracts_1ba33b72_834b_4c23_a3da_a921f1481e16_ColumnHeading']  || 'End Date',
	sortable: true,
		width: 12,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	dateOnly: false,
		type: DateTime
}
  	          ],
        storeOptions: {
            resourceKind: 'contracts',
            newItemParentReferenceProperty: 'Account',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'AccountContractsgrdContracts_DataCarrier',
            sort: [
    { attribute: "ReferenceNumber"
     }
                         ]
        },
        tools: [
         ],
        contextualCondition: function() { return 'Account.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
				     slxContext: dojo.mixin({ tabId : 'AccountContracts' }, runtimeConfig),	   
				id : 'AccountContractsgrdContracts',
        rowsPerPage: 20,
        singleClickEdit: true
    };

	
	var grid = new SLXPreviewGrid.Grid(options, 'AccountContractsgrdContracts_Grid');
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
        setTimeout(function() { Sage.UI.Forms.AccountContracts.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();