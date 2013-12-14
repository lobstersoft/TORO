<%@ Control Language="C#" ClassName="OthersAccessToUserCal" Inherits="Sage.Platform.WebPortal.SmartParts.EntityBoundSmartPartInfoProvider" %>
<%@ Register Assembly="Sage.SalesLogix.Client.GroupBuilder" Namespace="Sage.SalesLogix.Client.GroupBuilder" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls.PickList" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls.DependencyLookup" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls.Lookup" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls.Timeline" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.SalesLogix.HighLevelTypes" Namespace="Sage.SalesLogix.HighLevelTypes" TagPrefix="SalesLogix" %>
<%@ Register Assembly="Sage.Platform.WebPortal" Namespace="Sage.Platform.WebPortal.SmartParts" TagPrefix="SalesLogix" %>

<%//------------------------------------------------------------------------
//This file was generated by a tool.  Changes to this file may cause incorrect behavior and will be lost if the code is regenerated.
//------------------------------------------------------------------------ %>
  <SalesLogix:SlxGridView runat="server" ID="grdOthersAccessToUserCal" GridLines="None"
AutoGenerateColumns="false" CellPadding="4" CssClass="datagrid" PagerStyle-CssClass="gridPager"
AlternatingRowStyle-CssClass="rowdk" RowStyle-CssClass="rowlt" SelectedRowStyle-CssClass="rowSelected" ShowEmptyTable="true" EnableViewState="false"
 AllowPaging="true" PageSize="10" OnPageIndexChanging="grdOthersAccessToUserCalpage_changing"  ExpandableRows="True" ResizableColumns="True"  OnRowCommand="grdOthersAccessToUserCal_RowCommand"
 DataKeyNames="InstanceId,UserId,CalUserId"
 AllowSorting="true" OnSorting="grdOthersAccessToUserCal_Sorting"  OnRowEditing="grdOthersAccessToUserCal_RowEditing"  OnRowDeleting="grdOthersAccessToUserCal_RowDeleting" OnRowDataBound="grdOthersAccessToUserCal_RowDataBound"  ShowSortIcon="true" >
<Columns>
   <asp:TemplateField   HeaderText="<%$ resources: grdOthersAccessToUserCal.2d6c6099-4395-484c-b05e-d5234a71438e.ColumnHeading %>"       SortExpression="OthersAccessToUserCal.UserInfo.UserName"  >
    <itemtemplate>
      <SalesLogix:PageLink runat="server" NavigateUrl="User"
   EntityId='<%# dsOthersAccessToUserCal.getPropertyValue(Container.DataItem, "OthersAccessToUserCal.Id") %>'     Text='<%# dsOthersAccessToUserCal.getPropertyValue(Container.DataItem, "OthersAccessToUserCal.UserInfo.UserName") %>'
         LinkType="EntityAlias"></SalesLogix:PageLink>
     </itemtemplate></asp:TemplateField>
      <asp:BoundField DataField="OthersAccessToUserCal.UserInfo.Title"
      HeaderText="<%$ resources: grdOthersAccessToUserCal.9a6f7e94-2986-4b4f-81f7-3d9da4f8b119.ColumnHeading %>"       SortExpression="OthersAccessToUserCal.UserInfo.Title"    >
      </asp:BoundField>
    <asp:BoundField DataField="OthersAccessToUserCal.Type"
      HeaderText="<%$ resources: grdOthersAccessToUserCal.e8a4a499-6195-4bd4-8007-26746047da8b.ColumnHeading %>"       SortExpression="OthersAccessToUserCal.Type"    >
      </asp:BoundField>
    <asp:CheckBoxField DataField="AllowAdd" ReadOnly="True"
      HeaderText="<%$ resources: grdOthersAccessToUserCal.95b537a7-b2d1-41cc-8dc6-622097b259cf.ColumnHeading %>"       SortExpression="AllowAdd"  >
          </asp:CheckBoxField>
    <asp:CheckBoxField DataField="AllowEdit" ReadOnly="True"
      HeaderText="<%$ resources: grdOthersAccessToUserCal.18ecb866-07cb-483e-bc03-d5daeeeea7b4.ColumnHeading %>"       SortExpression="AllowEdit"  >
          </asp:CheckBoxField>
    <asp:CheckBoxField DataField="AllowDelete" ReadOnly="True"
      HeaderText="<%$ resources: grdOthersAccessToUserCal.a467881b-7c3b-4a19-856b-440bfdd2638b.ColumnHeading %>"       SortExpression="AllowDelete"  >
          </asp:CheckBoxField>
    <asp:CheckBoxField DataField="AllowSync" ReadOnly="True"
      HeaderText="<%$ resources: grdOthersAccessToUserCal.12d97f1b-b92f-418d-9ff6-5c55ee5d8c60.ColumnHeading %>"       SortExpression="AllowSync"  >
          </asp:CheckBoxField>
  <asp:ButtonField CommandName="Edit"
  Text="<%$ resources: grdOthersAccessToUserCal.153ed2b5-e24d-4274-8515-72de62f2875f.Text %>"               >
          </asp:ButtonField>
     <asp:ButtonField CommandName="Delete"
  Text="<%$ resources: grdOthersAccessToUserCal.d534366d-6ce9-478f-a71a-e3722f1d9fc7.Text %>"                >
          </asp:ButtonField>
   </Columns>
    <PagerSettings Mode="NumericFirstLast" FirstPageImageUrl="ImageResource.axd?scope=global&type=Global_Images&key=Start_16x16" LastPageImageUrl="ImageResource.axd?scope=global&type=Global_Images&key=End_16x16" />
</SalesLogix:SlxGridView>

<script runat="server" type="text/C#">

                           private int _grdOthersAccessToUserCaldeleteColumnIndex = -2;
protected int grdOthersAccessToUserCalDeleteColumnIndex
{
    get
    {
        if (_grdOthersAccessToUserCaldeleteColumnIndex == -2)
        {
            int bias = (grdOthersAccessToUserCal.ExpandableRows) ? 1 : 0;
            _grdOthersAccessToUserCaldeleteColumnIndex = -1;
            int colcount = 0;
            foreach (DataControlField col in grdOthersAccessToUserCal.Columns)
            {
                ButtonField btn = col as ButtonField;
                if (btn != null)
                {
                    if (btn.CommandName == "Delete")
                    {
                        _grdOthersAccessToUserCaldeleteColumnIndex = colcount + bias;
                        break;
                    }
                }
                colcount++;
            }
        }
        return _grdOthersAccessToUserCaldeleteColumnIndex;
    }
}

protected void grdOthersAccessToUserCal_RowDataBound(object sender, GridViewRowEventArgs e)
{
    if (e.Row.RowType == DataControlRowType.DataRow)
    {
        if ((grdOthersAccessToUserCalDeleteColumnIndex >= 0) && (grdOthersAccessToUserCalDeleteColumnIndex < e.Row.Cells.Count))
        {
            TableCell cell = e.Row.Cells[grdOthersAccessToUserCalDeleteColumnIndex];
            foreach (Control c in cell.Controls)
            {
                LinkButton btn = c as LinkButton;
                if (btn != null)
                {
                    btn.Attributes.Add("onclick", "javascript: return confirm('" + Sage.Platform.WebPortal.PortalUtil.JavaScriptEncode(GetLocalResourceObject("grdOthersAccessToUserCal.d534366d-6ce9-478f-a71a-e3722f1d9fc7.ConfirmationMessage").ToString()) + "');");
                    return;
                }
            }
        }
    }
}
   
protected void grdOthersAccessToUserCalpage_changing(object sender, GridViewPageEventArgs e)
{
 grdOthersAccessToUserCal.PageIndex = e.NewPageIndex;
 grdOthersAccessToUserCal.DataBind();
}
protected void grdOthersAccessToUserCal_Sorting(object sender, GridViewSortEventArgs e) { }
protected void grdOthersAccessToUserCal_RowCommand(object sender, GridViewCommandEventArgs e)
{
    if (e.CommandName == "Page")
        return;
    int rowIndex;
    if (Int32.TryParse(e.CommandArgument.ToString(), out rowIndex))
    {
        dsOthersAccessToUserCal.SelectedIndex = rowIndex;
        object currentEntity = dsOthersAccessToUserCal.Current;
        if ((currentEntity is Sage.Platform.ComponentModel.ComponentView) && !((Sage.Platform.ComponentModel.ComponentView)currentEntity).IsVirtualComponent)
            currentEntity = ((Sage.Platform.ComponentModel.ComponentView)currentEntity).Component;
        string id = String.Empty;
        //Check if this is an unpersisted entity and use its InstanceId
        if (Sage.Platform.WebPortal.PortalUtil.ObjectIsNewEntity(currentEntity))
        {
            if (grdOthersAccessToUserCal.DataKeys[0].Values.Count > 1) {
                foreach (DictionaryEntry val in grdOthersAccessToUserCal.DataKeys[rowIndex].Values)
                {
                    if (val.Key.ToString() == "InstanceId")
                    {
                        Guid instanceId = (Guid)val.Value;
                        dsOthersAccessToUserCal.SetCurrentEntityByInstanceId(instanceId);
                        id = instanceId.ToString();
                        currentEntity = dsOthersAccessToUserCal.Current;
                        if ((currentEntity is Sage.Platform.ComponentModel.ComponentView) && !((Sage.Platform.ComponentModel.ComponentView)currentEntity).IsVirtualComponent)
                            currentEntity = ((Sage.Platform.ComponentModel.ComponentView)currentEntity).Component;
                    }
                }
            }
        }
        else
        {
            foreach (DictionaryEntry val in grdOthersAccessToUserCal.DataKeys[rowIndex].Values)
            {
                if (val.Key.ToString() != "InstanceId")
                {
                    if (string.IsNullOrEmpty(id))
                    {
                        id = val.Value.ToString();
                        ViewState["datakeyfield"] = val.Key;
                    }
                    else
                    {
                        id = string.Concat(id, ",", val.Value.ToString());
                        if (ViewState["datakeyfield"] == null)
                            ViewState["datakeyfield"] = val.Key;
                        else
                            ViewState["datakeyfield"] = string.Concat(ViewState["datakeyfield"], ",", val.Key);
                    }

                }
            }
        }
        if (e.CommandName.Equals("Edit"))
        {
            if (DialogService != null)
            {
                // QFDataGrid
                            DialogService.SetSpecs(235, 420, "EditCalPermissions", string.Empty );
                            DialogService.EntityType = typeof(Sage.Entity.Interfaces.IUserCalendar );
                DialogService.CompositeKeyNames = "UserId,CalUserId";
                DialogService.EntityID = id;
                DialogService.ShowDialog();
            }
        }
        if (e.CommandName.Equals("Delete"))
        {

              Sage.Entity.Interfaces.IUserCalendar childEntity = dsOthersAccessToUserCal.Current as Sage.Entity.Interfaces.IUserCalendar;

            object[] objarray = new object[] { this.BindingSource.Current, childEntity};
            Sage.Platform.EntityFactory.Execute<Sage.Entity.Interfaces.IUser>("User.RemoveOthersAccessToCalendar", objarray);
        }
    }
    grdOthersAccessToUserCal_refresh();
}
    protected void grdOthersAccessToUserCal_refresh()
    {
        if (PageWorkItem != null) {
            Sage.Platform.WebPortal.Services.IPanelRefreshService refresher = PageWorkItem.Services.Get<Sage.Platform.WebPortal.Services.IPanelRefreshService>();
            if (refresher != null)
            {
                refresher.RefreshAll();
            }
            else
            {
                Response.Redirect(Request.Url.ToString());
            }
        }
    }

        protected void grdOthersAccessToUserCal_RowEditing(object sender, GridViewEditEventArgs e)
    {
        grdOthersAccessToUserCal.SelectedIndex = e.NewEditIndex;
        e.Cancel = true;
    }
            protected void grdOthersAccessToUserCal_RowDeleting(object sender, GridViewDeleteEventArgs e)
    {
        grdOthersAccessToUserCal.SelectedIndex = -1;
    }
    </script>
 

 <SalesLogix:SmartPartToolsContainer runat="server" ID="OthersAccessToUserCal_LTools" ToolbarLocation="left">
    <div class="slxlabel"><asp:Label runat="server" ID="lblTabDescription" Text="<%$ resources: lblTabDescription.Text %>"  />
</div>
  </SalesLogix:SmartPartToolsContainer>

 <SalesLogix:SmartPartToolsContainer runat="server" ID="OthersAccessToUserCal_RTools" ToolbarLocation="right">
   <SalesLogix:LookupControl runat="server" ID="lueAddUser"  ToolTip="<%$ resources: lueAddUser.ToolTip %>" ButtonToolTip="<%$ resources: lueAddUser.ButtonToolTip %>" LookupEntityName="User" LookupEntityTypeName="Sage.Entity.Interfaces.IUser, Sage.Entity.Interfaces, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null" LookupDisplayMode="ButtonOnly" InitializeLookup="true" AutoPostBack="true" LookupImageURL="~/ImageResource.axd?scope=global&type=Global_Images&key=plus_16x16"  >
<LookupProperties>
<SalesLogix:LookupProperty PropertyHeader="<%$ resources: lueAddUser.LookupProperties.UserInfo.UserName.PropertyHeader %>" PropertyName="UserInfo.UserName" PropertyType="System.String" PropertyFormat="None" PropertyFormatString="" UseAsResult="True" ExcludeFromFilters="False"></SalesLogix:LookupProperty>
<SalesLogix:LookupProperty PropertyHeader="<%$ resources: lueAddUser.LookupProperties.UserInfo.Title.PropertyHeader %>" PropertyName="UserInfo.Title" PropertyType="System.String" PropertyFormat="None" PropertyFormatString="" UseAsResult="True" ExcludeFromFilters="False"></SalesLogix:LookupProperty>
<SalesLogix:LookupProperty PropertyHeader="<%$ resources: lueAddUser.LookupProperties.UserInfo.Department.PropertyHeader %>" PropertyName="UserInfo.Department" PropertyType="System.String" PropertyFormat="None" PropertyFormatString="" UseAsResult="True" ExcludeFromFilters="False"></SalesLogix:LookupProperty>
<SalesLogix:LookupProperty PropertyHeader="<%$ resources: lueAddUser.LookupProperties.UserInfo.Region.PropertyHeader %>" PropertyName="UserInfo.Region" PropertyType="System.String" PropertyFormat="None" PropertyFormatString="" UseAsResult="True" ExcludeFromFilters="False"></SalesLogix:LookupProperty>
<SalesLogix:LookupProperty PropertyHeader="<%$ resources: lueAddUser.LookupProperties.Type.PropertyHeader %>" PropertyName="Type" PropertyType="Sage.Entity.Interfaces.UserType" PropertyFormat="None" PropertyFormatString="" UseAsResult="True" ExcludeFromFilters="False"></SalesLogix:LookupProperty>
</LookupProperties>
<LookupPreFilters>
<SalesLogix:LookupPreFilter PropertyName="Type" PropertyType="Sage.Entity.Interfaces.UserType" OperatorCode="!=" Visible="False"
 FilterValue="8"
 ></SalesLogix:LookupPreFilter>
<SalesLogix:LookupPreFilter PropertyName="Type" PropertyType="Sage.Entity.Interfaces.UserType" OperatorCode="!=" Visible="False"
 FilterValue="6"
 ></SalesLogix:LookupPreFilter>
<SalesLogix:LookupPreFilter PropertyName="Type" PropertyType="Sage.Entity.Interfaces.UserType" OperatorCode="!=" Visible="False"
 FilterValue="5"
 ></SalesLogix:LookupPreFilter>
<SalesLogix:LookupPreFilter PropertyName="Type" PropertyType="Sage.Entity.Interfaces.UserType" OperatorCode="!=" Visible="False"
 FilterValue="7"
 ></SalesLogix:LookupPreFilter>
</LookupPreFilters>
</SalesLogix:LookupControl>
 

  <SalesLogix:PageLink ID="btnEditForm" CssClass="adminEditFormButton" runat="server" LinkType="RelativePath" ToolTip="<%$ resources: Portal, EditForm_ToolTip %>" NavigateUrl="~/FormManager.aspx?entityid=OthersAccessToUserCal&modeid=Detail" ImageUrl="~/ImageResource.axd?scope=global&type=Global_Images&key=form_manager_16x16"></SalesLogix:PageLink>
 
 
 
 
 <SalesLogix:PageLink ID="lnkOthersAccessToUserCalHelp" runat="server" LinkType="HelpFileName" ToolTip="<%$ resources: Portal, Help_ToolTip %>" Target="MCWebHelp" NavigateUrl="OthersAccessToUserCal" ImageUrl="~/ImageResource.axd?scope=global&type=Global_Images&key=Help_16x16"></SalesLogix:PageLink>
 </SalesLogix:SmartPartToolsContainer>



<script runat="server" type="text/C#">
/// <summary>
/// Gets or sets the role security service.
/// </summary>
/// <value>The role security service.</value>
[Sage.Platform.Application.ServiceDependency]
public Sage.Platform.Security.IRoleSecurityService RoleSecurityService { get; set; }

public override Type EntityType
{
    get { return typeof(Sage.Entity.Interfaces.IUser); }
}

 private Sage.Platform.WebPortal.Binding.WebEntityListBindingSource _dsOthersAccessToUserCal;
public Sage.Platform.WebPortal.Binding.WebEntityListBindingSource dsOthersAccessToUserCal
{ 
  get 
  {
    if (_dsOthersAccessToUserCal == null)
    {
             _dsOthersAccessToUserCal = new Sage.Platform.WebPortal.Binding.WebEntityListBindingSource(typeof(Sage.Entity.Interfaces.IUserCalendar), 
	    EntityType                     ,"GetUsersWithAccessToCalendar", System.Reflection.MemberTypes.Method);
            	   	}
 	return _dsOthersAccessToUserCal;
  }
}

void dsOthersAccessToUserCal_OnCurrentEntitySet(object sender, EventArgs e) 
{
      if (Visible)
    { 
		if(BindingSource.Current != null)
		{
		
      
        dsOthersAccessToUserCal.SourceObject = BindingSource.Current;
   		}
    }
   if (Visible)
   {   
      RegisterBindingsWithClient(dsOthersAccessToUserCal);
   }
}

 



 

protected override void OnAddEntityBindings() {
       dsOthersAccessToUserCal.Bindings.Add(new Sage.Platform.WebPortal.Binding.WebEntityListBinding("GetUsersWithAccessToCalendar()", grdOthersAccessToUserCal ));
   dsOthersAccessToUserCal.BindFieldNames = new String[] { "UserId","CalUserId","OthersAccessToUserCal.Id","OthersAccessToUserCal.UserInfo.UserName","OthersAccessToUserCal.UserInfo.Title","OthersAccessToUserCal.Type","AllowAdd","AllowEdit","AllowDelete","AllowSync" };
     
     BindingSource.OnCurrentEntitySet += new EventHandler(dsOthersAccessToUserCal_OnCurrentEntitySet);
    
           }
       
protected void lueAddUser_ChangeAction(object sender, EventArgs e) {
Sage.Platform.DynamicMethod.DynamicMethodLibrary lib = Sage.Platform.Orm.DynamicMethodLibraryHelper.Instance;
Object[] methodArgs = new Object[] { FormAdapter, e };
lib.Execute("OthersAccessToUserCal.lueAddUser_OnChange", methodArgs);

}

protected override void OnWireEventHandlers()
{
 base.OnWireEventHandlers();
 lueAddUser.LookupResultValueChanged += new EventHandler(lueAddUser_ChangeAction);


}

protected override void OnFormBound()
{
ClientBindingMgr.RegisterBoundControl(lueAddUser);

if (!RoleSecurityService.HasAccess("Administration/Forms/View"))
{
btnEditForm.Visible = false;
}
if (dsOthersAccessToUserCal.SourceObject == null) { dsOthersAccessToUserCal.SourceObject = BindingSource.Current; }
if (dsOthersAccessToUserCal.SourceObject == null) { RegisterBindingsWithClient(dsOthersAccessToUserCal); }
dsOthersAccessToUserCal.Bind();



}



public override Sage.Platform.Application.UI.ISmartPartInfo GetSmartPartInfo(Type smartPartInfoType)
{
    ToolsSmartPartInfo tinfo = new ToolsSmartPartInfo();
    
    foreach (Control c in Controls)
    {
        SmartPartToolsContainer cont = c as SmartPartToolsContainer;
        if (cont != null)
        {
            switch (cont.ToolbarLocation)
            {
                case SmartPartToolsLocation.Right:
                    foreach (Control tool in cont.Controls)
                    {
                                            tinfo.RightTools.Add(tool);
                                        }
                    break;
                case SmartPartToolsLocation.Center:
                    foreach (Control tool in cont.Controls)
                    {
                        tinfo.CenterTools.Add(tool);
                    }
                    break;
                case SmartPartToolsLocation.Left:
                    foreach (Control tool in cont.Controls)
                    {
                        tinfo.LeftTools.Add(tool);
                    }
                    break;
            }
        }
    }

        return tinfo;
}

private Sage.Platform.Controls.IEntityForm _formAdapter;

public Sage.Platform.Controls.IEntityForm FormAdapter
{
    get { return _formAdapter ?? (_formAdapter = new OthersAccessToUserCalAdapter(this)); }
}

public class OthersAccessToUserCalAdapter : Sage.Platform.WebPortal.Adapters.EntityFormAdapter, Sage.Form.Interfaces.IOthersAccessToUserCal
{
    public OthersAccessToUserCalAdapter(Sage.Platform.WebPortal.SmartParts.EntityBoundSmartPartInfoProvider smartPart)
        : base(smartPart) {}

    private Sage.Platform.Controls.IDataGridControl _grdOthersAccessToUserCal;
    public  Sage.Platform.Controls.IDataGridControl grdOthersAccessToUserCal
    {
        get { return FindControl(ref _grdOthersAccessToUserCal, "grdOthersAccessToUserCal"); }
    }
    private Sage.Platform.Controls.IDataSourceControl _dsOthersAccessToUserCal;
    public  Sage.Platform.Controls.IDataSourceControl dsOthersAccessToUserCal
    {
        get { return FindControl(ref _dsOthersAccessToUserCal, "dsOthersAccessToUserCal"); }
    }
    private Sage.Platform.Controls.ILabelControl _lblTabDescription;
    public  Sage.Platform.Controls.ILabelControl lblTabDescription
    {
        get { return FindControl(ref _lblTabDescription, "lblTabDescription"); }
    }
    private Sage.Platform.Controls.ILookupControl _lueAddUser;
    public  Sage.Platform.Controls.ILookupControl lueAddUser
    {
        get { return FindControl(ref _lueAddUser, "lueAddUser"); }
    }

    public  void lueAddUser_OnChange(System.EventArgs e)
    {
        Sage.Platform.DynamicMethod.DynamicMethodLibrary lib = Sage.Platform.Orm.DynamicMethodLibraryHelper.Instance;
        Object[] methodArgs = new Object[] { this, e };
        lib.Execute("OthersAccessToUserCal.lueAddUser_OnChange", methodArgs);
    }
}

</script>

<script type="text/javascript">
</script>
