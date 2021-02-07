// JavaScript source code
'use strict'

class EllipticalChannel extends OpenChannel {
    constructor(span, rise, cs, mN, dn) {
        super(cs, mN, dn);
        this.a = span / 12.0 / 2.0; 
        this.b = rise / 12.0 / 2.0;
    }

    //getters
    get alphan()
    {
        return Math.acos(1.0 - this.dn / this.b);
    }
    get an() {
        return this.a * this.b * (this.alphan - Math.sin(this.alphan) * Math.cos(this.alphan));
    }
    get pn() {
        return this.alpha2Perimeter(this.alphan, this.a, this.b);
    }
    get alphac()
    {
        return Math.acos(1.0 - this.dc / this.b);
    }
    get ac() {
        return this.a * this.b * (this.alphac - Math.sin(this.alphac) * Math.cos(this.alphac));
    }
    get pc() {
        return this.alpha2Perimeter(this.alphac, this.a, this.b);
    }

    get vc() {
        return Math.sqrt(gUS * this.ac / 2.0 / this.a / Math.sin(this.alphac));
    }
    get dc() {
        var A, dAdy, dAdalpha, ddAdydalpha, f = 10.0, df;
        var deltaalpha = 10.0;
        var count = 0;
        var Q = this.Qn;
        var tmin = 0;
        var tmax = Math.PI;
        
        //use French 1985 Table 2.1 Equation to estimate yc
        var yi = this.b;

        var alphai = Math.PI / 2.0; //Math.acos(1.0 - this.dn / this.b);

        while (Math.abs(deltaalpha) > TolAngle && Math.abs(f) > TolQ)
        {
            A = this.a * this.b * (alphai - Math.sin(alphai) * Math.cos(alphai));
            dAdy = 2.0 * this.a * Math.sin(alphai);
            f = gUS * A * A * A - Q * Q * dAdy;
            
            if(f > 0){
                tmax = alphai;
            }
            else {
                tmin = alphai;
            }
            
            dAdalpha = (1.0 - Math.cos(2.0 * alphai)) * this.a * this.b;
            ddAdydalpha = 2.0 * this.a * Math.cos(alphai);
            df = 3.0 * gUS * A * A * dAdalpha - Q * Q * ddAdydalpha;
            deltaalpha = f / df;
            
            if (alphai - deltaalpha < tmin)
            {
                deltaalphai = 0.5 * (alphai - tmin);
                continue;
            }

            if (alphai - deltaalpha > tmax)
            {
                deltaalphai = 0.5 * (alphai - tmax);
                continue;
            }

            alphai -= deltaalpha;

            count++;
            if (count > MaxCount) break;
        }

        return this.b * (1.0 - Math.cos(alphai));
    }

    get alphamax() {
        var alpha = 7.0 / 8.0 * Math.PI;
        var delta;
        var A, dA, ddA, P, dP, ddP, ds, f, df;
        var cnt = 0;

        do
        {
            A = this.a * this.b * (alpha - Math.sin(alpha) * Math.cos(alpha));
            dA = this.a * this.b * (1.0 - Math.cos(2.0 * alpha));
            ddA = 2.0 * this.a * this.b * Math.sin(2.0 * alpha);
            P = this.alpha2Perimeter(alpha, this.a, this.b);
            ds = Math.sqrt(this.a * this.a * Math.cos(alpha) * Math.cos(alpha) +
                           this.b * this.b * Math.sin(alpha) * Math.sin(alpha));
            dP = 2.0 * ds;
            ddP = -(this.a * this.a - this.b * this.b) * Math.sin(2.0 * alpha) / ds;
            f = 5.0 * P * dA - 2 * A * dP;

            if (Math.abs(f) < TolD) break;

            df = 3.0 * dP * dA + 5.0 * P * ddA - 2.0 * A * ddP;
            delta = f / df;

            alpha -= delta;

            cnt++;
            if (cnt > MaxCount) break;
        } while (Math.abs(delta) > TolAngle);

        return alpha;        
    } 
    
    get Qmax(){
        var alpha = this.alphamax;
        var A = this.a * this.b * (alpha - Math.sin(alpha) * Math.cos(alpha));
        var P = this.alpha2Perimeter(alpha, this.a, this.b);;
        var v = KuUS / this.mN * Math.pow(A / P, 2.0 / 3.0) * Math.sqrt(this.cs);
        return v * A;
    }

    get ymax(){
        return this.b * (1.0 - Math.cos(this.alphamax));
    }
    
    Q2Dn(Q) {
        if (Q >= this.Qmax) {
            alert('Q is reduced to Qmax!');
            return this.ymax;
        }

        var A, P, dA, dP, ds, f = 10.0, df;
        var delta = 10.0;
        var alpha = 0.5 * Math.PI;
        var tmin = 0;
        var tmax = this.alphamax;
        var count = 0;

        while (Math.abs(delta) > TolAngle && Math.abs(f) > TolQ)
        {
            A = this.a * this.b * (alpha - Math.sin(alpha) * Math.cos(alpha));
            dA = this.a * this.b * (1.0 - Math.cos(2.0 * alpha));

            P = this.alpha2Perimeter(alpha, this.a, this.b);
            ds = Math.sqrt(this.a * this.a * Math.cos(alpha) * Math.cos(alpha) +
                this.b * this.b * Math.sin(alpha) * Math.sin(alpha));
            dP = 2.0 * ds;

            f = KuUS / this.mN * Math.sqrt(this.cs) * Math.pow(A, 5.0 / 3.0) * Math.pow(P, -2.0 / 3.0) - Q;
            df = KuUS / this.mN * Math.sqrt(this.cs) * (5.0 / 3.0 * Math.pow(A / P, 2.0 / 3.0) * dA - 2.0 / 3.0 * Math.pow(A / P, 5.0 / 3.0) * dP);

            if (f > 0)
            {
                tmax = alpha;
            }
            else
            {
                if(Math.abs(f) < TolQ) 
                {
                    break;
                }
                tmin = alpha;
            }

            delta = f / df;
                
            if (alpha - delta < tmin)
            {
                delta = 0.5 * (alpha - tmin);
            }

            if(alpha - delta > tmax)
            {
                delta = 0.5 * (alpha - tmax);
            }
                
            alpha -= delta;
            count++;
            
            if (count > MaxCount) break;
        }

        return this.b * (1.0 - Math.cos(alpha))
    }

    alpha2Perimeter(alpha, a, b){
        var sinal = Math.sin(alpha);
        var cosal = Math.cos(alpha);
        var sinco = sinal * cosal;
        var intsc, k2, prefix, p;
        var n = 2;
        var delta;
        
        if( a <= b) {
            intsc = 0.5 * sinal * cosal + 0.5 * alpha;    // \int_0^alpha cos^2 t dt 
            k2 = 1.0 - a * a / b / b;
        }
        else {
            intsc = -0.5 * sinal * cosal + 0.5 * alpha;  // \int_0^alpha sin^2 t dt
            k2 = 1.0 - b * b / a / a;
        }
        
        //var intsc = a <= b ? 0.5 * sinal * cosal + 0.5 * alpha    // \int_0^alpha cos^2 t dt 
        //                      : -0.5 * sinal * cosal + 0.5 * alpha;  // \int_0^alpha sin^2 t dt

        //var k2 = a >= b ? 1.0 - b * b / a / a : 1.0 - a * a / b / b;

        prefix = 0.5 * k2;
        p = alpha - prefix * intsc;

        do
        {
            if (a < b)
            {
                sinco *= cosal * cosal;
                intsc = sinco / 2.0 / n + (2.0 * n - 1.0) / 2.0 / n * intsc;
            }
            else
            {
                sinco *= sinal * sinal;
                intsc = -sinco / 2.0 / n + (2.0 * n - 1.0) / 2.0 / n * intsc;
            }

            prefix *= (k2 / 2.0 / n);  //an
            delta = prefix * intsc;
            p -= delta;
            n++;

            if (n > MaxCount) break;
        } while (Math.abs(2*a*delta) > TolD);

        return 2.0 * p * Math.max(a, b);        
    }

}

const elli = new EllipticalChannel(12, 18, 0.01, 0.013, 0.5);

window.onload = function () {

    checkLocalStorage();

    document.getElementById('span').setAttribute('value', elli.a * 24);
    document.getElementById('rise').setAttribute('value', elli.b * 24);
    document.getElementById('channelSlope').setAttribute('value', elli.cs);
    document.getElementById('manningsN').setAttribute('value', elli.mN);
    document.getElementById('normalDepth').setAttribute('value', elli.dn);
    document.getElementById('discharge').setAttribute('value', elli.Qn.toFixed(2));

    setValues();

    document.getElementById('select').addEventListener("change", respondSelect);
    document.getElementById('span').addEventListener("change", respondSpan);
    document.getElementById('rise').addEventListener("change", respondRise);
    document.getElementById('channelSlope').addEventListener("change", respondChannelSlope);
    document.getElementById('manningsN').addEventListener("change", respondManningsN);
    document.getElementById('normalDepth').addEventListener("change", respondNormalDepth);
    document.getElementById('discharge').addEventListener("change", respondDischarge);

    updateGraph();
}

function checkLocalStorage() {
    var tmp = localStorage.getItem("elli.a");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                elli.a = tmp;
            }
        }
    }

    var tmp = localStorage.getItem("elli.b");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                elli.b = tmp;
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
    var tmp = document.getElementById('select').value;
    var idx = tmp.indexOf('x');
    var span = tmp.substring(0, idx);
    var rise = tmp.substring(idx+1);
    
    document.getElementById('span').value = span;
    respondSpan(e);

    document.getElementById('rise').value = rise;
    respondRise(e);

    document.getElementById('select').value = '';
}


function respondSpan(e) {
    var tmp = parseFloat(document.getElementById('span').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for span!");
        document.getElementById('span').value = elli.a * 24;
        return;
    }
    else if (tmp <= 0) {
            alert("Please input a positive number for span!");
            document.getElementById('span').value = elli.a * 24;
            return;
    }
    else{
        elli.a = tmp / 24.0;
        localStorage.setItem("elli.a", elli.a);
        setValues();
        document.getElementById('discharge').value =  elli.Qn.toFixed(2);
        updateGraph();
    }
}

function respondRise(e) {
    var tmp = parseFloat(document.getElementById('rise').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for rise!");
        document.getElementById('rise').value = elli.b * 24;
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for rise!");
        document.getElementById('rise').value = elli.b * 24;
        return;
    }
    else {
        tmp /= 12.0;
        if (tmp < elli.dn) {
            alert('Normal depth is lowered to rise!');
            elli.dn = tmp;
            document.getElementById('normalDepth').value = elli.dn.toFixed(2);
        }
        elli.b = tmp / 2.0;
        localStorage.setItem("elli.b", elli.b);
        setValues();
        document.getElementById('discharge').value = elli.Qn.toFixed(2);
        updateGraph();
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
        setValues();
        document.getElementById('discharge').value = elli.Qn.toFixed(2);
        updateGraph();
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
        setValues();
        document.getElementById('discharge').value = elli.Qn.toFixed(2);
        updateGraph();
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
        localStorage.setItem("elli.dn", elli.dn);
        setValues();
        document.getElementById('discharge').value = elli.Qn.toFixed(2);
        updateGraph();
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
        localStorage.setItem("elli.dn", elli.dn);
        setValues();
        document.getElementById('normalDepth').value = elli.dn.toFixed(2);
        updateGraph();
    }
}

function setValues() {
    document.getElementById('area').innerHTML = elli.an.toFixed(3);
    document.getElementById('perimeter').innerHTML = elli.pn.toFixed(3);
    document.getElementById('velocity').innerHTML = elli.vn.toFixed(3);
    document.getElementById('criticalDepth').innerHTML = elli.dc.toFixed(3);
    document.getElementById('criticalVelocity').innerHTML = elli.vc.toFixed(3);
    document.getElementById('criticalSlope').innerHTML = elli.sc.toFixed(3);
    document.getElementById('froudeNumber').innerHTML = elli.fr.toFixed(3);
    document.getElementById('capacity').innerHTML = elli.Qmax.toFixed(3);
    document.getElementById('ymax').innerHTML = elli.ymax.toFixed(3);
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
    var xMax = 2.0 * elli.a;
    var yMin = 0;
    var yMax = 2.0 * elli.b;

    var scaleX = (chart.clientWidth - offsetLeft - offsetRight)/ (xMax - xMin);
    var scaleY = (chart.clientHeight - offsetTop - offsetBottom) / (yMax - yMin);

    if(scaleX >= scaleY){
        scaleX = scaleY;
    }
    else{
        scaleY = scaleX;
    }

    var rxs = elli.a * scaleX;
    var rys = elli.b * scaleY;
    
    var dxs = 0.5 * (-offsetLeft + chart.clientWidth - offsetRight) - rxs; //displacement for x to move circle to the middle
    
    var x0 = 0;
    var y0 = elli.b;
    var x0s = offsetLeft + (x0 - xMin) * scaleX + dxs;
    var y0s = chart.clientHeight - offsetBottom - (y0 - yMin) * scaleY;

    var xnl = elli.a * (1.0 - Math.sin(elli.alphan));
    var xnr = elli.a * (1.0 + Math.sin(elli.alphan));
    var xnls = offsetLeft + (xnl - xMin) * scaleX + dxs;
    var xnrs = offsetLeft + (xnr - xMin) * scaleX + dxs;
    var yns = chart.clientHeight - offsetBottom -(elli.dn - yMin) * scaleY;


    var xcl = elli.a * (1.0 - Math.sin(elli.alphac));
    var xcr = elli.a * (1.0 + Math.sin(elli.alphac));
    var xcls = offsetLeft + (xcl - xMin) * scaleX + dxs;
    var xcrs = offsetLeft + (xcr - xMin) * scaleX + dxs;
    var ycs = chart.clientHeight - offsetBottom - (elli.dc - yMin) * scaleY;

    
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
    let y = chart.clientHeight - offsetBottom;
    let xmid = 0.5 * (offsetLeft + chart.clientWidth - offsetRight);
    let xDraw = xmid;
    var xGrid = '';
    var text;
    var xPos;
    var yPos = chart.clientHeight - 0.65 * offsetBottom;
    var idLabel;
    var i = 1;
    
    while (xDraw <= chart.clientWidth - offsetRight && i <= 5){
        xGrid += 'M' + xDraw + ' ' + offsetTop + 'L' + xDraw + ' ' + y;
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
    while (xDraw > offsetLeft + xIncDraw && i <= 10){
        xDraw -= xIncDraw;
        xGrid += 'M' + xDraw + ' ' + offsetTop + 'L' + xDraw + ' ' + y;

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

