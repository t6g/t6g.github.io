// JavaScript source code
'use strict'

class CircularChannel extends OpenChannel {
    constructor(d, cs, mN, dn) {
        super(cs, mN, dn);
        this.r = d / 12.0 / 2.0; 
    }

    //getters
    get thetan()
    {
        return 2.0 * Math.acos(1.0 - this.dn / this.r);
    }
    get an() {
        return (this.thetan - Math.sin(this.thetan)) * this.r * this.r / 2.0;
    }
    get pn() {
        return this.thetan * this.r;
    }
    get thetac()
    {
        return 2.0 * Math.acos(1.0 - this.dc / this.r);
    }
    get ac() {
        return (this.thetac - Math.sin(this.thetac)) * this.r * this.r / 2.0;
    }
    get pc() {
        return this.thetac * this.r;
    }

    get vc() {
        return Math.sqrt(gUS * this.ac / 2.0 / this.r / Math.sin(this.thetac/2.0));
    }
    get dc() {
        var A, dAdy, dAdtheta, ddAdydtheta, f = 10.0, df;
        var deltatheta = 10.0;
        var count = 0;
        var Q = this.Qn;
        //use French 1985 Table 2.1 Equation to estimate yc
        var yi = Math.min(1.01 * Math.pow(2.0 * this.r, -0.26) * Math.pow(Q * Q / gUS, 0.25), 0.85 * 2 * this.r);

        var thetai = 2.0 * Math.acos(1.0 - yi / this.r);

        while (Math.abs(deltatheta) > TolAngle && Math.abs(f) > TolQ)
        {
            A = (thetai - Math.sin(thetai)) * this.r * this.r / 2.0;
            dAdy = 2.0 * this.r * Math.sin(thetai / 2.0);
            f = gUS * A * A * A - Q * Q * dAdy;
            dAdtheta = 0.5 * (1.0 - Math.cos(thetai)) * this.r * this.r;
            ddAdydtheta = this.r * Math.cos(thetai / 2.0);
            df = 3.0 * gUS * A * A * dAdtheta - Q * Q * ddAdydtheta;
            deltatheta = f / df;
            thetai -= deltatheta;
            if (thetai >= 2.0 * Math.PI)
            {
                thetai = 2.0 * Math.PI;
            }

            if(thetai < 0.0)
            {
                thetai = 0.0;
            }

            count++;
            if (count > MaxCount) break;
        }

        return this.r * (1.0 - Math.cos(thetai / 2.0));
    }
    get Qmax(){
        var theta = ThetaMaxCircle;
        var A = (theta - Math.sin(theta)) * this.r * this.r / 2.0;
        var P = theta * this.r;
        var v = KuUS / this.mN * Math.pow(A / P, 2.0 / 3.0) * Math.sqrt(this.cs);
        return v * A;

    }
    get ymax(){
        return this.r * (1.0 - Math.cos(ThetaMaxCircle / 2.0));
    }
    
    
    Q2Dn(Q) {
        if (Q >= this.Qmax) {
            alert('Q is reduced to Qmax!');
            return this.ymax;
        }

        var A, P, dAdtheta, dPdtheta = this.r, f = 10.0, df;
        var deltatheta = 10.0;
        var thetai = Math.PI;
        var tmin = 0.0;
        var tmax = ThetaMaxCircle;
        var count = 0;

        while (Math.abs(deltatheta) > TolAngle && Math.abs(f) > TolQ)
        {
            // A = (theta - sin(theta))r^2 / 2
            A = (thetai - Math.sin(thetai)) * this.r * this.r / 2.0;
            // A' = (1 - cos(theta))r^2 / 2
            dAdtheta = (1.0 - Math.cos(thetai)) * this.r * this.r / 2.0;
            // P = theta r
            P = thetai * this.r;
            f = KuUS / this.mN * Math.sqrt(this.cs) * Math.pow(A, 5.0 / 3.0) * Math.pow(P, -2.0 / 3.0) - Q;
            df = KuUS / this.mN * Math.sqrt(this.cs) * (5.0 / 3.0 * Math.pow(A / P, 2.0 / 3.0) * dAdtheta - 2.0 / 3.0 * Math.pow(A / P, 5.0 / 3.0) * dPdtheta);

            if (f > 0)
            {
                tmax = thetai;
            }
            else
            {
                if(Math.abs(f) < TolQ) 
                {
                    break;
                }
                tmin = thetai;
            }

            deltatheta = f / df;
                
            if (thetai - deltatheta < tmin)
            {
                deltatheta = 0.5 * (thetai - tmin);
            }

            if(thetai -deltatheta > tmax)
            {
                deltatheta = 0.5 * (thetai - tmax);
            }
                
            thetai -= deltatheta;
            count++;
            
            if (count > MaxCount) break;
        }
            
        return this.r * (1.0 - Math.cos(thetai / 2.0));
    }
}

const circ = new CircularChannel(24, 0.01, 0.013, 1.88);

window.onload = function () {

    checkLocalStorage();

    document.getElementById('diameter').setAttribute('value', circ.r * 12 * 2);
    document.getElementById('channelSlope').setAttribute('value', circ.cs);
    document.getElementById('manningsN').setAttribute('value', circ.mN);
    document.getElementById('normalDepth').setAttribute('value', circ.dn);
    document.getElementById('discharge').setAttribute('value', circ.Qn.toFixed(2));

    setValues();

    document.getElementById('select').addEventListener("change", respondSelect);
    document.getElementById('diameter').addEventListener("change", respondDiameter);
    document.getElementById('channelSlope').addEventListener("change", respondChannelSlope);
    document.getElementById('manningsN').addEventListener("change", respondManningsN);
    document.getElementById('normalDepth').addEventListener("change", respondNormalDepth);
    document.getElementById('discharge').addEventListener("change", respondDischarge);

    updateGraph();
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
}

function respondSelect(e) {
    document.getElementById('diameter').value = document.getElementById('select').value;
    respondDiameter(e);
    document.getElementById('select').value = '';
}

function respondDiameter(e) {
    var tmp = parseFloat(document.getElementById('diameter').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for diameter!");
        document.getElementById('diameter').value = circ.r * 24;
        return;
    }
    else if (tmp <= 0) {
            alert("Please input a positive number for diameter!");
            document.getElementById('diameter').value = circ.r * 24;
            return;
    }
    else{
        tmp /= 12.0;
        if (tmp < circ.dn) {
            alert('Normal depth is lowered to diameter!');
            circ.dn = tmp;
            document.getElementById('normalDepth').value =  circ.dn.toFixed(2);
        }
        circ.r = tmp / 2.0;
        localStorage.setItem("circ.r", circ.r)
        setValues();
        document.getElementById('discharge').value =  circ.Qn.toFixed(2);
        updateGraph();
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
        setValues();
        document.getElementById('discharge').value = circ.Qn.toFixed(2);
        updateGraph();
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
        setValues();
        document.getElementById('discharge').value = circ.Qn.toFixed(2);
        updateGraph();
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
        localStorage.setItem("circ.dn", tmp)
        setValues();
        document.getElementById('discharge').value = circ.Qn.toFixed(2);
        updateGraph();
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
        localStorage.setItem("circ.dn", circ.dn)
        setValues();
        document.getElementById('normalDepth').value = circ.dn.toFixed(2);
        updateGraph();
    }
}

function setValues() {
    document.getElementById('area').innerHTML = circ.an.toFixed(3);
    document.getElementById('perimeter').innerHTML = circ.pn.toFixed(3);
    document.getElementById('velocity').innerHTML = circ.vn.toFixed(3);
    document.getElementById('criticalDepth').innerHTML = circ.dc.toFixed(3);
    document.getElementById('criticalVelocity').innerHTML = circ.vc.toFixed(3);
    document.getElementById('criticalSlope').innerHTML = circ.sc.toFixed(3);
    document.getElementById('froudeNumber').innerHTML = circ.fr.toFixed(3);
    document.getElementById('capacity').innerHTML = circ.Qmax.toFixed(3);
    document.getElementById('ymax').innerHTML = circ.ymax.toFixed(3);
}

function updateGraph(){
    'use strict';

    var svg = document.getElementById('svg');
    if(svg == null){
        return;
    }
      
    svg.setAttribute('width', svg.clientHeight * 1.5);

    document.getElementById('axesRect').setAttribute('x', offsetLeft);
    document.getElementById('axesRect').setAttribute('y', offsetTop);
    document.getElementById('axesRect').setAttribute('width', svg.clientWidth- offsetLeft - offsetRight);
    document.getElementById('axesRect').setAttribute('height', svg.clientHeight - offsetTop - offsetBottom);
    
    //drawing 
    var xMin = 0;
    var xMax = 2.0 * circ.r;
    var yMin = 0;
    var yMax = 2.0 * circ.r;

    var scaleX = (svg.clientWidth - offsetLeft - offsetRight)/ (xMax - xMin);
    var scaleY = (svg.clientHeight - offsetTop - offsetBottom) / (yMax - yMin);

    if(scaleX >= scaleY){
        scaleX = scaleY;
    }
    else{
        scaleY = scaleX;
    }

    var rxs = circ.r * scaleX;
    var rys = circ.r * scaleY;
    
    var dxs = 0.5 * (-offsetLeft + svg.clientWidth - offsetRight) - rxs; //displacement for x to move circle to the middle
    
    var x0 = 0;
    var y0 = circ.r;
    var x0s = offsetLeft + (x0 - xMin) * scaleX + dxs;
    var y0s = svg.clientHeight - offsetBottom - (y0 - yMin) * scaleY;

    var xnl = circ.r * (1.0 - Math.sin(0.5 * circ.thetan));
    var xnr = circ.r * (1.0 + Math.sin(0.5 * circ.thetan));
    var xnls = offsetLeft + (xnl - xMin) * scaleX + dxs;
    var xnrs = offsetLeft + (xnr - xMin) * scaleX + dxs;
    var yns = svg.clientHeight - offsetBottom -(circ.dn - yMin) * scaleY;


    var xcl = circ.r * (1.0 - Math.sin(0.5 * circ.thetac));
    var xcr = circ.r * (1.0 + Math.sin(0.5 * circ.thetac));
    var xcls = offsetLeft + (xcl - xMin) * scaleX + dxs;
    var xcrs = offsetLeft + (xcr - xMin) * scaleX + dxs;
    var ycs = svg.clientHeight - offsetBottom - (circ.dc - yMin) * scaleY;

    
    document.getElementById('pathChan').setAttribute('d', 'M' + x0s + ' ' + y0s + ' a ' + rxs + ' ' + rys + ' 0 1 0 ' + 2.0* rxs + ' 0 ' + ' a ' + rxs + ' ' + rys + ' 0 1 0 -' + 2.0* rxs + ' 0 ');

    document.getElementById('pathNorm').setAttribute('d', 'M' + xnls + ' ' + yns + 'L' + xnrs + ' ' + yns);
    
    document.getElementById('pathCrit').setAttribute('d', 'M' + xcls + ' ' + ycs + 'L' + xcrs + ' ' + ycs);

    //draw grid lines;
    var xInc = niceIncrement(xMin, xMax);
    var xIncDraw = xInc * scaleX;
    
    //draw grid lines;
    let x = 0;
    let y = svg.clientHeight - offsetBottom;
    let xmid = 0.5 * (offsetLeft + svg.clientWidth - offsetRight);
    let xDraw = xmid;
    var xGrid = '';
    var text;
    var xPos;
    var yPos = svg.clientHeight - 0.65 * offsetBottom;
    var idLabel;
    var i = 1;
    
    while (xDraw <= svg.clientWidth - offsetRight && i <= 5){
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

    var yInc = niceIncrement(yMin, yMax);
    var yIncDraw = yInc * scaleY;
    
    let yDraw = svg.clientHeight - offsetBottom;
    var yGrid = '';
    x = svg.clientWidth - offsetRight;
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
    
    xPos = offsetLeft + 0.5 * (svg.clientWidth - offsetLeft - offsetRight);
    yPos = svg.clientHeight - 0.25 * offsetBottom;
    document.getElementById('xLabel').setAttribute("x", xPos);
    document.getElementById('xLabel').setAttribute("y", yPos);
    
}

