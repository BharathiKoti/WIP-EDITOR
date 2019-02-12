/*global location*/
sap.ui.define([
		"wip/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/routing/History",
		"wip/model/formatter"
	], function (
		BaseController,
		JSONModel,
		History,
		formatter
	) {
		"use strict";

		return BaseController.extend("wip.controller.Object", {

			formatter: formatter,

		

		});

	}
);