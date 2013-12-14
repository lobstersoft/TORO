Sage.namespace("Sage.UI.Forms");
Sage.UI.Forms.ReturnDefects = {

  

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
    
    if (typeof ReturnDefectsgrdDefects_Strings === 'undefined') {
        ReturnDefectsgrdDefects_Strings = {};
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
    	field: 'Defect.DefectNumber',
				name:  ReturnDefectsgrdDefects_Strings['grdDefects_7b3b5848_c377_4a0a_ab27_fbcbcecea85c_ColumnHeading']  || 'Defect Number',
	sortable: true,
		width: 12,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
    ,type: SlxLink
    ,editable: false
    ,pageName: 'Defect'
    ,idField: 'Defect.$key'
 }
  	,
{
		field: 'Defect.PriorityCode',
				name:  ReturnDefectsgrdDefects_Strings['grdDefects_9b4b6c8a_7bb9_4b77_803e_ca724b96be0a_ColumnHeading']  || 'Priority',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: PickList,
	pickListName: 'Defect Priority',		
	storageMode:  'id' ,
	displayMode: 'AsText'
}
  	,
{
		field: 'Defect.SeverityCode',
				name:  ReturnDefectsgrdDefects_Strings['grdDefects_f2a0b6be_72db_48bf_9331_399e572482c2_ColumnHeading']  || 'Severity',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: PickList,
	pickListName: 'Defect Severity',		
	storageMode:  'id' ,
	displayMode: 'AsText'
}
  	,
{
		field: 'Defect.StatusCode',
				name:  ReturnDefectsgrdDefects_Strings['grdDefects_c862d469_4721_4244_a2ab_e088f1a0e204_ColumnHeading']  || 'Status',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: PickList,
	pickListName: 'Defect Status',		
	storageMode:  'id' ,
	displayMode: 'AsText'
}
  	,
{
		field: 'Defect.RecordedBy.User.UserInfo.NameLF',
				name:  ReturnDefectsgrdDefects_Strings['grdDefects_d92e00d6_14ea_4c60_bc34_66a6d9192a06_ColumnHeading']  || 'Recorded By',
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
		field: 'Defect.RecordedDate',
				name:  ReturnDefectsgrdDefects_Strings['grdDefects_21c64ce5_3901_4f15_8ec1_3ccebc09fd85_ColumnHeading']  || 'Recorded Date',
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
		field: 'Defect.AssignedTo.User.UserInfo.NameLF',
				name:  ReturnDefectsgrdDefects_Strings['grdDefects_6fd8d83c_c200_4ce5_bfa3_7e4065331381_ColumnHeading']  || 'Assigned To',
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
		field: 'Defect.AssignedDate',
				name:  ReturnDefectsgrdDefects_Strings['grdDefects_cc5f9ca6_373e_4f12_8ab3_d2c3bad1f058_ColumnHeading']  || 'Assigned Date',
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
		field: 'Defect.ClosedBy.User.UserInfo.NameLF',
				name:  ReturnDefectsgrdDefects_Strings['grdDefects_38adfbfc_16ab_4ecb_8e3c_0459811e8626_ColumnHeading']  || 'Closed By',
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
		field: 'Defect.ClosedDate',
				name:  ReturnDefectsgrdDefects_Strings['grdDefects_09d8089b_4409_4e81_baa0_2a50de8e789f_ColumnHeading']  || 'Closed Date',
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
		field: 'Defect.ResolutionCode',
				name:  ReturnDefectsgrdDefects_Strings['grdDefects_efc24cbb_fb04_4bd2_868e_87d5d87dd709_ColumnHeading']  || 'Resolution',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: PickList,
	pickListName: 'Defect Resolution',		
	storageMode:  'id' ,
	displayMode: 'AsText'
}
  	,
{
		field: 'Defect.FixedInbuild',
				name:  ReturnDefectsgrdDefects_Strings['grdDefects_5a690fdf_fa16_4af3_938c_e4ecfcc4d4a1_ColumnHeading']  || 'Fixed In Build',
	sortable: true,
		width: 10,
		styles: 'width:auto;',
    cellClasses: '  alignleft ',
	headerClasses: ' alignleft '
,
	editable: false,
	type: PickList,
	pickListName: 'Defect Fixed in Build',		
	storageMode:  'id' ,
	displayMode: 'AsText'
}
  	          ],
	 	         storeOptions: {
            resourceKind: 'defectReturns',
            newItemParentReferenceProperty: 'Return',
            include: [],
            select: ['Defect.Id'],
	    //The .net vehicle to store grid data on postback
            dataCarrierId: 'ReturnDefectsgrdDefects_DataCarrier',
            sort: [
    { attribute: "Defect.DefectNumber"
     ,descending: true
     }
                             ]
        },
        tools: [

{
    id : 'ReturnDefects_Delete',
  displayInInsert : false,
  imageClass: 'icon_Delete_16x16',  'alternateText' : ReturnDefectsgrdDefects_Strings['grdDefects_Delete_ToolTip'] || 'Remove',
       mergePosition : 'After',   mergeControlId : 'lueAssociateDefect',  'handler' : function() { this.deleteSelected(); }
}
           ],
        contextualCondition: function() { return 'Return.Id eq "' + Sage.Utility.getCurrentEntityId() + '"'; },
        
						tabId : 'ReturnDefects',
		gridNodeId: 'ReturnDefectsgrdDefects_Grid',
				id : 'ReturnDefectsgrdDefects',
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
        setTimeout(function() { Sage.UI.Forms.ReturnDefects.makeGrid(runtimeConfig); }, 1);

    }
};
if (typeof Sys !== 'undefined')
    Sys.Application.notifyScriptLoaded();