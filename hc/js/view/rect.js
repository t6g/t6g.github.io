// JavaScript source code
'use strict'

const rect = new RectangularChannel(1, 0.01, 0.05, 0.5);

window.onload = function () {

    //check localstorage
    checkLocalStorage();

    document.getElementById('bottomWidth').setAttribute('value', rect.b);
    document.getElementById('channelSlope').setAttribute('value', rect.cs);
    document.getElementById('manningsN').setAttribute('value', rect.mN);
    document.getElementById('normalDepth').setAttribute('value', rect.dn);
    document.getElementById('discharge').setAttribute('value', rect.Qn.toFixed(2));

    document.getElementById('bottomWidth').addEventListener("change", respondBottomWidth);
    document.getElementById('channelSlope').addEventListener("change", respondChannelSlope);
    document.getElementById('manningsN').addEventListener("change", respondManningsN);
    document.getElementById('normalDepth').addEventListener("change", respondNormalDepth);
    document.getElementById('discharge').addEventListener("change", respondDischarge);

    update();
}

function checkLocalStorage() {
    var tmp = localStorage.getItem("rect.b");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                rect.b = oc.isUSCustomary ? tmp : tmp / 3.28;
            }
        }
    }

    tmp = localStorage.getItem("rect.cs");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                rect.cs = tmp;
            }
        }
    }

    tmp = localStorage.getItem("rect.mN");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                rect.mN = tmp;
            }
        }
    }

    tmp = localStorage.getItem("rect.dn");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                rect.dn = oc.isUSCustomary ? tmp : tmp / 3.28;
            }
        }
    }
}

function respondBottomWidth(e) {
    var tmp = parseFloat(document.getElementById('bottomWidth').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for bottom width!");
        document.getElementById('bottomWidth').value = rect.b;
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for bottom width!");
        document.getElementById('bottomWidth').value = rect.b;
        return;
    }

    else {
        rect.b = tmp;
        if(oc.isUSCustomary)
            localStorage.setItem("rect.b", tmp);
        else
            localStorage.setItem("rect.b", tmp * 3.28);
        
        document.getElementById('discharge').value =  rect.Qn.toFixed(2);
        update();
    }
}

function respondChannelSlope(e) {
    var tmp = parseFloat(document.getElementById('channelSlope').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for channel slope!");
        document.getElementById('channelSlope').value = rect.cs;
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for channel slope!");
        document.getElementById('channelSlope').value = rect.cs;
        return;
    }
    else {
        rect.cs = tmp;
        localStorage.setItem("rect.cs", tmp)
        document.getElementById('discharge').value = rect.Qn.toFixed(2);
        update();
    }
}
function respondManningsN(e) {
    var tmp = parseFloat(document.getElementById('manningsN').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for manningsN!");
        document.getElementById('manningsN').value = rect.mN;
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for Manning's N!");
        document.getElementById('manningsN').value = rect.mN;
        return;
    }
    else {
        rect.mN = tmp;
        localStorage.setItem("rect.mN", tmp)
        document.getElementById('discharge').value = rect.Qn.toFixed(2);
        update();
    }
}
function respondNormalDepth(e) {
    var tmp = parseFloat(document.getElementById('normalDepth').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for normal depth!");
        document.getElementById('normalDepth').value = rect.dn;
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for Manning's N!");
        document.getElementById('normalDepth').value = rect.dn;
        return;
    }
    else {
        rect.dn = tmp;
        if(oc.isUSCustomary)
            localStorage.setItem("rect.dn", tmp)
        else
            localStorage.setItem("rect.dn", tmp * 3.28)
            
        document.getElementById('discharge').value = rect.Qn.toFixed(2);
        update();
    }
}
function respondDischarge(e) {
    var tmp = parseFloat(document.getElementById('discharge').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for discharge!");
        document.getElementById('discharge').value = rect.Qn.toFixed(2);
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for discharge!");
        document.getElementById('discharge').value = rect.Qn.toFixed(2);
        return;
    }
    else {
        rect.dn = rect.Q2Dn(tmp);
        
        if(oc.isUSCustomary)
            localStorage.setItem("rect.dn", rect.dn);
        else
            localStorage.setItem("rect.dn", rect.dn * 3.28);
            
        document.getElementById('normalDepth').value = rect.dn.toFixed(2);
        update();
    }
}

function initRect(){
    init();

    if(!oc.isUSCustomary){
        document.getElementById("bwUnit").childNodes[0].textContent = "m";
    }
}


function setValues() {
    if(!(document.getElementById('area'))){
       return;
    }
    document.getElementById('area').innerHTML = rect.an.toFixed(3);
    document.getElementById('perimeter').innerHTML = rect.pn.toFixed(3);
    document.getElementById('velocity').innerHTML = rect.vn.toFixed(3);
    document.getElementById('criticalDepth').innerHTML = rect.dc.toFixed(3);
    document.getElementById('criticalVelocity').innerHTML = rect.vc.toFixed(3);
    document.getElementById('criticalSlope').innerHTML = rect.sc.toFixed(3);
    document.getElementById('froudeNumber').innerHTML = rect.fr.toFixed(3);

    //w3.hide('#spanCapacity');
    //w3.hide('#spanYmax');

    //hideRbRtRc();

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
    var xMax = rect.b
    var yMin = 0;
    var yMax = rect.depth;

    var scaleX = (chart.clientWidth - oc.offsetLeft - oc.offsetRight)/ (xMax - xMin);
    var scaleY = (chart.clientHeight - oc.offsetTop - oc.offsetBottom) / (yMax - yMin);

    var x0 = 0.0;
    var y0 = rect.depth;
    var x0s = oc.offsetLeft + (x0 - xMin) * scaleX;
    var y0s = chart.clientHeight - oc.offsetBottom - (y0 - yMin) * scaleY;

    var x1 = rect.b;
    var y1 = 0;
    var x1s = oc.offsetLeft + (x1 - xMin) * scaleX;
    var y1s = chart.clientHeight - oc.offsetBottom - (y1 - yMin) * scaleY;

    var yns = chart.clientHeight - oc.offsetBottom -(rect.dn - yMin) * scaleY;

    var ycs = chart.clientHeight - oc.offsetBottom - (rect.dc - yMin) * scaleY;

    
    document.getElementById('pathChan').setAttribute('d', 'M ' + x0s + ' ' + y0s + ' V ' + y1s + ' H' + x1s + ' V' + y0s);

    document.getElementById('pathNorm').setAttribute('d', 'M ' + x0s + ' ' + yns + ' L ' + x1s + ' ' + yns);
    
    document.getElementById('pathCrit').setAttribute('d', 'M ' + x0s + ' ' + ycs + ' L ' + x1s + ' ' + ycs);

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
        text = x.toString();
        if (text.length > 10) {
            text = x.toFixed(xInc.countDecimals());
        }
        document.getElementById(idLabel).childNodes[0].textContent = text;
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
    
}
