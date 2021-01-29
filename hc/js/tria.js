// JavaScript source code
'use strict'
const Ku = 1.487;
const g = 32.17;
const offsetLeft = 60;
const offsetTop = 30;
const offsetRight = 30;
const offsetBottom = 60;
var whRatio = 1.5;

class TriangularChannel {
    constructor(z1, z2, cs, mN, dn) {
        this.z1 = z1;
        this.z2 = z2;
        this.cs = cs;
        this.mN = mN;
        this.dn = dn;
    }

    //getters
    get area() {
        return 0.5 * (this.z1 + this.z2) * this.dn * this.dn;
    }
    get peri() {

        return (Math.sqrt(1.0 + this.z1 * this.z1) + Math.sqrt(1.0 + this.z2 * this.z2)) * this.dn;
    }
    get vn() {
        return Ku / this.mN * Math.pow(this.area / this.peri, 2.0 / 3.0) * Math.sqrt(this.cs);
    }
    get Qn() {
        return this.vn * this.area;
    }
    get vc() {
        return Math.sqrt(0.5 * g * this.dc);
    }
    get dc() {
        return Math.pow(8.0 * this.Qn * this.Qn / g / (this.z1 + this.z2) / (this.z1 + this.z2), 1.0 / 5.0);
    }
    get sc() {
        var ac = 0.5 * (this.z1 + this.z2) * this.dc * this.dc;
        var pc = (Math.sqrt(1.0 + this.z1 * this.z1) + Math.sqrt(1.0 + this.z2 * this.z2)) * this.dc;
        return Math.pow(this.vc / (Ku / this.mN * Math.pow(ac / pc, 2.0 / 3.0)), 2.0);
    }
    get fr() {
        return this.vn / this.vc;
    }
    get depth() {
        return Math.max(1.0, Math.max(Math.ceil(this.dn), Math.ceil(this.dc)));
    }
    calculateDn(Q) {
        this.dn = Math.pow(Q * this.mN / Ku / Math.sqrt(this.cs) * Math.pow(0.5 * (this.z1 + this.z2), -5.0 / 3.0) *
            Math.pow((Math.sqrt(1.0 + this.z1 * this.z1) + Math.sqrt(1.0 + this.z2 * this.z2)), 2.0 / 3.0), 3.0 / 8.0);
    }
    
}

const tria = new TriangularChannel(3, 3, 0.01, 0.05, 0.5);

window.onload = function () {

    // Load the Visualization API and the corechart package.
    //google.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    //google.charts.setOnLoadCallback(drawChart);

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

function respondLeftSideSlope(e) {
    var tmp = parseFloat(document.getElementById('leftSideSlope').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for left side slope!");
    }
    else {
        tria.z1 = tmp;
        setValues();
        document.getElementById('discharge').value =  tria.Qn.toFixed(2);
        //drawChart();
        //drawCanvas();
        updateGraph();
    }
}

function respondRightSideSlope(e) {
    var tmp = parseFloat(document.getElementById('rightSideSlope').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for right side slope!");
    }
    else {
        tria.z2 = tmp;
        setValues();
        document.getElementById('discharge').value = tria.Qn.toFixed(2);
        //drawChart();
        //drawCanvas();
        updateGraph();
   }
}
function respondChannelSlope(e) {
    var tmp = parseFloat(document.getElementById('channelSlope').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for channel slope!");
    }
    else {
        tria.cs = tmp;
        setValues();
        document.getElementById('discharge').value = tria.Qn.toFixed(2);
        //drawChart();
        //drawCanvas();
        updateGraph();
    }
}
function respondManningsN(e) {
    var tmp = parseFloat(document.getElementById('manningsN').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for manningsN!");
    }
    else {
        tria.mN = tmp;
        setValues();
        document.getElementById('discharge').value = tria.Qn.toFixed(2);
        //drawChart();
        //drawCanvas();
        updateGraph();
    }
}
function respondNormalDepth(e) {
    var tmp = parseFloat(document.getElementById('normalDepth').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for normal depth!");
    }
    else {
        tria.dn = tmp;
        setValues();
        document.getElementById('discharge').value = tria.Qn.toFixed(2);
        //drawChart();
        //drawCanvas();
        updateGraph();
    }
}
function respondDischarge(e) {
    var tmp = parseFloat(document.getElementById('discharge').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for discharge!");
    }
    else {
        tria.calculateDn(tmp);
        setValues();
        document.getElementById('normalDepth').value = tria.dn.toFixed(2);
        //drawChart();
        //drawCanvas();
        updateGraph();
    }
}

function setValues() {
    document.getElementById('area').innerHTML = tria.area.toFixed(3);
    document.getElementById('perimeter').innerHTML = tria.peri.toFixed(3);
    document.getElementById('velocity').innerHTML = tria.vn.toFixed(3);
    document.getElementById('criticalDepth').innerHTML = tria.dc.toFixed(3);
    document.getElementById('criticalVelocity').innerHTML = tria.vc.toFixed(3);
    document.getElementById('criticalSlope').innerHTML = tria.sc.toFixed(3);
    document.getElementById('froudeNumber').innerHTML = tria.fr.toFixed(3);
}

/*
function drawChart() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Station');
    data.addColumn('number', 'Depth');
    data.addColumn('number', 'Normal');
    data.addColumn('number', 'Critical');
    data.addRows([
        [0, tria.depth, null, null],
        [tria.depth * tria.z1, 0, null, null],
        [tria.depth * (tria.z1 + tria.z2), tria.depth, null, null],
        [(tria.depth - tria.dn) * tria.z1, null, tria.dn, null],
        [tria.depth * tria.z1 + tria.dn * tria.z2, null, tria.dn, null],
        [(tria.depth - tria.dc) * tria.z1, null, null, tria.dc],
        [tria.depth * tria.z1 + tria.dc * tria.z2, null, null, tria.dc]
    ]);

    // Set chart options
    var options = {
        'hAxis': {
            'title': 'Station(ft)'
        },
        'vAxis': {
            'title': 'Depth(ft)'
        },
        'series': {
            0: { lineWidth: 3 },
            2: { linDashStyle: [1, 1] }
        },
        colors: ['black', 'blue', 'red'],
        'width': 450,
        'height': 300
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
*/
function drawCanvas(){
    var canvas = document.getElementById("myCanvas");
    if(canvas == null){
        return;
    }
    if(!canvas.getContext("2d")){
        return;
    }
    var ctx = canvas.getContext("2d");
    
    //drawing 
    var xMin = 0;
    var xMax = tria.depth * (tria.z1 + tria.z2)
    var yMin = 0;
    var yMax = tria.depth;

    var scaleX = (canvas.width - offsetLeft - offsetRight)/ (xMax - xMin);
    var scaleY = (canvas.height - offsetTop - offsetBottom) / (yMax - yMin);

    var x0 = 0.0;
    var y0 = tria.depth;
    var x0s = offsetLeft + (x0 - xMin) * scaleX;
    var y0s = canvas.height - offsetBottom - (y0 - yMin) * scaleY;

    var x1 = tria.depth * tria.z1;
    var y1 = 0;
    var x1s = offsetLeft + (x1 - xMin) * scaleX;
    var y1s = canvas.height -offsetBottom - (y1 - yMin) * scaleY;

    var x2 = tria.depth * (tria.z1 + tria.z2);
    var x2s = offsetLeft + (x2 - xMin) * scaleX;

    var xnl = (tria.depth - tria.dn) * tria.z1;
    var xnr = tria.depth * tria.z1 + tria.dn * tria.z2;
    var xnls = offsetLeft + (xnl - xMin) * scaleX;
    var xnrs = offsetLeft + (xnr - xMin) * scaleX;
    var yns = canvas.height - offsetBottom -(tria.dn - yMin) * scaleY;


    var xcl = (tria.depth - tria.dc) * tria.z1;
    var xcr = tria.depth * tria.z1 + tria.dc * tria.z2;
    var xcls = offsetLeft + (xcl - xMin) * scaleX;
    var xcrs = offsetLeft + (xcr - xMin) * scaleX;
    var ycs = canvas.height - offsetBottom - (tria.dc - yMin) * scaleY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    
    ctx.strokeRect(offsetLeft, offsetTop, canvas.width - offsetLeft - offsetRight, canvas.height - offsetTop - offsetBottom);
    
    //draw channel
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";
    ctx.moveTo(x0s, y0s);
    ctx.lineTo(x1s, y1s);
    ctx.lineTo(x2s, y0s);
    ctx.stroke();
    
    
    //draw grid lines;
    var xInc = niceIncrement(xMin, xMax);
    var xIncDraw = xInc * scaleX;
    
    ctx.beginPath();

    ctx.lineWidth = 1;
    ctx.strokeStyle = "gray";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.setLineDash([4, 2]);
    
    let x = 0;
    let xDraw = offsetLeft;
    var text;
    
    while (xDraw <= canvas.width - offsetRight){
        ctx.moveTo(xDraw, offsetTop);
        ctx.lineTo(xDraw, canvas.height - offsetBottom);
        ctx.fillText(x.toString(), xDraw, canvas.height - 0.75 * offsetBottom);
        xDraw += xIncDraw;
        x += xInc;
    }
    ctx.fillText("Station (ft)", offsetLeft + 0.5 * (canvas.width - offsetLeft - offsetRight), canvas.height - 0.25 * offsetBottom);
    ctx.stroke();
    
    var y = 0;
    var yInc = niceIncrement(yMin, yMax);
    var yIncDraw = yInc * scaleY;
    
    let yDraw = canvas.height - offsetBottom;
    while (yDraw > offsetTop){
        ctx.moveTo(offsetLeft, yDraw);
        ctx.lineTo(canvas.width - offsetRight, yDraw);
        
        text = y.toString();
        if(text.length > 10) {
            text = y.toFixed(yInc.countDecimals());
            ctx.fillText(text, 0.75*offsetLeft, yDraw);
        }
        else {
            ctx.fillText(y.toString(), 0.75*offsetLeft, yDraw);
        }
        yDraw -= yIncDraw;
        y += yInc;
    }
    ctx.save();
    ctx.translate(0.25*offsetLeft, offsetTop + 0.5 * (canvas.height - offsetTop - offsetBottom));
    ctx.rotate(-Math.PI/2);
    ctx.textAlign = "center";
    ctx.fillText("Depth (ft)", 0, 0);
    //ctx.fillText("Depth (ft)", 0.25*offsetLeft, offsetTop + 0.5 * (canvas.height - offsetTop - offsetBottom))     
    ctx.restore();
    
    ctx.stroke();
    
    
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "blue";
    ctx.moveTo(xnls, yns);
    ctx.lineTo(xnrs, yns);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.moveTo(xcls, ycs);
    ctx.lineTo(xcrs, ycs);

    ctx.stroke();
    ctx.restore();
}

function updateGraph(){
    'use strict';

    var svg = document.getElementById('svg');
    if(svg == null){
        return;
    }
      
    svg.setAttribute('width', svg.clientHeight * 1.5);
    //document.getElementById("svgBorderRect").setAttribute("width", svg.clientWidth);
    //document.getElementById("svgBorderRect").setAttribute("height", svg.clientHeight);

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
        yPos = svg.clientHeight - 0.75 * offsetBottom;
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
        xPos = 0.75*offsetLeft;
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


function niceIncrement(Min, Max){
    var maxTicks = 7;
    var niceRange = niceNum(Max - Min, false);
    var increment = niceNum(niceRange/(maxTicks - 1), true);
    return increment;
}


function niceNum(range, bround) {
    var powValue = Math.pow(10, Math.floor(Math.log10(range)));
    var fraction = range / powValue;

    var niceFraction;
    if (bround) {
        if (fraction < 1.5)
        {
            niceFraction = 1;
        }
        else if (fraction < 3)
        {
            niceFraction = 2;
        }
        else if (fraction < 7)
        {
            niceFraction = 5;
        }
        else
        {
            niceFraction = 10;
        }
    }
    else
    {
        if (fraction <= 1)
        {
            niceFraction = 1;
        }
        else if (fraction <= 2)
        {
            niceFraction = 2;
        }
        else if (fraction <= 5)
        {
            niceFraction = 5;
        }
        else
        {
            niceFraction = 10;
        }
    }

    return niceFraction * powValue;
}

// var x = 23.453453453;
// x.countDecimals(); // 9

Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0; 
}

