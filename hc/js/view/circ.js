// JavaScript source code
'use strict'

const circ = new CircularChannel(24, 0.01, 0.013, 1.88);

window.onload = function () {

    checkLocalStorage();

    document.getElementById('diameter').value = (oc.isUSCustomary ? circ.r * 12 * 2 : circ.r * 1000 * 2).toFixed(0);
    document.getElementById('channelSlope').setAttribute('value', circ.cs);
    document.getElementById('manningsN').setAttribute('value', circ.mN);
    document.getElementById('normalDepth').setAttribute('value', circ.dn.toFixed(2));
    document.getElementById('discharge').setAttribute('value', circ.Qn.toFixed(2));

    document.getElementById('select').addEventListener("change", respondSelect);
    document.getElementById('diameter').addEventListener("change", respondDiameter);
    document.getElementById('channelSlope').addEventListener("change", respondChannelSlope);
    document.getElementById('manningsN').addEventListener("change", respondManningsN);
    document.getElementById('normalDepth').addEventListener("change", respondNormalDepth);
    document.getElementById('discharge').addEventListener("change", respondDischarge);

    update();
}

function checkLocalStorage() {
    var tmp = localStorage.getItem("circ.r");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                circ.r = tmp;
                if (circ.dn > 2 * tmp) {
                    circ.dn = 2 * tmp;
                }
            }
        }
    }

    tmp = localStorage.getItem("circ.cs");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                circ.cs = tmp;
            }
        }
    }

    tmp = localStorage.getItem("circ.mN");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                circ.mN = tmp;
            }
        }
    }

    tmp = localStorage.getItem("circ.dn");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                if (tmp <= 2.0 * circ.r) {
                    circ.dn = tmp;
                }
                else {
                    circ.dn = 2.0 * circ.r;
                }
            }
        }
    }
    
    tmp = localStorage.getItem("oc.isUSCustomary");
    if (tmp !== null) oc.isUSCustomary = tmp ==="false" ? false : true;
    
    if(!oc.isUSCustomary) {
        circ.r /= oc.m2ft;
        circ.dn /= oc.m2ft;
    }
}

function respondSelect(e) {
    let tmp = document.getElementById('select').value;
    document.getElementById('diameter').value = oc.isUSCustomary ?  tmp : tmp * 25.4;
    respondDiameter(e);
    document.getElementById('select').value = '';
}

function respondDiameter(e) {
    var tmp = parseFloat(document.getElementById('diameter').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for diameter!");
        if(oc.isUSCustomary) document.getElementById('diameter').value = circ.r * 24;
        else document.getElementById('diameter').value = circ.r * 2000;
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for diameter!");
        if(oc.isUSCustomary) document.getElementById('diameter').value = circ.r * 24;
        else document.getElementById('diameter').value = circ.r * 2000;
        return;
    }
    else{
        if(oc.isUSCustomary) tmp /= 12.0;
        else tmp /= 1000.0;

        if (tmp < circ.dn) {
            alert('Normal depth is lowered to diameter!');
            circ.dn = tmp;
            document.getElementById('normalDepth').value =  circ.dn.toFixed(2);
        }
        circ.r = tmp / 2.0;

        localStorage.setItem("circ.r", oc.isUSCustomary ? circ.r : circ.r * oc.m2ft);
            
        document.getElementById('discharge').value =  circ.Qn.toFixed(2);
        update();
    }
}

function respondChannelSlope(e) {
    var tmp = parseFloat(document.getElementById('channelSlope').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for channel slope!");
        document.getElementById('channelSlope').value = circ.cs;
        return;
    }
    else if (tmp <= 0){
        alert("Please input a positive number for channel slope!");
        document.getElementById('channelSlope').value = circ.cs;
        return;
    }
    else {
        circ.cs = tmp;
        localStorage.setItem("circ.cs", tmp)
        document.getElementById('discharge').value = circ.Qn.toFixed(2);
        update();
    }
}
function respondManningsN(e) {
    var tmp = parseFloat(document.getElementById('manningsN').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for manningsN!");
        document.getElementById('manningsN').value = circ.mN;
        return;
    } else if(tmp <= 0){
        alert("Please input a positive number for manningsN!");
        document.getElementById('manningsN').value = circ.mN;
        return;
    }
    else {
        circ.mN = tmp;
        localStorage.setItem("circ.mN", tmp)
        document.getElementById('discharge').value = circ.Qn.toFixed(2);
        update();
    }
}
function respondNormalDepth(e) {
    var tmp = parseFloat(document.getElementById('normalDepth').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for normal depth!");
        document.getElementById('normalDepth').value = circ.dn;
        return;
    } 
    else if(tmp <= 0) {
        alert("Please input a possive number for normal depth!");
        document.getElementById('normalDepth').value = circ.dn;
        return;
    }
    else if(tmp > 2.0 * circ.r) {
        alert('Please input a normal depth <= diameter!');
        document.getElementById('normalDepth').value = circ.dn;
        return;
    }
    else {
        circ.dn = tmp;

        localStorage.setItem("circ.dn", oc.isUSCustomary ? tmp : tmp * oc.m2ft);
            
        document.getElementById('discharge').value = circ.Qn.toFixed(2);
        update();
    }
}
function respondDischarge(e) {
    var tmp = parseFloat(document.getElementById('discharge').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for discharge!");
        document.getElementById('discharge').value = circ.Qn.toFixed(2);
        return;
    }
    else if(tmp <= 0) {
        alert("Please input a positive number for discharge!");
        document.getElementById('discharge').value = circ.Qn.toFixed(2);
        return;
    }
    else if(tmp >= circ.Qmax){
        alert('Please input a discharge <= ' + circ.Qmax.toFixed(2));
        document.getElementById('discharge').value = circ.Qn.toFixed(2);
        return;
    }
    else {
        circ.dn = circ.Q2Dn(tmp);
        localStorage.setItem("circ.dn", oc.isUSCustomary ? circ.dn : circ.dn * oc.m2ft);
            
        document.getElementById('normalDepth').value = circ.dn.toFixed(2);
        update();
    }
}

function initCirc(){
    init(true);
    
    if(!oc.isUSCustomary){
        document.getElementById("diamUnit").childNodes[0].textContent = "mm";
        /*
        let diametersInmm = [ 150,  200,  250,  300,  375,  450,  525,  600,  675,  750, 
                              825,  900, 1050, 1200, 1350, 1500, 1650, 1800, 1950, 2100,
                             2250, 2400, 2550, 2700, 2850, 3000, 3150, 3300, 3450, 3600];
        var sels = document.getElementById('select').options;
        for (let i = 1; i < sels.length; i++) {
            sels[i].value = diametersInmm[i];
            sels[i].innerHTML = diametersInmm[i];
        }*/
    }
    
    if(!oc.isLightMode) {
        document.getElementById('select').style.background = 'black';
        document.getElementById('select').style.color = 'white';

        document.getElementById('diameter').style.background = 'black';
        document.getElementById('diameter').style.color = 'white';
    }
    
}

function setValues() {
    if(!(document.getElementById('area'))){
        return;
    }
    document.getElementById('area').innerHTML = circ.an.toFixed(3);
    document.getElementById('perimeter').innerHTML = circ.pn.toFixed(3);
    document.getElementById('velocity').innerHTML = circ.vn.toFixed(3);
    document.getElementById('criticalDepth').innerHTML = circ.dc.toFixed(3);
    document.getElementById('criticalVelocity').innerHTML = circ.vc.toFixed(3);
    document.getElementById('criticalSlope').innerHTML = circ.sc.toFixed(3);
    document.getElementById('froudeNumber').innerHTML = circ.fr.toFixed(3);
    document.getElementById('capacity').innerHTML = circ.Qmax.toFixed(3);
    document.getElementById('ymax').innerHTML = circ.ymax.toFixed(3);

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
    var xMax = 2.0 * circ.r;
    var yMin = 0;
    var yMax = 2.0 * circ.r;

    var scaleX = (chart.clientWidth - oc.offsetLeft - oc.offsetRight)/ (xMax - xMin);
    var scaleY = (chart.clientHeight - oc.offsetTop - oc.offsetBottom) / (yMax - yMin);

    if(scaleX >= scaleY){
        scaleX = scaleY;
    }
    else{
        scaleY = scaleX;
    }

    var rxs = circ.r * scaleX;
    var rys = circ.r * scaleY;
    
    var dxs = 0.5 * (-oc.offsetLeft + chart.clientWidth - oc.offsetRight) - rxs; //displacement for x to move circle to the middle
    
    var x0 = 0;
    var y0 = circ.r;
    var x0s = oc.offsetLeft + (x0 - xMin) * scaleX + dxs;
    var y0s = chart.clientHeight - oc.offsetBottom - (y0 - yMin) * scaleY;

    var xnl = circ.r * (1.0 - Math.sin(0.5 * circ.thetan));
    var xnr = circ.r * (1.0 + Math.sin(0.5 * circ.thetan));
    var xnls = oc.offsetLeft + (xnl - xMin) * scaleX + dxs;
    var xnrs = oc.offsetLeft + (xnr - xMin) * scaleX + dxs;
    var yns = chart.clientHeight - oc.offsetBottom -(circ.dn - yMin) * scaleY;


    var xcl = circ.r * (1.0 - Math.sin(0.5 * circ.thetac));
    var xcr = circ.r * (1.0 + Math.sin(0.5 * circ.thetac));
    var xcls = oc.offsetLeft + (xcl - xMin) * scaleX + dxs;
    var xcrs = oc.offsetLeft + (xcr - xMin) * scaleX + dxs;
    var ycs = chart.clientHeight - oc.offsetBottom - (circ.dc - yMin) * scaleY;

    
    document.getElementById('pathChan').setAttribute('d', 'M' + x0s + ' ' + y0s + ' a ' + rxs + ' ' + rys + ' 0 1 0 ' + 2.0* rxs + ' 0 ' + ' a ' + rxs + ' ' + rys + ' 0 1 0 -' + 2.0* rxs + ' 0 ');

    document.getElementById('pathNorm').setAttribute('d', 'M' + xnls + ' ' + yns + 'L' + xnrs + ' ' + yns);
    
    document.getElementById('pathCrit').setAttribute('d', 'M' + xcls + ' ' + ycs + 'L' + xcrs + ' ' + ycs);

    //draw grid lines;
    var xInc = niceIncrement(xMin, xMax);
    var xIncDraw = xInc * scaleX;
    
    //draw grid lines;
    let x = 0;
    let y = chart.clientHeight - oc.offsetBottom;
    let xmid = 0.5 * (oc.offsetLeft + chart.clientWidth - oc.offsetRight);
    let xDraw = xmid;
    var xGrid = '';
    var text;
    var xPos;
    var yPos = chart.clientHeight - 0.65 * oc.offsetBottom;
    var idLabel;
    var i = 1;
    
    while (xDraw <= chart.clientWidth - oc.offsetRight && i <= 5){
        xGrid += 'M' + xDraw + ' ' + oc.offsetTop + 'L' + xDraw + ' ' + y;
        idLabel = 'xTick' + i;
        text = x.toString();
        if(text.length > 10) {
            text = x.toFixed(xInc.countDecimals());
        }
        document.getElementById(idLabel).setAttribute('x', xDraw);
        document.getElementById(idLabel).setAttribute('y', yPos);
        document.getElementById(idLabel).childNodes[0].textContent = text;
        xDraw += xIncDraw;
        x += xInc;
        i += 1;
    }
    
    x = 0;
    xDraw = xmid;
    while (xDraw > oc.offsetLeft + xIncDraw && i <= 10){
        xDraw -= xIncDraw;
        xGrid += 'M' + xDraw + ' ' + oc.offsetTop + 'L' + xDraw + ' ' + y;

        idLabel = 'xTick' + i;
        x -= xInc;
        text = x.toString();
        if(text.length > 10) {
            text = x.toFixed(xInc.countDecimals());
        }
        document.getElementById(idLabel).setAttribute('x', xDraw);
        document.getElementById(idLabel).setAttribute('y', yPos);
        document.getElementById(idLabel).childNodes[0].textContent = text;
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

