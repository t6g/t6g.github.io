// Hydraulic Calculator util.js 1.0 2021-02-07 by GT

const KuUS = 1.487;
const gUS = 32.17;

const offsetLeft = 60;
const offsetTop = 30;
const offsetRight = 30;
const offsetBottom = 60;
var whRatio = 1.5;

const TolD = 0.0001;        //tolerance for depth ft or m
const TolQ = 0.0001;        //tolerance for flow rate, cfs or m^3/s
const TolAngle = 0.000001;  //tolerance for angle (radian)
const MaxCount = 100;       //maximum number of iterations for Newton's Method

const ThetaMaxCircle = 5.27810713; //theta to reach maximum discharge using Manning's equation Q = f(A^5/3 P^-2/3) 

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

