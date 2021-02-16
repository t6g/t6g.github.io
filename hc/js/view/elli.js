// JavaScript source code
'use strict'

const elli = new EllipticalChannel(12, 18, 0.01, 0.013, 0.5);

window.onload = function () {

    checkLocalStorage();

    document.getElementById('span').value = oc.isUSCustomary ? elli.a * 24 : elli.a * 2000;
    document.getElementById('rise').value = oc.isUSCustomary ? elli.b * 24 : elli.b * 2000;
    document.getElementById('channelSlope').setAttribute('value', elli.cs);
    document.getElementById('manningsN').setAttribute('value', elli.mN);
    document.getElementById('normalDepth').setAttribute('value', elli.dn);
    document.getElementById('discharge').setAttribute('value', elli.Qn.toFixed(2));

    //setValues();

    document.getElementById('select').addEventListener("change", respondSelect);
    document.getElementById('span').addEventListener("change", respondSpan);
    document.getElementById('rise').addEventListener("change", respondRise);
    document.getElementById('channelSlope').addEventListener("change", respondChannelSlope);
    document.getElementById('manningsN').addEventListener("change", respondManningsN);
    document.getElementById('normalDepth').addEventListener("change", respondNormalDepth);
    document.getElementById('discharge').addEventListener("change", respondDischarge);

    //updateGraph();
    update();
}

function checkLocalStorage() {
    var tmp = localStorage.getItem("elli.a");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                elli.a = oc.isUSCustomary ? tmp : tmp / 3.28;
            }
        }
    }

    var tmp = localStorage.getItem("elli.b");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                elli.b = oc.isUSCustomary ? tmp : tmp / 3.28;
                if (elli.dn > 2 * tmp) {
                    elli.dn = 2.0 * tmp;
                }
            }
        }
    }

    tmp = localStorage.getItem("elli.cs");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                elli.cs = tmp;
            }
        }
    }

    tmp = localStorage.getItem("elli.mN");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                elli.mN = tmp;
            }
        }
    }

    tmp = localStorage.getItem("elli.dn");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                
                if(oc.isUSCustomary) tmp = tmp / 3.28;
                
                if (tmp <= 2.0 * elli.b) {
                    elli.dn = tmp;
                }
                else {
                    elli.dn = 2.0 * elli.b;
                }
            }
        }
    }
}

function respondSelect(e) {
    // get selection
    var tmp = document.getElementById('select').value;
    var idx = tmp.indexOf('x');

    //validate
    //span
    var span = tmp.substring(0, idx);
    
    if (isNaN(span)) {
        alert("Please input a valid number for span!");
        return;
    }
    else if (span <= 0) {
        alert("Please input a positive number for span!");
        return;
    }

    //rise
    var rise = tmp.substring(idx+1);

    if (isNaN(rise)) {
        alert("Please input a valid number for rise!");
        return;
    }
    else if (rise <= 0) {
        alert("Please input a positive number for rise!");
        return;
    }
    
    //set span
    document.getElementById('span').value = oc.isUSCustomary ? span : span * 25.4;
    elli.a = oc.isUSCustomary ? span / 24 : span / 2000;
    
    if(oc.isUSCustomary)
        localStorage.setItem("elli.a", elli.a);
    else
        localStorage.setItem("elli.a", elli.a * 3.28);
        
    //set rise
    document.getElementById('rise').value = oc.isUSCustomary ? rise : rise * 25.4;

    rise /= oc.isUSCustomary ? 12.0 : 1000.0;
        
    if (rise < elli.dn) {
        alert('Normal depth is lowered to rise!');
        elli.dn = rise;
        document.getElementById('normalDepth').value = elli.dn.toFixed(2);
    }

    elli.b = rise / 2.0;
    if(oc.isUSCustomary)
        localStorage.setItem("elli.b", elli.b);
    else
        localStorage.setItem("elli.b", elli.b * 3.28);

    document.getElementById('discharge').value =  elli.Qn.toFixed(2);

    update();

    document.getElementById('select').value = '';
}


function respondSpan(e) {
    var tmp = parseFloat(document.getElementById('span').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for span!");
        document.getElementById('span').value = oc.isUSCustomary ? elli.a * 24: elli.a * 2000;
        return;
    }
    else if (tmp <= 0) {
            alert("Please input a positive number for span!");
            document.getElementById('span').value = oc.isUSCustomary ? elli.a * 24: elli.a * 2000;
            return;
    }
    else{
        elli.a = oc.isUSCustomary ? tmp / 24.0 : tmp / 2000;
        
        if(oc.isUSCustomary)
            localStorage.setItem("elli.a", elli.a);
        else
            localStorage.setItem("elli.a", elli.a * 3.28);
            
        document.getElementById('discharge').value =  elli.Qn.toFixed(2);
        update();
    }
}

function respondRise(e) {
    var tmp = parseFloat(document.getElementById('rise').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for rise!");
        document.getElementById('rise').value = oc.isUSCustomary ? elli.b * 24 : elli.b * 2000;
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for rise!");
        document.getElementById('rise').value = oc.isUSCustomary ? elli.b * 24 : elli.b * 2000;
        return;
    }
    else {
        tmp /= oc.isUSCustomary ? 12 : 1000;
        if (tmp < elli.dn) {
            alert('Normal depth is lowered to rise!');
            elli.dn = tmp;
            document.getElementById('normalDepth').value = elli.dn.toFixed(2);
        }
        elli.b = tmp / 2.0;
        if(oc.isUSCustomary)
            localStorage.setItem("elli.b", elli.b);
        else
            localStorage.setItem("elli.b", elli.b * 3.28);
            
        document.getElementById('discharge').value = elli.Qn.toFixed(2);
        update();
    }
}

function respondChannelSlope(e) {
    var tmp = parseFloat(document.getElementById('channelSlope').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for channel slope!");
        document.getElementById('channelSlope').value = elli.cs;
        return;
    }
    else if (tmp <= 0){
        alert("Please input a positive number for channel slope!");
        document.getElementById('channelSlope').value = elli.cs;
        return;
    }
    else {
        elli.cs = tmp;
        localStorage.setItem("elli.cs", elli.cs);
        document.getElementById('discharge').value = elli.Qn.toFixed(2);
        update();
    }
}
function respondManningsN(e) {
    var tmp = parseFloat(document.getElementById('manningsN').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for manningsN!");
        document.getElementById('manningsN').value = elli.mN;
        return;
    } else if(tmp <= 0){
        alert("Please input a positive number for manningsN!");
        document.getElementById('manningsN').value = elli.mN;
        return;
    }
    else {
        elli.mN = tmp;
        localStorage.setItem("elli.mN", elli.mN);
        document.getElementById('discharge').value = elli.Qn.toFixed(2);
        update();
    }
}
function respondNormalDepth(e) {
    var tmp = parseFloat(document.getElementById('normalDepth').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for normal depth!");
        document.getElementById('normalDepth').value = elli.dn;
        return;
    } 
    else if(tmp <= 0) {
        alert("Please input a possive number for normal depth!");
        document.getElementById('normalDepth').value = elli.dn;
        return;
    }
    else if(tmp > 2.0 * elli.b) {
        alert('Please input a normal depth <= rise!');
        document.getElementById('normalDepth').value = elli.dn;
        return;
    }
    else {
        elli.dn = tmp;
        if(oc.isUSCustomary)
            localStorage.setItem("elli.dn", elli.dn);
        else
            localStorage.setItem("elli.dn", elli.dn * 3.28);
            
        document.getElementById('discharge').value = elli.Qn.toFixed(2);
        update();
    }
}
function respondDischarge(e) {
    var tmp = parseFloat(document.getElementById('discharge').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for discharge!");
        document.getElementById('discharge').value = elli.Qn.toFixed(2);
        return;
    }
    else if(tmp <= 0) {
        alert("Please input a positive number for discharge!");
        document.getElementById('discharge').value = elli.Qn.toFixed(2);
        return;
    }
    else if(tmp >= elli.Qmax){
        alert('Please input a discharge <= ' + elli.Qmax.toFixed(2));
        document.getElementById('discharge').value = elli.Qn.toFixed(2);
        return;
    }
    else {
        elli.dn = elli.Q2Dn(tmp);
        if(oc.isUSCustomary)
            localStorage.setItem("elli.dn", elli.dn);
        else
            localStorage.setItem("elli.dn", elli.dn * 3.28);
            
        document.getElementById('normalDepth').value = elli.dn.toFixed(2);
        update();
    }
}

function setValues() {

    if(!(document.getElementById('area'))){
        return;
    }
    
    document.getElementById('area').innerHTML = elli.an.toFixed(3);
    document.getElementById('perimeter').innerHTML = elli.pn.toFixed(3);
    document.getElementById('velocity').innerHTML = elli.vn.toFixed(3);
    document.getElementById('criticalDepth').innerHTML = elli.dc.toFixed(3);
    document.getElementById('criticalVelocity').innerHTML = elli.vc.toFixed(3);
    document.getElementById('criticalSlope').innerHTML = elli.sc.toFixed(3);
    document.getElementById('froudeNumber').innerHTML = elli.fr.toFixed(3);
    document.getElementById('capacity').innerHTML = elli.Qmax.toFixed(3);
    document.getElementById('ymax').innerHTML = elli.ymax.toFixed(3);

    //hideRbRtRc();
}
function initElli(){
    init(true);

    if(!oc.isUSCustomary){
        document.getElementById("aUnit").childNodes[0].textContent = "mm";
        document.getElementById("bUnit").childNodes[0].textContent = "mm";
/*
        let diametersInmm = [  '460x280',   '575x365',   '770x490',   '865x550',   '960x610', 
                              '1055x670',  '1150x730',  '1250x795',  '1345x855',  '1535x975', 
                              '1730x1095', '1920x1220', '2110x1340', '2305x1465', '2495x1585', 
                              '2690x1705', '2880x1830', '3070x1950', '3265x2075', '3455x2195', 
                              '3648x2315', '3840x2440', '4225x2680', '4610x2925'];
        var sels = document.getElementById('select').options;
        for (let i = 1; i < sels.length; i++) {
            sels[i].value = diametersInmm[i];
            sels[i].innerHTML = diametersInmm[i];
        } */
    }
}

function update(){
    'use strict';

    setValues();

    var chart = document.getElementById('chart');
    if(chart == null){
        return;
    }
      
    //document.getElementById('axesRect').setAttribute('x', oc.offsetLeft);
    //document.getElementById('axesRect').setAttribute('y', oc.offsetTop);
    //document.getElementById('axesRect').setAttribute('width', chart.clientWidth- oc.offsetLeft - oc.offsetRight);
    //document.getElementById('axesRect').setAttribute('height', chart.clientHeight - oc.offsetTop - oc.offsetBottom);
    
    //drawing 
    var xMin = 0;
    var xMax = 2.0 * elli.a;
    var yMin = 0;
    var yMax = 2.0 * elli.b;

    var scaleX = (chart.clientWidth - oc.offsetLeft - oc.offsetRight)/ (xMax - xMin);
    var scaleY = (chart.clientHeight - oc.offsetTop - oc.offsetBottom) / (yMax - yMin);

    if(scaleX >= scaleY){
        scaleX = scaleY;
    }
    else{
        scaleY = scaleX;
    }

    var rxs = elli.a * scaleX;
    var rys = elli.b * scaleY;
    
    var dxs = 0.5 * (-oc.offsetLeft + chart.clientWidth - oc.offsetRight) - rxs; //displacement for x to move circle to the middle
    
    var x0 = 0;
    var y0 = elli.b;
    var x0s = oc.offsetLeft + (x0 - xMin) * scaleX + dxs;
    var y0s = chart.clientHeight - oc.offsetBottom - (y0 - yMin) * scaleY;

    var xnl = elli.a * (1.0 - Math.sin(elli.alphan));
    var xnr = elli.a * (1.0 + Math.sin(elli.alphan));
    var xnls = oc.offsetLeft + (xnl - xMin) * scaleX + dxs;
    var xnrs = oc.offsetLeft + (xnr - xMin) * scaleX + dxs;
    var yns = chart.clientHeight - oc.offsetBottom -(elli.dn - yMin) * scaleY;


    var xcl = elli.a * (1.0 - Math.sin(elli.alphac));
    var xcr = elli.a * (1.0 + Math.sin(elli.alphac));
    var xcls = oc.offsetLeft + (xcl - xMin) * scaleX + dxs;
    var xcrs = oc.offsetLeft + (xcr - xMin) * scaleX + dxs;
    var ycs = chart.clientHeight - oc.offsetBottom - (elli.dc - yMin) * scaleY;

    
    document.getElementById('pathChan').setAttribute('d', 'M' + x0s + ' ' + y0s + ' a ' + rxs + ' ' + rys + ' 0 1 0 ' + 2.0* rxs + ' 0 ' + ' a ' + rxs + ' ' + rys + ' 0 1 0 -' + 2.0* rxs + ' 0 ');

    document.getElementById('pathNorm').setAttribute('d', 'M' + xnls + ' ' + yns + 'L' + xnrs + ' ' + yns);
    
    document.getElementById('pathCrit').setAttribute('d', 'M' + xcls + ' ' + ycs + 'L' + xcrs + ' ' + ycs);

    //draw grid lines;
    var yInc = niceIncrement(yMin, yMax);
    var yIncDraw = yInc * scaleY;
    
    var xInc = niceIncrement(xMin, xMax);

    if(xInc < yInc){
        xInc = yInc;
    }
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

