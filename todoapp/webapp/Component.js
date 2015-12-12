sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"todoapp/model/models",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/odata/v2/ODataModel"
], function(UIComponent, Device, models, JSONModel, ODataModel) {
	"use strict";

	return UIComponent.extend("todoapp.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {

			// we don't call this function, because
			// the model is automatically created via
			// the app-descriptor -> manifest.json
			
			// this._initOData();
			
			// this model is used for creating a new entry
			this.oModel = new JSONModel({
				newTodo: ''
			});
			
			this.setModel(this.oModel, "data");
			
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		},
		
		_initOData: function() {
			
			// this function shows you how you would create
			// your OData model manually
			
			// note that here the path is ./odata
			// and in the manifest.json it is ../odata !
			
			var sServiceUrl = "./odata/todo.xsodata";

			this.oDataModel = new ODataModel(sServiceUrl);
			
			// useBatch false is important for SP08 XS!
			this.oDataModel.setUseBatch(false);
			
			this.oDataModel.setDefaultBindingMode("TwoWay");
			
			this.setModel(this.oDataModel);
			
		},

		/**
		 * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
		 * design mode class should be set, which influences the size appearance of some controls.
		 * @public
		 * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
		 */
		getContentDensityClass: function() {
			if (this._sContentDensityClass === undefined) {
				// check whether FLP has already set the content density class; do nothing in this case
				if (jQuery(document.body).hasClass("sapUiSizeCozy") || jQuery(document.body).hasClass("sapUiSizeCompact")) {
					this._sContentDensityClass = "";
				} else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}

	});

});