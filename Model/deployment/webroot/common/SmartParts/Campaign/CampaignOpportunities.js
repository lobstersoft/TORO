Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.CampaignOpportunities = {

  

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
    
    if (typeof CampaignOpportunitiesgrdOpportunities_Strings === 'undefined') {
        CampaignOpportunitiesgrdOpportunities_Strings = {};
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
    	field: 'Opportunity.Description',
				name:  CampaignOpportunitiesgrdOpportunities_Strings['grdOpportunities_7438482c_d9e5_4978_9778_b00d476f16c3_ColumnHeading']  || 'Description',
	sortable: true,
		width: 13,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'Opportunity'
    ,idField: 'Opportunity.$key'
 }
  	,
{ 
    	field: 'Opportunity.Account.AccountName',
				name:  CampaignOpportunitiesgrdOpportunities_Strings['grdOpportunities_83ede377_35fd_49bc_a7c1_c0975d6ad490_ColumnHeading']  || 'Account',
	sortable: true,
		width: 13,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'Account'
    ,idField: 'Opportunity.Account.$key'
 }
  	,
{
		field: 'Opportunity.EstimatedClose',
				name:  CampaignOpportunitiesgrdOpportunities_Strings['grdOpportunities_30c6cef1_75d0_4dd2_9006_6c3ddbe4935d_ColumnHeading']  || 'Estimated Close',
	sortable: true,
		width: 9,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	dateOnly: true,
		type: DateTime
}
  	,
{
		field: 'Opportunity.SalesPotential',
				name:  CampaignOpportunitiesgrdOpportunities_Strings['grdOpportunities_cfbd65ef_dbf7_49a4_81f5_6e774c4e29c1_ColumnHeading']  || 'Potential',
	sortable: true,
		width: 9,
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
		field: 'Opportunity.CloseProbability',
				name:  CampaignOpportunitiesgrdOpportunities_Strings['grdOpportunities_cebbfea8_0b73_4806_8f08_d96cca75e51b_ColumnHeading']  || 'Close Prob.',
	sortable: true,
		width: 6,
		styles: 'width:auto;',
    cellClasses: '  alignright ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: Numeric,
	    constraints: { places:   '0,0'  ,  round: -1 },  
	formatType: 'Number'
}
  	,
{
		field: 'Opportunity.Weighted',
				name:  CampaignOpportunitiesgrdOpportunities_Strings['grdOpportunities_dab3d163_8c0c_4b62_b911_5ea32bca077e_ColumnHeading']  || 'Weighted',
	sortable: false,
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
		field: 'Opportunity.Status',
				name:  CampaignOpportunitiesgrdOpportunities_Strings['grdOpportunities_942f021f_0787_402e_b6a8_162fee0d4f27_ColumnHeading']  || 'Status',
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
		field: 'Opportunity.AccountManager.UserInfo.UserName',
				name:  CampaignOpportunitiesgrdOpportunities_Strings['grdOpportunities_c056a4c9_fa04_4e32_b53f_31abe4b9b450_ColumnHeading']  || 'Acct Manager',
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
		field: 'Opportunity.ModifyDate',
				name:  CampaignOpportunitiesgrdOpportunities_Strings['grdOpportunities_a9b89c17_8737_4179_929b_f5402839ffe7_ColumnHeading']  || 'Last Updated',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	dateOnly: false,
		type: DateTime
}
  	          ],
        storeOptions: {
            resourceKind: 'opportunityCampaigns',
            newItemParentReferenceProperty: 'Campaign',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'CampaignOpportunitiesgrdOpportunities_DataCarrier',
            sort: [
                        ]
        },
        tools: [

{
    id : 'CampaignOpportunities_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : CampaignOpportunitiesgrdOpportunities_Strings['grdOpportunities_Delete_ToolTip'] || 'Remove',
          'handler' : function() { this.deleteSelected(); }
}
           ],
        contextualCondition: function() { return 'Campaign.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'CampaignOpportunities',
		gridNodeId: 'CampaignOpportunitiesgrdOpportunities_Grid',
				id : 'CampaignOpportunitiesgrdOpportunities',
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
        setTimeout(function() { Sage.UI.Forms.CampaignOpportunities.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();