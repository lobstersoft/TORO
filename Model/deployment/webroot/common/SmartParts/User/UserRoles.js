Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.UserRoles = {

  

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
    
    if (typeof UserRolesgrdRoles_Strings === 'undefined') {
        UserRolesgrdRoles_Strings = {};
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
    	field: 'Role.RoleName',
				name:  UserRolesgrdRoles_Strings['grdRoles_67620def_0232_4382_ad67_e8cdd30779af_ColumnHeading']  || 'Name',
	sortable: true,
		width: 15,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'Role'
    ,idField: 'Role.$key'
 }
  	,
{
		field: 'Role.RoleDescription',
				name:  UserRolesgrdRoles_Strings['grdRoles_b495e985_92d7_43cf_b279_9b67507ef789_ColumnHeading']  || 'Description',
	sortable: true,
		width: 50,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	          ],
	 	         storeOptions: {
            resourceKind: 'userRoles',
            newItemParentReferenceProperty: 'User',
            include: [],
            select: ['Role.Id'],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'UserRolesgrdRoles_DataCarrier',
            sort: [
    { attribute: "Role.RoleName"
     }
                   ]
        },
        tools: [

{
  displayInInsert : false,
  type : 'Sage.UI.SDataLookup',
  controlConfig : 
{
  id : 'grdRoles_AddRelationTool',
  btnToolTip :  UserRolesgrdRoles_AddRelationTool_Strings['grdRoles_AddRelationTool_ButtonTooltip']  ||  'Add Role', 
  btnIcon:  '~/ImageResource.axd?scope=global&type=Global_Images&key=plus_16x16'  ,
  dialogButtonText : UserRolesgrdRoles_AddRelationTool_Strings['grdRoles_AddRelationTool_DialogButtonText']  ||  'Add Selected', 
  displayMode : 4, //$ {qf control . LookupDisplayMode}  When adding other dijit templates, need to convert control to use enum values
  dialogTitle : UserRolesgrdRoles_AddRelationTool_Strings['grdRoles_AddRelationTool_LookupDialogTitle']  ||  'Lookup Role',
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
		   name: UserRolesgrdRoles_AddRelationTool_Strings['grdRoles_AddRelationTool_LookupProperties_RoleName_PropertyHeader']  || 'Name',
		   field: 'RoleName',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 17,
		   sortable: true
         }
         ,
		 {
		   name: UserRolesgrdRoles_AddRelationTool_Strings['grdRoles_AddRelationTool_LookupProperties_RoleDescription_PropertyHeader']  || 'Description',
		   field: 'RoleDescription',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 36,
		   sortable: true
         }
       ]      }    ],   storeOptions: {
            sort: [ { attribute: 'RoleName' } ],    
    resourceKind : 'roles',
	select : ['RoleName','RoleDescription']
  },
  gridOptions: {
		    selectionMode : 'Multi',
    rowsPerPage : 15
  }
  ,
  doSelected : function (items) {
        dojo.require('Sage.UI.Dialogs'); 
        var entities = [];
        for (var i = 0; i < items.length; i++) {
            var role = {};
            var hasRole = false;

            // duplicate detection
            for (var k in grid.store.dataCache) {
                var rec = grid.store.dataCache[k];
                if (rec.Role && rec.Role.$key == items[i].$key)
                    hasRole = true;
            }
            if (hasRole) {
				Sage.UI.Dialogs.showError("This role is already associated to this user."); 
                continue;
			}

            //Insert mode check
            role.User = { $key: Sage.Utility.getCurrentEntityId() };
            role.Role = {};
            Sage.Utility.extend(role.Role, items[i]);
            delete role.$key;
            delete role.$name;
            delete role.$url;
            entities.push(role);
        }
        if (entities.length > 0)
            grid.createItems(entities, function () { if (Sage.Utility.getModeId() !== 'insert') { __doPostBack("MainContent", ""); } });
       this.lookupDialog.hide();
    }

} // end of sdata lookup config object

}
  ,
{
    id : 'UserRoles_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : UserRolesgrdRoles_Strings['grdRoles_Delete_ToolTip'] || 'Remove',
          'handler' : function() { this.deleteSelected(); }
}
           ],
        contextualCondition: function() { return 'User.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'UserRoles',
		gridNodeId: 'UserRolesgrdRoles_Grid',
				id : 'UserRolesgrdRoles',
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
        setTimeout(function() { Sage.UI.Forms.UserRoles.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();