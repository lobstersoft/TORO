﻿<%@ Page Title="SalesLogix Logoff" Language="C#" MasterPageFile="~/Masters/Login.master" EnableSessionState="false" %>

<script runat="server">
    protected void Page_Load(object sender, EventArgs e)
    {
        loginLink.Focus();
    }
</script>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolderArea" Runat="Server">
  <div id="LogoffContainer">
    <div id="splashimg">
	    <div id="splashCenterBox">
        <div id="LogoffForm">
          <div id="LogoffTitle"><%= GetLocalResourceObject("LogoffTitle") %></div>
          <div id="LogoffMessage"><%= GetLocalResourceObject("LogoffMessage") %></div>
          <div id="LogoffFormButtonPanel"><a href="~/Login.aspx" id="loginLink" runat="server"><%= GetLocalResourceObject("LogoffLink")%></a></div>
        </div>
      </div>
   </div>
  </div>
</asp:Content>