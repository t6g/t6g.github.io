        jQuery(document).ready(function(){
            $("#mynav").load("nav.html");

            if($("#level").val() === "1"){$(".level2").hide();};
            if($("#level").val() === "2"){$(".level1").hide();};
            
            //console.log('level: ' + $("#level").val());
            
            $("input[name='level']").on("change", function(){
                //console.log('change level: ' + this.value);
                
                if(this.value === "1")
                {
                    $(".level2").hide();
                    $(".level1").show();
                };
                if(this.value === "2")
                {
                    $(".level1").hide();
                    $(".level2").show();
                };
            });
            
        });
