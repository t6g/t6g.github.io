// Hydraulic Calculator ocvw.js 1.0 2021-02-14 by GT
//Open Channel View

function init(isClosedConduit, isArch) {

    if(!(document.getElementById('area'))) return;
    
    if(isClosedConduit === undefined || !isClosedConduit){
        w3.hide('#spanCapacity');
        w3.hide('#spanYmax');
    }

    if(isArch === undefined || !isArch){
        w3.hide('#pathRb');
        w3.hide('#pathRt');
        w3.hide('#pathRc');
        w3.hide('#rtLabel');
        w3.hide('#rbLabel');
        w3.hide('#rcLabel');
    }
    
    var tmp = localStorage.getItem("oc.isUSCustomary");
    if (tmp !== null) oc.isUSCustomary = tmp ==="false" ? false : true;

    if(!oc.isUSCustomary){
        document.getElementById("areaUnit").childNodes[0].textContent = "m";
        document.getElementById("periUnit").childNodes[0].textContent = "m";
        document.getElementById("veloUnit").childNodes[0].textContent = "m/s";
        document.getElementById("dcUnit").childNodes[0].textContent = "m";
        document.getElementById("vcUnit").childNodes[0].textContent = "m/s";
        document.getElementById("dnUnit").childNodes[0].textContent = "m";
        document.getElementById("qnUnit").childNodes[0].textContent = "m";
        
        if(isClosedConduit) {
            document.getElementById("qmaxUnit").childNodes[0].textContent = "m";
            document.getElementById("ymaxUnit").childNodes[0].textContent = "m";
        }
        
        document.getElementById('xLabel').childNodes[0].textContent = "Station (m)"
        document.getElementById('yLabel').childNodes[0].textContent = "Depth (m)"
    }
    
    
    var chart = document.getElementById('chart');
    if(chart == null) return;

    document.getElementById('axesRect').setAttribute('x', oc.offsetLeft);
    document.getElementById('axesRect').setAttribute('y', ocvw.offsetTop);
    document.getElementById('axesRect').setAttribute('width', chart.clientWidth- oc.offsetLeft - ocvw.offsetRight);
    document.getElementById('axesRect').setAttribute('height', chart.clientHeight - ocvw.offsetTop - ocvw.offsetBottom);

    var tmp = localStorage.getItem("oc.isLightMode");
    if (tmp !== null) oc.isLightMode = tmp ==="false" ? false : true;
    else oc.isLightMode = true;

    if (!oc.isLightMode) {
        
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        
        document.getElementById('channelSlope').style.background = 'black';
        document.getElementById('channelSlope').style.color = 'white';

        document.getElementById('manningsN').style.background = 'black';
        document.getElementById('manningsN').style.color = 'white';

        document.getElementById('normalDepth').style.background = 'black';
        document.getElementById('normalDepth').style.color = 'white';
        
        document.getElementById('discharge').style.background = 'black';
        document.getElementById('discharge').style.color = 'white';
        
        document.getElementById('pathChan').setAttribute('stroke', 'white');
        document.getElementById('axesRect').setAttribute('stroke', 'white');

        document.getElementById('xLabel').setAttribute('fill', 'white');
        document.getElementById('yLabel').setAttribute('fill', 'white');

        let i = 1;
        var idLabel = 'xTick';

        
        for (i = 1; i < 10; i++){
            idLabel = 'xTick' + i;
            document.getElementById(idLabel).setAttribute('fill', 'white');
        }
        
        for (i = 1; i < 10; i++){
            idLabel = 'yTick' + i;
            document.getElementById(idLabel).setAttribute('fill', 'white');
        }
        
        document.getElementById('navTria').setAttribute('fill', 'white');
        document.getElementById('navTrap').setAttribute('fill', 'white');
        document.getElementById('navRect').setAttribute('fill', 'white');
        document.getElementById('navIrre').setAttribute('fill', 'white');
        document.getElementById('navCirc').setAttribute('fill', 'white');
        document.getElementById('navElli').setAttribute('fill', 'white');
        document.getElementById('navPara').setAttribute('fill', 'white');
        document.getElementById('navArch').setAttribute('fill', 'white');
        document.getElementById('navSett').setAttribute('fill', 'white');
        document.getElementById('navHamb').setAttribute('fill', 'white');
        document.getElementById('svgGroup').setAttribute('fill', 'white');
        
        if(isArch){
            document.getElementById('pathRt').setAttribute('stroke', 'white');
            document.getElementById('pathRb').setAttribute('stroke', 'white');
            document.getElementById('pathRc').setAttribute('stroke', 'white');

            document.getElementById('rtLabel').setAttribute('fill', 'white');
            document.getElementById('rbLabel').setAttribute('fill', 'white');
            document.getElementById('rcLabel').setAttribute('fill', 'white');
        }
    }
    update();
}



