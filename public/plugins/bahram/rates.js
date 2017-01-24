


$.ajax({
        url: 'https://proxy.sanalfabrika.com/SlimProxyBoot.php',
        //                url: 'http://proxy.sanalfabrika.com:9990/SlimProxyBoot.php',            
        data: {url: 'getLeftMenuMachineStatistic_sysMachineTools',
            language_code: $("#langCode").val()
        },
        method: "GET",
        dataType: "json",
        success: function (data) {           
            
            if(data.length > 0){
                
                $('#all_machines').empty();
                $('#machining_machines').empty();
                $('#machining_rate').empty();
                $('#cnc_machines').empty();
                $('#cnc_rate').empty();
                $('#five_axis').empty();
                $('#five_axis_rate').empty();
                
                var machining_rate = 100 * data[0].allmachiningequipment / data[0].allmachine;
                var cnc_rate = 100 * data[0].allcnc / data[0].allmachine;
                var five_axis_rate = 100 * data[0].all5axis / data[0].allmachine;
                
                
                $('#all_machines').append(data[0].allmachine);
                $('#machining_machines').append(data[0].allmachiningequipment);
                $('#machining_rate').css('width', machining_rate + "%");
                $('#cnc_machines').append(data[0].allcnc);
                $('#cnc_rate').css('width', cnc_rate + "%");
                $('#five_axis').append(data[0].all5axis);
                $('#five_axis_rate').css('width', five_axis_rate + "%");
            }
            
        }

    });

