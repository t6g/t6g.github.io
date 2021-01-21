// JavaScript source code
'use strict'
const Ku = 1.487;
const g = 32.17;
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
    google.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

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
        drawChart();
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
        drawChart();
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
        drawChart();
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
        drawChart();
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
        drawChart();
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
        drawChart();
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
