// Hydraulic Calculator util.js 1.0 2021-02-07 by GT

// calculate increment for x, y axis grids/labels
function niceIncrement(Min, Max){
    var maxTicks = 8;
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

