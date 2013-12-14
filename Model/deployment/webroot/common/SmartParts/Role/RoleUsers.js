Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.RoleUsers = {

  

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
    
    if (typeof RoleUsersgrdRoles_Strings === 'undefined') {
        RoleUsersgrdRoles_Strings = {};
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
    	field: 'User.UserInfo.UserName',
				name:  RoleUsersgrdRoles_Strings['grdRoles_67620def_0232_4382_ad67_e8cdd30779af_ColumnHeading']  || 'Name',
	sortable: true,
		width: 16,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'User'
    ,idField: 'User.$key'
 }
  	,
{
		field: 'User.UserInfo.Division',
				name:  RoleUsersgrdRoles_Strings['grdRoles_b495e985_92d7_43cf_b279_9b67507ef789_ColumnHeading']  || 'Division',
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
		field: 'User.UserInfo.Region',
				name:  RoleUsersgrdRoles_Strings['grdRoles_cc7540c6_a0ff_4e90_b21a_3b7bfd60a601_ColumnHeading']  || 'Region',
	sortable: true,
		width: 15,
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
            newItemParentReferenceProperty: 'Role',
            include: [],
            select: ['User.Id'],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'RoleUsersgrdRoles_DataCarrier',
            sort: [
    { attribute: "User.UserInfo.UserName"
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
  btnToolTip :  RoleUsersgrdRoles_AddRelationTool_Strings['grdRoles_AddRelationTool_ButtonTooltip']  ||  'Add Users', 
  btnIcon:  '~/ImageResource.axd?scope=global&type=Global_Images&key=plus_16x16'  ,
  dialogButtonText : RoleUsersgrdRoles_AddRelationTool_Strings['grdRoles_AddRelationTool_DialogButtonText']  ||  'Add Selected', 
  displayMode : 4, //$ {qf control . LookupDisplayMode}  When adding other dijit templates, need to convert control to use enum values
  dialogTitle : RoleUsersgrdRoles_AddRelationTool_Strings['grdRoles_AddRelationTool_LookupDialogTitle']  ||  'Lookup User',
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
		   name: RoleUsersgrdRoles_AddRelationTool_Strings['grdRoles_AddRelationTool_LookupProperties_UserInfo_UserName_PropertyHeader']  || 'User Name',
		   field: 'UserInfo.UserName',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 17,
		   sortable: true
         }
         ,
		 {
		   name: RoleUsersgrdRoles_AddRelationTool_Strings['grdRoles_AddRelationTool_LookupProperties_UserInfo_Division_PropertyHeader']  || 'Division',
		   field: 'UserInfo.Division',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 12,
		   sortable: true
         }
         ,
		 {
		   name: RoleUsersgrdRoles_AddRelationTool_Strings['grdRoles_AddRelationTool_LookupProperties_UserInfo_Region_PropertyHeader']  || 'Region',
		   field: 'UserInfo.Region',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 12,
		   sortable: true
         }
         ,
		 {
		   name: RoleUsersgrdRoles_AddRelationTool_Strings['grdRoles_AddRelationTool_LookupProperties_Type_PropertyHeader']  || 'Type',
		   field: 'Type',
		   propertyType: 'Sage.Entity.Interfaces.UserType',
		   				   excludeFromFilters: false,		   
		   		   width: 12,
		   sortable: true
         }
       ]      }    ],   storeOptions: {
            sort: [ { attribute: 'UserInfo.UserName' } ],    
    resourceKind : 'users',
	select : ['UserInfo.UserName','UserInfo.Division','UserInfo.Region','Type']
  },
  gridOptions: {
		        contextualCondition: function() { return "Type ne 5 and Type ne 8 and Type ne 6"; },
	    selectionMode : 'Multi',
    rowsPerPage : 15
  }
  ,
  doSelected : function (items) {
        var entities = [];
        for (var i = 0; i < items.length; i++) {
            var role = {};
            var hasRole = false;

            // duplicate detection
            for (var k in grid.store.dataCache) {
                var rec = grid.store.dataCache[k];
                if (rec.User && rec.User.$key == items[i].$key)
                    hasRole = true;
            }
            if (hasRole)
                continue;

            //Insert mode check
            role.Role = { $key: Sage.Utility.getCurrentEntityId() };
            role.User = {};
            Sage.Utility.extend(role.User, items[i]);
            delete role.$key;
            delete role.$name;
            delete role.$url;
            entities.push(role);
        }
        if (entities.length > 0)
            grid.createItems(entities, function () { if (Sage.Utility.getModeId() !== 'insert') { __doPostBack("MainContent", ""); } });
    }

} // end of sdata lookup config object

}
  ,
{
    id : 'RoleUsers_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : RoleUsersgrdRoles_Strings['grdRoles_Delete_ToolTip'] || 'Remove',
          'handler' : function() { this.deleteSelected(); }
}
           ],
        contextualCondition: function() { return 'Role.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'RoleUsers',
		gridNodeId: 'RoleUsersgrdRoles_Grid',
				id : 'RoleUsersgrdRoles',
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
        setTimeout(function() { Sage.UI.Forms.RoleUsers.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();