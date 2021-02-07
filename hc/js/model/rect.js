// Hydraulic Calculator rect.js 1.0 2021-02-07 by GT

'use strict'
class RectangularChannel extends OpenChannel {
    constructor(b, cs, mN, dn) {
        super(cs, mN, dn);
        this.b = b;
    }
    get an() {
        return this.b * this.dn;
    }
    get pn() {
        return this.b + 2.0 * this.dn;
    }
    get ac() {
        return this.b * this.dc;
    }
    get pc() {
        return this.b + 2.0 * this.dc;
    }
    get vc() {
        return Math.sqrt(gUS * this.dc);
    }
    get dc() {
        return Math.pow(this.Qn * this.Qn / gUS / this.b / this.b, 1.0 / 3.0);
    }
    Q2Dn(Q) {
        if (Q <= 0) return 0;

        let A, P, dAdy, dPdy, f = 10.0, df;
        let deltay = 10.0;
        let yi = 0.5;
        let count = 0;

        dPdy = 2.0;
        dAdy = this.b;

        while (Math.abs(deltay) > TolD && Math.abs(f) > TolQ)
        {
                A = this.b * yi;
                P = this.b + 2.0 * yi;
                f = KuUS / this.mN * Math.sqrt(this.cs) * Math.pow(A, 5.0 / 3.0) * Math.pow(P, -2.0 / 3.0) - Q;
                df = KuUS / this.mN * Math.sqrt(this.cs) * (5.0 / 3.0 * Math.pow(A / P, 2.0 / 3.0) * dAdy - 2.0 / 3.0 * Math.pow(A / P, 5.0 / 3.0) * dPdy);
                deltay = f / df;
                yi -= deltay;
                count++;
                if (count > MaxCount) break;
            }
        return yi;
    }
}

