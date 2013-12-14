Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.UserTeamMembers = {

  

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
    
    if (typeof UserTeamMembersgrdTeams_Strings === 'undefined') {
        UserTeamMembersgrdTeams_Strings = {};
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
    	field: 'Child.OwnerDescription',
				name:  UserTeamMembersgrdTeams_Strings['grdTeams_463701ca_8ff2_43c1_a864_c673dec0100b_ColumnHeading']  || 'User',
	sortable: true,
		width: 15,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'User'
    ,idField: 'Child.User.$key'
 }
  	,
{
		field: 'OwnerSecurityProfile.ProfileDescription',
				name:  UserTeamMembersgrdTeams_Strings['grdTeams_d6016bfc_0528_4763_8c5e_891b3981be43_ColumnHeading']  || 'Security Profile',
	sortable: true,
		width: 12,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				,formatter: function (value, row, cell) {
   var item = cell.grid.getItem(row);
   var profileId = item.OwnerSecurityProfile.$key;
   var parentId = item.Parent.$key;
   var childId = item.Child.$key;

 return "<a href='javascript:Sage.Link.editSecurityProfile(\"" + 
   childId + "\",\"" + parentId + "\",\"" +
   profileId + "\")'>" + 
   Sage.Utility.htmlEncode(value) + "</a>";

}
		}
  	,
{
		field: 'CreateDate',
				name:  UserTeamMembersgrdTeams_Strings['grdTeams_d81642fa_d355_4f94_b430_3d2a517c507d_ColumnHeading']  || 'Created',
	sortable: true,
		width: 11,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	dateOnly: false,
		type: DateTime
}
  	,
{
		field: 'ModifyDate',
				name:  UserTeamMembersgrdTeams_Strings['grdTeams_289c9959_b3a3_4c90_a911_c12882cccecb_ColumnHeading']  || 'Last Modified',
	sortable: true,
		width: 11,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	dateOnly: false,
		type: DateTime
}
  	,
{
		field: 'ModifyUser',
				name:  UserTeamMembersgrdTeams_Strings['grdTeams_ba2d83bf_74cc_4580_b255_e69b2ca9008e_ColumnHeading']  || 'Modified By',
	sortable: true,
		width: 13,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	type: Sage.UI.Columns.SlxUser
}
  	          ],
	 	 	         storeOptions: {
            resourceKind: 'ownerJoins',
            include: [],
            select: ['Child/User','Parent'],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'UserTeamMembersgrdTeams_DataCarrier',
            sort: [
    { attribute: "Child.OwnerDescription"
     }
                      ]
        },
        tools: [

 {
    id : 'UserTeamMembers_btnRemoveFromTeam',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : UserTeamMembersgrdTeams_Strings['grdTeams_btnRemoveFromTeam_ToolTip'] || 'Remove',
       mergePosition : 'After',   mergeControlId : 'lueAddUser',  'handler' : function () {
         // Invoke the RemoveUserTeamMembership business rule for each team selected
         var grid = this;
         var selectedItems = grid.selection.getSelected();
         if (selectedItems.length < 1) {
             alert(grid.noSelectionsText);
             return;
         }
         if (!confirm(UserTeamMembersResources['ConfirmRemoveFromTeam']))
             return;
         var store = grid.store;
         grid.showLoading();
         var service = Sage.Data.SDataServiceRegistry.getSDataService('dynamic');
         var processOne = function (i) {
             var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
	            .setResourceKind('users')
	            .setOperationName('RemoveFromUserTeam');
             var id = selectedItems[i];
             var entry = {
                 "$name": "RemoveFromUserTeam",
                 "request": {
                     "UserId": Sage.Utility.getCurrentEntityId(),
                     "userTeam": id
                 }
             };
             request.execute(entry, {
                 success: function () {
                     i++;
                     if (i < selectedItems.length)
                         processOne(i);
                     else
                         grid.refresh();
                 }
             });
         }
         processOne(0);
     }

}
           ],
        contextualCondition: function () {
                var ownerId = dojo.query("input[name$=DefaultOwnerId]")[0].value;
                return 'Child.Id ne "' + ownerId + '" and Parent.Id eq "' + ownerId + '" and Child.OwnerDescription eq Child.OwnerView.Description';
            }
,
        
						tabId : 'UserTeamMembers',
		gridNodeId: 'UserTeamMembersgrdTeams_Grid',
				id : 'UserTeamMembersgrdTeams',
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
        setTimeout(function() { Sage.UI.Forms.UserTeamMembers.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();