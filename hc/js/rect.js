// JavaScript source code
'use strict'
class RectangularChannel extends OpenChannel {
    constructor(b, cs, mN, dn) {
        super(cs, mN, dn);
        this.b = b;
    }

    //getters
    get an() {
        return this.b * this.dn;
    }
    get pn() {
        return this.b + 2.0 * this.dn;
    }
    get ac() {
        return this.b * this.dc;
    }
    get pc() {
        return this.b + 2.0 * this.dc;
    }
    get vc() {
        return Math.sqrt(gUS * this.dc);
    }
    get dc() {
        return Math.pow(this.Qn * this.Qn / gUS / this.b / this.b, 1.0 / 3.0);
    }
    Q2Dn(Q) {
        var A, P, dAdy, dPdy, f = 10.0, df;
        var deltay = 10.0;
        var yi = 0.5;
        if (Q <= 0){
            return 0;
        }
        var count = 0;

        dPdy = 2.0;
        dAdy = this.b;

        while (Math.abs(deltay) > TolD && Math.abs(f) > TolQ)
        {
                A = this.b * yi;
                P = this.b + 2.0 * yi;
                f = KuUS / this.mN * Math.sqrt(this.cs) * Math.pow(A, 5.0 / 3.0) * Math.pow(P, -2.0 / 3.0) - Q;
                df = KuUS / this.mN * Math.sqrt(this.cs) * (5.0 / 3.0 * Math.pow(A / P, 2.0 / 3.0) * dAdy - 2.0 / 3.0 * Math.pow(A / P, 5.0 / 3.0) * dPdy);
                deltay = f / df;
                yi -= deltay;
                count++;
                if (count > MaxCount) break;
            }
        return yi;
    }
}

const rect = new RectangularChannel(1, 0.01, 0.05, 0.5);

window.onload = function () {

    //check localstorage
    checkLocalStorage();

    document.getElementById('bottomWidth').setAttribute('value', rect.b);
    document.getElementById('channelSlope').setAttribute('value', rect.cs);
    document.getElementById('manningsN').setAttribute('value', rect.mN);
    document.getElementById('normalDepth').setAttribute('value', rect.dn);
    document.getElementById('discharge').setAttribute('value', rect.Qn.toFixed(2));

    setValues();

    document.getElementById('bottomWidth').addEventListener("change", respondBottomWidth);
    document.getElementById('channelSlope').addEventListener("change", respondChannelSlope);
    document.getElementById('manningsN').addEventListener("change", respondManningsN);
    document.getElementById('normalDepth').addEventListener("change", respondNormalDepth);
    document.getElementById('discharge').addEventListener("change", respondDischarge);

    updateGraph();
}

function checkLocalStorage() {
    var tmp = localStorage.getItem("rect.b");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                rect.b = tmp;
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
                rect.dn = tmp;
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
        localStorage.setItem("rect.b", tmp)
        setValues();
        document.getElementById('discharge').value =  rect.Qn.toFixed(2);
        updateGraph();
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
        setValues();
        document.getElementById('discharge').value = rect.Qn.toFixed(2);
        updateGraph();
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
        setValues();
        document.getElementById('discharge').value = rect.Qn.toFixed(2);
        updateGraph();
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
        localStorage.setItem("rect.dn", tmp)
        setValues();
        document.getElementById('discharge').value = rect.Qn.toFixed(2);
        updateGraph();
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
        localStorage.setItem("rect.dn", tmp)
        setValues();
        document.getElementById('normalDepth').value = rect.dn.toFixed(2);
        updateGraph();
    }
}

function setValues() {
    document.getElementById('area').innerHTML = rect.an.toFixed(3);
    document.getElementById('perimeter').innerHTML = rect.pn.toFixed(3);
    document.getElementById('velocity').innerHTML = rect.vn.toFixed(3);
    document.getElementById('criticalDepth').innerHTML = rect.dc.toFixed(3);
    document.getElementById('criticalVelocity').innerHTML = rect.vc.toFixed(3);
    document.getElementById('criticalSlope').innerHTML = rect.sc.toFixed(3);
    document.getElementById('froudeNumber').innerHTML = rect.fr.toFixed(3);
}

function updateGraph(){
    'use strict';

    var chart = document.getElementById('chart');
    if(chart == null){
        return;
    }
      
    document.getElementById('axesRect').setAttribute('x', offsetLeft);
    document.getElementById('axesRect').setAttribute('y', offsetTop);
    document.getElementById('axesRect').setAttribute('width', chart.clientWidth- offsetLeft - offsetRight);
    document.getElementById('axesRect').setAttribute('height', chart.clientHeight - offsetTop - offsetBottom);
    
    //drawing 
    var xMin = 0;
    var xMax = rect.b
    var yMin = 0;
    var yMax = rect.depth;

    var scaleX = (chart.clientWidth - offsetLeft - offsetRight)/ (xMax - xMin);
    var scaleY = (chart.clientHeight - offsetTop - offsetBottom) / (yMax - yMin);

    var x0 = 0.0;
    var y0 = rect.depth;
    var x0s = offsetLeft + (x0 - xMin) * scaleX;
    var y0s = chart.clientHeight - offsetBottom - (y0 - yMin) * scaleY;

    var x1 = rect.b;
    var y1 = 0;
    var x1s = offsetLeft + (x1 - xMin) * scaleX;
    var y1s = chart.clientHeight - offsetBottom - (y1 - yMin) * scaleY;

    var yns = chart.clientHeight - offsetBottom -(rect.dn - yMin) * scaleY;

    var ycs = chart.clientHeight - offsetBottom - (rect.dc - yMin) * scaleY;

    
    document.getElementById('pathChan').setAttribute('d', 'M ' + x0s + ' ' + y0s + ' V ' + y1s + ' H' + x1s + ' V' + y0s);

    document.getElementById('pathNorm').setAttribute('d', 'M ' + x0s + ' ' + yns + ' L ' + x1s + ' ' + yns);
    
    document.getElementById('pathCrit').setAttribute('d', 'M ' + x0s + ' ' + ycs + ' L ' + x1s + ' ' + ycs);

    //draw grid lines;
    var xInc = niceIncrement(xMin, xMax);
    var xIncDraw = xInc * scaleX;
    
    //draw grid lines;
    let x = 0;
    let y = chart.clientHeight - offsetBottom;
    let xDraw = offsetLeft;
    var xGrid = '';
    var text;
    var xPos;
    var yPos;
    var idLabel;
    var i = 1;
    
    while (xDraw <= chart.clientWidth - offsetRight){
        xGrid += 'M' + xDraw + ' ' + offsetTop + 'L' + xDraw + ' ' + y;
        yPos = chart.clientHeight - 0.65 * offsetBottom;
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
    
    let yDraw = chart.clientHeight - offsetBottom;
    var yGrid = '';
    x = chart.clientWidth - offsetRight;
    y = 0;
    i = 1;
    while (yDraw > offsetTop){
        yGrid += 'M' + offsetLeft + ' ' + yDraw + 'L' + x + ' ' + yDraw;
        xPos = 0.70*offsetLeft;
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
    
    xPos = offsetLeft + 0.5 * (chart.clientWidth - offsetLeft - offsetRight);
    yPos = chart.clientHeight - 0.25 * offsetBottom;
    document.getElementById('xLabel').setAttribute("x", xPos);
    document.getElementById('xLabel').setAttribute("y", yPos);
    
}
