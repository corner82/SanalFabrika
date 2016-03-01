
    (function ($) {
        
     /**
     * set alpaca form due to machine tree selected machine item
     * @author Mustafa Zeynel Dağlı
     * @Edit: Bahram Lotfi
     * @since 29/02/2016
     */
    $.widget("sanalfabrika.machineGeneralInfoFormCreater", {
        /**
         * Default options.
         * @returns {null}
         */
        options: {
            proxy: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
            pk: $("#pk").val(),
            ajaxParams: null,
            machineID: null,
            //treeClass: ' .tree ',
            //treeID: ' #tree ',
            alpacaGenFormContainer: '#selectedMTGenInformation'
        },
        /**
         * private method to call sub nodes
         * @returns {null}
         */
        _create: function () {

        },
        /**
         * set alpaca plugin form
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         * @since 29/02/2016
         */
        setMachineGeneralInfoForm: function () {

            $(this.options.alpacaGenFormContainer).alpaca("destroy");
            $(this.options.alpacaGenFormContainer).empty();
            
            this._getGeneralServiceForAlpacaForm();
        },
        
        /**
         * 
         * @returns {undefined}
         * @author Mustafa Zeynel Dağlı
         * @since 29/02/2016
         */
                
        _getGeneralServiceForAlpacaForm : function () {
            self = this;

            $.ajax({
                url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
                data: {
                    url: self.options.url,
                    pk: $("#pk").val(),
                    machine_id: self.options.machineID
                },
                type: 'GET',
                dataType: 'json',
                success: function (data, textStatus, jqXHR) {
                    
                    if (data.rows.length !== 0) {
                        $(self.options.alpacaGenFormContainer).alpaca({
                            "schema": {
                                "type": "object",
                                "properties": {
                                    "manufacturer": {
                                        "type": "text"
                                    },
                                    "name": {
                                        "type": "text"
                                    },
                                    "model": {
                                        "type": "text"
                                    },
                                    "type": {
                                        "type": "text"
                                    }
                                }
                            },
                            "options": {
                                "fields": {
                                    "manufacturer": {
                                        "label": window.lang.translate("Machine Manufacturer"),
                                        "type": "text",
                                        "readonly": true
                                    },
                                    "name": {
                                        "label": window.lang.translate("Machine Name"),
                                        "type": "text",
                                        "disabled": true,
                                    },
                                    "model": {
                                        "label": window.lang.translate("Machine Model"),
                                        "type": "text",
                                        "disabled": true
                                    },
                                    "type": {
                                        "label": window.lang.translate("Machine Type"),
                                        "type": "text",
                                        "disabled": true
                                    }
                                }
                            },
                            "data": {
                                "manufacturer": data.rows[0].manufacturer_name,
                                "name": data.rows[0].machine_tool_names,
                                "model": data.rows[0].model_year,
                                "type": data.rows[0].machine_tool_grup_names
                            }
                        });
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('error');
                    console.error(textStatus);
                }
            });
        }
    });




}(jQuery));

