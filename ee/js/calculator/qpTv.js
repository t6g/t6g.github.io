jQuery(document).ready(function () {
    const g = 32.17;
    
    const defaultqpTv = {
        Amt: 0.26,
        Aim: 0.5, 
        Tc: 20.0
    };

    const qpTvVar = {};

    //TR55 Table F-1 
/*
    const tr55 = {
        cs: [
        //rainfall type I
        [
            [0.10, 2.30550, -0.51429, -0.11750],
            [0.20, 2.23537, -0.50387, -0.08929],
            [0.25, 2.18219, -0.48488, -0.06589],
            [0.30, 2.10624, -0.45695, -0.02835],
            [0.35, 2.00303, -0.40769, 0.01983],
            [0.40, 1.87733, -0.32274, 0.05754],
            [0.45, 1.76312, -0.15644, 0.00453],
            [0.50, 1.67889, -0.06930, 0.0]
        ],
        //rainfall type IA
        [
            [0.10, 2.03250, -0.31583, -0.13748],
            [0.20, 1.91978, -0.28215, -0.07020],
            [0.25, 1.83842, -0.25543, -0.02597],
            [0.30, 1.72657, -0.19826, 0.02633],
            [0.50, 1.63417, -0.09100, 0.0]
        ],
        //rainfall type II
        [
            [0.10, 2.55323, -0.61512, -0.16403],
            [0.30, 2.46532, -0.62257, -0.11657],
            [0.35, 2.41896, -0.61594, -0.08820],
            [0.40, 2.36409, -0.59857, -0.05621],
            [0.45, 2.29238, -0.57005, -0.02281],
            [0.50, 2.20282, -0.51599, -0.01259]
        ],
        //rainfall type III
        [
            [0.10, 2.47317, -0.51848, -0.17083],
            [0.30, 2.39628, -0.51202, -0.13245],
            [0.35, 2.35477, -0.49735, -0.11985],
            [0.40, 2.30726, -0.46541, -0.11094],
            [0.45, 2.24876, -0.41314, -0.11508],
            [0.50, 2.17772, -0.36803, -0.09525]
        ]
        ]
    }
*/
    let tmp = localStorage.getItem('qpTvVariables');
    if(tmp) {
        Object.assign(qpTvVar, JSON.parse(tmp));
    } else {
        Object.assign(qpTvVar, defaultqpTv);
    };
    
    initialize();
    update();
    
    $("#mynav").load("nav.html");
    
    $("#btnSave").click(function() {
        localStorage.setItem('qpTvVariables', JSON.stringify(defaultqpTv));
    });

    
    $("#Amt").change(function() {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessage'), "Input a number for managed turf area!");
            $("#Amt").val(qpTvVar.Amt);
            $(this).trigger('focus');
        } else if (tmp <= 0) {
            showMessage($('#warningMessage'), "Input a positive number for managed turf area!");
            $("#Amt").val(qpTvVar.Amt);
            $(this).trigger('focus');
        }
        else {
            qpTvVar.Amt = tmp;
            update();
        };
    });

    $("#Aim").change(function() {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessage'), "Input a number for impervious area!");
            $("#Aim").val(qpTvVar.Aim);
            $(this).trigger('focus');
        } else if (tmp <= 0) {
            showMessage($('#warningMessage'), "Input a positive number for impervious area!");
            $("#Aim").val(qpTvVar.Aim);
            $(this).trigger('focus');
        }
        else {
            qpTvVar.Aim = tmp;
            update();
        };
    });

    $("#Tc").change(function() {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessage'), "Input a number for time of concentration!");
            $("#Tc").val(qpTvVar.Tc);
            $(this).trigger('focus');
        } else if (tmp <= 0) {
            showMessage($('#warningMessage'), "Input a positive number for time of concentration!");
            $("#Aim").val(qpTvVar.Tc);
            $(this).trigger('focus');
        }
        else {
            qpTvVar.Tc = tmp;
            update();
        };
    });

    function initialize(){
      $("#Amt").val(qpTvVar.Amt.toFixed(2));
      $("#Aim").val(qpTvVar.Aim.toFixed(2));
      $("#Tc").val(qpTvVar.Tc.toFixed(2));
    };

    function update(){
        const P = 1;
        const Rvmt = 0.25;
        const Rvim = 0.95;
        
        var Atotal = qpTvVar.Amt + qpTvVar.Aim;
        var Qa = (qpTvVar.Amt * Rvmt + qpTvVar.Aim * Rvim)/Atotal;
        var Tv = Qa * Atotal * 43560 / 12;
        var CN = 1000/(10 + 5*P + 10*Qa - 10*Math.sqrt(Qa * Qa + 1.25*Qa * P));
        var str55 = 1000/CN -10;
        var Iatr55 = 0.2*str55;
        var logTc = Math.log10(qpTvVar.Tc / 60.0);
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
        
        $("#Qa").html(Qa.toFixed(2));
        $("#Tv").html(Tv.toFixed(0));
        $("#CN").html(CN.toFixed(2));
        $("#Str55").html(str55.toFixed(2));
        $("#Iatr55").html(Iatr55.toFixed(2));
        
        $("#qu10").html(qu10.toFixed(0));
        $("#qu30").html(qu30.toFixed(0));
        $("#qu35").html(qu35.toFixed(0));
        $("#qu40").html(qu40.toFixed(0));
        $("#qu45").html(qu45.toFixed(0));
        $("#qu50").html(qu50.toFixed(0));
        
        var qp, qu;
        
        if(Iatr55 <= 0.1) {
            qu = qu10;
        } else if(Iatr55 <= 0.3) {
            qu = qu10 + (qu30 - qu10)/ (0.30 - 0.10) * (Iatr55 - 0.10);
        } else if(Iatr55 <= 0.35) {
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
        
        qp = qu * Atotal / 640 * Qa;

        $("#qu").html(qu.toFixed(0));
        $("#qp").html(qp.toFixed(2));
    }
});
