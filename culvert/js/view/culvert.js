jQuery(document).ready(function () {
    const data = {
        "DAs":[
            {"A":2.00, "C":0.45},
            {"A":1.00, "C":0.30},
            {"A":0.00, "C":0.20},
            {"A":0.00, "C":0.20},
            {"A":0.00, "C":0.20}],

        "Seelyes":[
            {"L":100.0, "S":0.01, "C":0.30},
            {"L":150.0, "S":0.02, "C":0.20},
            {"L":0.0, "S":0.02, "C":0.20},
            {"L":0.0, "S":0.02, "C":0.20},
            {"L":0.0, "S":0.02, "C":0.20}],
        "Kirpichs":[
            {"L": 3000.0, "H": 100.0},
            {"L": 0.0, "H": 1.0},
            {"L": 0.0, "H": 1.0},
            {"L": 0.0, "H": 1.0},
            {"L": 0.0, "H": 1.0}
        ]
    };

    const culvert = new Culvert(data.DAs, data.Seelyes, data.Kirpichs);
                       
    setDATableBody();
    setDATableFoot();
    $("#DATable").numericalTable();

    setSFTableBody();
    setSFTableFoot();

    $("#SFTable").numericalTable();
        //updateRFIOutput();
        //updateTable();
        //updateGraph();

    setCFTableBody();
    setCFTableFoot();
    $("#CFTable").numericalTable();

    $('#tcInput').val(culvert.Tc.toFixed(2));

    $( "#NOAAsite" ).val(culvert.site);
    
    //sag
    
    $( "#elevBVC" ).val(culvert.roadSag.BVCElevation.toFixed(2));
    
    $( "#gradeBVC" ).val(culvert.roadSag.BVCGrade.toFixed(4));

    $( "#gradeEVC" ).val(culvert.roadSag.EVCGrade.toFixed(4));
    
    $( "#lengthVC" ).val(culvert.roadSag.VCLength.toFixed(2));

    $( "#elevSag" ).html(culvert.sagElevation.toFixed(2));
    
    $( "#elevEVC" ).html(culvert.EVCElevation.toFixed(2));
    
    //barrel
    $( "#numPipe" ).val(culvert.barrel.amount);
    
    $( "#inletElevation" ).val(culvert.barrel.inletElevation.toFixed(2));

    $( "#outletElevation" ).val(culvert.barrel.outletElevation.toFixed(2));

    $( "#distanceInOutlet" ).val(culvert.barrel.distance.toFixed(2));

    $( "#slopeBarrel" ).html(culvert.slopeBarrel.toFixed(4));
    //updateStorm();

    $( "#diameter" ).val(culvert.xSection.r * 2 * 12);

    
    updateChartProfile();
    
    function setDATableBody() {

        var tbl = document.getElementById('DATableBody');
        
        for (let j = 0; j < culvert.DAs.length; j++) {
            tbl.rows[j].cells[0].innerHTML = culvert.DAs[j].A.toFixed(2);
            tbl.rows[j].cells[1].innerHTML = culvert.DAs[j].C.toFixed(2);
            let ca = culvert.DAs[j].A * culvert.DAs[j].C;
            tbl.rows[j].cells[2].innerHTML = ca.toFixed(2);
        };
    };
    
    function setDATableFoot(){
        var sumA = 0.0;
        var sumCA = 0.0;
        for (let i = 0; i < culvert.DAs.length; i++) {
            sumA += culvert.DAs[i].A;
            sumCA += culvert.DAs[i].A * culvert.DAs[i].C;
        }

        $('#DATableFoot tr th')[0].innerHTML = sumA.toFixed(2);
        $('#DATableFoot tr th')[2].innerHTML = sumCA.toFixed(2);
        updateStorm();
    }

    $( '#DATable tr td[contenteditable="true"]').on ('change', function(event){
        var col = this.cellIndex;
        var row = this.parentElement.rowIndex;

        var tmp = parseFloat(this.innerHTML);
        if (isNaN(tmp) || (tmp < 0)) {
                showMessage($('#warningMessageDA'), "Nonpositive values are not accepted!");
                if(row > culvert.DAs.lengh + 2) {
                    return;        
                }
                if(col == 0) {
                    $( this ).html(culvert.DAs[row - 2].A.toFixed(2));
                }
                else if(col == 1) {
                    $( this ).html(culvert.DAs[row - 2].C.toFixed(2));
                }
                $(this).trigger('focus');
            }
            else {
                if(row <= culvert.DAs.length + 2) {
                    if (col == 0) {
                        culvert.DAs[row - 2].A = tmp;        
                        let ca = culvert.DAs[row - 2].A *  culvert.DAs[row - 2].C; 
                        this.nextElementSibling.nextElementSibling.innerHTML = ca.toFixed(2);
                    } else if (col ==1) {
                        culvert.DAs[row - 2].C = tmp;        
                        let ca = culvert.DAs[row - 2].A *  culvert.DAs[row - 2].C; 
                        this.nextElementSibling.innerHTML = ca.toFixed(2);
                    }

                setDATableFoot();
                }
            }
    });
    
    
    function setSFTable() {
        var tbl = document.getElementById('SFTableBody');
        var tc = 0.0;
        var distance = 0.0;

        for (let j = 0; j < culvert.Seelyes.length; j++) {
            tbl.rows[j].cells[0].innerHTML = culvert.Seelyes[j].L.toFixed(2);
            tbl.rows[j].cells[1].innerHTML = culvert.Seelyes[j].S.toFixed(3);
            tbl.rows[j].cells[2].innerHTML = culvert.Seelyes[j].C.toFixed(2);
            let t = TSeelye(culvert.Seelyes[j]);
            tbl.rows[j].cells[3].innerHTML = t.toFixed(2);
            distance += culvert.Seelyes[j].L;
            tc += t;
        };

        var tft = document.getElementById('SFTableFoot');
        tft.rows[0].cells[0].innerHTML = distance.toFixed(2);
        tft.rows[0].cells[3].innerHTML = tc.toFixed(2);
    };

    function setSFTableBody() {
        var tbl = document.getElementById('SFTableBody');

        for (let j = 0; j < culvert.Seelyes.length; j++) {
            tbl.rows[j].cells[0].innerHTML = culvert.Seelyes[j].L.toFixed(2);
            tbl.rows[j].cells[1].innerHTML = culvert.Seelyes[j].S.toFixed(3);
            tbl.rows[j].cells[2].innerHTML = culvert.Seelyes[j].C.toFixed(2);
            let t = TSeelye(culvert.Seelyes[j]);
            tbl.rows[j].cells[3].innerHTML = t.toFixed(2);
        };
    }
    
    function setSFTableFoot() {
        var tc = 0.0;
        var distance = 0.0;
        for (let j = 0; j < culvert.Seelyes.length; j++) {
            let t = TSeelye(culvert.Seelyes[j]);
            distance += culvert.Seelyes[j].L;
            tc += t;
        };

        var tft = document.getElementById('SFTableFoot');
        tft.rows[0].cells[0].innerHTML = distance.toFixed(2);
        tft.rows[0].cells[3].innerHTML = tc.toFixed(2);
        
        $('#tcInput').val(culvert.Tc.toFixed(2));
        updateStorm();
    };

    
    
    $( '#SFTable tr td[contenteditable="true"]').on ('change', function(event){
        var col = this.cellIndex;
        var row = this.parentElement.rowIndex;
        var rowTop = this.parentElement.parentElement.children[0].rowIndex;

        var tmp = parseFloat(this.innerHTML);
        if (isNaN(tmp) || (tmp < 0)) {
            showMessage($('#warningMessageSF'), "Nonpositive values are not accepted!");
            if(row > culvert.Seelyes.lengh + rowTop) {
                return;        
            }
            if(col == 0) {
                $( this ).html(culvert.Seelyes[row - rowTop].L.toFixed(2));
            }
            else if(col == 1) {
                $( this ).html(culvert.Seelyes[row - rowTop].S.toFixed(2));
            } else if(col == 2) {
                $( this ).html(culvert.Seelyes[row - rowTop].C.toFixed(2));
            }
            $(this).trigger('focus');
        }
        else {
            if(row <= culvert.Seelyes.length + rowTop) {
                if (col == 0) {
                    culvert.Seelyes[row - rowTop].L = tmp;        
                    let t = TSeelye(culvert.Seelyes[row - rowTop]);
                    $(this).next().next().next().html(t.toFixed(2));
                } else if (col ==1) {
                    culvert.Seelyes[row - rowTop].S = tmp;        
                    let t = TSeelye(culvert.Seelyes[row - rowTop]);
                    $(this).next().next().html(t.toFixed(2));
                } else if (col == 2) {
                    culvert.Seelyes[row - rowTop].C = tmp;        
                    let t = TSeelye(culvert.Seelyes[row - rowTop]);
                    $(this).next().html(t.toFixed(2));
                }

                setSFTableFoot();
            }
        }
    });
    
    
    
    function setCFTableBody() {

        var tbl = document.getElementById('CFTableBody');

        for (let j = 0; j < culvert.Kirpichs.length; j++) {
            tbl.rows[j].cells[0].innerHTML = culvert.Kirpichs[j].L.toFixed(2);
            tbl.rows[j].cells[1].innerHTML = culvert.Kirpichs[j].H.toFixed(2);
            let t = TKirpich(culvert.Kirpichs[j]);
            tbl.rows[j].cells[2].innerHTML = t.toFixed(2);
        };

    };

    function setCFTableFoot() {

        var tc = 0.0;
        var tl = 0.0;
        var th = 0.0;

        for (let j = 0; j < culvert.Kirpichs.length; j++) {
            tl += culvert.Kirpichs[j].L;
            th += culvert.Kirpichs[j].H;
            tc += TKirpich(culvert.Kirpichs[j]);
        };

        var tft = document.getElementById('CFTableFoot');
        tft.rows[0].cells[0].innerHTML = tl.toFixed(2);
        tft.rows[0].cells[1].innerHTML = th.toFixed(2);
        tft.rows[0].cells[2].innerHTML = tc.toFixed(2);

        $('#tcInput').val(culvert.Tc.toFixed(2));
        updateStorm();
    };

    
    $( '#CFTable tr td[contenteditable="true"]').on ('change', function(event){
        var col = this.cellIndex;
        var row = this.parentElement.rowIndex;
        var rowTop = this.parentElement.parentElement.children[0].rowIndex;

        var tmp = parseFloat(this.innerHTML);
        if (isNaN(tmp) || (tmp < 0)) {
            showMessage($('#warningMessageCF'), "Nonpositive values are not accepted!");
            if(row > culvert.Seelyes.lengh + rowTop) {
                return;        
            }
            if(col == 0) {
                $( this ).html(culvert.Kirpichs[row - rowTop].L.toFixed(2));
            }
            else if(col == 1) {
                $( this ).html(culvert.Kirpichs[row - rowTop].H.toFixed(2));
            }
            $(this).trigger('focus');
        }
        else {
            if(row <= culvert.Kirpichs.length + rowTop) {
                if (col == 0) {
                    culvert.Kirpichs[row - rowTop].L = tmp;        
                    let t = TKirpich(culvert.Kirpichs[row - rowTop]);
                    $(this).next().next().html(t.toFixed(2));
                } else if (col ==1) {
                    culvert.Kirpichs[row - rowTop].H = tmp;        
                    let t = TKirpich(culvert.Kirpichs[row - rowTop]);
                    $(this).next().html(t.toFixed(2));
                }

                setCFTableFoot();
            }
        }
    });
    
    $("#tcInput").on('change', function(){
        updateStorm();
    });
    
    $("#NOAAsite").on('change', function () {
        culvert.site =  parseInt($("#NOAAsite").val());
        updateStorm();
    });

    $( "#elevBVC" ).on('change', function () {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            alert('Input a number for BVC elevation');
            return;
        }
        culvert.roadSag.BVCElevation = tmp;
        updateChartProfile();
    });
    
    $( "#gradeBVC" ).on('change', function () {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            alert('Input a number for BVC grade');
            return;
        }
        if (tmp >= 0) {
            alert('Input a negative number for BVC grade');
            return;
        }

        culvert.roadSag.BVCGrade = tmp;
        updateChartProfile();
    });
    
    $( "#gradeEVC" ).on('change', function () {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            alert('Input a number for EVC grade');
            return;
        }
        if (tmp <= 0) {
            alert('Input a positive number for BVC grade');
            return;
        }

        culvert.roadSag.EVCGrade = tmp;
        updateChartProfile();
    });
    
    $( "#lengthVC" ).on('change', function () {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            alert('Input a number for VC length');
            return;
        }
        if (tmp <= 0) {
            alert('Input a positive number for VC length');
            return;
        }

        culvert.roadSag.VCLength = tmp;
        updateChartProfile();
    });
    
    /*
    
    //barrel
    $( "#numPipe" ).val(culvert.barrel.amount);
    
    $( "#inletElevation" ).val(culvert.barrel.inletElevation.toFixed(2));

    $( "#outletElevation" ).val(culvert.barrel.outletElevation.toFixed(2));

    $( "#distanceInOutlet" ).val(culvert.barrel.distance.toFixed(2));

    $( "#slopeBarrel" ).html(culvert.slopeBarrel.toFixed(4));
    //updateStorm();

    $( "#diameter" ).val(culvert.xSection.r * 2 * 12);

    */
    
    
    function updateStorm(){
        var tc = parseFloat($("#tcInput").val());
        var ca = culvert.ca;
        var tbl = document.getElementById('qTableBody');

        var rfi10 = rf.i(culvert.site, 3, tc); //10-year
        var q10 = ca * rfi10;
        tbl.rows[0].cells[1].innerHTML = rfi10.toFixed(2);
        tbl.rows[0].cells[2].innerHTML = q10.toFixed(2);

        var rfi25 = rf.i(culvert.site, 4, tc); //25-year
        var q25 = 1.1 * ca * rfi25;
        tbl.rows[1].cells[1].innerHTML = rfi25.toFixed(2);
        tbl.rows[1].cells[2].innerHTML = q25.toFixed(2);
        
        var rfi50 = rf.i(culvert.site, 5, tc); //50-year
        var q50 = 1.2 * ca * rfi50;
        tbl.rows[2].cells[1].innerHTML = rfi50.toFixed(2);
        tbl.rows[2].cells[2].innerHTML = q50.toFixed(2);

        var rfi100 = rf.i(culvert.site, 6, tc); //100-year
        var q100 = 1.25 * ca * rfi100;
        tbl.rows[3].cells[1].innerHTML = rfi100.toFixed(2);
        tbl.rows[3].cells[2].innerHTML = q100.toFixed(2);
    };

    function updateChartProfile(){
        var xOffset = 0;
        var elevEVC = culvert.EVCElevation;
        var dxLeft, dxRight, xRight, yTop;
        
        if(Math.abs(culvert.roadSag.BVCGrade) > culvert.roadSag.EVCGrade) {
            dxLeft = xOffset;
            dxRight = (-xOffset * culvert.roadSag.BVCGrade + culvert.roadSag.BVCElevation - elevEVC)/culvert.roadSag.EVCGrade;
            yTop = culvert.roadSag.BVCElevation - xOffset * culvert.roadSag.BVCGrade;
        } else {
            dxRight = xOffset;
            dxLeft = -(xOffset * culvert.roadSag.EVCGrade + elevEVC - culvert.roadSag.BVCElevation)/culvert.roadSag.BVCGrade;
            yTop = elevEVC + xOffset * culvert.roadSag.EVCGrade;
        };

        xRight = dxLeft + culvert.roadSag.VCLength + dxRight;
        
        
        //drawing 
        var xMin = 0;
        var xMax = xRight;
        var yMin = culvert.barrel.outletElevation;
        var yMax = yTop;

        var xInc = niceIncrement(xMin, xMax);
        var xTickLeft = xInc * Math.floor(xMin/xInc);
        var xTickRight = xInc * Math.ceil(xMax/xInc);

        var yInc = niceIncrement(yMin, yMax);
        var yTickBottom = yInc * Math.floor(yMin/yInc);
        var yTickTop = yInc * Math.ceil(yMax/yInc);
        
        var scaleX = (ocvw.w - ocvw.offsetLeft - ocvw.offsetRight)/ (xTickRight - xTickLeft);
        var scaleY = (ocvw.h - ocvw.offsetTop - ocvw.offsetBottom) / (yTickTop - yTickBottom);

        var x0 = 0;
        var y0 = yTop;
        var x0s = ocvw.offsetLeft + (x0 - xTickLeft) * scaleX;
        var y0s = ocvw.h - ocvw.offsetBottom - (y0 - yTickBottom) * scaleY;

        var x1 = dxLeft;
        var y1 = culvert.roadSag.BVCElevation;
        var x1s = ocvw.offsetLeft + (x1 - xTickLeft) * scaleX;
        var y1s = ocvw.h - ocvw.offsetBottom - (y1 - yTickBottom) * scaleY;

        var x2 = x1 + 0.5 * culvert.roadSag.VCLength;
        var y2 = culvert.roadSag.BVCElevation + 0.5 * culvert.roadSag.VCLength * culvert.roadSag.BVCGrade;
        var x2s = ocvw.offsetLeft + (x2 - xTickLeft) * scaleX;
        var y2s = ocvw.h - ocvw.offsetBottom - (y2 - yTickBottom) * scaleY;

        var x3 = dxLeft + culvert.roadSag.VCLength;
        var y3 = culvert.EVCElevation;
        var x3s = ocvw.offsetLeft + (x3 - xTickLeft) * scaleX;
        var y3s = ocvw.h - ocvw.offsetBottom - (y3 - yTickBottom) * scaleY;

        var x4 = xRight;
        var y4 = yTop;
        var x4s = ocvw.offsetLeft + (x4 - xTickLeft) * scaleX;
        var y4s = ocvw.h - ocvw.offsetBottom - (y4 - yTickBottom) * scaleY;
        
        var sVC = 'M ' + x0s + ' ' + y0s + ' L ' + x1s + ' ' + y1s + ' Q ' + x2s + ' ' + y2s + ' ' + x3s + ' ' + y3s + ' ' + ' L ' + x4s + ' ' + y4s;
        console.log(sVC);
        $('#pathVC', '#chartProfile').attr('d', sVC);

        var rxs = culvert.xSection.r * scaleX;
        var rys = culvert.xSection.r * scaleY;

        //var dxs = 0.5 * (-ocvw.offsetLeft + ocvw.w - ocvw.offsetRight) - rxs; //displacement for x to move circle to the middle

        //var xc0 = x2;
        var yc0 = culvert.barrel.inletElevation - culvert.barrel.outletElevation + culvert.xSection.r;
        var ycs = ocvw.h - ocvw.offsetBottom - (yc0 - yTickBottom) * scaleY;

        var sRCP = 'M' + x2s + ' ' + y2s + ' a ' + rxs + ' ' + rys + ' 0 1 0 ' + 2.0* rxs + ' 0 '
                                         + ' a ' + rxs + ' ' + rys + ' 0 1 0 -' + 2.0* rxs + ' 0 '
        $('#pathCulvert').attr('d', sRCP);

        //var xnl = 0.5 * para.tw - 0.5 * para.tw * Math.sqrt(para.dn / para.cd);
        //var xnr = 0.5 * para.tw + 0.5 * para.tw * Math.sqrt(para.dn / para.cd);;
        //var xnls = oc.offsetLeft + (xnl - xMin) * scaleX;
        //var xnrs = oc.offsetLeft + (xnr - xMin) * scaleX;
        //var yns = ocvw.h - ocvw.offsetBottom -(para.dn - yMin) * scaleY;


        //var xcl = 0.5 * para.tw - 0.5 * para.tw * Math.sqrt(para.dc / para.cd);
        //var xcr = 0.5 * para.tw + 0.5 * para.tw * Math.sqrt(para.dc / para.cd);;
        //var xcls = oc.offsetLeft + (xcl - xMin) * scaleX;
        //var xcrs = oc.offsetLeft + (xcr - xMin) * scaleX;
        //var ycs = ocvw.h - ocvw.offsetBottom - (para.dc - yMin) * scaleY;
        var s10 = 'M' + x2s + ' ' + y2s + '' + 'V10';
        $('#path10', '#chartProfile').attr('d', 'M' + x2s + ' ' + y2s + 'V10');

        //$('#pathCrit').attr('d', 'M' + xcls + ' ' + ycs + 'L' + xcrs + ' ' + ycs);

        //drawGrid(xMin, xMax, yMin, yMax, scaleX, scaleY, 'chartProfile');
        
        var xIncDraw = xInc * scaleX;

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
            //document.getElementById(idLabel).childNodes[0].textContent = text;

            xDraw += xIncDraw;
            x += xInc;
            i += 1;
        }

        for (; i < 10; i++){
            idLabel = 'xTick' + i;
            $('#'+idLabel, '#chartProfile').text(' ');
            //document.getElementById(idLabel).childNodes[0].textContent = ' ';
        }

        $('#pathGridY', '#chartProfile').attr('d', xGrid);

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
            $('#'+idLabel, '#chartProfile').attr("x", xPos);
            $('#'+idLabel, '#chartProfile').attr("y", yDraw);
            //document.getElementById(idLabel).childNodes[0].textContent = text;
            $('#'+idLabel, '#chartProfile').text(text);

            yDraw -= yIncDraw;
            y += yInc;
            i += 1;
        }

        for (; i < 10; i++){
            idLabel = 'yTick' + i;
            //document.getElementById(idLabel).childNodes[0].textContent = ' ';
            $('#'+idLabel, '#chartProfile').text(' ');
        }

        $("#pathGridX", '#chartProfile').attr("d", yGrid);

        xPos = ocvw.offsetLeft + 0.5 * (ocvw.w - ocvw.offsetLeft - ocvw.offsetRight);
        yPos = ocvw.h - 0.25 * ocvw.offsetBottom;
        $('#xLabel','#chartProfile').attr("x", xPos);
        $('#xLabel','#chartProfile').attr("y", yPos);


        };    
    
});
