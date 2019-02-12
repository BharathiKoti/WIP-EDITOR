sap.ui.define([
		"sap/ui/core/mvc/Controller",
			"wip/model/ReportModel",
			
		
	], function (Controller,ReportModel) {
		"use strict";

		return Controller.extend("wip.controller.BaseController", {
			/**
			 * Convenience method for accessing the router.
			 * @public
			 * @returns {sap.ui.core.routing.Router} the router for this component
			 */
			getRouter : function () {
				return sap.ui.core.UIComponent.getRouterFor(this);
			},

			/**
			 * Convenience method for getting the view model by name.
			 * @public
			 * @param {string} [sName] the model name
			 * @returns {sap.ui.model.Model} the model instance
			 */
			getModel : function (sName) {
				return this.getView().getModel(sName);
			},

			/**
			 * Convenience method for setting the view model.
			 * @public
			 * @param {sap.ui.model.Model} oModel the model instance
			 * @param {string} sName the model name
			 * @returns {sap.ui.mvc.View} the view instance
			 */
			setModel : function (oModel, sName) {
				return this.getView().setModel(oModel, sName);
			},

			/**
			 * Getter for the resource bundle.
			 * @public
			 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
			 */
			getResourceBundle : function () {
				return this.getOwnerComponent().getModel("i18n").getResourceBundle();
			},

			/**
			 * Event handler when the share by E-Mail button has been clicked
			 * @public
			 */
			onShareEmailPress : function () {
				var oViewModel = (this.getModel("objectView") || this.getModel("worklistView"));
				sap.m.URLHelper.triggerEmail(
					null,
					oViewModel.getProperty("/shareSendEmailSubject"),
					oViewModel.getProperty("/shareSendEmailMessage")
				);
			},
					Export:function(){
			debugger;
			var aCols, oSettings;
			aCols = this.createColumnConfig();
			var filters = this.getView().getModel("InputsModel").getProperty("/Inputs/Filters");
			for(var i=1;i<filters.length;i++){
		    var tableId = this.getView().getModel("InputsModel").getProperty("/Inputs/Filters/Filter" + i + "/table");
			
			var oTable = this.getView().byId(tableId);
			var sItems = oTable.getItems();
			var ChangedTableData = (sItems || []).map(function(oItem) {
				var obj = oItem.getBindingContext().getObject();
				return obj;
			});
			
			oSettings = {
				workbook: { columns: aCols },
				dataSource: ChangedTableData
			};
			}

			new Spreadsheet(oSettings)
				.build()
				.then( function() {
					MessageToast.show("Spreadsheet export has finished");
				});
		},
		createColumnConfig: function() {
					var filters = this.getView().getModel("InputsModel").getProperty("/Inputs/Filters");
				for(var i=1;i<filters.length;i++){
		    var columns = this.getView().getModel("InputsModel").getProperty("/Inputs/Filters/Filter" + i + "/Columns");
				
		     var colObj = [];
		     	for(var m = 0; m < columns.length; m++){
		     		var column = columns[m];
		     	var obj = {};
		     		if(column.type === "DatePicker"){
		     		obj = {
					label: column.userCol,
					property: column.key,
					type: "date"
				};	
		     		}else{
		     		obj = {
					label: column.userCol,
					property: column.key
				};	
		     		}
		     	}
		     		
		     	
				colObj.push(obj);
				
				
		     	}
		     	
		     	
		     	return  colObj;
		
			
		}

			

		});

	}
);