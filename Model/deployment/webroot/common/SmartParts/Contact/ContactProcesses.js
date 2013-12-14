Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.ContactProcesses = {

  

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
    
    if (typeof ContactProcessesgrdProcesses_Strings === 'undefined') {
        ContactProcessesgrdProcesses_Strings = {};
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
		field: 'Name',
				name:  ContactProcessesgrdProcesses_Strings['grdProcesses_f673ca29_51ba_46b6_ab82_ae8971fc026c_ColumnHeading']  || 'Process',
	sortable: false,
		width: 13,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	,
{ 
    	field: 'Contact.NameLF',
				name:  ContactProcessesgrdProcesses_Strings['grdProcesses_d03552b2_d413_40d0_b441_166c68bf5b80_ColumnHeading']  || 'Contact',
	sortable: false,
		width: 12,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'Contact'
    ,idField: 'Contact.$key'
 }
  	,
{
		field: 'LastAction',
				name:  ContactProcessesgrdProcesses_Strings['grdProcesses_0801a878_b6fa_46e8_9f3b_014d07e6d73e_ColumnHeading']  || 'Last Action',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	dateOnly: false,
		type: DateTime
}
  	,
{
		field: 'NextAction',
				name:  ContactProcessesgrdProcesses_Strings['grdProcesses_fad41fff_1491_4776_a45c_f6c8e08072c9_ColumnHeading']  || 'Next Action',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	dateOnly: false,
		type: DateTime
}
  	,
{
		field: 'Suspended',
				name:  ContactProcessesgrdProcesses_Strings['grdProcesses_5bc6a365_fc88_4c6a_ac04_4b820783b95e_ColumnHeading']  || 'Suspended',
	sortable: true,
		width: 6,
		styles: 'width:auto;',
    cellClasses: '  aligncenter ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: CheckBox,
	defaultValue: "x"   }
  	,
{
		field: 'ChangeStatus',
				name:  ContactProcessesgrdProcesses_Strings['grdProcesses_0135b116_9df2_4261_baae_64068b033ed9_ColumnHeading']  || 'Change Status',
	sortable: false,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
, 
	defaultValue: '', 
	editable: false
				}
  	          ],
        storeOptions: {
            resourceKind: 'processes',
            newItemParentReferenceProperty: 'Contact',
            include: [],
            select: [],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'ContactProcessesgrdProcesses_DataCarrier',
            sort: [
                     ]
        },
        tools: [
         ],
        contextualCondition: function() { return 'Contact.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'ContactProcesses',
		gridNodeId: 'ContactProcessesgrdProcesses_Grid',
				id : 'ContactProcessesgrdProcesses',
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
        setTimeout(function() { Sage.UI.Forms.ContactProcesses.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();