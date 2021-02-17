const arch = new ArchChannel(15.25, 4.91667, 1.25, 6.0, 0.01, 0.013, 0.5);

window.onload = function () {

    checkLocalStorage();

    document.getElementById('rb').value = oc.isUSCustomary ? (arch.rb * 12).toFixed(2) : (arch.rb * 1000).toFixed(0);
    document.getElementById('rt').value = oc.isUSCustomary ? (arch.rt * 12).toFixed(2) : (arch.rt * 1000).toFixed(0);
    document.getElementById('rc').value = oc.isUSCustomary ? (arch.rc * 12).toFixed(2) : (arch.rc * 1000).toFixed(0);
    document.getElementById('rise').value = oc.isUSCustomary ? (arch.rise * 12).toFixed(2) : (arch.rise * 1000).toFixed(0);
    document.getElementById('channelSlope').setAttribute('value', arch.cs);
    document.getElementById('manningsN').setAttribute('value', arch.mN);
    document.getElementById('normalDepth').setAttribute('value', arch.dn.toFixed(2));
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

    tmp = localStorage.getItem("oc.isUSCustomary");
    if (tmp !== null) oc.isUSCustomary = tmp ==="false" ? false : true;
    
    if(!oc.isUSCustomary) {
        arch.rb /= oc.m2ft;
        arch.rt /= oc.m2ft;
        arch.rc /= oc.m2ft;
        arch.rise /= oc.m2ft;
        arch.dn /= oc.m2ft;
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
    
    var numdigit = 2;

    if (!oc.isUSCustomary) {
        rb *= oc.in2mm;
        rt *= oc.in2mm;
        rc *= oc.in2mm;
        rise *= oc.in2mm;
        numdigit = 0;
    } 
    
    
    document.getElementById('rb').value = rb.toFixed(numdigit);
    document.getElementById('rt').value = rt.toFixed(numdigit);
    document.getElementById('rc').value = rc.toFixed(numdigit);
    document.getElementById('rise').value = rise.toFixed(numdigit);

    if (!oc.isUSCustomary) {
        arch.rb = rb / 1000;
        arch.rt = rt / 1000;
        arch.rc = rc / 1000;
        arch.rise = rise / 1000;
    }
    else {
        arch.rb = rb / oc.ft2in;
        arch.rt = rt / oc.ft2in;
        arch.rc = rc / oc.ft2in;
        arch.rise = rise / oc.ft2in;
    }
    
    if(oc.isUSCustomary) {
        localStorage.setItem("arch.rb", arch.rb);
        localStorage.setItem("arch.rt", arch.rt);
        localStorage.setItem("arch.rc", arch.rc);
        localStorage.setItem("arch.rise", arch.rise);
    }
    else {
        localStorage.setItem("arch.rb", arch.rb * oc.m2ft);
        localStorage.setItem("arch.rt", arch.rt * oc.m2ft);
        localStorage.setItem("arch.rc", arch.rc * oc.m2ft);
        localStorage.setItem("arch.rise", arch.rise * oc.m2ft);
    }
    
    document.getElementById('select').value = '';
    update();
}


function respondrb(e) {
    var tmp = parseFloat(document.getElementById('rb').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for rb!");
        if (oc.isUSCustomary) document.getElementById('rb').value = (arch.rb * 12).toFixed(2);
        else document.getElementById('rb').value = (arch.rb * 1000).toFixed(2);
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for rb!");
        if (oc.isUSCustomary) document.getElementById('rb').value = (arch.rb * 12).toFixed(2);
        else document.getElementById('rb').value = (arch.rb * 1000).toFixed(2);
        return;
    }
    else{
        arch.rb = oc.isUSCustomary ? tmp / 12 : tmp / 1000;
        if(oc.isUSCustomary)
            localStorage.setItem("arch.rb", arch.rb);
        else
            localStorage.setItem("arch.rb", arch.rb * 3.28);
            
        document.getElementById('discharge').value =  arch.Qn.toFixed(2);
        update();
    }
}
function respondrt(e) {
    var tmp = parseFloat(document.getElementById('rt').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for rt!");
        if (oc.isUSCustomary) document.getElementById('rt').value = (arch.rt * 12).toFixed(2);
        else document.getElementById('rt').value = (arch.rt * 1000).toFixed(2);
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for rt!");
        if (oc.isUSCustomary) document.getElementById('rt').value = (arch.rt * 12).toFixed(2);
        else document.getElementById('rt').value = (arch.rt * 1000).toFixed(2);
        return;
    }
    else{
        arch.rt = oc.isUSCustomary ? tmp / 12 : tmp / 1000;
        if(oc.isUSCustomary)
            localStorage.setItem("arch.rt", arch.rt);
        else
            localStorage.setItem("arch.rt", arch.rt * 3.28);
            
        document.getElementById('discharge').value =  arch.Qn.toFixed(2);
        update();
    }
}

function respondrc(e) {
    var tmp = parseFloat(document.getElementById('rc').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for rc!");
        if(oc.isUSCustomary)document.getElementById('rc').value = (arch.rc * 12).toFixed(2);
        else document.getElementById('rc').value = (arch.rc * 1000).toFixed(2);
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for rc!");
        if(oc.isUSCustomary)document.getElementById('rc').value = (arch.rc * 12).toFixed(2);
        else document.getElementById('rc').value = (arch.rc * 1000).toFixed(2);
        return;
    }
    else{
        arch.rc = oc.isUSCustomary ? tmp / 12 : tmp / 1000;
        if(oc.isUSCustomary)
            localStorage.setItem("arch.rc", arch.rc);
        else
            localStorage.setItem("arch.rc", arch.rc * 3.28);
            
        document.getElementById('discharge').value =  arch.Qn.toFixed(2);
        update();
    }
}

function respondRise(e) {
    var tmp = parseFloat(document.getElementById('rise').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for rise!");
        if(oc.isUSCustomary)document.getElementById('rise').value = (arch.rise * 12).toFixed(2);
        else document.getElementById('rise').value = (arch.rise * 1000).toFixed(2);
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for rise!");
        if(oc.isUSCustomary)document.getElementById('rise').value = (arch.rise * 12).toFixed(2);
        else document.getElementById('rise').value = (arch.rise * 1000).toFixed(2);
        return;
    }
    else {
        tmp /= oc.isUSCustomary ? 12 : 1000;
        if (tmp < arch.dn) {
            alert('Normal depth is lowered to rise!');
            arch.dn = tmp;
            if(oc.isUSCustomary)
                localStorage.setItem("arch.dn", arch.dn);
            else
                localStorage.setItem("arch.dn", arch.dn * 3.28);
                
            document.getElementById('normalDepth').value = arch.dn.toFixed(2);
        }
        arch.rise = tmp;
        if (oc.isUSCustomary)
            localStorage.setItem("arch.rise", arch.rise);
        else
            localStorage.setItem("arch.rise", arch.rise * 3.28);
            
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
        if (oc.isUSCustomary)
            localStorage.setItem("arch.dn", arch.dn);
        else
            localStorage.setItem("arch.dn", arch.dn * 3.28);
            
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
        if(oc.isUSCustomary)
            localStorage.setItem("arch.dn", arch.dn);
        else
            localStorage.setItem("arch.dn", arch.dn * 3.28);
            
        document.getElementById('normalDepth').value = arch.dn.toFixed(2);
        update();
    }
}

function setValues() {

    if(!(document.getElementById('area'))) return;

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

function initArch(){
    init(true, true);
    if(!oc.isUSCustomary){
        document.getElementById("rtUnit").childNodes[0].textContent = "mm";
        document.getElementById("rbUnit").childNodes[0].textContent = "mm";
        document.getElementById("rcUnit").childNodes[0].textContent = "mm";
        document.getElementById("riseUnit").childNodes[0].textContent = "mm";
    }
    if(!oc.isLightMode) {
        document.getElementById('select').style.background = 'black';
        document.getElementById('select').style.color = 'white';

        document.getElementById('rb').style.background = 'black';
        document.getElementById('rb').style.color = 'white';

        document.getElementById('rt').style.background = 'black';
        document.getElementById('rt').style.color = 'white';

        document.getElementById('rc').style.background = 'black';
        document.getElementById('rc').style.color = 'white';

        document.getElementById('rise').style.background = 'black';
        document.getElementById('rise').style.color = 'white';
    }
}


function update(){
    'use strict';
    setValues();
    
    var chart = document.getElementById('chart');
    if(chart == null){
        return;
    }
      
    //drawing 
    var xMin = 0;
    let xF = arch.XF;
    var xMax = 2.0 * xF;
    var yMin = 0;
    var yMax = arch.rise;

    var scaleX = (chart.clientWidth - oc.offsetLeft - oc.offsetRight)/ (xMax - xMin);
    var scaleY = (chart.clientHeight - oc.offsetTop - oc.offsetBottom) / (yMax - yMin);

    if(scaleX >= scaleY){
        scaleX = scaleY;
    }
    else{
        scaleY = scaleX;
    }

    //displacement for x to move circle to the middle
    var dxs = 0.5 * (-oc.offsetLeft + chart.clientWidth - oc.offsetRight); 

    // draw arch 
    var Theta = arch.Theta;
    var Phi = arch.Phi;
    var th = Theta / Math.PI * 180.0;
    var ph = Phi / Math.PI * 180.0;
    
    var xE = arch.XE;
    var yE = arch.YE;
    var xEs = oc.offsetLeft + (xE - xMin) * scaleX + dxs;
    var xEns = oc.offsetLeft + (-xE - xMin) * scaleX + dxs;
    var yEs = chart.clientHeight - oc.offsetBottom - (yE - yMin) * scaleY;
    var rbxs = arch.rb * scaleX;
    var rbys = arch.rb * scaleY;
    
    var xG = arch.XG;
    var yG = arch.YG;
    var xGs = oc.offsetLeft + (xG - xMin) * scaleX + dxs;
    var xGns = oc.offsetLeft + (-xG - xMin) * scaleX + dxs;
    var yGs = chart.clientHeight - oc.offsetBottom - (yG - yMin) * scaleY;
    var rcxs = arch.rc * scaleX;
    var rcys = arch.rc * scaleY;
    
    var rtxs = arch.rt * scaleX;
    var rtys = arch.rt * scaleY;
    
    //normal water surface
    var xnr = arch.y2x(arch.dn, arch.rb, arch.rt, arch.rc, arch.rise);
    var xnl = -xnr;
    var xnls = oc.offsetLeft + (xnl - xMin) * scaleX + dxs;
    var xnrs = oc.offsetLeft + (xnr - xMin) * scaleX + dxs;
    var yns = chart.clientHeight - oc.offsetBottom -(arch.dn - yMin) * scaleY;

    //critical water surface
    var xcr = arch.y2x(arch.dc, arch.rb, arch.rt, arch.rc, arch.rise);
    var xcl = -xcr;
    var xcls = oc.offsetLeft + (xcl - xMin) * scaleX + dxs;
    var xcrs = oc.offsetLeft + (xcr - xMin) * scaleX + dxs;
    var ycs = chart.clientHeight - oc.offsetBottom - (arch.dc - yMin) * scaleY;

    
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
    let y = chart.clientHeight - oc.offsetBottom;
    let xmid = 0.5 * (oc.offsetLeft + chart.clientWidth - oc.offsetRight);
    let xDraw = xmid;
    var xGrid = '';
    var text;
    var xPos;
    var yPos = chart.clientHeight - 0.65 * oc.offsetBottom;
    var idLabel;
    var i = 1;
    
    //vertical grid lines and labels
    while (xDraw <= chart.clientWidth - oc.offsetRight && i <= 5){
        xGrid += 'M' + xDraw + ' ' + oc.offsetTop + 'L' + xDraw + ' ' + y;

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
    while (xDraw > oc.offsetLeft + xIncDraw && i <= 10){
        xDraw -= xIncDraw;
        xGrid += 'M' + xDraw + ' ' + oc.offsetTop + 'L' + xDraw + ' ' + y;

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
    let yDraw = chart.clientHeight - oc.offsetBottom;
    var yGrid = '';
    x = chart.clientWidth - oc.offsetRight;
    y = 0;
    i = 1;
    while (yDraw > oc.offsetTop){
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

    // horizontal axis label (station ft)
    xPos = oc.offsetLeft + 0.5 * (chart.clientWidth - oc.offsetLeft - oc.offsetRight);
    yPos = chart.clientHeight - 0.25 * oc.offsetBottom;
    document.getElementById('xLabel').setAttribute("x", xPos);
    document.getElementById('xLabel').setAttribute("y", yPos);
    
    //draw and label rb
    var xB = arch.rb * Math.sin(0.5 * Theta);
    var yB = arch.rb * (1.0 - Math.cos(0.5 * Theta));
    var xO = (arch.rb - 0.4 * arch.rise) * Math.sin(0.5 * Theta);
    var yO = arch.rb - (arch.rb - 0.4 * arch.rise) * Math.cos(0.5 * Theta);

    var xBs = oc.offsetLeft + (xB - xMin) * scaleX + dxs;
    var yBs = chart.clientHeight - oc.offsetBottom - (yB - yMin) * scaleY;
    var xOs = oc.offsetLeft + (xO - xMin) * scaleX + dxs;
    var yOs = chart.clientHeight - oc.offsetBottom - (yO - yMin) * scaleY;
 
    document.getElementById('pathRb').setAttribute('d', 'M' + xOs + ' ' + yOs + 'L' + xBs + ' ' + yBs);
    
    var RbLeft = oc.offsetLeft + (0.5 * (xB + xO) - xMin) * scaleX + dxs + 2;
    var RbTop = chart.clientHeight - oc.offsetBottom - (0.5 * (yB + yO) - yMin) * scaleY - 10;
    document.getElementById('rbLabel').setAttribute("x", RbLeft);
    document.getElementById('rbLabel').setAttribute("y", RbTop);

    //draw and label rt
    var xT = arch.rt * Math.sin(0.5 * Phi);
    var yT = arch.rise - arch.rt + arch.rt * Math.cos(0.5 * Phi);
        xO = 0.6 * xT;
        yO = arch.rise - arch.rt + 0.6 * arch.rt * Math.cos(0.5 * Phi);
    var xTs = oc.offsetLeft + (xT - xMin) * scaleX + dxs;
    var yTs = chart.clientHeight - oc.offsetBottom - (yT - yMin) * scaleY;
    var xOs = oc.offsetLeft + (xO - xMin) * scaleX + dxs;
    var yOs = chart.clientHeight - oc.offsetBottom - (yO - yMin) * scaleY;
 
    document.getElementById('pathRt').setAttribute('d', 'M' + xOs + ' ' + yOs + 'L' + xTs + ' ' + yTs);

    var RtLeft = oc.offsetLeft + (0.5 * (xT + xO) - xMin) * scaleX + dxs ;
    var RtTop = chart.clientHeight - oc.offsetBottom - (0.5 * (yT + yO) - yMin) * scaleY;

    document.getElementById('rtLabel').setAttribute("x", RtLeft);
    document.getElementById('rtLabel').setAttribute("y", RtTop);

    //draw and label rc
    var xC = arch.XD + arch.rc * Math.sin(Math.PI / 4.0);
    var yC = arch.YD - arch.rc * Math.cos(Math.PI / 4.0);
    var xCs = oc.offsetLeft + (xC - xMin) * scaleX + dxs;
    var yCs = chart.clientHeight - oc.offsetBottom - (yC - yMin) * scaleY;
    var xDs = oc.offsetLeft + (arch.XD - xMin) * scaleX + dxs;
    var yDs = chart.clientHeight - oc.offsetBottom - (arch.YD - yMin) * scaleY;

    document.getElementById('pathRc').setAttribute('d', 'M' + xDs + ' ' + yDs + 'L' + xCs + ' ' + yCs);

    var RcLeft = oc.offsetLeft + (0.5 * (xC + arch.XD) - xMin) * scaleX + dxs ;
    var RcTop = chart.clientHeight - oc.offsetBottom - (0.5 * (yC + arch.YD) - yMin) * scaleY - 15;
    document.getElementById('rcLabel').setAttribute("x", RcLeft);
    document.getElementById('rcLabel').setAttribute("y", RcTop);
}

