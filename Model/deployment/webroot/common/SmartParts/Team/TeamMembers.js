Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.TeamMembers = {

  

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
    
    if (typeof TeamMembersgrdMembers_Strings === 'undefined') {
        TeamMembersgrdMembers_Strings = {};
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
				name:  TeamMembersgrdMembers_Strings['grdMembers_1029b5b9_8bbf_4005_b5de_5dc67f72beaa_ColumnHeading']  || 'Name',
	sortable: true,
		width: 15,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				,formatter: function(v, row, cell) {
  var item = cell.grid.getItem(row);
  return "<a href='javascript:Sage.Link.getTeamMemberLink(\"" + item.Child.Type + "\", \"" + item.Child.$key + "\")'>" + 
    Sage.Utility.htmlEncode(v) + "</a>";
}
		}
  	,
{
		field: 'OwnerSecurityProfile.ProfileDescription',
				name:  TeamMembersgrdMembers_Strings['grdMembers_d6016bfc_0528_4763_8c5e_891b3981be43_ColumnHeading']  || 'Security Profile',
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
		field: 'Child.Type',
				name:  TeamMembersgrdMembers_Strings['grdMembers_bfba721b_8b97_4afa_b081_accd61df6887_ColumnHeading']  || 'Type',
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
		field: 'CreateDate',
				name:  TeamMembersgrdMembers_Strings['grdMembers_d81642fa_d355_4f94_b430_3d2a517c507d_ColumnHeading']  || 'Created',
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
				name:  TeamMembersgrdMembers_Strings['grdMembers_289c9959_b3a3_4c90_a911_c12882cccecb_ColumnHeading']  || 'Last Modified',
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
				name:  TeamMembersgrdMembers_Strings['grdMembers_ba2d83bf_74cc_4580_b255_e69b2ca9008e_ColumnHeading']  || 'Modified By',
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
            select: ['Child.Id','Parent.Id'],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'TeamMembersgrdMembers_DataCarrier',
            sort: [
    { attribute: "Child.OwnerDescription"
     }
                       ]
        },
        tools: [

 {
    id : 'TeamMembers_btnRemoveFromTeam',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : TeamMembersgrdMembers_Strings['grdMembers_btnRemoveFromTeam_ToolTip'] || 'Remove members',
       mergePosition : 'After',   mergeControlId : 'lueAddTeamMember',  'handler' : function () {
         // Invoke the RemoveMember business rule for each team selected
         var grid = this;
         var selectedItems = grid.selection.getSelected();
         if (selectedItems.length < 1) {
             alert(grid.noSelectionsText);
             return;
         }
         if (!confirm(dojo.query("input[name$=ConfirmRemoveFromTeamText]")[0].value))
             return;
         var store = grid.store;
         grid.showLoading();
         var service = Sage.Data.SDataServiceRegistry.getSDataService('dynamic');
         var processOne = function (i) {
             var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
	            .setResourceKind('teams')
	            .setOperationName('RemoveMember');
             var id = store.getValue(selectedItems[i], "$key");
             var entry = {
                 "$name": "RemoveMember",
                 "request": {
                     "teamId": Sage.Utility.getCurrentEntityId(),
                     "member": { "$key": id }
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
                var ownerId = Sage.Utility.getCurrentEntityId();
                return 'Child.Id ne "' + ownerId + '" and Parent.Id eq "' + ownerId + '" and Child.OwnerDescription eq Child.OwnerView.Description';
            }
,
        
						tabId : 'TeamMembers',
		gridNodeId: 'TeamMembersgrdMembers_Grid',
				id : 'TeamMembersgrdMembers',
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
        setTimeout(function() { Sage.UI.Forms.TeamMembers.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();