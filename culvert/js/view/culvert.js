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
        var xOffset = 10;
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

        var scaleX = (ocvw.w - ocvw.offsetLeft - ocvw.offsetRight)/ (xMax - xMin);
        var scaleY = (ocvw.h - ocvw.offsetTop - ocvw.offsetBottom) / (yMax - yMin);

        var x0 = 0;
        var y0 = yTop;
        var x0s = ocvw.offsetLeft + (x0 - xMin) * scaleX;
        var y0s = ocvw.h - ocvw.offsetBottom - (y0 - yMin) * scaleY;

        var x1 = dxLeft;
        var y1 = culvert.roadSag.BVCElevation;
        var x1s = ocvw.offsetLeft + (x1 - xMin) * scaleX;
        var y1s = ocvw.h - ocvw.offsetBottom - (y1 - yMin) * scaleY;

        var x2 = x1 + 0.5 * culvert.roadSag.VCLength;
        var y2 = culvert.roadSag.BVCElevation + 0.5 * culvert.roadSag.VCLength * culvert.roadSag.BVCGrade;
        var x2s = ocvw.offsetLeft + (x2 - xMin) * scaleX;
        var y2s = ocvw.h - ocvw.offsetBottom - (y2 - yMin) * scaleY;

        var x3 = dxLeft + culvert.roadSag.VCLength;
        var y3 = culvert.EVCElevation;
        var x3s = ocvw.offsetLeft + (x3 - xMin) * scaleX;
        var y3s = ocvw.h - ocvw.offsetBottom - (y3 - yMin) * scaleY;

        var x4 = xRight;
        var y4 = yTop;
        var x4s = ocvw.offsetLeft + (x4 - xMin) * scaleX;
        var y4s = ocvw.h - ocvw.offsetBottom - (y4 - yMin) * scaleY;
        
        var sVC = 'M ' + x0s + ' ' + y0s + ' L ' + x1s + ' ' + y1s + ' Q ' + x2s + ' ' + y2s + ' ' + x3s + ' ' + y3s + ' ' + ' L ' + x4s + ' ' + y4s;
        console.log(sVC);
        $('#pathVC', '#chartProfile').attr('d', sVC);

        var rxs = culvert.xSection.r * scaleX;
        var rys = culvert.xSection.r * scaleY;

        //var dxs = 0.5 * (-ocvw.offsetLeft + ocvw.w - ocvw.offsetRight) - rxs; //displacement for x to move circle to the middle

        //var xc0 = x2;
        var yc0 = culvert.barrel.inletElevation - culvert.barrel.outletElevation + culvert.xSection.r;
        var ycs = ocvw.h - ocvw.offsetBottom - (yc0 - yMin) * scaleY;

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

        drawGrid(xMin, xMax, yMin, yMax, scaleX, scaleY, 'chartProfile');
    };    
    
});
