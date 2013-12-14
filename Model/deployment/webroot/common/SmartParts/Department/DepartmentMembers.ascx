<%@ Control Language="C#" ClassName="DepartmentMembers" Inherits="Sage.Platform.WebPortal.SmartParts.EntityBoundSmartPartInfoProvider" %>
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
   <%@ Register Assembly="Sage.SalesLogix.Web.Controls" Namespace="Sage.SalesLogix.Web.Controls.ScriptResourceProvider" TagPrefix="SalesLogix" %>
  <%--Grid style overrides for quickform configurations and textbox compatibility with IE7.--%>
<style 
type="text/css">     
    .alignleft { text-align : left; }
    .alignright { text-align : right; }
    .aligncenter { text-align : center; }
	.dijitTextBox { width: auto; }
	.ISOSpace {width: 75% !important; }
</style>

	   

<SalesLogix:ScriptResourceProvider ID="DepartmentMembersgrdMembers_Strings" runat="server">
    <Keys>
          <SalesLogix:ResourceKeyName Key="grdMembers.8b6e5251-3e4b-459a-8114-471c7a34b5ff.ColumnHeading" />
       <SalesLogix:ResourceKeyName Key="grdMembers.2c3a38c1-f716-4f5a-b700-f40e7987882c.ColumnHeading" />
       <SalesLogix:ResourceKeyName Key="grdMembers.d81642fa-d355-4f94-b430-3d2a517c507d.ColumnHeading" />
       <SalesLogix:ResourceKeyName Key="grdMembers.289c9959-b3a3-4c90-a911-c12882cccecb.ColumnHeading" />
       <SalesLogix:ResourceKeyName Key="grdMembers.ba2d83bf-74cc-4580-b255-e69b2ca9008e.ColumnHeading" />
           <SalesLogix:ResourceKeyName Key="grdMembers.btnRemoveFromTeam.ToolTip" />
     </Keys>
</SalesLogix:ScriptResourceProvider>

					 
  <div id="DepartmentMembersgrdMembers_Container" style="width:100%;height:100%;" class="">
    <div id="DepartmentMembersgrdMembers_Grid" style="width:100%;height:100%;"
     data-dojo-type="dijit.layout.BorderContainer"
></div>
</div>


 
   <asp:HiddenField ID="ConfirmRemoveFromTeamText" Value="<%$ resources: ConfirmRemoveFromTeamText.Value %>" runat="server" />

 

 <SalesLogix:SmartPartToolsContainer runat="server" ID="DepartmentMembers_RTools" ToolbarLocation="right">
   <SalesLogix:LookupControl runat="server" ID="lueAddDepartmentMember"  ToolTip="<%$ resources: lueAddDepartmentMember.ToolTip %>" ButtonToolTip="<%$ resources: lueAddDepartmentMember.ButtonToolTip %>" LookupEntityName="User" LookupEntityTypeName="Sage.Entity.Interfaces.IUser, Sage.Entity.Interfaces, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null" LookupDisplayMode="ButtonOnly" AutoPostBack="true" AddEmptyListItem="false" DialogTitle="<%$ resources: lueAddDepartmentMember.LookupDialogTitle %>" LookupImageURL="~/ImageResource.axd?scope=global&type=Global_Images&key=plus_16x16"  >
<LookupProperties>
<SalesLogix:LookupProperty PropertyHeader="<%$ resources: lueAddDepartmentMember.LookupProperties.UserInfo.NameLF.PropertyHeader %>" PropertyName="UserInfo.NameLF" PropertyType="System.String" PropertyFormat="None" PropertyFormatString="" UseAsResult="True" ExcludeFromFilters="False"></SalesLogix:LookupProperty>
<SalesLogix:LookupProperty PropertyHeader="<%$ resources: lueAddDepartmentMember.LookupProperties.UserInfo.Title.PropertyHeader %>" PropertyName="UserInfo.Title" PropertyType="System.String" PropertyFormat="None" PropertyFormatString="" UseAsResult="True" ExcludeFromFilters="False"></SalesLogix:LookupProperty>
<SalesLogix:LookupProperty PropertyHeader="<%$ resources: lueAddDepartmentMember.LookupProperties.UserInfo.Department.PropertyHeader %>" PropertyName="UserInfo.Department" PropertyType="System.String" PropertyFormat="None" PropertyFormatString="" UseAsResult="True" ExcludeFromFilters="False"></SalesLogix:LookupProperty>
<SalesLogix:LookupProperty PropertyHeader="<%$ resources: lueAddDepartmentMember.LookupProperties.UserInfo.Region.PropertyHeader %>" PropertyName="UserInfo.Region" PropertyType="System.String" PropertyFormat="None" PropertyFormatString="" UseAsResult="True" ExcludeFromFilters="False"></SalesLogix:LookupProperty>
<SalesLogix:LookupProperty PropertyHeader="<%$ resources: lueAddDepartmentMember.LookupProperties.Type.PropertyHeader %>" PropertyName="Type" PropertyType="Sage.Entity.Interfaces.UserType" PropertyFormat="None" PropertyFormatString="" UseAsResult="True" ExcludeFromFilters="False"></SalesLogix:LookupProperty>
</LookupProperties>
<LookupPreFilters>
<SalesLogix:LookupPreFilter PropertyName="Type" PropertyType="Sage.Entity.Interfaces.UserType" OperatorCode="!=" Visible="False"
 FilterValue="6"
 ></SalesLogix:LookupPreFilter>
<SalesLogix:LookupPreFilter PropertyName="Type" PropertyType="Sage.Entity.Interfaces.UserType" OperatorCode="!=" Visible="False"
 FilterValue="5"
 ></SalesLogix:LookupPreFilter>
<SalesLogix:LookupPreFilter PropertyName="Type" PropertyType="Sage.Entity.Interfaces.UserType" OperatorCode="!=" Visible="False"
 FilterValue="8"
 ></SalesLogix:LookupPreFilter>
</LookupPreFilters>
</SalesLogix:LookupControl>
 

  <SalesLogix:PageLink ID="btnEditForm" CssClass="adminEditFormButton" runat="server" LinkType="RelativePath" ToolTip="<%$ resources: Portal, EditForm_ToolTip %>" NavigateUrl="~/FormManager.aspx?entityid=DepartmentMembers&modeid=Detail" ImageUrl="~/ImageResource.axd?scope=global&type=Global_Images&key=form_manager_16x16"></SalesLogix:PageLink>
 
 
 
 
 <SalesLogix:PageLink ID="lnkDepartmentMembersHelp" runat="server" LinkType="HelpFileName" ToolTip="<%$ resources: Portal, Help_ToolTip %>" Target="MCWebHelp" NavigateUrl="DepartmentMembers" ImageUrl="~/ImageResource.axd?scope=global&type=Global_Images&key=Help_16x16"></SalesLogix:PageLink>
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
    get { return typeof(Sage.Entity.Interfaces.IDepartment); }
}

 

protected override void OnAddEntityBindings() {
    
   
    }
       
protected void lueAddDepartmentMember_ChangeAction(object sender, EventArgs e) {
Sage.Platform.DynamicMethod.DynamicMethodLibrary lib = Sage.Platform.Orm.DynamicMethodLibraryHelper.Instance;
Object[] methodArgs = new Object[] { FormAdapter, e };
lib.Execute("DepartmentMembers.lueAddDepartmentMember_OnChange", methodArgs);

}

protected override void OnWireEventHandlers()
{
 base.OnWireEventHandlers();
 lueAddDepartmentMember.LookupResultValueChanged += new EventHandler(lueAddDepartmentMember_ChangeAction);
lueAddDepartmentMember.LookupResultValueChanged += new EventHandler(DialogService.CloseEventHappened);
lueAddDepartmentMember.LookupResultValueChanged += new EventHandler(Refresh);


}

protected override void OnFormBound()
{
ClientBindingMgr.RegisterBoundControl(lueAddDepartmentMember);

if (!RoleSecurityService.HasAccess("Administration/Forms/View"))
{
btnEditForm.Visible = false;
}

                                var script = new StringBuilder();
                                script.AppendLine("require(['" + Page.ResolveUrl("~/SmartParts/Department/DepartmentMembers.js") + "'], function () {");
                                if (Page.IsPostBack)
                                {
                                    script.Append(" Sage.UI.Forms.DepartmentMembers.init({workspace: '" + getMyWorkspace() + "'} );");
                                }
                                else 
                                {
                                    script.AppendLine("require(['dojo/ready'], function(ready) {");
                                    script.Append("ready(function () {Sage.UI.Forms.DepartmentMembers.init({workspace: '" + getMyWorkspace() + "'} ); });");
                                    script.AppendLine("});");//end ready require
                                }

                                script.AppendLine("});");// end require
                                ScriptManager.RegisterStartupScript(this, GetType(), "initialize_DepartmentMembers", script.ToString(), true);


}



public override Sage.Platform.Application.UI.ISmartPartInfo GetSmartPartInfo(Type smartPartInfoType)
{
    ToolsSmartPartInfo tinfo = new ToolsSmartPartInfo();
        if (BindingSource != null)
    {
        if (BindingSource.Current != null)
        {
            tinfo.Description = BindingSource.Current.ToString();
            tinfo.Title = BindingSource.Current.ToString();
        }
    }
    
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
    get { return _formAdapter ?? (_formAdapter = new DepartmentMembersAdapter(this)); }
}

public class DepartmentMembersAdapter : Sage.Platform.WebPortal.Adapters.EntityFormAdapter, Sage.Form.Interfaces.IDepartmentMembers
{
    public DepartmentMembersAdapter(Sage.Platform.WebPortal.SmartParts.EntityBoundSmartPartInfoProvider smartPart)
        : base(smartPart) {}

    private Sage.Platform.Controls.IHiddenControl _ConfirmRemoveFromTeamText;
    public  Sage.Platform.Controls.IHiddenControl ConfirmRemoveFromTeamText
    {
        get { return FindControl(ref _ConfirmRemoveFromTeamText, "ConfirmRemoveFromTeamText"); }
    }
    private Sage.Platform.Controls.ILookupControl _lueAddDepartmentMember;
    public  Sage.Platform.Controls.ILookupControl lueAddDepartmentMember
    {
        get { return FindControl(ref _lueAddDepartmentMember, "lueAddDepartmentMember"); }
    }

    public  void lueAddDepartmentMember_OnChange(System.EventArgs e)
    {
        Sage.Platform.DynamicMethod.DynamicMethodLibrary lib = Sage.Platform.Orm.DynamicMethodLibraryHelper.Instance;
        Object[] methodArgs = new Object[] { this, e };
        lib.Execute("DepartmentMembers.lueAddDepartmentMember_OnChange", methodArgs);
    }
}

</script>

<script type="text/javascript">
</script>
