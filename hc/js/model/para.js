// Hydraulic Calculator para.js 1.0 2021-02-07 by GT

'use strict'

class ParabolicChannel extends OpenChannel {
    constructor(T, d, cs, mN, dn) {
        super(cs, mN, dn);
        this.cd = d;  //channel depth
        this.tw = T;  //top width
    }
    get an() {
        return 2.0 * this.tw / 3.0 / Math.sqrt(this.cd) * this.dn * Math.sqrt(this.dn);
    }
    get pn() {
        let pt1 = this.tw * this.tw / 16.0 / this.cd;
        let pt2 = Math.sqrt(this.dn * this.dn + pt1 * this.dn);
        return pt1 * Math.log((pt2 + this.dn) / (pt2 - this.dn)) + 2.0 * pt2;
    }
    get ac() {
        return 2.0 * this.tw / 3.0 / Math.sqrt(this.cd) * this.dc * Math.sqrt(this.dc);
    }
    get pc() {
        let pt1 = this.tw * this.tw / 16.0 / this.cd;
        let pt2 = Math.sqrt(this.dc * this.dc + pt1 * this.dc);
        return pt1 * Math.log((pt2 + this.dc) / (pt2 - this.dc)) + 2.0 * pt2;
    }

    get vc() {
        return Math.sqrt(2.0 / 3.0 * gUS * this.dc);
    }
    get dc() {
        let A, dAdy, df;
        let f = 10.0;
        let deltay = 10.0;
        let count = 0;
        let y;
        let Q = this.Qn;

        let d2Ady2 = this.z1 + this.z2;

        //use Equations in Table 2.1 French 1985 to estimate yi
        y = Math.pow(0.84 * 4 * this.cd * Q * Q / gUS / this.tw, 0.25);
        
        while (Math.abs(deltay) > TolD && Math.abs(f) > TolQ)
        {
            A = 2.0 * this.tw / 3.0 / Math.sqrt(this.cd) * y * Math.sqrt(y);
            dAdy = this.tw * Math.sqrt(y / this.cd);
            d2Ady2 = 0.5 * this.tw / Math.sqrt(this.cd * y);
            f = gUS * A * A * A - Q * Q * dAdy;
            df = 3.0 * gUS * A * A * dAdy - Q * Q * d2Ady2;
            deltay = f / df;
            while (deltay >= y)
                deltay /= 2.0;

            while (deltay <= y - this.cd)
                deltay /= 2.0;

            y -= deltay;
            count++;
            if (count > MaxCount) break;
        }

        return y;
    }
    Q2Dn(Q) {
        let y = this.cd;
        let A = 2.0 * this.tw / 3.0 / Math.sqrt(this.cd) * y * Math.sqrt(y);
        let ta = this.tw * this.tw / 16.0 / this.cd;
        let tb = Math.sqrt(y * y + ta * y);
        let P = ta * Math.log((tb + y) / (tb - y)) + 2.0 * tb;
        let v = KuUS / this.mN * Math.pow(A / P, 2.0/3.0) * Math.pow(this.cs, 1.0/2.0);
        let Qmax = v * A;
        if (Q >= Qmax){
            return this.cd;
        }

        let dAdy, dPdy, f = 10.0, df;
        let deltay = 10.0;
        let count = 0;


        y = 0.5 * this.cd;

        while (Math.abs(deltay) > TolD && Math.abs(f) > TolQ)
        {
            A = 2.0 * this.tw / 3.0 / Math.sqrt(this.cd) * y * Math.sqrt(y);
            dAdy = this.tw * Math.sqrt(y / this.cd);
            tb = Math.sqrt(y * y + ta * y);
            P = ta * Math.log((tb + y) / (tb - y)) + 2.0 * tb;
            dPdy = ta * ((2.0 * y + ta) / tb + 1) / (tb + y) - ta * ((2.0 * y + ta) / tb - 1) / (tb - y) + (2.0 * y + ta) / tb;

            f = KuUS / this.mN * Math.sqrt(this.cs) * Math.pow(A, 5.0 / 3.0) * Math.pow(P, -2.0 / 3.0) - Q;
            df = KuUS / this.mN * Math.sqrt(this.cs) * (5.0 / 3.0 * Math.pow(A / P, 2.0 / 3.0) * dAdy - 2.0 / 3.0 * Math.pow(A / P, 5.0 / 3.0) * dPdy);
            deltay = f / df;

            while (deltay >= y)
                deltay /= 2.0;

            while (deltay <= y - this.cd)
                deltay /= 2.0;

            y -= deltay;
            count++;
            if (count > MaxCount) break;
        }
    return y;    
    }
}


