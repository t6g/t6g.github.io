// JavaScript source code
'use strict'

class TriangularChannel extends OpenChannel {
    constructor(z1, z2, cs, mN, dn) {
        super(cs, mN, dn);
        this.z1 = z1;
        this.z2 = z2;
    }

    //getters
    get an() {
        return 0.5 * (this.z1 + this.z2) * this.dn * this.dn;
    }
    get pn() {
        return (Math.sqrt(1.0 + this.z1 * this.z1) + Math.sqrt(1.0 + this.z2 * this.z2)) * this.dn;
    }
    get ac() {
        return 0.5 * (this.z1 + this.z2) * this.dc * this.dc;
    }
    get pc() {
        return (Math.sqrt(1.0 + this.z1 * this.z1) + Math.sqrt(1.0 + this.z2 * this.z2)) * this.dc;
    }

    get vc() {
        return Math.sqrt(0.5 * gUS * this.dc);
    }
    get dc() {
        return Math.pow(8.0 * this.Qn * this.Qn / gUS / (this.z1 + this.z2) / (this.z1 + this.z2), 1.0 / 5.0);
    }
    Q2Dn(Q) {
        return Math.pow(Q * this.mN / KuUS / Math.sqrt(this.cs) * Math.pow(0.5 * (this.z1 + this.z2), -5.0 / 3.0) *
            Math.pow((Math.sqrt(1.0 + this.z1 * this.z1) + Math.sqrt(1.0 + this.z2 * this.z2)), 2.0 / 3.0), 3.0 / 8.0);
    }
    
}

const tria = new TriangularChannel(3, 3, 0.01, 0.05, 0.5);

window.onload = function () {

    //check localstorage
    checkLocalStorage();

    document.getElementById('leftSideSlope').setAttribute('value', tria.z1);
    document.getElementById('rightSideSlope').setAttribute('value', tria.z2);
    document.getElementById('channelSlope').setAttribute('value', tria.cs);
    document.getElementById('manningsN').setAttribute('value', tria.mN);
    document.getElementById('normalDepth').setAttribute('value', tria.dn);
    document.getElementById('discharge').setAttribute('value', tria.Qn.toFixed(2));

    setValues();

    document.getElementById('leftSideSlope').addEventListener("change", respondLeftSideSlope);
    document.getElementById('rightSideSlope').addEventListener("change", respondRightSideSlope);
    document.getElementById('channelSlope').addEventListener("change", respondChannelSlope);
    document.getElementById('manningsN').addEventListener("change", respondManningsN);
    document.getElementById('normalDepth').addEventListener("change", respondNormalDepth);
    document.getElementById('discharge').addEventListener("change", respondDischarge);

    //document.getElementById('myCanvas').addEventListener("re")
    
    //drawCanvas();
    updateGraph();
}

function checkLocalStorage() {
    var tmp = localStorage.getItem("tria.z1");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                tria.z1 = tmp;
            }
        }
    }

    tmp = localStorage.getItem("tria.z2");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                tria.z2 = tmp;
            }
        }
    }

    tmp = localStorage.getItem("tria.cs");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                tria.cs = tmp;
            }
        }
    }

    tmp = localStorage.getItem("tria.mN");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                tria.mN = tmp;
            }
        }
    }

    tmp = localStorage.getItem("tria.dn");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                tria.dn = tmp;
            }
        }
    }
}

function respondLeftSideSlope(e) {
    var tmp = parseFloat(document.getElementById('leftSideSlope').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for left side slope!");
        document.getElementById('leftSideSlope').value = tria.z1;
        return;
    }
    else if(tmp <= 0){
        alert("Please input a positive number for left side slope!");
        document.getElementById('leftSideSlope').value = tria.z1;
        return;
    }
    else {
        tria.z1 = tmp;
        localStorage.setItem("tria.z1", tmp)
        setValues();
        document.getElementById('discharge').value =  tria.Qn.toFixed(2);
        updateGraph();
    }
}

function respondRightSideSlope(e) {
    var tmp = parseFloat(document.getElementById('rightSideSlope').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for right side slope!");
        document.getElementById('rightSideSlope').value = tria.z2;
        return;
    }
    else if(tmp <= 0){
        alert("Please input a positive number for right side slope!");
        document.getElementById('rightSideSlope').value = tria.z2;
        return;
    }
    else {
        tria.z2 = tmp;
        localStorage.setItem("tria.z2", tmp)
        setValues();
        document.getElementById('discharge').value = tria.Qn.toFixed(2);
        updateGraph();
    }
}
function respondChannelSlope(e) {
    var tmp = parseFloat(document.getElementById('channelSlope').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for channel slope!");
        document.getElementById('channelSlope').value = tria.cs;
        return;
    }
    else if(tmp <= 0){
        alert("Please input a positive number for channel slope!");
        document.getElementById('channelSlope').value = tria.cs;
        return;
    }
    else {
        tria.cs = tmp;
        localStorage.setItem("tria.cs", tmp)
        setValues();
        document.getElementById('discharge').value = tria.Qn.toFixed(2);
        updateGraph();
    }
}
function respondManningsN(e) {
    var tmp = parseFloat(document.getElementById('manningsN').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for manningsN!");
        document.getElementById('manningsN').value = tria.mN;
        return;
    }
    else if(tmp <= 0){
        alert("Please input a positive number for Manning's N!");
        document.getElementById('manningsN').value = tria.mN;
        return;
    }
    else {
        tria.mN = tmp;
        localStorage.setItem("tria.mN", tmp)
        setValues();
        document.getElementById('discharge').value = tria.Qn.toFixed(2);
        updateGraph();
    }
}
function respondNormalDepth(e) {
    var tmp = parseFloat(document.getElementById('normalDepth').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for normal depth!");
        document.getElementById('normalDepth').value = tria.dn;
        return;
    }
    else if(tmp <= 0){
        alert("Please input a positive number for normal depth!");
        document.getElementById('normalDepth').value = tria.dn;
        return;
    }
    else {
        tria.dn = tmp;
        localStorage.setItem("tria.dn", tmp)
        setValues();
        document.getElementById('discharge').value = tria.Qn.toFixed(2);
        updateGraph();
    }
}
function respondDischarge(e) {
    var tmp = parseFloat(document.getElementById('discharge').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for discharge!");
        document.getElementById('discharge').value = tria.Qn.toFixed(2);
    }
    else if(tmp <= 0){
        alert("Please input a positive number for discharge!");
        document.getElementById('discharge').value = tria.Qn.toFixed(2);
        return;
    }
    else {
        tria.dn = tria.Q2Dn(tmp);
        localStorage.setItem("tria.dn", tmp)
        setValues();
        document.getElementById('normalDepth').value = tria.dn.toFixed(2);
        updateGraph();
    }
}

function setValues() {
    document.getElementById('area').innerHTML = tria.an.toFixed(3);
    document.getElementById('perimeter').innerHTML = tria.pn.toFixed(3);
    document.getElementById('velocity').innerHTML = tria.vn.toFixed(3);
    document.getElementById('criticalDepth').innerHTML = tria.dc.toFixed(3);
    document.getElementById('criticalVelocity').innerHTML = tria.vc.toFixed(3);
    document.getElementById('criticalSlope').innerHTML = tria.sc.toFixed(3);
    document.getElementById('froudeNumber').innerHTML = tria.fr.toFixed(3);
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
    var xMax = tria.depth * (tria.z1 + tria.z2)
    var yMin = 0;
    var yMax = tria.depth;

    var scaleX = (svg.clientWidth - offsetLeft - offsetRight)/ (xMax - xMin);
    var scaleY = (svg.clientHeight - offsetTop - offsetBottom) / (yMax - yMin);

    var x0 = 0.0;
    var y0 = tria.depth;
    var x0s = offsetLeft + (x0 - xMin) * scaleX;
    var y0s = svg.clientHeight - offsetBottom - (y0 - yMin) * scaleY;

    var x1 = tria.depth * tria.z1;
    var y1 = 0;
    var x1s = offsetLeft + (x1 - xMin) * scaleX;
    var y1s = svg.clientHeight - offsetBottom - (y1 - yMin) * scaleY;

    var x2 = tria.depth * (tria.z1 + tria.z2);
    var x2s = offsetLeft + (x2 - xMin) * scaleX;

    var xnl = (tria.depth - tria.dn) * tria.z1;
    var xnr = tria.depth * tria.z1 + tria.dn * tria.z2;
    var xnls = offsetLeft + (xnl - xMin) * scaleX;
    var xnrs = offsetLeft + (xnr - xMin) * scaleX;
    var yns = svg.clientHeight - offsetBottom -(tria.dn - yMin) * scaleY;


    var xcl = (tria.depth - tria.dc) * tria.z1;
    var xcr = tria.depth * tria.z1 + tria.dc * tria.z2;
    var xcls = offsetLeft + (xcl - xMin) * scaleX;
    var xcrs = offsetLeft + (xcr - xMin) * scaleX;
    var ycs = svg.clientHeight - offsetBottom - (tria.dc - yMin) * scaleY;

    
    document.getElementById('pathChan').setAttribute('d', 'M' + x0s + ' ' + y0s + 'L' + x1s + ' ' + y1s + 'L' + x2s + ' ' + y0s);

    document.getElementById('pathNorm').setAttribute('d', 'M' + xnls + ' ' + yns + 'L' + xnrs + ' ' + yns);
    
    document.getElementById('pathCrit').setAttribute('d', 'M' + xcls + ' ' + ycs + 'L' + xcrs + ' ' + ycs);

    //draw grid lines;
    var xInc = niceIncrement(xMin, xMax);
    var xIncDraw = xInc * scaleX;
    
    //draw grid lines;
    let x = 0;
    let y = svg.clientHeight - offsetBottom;
    let xDraw = offsetLeft;
    var xGrid = '';
    var text;
    var xPos;
    var yPos;
    var idLabel;
    var i = 1;
    
    while (xDraw <= svg.clientWidth - offsetRight){
        xGrid += 'M' + xDraw + ' ' + offsetTop + 'L' + xDraw + ' ' + y;
        yPos = svg.clientHeight - 0.65 * offsetBottom;
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

