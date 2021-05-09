// Hydraulic Calculator trap.js 1.0 2021-02-07 by GT
'use strict'

class TrapezoidalChannel extends OpenChannel {
    constructor(z1, b, z2, cs, mN, dn) {
        super(cs, mN, dn);
        this.z1 = z1;
        this.b = b;
        this.z2 = z2;
    }
    get an() {
        return this.b * this.dn  + 0.5 * (this.z1 + this.z2) * this.dn * this.dn;
    }
    get pn() {
        return this.b + (Math.sqrt(1.0 + this.z1 * this.z1) + Math.sqrt(1.0 + this.z2 * this.z2)) * this.dn;
    }
    get ac() {
        return this.b * this.dc + 0.5 * (this.z1 + this.z2) * this.dc * this.dc;
    }
    get pc() {
        return this.b + (Math.sqrt(1.0 + this.z1 * this.z1) + Math.sqrt(1.0 + this.z2 * this.z2)) * this.dc;
    }

    get vc() {
        let dAdy = (this.z1 + this.z2) * this.dc + this.b;
        return Math.sqrt(oc.g * this.ac / dAdy);
    }
    get dc() {
        let A, dAdy, df;
        let deltay = 10.0;
        let count = 0;
        let yi;
        let f = 10.0;
        let Q = this.Qn;
        let d2Ady2 = this.z1 + this.z2;

        //use Equations in Table 2.1 French 1985 to estimate yi
        if (Q / Math.pow(this.b, 2.5) < 0.1)
            yi = Math.pow(Q * Q / oc.g / this.b / this.b, 1.0 / 3.0);
        else 
            yi = 0.81 * Math.pow((Q * Q / oc.g * Math.pow(0.5 * (this.z1 + this.z2), -0.75) * Math.pow(this.b, -1.25)), 0.27) - this.b / 15.0 / (this.z1 + this.z2);

        while (Math.abs(deltay) > oc.TolD && Math.abs(f) > oc.TolD)
        {
            A = this.b * yi + 1.0 / 2.0 * yi * yi * (this.z1 + this.z2);
            dAdy = this.b + (this.z1 + this.z2) * yi;
            f = oc.g * A * A * A - Q * Q * dAdy;
            df = 3.0 * oc.g * A * A * dAdy - Q * Q * d2Ady2;
            deltay = f / df;
            yi -= deltay;
            count++;
            if (count > oc.MaxCount) break;
        }
        return yi;
    }
    Q2Dn(Q) {
        let A, P, dAdy, f = 10.0, df;
        let deltay = 10.0;
        let yi = 0.5;
        let count = 0;

        if (Q <= 0) return 0.0;
        
        let dPdy = Math.sqrt(1.0 + this.z1 * this.z1) + Math.sqrt(1.0 + this.z2 * this.z2);

        while (Math.abs(deltay) > oc.TolD && Math.abs(f) > oc.TolD) {
            A = this.b * yi + 1.0 / 2.0 * yi * yi * (this.z1 + this.z2);
            dAdy = this.b + (this.z1 + this.z2) * yi;
            P = this.b + dPdy * yi;
            f = oc.Ku / this.mN * Math.pow(this.cs, oc.Y) * Math.pow(A, oc.X + 1) * Math.pow(P, -oc.X) - Q;
            df = oc.Ku / this.mN * Math.pow(this.cs, oc.Y) * ((oc.X + 1) * Math.pow(A / P, oc.X) * dAdy - oc.X * Math.pow(A / P, oc.X + 1) * dPdy);
            deltay = f / df;
            yi -= deltay;
            count++;
            if (count > oc.MaxCount) break;
        }

        return yi;
    }
}
