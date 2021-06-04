// Culvert Calculator culvert.js 1.0 2021-02-07 by GT
'use strict'


class CircularCulvert extends CircularChannel {
    constructor(material, d, mN, inletType, inletElevation, outletElevation, distance, tailwaterDepth, numBarrel, sagElevation) {
        super(d, (inletElevation - outletElevation) / distance, mN, 0.5)
        this.material = material;
        this.inletElevation = inletElevation;
        this.outletElevation = outletElevation;
        this.distance = distance;
        this.tailwaterDepth = tailwaterDepth;
        this.inletType = inletType;
        this.numBarrel = numBarrel;
        this.Ku = 29.0;
        this.sagElevation = sagElevation;
    }

    get Ke(){
        if(this.material== 0) {  //RCP
            if(this.inletType == 0) {
                return 0.5;
            }
            else {
                return 0.2;
            }
        }
        
        if(this.material == 1) {  //CMP
            if(this.inletType == 0) {
                return 0.5;
            }
            else if(this.inletType == 1) {
                return 0.7;
            }
            else if(this.inletType == 2) {
                return 0.9;
            }
            else {
                return 0.2;
            }
        }
        
    };
    get Ks(){
        if(this.material == 0 && this.inletType == 2) {
            return 0.7;
        }
        else {
            return -0.5;
        }
    };
    get KMcY() {
        if (this.material == 0) {
            return inletConstsRCP[this.inletType];
        }

        if (this.material == 1) {
            return inletConstsCMP[this.inletType];
        };
    };
    get rise(){
        return this.inletElevation - this.outletElevation;
    };

    get hwi135(){  //unsubmerged inlet control Q/AD^0.5 = 3.5
        return this.hwiUnsubmerged(3.5 * Math.PI * this.r * this.r * Math.sqrt(2 * this.r));
    };

    get hwi340(){  //submerged inlet control Q/AD^0.5   = 4.0
        return this.hwiSubmerged(4.0 * Math.PI * this.r * this.r * Math.sqrt(2 * this.r));
    };
    
    get D(){
        return 2 * this.r;
    };
    
    get A(){
        return Math.PI * this.r * this.r;
    };
    
    hwiUnsubmerged(Qb){  //unsubmerged inlet control Q/AD^0.5 = 3.5 Qb = flow rate per barrel
        var AD05 = this.A * Math.sqrt(this.D);
        var dc = this.Q2Dc(Qb);
        var thetac = 2.0 * Math.acos(1.0 - dc / this.r);
        var dhc = (thetac - Math.sin(thetac)) * this.r / 4.0 / Math.sin(thetac/2.0);
        var hc = dc + dhc / 2.0;
        var hwi1 = hc + this.KMcY.K * Math.pow(Qb/AD05, this.KMcY.M) * this.D + this.Ks * this.cs * this.D;
        return hwi1;
    };

    hwiSubmerged(Qb){  //submerged inlet control Q/AD^0.5   = 4.0
        var AD05 = this.A * Math.sqrt(this.D);
        var hwi3 = this.KMcY.c * Qb * Qb / AD05 / AD05 * this.D + this.KMcY.Y * this.D + this.Ks * this.cs * this.D;
        return hwi3;
    };

    hwi(Qb){
        var QAD05 = Qb / (this.A * Math.sqrt(this.D));
        if(QAD05 <= 3.5) {
            return this.hwiUnsubmerged(Qb);
        } else if(QAD05 >= 4.0) {
            return this.hwiSubmerged(Qb);
        } else {
            let hwi135 = this.hwi135;
            let hwi340 = this.hwi340;
            let tmp = hwi135 + (QAD05 - 3.5) * (hwi340 - hwi135) / (4.0 - 3.5);
            return tmp;
        };
    };

    hwo(Qb, tailwaterDepth){
        var kf = this.Ku * this.mN * this.mN * this.distance / Math.pow(this.r / 2.0, 4/3);

        var dc = this.Q2Dc(Qb);
        
        var v = Qb / this.A;
        return ((1.0 + this.Ke + kf) * v * v / 2 / oc.g) + Math.max(tailwaterDepth, dc/2 + this.r) - this.rise;
    };
    
    vo(Qb, tailwaterDepth){
        var A = 1.0;
        var dc = this.Q2Dc(Qb);
        
        if(tailwaterDepth >= this.D){  //full outfall
            A = this.A;
        } else if (tailwaterDepth >= dc) {
            A = this.d2A(tailwaterDepth);
        } else {  //critical flow at outfall
            A = this.d2A(dc);
        };
        return (Qb/A);
    }
    
};

var inletConstsRCP = [
    {'K': 0.0098, 'M': 2.000, 'c': 0.03980, 'Y': 0.670}, //Circular Concrete Square edge w/headwall
    {'K': 0.0018, 'M': 2.000, 'c': 0.02920, 'Y': 0.740}, //Circular Concrete Groove end w/headwall 
    {'K': 0.0045, 'M': 2.000, 'c': 0.03170, 'Y': 0.690}, //Circular Concrete Groove end projecting
    {'K': 0.0018, 'M': 2.500, 'c': 0.03000, 'Y': 0.740}, //Circular Beveled ring, 45° bevels
    {'K': 0.0018, 'M': 2.500, 'c': 0.02430, 'Y': 0.830}  //Circular Beveled ring,  Beveled ring, 33.7° bevels*
    ];

var inletConstsCMP = [
    {'K': 0.0078, 'M': 2.000, 'c': 0.03790, 'Y': 0.690}, //Circular CM Headwall
    {'K': 0.0210, 'M': 1.330, 'c': 0.04630, 'Y': 0.750}, //Circular CM Mitered to slope
    {'K': 0.0340, 'M': 1.500, 'c': 0.05530, 'Y': 0.540}, //Circular CM Projecting
    {'K': 0.0018, 'M': 2.500, 'c': 0.03000, 'Y': 0.740}, //Circular Beveled ring, 45° bevels
    {'K': 0.0018, 'M': 2.500, 'c': 0.02430, 'Y': 0.830} //Circular Beveled ring,  Beveled ring, 33.7° bevels*
];
/*
// Table A.1. Constants for Inlet Control Equations for Charts in Appendix G
var inletConsts = [
    {'K': 0.0098, 'M': 2.000, 'c': 0.03980, 'Y': 0.670}, //Circular Concrete Square edge w/headwall
    {'K': 0.0018, 'M': 2.000, 'c': 0.02920, 'Y': 0.740}, //Circular Concrete Groove end w/headwall 
    {'K': 0.0045, 'M': 2.000, 'c': 0.03170, 'Y': 0.690}, //Circular Concrete Groove end projecting
    {'K': 0.0078, 'M': 2.000, 'c': 0.03790, 'Y': 0.690}, //Circular CM Headwall
    {'K': 0.0210, 'M': 1.330, 'c': 0.04630, 'Y': 0.750}, //Circular CM Mitered to slope
    {'K': 0.0340, 'M': 1.500, 'c': 0.05530, 'Y': 0.540}, //Circular CM Projecting
    {'K': 0.0018, 'M': 2.500, 'c': 0.03000, 'Y': 0.740}, //Circular Beveled ring, 45° bevels
    {'K': 0.0018, 'M': 2.500, 'c': 0.02430, 'Y': 0.830}, //Circular Beveled ring,  Beveled ring, 33.7° bevels*
    {'K': 0.0260, 'M': 1.000, 'c': 0.03470, 'Y': 0.810}, //Rect. Box Concrete 30° to 75° wingwall flares
    {'K': 0.0610, 'M': 0.750, 'c': 0.04000, 'Y': 0.800}, //Rect. Box Concrete 90° and 15° wingwall flares
    {'K': 0.0610, 'M': 0.750, 'c': 0.04230, 'Y': 0.820}, //Rect. Box Concrete 0° wingwall flares
    {'K': 0.5100, 'M': 0.667, 'c': 0.03090, 'Y': 0.800}, //Rect. Box Concrete 45° wingwall flare d = .043D
    {'K': 0.4860, 'M': 0.667, 'c': 0.02490, 'Y': 0.830}, //Rect. Box Concrete 18° to 33.7° wingwall flare d = .083D
    {'K': 0.5150, 'M': 0.667, 'c': 0.03750, 'Y': 0.790}, //Rect. Box Concrete 90° headwall w/3/4" chamfers
    {'K': 0.4950, 'M': 0.667, 'c': 0.03140, 'Y': 0.820}, //Rect. Box Concrete 90° headwall w/45° bevels
    {'K': 0.4860, 'M': 0.667, 'c': 0.02520, 'Y': 0.865}, //Rect. Box Concrete 90° headwall w/33.7° bevels
    {'K': 0.5450, 'M': 0.667, 'c': 0.04505, 'Y': 0.730}, //Rect. Box Concrete 3/4" chamfers; 45° skewed headwall Rect. Box Concrete   
    {'K': 0.5330, 'M': 0.667, 'c': 0.04250, 'Y': 0.705}, //Rect. Box Concrete 3/4" chamfers; 30° skewed headwall Rect. Box Concrete
    {'K': 0.5220, 'M': 0.667, 'c': 0.04020, 'Y': 0.680}, //Rect. Box Concrete 3/4" chamfers; 15° skewed headwall Box Concrete
    {'K': 0.4980, 'M': 0.667, 'c': 0.03270, 'Y': 0.750}, //Rect. Box Concrete 45° bevels; 10°-45° skewed headw. Rect. Box Concrete
    {'K': 0.4970, 'M': 0.667, 'c': 0.03390, 'Y': 0.803}, //45° non-offset wingwall flares Rect. Box 3/4" chamf. Conc.
    {'K': 0.4930, 'M': 0.667, 'c': 0.03610, 'Y': 0.806}, //18.4° non-offset wingwall flares Rect. Box 3/4" chamf. Conc.
    {'K': 0.4950, 'M': 0.667, 'c': 0.03860, 'Y': 0.710}, //18.4° non-offset wingwall flares Rect. Box 3/4" chamf. Conc. 30° skewed barrel
    {'K': 0.4970, 'M': 0.667, 'c': 0.03020, 'Y': 0.835}, //45° wingwall flares - offset Rect. Box Top Bev. Conc.
    {'K': 0.4950, 'M': 0.667, 'c': 0.02520, 'Y': 0.881}, //Rect. Box Top Bev. Conc. 33.7° wingwall flares - offset
    {'K': 0.4930, 'M': 0.667, 'c': 0.02270, 'Y': 0.887}, //Rect. Box Top Bev. Conc. 18.4° wingwall flares - offset
    {'K': 0.5340, 'M': 0.555, 'c': 0.01960, 'Y': 0.900}, //Circular Smooth tapered inlet throat
    {'K': 0.5190, 'M': 0.640, 'c': 0.02100, 'Y': 0.900}, //Circular Rough tapered inlet throat
    {'K': 0.5360, 'M': 0.622, 'c': 0.03680, 'Y': 0.830}, //Ellipital Face Tapered inlet-beveled edges
    {'K': 0.5035, 'M': 0.719, 'c': 0.04780, 'Y': 0.800}, //Ellipital Face Tapered inlet-square edges
    {'K': 0.5470, 'M': 0.800, 'c': 0.05980, 'Y': 0.750}, //Ellipital Face Tapered inlet-thin edge projecting
    {'K': 0.4750, 'M': 0.667, 'c': 0.01790, 'Y': 0.970}, //Rectangular Concrete Tapered inlet throat
    {'K': 0.5600, 'M': 0.667, 'c': 0.04460, 'Y': 0.850}, //Rectangular Concrete Side tapered-less favorable edges
    {'K': 0.5600, 'M': 0.667, 'c': 0.03780, 'Y': 0.870}, //Rectangular Concrete Side tapered-more favorable edges
    {'K': 0.5000, 'M': 0.667, 'c': 0.04460, 'Y': 0.650}, //Rectangular Concrete Slope tapered-less favorable edges
    {'K': 0.5000, 'M': 0.667, 'c': 0.03780, 'Y': 0.710}  //Rectangular Concrete Slope tapered-more favorable edges
    ];

var hy5CircConsts = [
 {'Ke': 0.9, 'SR': 0.5, 'A':0.187321, 'B': 0.567710, 'C': -0.156544, 'D': 0.0447052, 'E': -0.003436020, 'F': 8.96610E-05}, //Thin Edge Projecting
 {'Ke': 0.7, 'SR':-0.7, 'A':0.107137, 'B': 0.757789, 'C': -0.361462, 'D': 0.1233932, 'E': -0.016064220, 'F': 0.000767390}, //Mitered to Conform to Slope
 {'Ke': 0.5, 'SR': 0.5, 'A':0.167433, 'B': 0.538595, 'C': -0.149374, 'D': 0.0391543, 'E': -0.003439740, 'F': 0.000115882}, //Square Edge with Headwall Steel/Aluminum/Corrugated PE)
 {'Ke': 0.2, 'SR': 0.5, 'A':0.108786, 'B': 0.662381, 'C': -0.233801, 'D': 0.0579585, 'E': -0.005578900, 'F': 0.000205052}, //Grooved End Projecting
 {'Ke': 0.2, 'SR': 0.5, 'A':0.114099, 'B': 0.653562, 'C': -0.233615, 'D': 0.0597723, 'E': -0.006163380, 'F': 0.000242832}, //Grooved End in Headwall
 {'Ke': 0.2, 'SR': 0.5, 'A':0.063343, 'B': 0.766512, 'C': -0.316097, 'D': 0.0876701, 'E': -0.009836951, 'F': 0.000416760}, //Beveled Edge (1:1)
 {'Ke': 0.2, 'SR': 0.5, 'A':0.081730, 'B': 0.698353, 'C': -0.253683, 'D': 0.0651250, 'E': -0.007197500, 'F': 0.000312451}, //Beveled Edge (1.5:1)
 {'Ke': 0.2, 'SR': 0.5, 'A':0.167287, 'B': 0.558766, 'C': -0.159813, 'D': 0.0420069, 'E': -0.003692520, 'F': 0.000125169}, //sq. proj. (concrete/PVC/HDPE)
 {'Ke': 0.5, 'SR': 0.5, 'A':0.087483, 'B': 0.706578, 'C': -0.253295, 'D': 0.0667001, 'E': -0.006616510, 'F': 0.000250619}, //Square Edge with Headwall
 {'Ke': 0.4, 'SR': 0.5, 'A':0.120659, 'B': 0.630768, 'C': -0.218423, 'D': 0.0591815, 'E': -0.00599169, 'F': 0.0002292870}, //end sect.    
];

*/