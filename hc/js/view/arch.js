const arch = new ArchChannel(15.25, 4.91667, 1.25, 6.0, 0.01, 0.013, 0.5);

window.onload = function () {
    checkLocalStorage();

    document.getElementById('rb').setAttribute('value', (arch.rb * 12).toFixed(2));
    document.getElementById('rt').setAttribute('value', (arch.rt * 12).toFixed(2));
    document.getElementById('rc').setAttribute('value', (arch.rc * 12).toFixed(2));
    document.getElementById('rise').setAttribute('value', (arch.rise * 12).toFixed(2));
    document.getElementById('channelSlope').setAttribute('value', arch.cs);
    document.getElementById('manningsN').setAttribute('value', arch.mN);
    document.getElementById('normalDepth').setAttribute('value', arch.dn);
    document.getElementById('discharge').setAttribute('value', arch.Qn.toFixed(2));

    document.getElementById('select').addEventListener("change", respondSelect);
    document.getElementById('rb').addEventListener("change", respondrb);
    document.getElementById('rt').addEventListener("change", respondrt);
    document.getElementById('rc').addEventListener("change", respondrc);
    document.getElementById('rise').addEventListener("change", respondRise);
    document.getElementById('channelSlope').addEventListener("change", respondChannelSlope);
    document.getElementById('manningsN').addEventListener("change", respondManningsN);
    document.getElementById('normalDepth').addEventListener("change", respondNormalDepth);
    document.getElementById('discharge').addEventListener("change", respondDischarge);

    update();
}

function checkLocalStorage() {
    var tmp = localStorage.getItem("arch.rb");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                arch.rb = tmp;
            }
        }
    }

    var tmp = localStorage.getItem("arch.rt");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                arch.rt = tmp;
            }
        }
    }

    var tmp = localStorage.getItem("arch.rc");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                arch.rc = tmp;
            }
        }
    }

    var tmp = localStorage.getItem("arch.rise");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                arch.rise = tmp;
                if (arch.dn > tmp) {
                    arch.dn = tmp;
                }
            }
        }
    }

    tmp = localStorage.getItem("arch.cs");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                arch.cs = tmp;
            }
        }
    }

    tmp = localStorage.getItem("arch.mN");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                arch.mN = tmp;
            }
        }
    }

    tmp = localStorage.getItem("arch.dn");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                if (tmp <= arch.rise) {
                    arch.dn = tmp;
                }
                else {
                    arch.dn = arch.rise;
                }
            }
        }
    }
}


function respondSelect(e) {
    var tmp = document.getElementById('select').value;
    var val = tmp.split(',');

    var rb = parseFloat(val[0]);
    if (isNaN(rb)) {
        alert("Please input a valid number for rb!");
        return;
    }
    else if (rb <= 0) {
        alert("Please input a positive number for rb!");
        return;
    }

    var rt = parseFloat(val[1]);
    if (isNaN(rt)) {
        alert("Please input a valid number for rt!");
        return;
    }
    else if (rt <= 0) {
        alert("Please input a positive number for rt!");
        return;
    }

    var rc = parseFloat(val[2]);
    if (isNaN(rc)) {
        alert("Please input a valid number for rc!");
        return;
    }
    else if (rc <= 0) {
        alert("Please input a positive number for rc!");
        return;
    }

    var rise = parseFloat(val[3]);
    if (isNaN(rise)) {
        alert("Please input a valid number for rise!");
        return;
    }
    else if (rise <= 0) {
        alert("Please input a positive number for rise!");
        return;
    }
    
    document.getElementById('rb').value = rb.toFixed(2);
    document.getElementById('rt').value = rt.toFixed(2);
    document.getElementById('rc').value = rc.toFixed(2);
    document.getElementById('rise').value = rise.toFixed(2);

    localStorage.setItem("arch.rb", arch.rb);
    localStorage.setItem("arch.rt", arch.rt);
    localStorage.setItem("arch.rc", arch.rc);
    localStorage.setItem("arch.rise", arch.rise);

    
    document.getElementById('select').value = '';
    update();
}


function respondrb(e) {
    var tmp = parseFloat(document.getElementById('rb').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for rb!");
        document.getElementById('rb').value = (arch.rb * 12).toFixed(2);
        return;
    }
    else if (tmp <= 0) {
            alert("Please input a positive number for rb!");
            document.getElementById('rb').value = (arch.rb * 12).toFixed(2);
            return;
    }
    else{
        arch.rb = tmp / 12.0;
        localStorage.setItem("arch.rb", arch.rb);
        document.getElementById('discharge').value =  arch.Qn.toFixed(2);
        update();
    }
}
function respondrt(e) {
    var tmp = parseFloat(document.getElementById('rt').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for rt!");
        document.getElementById('rt').value = (arch.rt * 12).toFixed(2);
        return;
    }
    else if (tmp <= 0) {
            alert("Please input a positive number for rt!");
            document.getElementById('rt').value = (arch.rt * 12).toFixed(2);
            return;
    }
    else{
        arch.rt = tmp / 12.0;
        localStorage.setItem("arch.rt", arch.rt);
        document.getElementById('discharge').value =  arch.Qn.toFixed(2);
        update();
    }
}

function respondrc(e) {
    var tmp = parseFloat(document.getElementById('rc').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for rc!");
        document.getElementById('rc').value = (arch.rc * 12).toFixed(2);
        return;
    }
    else if (tmp <= 0) {
            alert("Please input a positive number for rc!");
            document.getElementById('rc').value = (arch.rc * 12).toFixed(2);
            return;
    }
    else{
        arch.rc = tmp / 12.0;
        localStorage.setItem("arch.rc", arch.rc);
        document.getElementById('discharge').value =  arch.Qn.toFixed(2);
        update();
    }
}

function respondRise(e) {
    var tmp = parseFloat(document.getElementById('rise').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for rise!");
        document.getElementById('rise').value = (arch.rise * 12).toFixed(2);
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for rise!");
        document.getElementById('rise').value = (arch.rise * 12).toFixed(2);
        return;
    }
    else {
        tmp /= 12.0;
        if (tmp < arch.dn) {
            alert('Normal depth is lowered to rise!');
            arch.dn = tmp;
            localStorage.setItem("arch.dn", arch.dn);
            document.getElementById('normalDepth').value = arch.dn.toFixed(2);
        }
        arch.rise = tmp;
        localStorage.setItem("arch.rise", arch.rise);
        document.getElementById('discharge').value = arch.Qn.toFixed(2);
        update();
    }
}

function respondChannelSlope(e) {
    var tmp = parseFloat(document.getElementById('channelSlope').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for channel slope!");
        document.getElementById('channelSlope').value = arch.cs;
        return;
    }
    else if (tmp <= 0){
        alert("Please input a positive number for channel slope!");
        document.getElementById('channelSlope').value = arch.cs;
        return;
    }
    else {
        arch.cs = tmp;
        localStorage.setItem("arch.cs", arch.cs);
        document.getElementById('discharge').value = arch.Qn.toFixed(2);
        update();
    }
}
function respondManningsN(e) {
    var tmp = parseFloat(document.getElementById('manningsN').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for manningsN!");
        document.getElementById('manningsN').value = arch.mN;
        return;
    } else if(tmp <= 0){
        alert("Please input a positive number for manningsN!");
        document.getElementById('manningsN').value = arch.mN;
        return;
    }
    else {
        arch.mN = tmp;
        localStorage.setItem("arch.mN", arch.mN);
        document.getElementById('discharge').value = arch.Qn.toFixed(2);
        update();
    }
}
function respondNormalDepth(e) {
    var tmp = parseFloat(document.getElementById('normalDepth').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for normal depth!");
        document.getElementById('normalDepth').value = arch.dn;
        return;
    } 
    else if(tmp <= 0) {
        alert("Please input a possive number for normal depth!");
        document.getElementById('normalDepth').value = arch.dn;
        return;
    }
    else if(tmp > arch.rise) {
        alert('Please input a normal depth <= rise!');
        document.getElementById('normalDepth').value = arch.dn;
        return;
    }
    else {
        arch.dn = tmp;
        localStorage.setItem("arch.dn", arch.dn);
        document.getElementById('discharge').value = arch.Qn.toFixed(2);
        update();
    }
}
function respondDischarge(e) {
    var tmp = parseFloat(document.getElementById('discharge').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for discharge!");
        document.getElementById('discharge').value = arch.Qn.toFixed(2);
        return;
    }
    else if(tmp <= 0) {
        alert("Please input a positive number for discharge!");
        document.getElementById('discharge').value = arch.Qn.toFixed(2);
        return;
    }
    else if(tmp >= arch.Qmax){
        alert('Please input a discharge <= ' + arch.Qmax.toFixed(2));
        document.getElementById('discharge').value = arch.Qn.toFixed(2);
        return;
    }
    else {
        arch.dn = arch.Q2Dn(tmp, arch.rb, arch.rt, arch.rc, arch.rise);
        localStorage.setItem("arch.dn", arch.dn);
        document.getElementById('normalDepth').value = arch.dn.toFixed(2);
        update();
    }
}

function setValues() {

    if(!(document.getElementById('area'))){       
       return;
    }
    document.getElementById('area').innerHTML = arch.an.toFixed(3);
    document.getElementById('perimeter').innerHTML = arch.pn.toFixed(3);
    document.getElementById('velocity').innerHTML = arch.vn.toFixed(3);
    document.getElementById('criticalDepth').innerHTML = arch.dc.toFixed(3);
    document.getElementById('criticalVelocity').innerHTML = arch.vc.toFixed(3);
    document.getElementById('criticalSlope').innerHTML = arch.sc.toFixed(3);
    document.getElementById('froudeNumber').innerHTML = arch.fr.toFixed(3);
    document.getElementById('capacity').innerHTML = arch.Qmax.toFixed(3);
    document.getElementById('ymax').innerHTML = arch.ymax.toFixed(3);
}

function update(){
    'use strict';
    setValues();
    
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
    let xF = arch.XF;
    var xMax = 2.0 * xF;
    var yMin = 0;
    var yMax = arch.rise;

    var scaleX = (chart.clientWidth - offsetLeft - offsetRight)/ (xMax - xMin);
    var scaleY = (chart.clientHeight - offsetTop - offsetBottom) / (yMax - yMin);

    if(scaleX >= scaleY){
        scaleX = scaleY;
    }
    else{
        scaleY = scaleX;
    }

    //displacement for x to move circle to the middle
    var dxs = 0.5 * (-offsetLeft + chart.clientWidth - offsetRight); 

    // draw arch 
    var Theta = arch.Theta;
    var Phi = arch.Phi;
    var th = Theta / Math.PI * 180.0;
    var ph = Phi / Math.PI * 180.0;
    
    var xE = arch.XE;
    var yE = arch.YE;
    var xEs = offsetLeft + (xE - xMin) * scaleX + dxs;
    var xEns = offsetLeft + (-xE - xMin) * scaleX + dxs;
    var yEs = chart.clientHeight - offsetBottom - (yE - yMin) * scaleY;
    var rbxs = arch.rb * scaleX;
    var rbys = arch.rb * scaleY;
    
    var xG = arch.XG;
    var yG = arch.YG;
    var xGs = offsetLeft + (xG - xMin) * scaleX + dxs;
    var xGns = offsetLeft + (-xG - xMin) * scaleX + dxs;
    var yGs = chart.clientHeight - offsetBottom - (yG - yMin) * scaleY;
    var rcxs = arch.rc * scaleX;
    var rcys = arch.rc * scaleY;
    
    var rtxs = arch.rt * scaleX;
    var rtys = arch.rt * scaleY;
    
    //normal water surface
    var xnr = arch.y2T(arch.dn, arch.rb, arch.rt, arch.rc, arch.rise) / 2.0;
    var xnl = -xnr;
    var xnls = offsetLeft + (xnl - xMin) * scaleX + dxs;
    var xnrs = offsetLeft + (xnr - xMin) * scaleX + dxs;
    var yns = chart.clientHeight - offsetBottom -(arch.dn - yMin) * scaleY;

    //critical water surface
    var xcr = arch.y2T(arch.dc, arch.rb, arch.rt, arch.rc, arch.rise) / 2.0;;
    var xcl = -xcr;
    var xcls = offsetLeft + (xcl - xMin) * scaleX + dxs;
    var xcrs = offsetLeft + (xcr - xMin) * scaleX + dxs;
    var ycs = chart.clientHeight - offsetBottom - (arch.dc - yMin) * scaleY;

    
    document.getElementById('pathChan').setAttribute('d', 'M ' + xEs + ' ' + yEs + 
                                                     ' A ' + rbxs + ' ' + rbys + ' ' + (2*th) + ' 0 1 ' + xEns + ' ' + yEs + 
                                                     ' A ' + rcxs + ' ' + rcys + ' ' + (180 - th - ph) + ' 0 1 ' + xGns + ' ' + yGs + 
                                                     ' A ' + rtxs + ' ' + rtys + ' ' + (2*ph) + ' 0 1 ' + xGs + ' ' + yGs + 
                                                     ' A ' + rcxs + ' ' + rcys + ' ' + (180 - th - ph) + ' 0 1 ' + xEs + ' ' + yEs);

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
    
    //vertical grid lines and labels
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
    
    //make extra labels blank
    for (; i < 10; i++){
        idLabel = 'xTick' + i;
        document.getElementById(idLabel).childNodes[0].textContent = ' ';
    }

    document.getElementById('pathGridY').setAttribute('d', xGrid);

    //horizontal grid lines and labels
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

    // horizontal axis label (station ft)
    xPos = offsetLeft + 0.5 * (chart.clientWidth - offsetLeft - offsetRight);
    yPos = chart.clientHeight - 0.25 * offsetBottom;
    document.getElementById('xLabel').setAttribute("x", xPos);
    document.getElementById('xLabel').setAttribute("y", yPos);
    
    //draw and label rb
    var xB = arch.rb * Math.sin(0.5 * Theta);
    var yB = arch.rb * (1.0 - Math.cos(0.5 * Theta));
    var xO = (arch.rb - 0.4 * arch.rise) * Math.sin(0.5 * Theta);
    var yO = arch.rb - (arch.rb - 0.4 * arch.rise) * Math.cos(0.5 * Theta);

    var xBs = offsetLeft + (xB - xMin) * scaleX + dxs;
    var yBs = chart.clientHeight - offsetBottom - (yB - yMin) * scaleY;
    var xOs = offsetLeft + (xO - xMin) * scaleX + dxs;
    var yOs = chart.clientHeight - offsetBottom - (yO - yMin) * scaleY;
 
    document.getElementById('pathRb').setAttribute('d', 'M' + xOs + ' ' + yOs + 'L' + xBs + ' ' + yBs);
    
    var RbLeft = offsetLeft + (0.5 * (xB + xO) - xMin) * scaleX + dxs + 2;
    var RbTop = chart.clientHeight - offsetBottom - (0.5 * (yB + yO) - yMin) * scaleY - 10;
    document.getElementById('rbLabel').setAttribute("x", RbLeft);
    document.getElementById('rbLabel').setAttribute("y", RbTop);

    //draw and label rt
    var xT = arch.rt * Math.sin(0.5 * Phi);
    var yT = arch.rise - arch.rt + arch.rt * Math.cos(0.5 * Phi);
        xO = 0.6 * xT;
        yO = arch.rise - arch.rt + 0.6 * arch.rt * Math.cos(0.5 * Phi);
    var xTs = offsetLeft + (xT - xMin) * scaleX + dxs;
    var yTs = chart.clientHeight - offsetBottom - (yT - yMin) * scaleY;
    var xOs = offsetLeft + (xO - xMin) * scaleX + dxs;
    var yOs = chart.clientHeight - offsetBottom - (yO - yMin) * scaleY;
 
    document.getElementById('pathRt').setAttribute('d', 'M' + xOs + ' ' + yOs + 'L' + xTs + ' ' + yTs);

    var RtLeft = offsetLeft + (0.5 * (xT + xO) - xMin) * scaleX + dxs ;
    var RtTop = chart.clientHeight - offsetBottom - (0.5 * (yT + yO) - yMin) * scaleY;

    document.getElementById('rtLabel').setAttribute("x", RtLeft);
    document.getElementById('rtLabel').setAttribute("y", RtTop);

    //draw and label rc
    var xC = arch.XD + arch.rc * Math.sin(Math.PI / 4.0);
    var yC = arch.YD - arch.rc * Math.cos(Math.PI / 4.0);
    var xCs = offsetLeft + (xC - xMin) * scaleX + dxs;
    var yCs = chart.clientHeight - offsetBottom - (yC - yMin) * scaleY;
    var xDs = offsetLeft + (arch.XD - xMin) * scaleX + dxs;
    var yDs = chart.clientHeight - offsetBottom - (arch.YD - yMin) * scaleY;

    document.getElementById('pathRc').setAttribute('d', 'M' + xDs + ' ' + yDs + 'L' + xCs + ' ' + yCs);

    var RcLeft = offsetLeft + (0.5 * (xC + arch.XD) - xMin) * scaleX + dxs ;
    var RcTop = chart.clientHeight - offsetBottom - (0.5 * (yC + arch.YD) - yMin) * scaleY - 15;
    document.getElementById('rcLabel').setAttribute("x", RcLeft);
    document.getElementById('rcLabel').setAttribute("y", RcTop);

    document.getElementById('rbLabel').childNodes[0].textContent = "Rb";
    document.getElementById('rtLabel').childNodes[0].textContent = "Rt";
    document.getElementById('rcLabel').childNodes[0].textContent = "Rc";

    document.getElementById('pathRb').setAttribute('stroke', 'black');
    document.getElementById('pathRt').setAttribute('stroke', 'black');
    document.getElementById('pathRc').setAttribute('stroke', 'black');

}

