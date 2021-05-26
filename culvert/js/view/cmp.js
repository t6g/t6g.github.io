jQuery(document).ready(function () {

    const cmp = new CMP(3, 100, 98, 200, 0.024, 0, 6, 0.2, 5);
                       
    $( "#inletElevation" ).val(cmp.inletElevation.toFixed(2));

    $( "#outletElevation" ).val(cmp.outletElevation.toFixed(2));

    $( "#distanceInOutlet" ).val(cmp.distance.toFixed(2));

    $( "#tailwaterElevation" ).val(cmp.tailwaterElevation.toFixed(2));
    
    $( "#diameter" ).val(cmp.r * 2 * 12);

    $( "#manningsN" ).val(cmp.circ.mN);
   
    $( "#inletType" ).val(cmp.inletType);

    $( "#fitType" ).val(cmp.fitType);

    $("#inletType").on('change', function () {
        cmp.inletType =  $("#inletType").val();
        cmp.KMcY = inletConsts[cmp.inletType];
        Calculate();
        updateTable();
        updateGraph();
    });

    
    $("#fitType").on('change', function () {
        cmp.fitType =  $("#fitType").val();
        cmp.fit = hy5CircConsts[cmp.fitType];
        Calculate();
        updateTable();
        updateGraph();
    });

    var xMin = 0;
    var xMax = 15;
    var yMin = 0;
    var yMax = 30;

    var xInc = niceIncrement(xMin, xMax);
    var xTickLeft = 0;//xInc * Math.floor(xMin/xInc);
    var xTickRight = 15; //xInc * Math.ceil(xMax/xInc);

    var yInc = niceIncrement(yMin, yMax);
    var yTickBottom = 0; //yInc * Math.floor(yMin/yInc);
    var yTickTop = 30; //yInc * Math.ceil(yMax/yInc);

    var scaleX = (ocvw.w - ocvw.offsetLeft - ocvw.offsetRight)/ (xTickRight - xTickLeft);
    var scaleY = (ocvw.h - ocvw.offsetTop - ocvw.offsetBottom) / (yTickTop - yTickBottom);

    function ToX(x){
        return ocvw.offsetLeft + (x - xTickLeft) * scaleX;
    }
    
    function ToY(y){
        return ocvw.h - ocvw.offsetBottom - (y - yTickBottom) * scaleY;
    }
    
    Calculate();
    updateTable();
    updateGraph();
    
    function Calculate(){
        var D = 2 * cmp.circ.r;
        var A = Math.PI * cmp.circ.r * cmp.circ.r;
        var AD05 = A * Math.sqrt(D);
        var QAD05, dc, thetac, dhc, hwo;
        var Ks = -0.5;
        var kf = oc.Ku * cmp.circ.mN * cmp.circ.mN * cmp.distance / Math.pow(cmp.circ.r / 2.0, 4/3);

        for (let i = 0; i < cmp.calc.length; i++) {
            let Q = cmp.calc[i].Q;
            cmp.circ.dn = cmp.circ.Q2Dn(Q);
            QAD05 = Q / AD05;
            dc = cmp.circ.Q2Dc(Q);
            thetac = 2.0 * Math.acos(1.0 - dc / cmp.circ.r);
            dhc = (thetac - Math.sin(thetac)) * cmp.circ.r / 4.0 / Math.sin(thetac/2.0);

            cmp.calc[i].QAD5 = QAD05;
            cmp.calc[i].Dn = cmp.circ.dn;
            cmp.calc[i].Dc = dc;
            cmp.calc[i].Hc = dc + dhc / 2.0;
            cmp.calc[i].hwi1 = cmp.circ.hc + cmp.KMcY.K * Math.pow(QAD05, cmp.KMcY.M) * D + Ks * cmp.slope * D;
            cmp.calc[i].hwi2 = cmp.KMcY.K * Math.pow(QAD05, cmp.KMcY.M) * D;
            cmp.calc[i].hwi3 = cmp.KMcY.c * QAD05 * QAD05 * D + cmp.KMcY.Y * D + Ks * cmp.slope * D;
            let p = cmp.fit.A + QAD05 * (cmp.fit.B + QAD05 * (cmp.fit.C + QAD05 * (cmp.fit.D + QAD05 * (cmp.fit.E + QAD05 * cmp.fit.F)))) + Ks * cmp.slope;
            cmp.calc[i].hwip = p * D; 
            hwo = Math.max(cmp.tailwaterElevation - cmp.outletElevation, dc/2 + cmp.r);
            hwo -= (cmp.inletElevation - cmp.outletElevation);
            let v = Q / A;
            hwo += ((1.0 + cmp.Ke + kf) * v * v / 2 / oc.g);
            cmp.calc[i].hwo = hwo;

        };
    };
    
    function updateTable() {
        var tbl = document.getElementById('calcTableBody');
        for (let i = 0; i < cmp.calc.length; i++) {
            tbl.rows[i].cells[0].innerHTML = (cmp.calc[i].Q).toFixed(0);
            tbl.rows[i].cells[1].innerHTML = (cmp.calc[i].QAD5).toFixed(2);
            tbl.rows[i].cells[2].innerHTML = (cmp.calc[i].Dn).toFixed(2);
            tbl.rows[i].cells[3].innerHTML = (cmp.calc[i].Dc).toFixed(2);
            tbl.rows[i].cells[4].innerHTML = (cmp.calc[i].Hc).toFixed(2);
            tbl.rows[i].cells[5].innerHTML = (cmp.calc[i].hwi1).toFixed(2);
            tbl.rows[i].cells[6].innerHTML = (cmp.calc[i].hwi2).toFixed(2);
            tbl.rows[i].cells[7].innerHTML = (cmp.calc[i].hwi3).toFixed(2);
            tbl.rows[i].cells[8].innerHTML = (cmp.calc[i].hwip).toFixed(2);
            tbl.rows[i].cells[9].innerHTML = (cmp.calc[i].hwo).toFixed(2);
        };
    };
    
    function updateGraph(){
        //drawing 

        var xs = ToX(cmp.calc[0].QAD5);
        var s1 = 'M ' + xs + ' ' + ToY(cmp.calc[0].hwi1);
        var s2 = 'M ' + xs + ' ' + ToY(cmp.calc[0].hwi2);
        var s3 = 'M ' + xs + ' ' + ToY(cmp.calc[0].hwi3);
        var s4 = 'M ' + xs + ' ' + ToY(cmp.calc[0].hwip);
        var s5 = 'M ' + xs + ' ' + ToY(cmp.calc[0].hwo);
        
        for (let i = 1; i < cmp.calc.length; i++) {
            var xs = ToX(cmp.calc[i].QAD5);
            s1 += ' L ' + xs + ' ' + ToY(cmp.calc[i].hwi1);
            s2 += ' L ' + xs + ' ' + ToY(cmp.calc[i].hwi2);
            s3 += ' L ' + xs + ' ' + ToY(cmp.calc[i].hwi3);
            s4 += ' L ' + xs + ' ' + ToY(cmp.calc[i].hwip);
            s5 += ' L ' + xs + ' ' + ToY(cmp.calc[i].hwo);
        }
        
        $('#pathhwi1').attr('d', s1);
        $('#pathhwi2').attr('d', s2);
        $('#pathhwi3').attr('d', s3);
        $('#pathhwip').attr('d', s4);
        $('#pathhwo').attr('d', s5);

        var xIncDraw = xInc * scaleX;

        //draw grid lines;
        var x = xTickLeft;
        var y = ocvw.h - ocvw.offsetBottom;
        xDraw = ocvw.offsetLeft;
        xGrid = '';
        var text;
        var xPos;
        var yPos;
        var idLabel;
        var i = 1;

        while (xDraw <= ocvw.w - ocvw.offsetRight){
            xGrid += 'M' + xDraw + ' ' + ocvw.offsetTop + 'L' + xDraw + ' ' + y;
            yPos = ocvw.h - 0.65 * ocvw.offsetBottom;
            idLabel = 'xTick' + i;
            $('#'+idLabel).attr('x', xDraw);
            $('#'+idLabel).attr('y', yPos);
            text = x.toString();
            if(text.length > 10) {
                text = x.toFixed(xInc.countDecimals());
            }
            $('#'+idLabel).text(text);

            xDraw += xIncDraw;
            x += xInc;
            i += 1;
        }

        for (; i < 10; i++){
            idLabel = 'xTick' + i;
            $('#'+idLabel).text(' ');
        }

        $('#pathGridY').attr('d', xGrid);

        //var yInc = niceIncrement(yMin, yMax);

        var yIncDraw = yInc * scaleY;

        let yDraw = ocvw.h - ocvw.offsetBottom;
        var yGrid = '';
        x = ocvw.w - ocvw.offsetRight;
        y = yTickBottom;
        i = 1;
        while (yDraw > ocvw.offsetTop){
            yGrid += 'M' + ocvw.offsetLeft + ' ' + yDraw + 'L' + x + ' ' + yDraw;
            xPos = 0.70*ocvw.offsetLeft;
            idLabel = 'yTick' + i;
            text = y.toString();
            if(text.length > 10) {
                text = y.toFixed(yInc.countDecimals());
            }
            $('#'+idLabel).attr("x", xPos);
            $('#'+idLabel).attr("y", yDraw);
            $('#'+idLabel).text(text);

            yDraw -= yIncDraw;
            y += yInc;
            i += 1;
        }

        for (; i < 10; i++){
            idLabel = 'yTick' + i;
            $('#'+idLabel).text(' ');
        }

        $("#pathGridX").attr("d", yGrid);

        xPos = ocvw.offsetLeft + 0.5 * (ocvw.w - ocvw.offsetLeft - ocvw.offsetRight);
        yPos = ocvw.h - 0.25 * ocvw.offsetBottom;
        $('#xLabel').attr("x", xPos);
        $('#xLabel').attr("y", yPos);        
    };
    
});
