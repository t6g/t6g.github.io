jQuery(document).ready(function () {
    const g = 32.17;
    
    const defaultBreach = {
        Vw: 296.41,
        Hw: 21,
        As: 20.0,
        C:  20,
        Zu: 3,
        Zd: 3
    };
    const breachVar = {};
    
    let tmp = localStorage.getItem('BreachVariables');
    if(tmp) {
        Object.assign(breachVar, JSON.parse(tmp));
    } else {
        Object.assign(breachVar, defaultBreach);
    };
    
    initialize();
    update();
    
    $("#mynav").load("nav.html");
    
    $("#btnSave").click(function() {
        localStorage.setItem('BreachVariables', JSON.stringify(defaultBreach));
    });

    
    $("#Vw").change(function() {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessage'), "Input a number for Vw!");
            $("#Vw").val(breachVar.Vw);
            $(this).trigger('focus');
        } else if (tmp <= 0) {
            showMessage($('#warningMessage'), "Input a positive number for Vw!");
            $("#Vw").val(breachVar.Vw);
            $(this).trigger('focus');
        }
        else {
            breachVar.Vw = tmp;
            update();
        };
    });

    $("#Hw").change(function() {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessage'), "Input a number for Hw!");
            $("#Hw").val(breachVar.Hw);
            $(this).trigger('focus');
        } else if (tmp <= 0) {
            showMessage($('#warningMessage'), "Input a positive number for Hw!");
            $("#Hw").val(breachVar.Hw);
            $(this).trigger('focus');
        }
        else {
            breachVar.Hw = tmp;
            update();
        };
    });

    $("#As").change(function() {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessage'), "Input a number for As!");
            $("#As").val(breachVar.As);
            $(this).trigger('focus');
        } else if (tmp <= 0) {
            showMessage($('#warningMessage'), "Input a positive number for As!");
            $("#As").val(breachVar.As);
            $(this).trigger('focus');
        }
        else {
            breachVar.As = tmp;
            update();
        };
    });

    $("#widthTop").change(function() {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessage'), "Input a number for dam top width!");
            $("#widthTop").val(breachVar.C);
            $(this).trigger('focus');
        } else if (tmp <= 0) {
            showMessage($('#warningMessage'), "Input a positive number for dam top width!");
            $("#widthTop").val(breachVar.C);
            $(this).trigger('focus');
        }
        else {
            breachVar.C = tmp;
            update();
        };
    });

    $("#Zu").change(function() {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessage'), "Input a number for Zu!");
            $("#Zu").val(breachVar.Zu);
            $(this).trigger('focus');
        } else if (tmp <= 0) {
            showMessage($('#warningMessage'), "Input a positive number for Zu!");
            $("#Zu").val(breachVar.Zu);
            $(this).trigger('focus');
        }
        else {
            breachVar.Zu = tmp;
            update();
        };
    });

    $("#Zd").change(function() {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessage'), "Input a number for Zd!");
            $("#Zd").val(breachVar.Zd);
            $(this).trigger('focus');
        } else if (tmp <= 0) {
            showMessage($('#warningMessage'), "Input a positive number for Zd!");
            $("#Zd").val(breachVar.Zd);
            $(this).trigger('focus');
        }
        else {
            breachVar.Zd = tmp;
            update();
        };
    });

    function initialize(){
      $("#Vw").val(breachVar.Vw.toFixed(2));
      $("#Hw").val(breachVar.Hw.toFixed(2));
      $("#C").val(breachVar.C.toFixed(2));
      $("#Zu").val(breachVar.Zu.toFixed(2));
      $("#Zd").val(breachVar.Zd.toFixed(2));
    };

    function update(){
        var bff = breachVar.Vw * breachVar.Hw;
        var si = breachVar.Vw / breachVar.Hw;
        var wavg = breachVar.C + breachVar.Hw * (breachVar.Zu + breachVar.Zd) / 2;
        $("#BFF").html(bff.toFixed(2));
        $("#SI").html(si.toFixed(2));
        $("#Wavg").html(wavg.toFixed(2));

        var ver1 = 3.264 * Math.pow(bff, 0.77);
        var ver2 = 0.714 * Math.pow(bff, 0.852);
        var ver3 = 3.75 *  Math.pow(bff, 0.77);
        var ver4 = 2.5 *   Math.pow(bff, 0.77);
        
        $("#VerBestFit").html(ver1.toFixed(2));
        $("#VerRockfill").html(ver2.toFixed(2));
        $("#VerCohesionless").html(ver3.toFixed(2));
        $("#VerCohesive").html(ver4.toFixed(2));
        
        var bavg1 = ver1 / wavg / breachVar.Hw;
        var bavg2 = ver2 / wavg / breachVar.Hw;
        var bavg3 = ver3 / wavg / breachVar.Hw;
        var bavg4 = ver4 / wavg / breachVar.Hw;
        var bavg5 = 8.239*Math.pow(breachVar.Vw, 0.32) * Math.pow(breachVar.Hw, 0.04);
        var bavg6 = 1.3 * bavg5;
        
        $("#BavgBestFit").html(bavg1.toFixed(2));
        $("#BavgRockfill").html(bavg2.toFixed(2));
        $("#BavgCohesionless").html(bavg3.toFixed(2));
        $("#BavgCohesive").html(bavg4.toFixed(2));
        $("#BavgPiping").html(bavg5.toFixed(2));
        $("#BavgOvertopping").html(bavg6.toFixed(2));
        
        var tf1 = 0.016 * Math.pow(ver1, 0.364);
        var tf2 = 0.016 * Math.pow(ver2, 0.364);
        var tf3 = 0.02 * Math.pow(ver3, 0.36);
        var tf4 = 0.036 * Math.pow(ver4, 0.36);
        var tf5 = 3.664 * Math.sqrt(breachVar.Vw/g)/breachVar.Hw;
        
        $("#TfBestFit").html(tf1.toFixed(2));
        $("#TfRockfill").html(tf2.toFixed(2));
        $("#TfCohesionless").html(tf3.toFixed(2));
        $("#TfCohesive").html(tf4.toFixed(2));
        $("#TfFroehlich").html(tf5.toFixed(2));
        
        var gamma = 23.4*breachVar.As/bavg5;
        var qp6 = 3.1 * bavg5 * Math.pow(breachVar.Hw, 1.5) * Math.pow(gamma/(gamma + tf5*Math.sqrt(breachVar.Hw)), 3);
        $("#QpOvertopping").html(qp6.toFixed(2));
        
    }
});
