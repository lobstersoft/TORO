Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.ContactOpportunities = {

  

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
    
    if (typeof ContactOpportunitiesgrdOpportunities_Strings === 'undefined') {
        ContactOpportunitiesgrdOpportunities_Strings = {};
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
				name:  ContactOpportunitiesgrdOpportunities_Strings['grdOpportunities_e3bbf2a2_4be5_40e4_8546_518711a148ba_ColumnHeading']  || 'Opportunity Name',
	sortable: true,
		width: 17,
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
		field: 'Opportunity.Status',
				name:  ContactOpportunitiesgrdOpportunities_Strings['grdOpportunities_ad462c04_ef99_4f77_8bf8_b155be122547_ColumnHeading']  || 'Status',
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
		field: 'Opportunity.EstimatedClose',
				name:  ContactOpportunitiesgrdOpportunities_Strings['grdOpportunities_f24c7376_749d_43e0_b31e_437523eaedf3_ColumnHeading']  || 'Est. Close',
	sortable: true,
		width: 12,
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
				name:  ContactOpportunitiesgrdOpportunities_Strings['grdOpportunities_53dd7f36_5ffd_49f3_8020_ae4198b1ba88_ColumnHeading']  || 'Potential',
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
		field: 'Opportunity.CloseProbability',
				name:  ContactOpportunitiesgrdOpportunities_Strings['grdOpportunities_5443d461_c088_4a41_9df4_5da1ab259b5d_ColumnHeading']  || 'Probability',
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
		field: 'Opportunity.DaysOpen',
				name:  ContactOpportunitiesgrdOpportunities_Strings['grdOpportunities_45925347_de96_4111_b652_5a49177877b9_ColumnHeading']  || 'Days Open',
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
            resourceKind: 'opportunityContacts',
            newItemParentReferenceProperty: 'Contact',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'ContactOpportunitiesgrdOpportunities_DataCarrier',
            sort: [
    { attribute: "Opportunity.Description"
     }
                       ]
        },
        tools: [

{
  displayInInsert : false,
  type : 'Sage.UI.SDataLookup',
  controlConfig : 
{
  id : 'lueAddOpportunity',
  btnToolTip :  ContactOpportunitieslueAddOpportunity_Strings['lueAddOpportunity_ButtonTooltip']  ||  'Include Opportunity', 
  btnIcon:  '~/ImageResource.axd?scope=global&type=Global_Images&key=plus_16x16'  ,
  dialogButtonText : ContactOpportunitieslueAddOpportunity_Strings['lueAddOpportunity_DialogButtonText']  ||  'Add Selected', 
  displayMode : 4, //$ {qf control . LookupDisplayMode}  When adding other dijit templates, need to convert control to use enum values
  dialogTitle : ContactOpportunitieslueAddOpportunity_Strings['lueAddOpportunity_LookupDialogTitle']  ||  'Lookup Opportunity',
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
		   name: ContactOpportunitieslueAddOpportunity_Strings['lueAddOpportunity_LookupProperties_AccountManager_UserInfo_UserName_PropertyHeader']  || 'Acct. Manager',
		   field: 'AccountManager.UserInfo.UserName',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 17,
		   sortable: true
         }
         ,
		 {
		   name: ContactOpportunitieslueAddOpportunity_Strings['lueAddOpportunity_LookupProperties_Description_PropertyHeader']  || 'Description',
		   field: 'Description',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 8,
		   sortable: true
         }
         ,
		 {
		   name: ContactOpportunitieslueAddOpportunity_Strings['lueAddOpportunity_LookupProperties_Account_AccountName_PropertyHeader']  || 'Account',
		   field: 'Account.AccountName',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 8,
		   sortable: true
         }
         ,
		 {
		   name: ContactOpportunitieslueAddOpportunity_Strings['lueAddOpportunity_LookupProperties_Stage_PropertyHeader']  || 'Stage',
		   field: 'Stage',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 8,
		   sortable: true
         }
         ,
		 {
		   name: ContactOpportunitieslueAddOpportunity_Strings['lueAddOpportunity_LookupProperties_Status_PropertyHeader']  || 'Status',
		   field: 'Status',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 8,
		   sortable: true
         }
         ,
		 {
		   name: ContactOpportunitieslueAddOpportunity_Strings['lueAddOpportunity_LookupProperties_Owner_OwnerDescription_PropertyHeader']  || 'Owner',
		   field: 'Owner.OwnerDescription',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 8,
		   sortable: true
         }
       ]      }    ],   storeOptions: {
            sort: [ { attribute: 'AccountManager.UserInfo.UserName' } ],    
    resourceKind : 'opportunities',
	select : ['AccountManager.UserInfo.UserName','Description','Account.AccountName','Stage','Status','Owner.OwnerDescription']
  },
  gridOptions: {
		    selectionMode : 'Multi',
    rowsPerPage : 15
  }

} // end of sdata lookup config object

}
  ,
{
    id : 'ContactOpportunities_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : ContactOpportunitiesgrdOpportunities_Strings['grdOpportunities_Delete_ToolTip'] || 'Remove',
     appliedSecurity : 'Entities/Opportunity/Edit',      'handler' : function() { this.deleteSelected(); }
}
           ],
        contextualCondition: function() { return 'Contact.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'ContactOpportunities',
		gridNodeId: 'ContactOpportunitiesgrdOpportunities_Grid',
				id : 'ContactOpportunitiesgrdOpportunities',
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
     var lup = dijit.byId('lueAddOpportunity');
    if (lup) {
      lup.doSelected = function (items) {
        var grid = dijit.byId('ContactOpportunitiesgrdOpportunities');        
        grid.addAssociatedItems(items, "Contact", "Opportunity", lup);
      };
    }
    
});
}

  ,

    init : function(runtimeConfig) {
        setTimeout(function() { Sage.UI.Forms.ContactOpportunities.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();