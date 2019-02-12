sap.ui.define([
	"wip/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"wip/model/formatter",

	"sap/ui/model/Filter",
	"wip/model/ReportModel",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast"

	

], function(BaseController, JSONModel, formatter, Filter, ReportModel, FilterOperator,MessageToast) {
	"use strict";

	return BaseController.extend("wip.controller.Report", {
		onInit: function() {
			debugger;

			this.arr = [];

			this.jsonModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(this.jsonModel, "JSONModel");

			this.getView().setModel(new ReportModel().getModel(), "InputsModel");

		},
		listSorting: function(){
		alert("List Sorting");	
		},
		
			onBeforeRebindTable: function(oEvent) {

			var oBindingParams = oEvent.getParameter("bindingParams");
			

			
			var InputFields = this.getView().getModel("InputsModel");
					
			
			var Matter = 	InputFields.getProperty("/Inputs/rootPspid");;
				oBindingParams.filters.push(
							new Filter("Pspid", FilterOperator.EQ, Matter));
					
		
		

			// this.getView().byId("tabelPanel").setExpanded(true);
			// this.getView().byId("filterPanel").setExpanded(false);
		},
			onPress: function(oEvent) {
				var otable = this.getView().byId("smartTable_ResponsiveTable0");
					var Pspid = oEvent.getSource().getProperty("title");
						var InputFields = this.getView().getModel("InputsModel");
						InputFields.setProperty("/Inputs/rootPspid", Pspid);
					
					otable.rebindTable();
			},
			
		onPress1: function(oEvent) {

			debugger;

			var InputFields = this.getView().getModel("InputsModel");

			var aFilter = [];
			var Pspid = oEvent.getSource().getProperty("title");
			aFilter.push(new Filter("Pspid", FilterOperator.EQ, Pspid));
			var Matter = Pspid;
			var LeadPartner = oEvent.getSource().getProperty("info");
			var BillingOffice = oEvent.getSource().getProperty("description");

			//   var sServiceUrl = "/sap/opu/odata/sap/CreditMemoMainLMTSet";   
			// // create OData model instance with service URL and JSON format
			//  var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true );

			// or
			// var oform = this.getView().byId("simpleform");
			// var Matter = this.getView().byId("Matterform");
			// var Payer = this.getView().byId("Payerform");
			// var BillingDate = this.getView().byId("BillingDateform");
			// var NetAmount = this.getView().byId("NetAmountform");

			var otable = this.getView().byId("smartTable_ResponsiveTable0");
		
			var otable1 = this.getView().byId("WipDetailsSet1");
			var otable2 = this.getView().byId("WipDetailsSet2");
			var otable3 = this.getView().byId("WipDetailsSet3");
			var oModel = this.getOwnerComponent().getModel();
			var that = this;
			oModel.read("/WipDetailsSet", {
				filters: aFilter,
				success: function(oData) {
					debugger;
					// alert("in");
					that.arr = oData.results;
					that.jsonModel.setData({
						modelData: that.arr
					});
					otable.setModel(that.jsonModel);
					otable.bindRows("/modelData");
					otable1.setModel(that.jsonModel);
					otable1.bindRows("/modelData");
					otable2.setModel(that.jsonModel);
					otable2.bindRows("/modelData");
					otable3.setModel(that.jsonModel);
					otable3.bindRows("/modelData");
					// debugger;
					// var txt = that.arr[0];
					// Matter.setValue(txt.Matter + "-" + txt.MatterDesc );
					// Payer.setValue(txt.Payer + "-" + txt.PayerName );
					// BillingDate.setValue(txt.BillingDate + "-" + txt.BillingQuty );
					// NetAmount.setValue(txt.NetValue + "-" + txt.Amount );

					that.jsonModel.setProperty("/Matter", Matter);
					that.jsonModel.setProperty("/LeadPartner", LeadPartner);
					that.jsonModel.setProperty("/BillingOffice", BillingOffice);
					// that.jsonModel.setProperty("/Payer2", oData.results[0].PayerName);
					// that.jsonModel.setProperty("/BillingDate1", oData.results[0].BillingDate);
					// that.jsonModel.setProperty("/NetAmount1", oData.results[0].NetValue);
					// that.jsonModel.setProperty("/Currency", oData.results[0].Currency);

				}
			});

			InputFields.setProperty("/Inputs/IconTabs/Narrative_Edits", true);
			InputFields.setProperty("/Inputs/IconTabs/Line_Item_Edits", true);
			InputFields.setProperty("/Inputs/IconTabs/Line_Item_Transfers", true);

		},
		NarrativeEditsSelection: function(oEvent) {

			debugger;
			var InputFields = this.getView().getModel("InputsModel");
			var rowCount = this.byId("WipDetailsSet1").getSelectedIndices();

			if (rowCount.length) {

				InputFields.setProperty("/Inputs/ToolbarEnable/Reviewed", true);
				InputFields.setProperty("/Inputs/ToolbarEnable/Unreview", true);
				InputFields.setProperty("/Inputs/ToolbarEnable/Replace_Words", true);

			} else {

				InputFields.setProperty("/Inputs/ToolbarEnable/Reviewed", false);
				InputFields.setProperty("/Inputs/ToolbarEnable/Unreview", false);
				InputFields.setProperty("/Inputs/ToolbarEnable/Replace_Words", false);
			}

		},

		LineItemEditsSelection: function() {

			var InputFields = this.getView().getModel("InputsModel");
			var rowCount = this.byId("WipDetailsSet2").getSelectedIndices();

			if (rowCount.length === 1) {

				InputFields.setProperty("/Inputs/ToolbarEnable/Reviewed", true);
				InputFields.setProperty("/Inputs/ToolbarEnable/Unreview", true);
				InputFields.setProperty("/Inputs/ToolbarEnable/Updatecodes", true);
				InputFields.setProperty("/Inputs/ToolbarEnable/Modify_Reverse", true);

			} else if (rowCount.length > 1) {
				InputFields.setProperty("/Inputs/ToolbarEnable/Reviewed", true);
				InputFields.setProperty("/Inputs/ToolbarEnable/Unreview", true);
				InputFields.setProperty("/Inputs/ToolbarEnable/Updatecodes", true);
				InputFields.setProperty("/Inputs/ToolbarEnable/Modify_Reverse", false);
			} else {

				InputFields.setProperty("/Inputs/ToolbarEnable/Reviewed", false);
				InputFields.setProperty("/Inputs/ToolbarEnable/Unreview", false);
				InputFields.setProperty("/Inputs/ToolbarEnable/Updatecodes", false);
				InputFields.setProperty("/Inputs/ToolbarEnable/Modify_Reverse", false);

			}

		},
		LineItemTransferSelection: function(oEvent) {
            debugger;
			var InputFields = this.getView().getModel("InputsModel");
			var rowCount = this.byId("WipDetailsSet3").getSelectedIndices();
			this.byId("ToMatter3");
			
			// Need to update Updatecodes Logic based on control filed selection in th table columns

			if (rowCount.length === 1) {
				

				InputFields.setProperty("/Inputs/ToolbarEnable/Consolidate", false);
				InputFields.setProperty("/Inputs/ToolbarEnable/Mass_Transfer", true);
				InputFields.setProperty("/Inputs/ToolbarEnable/Updatecodes", false);
				InputFields.setProperty("/Inputs/ToolbarEnable/Split_Transfer", true);

			} else if (rowCount.length > 1) {

				InputFields.setProperty("/Inputs/ToolbarEnable/Consolidate", true);
				InputFields.setProperty("/Inputs/ToolbarEnable/Mass_Transfer", true);
				InputFields.setProperty("/Inputs/ToolbarEnable/Updatecodes", false);
				InputFields.setProperty("/Inputs/ToolbarEnable/Split_Transfer", false);
			} else {

				InputFields.setProperty("/Inputs/ToolbarEnable/Consolidate", false);
				InputFields.setProperty("/Inputs/ToolbarEnable/Mass_Transfer", false);
				InputFields.setProperty("/Inputs/ToolbarEnable/Updatecodes", false);
				InputFields.setProperty("/Inputs/ToolbarEnable/Split_Transfer", false);

			}

		},

		handleIconTabBarSelect: function(oEvent) {
			debugger;
			var InputFields = this.getView().getModel("InputsModel");
			var change = oEvent.getSource();

			var value = change.getSelectedKey();

			if (value === "NarrativeEdits") {

				//Visible property set
				InputFields.setProperty("/Inputs/Toolbar/Reviewed", true);
				InputFields.setProperty("/Inputs/Toolbar/Unreview", true);
				InputFields.setProperty("/Inputs/Toolbar/Save", true);
				InputFields.setProperty("/Inputs/Toolbar/Save_Layout", false);
				InputFields.setProperty("/Inputs/Toolbar/Modify_Reverse", false);
				InputFields.setProperty("/Inputs/Toolbar/Consolidate", false);
				InputFields.setProperty("/Inputs/Toolbar/Updatecodes", false);
				InputFields.setProperty("/Inputs/Toolbar/GlobalSpellCheck", true);
				InputFields.setProperty("/Inputs/Toolbar/Mass_Transfer", false);
				InputFields.setProperty("/Inputs/Toolbar/Split_Transfer", false);
				InputFields.setProperty("/Inputs/Toolbar/Replace_Words", true);

				//Enable Property set 

				InputFields.setProperty("/Inputs/ToolbarEnable/Reviewed", false);
				InputFields.setProperty("/Inputs/ToolbarEnable/Unreview", false);
				InputFields.setProperty("/Inputs/ToolbarEnable/Replace_Words", false);

			} else if (value === "LineItemEdits") {

				//Visible property set
				InputFields.setProperty("/Inputs/Toolbar/Reviewed", true);
				InputFields.setProperty("/Inputs/Toolbar/Unreview", true);
				InputFields.setProperty("/Inputs/Toolbar/Save", true);
				InputFields.setProperty("/Inputs/Toolbar/Save_Layout", true);
				InputFields.setProperty("/Inputs/Toolbar/Modify_Reverse", true);
				InputFields.setProperty("/Inputs/Toolbar/Consolidate", false);
				InputFields.setProperty("/Inputs/Toolbar/Updatecodes", true);
				InputFields.setProperty("/Inputs/Toolbar/GlobalSpellCheck", false);
				InputFields.setProperty("/Inputs/Toolbar/Mass_Transfer", false);
				InputFields.setProperty("/Inputs/Toolbar/Split_Transfer", false);
				InputFields.setProperty("/Inputs/Toolbar/Replace_Words", false);

				//Enable Property set 

				InputFields.setProperty("/Inputs/ToolbarEnable/Reviewed", false);
				InputFields.setProperty("/Inputs/ToolbarEnable/Unreview", false);
				InputFields.setProperty("/Inputs/ToolbarEnable/Updatecodes", false);
				InputFields.setProperty("/Inputs/ToolbarEnable/Modify_Reverse", false);

			} else if (value === "LineItemTransfers") {

				//Visible property set
				InputFields.setProperty("/Inputs/Toolbar/Reviewed", false);
				InputFields.setProperty("/Inputs/Toolbar/Unreview", false);
				InputFields.setProperty("/Inputs/Toolbar/Save", true);
				InputFields.setProperty("/Inputs/Toolbar/Save_Layout", true);
				InputFields.setProperty("/Inputs/Toolbar/Modify_Reverse", false);
				InputFields.setProperty("/Inputs/Toolbar/Consolidate", true);
				InputFields.setProperty("/Inputs/Toolbar/Updatecodes", true);
				InputFields.setProperty("/Inputs/Toolbar/GlobalSpellCheck", false);
				InputFields.setProperty("/Inputs/Toolbar/Mass_Transfer", true);
				InputFields.setProperty("/Inputs/Toolbar/Split_Transfer", true);
				InputFields.setProperty("/Inputs/Toolbar/Replace_Words", false);

				//Enable Property set 

				InputFields.setProperty("/Inputs/ToolbarEnable/Consolidate", false);
				InputFields.setProperty("/Inputs/ToolbarEnable/Mass_Transfer", false);
				InputFields.setProperty("/Inputs/ToolbarEnable/Updatecodes", false);
				InputFields.setProperty("/Inputs/ToolbarEnable/Split_Transfer", false);
			} else {
				//Visible property set
				InputFields.setProperty("/Inputs/Toolbar/Reviewed", false);
				InputFields.setProperty("/Inputs/Toolbar/Unreview", false);
				InputFields.setProperty("/Inputs/Toolbar/Save", false);
				InputFields.setProperty("/Inputs/Toolbar/Save_Layout", true);
				InputFields.setProperty("/Inputs/Toolbar/Modify_Reverse", false);
				InputFields.setProperty("/Inputs/Toolbar/Consolidate", false);
				InputFields.setProperty("/Inputs/Toolbar/Updatecodes", false);
				InputFields.setProperty("/Inputs/Toolbar/GlobalSpellCheck", false);
				InputFields.setProperty("/Inputs/Toolbar/Mass_Transfer", false);
				InputFields.setProperty("/Inputs/Toolbar/Split_Transfer", false);
				InputFields.setProperty("/Inputs/Toolbar/Replace_Words", false);

				//Enable Property set 

			}

		},
		onHide: function() {
			var oSplit = this.getView().byId("SplitApp");
			oSplit.setMode(sap.m.SplitAppMode.HideMode);
			this.getView().byId("hide").setVisible(false);
			this.getView().byId("show").setVisible(true);
		},
		onHide1: function() {
			var oSplit = this.getView().byId("SplitApp");
			oSplit.setMode(sap.m.SplitAppMode.StretchCompressMode);
			this.getView().byId("show").setVisible(false);
			this.getView().byId("hide").setVisible(true);
		},

	gotoPress: function() {

			debugger;

			var value = this.getView().byId("SmartFilterBar").getControlByKey("Pspid").getTokens().length;
			if (value >= 1) {
				var InputFields = this.getView().getModel("InputsModel");
				InputFields.setProperty("/Inputs/hideFilterBar", false);
			}
			// var aFilter = [];
			// var oList = this.getView().byId("list");
			//var oBinding = oList.getBinding("items");
			// if (value) {
			// 	aFilter.push(new Filter("Matter", sap.ui.model.FilterOperator.Contains, value));
			// }
		},
	// gotoPress: function(oEvent) {
	// 		debugger;

	// 		var value = this.getView().byId("SmartFilterBar").getControlByKey("Pspid").getTokens().length;
	// 		var aFilter = [];
	// 		if (value >= 1) {
	// 			var InputFields = this.getView().getModel("InputsModel");
	// 			InputFields.setProperty("/Inputs/hideFilterBar", false);
	// 		}
	// 		var oModel = this.getOwnerComponent().getModel();
	// 		oModel.refresh(true);
	// 		var object = this.getView().byId("SmartFilterBar").getControlByKey("Pspid").getTokens();
	// 		var that = this;
	// 		$.each(object, function(j, token) {
	// 			if (object) {
	// 				aFilter.push(new Filter("Pspid", "EQ", token.getText()));
	// 			}
	// 			var olist = that.getView().byId("list");
	// 			var oBind = olist.getBinding("items");
	// 			oBind.filter(aFilter);
	// 		});

	// 	},



	
		// Settings:function(){
		// 	this._Dialog = sap.ui.xmlfragment("wip.fragments.Fragment",
  //                              this);
  //              this._Dialog.open();  
		// },
		
	});

});