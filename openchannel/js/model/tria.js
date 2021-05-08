// Hydraulic Calculator tria.js 1.0 2021-02-07 by GT
'use strict'

class TriangularChannel extends OpenChannel {
    constructor(z1, z2, cs, mN, dn) {
        super(cs, mN, dn);
        this.z1 = z1;
        this.z2 = z2;
    }
    get an() {
        return 0.5 * (this.z1 + this.z2) * this.dn * this.dn;
    }
    get pn() {
        return (Math.sqrt(1.0 + this.z1 * this.z1) + Math.sqrt(1.0 + this.z2 * this.z2)) * this.dn;
    }
    get ac() {
        return 0.5 * (this.z1 + this.z2) * this.dc * this.dc;
    }
    get pc() {
        return (Math.sqrt(1.0 + this.z1 * this.z1) + Math.sqrt(1.0 + this.z2 * this.z2)) * this.dc;
    }
    get vc() {
        return Math.sqrt(0.5 * oc.g * this.dc);
    }
    get dc() {
        return Math.pow(8.0 * this.Qn * this.Qn / oc.g / (this.z1 + this.z2) / (this.z1 + this.z2), 1.0 / 5.0);
    }
    Q2Dn(Q) {
        return Math.pow(Q * this.mN / oc.Ku / Math.sqrt(this.cs) * Math.pow(0.5 * (this.z1 + this.z2), -oc.X - 1) *
            Math.pow((Math.sqrt(1.0 + this.z1 * this.z1) + Math.sqrt(1.0 + this.z2 * this.z2)), oc.X), 1/(oc.X + 2));
    }
}

const tria = new TriangularChannel(3, 3, 0.01, 0.05, 0.5);

