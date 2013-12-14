<%@ Control Language="C#" ClassName="DeDupJobDetail" Inherits="Sage.Platform.WebPortal.SmartParts.EntityBoundSmartPartInfoProvider" %>
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
<table border="0" cellpadding="1" cellspacing="0" class="formtable">
         <col width="50%" />
            <col width="50%" />
     <tr>
            <td  >
 <div class=" lbl alignleft" >
   <asp:Label ID="txtJobNumber_lbl" AssociatedControlID="txtJobNumber" runat="server" Text="<%$ resources: txtJobNumber.Caption %>" ></asp:Label>
 </div>
  <div  class="textcontrol"   >
<asp:TextBox runat="server" ID="txtJobNumber" ReadOnly="true"  dojoType="Sage.UI.Controls.TextBox"  />
  </div>

      </td>
                <td  >
 <div class=" lbl alignleft">
   <asp:Label ID="QFDateTimePicker_lbl" AssociatedControlID="QFDateTimePicker" runat="server" Text="<%$ resources: QFDateTimePicker.Caption %>" ></asp:Label>
 </div>
   <div  class="textcontrol datepicker"  >
    <SalesLogix:DateTimePicker runat="server" ID="QFDateTimePicker" ReadOnly="true" ButtonToolTip="<%$ resources: QFDateTimePicker.ButtonToolTip %>" />
  </div>

      </td>
      </tr>
<tr>
            <td  >
 <div class=" lbl alignleft" >
   <asp:Label ID="QFTextBox6_lbl" AssociatedControlID="QFTextBox6" runat="server" Text="<%$ resources: QFTextBox6.Caption %>" ></asp:Label>
 </div>
  <div  class="textcontrol"   >
<asp:TextBox runat="server" ID="QFTextBox6" ReadOnly="true"  dojoType="Sage.UI.Controls.TextBox"  />
  </div>

      </td>
                <td  >
 <div class=" lbl alignleft">
   <asp:Label ID="QFDateTimePicker2_lbl" AssociatedControlID="QFDateTimePicker2" runat="server" Text="<%$ resources: QFDateTimePicker2.Caption %>" ></asp:Label>
 </div>
   <div  class="textcontrol datepicker"  >
    <SalesLogix:DateTimePicker runat="server" ID="QFDateTimePicker2" ReadOnly="true" />
  </div>

      </td>
      </tr>
<tr>
            <td  >
 <div class=" lbl alignleft" >
   <asp:Label ID="QFTextBox_lbl" AssociatedControlID="QFTextBox" runat="server" Text="<%$ resources: QFTextBox.Caption %>" ></asp:Label>
 </div>
  <div  class="textcontrol"   >
<asp:TextBox runat="server" ID="QFTextBox" ReadOnly="true"  dojoType="Sage.UI.Controls.TextBox"  />
  </div>

      </td>
                <td  >
 <div class=" lbl alignleft">
   <asp:Label ID="QFSLXUser_lbl" AssociatedControlID="QFSLXUser" runat="server" Text="<%$ resources: QFSLXUser.Caption %>" ></asp:Label>
 </div>   
   <div  class="textcontrol"  > 
    <SalesLogix:SlxUserControl runat="server" ID="QFSLXUser" ReadOnly="true" LookupBindingMode="String"  />
  </div>

      </td>
      </tr>
<tr>
            <td  >
 <div class=" lbl alignleft" >
   <asp:Label ID="txtSourceDesc_lbl" AssociatedControlID="txtSourceDesc" runat="server" Text="<%$ resources: txtSourceDesc.Caption %>" ></asp:Label>
 </div>
  <div  class="textcontrol"   >
<asp:TextBox runat="server" ID="txtSourceDesc" ReadOnly="true"  dojoType="Sage.UI.Controls.TextBox"  />
  </div>

      </td>
                <td  >
 <div class=" lbl alignleft" >
   <asp:Label ID="QFTextBox5_lbl" AssociatedControlID="QFTextBox5" runat="server" Text="<%$ resources: QFTextBox5.Caption %>" ></asp:Label>
 </div>
  <div  class="textcontrol"   >
<asp:TextBox runat="server" ID="QFTextBox5" ReadOnly="true"  dojoType="Sage.UI.Controls.TextBox"  />
  </div>

      </td>
      </tr>
<tr>
            <td  >
 <div class=" lbl alignleft" >
   <asp:Label ID="QFTextBox2_lbl" AssociatedControlID="QFTextBox2" runat="server" Text="<%$ resources: QFTextBox2.Caption %>" ></asp:Label>
 </div>
  <div  class="textcontrol"   >
<asp:TextBox runat="server" ID="QFTextBox2" ReadOnly="true"  dojoType="Sage.UI.Controls.TextBox"  />
  </div>

      </td>
                <td></td>
      </tr>
<tr>
            <td  >
 <div class=" lbl alignleft" >
   <asp:Label ID="QFTextBox3_lbl" AssociatedControlID="QFTextBox3" runat="server" Text="<%$ resources: QFTextBox3.Caption %>" ></asp:Label>
 </div>
  <div  class="textcontrol"   >
<asp:TextBox runat="server" ID="QFTextBox3" ReadOnly="true"  dojoType="Sage.UI.Controls.TextBox"  />
  </div>

      </td>
                <td></td>
      </tr>
<tr>
            <td  >
 <div class=" lbl alignleft" >
   <asp:Label ID="QFTextBox4_lbl" AssociatedControlID="QFTextBox4" runat="server" Text="<%$ resources: QFTextBox4.Caption %>" ></asp:Label>
 </div>
  <div  class="textcontrol"   >
<asp:TextBox runat="server" ID="QFTextBox4" ReadOnly="true"  dojoType="Sage.UI.Controls.TextBox"  />
  </div>

      </td>
                <td></td>
      </tr>
</table>
 


 <SalesLogix:SmartPartToolsContainer runat="server" ID="DeDupJobDetail_RTools" ToolbarLocation="right">
   <SalesLogix:GroupNavigator runat="server" ID="grpNavDeDupJobs" ></SalesLogix:GroupNavigator>
    <asp:ImageButton runat="server" ID="btnSubmitNewJob"
 AlternateText="<%$ resources: btnSubmitNewJob.Caption %>"  ToolTip="<%$ resources: btnSubmitNewJob.ToolTip %>" ImageUrl="~/ImageResource.axd?scope=global&type=Global_Images&key=pick_lists_16x16"  />
 
    <asp:ImageButton runat="server" ID="btnDelete"
 ToolTip="<%$ resources: btnDelete.ToolTip %>" ImageUrl="~/ImageResource.axd?scope=global&type=Global_Images&key=Delete_16x16" 
 />
 
  <SalesLogix:PageLink ID="btnEditForm" CssClass="adminEditFormButton" runat="server" LinkType="RelativePath" ToolTip="<%$ resources: Portal, EditForm_ToolTip %>" NavigateUrl="~/FormManager.aspx?entityid=DeDupJobDetail&modeid=Detail" ImageUrl="~/ImageResource.axd?scope=global&type=Global_Images&key=form_manager_16x16"></SalesLogix:PageLink>
 
 
 
 
 <SalesLogix:PageLink ID="lnkDeDupJobDetailHelp" runat="server" LinkType="HelpFileName" ToolTip="<%$ resources: Portal, Help_ToolTip %>" Target="MCWebHelp" NavigateUrl="DeDupJobDetail" ImageUrl="~/ImageResource.axd?scope=global&type=Global_Images&key=Help_16x16"></SalesLogix:PageLink>
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
    get { return typeof(Sage.Entity.Interfaces.IDeDupJob); }
}

 

protected override void OnAddEntityBindings() {
                 // txtJobNumber.Text Binding
        Sage.Platform.WebPortal.Binding.WebEntityBinding txtJobNumberTextBinding = new Sage.Platform.WebPortal.Binding.WebEntityBinding("JobNumber", txtJobNumber, "Text");
        BindingSource.Bindings.Add(txtJobNumberTextBinding);
                    // QFDateTimePicker.DateTimeValue Binding
        Sage.Platform.WebPortal.Binding.WebEntityBinding QFDateTimePickerDateTimeValueBinding = new Sage.Platform.WebPortal.Binding.WebEntityBinding("StartDate", QFDateTimePicker, "DateTimeValue");
        BindingSource.Bindings.Add(QFDateTimePickerDateTimeValueBinding);
                    // QFTextBox6.Text Binding
        Sage.Platform.WebPortal.Binding.WebEntityBinding QFTextBox6TextBinding = new Sage.Platform.WebPortal.Binding.WebEntityBinding("Description", QFTextBox6, "Text");
        BindingSource.Bindings.Add(QFTextBox6TextBinding);
                    // QFDateTimePicker2.DateTimeValue Binding
        Sage.Platform.WebPortal.Binding.WebEntityBinding QFDateTimePicker2DateTimeValueBinding = new Sage.Platform.WebPortal.Binding.WebEntityBinding("CompletedDate", QFDateTimePicker2, "DateTimeValue");
        BindingSource.Bindings.Add(QFDateTimePicker2DateTimeValueBinding);
                    // QFTextBox.Text Binding
        Sage.Platform.WebPortal.Binding.WebEntityBinding QFTextBoxTextBinding = new Sage.Platform.WebPortal.Binding.WebEntityBinding("EntityName", QFTextBox, "Text");
        BindingSource.Bindings.Add(QFTextBoxTextBinding);
                    // QFSLXUser.LookupResultValue Binding
        Sage.Platform.WebPortal.Binding.WebEntityBinding QFSLXUserLookupResultValueBinding = new Sage.Platform.WebPortal.Binding.WebEntityBinding("CreateUser", QFSLXUser, "LookupResultValue");
        BindingSource.Bindings.Add(QFSLXUserLookupResultValueBinding);
                    // txtSourceDesc.Text Binding
        Sage.Platform.WebPortal.Binding.WebEntityBinding txtSourceDescTextBinding = new Sage.Platform.WebPortal.Binding.WebEntityBinding("SourceDescription", txtSourceDesc, "Text");
        BindingSource.Bindings.Add(txtSourceDescTextBinding);
                    // QFTextBox5.Text Binding
        Sage.Platform.WebPortal.Binding.WebEntityBinding QFTextBox5TextBinding = new Sage.Platform.WebPortal.Binding.WebEntityBinding("StatusDescription", QFTextBox5, "Text");
        BindingSource.Bindings.Add(QFTextBox5TextBinding);
                    // QFTextBox2.Text Binding
        Sage.Platform.WebPortal.Binding.WebEntityBinding QFTextBox2TextBinding = new Sage.Platform.WebPortal.Binding.WebEntityBinding("RecordCount", QFTextBox2, "Text");
        BindingSource.Bindings.Add(QFTextBox2TextBinding);
                    // QFTextBox3.Text Binding
        Sage.Platform.WebPortal.Binding.WebEntityBinding QFTextBox3TextBinding = new Sage.Platform.WebPortal.Binding.WebEntityBinding("ProcessedCount", QFTextBox3, "Text");
        BindingSource.Bindings.Add(QFTextBox3TextBinding);
                    // QFTextBox4.Text Binding
        Sage.Platform.WebPortal.Binding.WebEntityBinding QFTextBox4TextBinding = new Sage.Platform.WebPortal.Binding.WebEntityBinding("DuplicatedCount", QFTextBox4, "Text");
        BindingSource.Bindings.Add(QFTextBox4TextBinding);
    
   
            }
                                                                             
protected void btnSubmitNewJob_ClickAction(object sender, EventArgs e) {
   Response.Redirect("DeDupWizard.aspx");
 
}
protected void btnDelete_ClickAction(object sender, EventArgs e) {
  Sage.Platform.Orm.Interfaces.IPersistentEntity persistentEntity = this.BindingSource.Current as Sage.Platform.Orm.Interfaces.IPersistentEntity;
  if (persistentEntity != null) {
    persistentEntity.Delete();
  }

          btnDelete_ClickActionBRC(sender, e);
    
  
}
protected void btnDelete_ClickActionBRC(object sender, EventArgs e) {
      Response.Redirect("DeDupJob.aspx");
  
}

protected override void OnWireEventHandlers()
{
 base.OnWireEventHandlers();
 btnSubmitNewJob.Click += new ImageClickEventHandler(btnSubmitNewJob_ClickAction);
btnDelete.Click += new ImageClickEventHandler(btnDelete_ClickAction);


}

protected override void OnFormBound()
{
btnDelete.OnClientClick = string.Format("return confirm('{0}');", Sage.Platform.WebPortal.PortalUtil.JavaScriptEncode(GetLocalResourceObject("btnDelete.ActionConfirmationMessage").ToString()));

if (!RoleSecurityService.HasAccess("Administration/Forms/View"))
{
btnEditForm.Visible = false;
}


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
    get { return _formAdapter ?? (_formAdapter = new DeDupJobDetailAdapter(this)); }
}

public class DeDupJobDetailAdapter : Sage.Platform.WebPortal.Adapters.EntityFormAdapter, Sage.Form.Interfaces.IDeDupJobDetail
{
    public DeDupJobDetailAdapter(Sage.Platform.WebPortal.SmartParts.EntityBoundSmartPartInfoProvider smartPart)
        : base(smartPart) {}

    private Sage.Platform.Controls.ITextBoxControl _txtJobNumber;
    public  Sage.Platform.Controls.ITextBoxControl txtJobNumber
    {
        get { return FindControl(ref _txtJobNumber, "txtJobNumber"); }
    }
    private Sage.Platform.Controls.ITextBoxControl _QFTextBox6;
    public  Sage.Platform.Controls.ITextBoxControl QFTextBox6
    {
        get { return FindControl(ref _QFTextBox6, "QFTextBox6"); }
    }
    private Sage.Platform.Controls.ITextBoxControl _QFTextBox;
    public  Sage.Platform.Controls.ITextBoxControl QFTextBox
    {
        get { return FindControl(ref _QFTextBox, "QFTextBox"); }
    }
    private Sage.Platform.Controls.ITextBoxControl _txtSourceDesc;
    public  Sage.Platform.Controls.ITextBoxControl txtSourceDesc
    {
        get { return FindControl(ref _txtSourceDesc, "txtSourceDesc"); }
    }
    private Sage.Platform.Controls.ITextBoxControl _QFTextBox2;
    public  Sage.Platform.Controls.ITextBoxControl QFTextBox2
    {
        get { return FindControl(ref _QFTextBox2, "QFTextBox2"); }
    }
    private Sage.Platform.Controls.ITextBoxControl _QFTextBox3;
    public  Sage.Platform.Controls.ITextBoxControl QFTextBox3
    {
        get { return FindControl(ref _QFTextBox3, "QFTextBox3"); }
    }
    private Sage.Platform.Controls.ITextBoxControl _QFTextBox4;
    public  Sage.Platform.Controls.ITextBoxControl QFTextBox4
    {
        get { return FindControl(ref _QFTextBox4, "QFTextBox4"); }
    }
    private Sage.Platform.Controls.IDateTimePickerControl _QFDateTimePicker;
    public  Sage.Platform.Controls.IDateTimePickerControl QFDateTimePicker
    {
        get { return FindControl(ref _QFDateTimePicker, "QFDateTimePicker"); }
    }
    private Sage.Platform.Controls.IDateTimePickerControl _QFDateTimePicker2;
    public  Sage.Platform.Controls.IDateTimePickerControl QFDateTimePicker2
    {
        get { return FindControl(ref _QFDateTimePicker2, "QFDateTimePicker2"); }
    }
    private Sage.Platform.Controls.IUserControl _QFSLXUser;
    public  Sage.Platform.Controls.IUserControl QFSLXUser
    {
        get { return FindControl(ref _QFSLXUser, "QFSLXUser"); }
    }
    private Sage.Platform.Controls.ITextBoxControl _QFTextBox5;
    public  Sage.Platform.Controls.ITextBoxControl QFTextBox5
    {
        get { return FindControl(ref _QFTextBox5, "QFTextBox5"); }
    }
    private Sage.Platform.Controls.IGroupNavigatorControl _grpNavDeDupJobs;
    public  Sage.Platform.Controls.IGroupNavigatorControl grpNavDeDupJobs
    {
        get { return FindControl(ref _grpNavDeDupJobs, "grpNavDeDupJobs"); }
    }
    private Sage.Platform.Controls.IButtonControl _btnSubmitNewJob;
    public  Sage.Platform.Controls.IButtonControl btnSubmitNewJob
    {
        get { return FindControl(ref _btnSubmitNewJob, "btnSubmitNewJob"); }
    }
    private Sage.Platform.Controls.IButtonControl _btnDelete;
    public  Sage.Platform.Controls.IButtonControl btnDelete
    {
        get { return FindControl(ref _btnDelete, "btnDelete"); }
    }

}

</script>

<script type="text/javascript">
</script>