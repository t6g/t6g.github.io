// Culvert Calculator culvert.js 1.0 2021-02-07 by GT
'use strict'

class Culvert {
    constructor(DAs, Seelyes, Kirpichs, site=0) {

        this.DAs = DAs;
        this.Seelyes = Seelyes;
        this.Kirpichs = Kirpichs;
        this.site = site;
        this.roadSag = {'BVCElevation':25.04, 'BVCGrade': -0.0609, 'EVCGrade': 0.031, 'VCLength': 250 };
        this.barrel = {'amount':1, 'inletElevation':15, 'outletElevation':14, 'distance': 100.0};
        this.xSection = new CircularChannel(24, this.slopeBarrel, 0.013, 0.5);
    }

    //getters
    get Tc() {
        var tc = 0.0;
        for(let i = 0; i < this.Seelyes.length; i++){
            tc += TSeelye(this.Seelyes[i]);
        }

        for(let i = 0; i < this.Kirpichs.length; i++){
            tc += TKirpich(this.Kirpichs[i]);
        }

        return tc;
    };
    get ca() {
        var tmp = 0.0;
        for (let i = 0; i < this.DAs.length; i++){
            tmp += this.DAs[i].A * this.DAs[i].C;
        }
        return tmp;
    };
    get sagElevation() {
        return this.roadSag.BVCElevation - 0.5 * this.roadSag.BVCGrade * this.roadSag.BVCGrade * this.roadSag.VCLength / (this.roadSag.EVCGrade - this.roadSag.BVCGrade);                   
    };
    get EVCElevation() {
        var R = this.roadSag.EVCGrade - this.roadSag.BVCGrade;
        var x = this.roadSag.VCLength;
        R /= x;
        
        return this.roadSag.BVCElevation + 0.5 * R * x * x + this.roadSag.BVCGrade * x;
    };
    get slopeBarrel(){
        return (this.barrel.inletElevation - this.barrel.outletElevation ) / this.barrel.distance; 
    }
    
    get an() {
        throw new TypeError('area is not defined in OpenChannel');
    }
};

    function TSeelye(obj) {
        return 0.225 * Math.pow(obj.L, 0.42) * Math.pow(obj.S, -0.19) / obj.C;
    };
    
    function TKirpich(obj) {
        return 0.00948 * Math.pow(obj.L, 1.13) * Math.pow(obj.H, -0.38);
    }
    

