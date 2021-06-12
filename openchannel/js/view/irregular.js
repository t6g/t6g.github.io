        $( document ).ready(function() {

            $("#mynav").load("nav.html");
            
            $("#chartDIV").load("img/chart.svg", function(){
                updateChart();
            });

            $("#output").load("output.html", function(){
                setValues();
            });


            const irre = new IrregularChannel([
                                  [ 0, 10, 0.06], 
                                  [10,  7, 0.06], 
                                  [20,  7, 0.06],
                                  [30,  4, 0.05],
                                  [40,  7, 0.06],
                                  [50,  7, 0.06],
                                  [60, 10, 0.06]],
                                  'Pavlovskii',
                                  0.01, 0.05, 4);
            
            //let tmp = localStorage.getItem('irre');
            //if (tmp) {
            //    Object.assign(irre, JSON.parse(tmp));
            //}
            $.getJSON('test.json', function(data) {
                $.each(data.items, function(key, val) {
                   alert(val.fname);
                   alert(val.lname);
                })});
            
            
            var data = jQuery.getJSON( "irregulardata.json", function() { console.log( "success" ); })
                .done(function() { 
                    console.log( "second success" ); 
                    jQuery.each(data.items, function(i, item){
                        console.log(i);
                        console.log(item);
                    })
                                 })
                .fail(function() { console.log( "error" ); })
                .always(function() { console.log( "complete" ); });
 
            // Perform other work here ...

            
            // Set another completion function for the request above
            data.always(function() {
              console.log( "second complete" );
            });

            var zbottom = irre.yBottom;
            
            $("#selectN").val(irre.nMethod);
            $("#channelSlope").val(irre.cs.toFixed(3));
            $("#manningsN").html(irre.d2N(irre.dn).toFixed(3));
            $("#normalDepth").val(irre.dn.toFixed(2));
            $("#discharge").val(irre.Qn.toFixed(2));

            setXZNTable();

            $("#xzns").numericalTable();
            $("#calcTable").numericalTable();
            

            $("#selectN").change(function(){
                irre.nMethod = $("#selectN").val();
                localStorage.setItem('irre', JSON.stringify(irre));
                update();
            });
            
            $("#channelSlope").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#channelSlope").val(irre.cs);
                }
                else {
                    irre.cs = tmp;
                    localStorage.setItem('irre', JSON.stringify(irre));
                    $('#discharge').val(irre.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#normalDepth").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#normalDepth").val(irre.dn.toFixed(2));
/*                }
                else if(tmp > 2*irre.r){
                    showMessage($('#warningMessage'), ("Input normal depth is greater than diameter. It is not accepted!");
                    $("#normalDepth").val(irre.dn.toFixed(2));
*/                } else {
                    irre.dn = tmp;
                    localStorage.setItem('irre', JSON.stringify(irre));
                    $('#discharge').val(irre.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#discharge").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#discharge").val(irre.Qn.toFixed(2));
                } else if (tmp > irre.Qmax){
                    showMessage($('#warningMessage'), "Input discharge is greater than capacity. It is not accepted!");
                    $("#discharge").val(irre.Qn.toFixed(2));
                } else {
                    irre.dn = irre.Q2Dn(tmp);
                    localStorage.setItem('irre', JSON.stringify(irre));
                    $("#normalDepth").val(irre.dn.toFixed(2));
                    update();
                }
            });

            function update(){
                setValues();
                updateChart();
            }
            
            function setValues(){
                $("#manningsN").html(irre.d2N(irre.dn).toFixed(3));
                $("#area").html(irre.an.toFixed(3));
                $("#peri").html(irre.pn.toFixed(3));
                $("#velo").html(irre.vn.toFixed(3));
                $("#dc").html(irre.dc.toFixed(3));
                $("#vc").html(irre.vc.toFixed(3));
                $("#sc").html(irre.sc.toFixed(3));
                $("#fr").html(irre.fr.toFixed(3));
                $("#capacity").html(irre.Qmax.toFixed(3));
                $("#ymax").html(irre.depth.toFixed(3));
            }
            
            function setXZNTable(){
                let tabl = document.getElementById('xzns');
                var nRowTabl = tabl.rows.length;
                var row = null;
                var i = 0;
                var tabindex = 0;
                var zb = irre.yBottom;
    
                for (i = 0; i < irre.geometry.length; i++) {
                    if(i < tabl.rows.length){
                        for (var j = 0; j < tabl.rows[i].cells.length - 1; j++) {
                            tabl.rows[i].cells[j].innerHTML = irre.geometry[i][j];
                            tabl.rows[i].cells[j].tabIndex = tabindex;
                        }
                        tabl.rows[i].cells[j].innerHTML = irre.geometry[i][1] - zb;                        
                    }
                    else {
                        $("#tableXZNS > tbody").append("<tr><td  contenteditable='true'>" + 
                                    irre.geometry[i][0]+"</td><td contenteditable='true''>" + 
                                    irre.geometry[i][1]+"</td><td contenteditable='true'>" + 
                                    irre.geometry[i][2]+"</td><td>" + 
                                    (irre.geometry[i][1] - zb) +"</td></tr>");
                        for (var j = 0; j < tabl.rows[i].cells.length - 1; j++) {
                            tabl.rows[i].cells[j].tabIndex = tabindex;
                        };
                        
/*                        if(row == null)
                            row = tabl.rows[nRowTabl-1].cloneNode(true);
                        else
                            row = row.cloneNode(true);

                        for (var j = 0; j < row.cells.length - 1; j++) {
                            row.cells[j].innerHTML = irre.geometry[i][j];
                            row.cells[j].tabIndex = tabindex;
                        }
                        row.cells[j].innerHTML = irre.geometry[i][1] - irre.yBottom;     
                        tabl.appendChild(row);
  */                  }
                }

                if(nRowTabl > irre.geometry.length){
                    for (i; i < tabl.rows.length; i++) {
                        for (var j = 0; j < tabl.rows[i].cells.length; j++) {
                            tabl.rows[i].cells[j].innerHTML = '&nbsp;';
                            tabl.rows[i].cells[j].tabIndex = tabindex;
                        }
                    }
                }
            }

$("#btnAdd").click(function() {
    var tb = document.getElementById('xzns');
    var nr = tb.rows.length;
    var row = tb.rows[nr-1].cloneNode(true);
//    for (var j = 0; j < row.cells.length; j++) {
//        row.cells[j].innerHTML = '&nbsp;'
//        if(j < 3) row.cells[j].tabIndex = 0;
//    }
    tb.appendChild(row);
    
    if(document.getElementById('btnDel').disabled && tb.rows.length > 3)
        document.getElementById('btnDel').disabled = false;
});

$("#btnDel").click(function(){
    var tableGeometry = document.getElementById('xzns');
    if(tableGeometry.rows.length >= 4) {
        if (tableGeometry.rows.length === 4)
            document.getElementById('btnDel').disabled = true;
        tableGeometry.deleteRow(-1);
    }
});

$("#btnApp").click(function(){
    var tableGeometry = document.getElementById('xzns');
    var tmpArr = [];
    var xs = [];
    var ys = [];
    var ns = [];
    //check if all numbers are positive
    for (var i = 0; i < tableGeometry.rows.length; i++) {
        //check if entire row empty
        if (i >= 2 &&
            tableGeometry.rows[i].cells[0].innerHTML == "&nbsp;" &&
            tableGeometry.rows[i].cells[1].innerHTML == "&nbsp;" &&
            tableGeometry.rows[i].cells[2].innerHTML == "&nbsp;") {
            break;
        };

        //check if entire row empty
        /*
        if (!String.prototype.trim) {
            String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, '');};
        }
        if (
            i >= 2 &&
            tableGeometry.rows[i].cells[0].innerHTML.trim() == "" &&
            tableGeometry.rows[i].cells[1].innerHTML.trim() == "" &&
            tableGeometry.rows[i].cells[2].innerHTML.trim() == "") {
            break;
        }
          
          */
        for (var j = 0; j < tableGeometry.rows[i].cells.length; j++) {
            let tmp = parseFloat(tableGeometry.rows[i].cells[j].innerHTML); 
            //if not a number
            if (isNaN(tmp)) {
                showMessage($('#warningxznsMessage'), 'Please input a number!');
                tableGeometry.rows[i].cells[j].focus();    
                return;
            }
            else if(tmp < 0) {  //if negative
                showMessage($('#warningxznsMessage'), 'Please input a positive number!');
                tableGeometry.rows[i].cells[j].focus();    
                return;
            }
            if (j === 0) xs.push(tmp);
            if (j === 1) ys.push(tmp);
            if (j === 2) ns.push(tmp);
        }
        tmpArr.push([xs[i], ys[i], ns[i]]);
    }
    
    //check stations increase monotonically
    for (var i = 1; i < xs.length; i++) {
        if( xs[i] < xs[i-1]) {
            showMessage($('#warningxznsMessage'), 'please input a station number >= previous station!');
            tableGeometry.rows[i].cells[0].focus();    
            return;
        }
    }
    
    for (var i = 0; i < ns.length; i++){
        if(ns[i] <= 0) {
            showMessage($('#warningxznsMessage'), 'please input a positive n value!');
            tableGeometry.rows[i].cells[2].focus();    
            return;
        }
    }
        
    var yb = Math.min(...ys);
    var ib = ys.indexOf(yb);
    
    if (ib === 0) {
        showMessage($('#warningxznsMessage'), 'We would not like the first station to be the bottom, please increase the elevation at the first station!');
        tableGeometry.rows[0].cells[1].focus();    
        return;
    }
        
    if (ib === (xs.length-1)) {
        showMessage($('#warningxznsMessage'), 'We would not like the last station to be the bottom, please increase the elevation!');
        tableGeometry.rows[ib].cells[1].focus();    
        return;
    }
    
    irre.geometry = null;
    irre.geometry = tmpArr;

    localStorage.setItem('irre', JSON.stringify(irre));

    // save to local storage
    //localStorage.setItem("irre.geometry", JSON.stringify(irre.geometry));

    //initIrre();
    $("#manningsN").html(irre.d2N(irre.dn).toFixed(3));
    $('#discharge').val(irre.Qn.toFixed(2));
    update();
});
                        
            
            function updateChart(){

    //drawing 
    var xMin = irre.geometry[0][0];
    var xMax = irre.geometry[irre.geometry.length - 1][0];
    var yMin = irre.yBottom;
    var yMax = Math.max(irre.yLeft, irre.yRight);

    var scaleX = (ocvw.w - ocvw.offsetLeft - ocvw.offsetRight)/ (xMax - xMin);
    var scaleY = (ocvw.h - ocvw.offsetTop - ocvw.offsetBottom) / (yMax - yMin);

    var x0s = ocvw.offsetLeft + (irre.geometry[0][0] - xMin) * scaleX;
    var y0s = ocvw.h - ocvw.offsetBottom - (irre.geometry[0][1] - yMin) * scaleY;

    var pathChan = 'M' + x0s + ' ' + y0s;
    for (let i = 1; i < irre.geometry.length; i++) {
        let x1s = ocvw.offsetLeft + (irre.geometry[i][0] - xMin) * scaleX;
        let y1s = ocvw.h - ocvw.offsetBottom - (irre.geometry[i][1] - yMin) * scaleY;
        pathChan += ' L ' + x1s + ' ' + y1s;
    }
        
    var xnl = irre.d2xL(irre.dn);
    var xnr = irre.d2xR(irre.dn);
    var xnls = ocvw.offsetLeft + (xnl - xMin) * scaleX;
    var xnrs = ocvw.offsetLeft + (xnr - xMin) * scaleX;
    var yns = ocvw.h - ocvw.offsetBottom -(irre.yBottom + irre.dn - yMin) * scaleY;


    var xcl = irre.d2xL(irre.dc);
    var xcr = irre.d2xR(irre.dc);;
    var xcls = ocvw.offsetLeft + (xcl - xMin) * scaleX;
    var xcrs = ocvw.offsetLeft + (xcr - xMin) * scaleX;
    var ycs = ocvw.h - ocvw.offsetBottom - (irre.yBottom + irre.dc - yMin) * scaleY;


                $('#pathChan').attr('d', pathChan);

                $('#pathNorm').attr('d', 'M' + xnls + ' ' + yns + 'L' + xnrs + ' ' + yns);

                $('#pathCrit').attr('d', 'M' + xcls + ' ' + ycs + 'L' + xcrs + ' ' + ycs);
            
                drawGrid(xMin, xMax, yMin, yMax, scaleX, scaleY, 'chart');
            }

        });