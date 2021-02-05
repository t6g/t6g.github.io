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
        return KuUS / this.mN * Math.pow(this.an / this.pn, 2.0 / 3.0) * Math.sqrt(this.cs);
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
        return Math.pow(this.vc / (KuUS / this.mN * Math.pow(this.ac / this.pc, 2.0 / 3.0)), 2.0);
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
}
