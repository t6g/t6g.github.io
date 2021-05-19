$(document).ready(function () {
    const data = {
        "DAs":[
            {"A":4.54, "C":0.28},
            {"A":1.00, "C":0.45}],

        "Seelyes":[
            {"L":100.0, "S":0.01, "C":0.30},
            {"L":150.0, "S":0.02, "C":0.20}],
        "Kirpichs":[
            {"L": 3000.0, "H": 100.0}
        ]
    };

    setDATablejQuery();
    //$("#DATable").numTable();

    setSFTable();
    setCFTable();
        //updateRFIOutput();
        //updateTable();
        //updateGraph();
    function setDATable() {
        //let tbl = $("#DATable");
        var ASum = 0.0;
        var CASum = 0.0;
        
        var tbl = document.getElementById('DATableBody');
        
        for (let j = 0; j < data.DAs.length; j++) {
            tbl.rows[j].cells[0].innerHTML = data.DAs[j].A.toFixed(2);
            tbl.rows[j].cells[1].innerHTML = data.DAs[j].C.toFixed(2);
            let ca = data.DAs[j].A * data.DAs[j].C;
            tbl.rows[j].cells[2].innerHTML = ca.toFixed(2);
            ASum += data.DAs[j].A;
            CASum += ca;
        };

        var tft = document.getElementById('DATableFoot');
        tft.rows[0].cells[0].innerHTML = ASum.toFixed(2);
        tft.rows[0].cells[2].innerHTML = CASum.toFixed(2);
    };
    
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
    
    function setDATablejQuery() {

        $( "#DATable tr" ).each(function () {
            //this.rowIndex == 0 for header name
            //this.rowIndex == 1 for header unit
            //this.rowIndex 2-6  for values
            //this.rowIndex == 7 for footer sum
            console.log(this.rowIndex);
            if (this.rowIndex <= 1) {
                return; // equivalent to continue; return false equivalent to break;
            };
            
            if(this.rowIndex == 7) {  //footer th
                $( "th", this ).each(function () {
                    var i = 0;
                    switch(this.cellIndex) {
                        case 0:        // total drainage area
                            let sum = 0.0;
                            for (i = 0; i < data.DAs.length; i++) {
                                sum += data.DAs[i].A;
                            }
                            $( this ).html(sum.toFixed(2)); 
                            break;
                        case 1: $( this ).html(''); break;
                        case 2: 
                            let ca = 0.0;
                            for (i = 0; i < data.DAs.length; i++) {
                                ca += data.DAs[i].A * data.DAs[i].C;
                            }
                            $( this ).html(ca.toFixed(2)); 
                            break;
                    };
                });
            };
            
            $( "td", this ).each(function () {
                let row = this.parentElement.rowIndex - 2; //first 2 rows in table head
                let col = this.cellIndex;
                console.log('row:' + row + ' column:' + col);
                if(row < data.DAs.length) {
                    switch(col) {
                        case 0: $( this ).html(data.DAs[row].A.toFixed(2)); break;
                        case 1: $( this ).html(data.DAs[row].C.toFixed(2)); break;
                        case 2: 
                            let ca = data.DAs[row].A * data.DAs[row].C;
                            $( this ).html(ca.toFixed(2)); 
                            break;
                    };
                } else {
                    $( this ).html('');
                };
            });
        });
        
        var DAInputCells = $( '#DATable tr td[contenteditable="true"]');
        var DAInputCellsRowTop = DAInputCells[0].parentElement.rowIndex;
        var DAInputCellsRowBottom = DAInputCells[DAInputCells.length-1].parentElement.rowIndex;
        
        DAInputCells.keydown(function(event){
            var idx = DAInputCells.index(this);
            var row;
            switch (event.keyCode){
                case 38:    //up
                    row = this.parentElement.rowIndex;
                    if(row == DAInputCellsRowTop) {
                        let prevRow = this.parentElement.parentElement.rows[DAInputCellsRowBottom-DAInputCellsRowTop];
                        let cell = prevRow.cells[this.cellIndex];
                        $(cell).trigger('focus');
                    } else {
                        let prevRow = this.parentElement.previousElementSibling;
                        let cell = prevRow.cells[this.cellIndex];
                        $(cell).trigger('focus');
                    }
                    
                    break;
                case 37:    //left
                    if(idx > 0) {
                        $(DAInputCells[idx-1]).trigger('focus');
                    } else {
                        $(DAInputCells[DAInputCells.length - 1]).trigger('focus');
                    }
                    break;
                case 13:    //enter
                case 40:    //down
                    row = this.parentElement.rowIndex;
                    if(row == DAInputCellsRowBottom) {
                        let nextRow = this.parentElement.parentElement.rows[0];
                        let cell = nextRow.cells[this.cellIndex];
                        $(cell).trigger('focus');
                    } else {
                        let nextRow = this.parentElement.nextElementSibling;
                        let cell = nextRow.cells[this.cellIndex];
                        $(cell).trigger('focus');
                    }
                    
                    if(event.keyCode == 13) {   // for Enter
                        event.preventDefault();
                    }
                    break;
                case 39:    //right
                    if(idx < DAInputCells.length - 1) {
                        //DAInputCells[idx+1].focus;
                        $(DAInputCells[idx+1]).trigger('focus');
                    } else {
                        //DAInputCells[0].focus;
                        $(DAInputCells[0]).trigger('focus');
                    }
                    break;
            };
        });
        
        DAInputCells.change(function(event){
            var col = this.cellIndex;
            var row = this.parentElement.rowIndex;
            console.log('Change row ' + row + 'col ' + col + ' '+ this.innerHTML);
        });
        
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