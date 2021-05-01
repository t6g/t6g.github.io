window.onload = function () {
    var tmp = localStorage.getItem("oc.isUSCustomary");
    if (tmp !== null) oc.isUSCustomary = tmp ==="false" ? false : true;

    if (oc.isUSCustomary) {
        document.getElementById('unit').checked = true;
        //document.getElementById('labelUnit').childNodes[0].textContent = 'US Customary Unit';
    }
    else {
        document.getElementById('unit').checked = false;
        //document.getElementById('labelUnit').childNodes[0].textContent = 'SI Unit';
    }

    var tmp = localStorage.getItem("oc.isLightMode");
    if (tmp !== null) oc.isLightMode = tmp ==="false" ? false : true;

    
    if (oc.isLightMode) {
        document.getElementById('mode').checked = true;
        //document.getElementById('labelMode').childNodes[0].textContent = 'Light Mode';
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
    }
    else {
        document.getElementById('mode').checked = false;
        //document.getElementById('labelMode').childNodes[0].textContent = 'Dark Mode';

        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";

    }

    document.getElementById('unit').addEventListener("change", respondUnit);
    document.getElementById('mode').addEventListener("change", respondMode);
}

function initSettings(){
    if (!oc.isLightMode) {
        document.getElementById('navTria').setAttribute('fill', 'white');
        document.getElementById('navTrap').setAttribute('fill', 'white');
        document.getElementById('navRect').setAttribute('fill', 'white');
        document.getElementById('navCirc').setAttribute('fill', 'white');
        document.getElementById('navElli').setAttribute('fill', 'white');
        document.getElementById('navPara').setAttribute('fill', 'white');
        document.getElementById('navArch').setAttribute('fill', 'white');
        document.getElementById('navSett').setAttribute('fill', 'white');
        document.getElementById('navHamb').setAttribute('fill', 'white');
        document.getElementById('svgGroup').setAttribute('fill', 'white');
    }
}


function respondUnit(e) {
    oc.isUSCustomary = document.getElementById('unit').checked;
    localStorage.setItem("oc.isUSCustomary", oc.isUSCustomary);

    //if(oc.isUSCustomary) {
    //    document.getElementById('labelUnit').childNodes[0].textContent = 'US Customary Unit';
    //}
    //else {
    //    document.getElementById('labelUnit').childNodes[0].textContent = 'SI Unit';
    //}
}

function respondMode(e) {
    oc.isLightMode = document.getElementById('mode').checked;
    localStorage.setItem("oc.isLightMode", oc.isLightMode);

    if(oc.isLightMode){
        //document.getElementById('labelMode').childNodes[0].textContent = 'Light Mode';
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";

        document.getElementById('navTria').setAttribute('fill', 'black');
        document.getElementById('navTrap').setAttribute('fill', 'black');
        document.getElementById('navRect').setAttribute('fill', 'black');
        document.getElementById('navIrri').setAttribute('fill', 'black');
        document.getElementById('navCirc').setAttribute('fill', 'black');
        document.getElementById('navElli').setAttribute('fill', 'black');
        document.getElementById('navPara').setAttribute('fill', 'black');
        document.getElementById('navArch').setAttribute('fill', 'black');
        document.getElementById('navSett').setAttribute('fill', 'black');
        document.getElementById('navHamb').setAttribute('fill', 'black');
        document.getElementById('svgGroup').setAttribute('fill', 'black');
        //localStorage.removeItem("oc.isLightMode");
    }
    else {
        //document.getElementById('labelMode').childNodes[0].textContent = 'Dark Mode';
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";

        document.getElementById('navTria').setAttribute('fill', 'white');
        document.getElementById('navTrap').setAttribute('fill', 'white');
        document.getElementById('navRect').setAttribute('fill', 'white');
        document.getElementById('navCirc').setAttribute('fill', 'white');
        document.getElementById('navElli').setAttribute('fill', 'white');
        document.getElementById('navPara').setAttribute('fill', 'white');
        document.getElementById('navArch').setAttribute('fill', 'white');
        document.getElementById('navSett').setAttribute('fill', 'white');
        document.getElementById('navHamb').setAttribute('fill', 'white');
        document.getElementById('svgGroup').setAttribute('fill', 'white');
    
    }
}
