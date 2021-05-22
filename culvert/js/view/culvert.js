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
            {"L": 3000.0, "H": 100.0}
        ]
    };

    setDATableBody();
    setDATableFoot();
    $("#DATable").numericalTable();

    setSFTableBody();
    setSFTableFoot();

    $("#SFTable").numericalTable();
        //updateRFIOutput();
        //updateTable();
        //updateGraph();

    setCFTable();

    
    function setDATableBody() {

        var tbl = document.getElementById('DATableBody');
        
        for (let j = 0; j < data.DAs.length; j++) {
            tbl.rows[j].cells[0].innerHTML = data.DAs[j].A.toFixed(2);
            tbl.rows[j].cells[1].innerHTML = data.DAs[j].C.toFixed(2);
            let ca = data.DAs[j].A * data.DAs[j].C;
            tbl.rows[j].cells[2].innerHTML = ca.toFixed(2);
        };
    };
    
    function setDATableFoot(){
        var sumA = 0.0;
        var sumCA = 0.0;
        for (let i = 0; i < data.DAs.length; i++) {
            sumA += data.DAs[i].A;
            sumCA += data.DAs[i].A * data.DAs[i].C;
        }

        $('#DATableFoot tr th')[0].innerHTML = sumA.toFixed(2);
        $('#DATableFoot tr th')[2].innerHTML = sumCA.toFixed(2);
    }

    $( '#DATable tr td[contenteditable="true"]').on ('change', function(event){
        var col = this.cellIndex;
        var row = this.parentElement.rowIndex;

        var tmp = parseFloat(this.innerHTML);
        if (isNaN(tmp) || (tmp < 0)) {
                showMessage($('#warningMessageDA'), "Nonpositive values are not accepted!");
                if(row > data.DAs.lengh + 2) {
                    return;        
                }
                if(col == 0) {
                    $( this ).html(data.DAs[row - 2].A.toFixed(2));
                }
                else if(col == 1) {
                    $( this ).html(data.DAs[row - 2].C.toFixed(2));
                }
                $(this).trigger('focus');
            }
            else {
                if(row <= data.DAs.length + 2) {
                    if (col == 0) {
                        data.DAs[row - 2].A = tmp;        
                        let ca = data.DAs[row - 2].A *  data.DAs[row - 2].C; 
                        this.nextElementSibling.nextElementSibling.innerHTML = ca.toFixed(2);
                    } else if (col ==1) {
                        data.DAs[row - 2].C = tmp;        
                        let ca = data.DAs[row - 2].A *  data.DAs[row - 2].C; 
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

        for (let j = 0; j < data.Seelyes.length; j++) {
            tbl.rows[j].cells[0].innerHTML = data.Seelyes[j].L.toFixed(2);
            tbl.rows[j].cells[1].innerHTML = data.Seelyes[j].S.toFixed(3);
            tbl.rows[j].cells[2].innerHTML = data.Seelyes[j].C.toFixed(2);
            let t = TSeelye(data.Seelyes[j]);
            tbl.rows[j].cells[3].innerHTML = t.toFixed(2);
            distance += data.Seelyes[j].L;
            tc += t;
        };

        var tft = document.getElementById('SFTableFoot');
        tft.rows[0].cells[0].innerHTML = distance.toFixed(2);
        tft.rows[0].cells[3].innerHTML = tc.toFixed(2);
    };

    function setSFTableBody() {
        var tbl = document.getElementById('SFTableBody');

        for (let j = 0; j < data.Seelyes.length; j++) {
            tbl.rows[j].cells[0].innerHTML = data.Seelyes[j].L.toFixed(2);
            tbl.rows[j].cells[1].innerHTML = data.Seelyes[j].S.toFixed(3);
            tbl.rows[j].cells[2].innerHTML = data.Seelyes[j].C.toFixed(2);
            let t = TSeelye(data.Seelyes[j]);
            tbl.rows[j].cells[3].innerHTML = t.toFixed(2);
        };
    }
    
    function setSFTableFoot() {
        var tc = 0.0;
        var distance = 0.0;
        for (let j = 0; j < data.Seelyes.length; j++) {
            let t = TSeelye(data.Seelyes[j]);
            distance += data.Seelyes[j].L;
            tc += t;
        };

        var tft = document.getElementById('SFTableFoot');
        tft.rows[0].cells[0].innerHTML = distance.toFixed(2);
        tft.rows[0].cells[3].innerHTML = tc.toFixed(2);
    };

    
    
    $( '#SFTable tr td[contenteditable="true"]').on ('change', function(event){
        var col = this.cellIndex;
        var row = this.parentElement.rowIndex;
        var rowTop = this.parentElement.parentElement.children[0].rowIndex;

        var tmp = parseFloat(this.innerHTML);
        if (isNaN(tmp) || (tmp < 0)) {
                showMessage($('#warningMessageSF'), "Nonpositive values are not accepted!");
                if(row > data.Seelyes.lengh + rowTop) {
                    return;        
                }
                if(col == 0) {
                    $( this ).html(data.DAs[row - rowTop].L.toFixed(2));
                }
                else if(col == 1) {
                    $( this ).html(data.DAs[row - rowTop].S.toFixed(2));
                } else if(col == 2) {
                    $( this ).html(data.DAs[row - rowTop].C.toFixed(2));
                }
                $(this).trigger('focus');
            }
            else {
                if(row <= data.Seelyes.length + rowTop) {
                    if (col == 0) {
                        data.Seelyes[row - rowTop].L = tmp;        
                        let t = TSeelye(data.Seelyes[row - rowTop]);
                        $(this).next().next().next().html(t.toFixed(2));
                    } else if (col ==1) {
                        data.Seelyes[row - rowTop].S = tmp;        
                        let t = TSeelye(data.Seelyes[row - rowTop]);
                        $(this).next().next().html(t.toFixed(2));
                    } else if (col == 2) {
                        data.Seelyes[row - rowTop].C = tmp;        
                        $(this).next().html(t.toFixed(2));
                    }
                    
                    setSFTableFoot();
                }
            }
    });
    
    
    
    function setCFTable() {

        var tbl = document.getElementById('CFTableBody');
        var tc = 0.0;

        for (let j = 0; j < data.Kirpichs.length; j++) {
            tbl.rows[j].cells[0].innerHTML = data.Kirpichs[j].L.toFixed(2);
            tbl.rows[j].cells[1].innerHTML = data.Kirpichs[j].H.toFixed(3);
            let t = TKirpich(data.Kirpichs[j]);
            tbl.rows[j].cells[2].innerHTML = t.toFixed(2);
            tc += t;
        };

        var tft = document.getElementById('CFTableFoot');
        tft.rows[0].cells[2].innerHTML = tc.toFixed(2);
    };
    
    function TSeelye(obj) {
        return 0.225 * Math.pow(obj.L, 0.42) * Math.pow(obj.S, -0.19) / obj.C;
    };
    
    function TKirpich(obj) {
        return 0.00948 * Math.pow(obj.L, 1.13) * Math.pow(obj.H, -0.38);
    }

});

    $("#NOAAsite").change(function () {
        updateRFIOutput();
        updateTable();
        updateGraph();
    });

    $("#intervalStorm").change(updateRFIOutput);

    $("#tcInput").change(updateRFIOutput);

    function updateRFIOutput() {
        var site = parseInt($("#NOAAsite").val());
        var interval = parseInt($("#intervalStorm").val());
        var tc = parseFloat($("#tcInput").val());
        var rfd = rf.i(site, interval, tc);
        $("#rfiOutput").html(rfd.toFixed(2));
    }

    function updateGraph() {
        var h = 400;
        var w = 600;
        var oxl = 50;
        var oxr = 10;
        var sx = (w - oxl - oxr) / 60;
        var oyt = 20;
        var oyb = 50;
        var sy = (h - oyt - oyb) / 10;
        var xa = [5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20, 25, 30, 35, 40, 45, 50, 55, 60];
        var xs = oxl + xa[0] * sx;

        var site = parseInt($("#NOAAsite").val());
        var y = rf.i(site, 0, xa[0]);
        var ys = h - oyb - y * sy;
        var s1 = "M " + xs.toFixed(2) + ' ' + ys.toFixed(2);

        y = rf.i(site, 1, xa[0]);
        ys = h - oyb - y * sy;
        var s2 = "M " + xs.toFixed(2) + ' ' + ys.toFixed(2);

        y = rf.i(site, 3, xa[0]);
        ys = h - oyb - y * sy;
        var s10 = "M " + xs.toFixed(2) + ' ' + ys.toFixed(2);

        y = rf.i(site, 6, xa[0]);
        ys = h - oyb - y * sy;
        var s100 = "M " + xs.toFixed(2) + ' ' + ys.toFixed(2);

        for (let i = 1; i < xa.length; i++) {

            xs = oxl + xa[i] * sx;
            y = rf.i(site, 0, xa[i]);
            ys = h - oyb - y * sy;
            s1 += " L " + xs.toFixed(2) + ' ' + ys.toFixed(2);

            y = rf.i(site, 1, xa[i]);
            ys = h - oyb - y * sy;
            s2 += " L " + xs.toFixed(2) + ' ' + ys.toFixed(2);

            y = rf.i(site, 3, xa[i]);
            ys = h - oyb - y * sy;
            s10 += " L " + xs.toFixed(2) + ' ' + ys.toFixed(2);

            y = rf.i(site, 6, xa[i]);
            ys = h - oyb - y * sy;
            s100 += " L " + xs.toFixed(2) + ' ' + ys.toFixed(2);
        }

        $("#path01").attr("d", s1);
        $("#path02").attr("d", s2);
        $("#path10").attr("d", s10);
        $("#path100").attr("d", s100);
        $("#lblTitle").html(rf.station(site));

    }

    function updateTable() {
        var site = parseInt($("#NOAAsite").val());
        var stat = rf.station(site);

        $("#captionRainfallTable").html("Rainfall Intensity @ " + stat);

        $("#rfd tr").each(function () {
            $("td", this).each(function () {
                if (this.cellIndex !== 0) {
                    var site = parseInt($("#NOAAsite").val());
                    var interval = this.cellIndex - 1;
                    var tc = parseFloat(this.parentElement.cells[0].innerText);
                    var rfd = rf.i(site, interval, tc);
                    $(this).html(rfd.toFixed(2));
                }
            })
        })
    }