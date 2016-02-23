$(document).ready(function () {

    /**
     * multilanguage plugin 
     * @type Lang
     */

    window.lang = new Lang();
    lang.dynamic($('#langCode').val(), '/plugins/jquery-lang-js-master/langpack/' + $('#langCode').val() + '.json');
    lang.init({
        defaultLang: 'en'
    });
    lang.change($('#langCode').val());

    // Left menuyu oluşturmak için çağırılan fonksiyon...
    $.fn.leftMenuFunction();

    /*
     * Machine tools list tree
     * @author:Bahram Lotfi Sadigh
     * @Since: 2016.2.18
     */

    $("#mtPropsDynamicForm").alpaca({
        "schema": {
            "type": "object",
            "properties": {
                "generalMachineInformation": {
                    "type": "object",
                    "properties": {
                        "manufacturer": {
                            "type": "string"
                        },
                        "name": {
                            "type": "string"
                        },
                        "model": {
                            "type": "string"
                        },
                        "type": {
                            "type": "string"
                        }
                    }
                },
                "detailedMachineProperties": {
                    "type": "object",
                    "properties": {
                        "machineProperties": {
                            "type": "string"
                        }
                    }
                }
            }
        },
        "options": {
            "fields": {
                "generalMachineInformation": {
                    "label": "General Machine Information ",
                    "fields": {
                        "manufacturer": {
                            "label": "Machine Manufacturer",
                            "type": "text"
                        },
                        "name": {
                            "label": "Machine Name",
                            "type": "text"
                        },
                        "model": {
                            "label": "Machine Model",
                            "type": "text"
                        },
                        "type": {
                            "label": "Machine Type",
                            "type": "text"
                        }
                    }
                },
                "detailedMachineProperties": {
                    "label": "Detailed Machine Properties",
                    "fields": {
                        "machineProperties": {
                            "label": "Machine Properties",
                            "type": "text"
                        }
                    }
                }
            }
        },
        "data": {
            "manufacturer": "Machine Manufacturer",
            "name": "Machine Name",
            "model": "Machine Model",
            "type": "Machine Category",
            "machineProperties": "Machine Properties"
        },
        "postRender": function (control) {
//            var manufacturerField = control.childrenByPropertyId["name"];
//            var nameField = control.childrenByPropertyId["job"];

        }
    });





    var tree = $('.tree2').machineTree();

    tree.machineTree('option', 'url', 'pkFillMachineToolGroups_sysMachineToolGroups');
    tree.machineTree('option', 'pk', $("#pk").val());
    tree.machineTree('option', 'language_code', $("#langCode").val());
    tree.machineTree('setMainRoot');


    /**
     * machine tool tree
     * @author Mustafa Zeynel Dağlı
     * @since 12/02/2016
     */

    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
    $('.tree li.parent_li > span').on('click', function (e) {
        // alert('test');
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        if (children.is(":visible")) {
            children.hide('fast');
            //$(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('fa-cogs').removeClass('fa-spin');
        } else {
            children.show('fast');
            //$(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('fa-spin').removeClass('fa-cogs');
        }
        e.stopPropagation();
    });


});