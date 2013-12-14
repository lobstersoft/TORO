<%@ Control Language="C#" ClassName="ContractCoveredAssets" Inherits="Sage.Platform.WebPortal.SmartParts.EntityBoundSmartPartInfoProvider" %>
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

			

<SalesLogix:ScriptResourceProvider ID="ContractCoveredAssetslueAddProduct_Strings" runat="server">
    <Keys>
        <SalesLogix:ResourceKeyName Key="lueAddProduct.ButtonTooltip" />
        <SalesLogix:ResourceKeyName Key="lueAddProduct.LookupDialogTitle" />
        <SalesLogix:ResourceKeyName Key="lueAddProduct.DialogButtonText" />
						<SalesLogix:ResourceKeyName Key="lueAddProduct.LookupProperties.ActualId.PropertyHeader" />
		 		<SalesLogix:ResourceKeyName Key="lueAddProduct.LookupProperties.ProductName.PropertyHeader" />
		 		<SalesLogix:ResourceKeyName Key="lueAddProduct.LookupProperties.SerialNumber.PropertyHeader" />
		       </Keys>
</SalesLogix:ScriptResourceProvider>

	  	   

<SalesLogix:ScriptResourceProvider ID="ContractCoveredAssetsgrdAssets_Strings" runat="server">
    <Keys>
          <SalesLogix:ResourceKeyName Key="grdAssets.d6d15772-06ee-4b25-a62e-981991ddeb1d.ColumnHeading" />
       <SalesLogix:ResourceKeyName Key="grdAssets.59048bd8-65e8-4738-8090-6ba56e6117a7.ColumnHeading" />
       <SalesLogix:ResourceKeyName Key="grdAssets.af8c6561-89f7-44ef-8612-3ce13251f52c.ColumnHeading" />
       <SalesLogix:ResourceKeyName Key="grdAssets.501d2ec3-e2cf-4491-8f48-7e2b1af03336.ColumnHeading" />
       <SalesLogix:ResourceKeyName Key="grdAssets.bc2f61f4-5049-4b0b-a062-891b9609b28b.ColumnHeading" />
       <SalesLogix:ResourceKeyName Key="grdAssets.bab779e0-89dd-469e-893b-da44d5fa90c8.ColumnHeading" />
       <SalesLogix:ResourceKeyName Key="grdAssets.141e8d00-61ca-4889-804a-5f75090ba2ad.ColumnHeading" />
       <SalesLogix:ResourceKeyName Key="grdAssets.1c82ae1f-b3a3-498f-bc75-45f5b6aae145.ColumnHeading" />
       <SalesLogix:ResourceKeyName Key="grdAssets.8f97f70a-252e-4ad9-bcbf-f385752df26d.ColumnHeading" />
           <SalesLogix:ResourceKeyName Key="grdAssets.Relate.ToolTip" />
    <SalesLogix:ResourceKeyName Key="grdAssets.Delete.ToolTip" />
     </Keys>
</SalesLogix:ScriptResourceProvider>

									 





























<div style="display:none;">
  <asp:TextBox runat="server" ID="ContractCoveredAssetsgrdAssets_DataCarrier" class="ContractCoveredAssetsgrdAssets_DataCarrier" ></asp:TextBox>
</div>
  <div id="ContractCoveredAssetsgrdAssets_Container" style="width:100%;height:100%;" class="">
    <div id="ContractCoveredAssetsgrdAssets_Grid" style="width:100%;height:100%;"
     data-dojo-type="dijit.layout.BorderContainer"
></div>
</div>


 


 <SalesLogix:SmartPartToolsContainer runat="server" ID="ContractCoveredAssets_RTools" ToolbarLocation="right">
  <SalesLogix:PageLink ID="btnEditForm" CssClass="adminEditFormButton" runat="server" LinkType="RelativePath" ToolTip="<%$ resources: Portal, EditForm_ToolTip %>" NavigateUrl="~/FormManager.aspx?entityid=ContractCoveredAssets&modeid=Detail" ImageUrl="~/ImageResource.axd?scope=global&type=Global_Images&key=form_manager_16x16"></SalesLogix:PageLink>
 
 
 
 
 <SalesLogix:PageLink ID="lnkContractCoveredAssetsHelp" runat="server" LinkType="HelpFileName" ToolTip="<%$ resources: Portal, Help_ToolTip %>" Target="MCWebHelp" NavigateUrl="ContractCoveredAssets" ImageUrl="~/ImageResource.axd?scope=global&type=Global_Images&key=Help_16x16"></SalesLogix:PageLink>
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
    get { return typeof(Sage.Entity.Interfaces.IContract); }
}

 

protected override void OnAddEntityBindings() {
    
   
}
       
protected void grdAssets_InsertAssociationAction(object sender, EventArgs e) {

	    string text = Request.Form.Get(ContractCoveredAssetsgrdAssets_DataCarrier.UniqueID);
    if (text.Length > 0)
    {
    var feed = new Sage.Integration.Entity.Feeds.ContractItemFeed();

		using (var stream = new System.IO.MemoryStream(Encoding.UTF8.GetBytes(text)))
		{
			new Sage.Common.Syndication.JsonSerializer().LoadFromStream<Sage.Integration.Entity.Feeds.ContractItemEntry>(feed, stream);
		}

		if (feed == null) return;
		var transformer =
			Sage.Platform.Application.ApplicationContext.Current.Services.Get
				<Sage.Platform.SData.IAtomEntryToEntityTransformationService>();
    	
		var entity = BindingSource.Current as Sage.Entity.Interfaces.IContract;

		if (transformer != null && entity != null && entity.Items.Count == 0)
		{
			foreach (Sage.Integration.Entity.Feeds.ContractItemEntry entry in feed.Entries)
			{
				var item = transformer.ConvertEntry(entry) as Sage.Entity.Interfaces.IContractItem;
				if (item != null)
				{
					item.Contract = entity;
					entity.Items.Add(item);
				}
			}
			entity.Persisted -= grdAssets_InsertAssociationAction;
			entity.Save();
		}
	}



}

protected override void OnWireEventHandlers()
{
 base.OnWireEventHandlers();
 var epage = Page as Sage.Platform.WebPortal.EntityPage;
 if (epage != null && epage.IsInsertMode)
 {
     var ent = BindingSource.Current as Sage.Platform.Orm.Interfaces.IPersistentEntity;
     if (ent != null)
     {
         ent.Persisted += grdAssets_InsertAssociationAction;
     }
 }


}

protected void quickformload0(object sender, EventArgs e) {
Sage.Entity.Interfaces.IContract contract = this.BindingSource.Current as Sage.Entity.Interfaces.IContract;
if (contract != null && contract.Account != null)
{
	var clientContextService = PageWorkItem.Services.Get<Sage.Platform.WebPortal.Services.ClientContextService>();
	if (clientContextService != null)
	{
		//get the contract's account to be used for the asset's association lookup
		if (clientContextService.CurrentContext.ContainsKey("ContractAccount"))
		{
			clientContextService.CurrentContext["ContractAccount"] = contract.Account.Id.ToString();
		}
		else
		{
			clientContextService.CurrentContext.Add("ContractAccount", contract.Account.Id.ToString());
		}
	}
}

}
private bool _runActivating;
protected override void OnActivating()
{
_runActivating = true;
}
private void DoActivating()
{
quickformload0(this, EventArgs.Empty);

}
protected override void OnFormBound()
{
Sage.Platform.WebPortal.EntityPage epage = Page as Sage.Platform.WebPortal.EntityPage;
        if (epage != null)
            _runActivating = (epage.IsNewEntity || _runActivating);
if (_runActivating) DoActivating();
 var entity = BindingSource.Current as Sage.Entity.Interfaces.IContract; 
 if (this.PageWorkItem.State["ModeId"].ToString() == "Insert") 
 { 
 var feed = new Sage.Integration.Entity.Feeds.ContractItemFeed(); 
 if (entity != null) 
      if (entity.Items.Count > 0) 
      { 
			var include = Sage.Common.Syndication.InclusionNode.CreateInclusionTree("Asset", null, null, null); 
          var transformer = 
              Sage.Platform.Application.ApplicationContext.Current.Services.Get 
                  <Sage.Platform.SData.IAtomEntryToEntityTransformationService>(); 
          foreach (Sage.Entity.Interfaces.IContractItem item in entity.Items) 
          { 
              var transItem = transformer.ConvertEntity(item, include) as Sage.Integration.Entity.Feeds.ContractItemEntry; 
              if (transItem != null) 
              { 
                  feed.Entries.Add(transItem); 
              } 
          } 
          string text; 
          using (var stream = new System.IO.MemoryStream()) 
          { 
          	          	new Sage.Common.Syndication.JsonSerializer().SaveToStream((Sage.Common.Syndication.IFeed)feed, stream, null, include); 
          	text = Encoding.UTF8.GetString(stream.ToArray()); 
          } 
          ContractCoveredAssetsgrdAssets_DataCarrier.Text = text; 
          entity.Items.Clear(); 
      } 
 } 
if (!RoleSecurityService.HasAccess("Administration/Forms/View"))
{
btnEditForm.Visible = false;
}

                                var script = new StringBuilder();
                                script.AppendLine("require(['" + Page.ResolveUrl("~/SmartParts/Contract/ContractCoveredAssets.js") + "'], function () {");
                                if (Page.IsPostBack)
                                {
                                    script.Append(" Sage.UI.Forms.ContractCoveredAssets.init({workspace: '" + getMyWorkspace() + "'} );");
                                }
                                else 
                                {
                                    script.AppendLine("require(['dojo/ready'], function(ready) {");
                                    script.Append("ready(function () {Sage.UI.Forms.ContractCoveredAssets.init({workspace: '" + getMyWorkspace() + "'} ); });");
                                    script.AppendLine("});");//end ready require
                                }

                                script.AppendLine("});");// end require
                                ScriptManager.RegisterStartupScript(this, GetType(), "initialize_ContractCoveredAssets", script.ToString(), true);


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
    get { return _formAdapter ?? (_formAdapter = new ContractCoveredAssetsAdapter(this)); }
}

public class ContractCoveredAssetsAdapter : Sage.Platform.WebPortal.Adapters.EntityFormAdapter, Sage.Form.Interfaces.IContractCoveredAssets
{
    public ContractCoveredAssetsAdapter(Sage.Platform.WebPortal.SmartParts.EntityBoundSmartPartInfoProvider smartPart)
        : base(smartPart) {}


}

</script>

<script type="text/javascript">
</script>
