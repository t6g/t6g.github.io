// JavaScript source code

const KuUS = 1.487;
const gUS = 32.17;
const offsetLeft = 60;
const offsetTop = 30;
const offsetRight = 30;
const offsetBottom = 60;
var whRatio = 1.5;

const TolD = 0.0001;
const TolQ = 0.0001;
const TolAngle = 0.000001;
const ThetaMaxCircle = 5.27810713; //theta to reach maximum discharge using Manning's equation Q = f(A^5/3 P^-2/3) 
const MaxCount = 100;


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

