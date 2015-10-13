sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("todoapp.controller.App", {
		
		onInit: function() {
			this.oModel = this.getOwnerComponent().getModel();
			this.oData = this.getOwnerComponent().getModel("data");
		},
		
        fnSuccess : function() {
            console.log("success");
        },

        fnError: function(sError) {
            var oErrorText = JSON.parse(sError.responseText);
            console.log("(╯°□°）╯︵ ┻━┻ " + "\n" + oErrorText.error.message.value);
        },
		
		onAddTodo: function(oEvent) {

            // NOTE: if I use just getTime() - which has a length 16
            // then I can't access the entity - strange error
            // bad request - Syntax error at position 5
            
            var iId = Math.floor(new Date().getTime() / 1000);
            var sId = iId.toString(16);
            
            var mTodo = {
                id: sId,
                title: this.oData.getProperty('/newTodo'),
                completed: ""
            };

            this.oModel.create("/todo", mTodo, {
                success: jQuery.proxy(this.fnSuccess, this),
                error: jQuery.proxy(this.fnError, this)
            });
            
            this.oData.setProperty('/newTodo', '');
        },

        onChangeTodo: function(oEvent) {

            var oInput = oEvent.getSource();
            var sBindingPath = oInput.getBindingContext().getPath();
            var sNewValue = oEvent.getParameters().newValue;
            
            var oSendData = {
                title : sNewValue
            };
            
            this.oModel.update(sBindingPath, oSendData, {
                merge: true,
                success: jQuery.proxy(this.fnSuccess, this),
                error: jQuery.proxy(this.fnError, this)
            });
        },

		onToggleCompleted: function(oEvent) {
			
			var oSelected = oEvent.getParameter("listItem");
            var sBindingPath = oSelected.getBindingContext().getPath();
            
            var bSelected = oEvent.getParameters().selected;
            
            // there is no boolean data type in HANA
            // so therefore the value is mapped to a character
            var sSelected = bSelected ? "X" : "";
            
            var oSendData = {
                completed : sSelected
            };
            
            this.oModel.update(sBindingPath, oSendData, {
                merge: true,
                success: jQuery.proxy(this.fnSuccess, this),
                error: jQuery.proxy(this.fnError, this)
            });
		},
		
		onClearCompleted: function(oEvent) {
            
            // this.oModel.getObject() does not work!
            
            var oList = this.getView().byId("todo-list");
            var aContexts = oList.getBinding("items").getContexts();
            
            aContexts.forEach(function(element, index, array) {
                
                var sBindingPath = element.getPath();
				var oTodo = this.oModel.getProperty(sBindingPath);

				if (oTodo.completed) {
					this.oModel.remove(sBindingPath, {
                        success: jQuery.proxy(this.fnSuccess, this),
                        error: jQuery.proxy(this.fnError, this)
                    });
				}
			}, this);
		}
	});
});