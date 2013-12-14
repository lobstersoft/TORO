Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.AccountOpportunities = {

  

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
    
    if (typeof AccountOpportunitiesgrdOpportunities_Strings === 'undefined') {
        AccountOpportunitiesgrdOpportunities_Strings = {};
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
    	field: 'Description',
				name:  AccountOpportunitiesgrdOpportunities_Strings['grdOpportunities_38029fed_9a11_4909_acb0_172580949665_ColumnHeading']  || 'Opportunity Name',
	sortable: true,
		width: '10',
	 	styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'Opportunity'
    ,idField: '$key'
 }
  	,
{
		field: 'Status',
				name:  AccountOpportunitiesgrdOpportunities_Strings['grdOpportunities_676ac648_6253_4fec_87e8_88b2437c51fd_ColumnHeading']  || 'Status',
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
		field: 'SalesPotential',
				name:  AccountOpportunitiesgrdOpportunities_Strings['grdOpportunities_19474684_0f99_413c_abea_6afc786caee2_ColumnHeading']  || 'Potential',
	sortable: true,
		width: 8,
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
		field: 'CloseProbability',
				name:  AccountOpportunitiesgrdOpportunities_Strings['grdOpportunities_2c849f60_beb9_43bf_bdf5_5798180ace75_ColumnHeading']  || 'Probability',
	sortable: true,
		width: 8,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				,formatter: function(v) { return v + " %" }
		}
  	,
{
		field: 'DaysOpen',
				name:  AccountOpportunitiesgrdOpportunities_Strings['grdOpportunities_6f2dc306_def2_481b_826d_7d86d4be6d1c_ColumnHeading']  || 'Days Open',
	sortable: false,
		width: 8,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	          ],
        storeOptions: {
            resourceKind: 'opportunities',
            newItemParentReferenceProperty: 'Account',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'AccountOpportunitiesgrdOpportunities_DataCarrier',
            sort: [
                    ]
        },
        tools: [
         ],
        contextualCondition: function() { return 'Account.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'AccountOpportunities',
		gridNodeId: 'AccountOpportunitiesgrdOpportunities_Grid',
				id : 'AccountOpportunitiesgrdOpportunities',
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
        setTimeout(function() { Sage.UI.Forms.AccountOpportunities.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();