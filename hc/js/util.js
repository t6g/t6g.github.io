// Hydraulic Calculator util.js 1.0 2021-02-07 by GT

function hambergerClick(){
    if(document.getElementById('Tria').style.display === 'none') {
        document.getElementById('Tria').style.display = 'block';
        document.getElementById('Rect').style.display = 'block';
        document.getElementById('Trap').style.display = 'block';
        document.getElementById('Para').style.display = 'block';
        document.getElementById('Circ').style.display = 'block';
        document.getElementById('Elli').style.display = 'block';
        document.getElementById('Arch').style.display = 'block';
        document.getElementById('Sett').style.display = 'block';
    }
    else {
        document.getElementById('Tria').style.display = 'none';
        document.getElementById('Rect').style.display = 'none';
        document.getElementById('Trap').style.display = 'none';
        document.getElementById('Para').style.display = 'none';
        document.getElementById('Circ').style.display = 'none';
        document.getElementById('Elli').style.display = 'none';
        document.getElementById('Arch').style.display = 'none';
        document.getElementById('Sett').style.display = 'none';
    }
}

function hideRbRtRc()
{
    w3.hide('#pathRb');
    w3.hide('#pathRt');
    w3.hide('#pathRc');
    w3.hide('#rtLabel');
    w3.hide('#rbLabel');
    w3.hide('#rcLabel');
}

// calculate increment for x, y axis grids/labels
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

Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0; 
}

