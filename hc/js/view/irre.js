// JavaScript source code
'use strict'
/*
const irre = new IrregularChannel([[0, 3.5, 0.06], 
                                  [1, 3,   0.06], 
                                  [2, 3,   0.06],
                                  [3, 2.5, 0.06],
                                  [4, 0.5, 0.04],
                                  [5, 0,   0.04],
                                  [6, 0.3, 0.04],
                                  [7, 2.5, 0.06],
                                  [8, 2.8, 0.06],
                                  [9, 3.0, 0.06],
                                  [10, 3.5, 0.06]], */
const irre = new IrregularChannel([
                                  [ 0, 10, 0.06], 
                                  [10,  7, 0.06], 
                                  [20,  7, 0.06],
                                  [30,  4, 0.05],
                                  [40,  7, 0.06],
                                  [50,  7, 0.06],
                                  [60, 10, 0.06]],
                                  'Pavlovskii',
                                  0.01, 0.05, 1);

window.onload = function () {
    checkLocalStorage();

    document.getElementById('channelSlope').value = irre.cs;
    document.getElementById('selectN').value = irre.nMethod;
    document.getElementById('manningsN').value = irre.d2N(irre.dn).toFixed(3);
    document.getElementById('normalDepth').value = irre.dn.toFixed(2);
    document.getElementById('discharge').value = irre.Qn.toFixed(2);

    document.getElementById('channelSlope').addEventListener("change", respondChannelSlope);
    document.getElementById('selectN').addEventListener("change", respondSelectN);
    document.getElementById('normalDepth').addEventListener("change", respondNormalDepth);
    document.getElementById('discharge').addEventListener("change", respondDischarge);

    //document.getElementById('geometryTable').addEventListener("change", respondGeometry);

    update();
}

function checkLocalStorage() {
    var tmp = localStorage.getItem("irre.cs");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                irre.cs = tmp;
            }
        }
    }

    tmp = localStorage.getItem("irre.nMethod");
    if (tmp !== null) {
          irre.nMethod = tmp;
    }

    tmp = localStorage.getItem("irre.dn");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                irre.dn = tmp;
            }
        }
    }

    tmp = localStorage.getItem("oc.isUSCustomary");
    if (tmp !== null) oc.isUSCustomary = tmp ==="false" ? false : true;
    
    if(!oc.isUSCustomary) irre.dn /= oc.m2ft;
    
    tmp = JSON.parse(localStorage.getItem("irre.geometry"));
    if(tmp !== null) {
        irre.geometry = tmp;
    }
}

function respondChannelSlope(e) {
    var tmp = parseFloat(document.getElementById('channelSlope').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for channel slope!");
        document.getElementById('channelSlope').value = irre.cs;
        return;
    }
    else if(tmp <= 0){
        alert("Please input a positive number for channel slope!");
        document.getElementById('channelSlope').value = irre.cs;
        return;
    }
    else {
        irre.cs = tmp;
        localStorage.setItem("irre.cs", tmp)
        document.getElementById('discharge').value = irre.Qn.toFixed(2);
        update();
    }
}
function respondSelectN(e) {
    irre.nMethod = document.getElementById('selectN').value
    localStorage.setItem("irre.nMethod", irre.nMethod)
    document.getElementById('manningsN').value = irre.d2N(irre.dn);
    document.getElementById('discharge').value = irre.Qn.toFixed(2);
    update();
}
function respondNormalDepth(e) {
    var tmp = parseFloat(document.getElementById('normalDepth').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for normal depth!");
        document.getElementById('normalDepth').value = irre.dn;
        return;
    }
    else if(tmp <= 0){
        alert("Please input a positive number for normal depth!");
        document.getElementById('normalDepth').value = irre.dn;
        return;
    }
    else {
        irre.dn = tmp;
        localStorage.setItem("irre.dn", oc.isUSCustomary ? tmp : tmp * oc.m2ft);
        document.getElementById('discharge').value = irre.Qn.toFixed(2);
        update();
    }
}
function respondDischarge(e) {
    var tmp = parseFloat(document.getElementById('discharge').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for discharge!");
        document.getElementById('discharge').value = irre.Qn.toFixed(2);
    }
    else if(tmp <= 0){
        alert("Please input a positive number for discharge!");
        document.getElementById('discharge').value = irre.Qn.toFixed(2);
        return;
    }
    else {
        irre.dn = irre.Q2Dn(tmp);

        localStorage.setItem("irre.dn", oc.isUSCustomary ? irre.dn : irre.dn * oc.m2ft);
            
        document.getElementById('normalDepth').value = irre.dn.toFixed(2);
        update();
    }
}

function respondKeyup(e) {
    if(e.keyCode===13) {
        e.preventDefault();
    }
}

function addARow(){
    var tb = document.getElementById('geometryTable');
    var nr = tb.rows.length;
    var row = tb.rows[nr-1].cloneNode(true);
    for (var j = 0; j < row.cells.length; j++) {
        row.cells[j].innerHTML = '&nbsp;'
        if(j < 3) row.cells[j].tabIndex = 0;
    }
    tb.appendChild(row);
    
    if(document.getElementById('btnDeleteARow').disabled && tb.rows.length > 3)
        document.getElementById('btnDeleteARow').disabled = false;
}

function deleteARow(){
    var tableGeometry = document.getElementById('geometryTable');
    if(tableGeometry.rows.length >= 4) {
        if (tableGeometry.rows.length === 4)
            document.getElementById('btnDeleteARow').disabled = true;
        tableGeometry.deleteRow(-1);
    }
}

function applyGeometry(){
    var tableGeometry = document.getElementById('geometryTable');
    var tmpArr = [];
    var xs = [];
    var ys = [];
    var ns = [];
    //check if all numbers are positive
    for (var i = 0; i < tableGeometry.rows.length; i++) {
        //check if entire row empty
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
            
        for (var j = 0; j < tableGeometry.rows[i].cells.length; j++) {
            let tmp = parseFloat(tableGeometry.rows[i].cells[j].innerHTML); 
            //if not a number
            if (isNaN(tmp)) {
                alert('Please input a number!');
                tableGeometry.rows[i].cells[j].focus();    
                return;
            }
            else if(tmp < 0) {  //if negative
                alert('Please input a positive number!');
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
            alert('please input a station number >= previous station!');
            tableGeometry.rows[i].cells[0].focus();    
            return;
        }
    }
    
    for (var i = 0; i < ns.length; i++){
        if(ns[i] <= 0) {
            alert('please input a positive n value!');
            tableGeometry.rows[i].cells[2].focus();    
            return;
        }
    }
        
    var yb = Math.min(...ys);
    var ib = ys.indexOf(yb);
    
    if (ib === 0) {
        alert('We would not like the first station to be the bottom, please increase the elevation!');
        tableGeometry.rows[0].cells[1].focus();    
        return;
    }
        
    if (ib === (xs.length-1)) {
        alert('We would not like the last station to be the bottom, please increase the elevation!');
        tableGeometry.rows[ib].cells[1].focus();    
        return;
    }
    
    irre.geometry = null;
    irre.geometry = tmpArr;
    // save to local storage
    localStorage.setItem("irre.geometry", JSON.stringify(irre.geometry));

    initIrre();
    update();
}

function initIrre(){
    init();

    var tableGeometry = document.getElementById('geometryTable');
    var nRowTabl = tableGeometry.rows.length;
    var row = null;
    var i = 0;
    var tabindex = 0;
    
    for (i = 0; i < irre.geometry.length; i++) {
        if(i < tableGeometry.rows.length){
            for (var j = 0; j < tableGeometry.rows[i].cells.length; j++) {
                tableGeometry.rows[i].cells[j].innerHTML = irre.geometry[i][j];
                tableGeometry.rows[i].cells[j].tabIndex = tabindex;
                tableGeometry.rows[i].cells[j].addEventListener('keyup', respondKeyup);
            }
        }
        else {
            if(row == null)
                row = tableGeometry.rows[nRowTabl-1].cloneNode(true);
            else
                row = row.cloneNode(true);

            for (var j = 0; j < row.cells.length; j++) {
                row.cells[j].innerHTML = irre.geometry[i][j];
                row.cells[j].tabIndex = tabindex;
                row.cells[j].addEventListener('keyup', respondKeyup);
            }
            tableGeometry.appendChild(row);
        }
    }
    
    if(nRowTabl > irre.geometry.length){
        for (i; i < tableGeometry.rows.length; i++) {
            for (var j = 0; j < tableGeometry.rows[i].cells.length; j++) {
                tableGeometry.rows[i].cells[j].innerHTML = '';
                tableGeometry.rows[i].cells[j].tabIndex = tabindex;
                tableGeometry.rows[i].cells[j].addEventListener('keyup', respondKeyup);
            }
        }
    }

    
    
    if(!oc.isLightMode) {
        document.getElementById('geometryTable').style.background = 'black';
        document.getElementById('geometryTable').style.color = 'white';

        document.getElementById('selectN').style.background = 'black';
        document.getElementById('selectN').style.color = 'white';
    }
}

function setValues() {
    if(!(document.getElementById('area'))){
        return;
    }
    document.getElementById('area').innerHTML = irre.an.toFixed(3);
    document.getElementById('perimeter').innerHTML = irre.pn.toFixed(3);
    document.getElementById('velocity').innerHTML = irre.vn.toFixed(3);
    document.getElementById('criticalDepth').innerHTML = irre.dc.toFixed(3);
    document.getElementById('criticalVelocity').innerHTML = irre.vc.toFixed(3);
    document.getElementById('criticalSlope').innerHTML = irre.sc.toFixed(3);
    document.getElementById('froudeNumber').innerHTML = irre.fr.toFixed(3);
}

function update(){
    'use strict';
    
    setValues();

    var chart = document.getElementById('chart');
    if(chart == null){
        return;
    }
    
    //drawing 
    var xMin = irre.geometry[0][0];
    var xMax = irre.geometry[irre.geometry.length - 1][0];
    var yMin = irre.yBottom;
    var yMax = Math.max(irre.yLeft, irre.yRight);

    var scaleX = (chart.clientWidth - oc.offsetLeft - ocvw.offsetRight)/ (xMax - xMin);
    var scaleY = (chart.clientHeight - ocvw.offsetTop - ocvw.offsetBottom) / (yMax - yMin);

    var x0s = oc.offsetLeft + (irre.geometry[0][0] - xMin) * scaleX;
    var y0s = chart.clientHeight - ocvw.offsetBottom - (irre.geometry[0][1] - yMin) * scaleY;

    var pathChan = 'M' + x0s + ' ' + y0s;
    for (let i = 1; i < irre.geometry.length; i++) {
        let x1s = oc.offsetLeft + (irre.geometry[i][0] - xMin) * scaleX;
        let y1s = chart.clientHeight - ocvw.offsetBottom - (irre.geometry[i][1] - yMin) * scaleY;
        pathChan += ' L ' + x1s + ' ' + y1s;
    }
        
    var xnl = irre.d2xL(irre.dn);
    var xnr = irre.d2xR(irre.dn);
    var xnls = oc.offsetLeft + (xnl - xMin) * scaleX;
    var xnrs = oc.offsetLeft + (xnr - xMin) * scaleX;
    var yns = chart.clientHeight - ocvw.offsetBottom -(irre.yBottom + irre.dn - yMin) * scaleY;


    var xcl = irre.d2xL(irre.dc);
    var xcr = irre.d2xR(irre.dc);;
    var xcls = oc.offsetLeft + (xcl - xMin) * scaleX;
    var xcrs = oc.offsetLeft + (xcr - xMin) * scaleX;
    var ycs = chart.clientHeight - ocvw.offsetBottom - (irre.yBottom + irre.dc - yMin) * scaleY;

    
    document.getElementById('pathChan').setAttribute('d', pathChan);

    document.getElementById('pathNorm').setAttribute('d', 'M' + xnls + ' ' + yns + 'L' + xnrs + ' ' + yns);
    
    document.getElementById('pathCrit').setAttribute('d', 'M' + xcls + ' ' + ycs + 'L' + xcrs + ' ' + ycs);

    //draw grid lines;
    var xInc = niceIncrement(xMin, xMax);
    var xIncDraw = xInc * scaleX;
    
    //draw grid lines;
    let x = 0;
    let y = chart.clientHeight - ocvw.offsetBottom;
    let xDraw = oc.offsetLeft;
    var xGrid = '';
    var text;
    var xPos;
    var yPos;
    var idLabel;
    var i = 1;
    
    while (xDraw <= chart.clientWidth - ocvw.offsetRight){
        xGrid += 'M' + xDraw + ' ' + ocvw.offsetTop + 'L' + xDraw + ' ' + y;
        yPos = chart.clientHeight - 0.65 * ocvw.offsetBottom;
        idLabel = 'xTick' + i;
        document.getElementById(idLabel).setAttribute('x', xDraw);
        document.getElementById(idLabel).setAttribute('y', yPos);
        document.getElementById(idLabel).childNodes[0].textContent = x.toString();
        
        xDraw += xIncDraw;
        x += xInc;
        i += 1;
    }
    
    for (; i < 10; i++){
        idLabel = 'xTick' + i;
        document.getElementById(idLabel).childNodes[0].textContent = ' ';
    }

    document.getElementById('pathGridY').setAttribute('d', xGrid);

    var yInc = niceIncrement(yMin, yMax);
    var yIncDraw = yInc * scaleY;
    
    let yDraw = chart.clientHeight - ocvw.offsetBottom;
    var yGrid = '';
    x = chart.clientWidth - ocvw.offsetRight;
    y = 0;
    i = 1;
    while (yDraw > ocvw.offsetTop){
        yGrid += 'M' + oc.offsetLeft + ' ' + yDraw + 'L' + x + ' ' + yDraw;
        xPos = 0.70*oc.offsetLeft;
        idLabel = 'yTick' + i;
        text = y.toString();
        if(text.length > 10) {
            text = y.toFixed(yInc.countDecimals());
        }
        document.getElementById(idLabel).setAttribute("x", xPos);
        document.getElementById(idLabel).setAttribute("y", yDraw);
        document.getElementById(idLabel).childNodes[0].textContent = text;

        yDraw -= yIncDraw;
        y += yInc;
        i += 1;
    }

    for (; i < 10; i++){
        idLabel = 'yTick' + i;
        document.getElementById(idLabel).childNodes[0].textContent = ' ';
    }

    document.getElementById("pathGridX").setAttribute("d", yGrid);
    
    xPos = oc.offsetLeft + 0.5 * (chart.clientWidth - oc.offsetLeft - ocvw.offsetRight);
    yPos = chart.clientHeight - 0.25 * ocvw.offsetBottom;
    document.getElementById('xLabel').setAttribute("x", xPos);
    document.getElementById('xLabel').setAttribute("y", yPos);

}

