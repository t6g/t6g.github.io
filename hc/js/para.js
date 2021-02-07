// JavaScript source code
'use strict'

class ParabolicChannel extends OpenChannel {
    constructor(T, d, cs, mN, dn) {
        super(cs, mN, dn);
        this.cd = d;  //channel depth
        this.tw = T;  //top width
    }

    //getters
    get an() {
        return 2.0 * this.tw / 3.0 / Math.sqrt(this.cd) * this.dn * Math.sqrt(this.dn);
    }
    get pn() {
        var pt1 = this.tw * this.tw / 16.0 / this.cd;
        var pt2 = Math.sqrt(this.dn * this.dn + pt1 * this.dn);
        return pt1 * Math.log((pt2 + this.dn) / (pt2 - this.dn)) + 2.0 * pt2;
    }
    get ac() {
        return 2.0 * this.tw / 3.0 / Math.sqrt(this.cd) * this.dc * Math.sqrt(this.dc);
    }
    get pc() {
        var pt1 = this.tw * this.tw / 16.0 / this.cd;
        var pt2 = Math.sqrt(this.dc * this.dc + pt1 * this.dc);
        return pt1 * Math.log((pt2 + this.dc) / (pt2 - this.dc)) + 2.0 * pt2;
    }

    get vc() {
        return Math.sqrt(2.0 / 3.0 * gUS * this.dc);
    }
    get dc() {
        var A, dAdy, d2Ady2, f = 10.0, df;
        var deltay = 10.0;
        var count = 0;
        var y;
        var Q = this.Qn;

        d2Ady2 = this.z1 + this.z2;

        //use Equations in Table 2.1 French 1985 to estimate yi
        y = Math.pow(0.84 * 4 * this.cd * Q * Q / gUS / this.tw, 0.25);
        
        while (Math.abs(deltay) > TolD && Math.abs(f) > TolQ)
        {
            A = 2.0 * this.tw / 3.0 / Math.sqrt(this.cd) * y * Math.sqrt(y);
            dAdy = this.tw * Math.sqrt(y / this.cd);
            d2Ady2 = 0.5 * this.tw / Math.sqrt(this.cd * y);
            f = gUS * A * A * A - Q * Q * dAdy;
            df = 3.0 * gUS * A * A * dAdy - Q * Q * d2Ady2;
            deltay = f / df;
            while (deltay >= y)
                deltay /= 2.0;

            while (deltay <= y - this.cd)
                deltay /= 2.0;

            y -= deltay;
            count++;
            if (count > MaxCount) break;
        }

        return y;
    }
    Q2Dn(Q) {
            var y = this.cd;
            var A = 2.0 * this.tw / 3.0 / Math.sqrt(this.cd) * y * Math.sqrt(y);
            var ta = this.tw * this.tw / 16.0 / this.cd;
            var tb = Math.sqrt(y * y + ta * y);
            var P = ta * Math.log((tb + y) / (tb - y)) + 2.0 * tb;

            var v = KuUS / this.mN * Math.pow(A / P, 2.0/3.0) * Math.pow(this.cs, 1.0/2.0);
            var Qmax = v * A;
            var dAdy, dPdy, f = 10.0, df;
            var deltay = 10.0;
            var count = 0;

            if (Q >= Qmax){
                return this.cd;
            }

            y = 0.5 * this.cd;

            while (Math.abs(deltay) > TolD && Math.abs(f) > TolQ)
            {
                A = 2.0 * this.tw / 3.0 / Math.sqrt(this.cd) * y * Math.sqrt(y);
                dAdy = this.tw * Math.sqrt(y / this.cd);
                tb = Math.sqrt(y * y + ta * y);
                P = ta * Math.log((tb + y) / (tb - y)) + 2.0 * tb;
                dPdy = ta * ((2.0 * y + ta) / tb + 1) / (tb + y) - ta * ((2.0 * y + ta) / tb - 1) / (tb - y) + (2.0 * y + ta) / tb;

                f = KuUS / this.mN * Math.sqrt(this.cs) * Math.pow(A, 5.0 / 3.0) * Math.pow(P, -2.0 / 3.0) - Q;
                df = KuUS / this.mN * Math.sqrt(this.cs) * (5.0 / 3.0 * Math.pow(A / P, 2.0 / 3.0) * dAdy - 2.0 / 3.0 * Math.pow(A / P, 5.0 / 3.0) * dPdy);
                deltay = f / df;

                while (deltay >= y)
                    deltay /= 2.0;

                while (deltay <= y - this.cd)
                    deltay /= 2.0;

                y -= deltay;
                count++;
                if (count > MaxCount) break;
            }
        return y;    
    }
}

const para = new ParabolicChannel(10, 1, 0.01, 0.05, 0.5);

window.onload = function () {
    checkLocalStorage();

    document.getElementById('topWidth').setAttribute('value', para.tw);
    document.getElementById('channelDepth').setAttribute('value', para.cd);
    document.getElementById('channelSlope').setAttribute('value', para.cs);
    document.getElementById('manningsN').setAttribute('value', para.mN);
    document.getElementById('normalDepth').setAttribute('value', para.dn);
    document.getElementById('discharge').setAttribute('value', para.Qn.toFixed(2));

    setValues();

    document.getElementById('topWidth').addEventListener("change", respondTopWidth);
    document.getElementById('channelDepth').addEventListener("change", respondChannelDepth);
    document.getElementById('channelSlope').addEventListener("change", respondChannelSlope);
    document.getElementById('manningsN').addEventListener("change", respondManningsN);
    document.getElementById('normalDepth').addEventListener("change", respondNormalDepth);
    document.getElementById('discharge').addEventListener("change", respondDischarge);

    updateGraph();
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
                para.dn = tmp;
            }
        }
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
        localStorage.setItem("para.tw", tmp)
        setValues();
        document.getElementById('discharge').value =  para.Qn.toFixed(2);
        updateGraph();
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
        localStorage.setItem("para.cd", tmp)
        setValues();
        document.getElementById('discharge').value = para.Qn.toFixed(2);
        updateGraph();
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
        setValues();
        document.getElementById('discharge').value = para.Qn.toFixed(2);
        updateGraph();
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
        setValues();
        document.getElementById('discharge').value = para.Qn.toFixed(2);
        updateGraph();
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
        localStorage.setItem("para.dn", tmp)
        setValues();
        document.getElementById('discharge').value = para.Qn.toFixed(2);
        updateGraph();
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
        localStorage.setItem("para.dn", tmp)
        setValues();
        document.getElementById('normalDepth').value = para.dn.toFixed(2);
        updateGraph();
    }
}

function setValues() {
    document.getElementById('area').innerHTML = para.an.toFixed(3);
    document.getElementById('perimeter').innerHTML = para.pn.toFixed(3);
    document.getElementById('velocity').innerHTML = para.vn.toFixed(3);
    document.getElementById('criticalDepth').innerHTML = para.dc.toFixed(3);
    document.getElementById('criticalVelocity').innerHTML = para.vc.toFixed(3);
    document.getElementById('criticalSlope').innerHTML = para.sc.toFixed(3);
    document.getElementById('froudeNumber').innerHTML = para.fr.toFixed(3);
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
    var xMax = para.tw;
    var yMin = 0;
    var yMax = para.cd;

    var scaleX = (chart.clientWidth - offsetLeft - offsetRight)/ (xMax - xMin);
    var scaleY = (chart.clientHeight - offsetTop - offsetBottom) / (yMax - yMin);

    var x0 = 0;
    var y0 = para.cd;
    var x0s = offsetLeft + (x0 - xMin) * scaleX;
    var y0s = chart.clientHeight - offsetBottom - (y0 - yMin) * scaleY;

    var x1 = 0.5 * para.tw;
    var y1 = -para.cd;
    var x1s = offsetLeft + (x1 - xMin) * scaleX;
    var y1s = chart.clientHeight - offsetBottom - (y1 - yMin) * scaleY;

    var x2 = para.tw;
    var x2s = offsetLeft + (x2 - xMin) * scaleX;
    
    var xnl = 0.5 * para.tw - 0.5 * para.tw * Math.sqrt(para.dn / para.cd);
    var xnr = 0.5 * para.tw + 0.5 * para.tw * Math.sqrt(para.dn / para.cd);;
    var xnls = offsetLeft + (xnl - xMin) * scaleX;
    var xnrs = offsetLeft + (xnr - xMin) * scaleX;
    var yns = chart.clientHeight - offsetBottom -(para.dn - yMin) * scaleY;


    var xcl = 0.5 * para.tw - 0.5 * para.tw * Math.sqrt(para.dc / para.cd);
    var xcr = 0.5 * para.tw + 0.5 * para.tw * Math.sqrt(para.dc / para.cd);;
    var xcls = offsetLeft + (xcl - xMin) * scaleX;
    var xcrs = offsetLeft + (xcr - xMin) * scaleX;
    var ycs = chart.clientHeight - offsetBottom - (para.dc - yMin) * scaleY;

    
    document.getElementById('pathChan').setAttribute('d', 'M' + x0s + ' ' + y0s + ' Q ' + x1s + ' ' + y1s + ' ' + x2s + ' ' + y0s);

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

