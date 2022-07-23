jQuery(document).ready(function () {

    const defaultTR55 = {
        A: 1.00,
        CN: 80,
        Tc: 20.0,
        P1: 2.77,
        P2: 3.33,
        P10: 5.07,
        P100: 8.34
    };

    const TR55Var = {};

    let tmp = localStorage.getItem('TR55Variables');
    if(tmp) {
        Object.assign(TR55Var, JSON.parse(tmp));
    } else {
        Object.assign(TR55Var, defaultTR55);
    };
    
    initialize();
    update();
    
    $("#mynav").load("nav.html");
    
    $("#btnSave").click(function() {
        localStorage.setItem('TR55Variables', JSON.stringify(defaultTR55));
    });

    
    $("#DA").change(function() {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessage'), "Input a number for drainage area!");
            $("#DA").val(TR55Var.A);
            $(this).trigger('focus');
        } else if (tmp <= 0) {
            showMessage($('#warningMessage'), "Input a positive number for drainage area!");
            $("#DA").val(TR55Var.A);
            $(this).trigger('focus');
        }
        else {
            TR55Var.A = tmp;
            update();
        };
    });

    $("#Tc").change(function() {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessage'), "Input a number for time of concentration!");
            $("#Tc").val(TR55Var.Tc);
            $(this).trigger('focus');
        } else if (tmp <= 0) {
            showMessage($('#warningMessage'), "Input a positive number for time of concentration!");
            $("#Tc").val(TR55Var.Tc);
            $(this).trigger('focus');
        }
        else {
            TR55Var.Tc = tmp;
            update();
        };
    });

    function initialize(){
      $("#DA").val(TR55Var.A.toFixed(2));
      $("#CN").val(TR55Var.CN.toFixed(2));
      $("#Tc").val(TR55Var.Tc.toFixed(2));
    };

    function Iap2qu(Tc, Iap){
        var logTc = Math.log10(Tc / 60.0);
        var c0, c1, c2;
        c0 = 2.55323; c1 = -0.61512; c2 = -0.16403;
        var qu10 = Math.pow(10,c0 + c1 * logTc + c2 * logTc * logTc);
            
        c0 = 2.46532; c1 = -0.62257; c2 = -0.11657;
        var qu30 = Math.pow(10, c0 + c1 * logTc + c2 * logTc * logTc);

        c0 = 2.41896; c1 = -0.61594; c2 = -0.08820;
        var qu35 = Math.pow(10, c0 + c1 * logTc + c2 * logTc * logTc);

        c0 = 2.36409; c1 = -0.59857; c2 = -0.05621;
        var qu40 = Math.pow(10, c0 + c1 * logTc + c2 * logTc * logTc);

        c0 = 2.29238; c1 = -0.57005; c2 = -0.02281;
        var qu45 = Math.pow(10, c0 + c1 * logTc + c2 * logTc * logTc);

        c0 = 2.20282; c1 = -0.51599; c2 = -0.01259;
        var qu50 = Math.pow(10, c0 + c1 * logTc + c2 * logTc * logTc);
        
        var qu;
        
        if(Iap <= 0.1) {
            qu = qu10;
        } else if(Iap <= 0.3) {
            qu = qu10 + (qu30 - qu10)/ (0.30 - 0.10) * (Iap - 0.10);
        } else if(Iap <= 0.35) {
            qu = qu30 + (qu35 - qu30)/ (0.35 - 0.30) * (Iap - 0.30);
        } else if(Iap <= 0.40) {
            qu = qu35 + (qu40 - qu35)/ (0.40 - 0.35) * (Iap - 0.35);
        } else if(Iap <= 0.45) {
            qu = qu40 + (qu45 - qu40)/ (0.45 - 0.40) * (Iap - 0.40);
        } else if(Iap <= 0.50) {
            qu = qu45 + (qu50 - qu45)/ (0.50 - 0.45) * (Iatr55 - 0.45);
        } else {
            qu = qu50;
        }
        return qu;
    };
    
    function update(){

        var S = 1000/TR55Var.CN -10;
        var Ia = 0.2 * S;
        $("#S").html(S.toFixed(2));
        $("#Ia").html(Ia.toFixed(2));
        
        var P = TR55Var.P1;
        var Q1 = (P - 0.2 * S) * (P - 0.2 * S) / (P + 0.8 * S);
        P = TR55Var.P2;
        var Q2 = (P - 0.2 * S) * (P - 0.2 * S) / (P + 0.8 * S);
        P = TR55Var.P10;
        var Q10 = (P - 0.2 * S) * (P - 0.2 * S) / (P + 0.8 * S);
        P = TR55Var.P100;
        var Q100 = (P - 0.2 * S) * (P - 0.2 * S) / (P + 0.8 * S);
        
        $("#Q1").html(Q1.toFixed(2));
        $("#Q2").html(Q2.toFixed(2));
        $("#Q10").html(Q10.toFixed(2));
        $("#Q100").html(Q100.toFixed(2));
        
        var Iap1 = Ia/TR55Var.P1;
        var Iap2 = Ia/TR55Var.P2;
        var Iap10 = Ia/TR55Var.P10;
        var Iap100 = Ia/TR55Var.P100;

        $("#Iap1").html(Iap1.toFixed(2));
        $("#Iap2").html(Iap2.toFixed(2));
        $("#Iap10").html(Iap10.toFixed(2));
        $("#Iap100").html(Iap100.toFixed(2));

/*        
        var logTc = Math.log10(TR55Var.Tc / 60.0);
        var c0, c1, c2;
        c0 = 2.55323; c1 = -0.61512; c2 = -0.16403;
        var qu10 = Math.pow(10,c0 + c1 * logTc + c2 * logTc * logTc);
            
        c0 = 2.46532; c1 = -0.62257; c2 = -0.11657;
        var qu30 = Math.pow(10, c0 + c1 * logTc + c2 * logTc * logTc);

        c0 = 2.41896; c1 = -0.61594; c2 = -0.08820;
        var qu35 = Math.pow(10, c0 + c1 * logTc + c2 * logTc * logTc);

        c0 = 2.36409; c1 = -0.59857; c2 = -0.05621;
        var qu40 = Math.pow(10, c0 + c1 * logTc + c2 * logTc * logTc);

        c0 = 2.29238; c1 = -0.57005; c2 = -0.02281;
        var qu45 = Math.pow(10, c0 + c1 * logTc + c2 * logTc * logTc);

        c0 = 2.20282; c1 = -0.51599; c2 = -0.01259;
        var qu50 = Math.pow(10, c0 + c1 * logTc + c2 * logTc * logTc);
        
        $("#qu10").html(qu10.toFixed(0));
        $("#qu30").html(qu30.toFixed(0));
        $("#qu35").html(qu35.toFixed(0));
        $("#qu40").html(qu40.toFixed(0));
        $("#qu45").html(qu45.toFixed(0));
        $("#qu50").html(qu50.toFixed(0));
        
        var qp1, qu1;
        
        if(Iap1 <= 0.1) {
            qu = qu10;
        } else if(Iap1 <= 0.3) {
            qu = qu10 + (qu30 - qu10)/ (0.30 - 0.10) * (Iatr55 - 0.10);
        } else if(Iap1 <= 0.35) {
            qu = qu30 + (qu35 - qu30)/ (0.35 - 0.30) * (Iatr55 - 0.30);
        } else if(Iatr55 <= 0.40) {
            qu = qu35 + (qu40 - qu35)/ (0.40 - 0.35) * (Iatr55 - 0.35);
        } else if(Iatr55 <= 0.45) {
            qu = qu40 + (qu45 - qu40)/ (0.45 - 0.40) * (Iatr55 - 0.40);
        } else if(Iatr55 <= 0.50) {
            qu = qu45 + (qu50 - qu45)/ (0.50 - 0.45) * (Iatr55 - 0.45);
        } else {
            qu = qu50;
        }
*/      
        var qu1, qu2, qu10, qu100;
        qu1 = Iap2qu(TR55Var.Tc, Iap1);
        qu2 = Iap2qu(TR55Var.Tc, Iap2);
        qu10 = Iap2qu(TR55Var.Tc, Iap10);
        qu100 = Iap2qu(TR55Var.Tc, Iap100);

        var qp1, qp2, qp10, qp100; 
        
        qp1 = qu1 * TR55Var.A / 640 * Q1;
        qp2 = qu2 * TR55Var.A / 640 * Q2;
        qp10 = qu10 * TR55Var.A / 640 * Q10;
        qp100 = qu100 * TR55Var.A / 640 * Q100;

        $("#qu1").html(qu1.toFixed(0));
        $("#qu2").html(qu2.toFixed(0));
        $("#qu10").html(qu10.toFixed(0));
        $("#qu100").html(qu100.toFixed(0));

        $("#qp1").html(qp1.toFixed(2));
        $("#qp2").html(qp2.toFixed(2));
        $("#qp10").html(qp10.toFixed(2));
        $("#qp100").html(qp100.toFixed(2));
    }
});
