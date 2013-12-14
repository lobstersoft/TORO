Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.DepartmentMembership = {

  

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
    
    if (typeof DepartmentMembershipgrdDepartments_Strings === 'undefined') {
        DepartmentMembershipgrdDepartments_Strings = {};
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
    	field: 'Parent.OwnerDescription',
				name:  DepartmentMembershipgrdDepartments_Strings['grdDepartments_754cbfab_117f_4b69_9777_3a3cd9953823_ColumnHeading']  || 'Department',
	sortable: true,
		width: 12,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'Department'
    ,idField: 'Parent.$key'
 }
  	,
{
		field: 'CreateDate',
				name:  DepartmentMembershipgrdDepartments_Strings['grdDepartments_9f82b192_6e9a_4d05_bef5_14a5fe79bc42_ColumnHeading']  || 'Created',
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
				name:  DepartmentMembershipgrdDepartments_Strings['grdDepartments_6f42efe5_b956_4480_b51b_797941c1e558_ColumnHeading']  || 'Last Modified',
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
				name:  DepartmentMembershipgrdDepartments_Strings['grdDepartments_c3344641_05fa_4d35_8159_fe31e3ea5d01_ColumnHeading']  || 'Modified By',
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
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'DepartmentMembershipgrdDepartments_DataCarrier',
            sort: [
    { attribute: "Parent.OwnerDescription"
     }
                     ]
        },
        tools: [

 {
    id : 'DepartmentMembership_btnRemoveFromDepartment',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : DepartmentMembershipgrdDepartments_Strings['grdDepartments_btnRemoveFromDepartment_ToolTip'] || 'Remove',
       mergePosition : 'After',   mergeControlId : 'lueAddDepartment',  'handler' : function () {
         // Invoke the RemoveFromDepartment business rule for each department selected
         var grid = this;
         var selectedItems = grid.selection.getSelected();
         if (selectedItems.length < 1) {
             alert(grid.noSelectionsText);
             return;
         }
         if (!confirm(DepartmentMembershipResources['ConfirmRemoveFromDept']))
             return;
         var store = grid.store;
         //grid.showLoading();
         var service = Sage.Data.SDataServiceRegistry.getSDataService('dynamic');
         var processOne = function (i) {
             var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
	            .setResourceKind('users')
	            .setOperationName('RemoveFromDepartment');
			
			 var ownerJoin = selectedItems[i];
             var entry = {
                 "$name": "RemoveFromDepartment",
                 "request": {
                     "UserId": Sage.Utility.getCurrentEntityId(),
                     "department": ownerJoin
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
                return 'Child.Id eq "' + ownerId + '" and Parent.Id ne "ADMIN       " and Parent.Id ne "SYST00000001" and Parent.Id ne "SYST00000002" and Parent.Id ne "DEPT00000000" and Parent.Type eq "Department"';
            },
        
						tabId : 'DepartmentMembership',
		gridNodeId: 'DepartmentMembershipgrdDepartments_Grid',
				id : 'DepartmentMembershipgrdDepartments',
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
        setTimeout(function() { Sage.UI.Forms.DepartmentMembership.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();