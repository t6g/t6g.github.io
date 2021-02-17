var oc = {
    isUSCustomary : true,
    isLightMode: true,

    KuUS : 1.487,
    KuSI : 1.0,
    gUS : 32.17,
    gSI : 9.81,
    m2ft : 3.28,
    ft2in : 12,
    in2mm : 25.4,

    get g () {
        return this.isUSCustomary ? this.gUS : this.gSI;
    },
    
    get Ku (){
        return this.isUSCustomary ? this.KuUS : this.KuSI;
    },

    X : 2.0 / 3.0,
    Y : 1.0 / 2.0,

    TolD : 0.000001, //tolerance for depth ft or m
    TolA : 0.000001, //tolerance for angle (radian)
    TolQ : 0.000001, //tolerance for flow rate, cfs or m^3/s
    MaxCount: 100,   //maximum number of iterations for Newton's Method
    
    offsetLeft : 60,
    offsetTop : 0,
    offsetRight : 30,
    offsetBottom : 60
};

class OpenChannel {
    constructor(cs, mN, dn) {
        this.cs = cs;
        this.mN = mN;
        this.dn = dn;
    }

    //getters
    get an() {
        throw new TypeError('area is not defined in OpenChannel');
    }
    get pn() {
        throw new TypeError('peri is not defined in OpenChannel');
    }
    get vn() {
        return oc.Ku / this.mN * Math.pow(this.an / this.pn, oc.X) * Math.pow(this.cs, oc.Y);
    }
    get Qn() {
        return this.vn * this.an;
    }
    get ac() {
        throw new TypeError('vc is not defined in OpenChannel');
    }
    get pc() {
        throw new TypeError('dc is not defined in OpenChannel');
    }
    get vc() {
        throw new TypeError('vc is not defined in OpenChannel');
    }
    get dc() {
        throw new TypeError('dc is not defined in OpenChannel');
    }
    get sc() {
        return Math.pow(this.vc / (oc.Ku / this.mN * Math.pow(this.ac / this.pc, oc.X)), 1.0/oc.Y);
    }
    get fr() {
        return this.vn / this.vc;
    }
    get depth() {
        return Math.max(1.0, Math.max(Math.ceil(this.dn), Math.ceil(this.dc)));
    }
    Q2Dn(Q) {
        throw new TypeError('sc is not defined in OpenChannel');
    }
    get isClosedConduit() {
        return false;
    }
}
