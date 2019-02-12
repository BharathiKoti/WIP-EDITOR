sap.ui.define([
	"wip/model/BaseObject",
	"sap/ui/model/resource/ResourceModel"
], function(BaseObject, ResourceModel) {
	"use strict";
	return BaseObject.extend("wip.model.ReportModel", {

		constructor: function(data) {
			BaseObject.call(this);
		
			this.Inputs = {
				hideFilterBar: true,
				rootPspid:"",
				IconTabs: {
					Home: true,
					Narrative_Edits: false,
					Line_Item_Edits: false,
					Line_Item_Transfers: false
				},
					Filters:{
						filters: ["Filter1", "Filter2", "Filter3", "Filter4"],
					Filter1:{
						table: "WipDetailsSet",
						
						createcontrols: [{
								"key": "Belnr",
								"type": "text",
								"userCol": "Document Number"
							}, {
								"key": "Awtyp",
								"type": "text",
								"userCol": "Transtype"
							}
						
							, {
								"key": "ZzbgrpDesc",
								"type": "text",
								"userCol": "Activity Description"
							},
							{
								"key": "Bldat",
								"type": "DatePicker",
								"userCol": "Activity Description"
							},
							{
								"key": "Tdid",
								"type": "text",
								"userCol": "Time Keeper no "
							},
								{
								"key": "Tdname",
								"type": "text",
								"userCol": "Time Keeper Name"
							},
								{
								"key": "Quantity",
								"type": "text",
								"userCol": "Quantity"
							}
							

						],
						
						Columns: {
							Belnr: "",
							Awtyp: "",
							
							ZzbgrpDesc: "",
							Bldat: "",
							Tdid: "",
							Tdname: "",
							Quantity: ""

						}
	
				},
				
					"Filter2":{
						table: "WipDetailsSet1",
						
						createcontrols: [{
								"key": "Belnr",
								"type": "text",
								"userCol": "Document Number"
							}, {
								"key": "Awtyp",
								"type": "text",
								"userCol": "Transtype"
							}
						
							, {
								"key": "ZzbgrpDesc",
								"type": "text",
								"userCol": "Activity Description"
							},
							{
								"key": "Bldat",
								"type": "DatePicker",
								"userCol": "Activity Description"
							},
							{
								"key": "Tdid",
								"type": "text",
								"userCol": "Time Keeper no "
							},
								{
								"key": "Tdname",
								"type": "text",
								"userCol": "Time Keeper Name"
							},
								{
								"key": "Quantity",
								"type": "text",
								"userCol": "Quantity"
							}
							

						],
						
						Columns: {
							Belnr: "",
							Awtyp: "",
							
							ZzbgrpDesc: "",
							Bldat: "",
							Tdid: "",
							Tdname: "",
							Quantity: ""

						}
	
				},
					"Filter3":{
						table: "WipDetailsSet2",
						
						createcontrols: [{
								"key": "Belnr",
								"type": "text",
								"userCol": "Document Number"
							}, {
								"key": "Awtyp",
								"type": "text",
								"userCol": "Transtype"
							}
						
							, {
								"key": "ZzbgrpDesc",
								"type": "text",
								"userCol": "Activity Description"
							},
							{
								"key": "Bldat",
								"type": "DatePicker",
								"userCol": "Activity Description"
							},
							{
								"key": "Tdid",
								"type": "text",
								"userCol": "Time Keeper no "
							},
								{
								"key": "Tdname",
								"type": "text",
								"userCol": "Time Keeper Name"
							},
								{
								"key": "Quantity",
								"type": "text",
								"userCol": "Quantity"
							}
							

						],
						
						Columns: {
							Belnr: "",
							Awtyp: "",
							
							ZzbgrpDesc: "",
							Bldat: "",
							Tdid: "",
							Tdname: "",
							Quantity: ""

						}
	
				},
					"Filter4":{
						table: "WipDetailsSet3",
						
						createcontrols: [{
								"key": "Belnr",
								"type": "text",
								"userCol": "Document Number"
							}, {
								"key": "Awtyp",
								"type": "text",
								"userCol": "Transtype"
							}
						
							, {
								"key": "ZzbgrpDesc",
								"type": "text",
								"userCol": "Activity Description"
							},
							{
								"key": "Bldat",
								"type": "DatePicker",
								"userCol": "Activity Description"
							},
							{
								"key": "Tdid",
								"type": "text",
								"userCol": "Time Keeper no "
							},
								{
								"key": "Tdname",
								"type": "text",
								"userCol": "Time Keeper Name"
							},
								{
								"key": "Quantity",
								"type": "text",
								"userCol": "Quantity"
							}
							

						],
						
						Columns: {
							Belnr: "",
							Awtyp: "",
							
							ZzbgrpDesc: "",
							Bldat: "",
							Tdid: "",
							Tdname: "",
							Quantity: ""

						}
	
				}
				},
				Countries_collection: [{
				    Key: "dataEn",
				    Text:"English" 
				},
				{
				    Key: "dataFr",
				    Text:"French" 
				},
				{
				    Key: "dataIt",
				    Text:"Italin" 
				}
				],
				Toolbar:{
					Reviewed: false,
					Unreview: false,
					Save: false,
					Save_Layout: true,
					Modify_Reverse: false,
					Consolidate: false,
					Updatecodes: false,
					GlobalSpellCheck: false,
					Mass_Transfer: false,
					Split_Transfer: false,
					Replace_Words:false
				},
				
				ToolbarEnable:{
					Reviewed: false,
					Unreview: false,
					Replace_Words:false,
					Modify_Reverse: false,
					Updatecodes: false,
					Consolidate: false,
					Mass_Transfer: false,
					Split_Transfer: false
				}
					
				

			};

		}
	});
});