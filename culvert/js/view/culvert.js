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

    
    updateChartXSection();
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
            showMessage($('#warningMessageVC'), "Invalid number is not accepted for BVC elevation");
            $( "#elevBVC" ).val(culvert.roadSag.BVCElevation.toFixed(2));
            $(this).trigger('focus');
        } else if (tmp < 0) {
            showMessage($('#warningMessageVC'), "Negative value is not accepted for BVC elevation");
            $( "#elevBVC" ).val(culvert.roadSag.BVCElevation.toFixed(2));
            $(this).trigger('focus');
        } else {
            culvert.roadSag.BVCElevation = tmp;
            updateChartXSection();
            updateChartProfile();
        }
    });
    
    $( "#gradeBVC" ).on('change', function () {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessageVC'), "Invalid value is not accepted for BVC grade!");
            $( "#gradeBVC" ).val(culvert.roadSag.BVCGrade.toFixed(4));
            $(this).trigger('focus');
        } else if (tmp >= 0) {
            showMessage($('#warningMessageVC'), "Positive value is not accepted for BVC grade!");
            $( "#gradeBVC" ).val(culvert.roadSag.BVCGrade.toFixed(4));
            $(this).trigger('focus');
        } else {
            culvert.roadSag.BVCGrade = tmp;
            updateChartXSection();
            updateChartProfile();
        }
    });
    
    $( "#gradeEVC" ).on('change', function () {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessageVC'), "Invalid value is not accepted for EVC grade!");
            $( "#gradeEVC" ).val(culvert.roadSag.EVCGrade.toFixed(4));
            $(this).trigger('focus');
        } else if (tmp <= 0) {
            showMessage($('#warningMessageVC'), "Nonpositive value is not accepted for EVC grade!");
            $( "#gradeEVC" ).val(culvert.roadSag.EVCGrade.toFixed(4));
            $(this).trigger('focus');
        } else {
            culvert.roadSag.EVCGrade = tmp;
            updateChartXSection();
            updateChartProfile();
        }
    });
    
    $( "#lengthVC" ).on('change', function () {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessageVC'), "Invalid value is not accepted for VC length!");
            $( "#lengthVC" ).val(culvert.roadSag.VCLength.toFixed(2));
            $(this).trigger('focus');
        } else if (tmp <= 0) {
            showMessage($('#warningMessageVC'), "Nonpositive values are not accepted for VC length!");
            $( "#lengthVC" ).val(culvert.roadSag.VCLength.toFixed(2));
            $(this).trigger('focus');
        } else {
            culvert.roadSag.VCLength = tmp;
            updateChartXSection();
            updateChartProfile();
        }
    });
    
    //barrel
    $( "#numPipe" ).on('change', function () {
        var tmp = parseInt(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessageBarrel1'), "Invalid value is not accepted for number of barrels!");
            $( "#numPipe" ).val(culvert.barrel.amount);
            $(this).trigger('focus');
        } else if (tmp < 1) {
            showMessage($('#warningMessageBarrel1'), "At least 1 barrel is needed!");
            $( "#numPipe" ).val(culvert.barrel.amount);
            $(this).trigger('focus');
        } else {
            culvert.barrel.amount = tmp;
            updateChartXSection();
        }
    });
    
    $( "#inletElevation" ).on('change', function () {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessageBarrel1'), "Invalid value is not accepted for inlet elevation!");
            $( "#inletElevation").val(culvert.barrel.inletElevation);
            $(this).trigger('focus');
        } else if (tmp <= culvert.barrel.outletElevation) {
            showMessage($('#warningMessageBarrel1'), "Inlet elevation lower than outlet elevation is not accepted!");
            $( "#inletElevation").val(culvert.barrel.inletElevation);
            $(this).trigger('focus');
        } else {
            culvert.barrel.inletElevation = tmp;
            updateChartXSection();
            updateChartProfile();
        }
    });
    
    $( "#outletElevation" ).on('change', function () {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessageBarrel1'), "Invalid value is not accepted for outlet elevation!");
            $( "#outletElevation").val(culvert.barrel.outletElevation);
            $(this).trigger('focus');
        } else if (tmp <= culvert.barrel.outletElevation) {
            showMessage($('#warningMessageBarrel1'), "outlet elevation higher than inlet elevation is not accepted!");
            $( "#outletElevation").val(culvert.barrel.outletElevation);
            $(this).trigger('focus');
        } else {
            culvert.barrel.outletElevation = tmp;
            updateChartXSection();
            updateChartProfile();
        }
    });
    
    $( "#distanceInOutlet" ).on('change', function () {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessageBarrel1'), "Invalid value is not accepted for distance betweeen inlet and outlet!");
            $( "#distanceInOutlet").val(culvert.barrel.distance);
            $(this).trigger('focus');
        } else if (tmp <= 0) {
            showMessage($('#warningMessageBarrel1'), "Nonpositive value is not accepted for distance betweeen inlet and outlet!");
            $( "#distanceInOutlet").val(culvert.barrel.distance);
            $(this).trigger('focus');
        } else {
            culvert.barrel.distance = tmp;
            updateChartProfile();
        }
    });
    
    $( "#diameter" ).on('change', function () {
        var tmp = parseFloat(this.value);
        if (isNaN(tmp)) {
            showMessage($('#warningMessageBarrel1'), "Invalid value is not accepted for diameter!");
            $( "#diameter" ).val(culvert.xSection.r * 2 * 12);
            $(this).trigger('focus');
        } else if (tmp <= 0) {
            showMessage($('#warningMessageBarrel1'), "Nonpositive value is not accepted for diameter!");
            $( "#diameter" ).val(culvert.xSection.r * 2 * 12);
            $(this).trigger('focus');
        } else {
            culvert.xSection.r = tmp / 2 / 12;
            updateChartXSection();
            updateChartProfile();
        }
    });
    
    /*
    $( "#slopeBarrel" ).html(culvert.slopeBarrel.toFixed(4));
    //updateStorm();

    $( "#diameter" ).val(culvert.xSection.r * 2 * 12);

    */
    
    
    function updateStorm(){
        var tc = parseFloat($("#tcInput").val());
        var ca = culvert.ca;
        var tbl = document.getElementById('qTableBody');
        var cal = document.getElementById('calcTableBody');

        var rfi10 = rf.i(culvert.site, 3, tc); //10-year
        var q10 = ca * rfi10;
        tbl.rows[0].cells[1].innerHTML = rfi10.toFixed(2);
        tbl.rows[0].cells[2].innerHTML = q10.toFixed(2);

        cal.rows[0].cells[1].innerHTML = rfi10.toFixed(2);
        cal.rows[0].cells[2].innerHTML = q10.toFixed(2);
        var circ = culvert.xSection;
        var AD05 = Math.PI * circ.r * circ.r * Math.sqrt(2.0 * circ.r);
        
        circ.dn = circ.Q2Dn(q10);
        var hc = circ.hc;
        var QAD05 = q10/AD05;
        var hwi1 = hc + (culvert.KMcY.K * Math.pow(QAD05, culvert.KMcY.M) - 0.5 * circ.cs) * 2.0 * circ.r; 
        var hwi2 = culvert.KMcY.c * Math.pow(QAD05, 2.0) + culvert.KMcY.Y - 0.5 * circ.cs; 
        hwi2 *= (2.0 * circ.r)
        
        cal.rows[0].cells[3].innerHTML = circ.dn.toFixed(2);
        cal.rows[0].cells[4].innerHTML = circ.dc.toFixed(2);
        cal.rows[0].cells[5].innerHTML = hc.toFixed(2);
        cal.rows[0].cells[6].innerHTML = QAD05.toFixed(2);
        cal.rows[0].cells[7].innerHTML = hwi1.toFixed(2);
        cal.rows[0].cells[8].innerHTML = hwi2.toFixed(2);

        
        var rfi25 = rf.i(culvert.site, 4, tc); //25-year
        var q25 = 1.1 * ca * rfi25;
        tbl.rows[1].cells[1].innerHTML = rfi25.toFixed(2);
        tbl.rows[1].cells[2].innerHTML = q25.toFixed(2);
        cal.rows[1].cells[1].innerHTML = rfi25.toFixed(2);
        cal.rows[1].cells[2].innerHTML = q25.toFixed(2);
        circ.dn = circ.Q2Dn(q25);
        hc = circ.hc;
        QAD05 = q25/AD05;
        hwi1 = hc + (culvert.KMcY.K * Math.pow(QAD05, culvert.KMcY.M) - 0.5 * circ.cs) * 2.0 * circ.r; 
        hwi2 = culvert.KMcY.c * Math.pow(QAD05, 2.0) + culvert.KMcY.Y - 0.5 * circ.cs; 
        hwi2 *= (2.0 * circ.r)
        
        cal.rows[1].cells[3].innerHTML = circ.dn.toFixed(2);
        cal.rows[1].cells[4].innerHTML = circ.dc.toFixed(2);
        cal.rows[1].cells[5].innerHTML = hc.toFixed(2);
        cal.rows[1].cells[6].innerHTML = QAD05.toFixed(2);
        cal.rows[1].cells[7].innerHTML = hwi1.toFixed(2);
        cal.rows[1].cells[8].innerHTML = hwi2.toFixed(2);
        
        var rfi50 = rf.i(culvert.site, 5, tc); //50-year
        var q50 = 1.2 * ca * rfi50;
        tbl.rows[2].cells[1].innerHTML = rfi50.toFixed(2);
        tbl.rows[2].cells[2].innerHTML = q50.toFixed(2);
        cal.rows[2].cells[1].innerHTML = rfi50.toFixed(2);
        cal.rows[2].cells[2].innerHTML = q50.toFixed(2);
        circ.dn = circ.Q2Dn(q50);
        hc = circ.hc;
        QAD05 = q50/AD05;
        hwi1 = hc + (culvert.KMcY.K * Math.pow(QAD05, culvert.KMcY.M) - 0.5 * circ.cs) * 2.0 * circ.r; 
        hwi2 = culvert.KMcY.c * Math.pow(QAD05, 2.0) + culvert.KMcY.Y - 0.5 * circ.cs; 
        hwi2 *= (2.0 * circ.r)

        cal.rows[2].cells[3].innerHTML = circ.dn.toFixed(2);
        cal.rows[2].cells[4].innerHTML = circ.dc.toFixed(2);
        cal.rows[2].cells[5].innerHTML = hc.toFixed(2);
        cal.rows[2].cells[6].innerHTML = QAD05.toFixed(2);
        cal.rows[2].cells[7].innerHTML = hwi1.toFixed(2);
        cal.rows[2].cells[8].innerHTML = hwi2.toFixed(2);

        var rfi100 = rf.i(culvert.site, 6, tc); //100-year
        var q100 = 1.25 * ca * rfi100;
        cal.rows[3].cells[1].innerHTML = rfi100.toFixed(2);
        cal.rows[3].cells[2].innerHTML = q100.toFixed(2);
        tbl.rows[3].cells[1].innerHTML = rfi100.toFixed(2);
        tbl.rows[3].cells[2].innerHTML = q100.toFixed(2);
        circ.dn = circ.Q2Dn(q100);
        hc = circ.hc;
        QAD05 = q100/AD05;
        hwi1 = hc + (culvert.KMcY.K * Math.pow(QAD05, culvert.KMcY.M) - 0.5 * circ.cs) * 2.0 * circ.r; 
        hwi2 = culvert.KMcY.c * Math.pow(QAD05, 2.0) + culvert.KMcY.Y - 0.5 * circ.cs; 
        hwi2 *= (2.0 * circ.r)

        cal.rows[3].cells[3].innerHTML = circ.dn.toFixed(2);
        cal.rows[3].cells[4].innerHTML = circ.dc.toFixed(2);
        cal.rows[3].cells[5].innerHTML = hc.toFixed(2);
        cal.rows[3].cells[6].innerHTML = QAD05.toFixed(2);
        cal.rows[3].cells[7].innerHTML = hwi1.toFixed(2);
        cal.rows[3].cells[8].innerHTML = hwi2.toFixed(2);
    
    };

    function getyTop(){
        var xOffset = 0;
        var elevEVC = culvert.EVCElevation;
        var yTop;
        
        if(Math.abs(culvert.roadSag.BVCGrade) > culvert.roadSag.EVCGrade) {
            yTop = culvert.roadSag.BVCElevation - xOffset * culvert.roadSag.BVCGrade;
        } else {
            yTop = elevEVC + xOffset * culvert.roadSag.EVCGrade;
        };
        return yTop;
    }
    
    function updateChartXSection(){
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

        $('#pathVC', '#chartXSection').attr('d', sVC);

        var rxs = culvert.xSection.r * scaleX;
        var rys = culvert.xSection.r * scaleY;

        //var dxs = 0.5 * (-ocvw.offsetLeft + ocvw.w - ocvw.offsetRight) - rxs; //displacement for x to move circle to the middle

        //var xc0 = x2;
        var yc0 = culvert.barrel.inletElevation - culvert.barrel.outletElevation + culvert.xSection.r;
        var ycs = ocvw.h - ocvw.offsetBottom - (yc0 - yTickBottom) * scaleY;

        var sRCP = 'M' + x2s + ' ' + y2s + ' a ' + rxs + ' ' + rys + ' 0 1 0 ' + 2.0* rxs + ' 0 '
                                         + ' a ' + rxs + ' ' + rys + ' 0 1 0 -' + 2.0* rxs + ' 0 ';

        for (let i = 1; i < culvert.barrel.amount; i++) {
            x2s += 6 * rxs;
            sRCP += 'M' + x2s + ' ' + y2s + ' a ' + rxs + ' ' + rys + ' 0 1 0 ' + 2.0* rxs + ' 0 '
                                         + ' a ' + rxs + ' ' + rys + ' 0 1 0 -' + 2.0* rxs + ' 0 ';
        }
        
        $('#pathCulvert', '#chartXSection').attr('d', sRCP);

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
        $('#path10', '#chartXSection').attr('d', 'M' + x2s + ' ' + y2s + 'V10');

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
            $('#'+idLabel, '#chartXSection').attr('x', xDraw);
            $('#'+idLabel, '#chartXSection').attr('y', yPos);
            text = x.toString();
            if(text.length > 10) {
                text = x.toFixed(xInc.countDecimals());
            }
            $('#'+idLabel, '#chartXSection').text(text);
            //document.getElementById(idLabel).childNodes[0].textContent = text;

            xDraw += xIncDraw;
            x += xInc;
            i += 1;
        }

        for (; i < 10; i++){
            idLabel = 'xTick' + i;
            $('#'+idLabel, '#chartXSection').text(' ');
            //document.getElementById(idLabel).childNodes[0].textContent = ' ';
        }

        $('#pathGridY', '#chartXSection').attr('d', xGrid);

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
            $('#'+idLabel, '#chartXSection').attr("x", xPos);
            $('#'+idLabel, '#chartXSection').attr("y", yDraw);
            //document.getElementById(idLabel).childNodes[0].textContent = text;
            $('#'+idLabel, '#chartXSection').text(text);

            yDraw -= yIncDraw;
            y += yInc;
            i += 1;
        }

        for (; i < 10; i++){
            idLabel = 'yTick' + i;
            //document.getElementById(idLabel).childNodes[0].textContent = ' ';
            $('#'+idLabel, '#chartXSection').text(' ');
        }

        $("#pathGridX", '#chartXSection').attr("d", yGrid);

        xPos = ocvw.offsetLeft + 0.5 * (ocvw.w - ocvw.offsetLeft - ocvw.offsetRight);
        yPos = ocvw.h - 0.25 * ocvw.offsetBottom;
        $('#xLabel','#chartXSection').attr("x", xPos);
        $('#xLabel','#chartXSection').attr("y", yPos);

    };    
    
    function updateChartProfile(){
        var xOffset = 20;
        var yTop = getyTop();
        //drawing 
        var xMin = 0;
        var xMax = xOffset + culvert.barrel.distance + xOffset;
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

        // draw barrel / pipe
        //left bottom of the barrel
        var x0 = xOffset;
        var y0 = culvert.barrel.inletElevation;
        var x0s = ocvw.offsetLeft + (x0 - xTickLeft) * scaleX;
        var y0s = ocvw.h - ocvw.offsetBottom - (y0 - yTickBottom) * scaleY;

        var x1 = x0 + culvert.barrel.distance;
        var y1 = culvert.barrel.outletElevation;
        var x1s = ocvw.offsetLeft + (x1 - xTickLeft) * scaleX;
        var y1s = ocvw.h - ocvw.offsetBottom - (y1 - yTickBottom) * scaleY;

        var y2 = y1 + 2 * culvert.xSection.r;
        var y2s = ocvw.h - ocvw.offsetBottom - (y2 - yTickBottom) * scaleY;
        
        var y3 = y0 + 2 * culvert.xSection.r;
        var y3s = ocvw.h - ocvw.offsetBottom - (y3 - yTickBottom) * scaleY;

        var sPipe = 'M ' + x0s + ' ' + y0s + ' L ' + x1s + ' ' + y1s + ' L ' + x1s + ' ' + y2s + ' L ' + x0s + ' ' + y3s + ' ' + ' Z ';

        $('#pathPipe', '#chartProfile').attr('d', sPipe);
        
        //draw embankment
        var x4 = x0 + 3 * (culvert.sagElevation - y3); //assuming 3:1 slope
        var x5 = x1 - 3 * (culvert.sagElevation - y2);
        var x4s = ocvw.offsetLeft + (x4 - xTickLeft) * scaleX;
        var x5s = ocvw.offsetLeft + (x5 - xTickLeft) * scaleX;

        var y4 = culvert.sagElevation;
        var y4s = ocvw.h - ocvw.offsetBottom - (y4 - yTickBottom) * scaleY;
        
        var sEmbankment = 'M ' + x0s + ' ' + y3s + ' L ' + x4s + ' ' + y4s + ' L ' + x5s + ' ' + y4s + ' L ' + x1s + ' ' + y2s;

        $('#pathEmbankment', '#chartProfile').attr('d', sEmbankment);
        
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
