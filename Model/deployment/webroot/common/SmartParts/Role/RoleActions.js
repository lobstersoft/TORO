Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.RoleActions = {

  

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
    
    if (typeof RoleActionsgrdActions_Strings === 'undefined') {
        RoleActionsgrdActions_Strings = {};
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
    	field: 'SecuredAction.Name',
				name:  RoleActionsgrdActions_Strings['grdActions_e7eaee1f_899d_4ba9_b582_28e6b2f7cfa0_ColumnHeading']  || 'Name',
	sortable: true,
		width: 15,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'SecuredAction'
    ,idField: 'SecuredAction.$key'
 }
  	,
{
		field: 'SecuredAction.Parent',
				name:  RoleActionsgrdActions_Strings['grdActions_352f9b5f_09f0_4957_8039_9e9c9cbec6f6_ColumnHeading']  || 'Parent',
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
		field: 'SecuredAction.Description',
				name:  RoleActionsgrdActions_Strings['grdActions_6e83b38d_22a6_410c_be4d_d54a43278d11_ColumnHeading']  || 'Description',
	sortable: true,
		width: '10',
	 	styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
			,formatter: Sage.Format.abbreviationFormatter(64)
				,formatter: Sage.Format.abbreviationFormatter(64)
	}
  	,
{
		field: 'ModifyUser',
				name:  RoleActionsgrdActions_Strings['grdActions_d4b59393_8e72_4f22_9130_c3d6baea4461_ColumnHeading']  || 'Modify User',
	sortable: true,
		width: 12,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	type: Sage.UI.Columns.SlxUser
}
  	,
{
		field: 'CreateUser',
				name:  RoleActionsgrdActions_Strings['grdActions_b0ffa555_4b26_4a1d_ad52_ee24d2395a1c_ColumnHeading']  || 'Created By',
	sortable: true,
		width: 12,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	type: Sage.UI.Columns.SlxUser
}
  	          ],
        storeOptions: {
            resourceKind: 'securedActionRoles',
            newItemParentReferenceProperty: 'Role',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'RoleActionsgrdActions_DataCarrier',
            sort: [
    { attribute: "SecuredAction.Name"
     }
                      ]
        },
        tools: [

{
  displayInInsert : false,
  type : 'Sage.UI.SDataLookup',
  controlConfig : 
{
  id : 'grdActions_AddRelationTool',
  btnToolTip :  RoleActionsgrdActions_AddRelationTool_Strings['grdActions_AddRelationTool_ButtonTooltip']  ||  'Add Action', 
  btnIcon:  '~/ImageResource.axd?scope=global&type=Global_Images&key=plus_16x16'  ,
  dialogButtonText : RoleActionsgrdActions_AddRelationTool_Strings['grdActions_AddRelationTool_DialogButtonText']  ||  'Add Selected', 
  displayMode : 4, //$ {qf control . LookupDisplayMode}  When adding other dijit templates, need to convert control to use enum values
  dialogTitle : RoleActionsgrdActions_AddRelationTool_Strings['grdActions_AddRelationTool_LookupDialogTitle']  ||  'Lookup Action',
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
		   name: RoleActionsgrdActions_AddRelationTool_Strings['grdActions_AddRelationTool_LookupProperties_Name_PropertyHeader']  || 'Name',
		   field: 'Name',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 17,
		   sortable: true
         }
         ,
		 {
		   name: RoleActionsgrdActions_AddRelationTool_Strings['grdActions_AddRelationTool_LookupProperties_Description_PropertyHeader']  || 'Description',
		   field: 'Description',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 18,
		   sortable: true
         }
         ,
		 {
		   name: RoleActionsgrdActions_AddRelationTool_Strings['grdActions_AddRelationTool_LookupProperties_Parent_PropertyHeader']  || 'Parent',
		   field: 'Parent',
		   propertyType: 'System.String',
		   				   excludeFromFilters: false,		   
		   		   width: 18,
		   sortable: true
         }
       ]      }    ],   storeOptions: {
            sort: [ { attribute: 'Name' } ],    
    resourceKind : 'securedActions',
	select : ['Name','Description','Parent']
  },
  gridOptions: {
		    selectionMode : 'Multi',
    rowsPerPage : 15
  }
  ,
  doSelected : function (items) {
        var entities = [];
        for (var i = 0; i < items.length; i++) {
            var action = {};
            var hasRec = false;

            // duplicate detection
            for (var k in grid.store.dataCache) {
                var rec = grid.store.dataCache[k];
                if (rec.SecuredAction && rec.SecuredAction.$key == items[i].$key)
                    hasRec = true;
            }
            if (hasRec)
                continue;

            //Insert mode check
            action.Role = { $key: Sage.Utility.getCurrentEntityId() };
            action.SecuredAction = {};
            Sage.Utility.extend(action.SecuredAction, items[i]);
            delete action.$key;
            delete action.$name;
            delete action.$url;
            entities.push(action);
        }
        if (entities.length > 0)
            grid.createItems(entities, function () { if (Sage.Utility.getModeId() !== 'insert') { __doPostBack("MainContent", ""); } });
        //this.lookupDialog.hide();
    }

} // end of sdata lookup config object

}
  ,
{
    id : 'RoleActions_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : RoleActionsgrdActions_Strings['grdActions_Delete_ToolTip'] || 'Remove',
          'handler' : function() { this.deleteSelected(); }
}
           ],
        contextualCondition: function() { return 'Role.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'RoleActions',
		gridNodeId: 'RoleActionsgrdActions_Grid',
				id : 'RoleActionsgrdActions',
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
        setTimeout(function() { Sage.UI.Forms.RoleActions.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();