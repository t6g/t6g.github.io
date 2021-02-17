// JavaScript source code
'use strict'

const trap = new TrapezoidalChannel(3, 1, 3, 0.01, 0.05, 0.5);

window.onload = function () {
    checkLocalStorage();

    document.getElementById('leftSideSlope').setAttribute('value', trap.z1);
    document.getElementById('bottomWidth').setAttribute('value', trap.b.toFixed(2));
    document.getElementById('rightSideSlope').setAttribute('value', trap.z2);
    document.getElementById('channelSlope').setAttribute('value', trap.cs);
    document.getElementById('manningsN').setAttribute('value', trap.mN);
    document.getElementById('normalDepth').setAttribute('value', trap.dn.toFixed(2));
    document.getElementById('discharge').setAttribute('value', trap.Qn.toFixed(2));

    document.getElementById('leftSideSlope').addEventListener("change", respondLeftSideSlope);
    document.getElementById('bottomWidth').addEventListener("change", respondBottomWidth);
    document.getElementById('rightSideSlope').addEventListener("change", respondRightSideSlope);
    document.getElementById('channelSlope').addEventListener("change", respondChannelSlope);
    document.getElementById('manningsN').addEventListener("change", respondManningsN);
    document.getElementById('normalDepth').addEventListener("change", respondNormalDepth);
    document.getElementById('discharge').addEventListener("change", respondDischarge);

    update();
}

function checkLocalStorage() {
    var tmp = localStorage.getItem("trap.z1");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                trap.z1 = tmp;
            }
        }
    }

    tmp = localStorage.getItem("trap.b");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                trap.b = tmp;
            }
        }
    }

    tmp = localStorage.getItem("trap.z2");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                trap.z2 = tmp;
            }
        }
    }

    tmp = localStorage.getItem("trap.cs");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                trap.cs = tmp;
            }
        }
    }

    tmp = localStorage.getItem("trap.mN");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                trap.mN = tmp;
            }
        }
    }

    tmp = localStorage.getItem("trap.dn");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                trap.dn = tmp;
            }
        }
    }
    
    tmp = localStorage.getItem("oc.isUSCustomary");
    if (tmp !== null) oc.isUSCustomary = tmp ==="false" ? false : true;
    
    if(!oc.isUSCustomary) {
        trap.b /= oc.m2ft;
        trap.dn /= oc.m2ft;
    }
}


function respondLeftSideSlope(e) {
    var tmp = parseFloat(document.getElementById('leftSideSlope').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for left side slope!");
        document.getElementById('leftSideSlope').value = trap.z1;
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for left side slope!");
        document.getElementById('leftSideSlope').value = trap.z1;
        return;
    }
    else {
        trap.z1 = tmp;
        localStorage.setItem("trap.z1", tmp)
        document.getElementById('discharge').value =  trap.Qn.toFixed(2);
        update();
    }
}

function respondBottomWidth(e) {
    var tmp = parseFloat(document.getElementById('bottomWidth').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for bottom width!");
        document.getElementById('bottomWidth').value = tria.z2;
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for bottom width!");
        document.getElementById('rightSideSlope').value = trap.b;
        return;
    }
    else {
        trap.b = tmp;

        localStorage.setItem("trap.b", oc.isUSCustomary ? tmp : tmp * oc.m2ft);
            
        document.getElementById('discharge').value = trap.Qn.toFixed(2);
        update();
    }
}

function respondRightSideSlope(e) {
    var tmp = parseFloat(document.getElementById('rightSideSlope').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for right side slope!");
        document.getElementById('rightSideSlope').value = trap.z2;
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for right side slope!");
        document.getElementById('rightSideSlope').value = trap.z2;
        return;
    }
    else {
        trap.z2 = tmp;
        localStorage.setItem("trap.z2", tmp)
        document.getElementById('discharge').value = trap.Qn.toFixed(2);
        update();
   }
}
function respondChannelSlope(e) {
    var tmp = parseFloat(document.getElementById('channelSlope').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for channel slope!");
        document.getElementById('channelSlope').value = trap.cs;
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for channel slope!");
        document.getElementById('channelSlope').value = trap.cs;
        return;
    }
    else {
        trap.cs = tmp;
        localStorage.setItem("trap.cs", tmp)
        document.getElementById('discharge').value = trap.Qn.toFixed(2);
        update();
    }
}
function respondManningsN(e) {
    var tmp = parseFloat(document.getElementById('manningsN').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for manningsN!");
        document.getElementById('manningsN').value = trap.mN;
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for Manning's N!");
        document.getElementById('manningsN').value = trap.mN;
        return;
    }
    else {
        trap.mN = tmp;
        localStorage.setItem("trap.mN", tmp)
        document.getElementById('discharge').value = trap.Qn.toFixed(2);
        update();
    }
}
function respondNormalDepth(e) {
    var tmp = parseFloat(document.getElementById('normalDepth').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for normal depth!");
        document.getElementById('normalDepth').value = trap.dn;
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for normal depth!");
        document.getElementById('normalDepth').value = trap.dn;
        return;
    }
    else {
        trap.dn = tmp;
        localStorage.setItem("trap.dn", oc.isUSCustomary ? tmp : tmp * oc.m2ft);
            
        document.getElementById('discharge').value = trap.Qn.toFixed(2);
        update();
    }
}
function respondDischarge(e) {
    var tmp = parseFloat(document.getElementById('discharge').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for discharge!");
        document.getElementById('discharge').value = trap.Qn.toFixed(2);
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for discharge!");
        document.getElementById('discharge').value = trap.Qn.toFixed(2);
        return;
    }
    else {
        trap.dn = trap.Q2Dn(tmp);
        localStorage.setItem("trap.dn", oc.isUSCustomary ? trap.dn : trap.dn * oc.m2ft);
            
        document.getElementById('normalDepth').value = trap.dn.toFixed(2);
        update();
    }
}

function initTrap(){
    init();

    if(!oc.isUSCustomary){
        document.getElementById("bwUnit").childNodes[0].textContent = "m";
    }

    if(!oc.isLightMode) {
        document.getElementById('leftSideSlope').style.background = 'black';
        document.getElementById('leftSideSlope').style.color = 'white';

        document.getElementById('rightSideSlope').style.background = 'black';
        document.getElementById('rightSideSlope').style.color = 'white';

        document.getElementById('bottomWidth').style.background = 'black';
        document.getElementById('bottomWidth').style.color = 'white';
    }
}

function setValues() {
    if(!(document.getElementById('area'))){
        return;
    }
    document.getElementById('area').innerHTML = trap.an.toFixed(3);
    document.getElementById('perimeter').innerHTML = trap.pn.toFixed(3);
    document.getElementById('velocity').innerHTML = trap.vn.toFixed(3);
    document.getElementById('criticalDepth').innerHTML = trap.dc.toFixed(3);
    document.getElementById('criticalVelocity').innerHTML = trap.vc.toFixed(3);
    document.getElementById('criticalSlope').innerHTML = trap.sc.toFixed(3);
    document.getElementById('froudeNumber').innerHTML = trap.fr.toFixed(3);

}

function update(){
    'use strict';

    setValues();
    
    var chart = document.getElementById('chart');
    if(chart == null){
        return;
    }
      
    //drawing 
    var xMin = 0;
    var xMax = trap.depth * (trap.z1 + trap.z2) + trap.b;
    var yMin = 0;
    var yMax = trap.depth;

    var scaleX = (chart.clientWidth - oc.offsetLeft - oc.offsetRight)/ (xMax - xMin);
    var scaleY = (chart.clientHeight - oc.offsetTop - oc.offsetBottom) / (yMax - yMin);

    var x0 = 0.0;
    var y0 = trap.depth;
    var x0s = oc.offsetLeft + (x0 - xMin) * scaleX;
    var y0s = chart.clientHeight - oc.offsetBottom - (y0 - yMin) * scaleY;

    var x1 = trap.depth * trap.z1;
    var y1 = 0;
    var x1s = oc.offsetLeft + (x1 - xMin) * scaleX;
    var y1s = chart.clientHeight - oc.offsetBottom - (y1 - yMin) * scaleY;

    var x2 = trap.depth * trap.z1 + trap.b;
    var x2s = oc.offsetLeft + (x2 - xMin) * scaleX;
    
    var x3 = trap.depth * (trap.z1 + trap.z2) + trap.b;
    var x3s = oc.offsetLeft + (x3 - xMin) * scaleX;

    var xnl = (trap.depth - trap.dn) * trap.z1;
    var xnr = trap.depth * trap.z1 + trap.b + trap.dn * trap.z2;
    var xnls = oc.offsetLeft + (xnl - xMin) * scaleX;
    var xnrs = oc.offsetLeft + (xnr - xMin) * scaleX;
    var yns = chart.clientHeight - oc.offsetBottom -(trap.dn - yMin) * scaleY;


    var xcl = (trap.depth - trap.dc) * trap.z1;
    var xcr = trap.depth * trap.z1 + trap.b + trap.dc * trap.z2;
    var xcls = oc.offsetLeft + (xcl - xMin) * scaleX;
    var xcrs = oc.offsetLeft + (xcr - xMin) * scaleX;
    var ycs = chart.clientHeight - oc.offsetBottom - (trap.dc - yMin) * scaleY;

    
    document.getElementById('pathChan').setAttribute('d', 'M' + x0s + ' ' + y0s + ' L ' + x1s + ' ' + y1s + ' L ' + x2s + ' ' + y1s + ' L ' + x3s + ' ' + y0s);

    document.getElementById('pathNorm').setAttribute('d', 'M' + xnls + ' ' + yns + 'L' + xnrs + ' ' + yns);
    
    document.getElementById('pathCrit').setAttribute('d', 'M' + xcls + ' ' + ycs + 'L' + xcrs + ' ' + ycs);

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

