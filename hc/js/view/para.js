// JavaScript source code
'use strict'

const para = new ParabolicChannel(10, 1, 0.01, 0.05, 0.5);

window.onload = function () {
    checkLocalStorage();

    document.getElementById('topWidth').setAttribute('value', para.tw.toFixed(2));
    document.getElementById('channelDepth').setAttribute('value', para.cd.toFixed(2));
    document.getElementById('channelSlope').setAttribute('value', para.cs);
    document.getElementById('manningsN').setAttribute('value', para.mN);
    document.getElementById('normalDepth').setAttribute('value', para.dn.toFixed(2));
    document.getElementById('discharge').setAttribute('value', para.Qn.toFixed(2));

    document.getElementById('topWidth').addEventListener("change", respondTopWidth);
    document.getElementById('channelDepth').addEventListener("change", respondChannelDepth);
    document.getElementById('channelSlope').addEventListener("change", respondChannelSlope);
    document.getElementById('manningsN').addEventListener("change", respondManningsN);
    document.getElementById('normalDepth').addEventListener("change", respondNormalDepth);
    document.getElementById('discharge').addEventListener("change", respondDischarge);

    update();
}

function checkLocalStorage() {
    var tmp = localStorage.getItem("para.tw");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                para.tw = tmp;
            }
        }
    }

    tmp = localStorage.getItem("para.cd");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                paraa.cd = tmp;
            }
        }
    }

    tmp = localStorage.getItem("para.cs");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                para.cs = tmp;
            }
        }
    }

    tmp = localStorage.getItem("para.mN");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                para.mN = tmp;
            }
        }
    }

    tmp = localStorage.getItem("para.dn");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                para.dn = oc.isUSCustomary ? tmp : tmp /3.28;
            }
        }
    }

    tmp = localStorage.getItem("oc.isUSCustomary");
    if (tmp !== null) oc.isUSCustomary = tmp ==="false" ? false : true;
    
    if(!oc.isUSCustomary) {
        para.tw /= oc.m2ft;
        para.cd /= oc.m2ft;
        para.dn /= oc.m2ft;
    }
    
}


function respondTopWidth(e) {
    var tmp = parseFloat(document.getElementById('topWidth').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for top width!");
        document.getElementById('topWidth').value = para.tw;
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for top width!");
        document.getElementById('topWidth').value = tria.tw;
        return;
    }
    else {
        para.tw = tmp;
        localStorage.setItem("para.tw", oc.isUSCustomary ? tmp : tmp * oc.m2ft);
            
        document.getElementById('discharge').value =  para.Qn.toFixed(2);
        update();
    }
}

function respondChannelDepth(e) {
    var tmp = parseFloat(document.getElementById('channelDepth').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for channel depth!");
        document.getElementById('channelDepth').value = para.cd;
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for channel depth!");
        document.getElementById('channeldepth').value = para.cd;
        return;
    }
    else {
        para.cd = tmp;
        localStorage.setItem("para.cd", oc.isUSCustomary ? tmp : tmp * oc.m2ft);
            
        document.getElementById('discharge').value = para.Qn.toFixed(2);
        update();
    }
}

function respondChannelSlope(e) {
    var tmp = parseFloat(document.getElementById('channelSlope').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for channel slope!");
        document.getElementById('channelSlope').value = para.cs;
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for channel slope!");
        document.getElementById('channelSlope').value = para.cs;
        return;
    }
    else {
        para.cs = tmp;
        localStorage.setItem("para.cs", tmp)
        document.getElementById('discharge').value = para.Qn.toFixed(2);
        update();
    }
}
function respondManningsN(e) {
    var tmp = parseFloat(document.getElementById('manningsN').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for manningsN!");
        document.getElementById('manningsN').value = para.mN;
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for Manning's N!");
        document.getElementById('manningsN').value = para.mN;
        return;
    }
    else {
        para.mN = tmp;
        localStorage.setItem("para.mN", tmp)
        document.getElementById('discharge').value = para.Qn.toFixed(2);
        update();
    }
}
function respondNormalDepth(e) {
    var tmp = parseFloat(document.getElementById('normalDepth').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for normal depth!");
        document.getElementById('normalDepth').value = para.dn;
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for normal depth!");
        document.getElementById('normalDepth').value = para.dn;
        return;
    }
    else {
        para.dn = tmp;
        localStorage.setItem("para.dn", oc.isUSCustomary ? tmp : tmp * oc.m2ft);
            
        document.getElementById('discharge').value = para.Qn.toFixed(2);
        update();
    }
}
function respondDischarge(e) {
    var tmp = parseFloat(document.getElementById('discharge').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for discharge!");
        document.getElementById('discharge').value = para.Qn.toFixed(2);
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for discharge!");
        document.getElementById('discharge').value = para.Qn.toFixed(2);
        return;
    }
    else {
        para.dn = para.Q2Dn(tmp);
        localStorage.setItem("para.dn", oc.isUSCustomary ? para.dn : para.dn * oc.m2ft);
        document.getElementById('normalDepth').value = para.dn.toFixed(2);
        update();
    }
}

function initPara(){
    init();

    if(!oc.isUSCustomary){
        document.getElementById("twUnit").childNodes[0].textContent = "m";
        document.getElementById("cdUnit").childNodes[0].textContent = "m";
    }

    if(!oc.isLightMode) {
        document.getElementById('topWidth').style.background = 'black';
        document.getElementById('topWidth').style.color = 'white';

        document.getElementById('channelDepth').style.background = 'black';
        document.getElementById('channelDepth').style.color = 'white';
    }
}

function setValues() {
    if(!(document.getElementById('area'))){
        return;
    }
    document.getElementById('area').innerHTML = para.an.toFixed(3);
    document.getElementById('perimeter').innerHTML = para.pn.toFixed(3);
    document.getElementById('velocity').innerHTML = para.vn.toFixed(3);
    document.getElementById('criticalDepth').innerHTML = para.dc.toFixed(3);
    document.getElementById('criticalVelocity').innerHTML = para.vc.toFixed(3);
    document.getElementById('criticalSlope').innerHTML = para.sc.toFixed(3);
    document.getElementById('froudeNumber').innerHTML = para.fr.toFixed(3);

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
    document.getElementById('axesRect').setAttribute('y', ocvw.offsetTop);
    document.getElementById('axesRect').setAttribute('width', chart.clientWidth- oc.offsetLeft - ocvw.offsetRight);
    document.getElementById('axesRect').setAttribute('height', chart.clientHeight - ocvw.offsetTop - ocvw.offsetBottom);
    
    //drawing 
    var xMin = 0;
    var xMax = para.tw;
    var yMin = 0;
    var yMax = para.cd;

    var scaleX = (chart.clientWidth - oc.offsetLeft - ocvw.offsetRight)/ (xMax - xMin);
    var scaleY = (chart.clientHeight - ocvw.offsetTop - ocvw.offsetBottom) / (yMax - yMin);

    var x0 = 0;
    var y0 = para.cd;
    var x0s = oc.offsetLeft + (x0 - xMin) * scaleX;
    var y0s = chart.clientHeight - ocvw.offsetBottom - (y0 - yMin) * scaleY;

    var x1 = 0.5 * para.tw;
    var y1 = -para.cd;
    var x1s = oc.offsetLeft + (x1 - xMin) * scaleX;
    var y1s = chart.clientHeight - ocvw.offsetBottom - (y1 - yMin) * scaleY;

    var x2 = para.tw;
    var x2s = oc.offsetLeft + (x2 - xMin) * scaleX;
    
    var xnl = 0.5 * para.tw - 0.5 * para.tw * Math.sqrt(para.dn / para.cd);
    var xnr = 0.5 * para.tw + 0.5 * para.tw * Math.sqrt(para.dn / para.cd);;
    var xnls = oc.offsetLeft + (xnl - xMin) * scaleX;
    var xnrs = oc.offsetLeft + (xnr - xMin) * scaleX;
    var yns = chart.clientHeight - ocvw.offsetBottom -(para.dn - yMin) * scaleY;


    var xcl = 0.5 * para.tw - 0.5 * para.tw * Math.sqrt(para.dc / para.cd);
    var xcr = 0.5 * para.tw + 0.5 * para.tw * Math.sqrt(para.dc / para.cd);;
    var xcls = oc.offsetLeft + (xcl - xMin) * scaleX;
    var xcrs = oc.offsetLeft + (xcr - xMin) * scaleX;
    var ycs = chart.clientHeight - ocvw.offsetBottom - (para.dc - yMin) * scaleY;

    
    document.getElementById('pathChan').setAttribute('d', 'M' + x0s + ' ' + y0s + ' Q ' + x1s + ' ' + y1s + ' ' + x2s + ' ' + y0s);

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

