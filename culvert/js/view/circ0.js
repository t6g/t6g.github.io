jQuery(document).ready(function () {
    $("#mynav").load("nav.html");
            
    const culvert = new CircularCulvert(0, 36, 0.012, 1, 191.37, 189.85, 68.67, 3.0, 1, 195.92);
    
    const strRCPOptions = "<option value='0'>Square edge with headwall</option>"
                        + "<option value='1'>Grooved edge with headwall</option>"
                        + "<option value='2'>Grooved edge projecting</option>"
                        + "<option value='3'>Beveled ring, 45° bevels</option>"
                        + "<option value='4'>Beveled ring, 33.7° bevels</option>";
    const strCMPOptions = "<option value='0'>Headwall</option>"
                        + "<option value='1'>Mitered to slope</option>"
                        + "<option value='2'>Projecting</option>"
                        + "<option value='3'>Beveled ring, 45° bevels</option>"
                        + "<option value='4'>Beveled ring, 33.7° bevels</option>";
    
    var its = [2, 10, 100];  // storm intervals, 2, 10, 100-year
    var Qts = [10, 20, 30];  //Q total for three intervals
    var tws = [1, 1.5, 2];   //tail water depths
    var hws = [0, 0, 0];     //headwater results

    const crossing = {
        culvert, Qts, tws
    };
    
    $("#material").val(culvert.material);
        
    if(culvert.material === 0) {//RCP
        $("#inletType").html(strRCPOptions);
    } else if(culvert.material === 1) {//CMP
        $("#inletType").html(strCMPOptions);
    }
    
    $("#material").val(culvert.material);
    
    $("#diameter").val(culvert.r * 2 * 12);

    $("#manningsN").val(culvert.mN);

    $("#inletType").val(culvert.inletType);
   
    $("#ke").html(culvert.Ke.toFixed(1));

    $("#inletElevation").val(culvert.inletElevation.toFixed(2));

    $("#outletElevation").val(culvert.outletElevation.toFixed(2));

    $("#distanceInOutlet").val(culvert.distance.toFixed(2));

    $("#slopeBarrel").html(culvert.cs.toFixed(4));
    
    $("#tailwaterDepth").val(culvert.tailwaterDepth.toFixed(2));

    $("#sagElevation").val(culvert.sagElevation.toFixed(2));

    $("#numBarrel").val(culvert.numBarrel);
    
    $("#calcTable1").numericalTable();

    var xMin = 0;
    var xMax = 10;
    var yMin = 0;
    var yMax = 8 * culvert.r;

    var xInc = niceIncrement(xMin, xMax);
    var xTickLeft = xInc * Math.floor(xMin/xInc);
    var xTickRight = xInc * Math.ceil(xMax/xInc);

    var yInc = niceIncrement(yMin, yMax);
    var yTickBottom = yInc * Math.floor(yMin/yInc);
    var yTickTop = yInc * Math.ceil(yMax/yInc);

    var scaleX = (ocvw.w - ocvw.offsetLeft - ocvw.offsetRight)/ (xTickRight - xTickLeft);
    var scaleY = (ocvw.h - ocvw.offsetTop - ocvw.offsetBottom) / (yTickTop - yTickBottom);

    updateTable1();
    updateChartProfile();
    
    function ToX(x){
        return ocvw.offsetLeft + (x - xTickLeft) * scaleX;
    }
    
    function ToY(y){
        return ocvw.h - ocvw.offsetBottom - (y - yTickBottom) * scaleY;
    }

    $("#upload").on("click", function(){
        $("#selectFile").trigger("click");
    });

    $("#selectFile").change(function(e){
        var reader = new FileReader();
        reader.onload = function(e){
            //console.log(e.target.result);
            try {
                var obj = JSON.parse(e.target.result);

                //if(obj) {
                //    Object.assign(glance, obj);
                //    setUI();
                //};
            } catch(ex) {
                alert(ex.name + ':' + ex.message);
            };
        };
        reader.readAsText(e.target.files[0]);
    });
    
    
    $("#download").on("click", function(){
        download('c.json', JSON.stringify(crossing));
    });
    
    $("#material").on('change', function () {
        culvert.material =  $("#material").val();
        
        if(culvert.material == 0){
            $("#inletType").html(strRCPOptions);
            if(culvert.inletType < 3) { // if beveled ring, keep, otherwise
                //default inlet type grooved edge with headwall
                culvert.inletType = 1;
            }
            $("#inletType").val(culvert.inletType);
            $("#ke").html(culvert.Ke.toFixed(1));

            //default manning's N 0.012
            culvert.mN = 0.012;
            $("#manningsN").val(culvert.mN);
        } else {
            $("#inletType").html(strCMPOptions);

            if(culvert.inletType < 3) { // if beveled ring, keep, otherwise
                //default inlet type Headwall
                culvert.inletType = 0;
            }
            $("#inletType").val(culvert.inletType);
            $("#ke").html(culvert.Ke.toFixed(1));

            //default manning's N 0.012
            culvert.mN = 0.024;
            $("#manningsN").val(culvert.mN);
        }

        updateTable1();
        updateChartProfile();
    });
    
    $("#diameter").on("change", function(){
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessage'), "Input a number for diameter!");
            $("#diameter").val(culvert.r * 2 * 12);
            $(this).trigger('focus');
        } else if (tmp <= 0) {
            showMessage($('#warningMessage'), "Input a positive number for diameter!");
            $("#diameter").val(culvert.r * 2 * 12);
            $(this).trigger('focus');
        }
        else {
            culvert.r = tmp / 24.0;
            Performance();
            updateTable1();
            updateChartProfile();
        };
    });
    
    $("#manningsN").on("change", function(){
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessage'), "Input a number for Manning's N!");
            $("#manningsN").val(culvert.mN);
            $(this).trigger('focus');
        } else if (tmp <= 0) {
            showMessage($('#warningMessage'), "Input a positive number for Manning's N!");
            $("#manningsN").val(culvert.mN);
            $(this).trigger('focus');
        }
        else {
            culvert.mN = tmp;
            Performance();
            updateTable1();
            updateChartProfile();
        };
    });
    
    $("#inletType").on('change', function () {
        culvert.inletType =  $("#inletType").val();
        $("#ke").html(culvert.Ke.toFixed(1));
        Performance();
        updateTable1();
        updateChartProfile();
    });
    
    $("#inletElevation").on("change", function(){
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessage'), "Input a number for inlet elevation!");
            $("#inletElevation").val(culvert.inletElevation);
            $(this).trigger('focus');
        } else {
            culvert.inletElevation = tmp;
            culvert.cs = (culvert.inletElevation - culvert.outletElevation)/culvert.distance;
            $("#slopeBarrel").html(culvert.cs.toFixed(4));
            Performance();
            updateTable1();
            updateChartProfile();
        };
    });
    
    $("#outletElevation").on("change", function(){
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessage'), "Input a number for outlet elevation!");
            $("#outletElevation").val(culvert.outletElevation);
            $(this).trigger('focus');
        } else {
            culvert.outletElevation = tmp;
            culvert.cs = (culvert.inletElevation - culvert.outletElevation)/culvert.distance;
            $("#slopeBarrel").html(culvert.cs.toFixed(4));
            Performance();
            updateTable1();
            updateChartProfile();
        };
    });
    
    $("#distanceInOutlet").on("change", function(){
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessage'), "Input a number for outlet distance!");
            $("#outletElevation").val(culvert.distance);
            $(this).trigger('focus');
        } 
        else if (tmp <= 0){
            showMessage($('#warningMessage'), "Input a positive number for outlet distance!");
            $("#outletElevation").val(culvert.distance);
            $(this).trigger('focus');

        } else {
            culvert.distance = tmp;
            culvert.cs = (culvert.inletElevation - culvert.outletElevation)/culvert.distance;
            $("#slopeBarrel").html(culvert.cs.toFixed(4));
            Performance();
            updateTable1();
            updateChartProfile();
        };
    });

    $("#numBarrel").on("change", function(){
        var tmp = parseInt(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessage'), "Input a number for number of barrels!");
            $("#numBarrel").val(culvert.numBarrel);
            $(this).trigger('focus');
        } else {
            culvert.numBarrel = tmp;
            Performance();
            updateTable1();
            updateChartProfile();
        };
    });

    $( '#calcTableBody1 tr td[contenteditable="true"]').on ('change', function(event){
        var row = this.parentElement.rowIndex;
        var col = this.cellIndex;

        var tmp = parseFloat(this.innerHTML);

        if (isNaN(tmp) || (tmp < 0)) {
            if(col == 1) { //Q
                showMessage($('#warningMessage'), "Input a number for flow rate!");
                $( this ).html(Qts[row - 2].toFixed(2));
            } else if (col == 2) { // tailwater
                showMessage($('#warningMessage'), "Input a number for tailwater depth!");
                $( this ).html(tws[row - 2].toFixed(2));
            }
            $(this).trigger('focus');
        }
        else if (tmp <= 0) {
                if(col == 1) { //Q
                    showMessage($('#warningMessage'), "Input a positive flow rate!");
                    $( this ).html(Qts[row - 2].toFixed(2));
                } else if (col == 2){
                    showMessage($('#warningMessage'), "Input a positive tailwater depth!");
                    $( this ).html(tws[row - 2].toFixed(2));
                };
        } else {
            if (col == 1) {
                Qts[row - 2] = tmp;
            } else if (col == 2){
                tws[row - 2] = tmp;
            }
            updateTable1();
            updateChartProfile();
        };
    });


    function updateTable1() {

        var tbl = document.getElementById('calcTableBody1');
        
        for (let i = 0; i < tbl.rows.length; i++) {

            let Qb = Qts[i]/culvert.numBarrel;
            
            let hwi = culvert.hwi(Qb);
            let hwo = culvert.hwo(Qb, tws[i]);
            let elev = 0;

            hws[i] = hwi > hwo ? hwi : hwo; 
            elev = hws[i] + culvert.inletElevation; 
            
            tbl.rows[i].cells[0].innerHTML = its[i];
            tbl.rows[i].cells[1].innerHTML = Qts[i].toFixed(2);
            tbl.rows[i].cells[2].innerHTML = tws[i].toFixed(2);
            tbl.rows[i].cells[3].innerHTML = Qb.toFixed(2);
            tbl.rows[i].cells[4].innerHTML = culvert.Q2Dn(Qb).toFixed(2);
            tbl.rows[i].cells[5].innerHTML = culvert.Q2Dc(Qb).toFixed(2);
            tbl.rows[i].cells[6].innerHTML = hwi.toFixed(2);
            tbl.rows[i].cells[7].innerHTML = hwo.toFixed(2);
            tbl.rows[i].cells[8].innerHTML = elev.toFixed(2);
            tbl.rows[i].cells[9].innerHTML = culvert.vo(Qb, tws[i]).toFixed(2);
        };
    };

    function updateChartProfile(){
        var xOffset = 20;
        //var yTop = getyTop();
        //drawing 
        //var xMin = 0;
        var xMaximum = xOffset + culvert.distance + xOffset;
        //var yMinium = culvert.outletElevation;
        //var yMaximum = yMinium + yMax;

        var xIncLocal = niceIncrement(xMin, xMaximum);
        var xTickLeftLocal = xIncLocal * Math.floor(xMin/xIncLocal);
        var xTickRightLocal = xIncLocal * Math.ceil(xMaximum/xIncLocal);

        //var yInc = niceIncrement(yMin, yMax);
        //var yTickBottom = yInc * Math.floor(yMin/yInc);
        //var yTickTop = yInc * Math.ceil(yMax/yInc);
        var yTickBottomLocal = culvert.outletElevation;
        
        var scaleXLocal = (ocvw.w - ocvw.offsetLeft - ocvw.offsetRight)/ (xTickRightLocal - xTickLeftLocal);
        //var scaleY = (ocvw.h - ocvw.offsetTop - ocvw.offsetBottom) / (yTickTop - yTickBottom);

        // draw barrel / pipe
        //left bottom of the barrel
        var x0 = xOffset;
        var y0 = culvert.inletElevation;
        var x0s = ocvw.offsetLeft + (x0 - xTickLeftLocal) * scaleXLocal;
        var y0s = ocvw.h - ocvw.offsetBottom - (y0 - yTickBottomLocal) * scaleY;

        var x1 = x0 + culvert.distance;
        var y1 = culvert.outletElevation;
        var x1s = ocvw.offsetLeft + (x1 - xTickLeftLocal) * scaleXLocal;
        var y1s = ocvw.h - ocvw.offsetBottom - (y1 - yTickBottomLocal) * scaleY;

        var y2 = y1 + 2 * culvert.r;
        var y2s = ocvw.h - ocvw.offsetBottom - (y2 - yTickBottomLocal) * scaleY;
        
        var y3 = y0 + 2 * culvert.r;
        var y3s = ocvw.h - ocvw.offsetBottom - (y3 - yTickBottomLocal) * scaleY;

        var sPipe = 'M ' + x0s + ' ' + y0s + ' L ' + x1s + ' ' + y1s + ' L ' + x1s + ' ' + y2s + ' L ' + x0s + ' ' + y3s + ' ' + ' Z ';

        $('#pathPipe', '#chartProfile').attr('d', sPipe);
        
        //draw embankment
        var x4 = x0 + 3 * (culvert.sagElevation - y3); //assuming 3:1 slope
        var x5 = x1 - 3 * (culvert.sagElevation - y2);
        var x4s = ocvw.offsetLeft + (x4 - xTickLeftLocal) * scaleXLocal;
        var x5s = ocvw.offsetLeft + (x5 - xTickLeftLocal) * scaleXLocal;

        var y4 = culvert.sagElevation;
        var y4s = ocvw.h - ocvw.offsetBottom - (y4 - yTickBottomLocal) * scaleY;
        
        var sEmbankment = 'M ' + x0s + ' ' + y3s + ' L ' + x4s + ' ' + y4s + ' L ' + x5s + ' ' + y4s + ' L ' + x1s + ' ' + y2s;

        $('#pathEmbankment', '#chartProfile').attr('d', sEmbankment);
        
        updateProfileLeft(xOffset, scaleXLocal);
        updateProfileRight(xOffset, scaleXLocal);
        
        var xIncDraw = xIncLocal * scaleXLocal;

        //draw grid lines;
        x = xTickLeft;
        y = ocvw.h - ocvw.offsetBottom;
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
            $('#'+idLabel, '#chartProfile').attr('x', xDraw);
            $('#'+idLabel, '#chartProfile').attr('y', yPos);
            text = x.toString();
            if(text.length > 10) {
                text = x.toFixed(xInc.countDecimals());
            }
            $('#'+idLabel, '#chartProfile').text(text);

            xDraw += xIncDraw;
            x += xIncLocal;
            i += 1;
        }

        for (; i < 10; i++){
            idLabel = 'xTick' + i;
            $('#'+idLabel, '#chartProfile').text(' ');
        }

        $('#pathGridY', '#chartProfile').attr('d', xGrid);

        //var yInc = niceIncrement(yMin, yMax);

        var yIncDraw = yInc * scaleY;
        

        let yDraw = ocvw.h - ocvw.offsetBottom;
        var yGrid = '';
        var yGridp = '';
        x = ocvw.w - ocvw.offsetRight;
        var xp = ocvw.offsetLeft + 10;
        y = yTickBottomLocal;
        var yp = Math.ceil(yTickBottomLocal);
        var dyDraw = (yp - yTickBottomLocal) * scaleY;
        
        i = 1;
        while (yDraw > ocvw.offsetTop){
            yGrid += 'M ' + ocvw.offsetLeft + ' ' + yDraw + ' L ' + x + ' ' + yDraw;
            yGridp += 'M' + ocvw.offsetLeft + ' ' + (yDraw - dyDraw) + ' L ' + xp + ' ' + (yDraw - dyDraw);
            xPos = 0.70*ocvw.offsetLeft;
            idLabel = 'yTick' + i;
            text = yp.toString();
            if(text.length > 10) {
                text = yp.toFixed(yInc.countDecimals());
            }
            $('#'+idLabel, '#chartProfile').attr("x", xPos);
            $('#'+idLabel, '#chartProfile').attr("y", yDraw - dyDraw);
            //document.getElementById(idLabel).childNodes[0].textContent = text;
            $('#'+idLabel, '#chartProfile').text(text);

            yDraw -= yIncDraw;
            y += yInc;
            yp += yInc;
            i += 1;
        }

        for (; i < 10; i++){
            idLabel = 'yTick' + i;
            //document.getElementById(idLabel).childNodes[0].textContent = ' ';
            $('#'+idLabel, '#chartProfile').text(' ');
        }

        $("#pathGridX", '#chartProfile').attr("d", yGrid);
        $("#pathGridXP", '#chartProfile').attr("d", yGridp);

        xPos = ocvw.offsetLeft + 0.5 * (ocvw.w - ocvw.offsetLeft - ocvw.offsetRight);
        yPos = ocvw.h - 0.25 * ocvw.offsetBottom;
        $('#xLabel','#chartProfile').attr("x", xPos);
        $('#xLabel','#chartProfile').attr("y", yPos);
    };    
    
    function updateProfileLeft(xOffset, scaleXLocal){
        var yshw2 = ocvw.h - ocvw.offsetBottom - (hws[0] + culvert.rise)* scaleY;
        var yshw10 = ocvw.h - ocvw.offsetBottom - (hws[1] + culvert.rise)* scaleY;
        var yshw100 = ocvw.h - ocvw.offsetBottom - (hws[2] + culvert.rise)* scaleY;
        var dxhw = ocvw.offsetLeft + xOffset * scaleXLocal;
        var spath2 = 'M ' + ocvw.offsetLeft + ' ' + yshw2 + ' H ' + dxhw;
        var spath10 = 'M ' + ocvw.offsetLeft + ' ' + yshw10 + ' H ' + dxhw;
        var spath100 = 'M ' + ocvw.offsetLeft + ' ' + yshw100 + ' H ' + dxhw;
        
        $('#path2', '#chartProfile').attr('d', spath2);
        $('#path10', '#chartProfile').attr('d', spath10);
        $('#path100', '#chartProfile').attr('d', spath100);
    };

    function updateProfileRight(xOffset, scaleXLocal){
        var yshw2 = ocvw.h - ocvw.offsetBottom - tws[0] * scaleY;
        var yshw10 = ocvw.h - ocvw.offsetBottom - tws[1] * scaleY;
        var yshw100 = ocvw.h - ocvw.offsetBottom - tws[2] * scaleY;
        
        var xRight = ocvw.w - ocvw.offsetRight;
        
        var dxhw = ocvw.w - ocvw.offsetLeft - (xOffset + culvert.distance) * scaleXLocal - ocvw.offsetRight;
        var spath2 = 'M ' + (xRight - dxhw) + ' ' + yshw2 + ' H ' + xRight;
        var spath10 = 'M ' + (xRight - dxhw) + ' ' + yshw10 + ' H ' + xRight;
        var spath100 = 'M ' + (xRight - dxhw) + ' ' + yshw100 + ' H ' + xRight;
        
        $('#path2Right', '#chartProfile').attr('d', spath2);
        $('#path10Right', '#chartProfile').attr('d', spath10);
        $('#path100Right', '#chartProfile').attr('d', spath100);
    };
});
