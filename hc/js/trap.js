// JavaScript source code
'use strict'

class TrapezoidalChannel extends OpenChannel {
    constructor(z1, b, z2, cs, mN, dn) {
        super(cs, mN, dn);
        this.z1 = z1;
        this.b = b;
        this.z2 = z2;
    }

    //getters
    get an() {
        return this.b * this.dn  + 0.5 * (this.z1 + this.z2) * this.dn * this.dn;
    }
    get pn() {
        return this.b + (Math.sqrt(1.0 + this.z1 * this.z1) + Math.sqrt(1.0 + this.z2 * this.z2)) * this.dn;
    }
    get ac() {
        return this.b * this.dc + 0.5 * (this.z1 + this.z2) * this.dc * this.dc;
    }
    get pc() {
        return this.b + (Math.sqrt(1.0 + this.z1 * this.z1) + Math.sqrt(1.0 + this.z2 * this.z2)) * this.dc;
    }

    get vc() {
        var dclocal = this.dc;
        var dAdy = (this.z1 + this.z2) * dclocal + this.b;
        var Dh = this.ac / dAdy;
        return Math.sqrt(gUS * Dh);
    }
    get dc() {
        var A, dAdy, d2Ady2, f = 10.0, df;
        var deltay = 10.0;
        var count = 0;
        var yi;
        var Q = this.Qn;

        d2Ady2 = this.z1 + this.z2;

        //use Equations in Table 2.1 French 1985 to estimate yi
        if (Q / Math.pow(this.b, 2.5) < 0.1){
            yi = Math.pow(Q * Q / gUS / this.b / this.b, 1.0 / 3.0);
        }
        else {
            yi = 0.81 * Math.pow((Q * Q / gUS * Math.pow(0.5 * (this.z1 + this.z2), -0.75) * Math.pow(this.b, -1.25)), 0.27) - this.b / 15.0 / (this.z1 + this.z2);
        }

        while (Math.abs(deltay) > TolD && Math.abs(f) > TolD)
        {
            A = this.b * yi + 1.0 / 2.0 * yi * yi * (this.z1 + this.z2);
            dAdy = this.b + (this.z1 + this.z2) * yi;
            f = gUS * A * A * A - Q * Q * dAdy;
            df = 3.0 * gUS * A * A * dAdy - Q * Q * d2Ady2;
            deltay = f / df;
            yi -= deltay;
            count++;
            if (count > MaxCount) break;
        }
        return yi;
    }
    Q2Dn(Q) {
        var A, P, dAdy, dPdy, f = 10.0, df;
        var deltay = 10.0;
        var yi = 0.5;
        var count = 0;

        if (Q <= 0) {
            this.dn = 0.0;
            return;
        }
                
        
        dPdy = Math.sqrt(1.0 + this.z1 * this.z1) + Math.sqrt(1.0 + this.z2 * this.z2);

        while (Math.abs(deltay) > TolD && Math.abs(f) > TolD) {
            A = this.b * yi + 1.0 / 2.0 * yi * yi * (this.z1 + this.z2);
            dAdy = this.b + (this.z1 + this.z2) * yi;
            //P = b + (Math.Sqrt(1.0 + z1 * z1) + Math.Sqrt(1.0 + z2 * z2)) * yi;
            P = this.b + dPdy * yi;
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

const trap = new TrapezoidalChannel(3, 1, 3, 0.01, 0.05, 0.5);

window.onload = function () {
    checkLocalStorage();

    document.getElementById('leftSideSlope').setAttribute('value', trap.z1);
    document.getElementById('bottomWidth').setAttribute('value', trap.b);
    document.getElementById('rightSideSlope').setAttribute('value', trap.z2);
    document.getElementById('channelSlope').setAttribute('value', trap.cs);
    document.getElementById('manningsN').setAttribute('value', trap.mN);
    document.getElementById('normalDepth').setAttribute('value', trap.dn);
    document.getElementById('discharge').setAttribute('value', trap.Qn.toFixed(2));

    setValues();

    document.getElementById('leftSideSlope').addEventListener("change", respondLeftSideSlope);
    document.getElementById('bottomWidth').addEventListener("change", respondBottomWidth);
    document.getElementById('rightSideSlope').addEventListener("change", respondRightSideSlope);
    document.getElementById('channelSlope').addEventListener("change", respondChannelSlope);
    document.getElementById('manningsN').addEventListener("change", respondManningsN);
    document.getElementById('normalDepth').addEventListener("change", respondNormalDepth);
    document.getElementById('discharge').addEventListener("change", respondDischarge);

    updateGraph();
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
        setValues();
        document.getElementById('discharge').value =  trap.Qn.toFixed(2);
        updateGraph();
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
        localStorage.setItem("trap.b", tmp)
        setValues();
        document.getElementById('discharge').value = trap.Qn.toFixed(2);
        updateGraph();
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
        setValues();
        document.getElementById('discharge').value = trap.Qn.toFixed(2);
        updateGraph();
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
        setValues();
        document.getElementById('discharge').value = trap.Qn.toFixed(2);
        updateGraph();
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
        setValues();
        document.getElementById('discharge').value = trap.Qn.toFixed(2);
        updateGraph();
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
        localStorage.setItem("trap.dn", tmp)
        setValues();
        document.getElementById('discharge').value = trap.Qn.toFixed(2);
        updateGraph();
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
        localStorage.setItem("trap.dn", tmp)
        setValues();
        document.getElementById('normalDepth').value = trap.dn.toFixed(2);
        updateGraph();
    }
}

function setValues() {
    document.getElementById('area').innerHTML = trap.an.toFixed(3);
    document.getElementById('perimeter').innerHTML = trap.pn.toFixed(3);
    document.getElementById('velocity').innerHTML = trap.vn.toFixed(3);
    document.getElementById('criticalDepth').innerHTML = trap.dc.toFixed(3);
    document.getElementById('criticalVelocity').innerHTML = trap.vc.toFixed(3);
    document.getElementById('criticalSlope').innerHTML = trap.sc.toFixed(3);
    document.getElementById('froudeNumber').innerHTML = trap.fr.toFixed(3);
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
    var xMax = trap.depth * (trap.z1 + trap.z2) + trap.b;
    var yMin = 0;
    var yMax = trap.depth;

    var scaleX = (chart.clientWidth - offsetLeft - offsetRight)/ (xMax - xMin);
    var scaleY = (chart.clientHeight - offsetTop - offsetBottom) / (yMax - yMin);

    var x0 = 0.0;
    var y0 = trap.depth;
    var x0s = offsetLeft + (x0 - xMin) * scaleX;
    var y0s = chart.clientHeight - offsetBottom - (y0 - yMin) * scaleY;

    var x1 = trap.depth * trap.z1;
    var y1 = 0;
    var x1s = offsetLeft + (x1 - xMin) * scaleX;
    var y1s = chart.clientHeight - offsetBottom - (y1 - yMin) * scaleY;

    var x2 = trap.depth * trap.z1 + trap.b;
    var x2s = offsetLeft + (x2 - xMin) * scaleX;
    
    var x3 = trap.depth * (trap.z1 + trap.z2) + trap.b;
    var x3s = offsetLeft + (x3 - xMin) * scaleX;

    var xnl = (trap.depth - trap.dn) * trap.z1;
    var xnr = trap.depth * trap.z1 + trap.b + trap.dn * trap.z2;
    var xnls = offsetLeft + (xnl - xMin) * scaleX;
    var xnrs = offsetLeft + (xnr - xMin) * scaleX;
    var yns = chart.clientHeight - offsetBottom -(trap.dn - yMin) * scaleY;


    var xcl = (trap.depth - trap.dc) * trap.z1;
    var xcr = trap.depth * trap.z1 + trap.b + trap.dc * trap.z2;
    var xcls = offsetLeft + (xcl - xMin) * scaleX;
    var xcrs = offsetLeft + (xcr - xMin) * scaleX;
    var ycs = chart.clientHeight - offsetBottom - (trap.dc - yMin) * scaleY;

    
    document.getElementById('pathChan').setAttribute('d', 'M' + x0s + ' ' + y0s + ' L ' + x1s + ' ' + y1s + ' L ' + x2s + ' ' + y1s + ' L ' + x3s + ' ' + y0s);

    document.getElementById('pathNorm').setAttribute('d', 'M' + xnls + ' ' + yns + 'L' + xnrs + ' ' + yns);
    
    document.getElementById('pathCrit').setAttribute('d', 'M' + xcls + ' ' + ycs + 'L' + xcrs + ' ' + ycs);

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

