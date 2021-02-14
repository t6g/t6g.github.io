// JavaScript source code
'use strict'

const tria = new TriangularChannel(3, 3, 0.01, 0.05, 0.5);

window.onload = function () {

    setLightDarkMode();

    //check localstorage
    checkLocalStorage();

    document.getElementById('leftSideSlope').setAttribute('value', tria.z1);
    document.getElementById('rightSideSlope').setAttribute('value', tria.z2);
    document.getElementById('channelSlope').setAttribute('value', tria.cs);
    document.getElementById('manningsN').setAttribute('value', tria.mN);
    document.getElementById('normalDepth').setAttribute('value', tria.dn);
    document.getElementById('discharge').setAttribute('value', tria.Qn.toFixed(2));

    document.getElementById('leftSideSlope').addEventListener("change", respondLeftSideSlope);
    document.getElementById('rightSideSlope').addEventListener("change", respondRightSideSlope);
    document.getElementById('channelSlope').addEventListener("change", respondChannelSlope);
    document.getElementById('manningsN').addEventListener("change", respondManningsN);
    document.getElementById('normalDepth').addEventListener("change", respondNormalDepth);
    document.getElementById('discharge').addEventListener("change", respondDischarge);

    //document.getElementById('myCanvas').addEventListener("re")
    
    //drawCanvas();
    update();
}

function checkLocalStorage() {
    var tmp = localStorage.getItem("tria.z1");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                tria.z1 = tmp;
            }
        }
    }

    tmp = localStorage.getItem("tria.z2");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                tria.z2 = tmp;
            }
        }
    }

    tmp = localStorage.getItem("tria.cs");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                tria.cs = tmp;
            }
        }
    }

    tmp = localStorage.getItem("tria.mN");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                tria.mN = tmp;
            }
        }
    }

    tmp = localStorage.getItem("tria.dn");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                tria.dn = tmp;
            }
        }
    }
}

function respondLeftSideSlope(e) {
    var tmp = parseFloat(document.getElementById('leftSideSlope').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for left side slope!");
        document.getElementById('leftSideSlope').value = tria.z1;
        return;
    }
    else if(tmp <= 0){
        alert("Please input a positive number for left side slope!");
        document.getElementById('leftSideSlope').value = tria.z1;
        return;
    }
    else {
        tria.z1 = tmp;
        localStorage.setItem("tria.z1", tmp)
        document.getElementById('discharge').value =  tria.Qn.toFixed(2);
        update();
    }
}

function respondRightSideSlope(e) {
    var tmp = parseFloat(document.getElementById('rightSideSlope').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for right side slope!");
        document.getElementById('rightSideSlope').value = tria.z2;
        return;
    }
    else if(tmp <= 0){
        alert("Please input a positive number for right side slope!");
        document.getElementById('rightSideSlope').value = tria.z2;
        return;
    }
    else {
        tria.z2 = tmp;
        localStorage.setItem("tria.z2", tmp)
        document.getElementById('discharge').value = tria.Qn.toFixed(2);
        update();
    }
}
function respondChannelSlope(e) {
    var tmp = parseFloat(document.getElementById('channelSlope').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for channel slope!");
        document.getElementById('channelSlope').value = tria.cs;
        return;
    }
    else if(tmp <= 0){
        alert("Please input a positive number for channel slope!");
        document.getElementById('channelSlope').value = tria.cs;
        return;
    }
    else {
        tria.cs = tmp;
        localStorage.setItem("tria.cs", tmp)
        document.getElementById('discharge').value = tria.Qn.toFixed(2);
        update();
    }
}
function respondManningsN(e) {
    var tmp = parseFloat(document.getElementById('manningsN').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for manningsN!");
        document.getElementById('manningsN').value = tria.mN;
        return;
    }
    else if(tmp <= 0){
        alert("Please input a positive number for Manning's N!");
        document.getElementById('manningsN').value = tria.mN;
        return;
    }
    else {
        tria.mN = tmp;
        localStorage.setItem("tria.mN", tmp)
        document.getElementById('discharge').value = tria.Qn.toFixed(2);
        update();
    }
}
function respondNormalDepth(e) {
    var tmp = parseFloat(document.getElementById('normalDepth').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for normal depth!");
        document.getElementById('normalDepth').value = tria.dn;
        return;
    }
    else if(tmp <= 0){
        alert("Please input a positive number for normal depth!");
        document.getElementById('normalDepth').value = tria.dn;
        return;
    }
    else {
        tria.dn = tmp;
        localStorage.setItem("tria.dn", tmp)
        document.getElementById('discharge').value = tria.Qn.toFixed(2);
        update();
    }
}
function respondDischarge(e) {
    var tmp = parseFloat(document.getElementById('discharge').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for discharge!");
        document.getElementById('discharge').value = tria.Qn.toFixed(2);
    }
    else if(tmp <= 0){
        alert("Please input a positive number for discharge!");
        document.getElementById('discharge').value = tria.Qn.toFixed(2);
        return;
    }
    else {
        tria.dn = tria.Q2Dn(tmp);
        localStorage.setItem("tria.dn", tmp)
        document.getElementById('normalDepth').value = tria.dn.toFixed(2);
        update();
    }
}

function setValues() {
    if(!(document.getElementById('area'))){
        return;
    }
    document.getElementById('area').innerHTML = tria.an.toFixed(3);
    document.getElementById('perimeter').innerHTML = tria.pn.toFixed(3);
    document.getElementById('velocity').innerHTML = tria.vn.toFixed(3);
    document.getElementById('criticalDepth').innerHTML = tria.dc.toFixed(3);
    document.getElementById('criticalVelocity').innerHTML = tria.vc.toFixed(3);
    document.getElementById('criticalSlope').innerHTML = tria.sc.toFixed(3);
    document.getElementById('froudeNumber').innerHTML = tria.fr.toFixed(3);
    
    w3.hide('#spanCapacity');
    w3.hide('#spanYmax');

    hideRbRtRc();
}

function update(){
    'use strict';
    
    setValues();

    var chart = document.getElementById('chart');
    if(chart == null){
        return;
    }
    
      
    document.getElementById('axesRect').setAttribute('x', oc.offsetLeft);
    document.getElementById('axesRect').setAttribute('y', oc.offsetTop);
    document.getElementById('axesRect').setAttribute('width', chart.clientWidth- oc.offsetLeft - oc.offsetRight);
    document.getElementById('axesRect').setAttribute('height', chart.clientHeight - oc.offsetTop - oc.offsetBottom);
    
    //drawing 
    var xMin = 0;
    var xMax = tria.depth * (tria.z1 + tria.z2)
    var yMin = 0;
    var yMax = tria.depth;

    var scaleX = (chart.clientWidth - oc.offsetLeft - oc.offsetRight)/ (xMax - xMin);
    var scaleY = (chart.clientHeight - oc.offsetTop - oc.offsetBottom) / (yMax - yMin);

    var x0 = 0.0;
    var y0 = tria.depth;
    var x0s = oc.offsetLeft + (x0 - xMin) * scaleX;
    var y0s = chart.clientHeight - oc.offsetBottom - (y0 - yMin) * scaleY;

    var x1 = tria.depth * tria.z1;
    var y1 = 0;
    var x1s = oc.offsetLeft + (x1 - xMin) * scaleX;
    var y1s = chart.clientHeight - oc.offsetBottom - (y1 - yMin) * scaleY;

    var x2 = tria.depth * (tria.z1 + tria.z2);
    var x2s = oc.offsetLeft + (x2 - xMin) * scaleX;

    var xnl = (tria.depth - tria.dn) * tria.z1;
    var xnr = tria.depth * tria.z1 + tria.dn * tria.z2;
    var xnls = oc.offsetLeft + (xnl - xMin) * scaleX;
    var xnrs = oc.offsetLeft + (xnr - xMin) * scaleX;
    var yns = chart.clientHeight - oc.offsetBottom -(tria.dn - yMin) * scaleY;


    var xcl = (tria.depth - tria.dc) * tria.z1;
    var xcr = tria.depth * tria.z1 + tria.dc * tria.z2;
    var xcls = oc.offsetLeft + (xcl - xMin) * scaleX;
    var xcrs = oc.offsetLeft + (xcr - xMin) * scaleX;
    var ycs = chart.clientHeight - oc.offsetBottom - (tria.dc - yMin) * scaleY;

    
    document.getElementById('pathChan').setAttribute('d', 'M' + x0s + ' ' + y0s + 'L' + x1s + ' ' + y1s + 'L' + x2s + ' ' + y0s);

    document.getElementById('pathNorm').setAttribute('d', 'M' + xnls + ' ' + yns + 'L' + xnrs + ' ' + yns);
    
    document.getElementById('pathCrit').setAttribute('d', 'M' + xcls + ' ' + ycs + 'L' + xcrs + ' ' + ycs);

    if (oc.isDarkMode) {
        document.getElementById('pathChan').setAttribute('stroke', 'white');
        document.getElementById('axesRect').setAttribute('stroke', 'white');
    }
    
    //draw grid lines;
    var xInc = niceIncrement(xMin, xMax);
    var xIncDraw = xInc * scaleX;
    
    //draw grid lines;
    let x = 0;
    let y = chart.clientHeight - oc.offsetBottom;
    let xDraw = oc.offsetLeft;
    var xGrid = '';
    var text;
    var xPos;
    var yPos;
    var idLabel;
    var i = 1;
    
    while (xDraw <= chart.clientWidth - oc.offsetRight){
        xGrid += 'M' + xDraw + ' ' + oc.offsetTop + 'L' + xDraw + ' ' + y;
        yPos = chart.clientHeight - 0.65 * oc.offsetBottom;
        idLabel = 'xTick' + i;
        document.getElementById(idLabel).setAttribute('x', xDraw);
        document.getElementById(idLabel).setAttribute('y', yPos);
        document.getElementById(idLabel).childNodes[0].textContent = x.toString();
        if (oc.isDarkMode) {
            document.getElementById(idLabel).setAttribute('fill', 'white');
        }
        
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
    
    let yDraw = chart.clientHeight - oc.offsetBottom;
    var yGrid = '';
    x = chart.clientWidth - oc.offsetRight;
    y = 0;
    i = 1;
    while (yDraw > oc.offsetTop){
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
        if (oc.isDarkMode) {
            document.getElementById(idLabel).setAttribute('fill', 'white');
        }
        yDraw -= yIncDraw;
        y += yInc;
        i += 1;
    }

    for (; i < 10; i++){
        idLabel = 'yTick' + i;
        document.getElementById(idLabel).childNodes[0].textContent = ' ';
    }

    document.getElementById("pathGridX").setAttribute("d", yGrid);
    
    xPos = oc.offsetLeft + 0.5 * (chart.clientWidth - oc.offsetLeft - oc.offsetRight);
    yPos = chart.clientHeight - 0.25 * oc.offsetBottom;
    document.getElementById('xLabel').setAttribute("x", xPos);
    document.getElementById('xLabel').setAttribute("y", yPos);

    if (oc.isDarkMode) {
        document.getElementById('xLabel').setAttribute('fill', 'white');
        document.getElementById('yLabel').setAttribute('fill', 'white');
        document.getElementById('navTria').setAttribute('fill', 'white');
        document.getElementById('navTrap').setAttribute('fill', 'white');
        document.getElementById('navRect').setAttribute('fill', 'white');
        document.getElementById('navCirc').setAttribute('fill', 'white');
        document.getElementById('navElli').setAttribute('fill', 'white');
        document.getElementById('navPara').setAttribute('fill', 'white');
        document.getElementById('navArch').setAttribute('fill', 'white');
        document.getElementById('navSett').setAttribute('fill', 'white');
        document.getElementById('svgGroup').setAttribute('fill', 'white');
    }
    
}

