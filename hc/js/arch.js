// JavaScript source code
'use strict'

class ArchChannel extends OpenChannel {
    constructor(rb, rt, rc, rise, cs, mN, dn) {
        super(cs, mN, dn);
        this.rb = rb; 
        this.rt = rt; 
        this.rc = rc; 
        this.rise = rise;
    }

    //getters
    get an() {
        return this.y2A(this.dn, this.rb, this.rt, this.rc, this.rise);
    }
    get pn() {
        return this.y2P(this.dn, this.rb, this.rt, this.rc, this.rise);
    }
    get ac() {
        return this.y2A(this.dc, this.rb, this.rt, this.rc, this.rise);
    }
    get pc() {
        return this.y2P(this.dc, this.rb, this.rt, this.rc, this.rise);
    }
    get vc() {
        return Math.sqrt(gUS * this.ac / this.y2T(this.dc, this.rb, this.rt, this.rc, this.rise));
    }
    get dc() {
        return this.Q2Dc(this.Qn, this.rb, this.rt, this.rc, this.rise);
    }
    get Theta() {
        return Math.acos(((this.rb - this.rc) * (this.rb - this.rc) + (this.rb + this.rt - this.rise) * (this.rb + this.rt - this.rise) - (this.rt - this.rc) * (this.rt - this.rc)) / 2.0 / (this.rb - this.rc) / (this.rb + this.rt - this.rise));
    }
    get Phi() {
        return Math.acos(((this.rt - this.rc) * (this.rt - this.rc) + (this.rb + this.rt - this.rise) * (this.rb + this.rt - this.rise) - (this.rb - this.rc) * (this.rb - this.rc)) / 2.0 / (this.rt - this.rc) / (this.rb + this.rt - this.rise));
    }
    get XD() {
        return (this.rb - this.rc) * Math.sin(this.Theta);
    }

    get YD() {
        return this.rb - (this.rb - this.rc) * Math.cos(this.Theta);
    }
    get XE() {
        return this.rb * Math.sin(this.Theta);
    }
    get YE() {
        return this.rb * (1.0 - Math.cos(this.Theta));
    }

    get XG() {
        return this.rt * Math.sin(this.Phi);
    }

    get YG() {
        return this.rise - this.rt + this.rt * Math.cos(this.Phi);
    }
    get AE() {
        return this.rb * this.rb * (this.Theta - Math.sin(this.Theta) * Math.cos(this.Theta));
    }

    get XG() {
        return this.rt * Math.sin(this.Phi);
    }

    get XF() {
        return this.XD + this.rc;
    }
    get AF() {
        return this.AE + this.rc * this.rc * (Math.PI / 2.0 - this.Theta) + (this.XD + this.XE) * (this.YD - this.YE);
    }

    get AG() {
        return this.AF + this.rc * this.rc * (Math.PI / 2.0 - this.Phi) + (this.XD + this.XG) * (this.YG - this.YD);
    }

    get ATotal() {
        return this.AG + this.rt * this.rt * (this.Phi - Math.sin(this.Phi) * Math.cos(this.Phi));
    }
    get PTotal() {
        return 2.0 * this.rb * this.Theta + 2.0 * this.rc * (Math.PI - this.Theta - this.Phi) + 2.0 * this.rt * this.Phi;
    }
    y2A(y, rb, rt, rc, rise) {
        var Area = 0;

        if (y <= 0) return 0.0;

        let Theta = Math.acos(((rb - rc) * (rb - rc) + (rb + rt - rise) * (rb + rt - rise) - (rt - rc) * (rt - rc)) / 2.0 / (rb - rc) / (rb + rt - rise));
        let YE = rb * (1.0 - Math.cos(Theta));
        if (y <= YE) {
            let t = Math.acos(1.0 - y / rb);
            Area = rb * rb * (t - Math.sin(t) * Math.cos(t));
            return Area;
        }

        let XD = (rb - rc) * Math.sin(Theta);
        let YD = rb - (rb - rc) * Math.cos(Theta);
        let XE = rb * Math.sin(Theta);
        let AE = rb * rb * (Theta - Math.sin(Theta) * Math.cos(Theta));

        if (y <= YD)  //YD = YF
        {
            let omega = Math.acos((YD - y) / rc) - Theta;
            let xl = XD + rc * Math.cos(Theta + omega) * Math.tan(Theta);
            Area = AE + rc * rc * omega - rc * rc * (Math.sin(omega + Theta) - Math.cos(omega + Theta) * Math.tan(Theta)) * Math.cos(omega + Theta) + (XE + xl) * (y - YE);
            return Area;
        }

        let Phi = Math.acos(((rt - rc) * (rt - rc) + (rb + rt - rise) * (rb + rt - rise) - (rb - rc) * (rb - rc)) / 2.0 / (rt - rc) / (rb + rt - rise));
        let YG = rise - rt + rt * Math.cos(Phi);
        let AF = AE + rc * rc * (Math.PI / 2.0 - Theta) + (XD + XE) * (YD - YE);
        if (y <= YG) {
            let eta = Math.asin((y - YD) / rc);
            Area = AF + rc * rc * eta + (2.0 * XD + rc * Math.cos(eta)) * rc * Math.sin(eta);
            return Area;
        }

        let XG = rt * Math.sin(Phi);
        let AG = AF + rc * rc * (Math.PI / 2.0 - Phi) + (XD + XG) * (YG - YD);
        if (y >= rise) {
            Area = AG + rt * rt * (Phi - Math.sin(Phi) * Math.cos(Phi));
            return Area;
        }

        let yc = rise - rt;
        let tt = Math.acos((y - yc) / rt);
        Area = AG + rt * rt * (Phi - Math.sin(Phi) * Math.cos(Phi)) - rt * rt * (tt - Math.sin(tt) * Math.cos(tt));
        return Area;
    }
    y2P(y, rb, rt, rc, rise) {
        if (y <= 0) return 0.0;

        let Theta = Math.acos(((rb - rc) * (rb - rc) + (rb + rt - rise) * (rb + rt - rise) - (rt - rc) * (rt - rc)) / 2.0 / (rb - rc) / (rb + rt - rise));
        let YE = rb * (1.0 - Math.cos(Theta));
        if (y <= YE) {
            let t = Math.acos(1.0 - y / rb);
            return 2.0 * rb * t;
        }

        let YD = rb - (rb - rc) * Math.cos(Theta);
        if (y <= YD)  //YD = YF
        {
            let omega = Math.acos((YD - y) / rc) - Theta;
            return 2.0 * rb * Theta + 2.0 * rc * omega;;
        }

        let Phi = Math.acos(((rt - rc) * (rt - rc) + (rb + rt - rise) * (rb + rt - rise) - (rb - rc) * (rb - rc)) / 2.0 / (rt - rc) / (rb + rt - rise));
        let YG = rise - rt + rt * Math.cos(Phi);
        if (y <= YG) {
            let eta = Math.asin((y - YD) / rc);
            return 2.0 * rb * Theta + 2.0 * rc * (Math.PI / 2.0 - Theta + eta);
        }

        if (y >= rise) {
            return 2.0 * rb * Theta + 2.0 * rc * (Math.PI - Theta - Phi) + 2.0 * rt * Phi;
        }

        let yc = rise - rt;
        let tt = Math.acos((y - yc) / rt);
        return 2.0 * rb * Theta + 2.0 * rc * (Math.PI - Theta - Phi) + 2.0 * rt * (Phi - tt);
    }

    y2T(y, rb, rt, rc, rise) {
        //top width
        if (y <= 0) return 0.0;

        let Theta = Math.acos(((rb - rc) * (rb - rc) + (rb + rt - rise) * (rb + rt - rise) - (rt - rc) * (rt - rc)) / 2.0 / (rb - rc) / (rb + rt - rise));
        let YE = rb * (1.0 - Math.cos(Theta));
        if (y <= YE) {
            return 2.0 * rb * Math.sin(Math.acos(1.0 - y / rb));
        }

        let XD = (rb - rc) * Math.sin(Theta);
        let YD = rb - (rb - rc) * Math.cos(Theta);
        if (y <= YD)  //YD = YF
        {
            return 2.0 * XD + 2.0 * rc * Math.sin(Math.acos((YD - y) / rc));
        }

        let Phi = Math.acos(((rt - rc) * (rt - rc) + (rb + rt - rise) * (rb + rt - rise) - (rb - rc) * (rb - rc)) / 2.0 / (rt - rc) / (rb + rt - rise));
        let YG = rise - rt + rt * Math.cos(Phi);
        if (y <= YG) {
            return 2.0 * XD + 2.0 * rc * Math.cos(Math.asin((y - YD) / rc));
        }

        if (y >= rise) {
            0.0;
        }

        return 2.0 * rt * Math.sin(Math.acos((y - (rise - rt)) / rt));
    }

    zetamax(rb, rt, rc, rise) {
        var A, P, dA, ddA, dP = -2.0 * rt, f = 100.0, df; //ddP = 0
        var dzeta = 10.0;
        var phi = Math.acos(((rt - rc) * (rt - rc) + (rb + rt - rise) * (rb + rt - rise) - (rb - rc) * (rb - rc)) / 2.0 / (rt - rc) / (rb + rt - rise));
        var zetai = 0.5 * phi, zetamin = 0.0, zetamax = phi;
        var Atotal = this.ATotal;
        var Ptotal = this.PTotal;
        var count = 0;

        while (Math.abs(dzeta) > TolAngle && Math.abs(f) > TolD) {
            A = Atotal - rt * rt * (zetai - Math.sin(zetai) * Math.cos(zetai));
            dA = -1.0 * rt * rt * (1.0 - Math.cos(2.0 * zetai));
            ddA = -2.0 * rt * rt * Math.sin(2.0 * zetai);
            P = Ptotal - 2.0 * rt * zetai;
            f = 5.0 * dA * P - 2.0 * A * dP;

            if (Math.abs(f) < TolD) break;

            df = 3.0 * dA * dP + 5.0 * ddA * P;
            dzeta = f / df;

            if (zetai - dzeta <= zetamin) {
                zetai = 0.5 * (zetai + zetamin);
                continue;
            }

            if (zetai - dzeta >= zetamax) {
                zetai = 0.5 * (zetai + zetamax);
            }

            if (f <= 0)
                zetamax = zetai;
            else
                zetamin = zetai;

            zetai -= dzeta;

            count++;
            if (count > MaxCount) break;
        }

        return zetai;
    } 
    
    get Qmax(){
        var zeta = this.zetamax(this.rb, this.rt, this.rc, this.rise);
        var A = this.ATotal - this.rt * this.rt * (zeta - Math.sin(zeta) * Math.cos(zeta));
        var P = this.PTotal - 2.0 * this.rt * zeta;
        var v = KuUS / this.mN * Math.pow(A / P, 2.0 / 3.0) * Math.sqrt(this.cs);
        return v * A;
    }

    get ymax(){
        var zeta = this.zetamax(this.rb, this.rt, this.rc, this.rise);
        return this.rise - this.rt + this.rt * Math.cos(zeta);
    }
    
    Q2Dn(Q, rb, rt, rc, rise) {
        if (Q <= 0.0) {
            return 0.0;
        }

        if (Q >= this.Qmax) {
            return this.yamx;
        }

        var A, P, dA, dP, f = 100.0, df;
        var dd = 10.0, xmin, xmax;
        var count = 0;

        var theta = Math.acos(((rb - rc) * (rb - rc) + (rb + rt - rise) * (rb + rt - rise) - (rt - rc) * (rt - rc)) / 2.0 / (rb - rc) / (rb + rt - rise));
        var ye = rb * (1.0 - Math.cos(theta));
        var Ae = rb * rb * (theta - Math.sin(theta) * Math.cos(theta));
        var Pe = 2.0 * rb * theta;
        var Qe = Ae * KuUS / this.mN * Math.pow(Ae / Pe, 2.0 / 3.0) * Math.pow(this.cs, 1.0 / 2.0);

        if (Math.abs(Q - Qe) < TolQ) return ye;

        if (Q <= Qe) {
            xmin = 0.0;
            xmax = theta;
            let xtheta = 0.5 * (xmin + xmax);
            dP = 2.0 * rb;

            while (Math.abs(dd) > TolAngle && Math.abs(f) > TolQ) {
                A = rb * rb * (xtheta - Math.sin(xtheta) * Math.cos(xtheta));
                dA = rb * rb * (1.0 - Math.cos(2.0 * xtheta));
                P = 2.0 * rb * xtheta;
                f = A * KuUS / this.mN * Math.pow(A / P, 2.0/3.0) * Math.pow(this.cs, 1.0/2.0) - Q;

                if (f <= 0)
                    xmin = xtheta;
                else
                    xmax = xtheta;

                if (Math.abs(f) < TolQ) break;

                df = KuUS / this.mN / 3.0 * Math.pow(A / P, 2.0 / 3.0) * (5.0 * dA - 2.0 * A / P * dP) * Math.pow(this.cs, 1.0 / 2.0);

                dd = f / df;

                if (xtheta - dd <= xmin || xtheta - dd >= xmax) {
                    if (f > 0) {
                        xtheta = 0.5 * (xtheta + xmin);
                    }
                    else {
                        xtheta = 0.5 * (xtheta + xmax);
                    }
                    continue;
                }

                xtheta -= dd;

                count++;
                if (count > MaxCount) break;
            }

            return rb * (1.0 - Math.cos(xtheta));
        }

        var xl, y;
        var yd = rb - (rb - rc) * Math.cos(theta);
        var xe = rb * Math.sin(theta);
        var xd = (rb - rc) * Math.sin(theta);
        var Af = Ae + rc * rc * (Math.PI / 2.0 - theta) + (xd + xe) * (yd - ye);
        var Pf = Pe + 2.0 * rc * (Math.PI / 2.0 - theta);
        var Qf = Af * KuUS / this.mN * Math.pow(Af / Pf, 2.0 / 3.0) * Math.pow(this.cs, 1.0 / 2.0);

        if (Math.abs(Q - Qf) < TolQ) return yd;

        if (Q <= Qf) {
            f = 100.0;
            xmin = 0.0;
            xmax = Math.PI / 2.0 - theta;
            var omega = 0.5 * (xmin + xmax);
            dP = 2.0 * rc;

            while (Math.abs(dd) > TolAngle && Math.abs(f) > TolD) {

                xl = xd + rc * Math.cos(theta + omega) * Math.tan(theta);
                y = yd - rc * Math.cos(theta + omega);
                A = Ae + rc * rc * omega - rc * rc * (Math.sin(omega + theta) - Math.cos(omega + theta) * Math.tan(theta)) * Math.cos(omega + theta) + (xe + xl) * (y - ye);
                P = Pe + 2.0 * rc * omega;
                dA = rc * rc * (1.0 - Math.cos(2.0 * (omega + theta)) - Math.cos(2.0 * (omega + theta)) * Math.tan(theta))
                    + rc * (xe + xl) * Math.sin(omega + theta) + rc * (y - ye) * Math.cos(omega + theta);
                f = A * KuUS / this.mN * Math.pow(A / P, 2.0 / 3.0) * Math.pow(this.cs, 1.0/2.0) - Q;

                if (f <= 0)
                    xmin = omega;
                else
                    xmax = omega;

                if (Math.abs(f) < TolQ) break;

                df = KuUS / this.mN / 3.0 * Math.pow(A / P, 2.0 / 3.0) * (5.0 * dA - 2.0 * A / P * dP) * Math.pow(this.cs, 1.0 / 2.0);

                dd = f / df;

                if (omega - dd <= xmin || omega - dd >= xmax) {
                    if (f > 0) {
                        omega = 0.5 * (omega + xmin);
                    }
                    else {
                        omega = 0.5 * (omega + xmax);
                    }
                    //dd = 0.5 * (omega - xmin);
                    continue;
                }

                omega -= dd;

                count++;
                if (count > MaxCount) break;
            }

            return yd - rc * Math.cos(omega + theta);
        }

        var yc = rise - rt;
        var phi = Math.acos(((rt - rc) * (rt - rc) + (rb + rt - rise) * (rb + rt - rise) - (rb - rc) * (rb - rc)) / 2.0 / (rt - rc) / (rb + rt - rise));
        var XG = rt * Math.sin(phi);
        var yg = yc + rt * Math.cos(phi);
        var Ag = Af + rc * rc * (Math.PI / 2.0 - phi) + (xd + XG) * (yg - yd);
        var Pg = Pf + 2.0 * rc * (Math.PI / 2.0 - phi);
        var Qg = Ag * KuUS / this.mN * Math.pow(Ag / Pg, 2.0/3.0) * Math.pow(this.cs, 1.0/2.0);

        if (Math.abs(Q - Qg) < TolQ) return yg;
        var eta;

        if (Q <= Qg) {
            dd = 100.0;
            f = 100.0;
            xmin = 0.0;
            xmax = Math.PI / 2.0 - phi;
            eta = 0.5 * (xmin + xmax);
            dP = 2.0 * rc;

            while (Math.abs(dd) > TolAngle && Math.abs(f) > TolQ) {

                //x = xd + rc * Math.cos(eta);
                //y = yd - rc * Math.sin(eta);
                A = Af + rc * rc * eta + (2.0 * xd + rc * Math.cos(eta)) * rc * Math.sin(eta);
                P = Pf + 2.0 * rc * eta;
                dA = rc * rc + 2.0 * xd * rc * Math.cos(eta) + rc * rc * Math.cos(2.0 * eta);
                f = A * KuUS / this.mN * Math.pow(A / P, 2.0/3.0) * Math.pow(this.cs, 1.0/2.0) - Q;

                if (f <= 0)
                    xmin = eta;
                else
                    xmax = eta;

                if (Math.abs(f) < TolQ) break;

                df = KuUS / this.mN / 3.0 * Math.pow(A / P, 2.0/3.0) * (5.0 * dA - 2.0 * A / P * dP) * Math.pow(this.cs, 1.0/2.0);
                dd = f / df;

                if (eta - dd <= xmin || eta - dd >= xmax) {
                    //eta = 0.5 * (eta - xmin);
                    if (f > 0) {
                        eta = 0.5 * (eta + xmin);
                    }
                    else {
                        eta = 0.5 * (eta + xmax);
                    }

                    continue;
                }

                eta -= dd;

                count++;
                if (count > MaxCount) break;
            }

            console.log('dn = ', yd + rc * Math.sin(eta));
            return yd + rc * Math.sin(eta);
        }

        var At = Ag + rt * rt * (phi - Math.sin(phi) * Math.cos(phi));
        var Pt = Pg + 2.0 * rt * phi;
        var delta = 10.0;
        xmin = this.zetamax(this.rb, this.rt, this.rc, this.rise);
        xmax = phi;
        eta = 0.5 * (xmin + xmax);
        dP = -2.0 * rt;

        while (Math.abs(delta) > TolAngle && Math.abs(f) > TolQ) {
            A = At - rt * rt * (eta - Math.sin(eta) * Math.cos(eta));
            P = Pt - 2.0 * rt * eta;
            dA = -rt * rt * (1.0 - Math.cos(2.0 * eta));
            f = A * KuUS / this.mN * Math.pow(A / P, 2.0/3.0) * Math.pow(this.cs, 1.0/2.0) - Q;

            if (f >= 0)
                xmin = eta;
            else
                xmax = eta;

            if (Math.abs(f) < TolQ) break;

            df = KuUS / this.mN / 3.0 * Math.pow(A / P, 2.0/3.0) * (5.0 * dA - 2.0 * A / P * dP) * Math.pow(this.cs, 1.0/2.0);

            delta = f / df;

            if (eta - delta <= xmin) {
                delta = 0.5 * (eta - xmin);
                continue;
            }

            if (eta - delta >= xmax) {
                delta = 0.5 * (eta - xmax);
            }

            eta -= delta;

            count++;
            if (count > MaxCount) break;
        }

        console.log('dn = ', yc + rt * Math.cos(eta));
        return yc + rt * Math.cos(eta);
    }
    Q2Dc(Q, rb, rt, rc, rise) {
        if (Q <= 0.0) return 0.0;

        var Theta = Math.acos(((rb - rc) * (rb - rc) + (rb + rt - rise) * (rb + rt - rise) - (rt - rc) * (rt - rc)) / 2.0 / (rb - rc) / (rb + rt - rise));
        var XE = rb * Math.sin(Theta);
        var YE = rb * (1.0 - Math.cos(Theta));
        var AE = rb * rb * (Theta - Math.sin(Theta) * Math.cos(Theta));
        var EE = YE + Q * Q / AE / AE / 2.0 / gUS;
        var dAdy = 2.0 * rb * Math.sin(Theta);
        var QcE = Math.sqrt(gUS * AE * AE * AE / dAdy);
        var ti, tmin, tmax, delta = 10.0;
        var A, ddAdydt, dAdt, dydt, f = 100.0, df;
        var count = 0;

        if (Q <= QcE) {
            tmin = 0.0;
            tmax = Theta;
            ti = 0.5 * (tmin + tmax);

            while (Math.abs(delta) > TolAngle && Math.abs(f) > TolQ) {
                A = rb * rb * (ti - Math.sin(ti) * Math.cos(ti));
                dAdt = rb * rb * (1.0 - Math.cos(2.0 * ti));
                dAdy = 2.0 * rb * Math.sin(ti);
                ddAdydt = 2.0 * rb * Math.cos(ti);
                f = gUS * A * A * A - Q * Q * dAdy;

                if (Math.abs(f) < TolQ) break;

                if (f > 0)
                    tmax = Math.min(ti, tmax);
                else
                    tmin = Math.max(ti, tmin);

                df = 3.0 * gUS * A * A * dAdt - Q * Q * ddAdydt;
                delta = f / df;

                if (ti - delta <= tmin || ti - delta >= tmax) {
                    if (f > 0)
                        ti = 0.5 * (ti + tmin);
                    else
                        ti = 0.5 * (ti + tmax);
                    continue;
                }

                ti -= delta;

                count++;
                if (count > MaxCount) break;
            }

            return rb * (1.0 - Math.cos(ti));
        }

        var Phi = Math.acos(((rt - rc) * (rt - rc) + (rb + rt - rise) * (rb + rt - rise) - (rb - rc) * (rb - rc)) / 2.0 / (rt - rc) / (rb + rt - rise));
        var XD = (rb - rc) * Math.sin(Theta);
        var YF = rb - (rb - rc) * Math.cos(Theta);
        var AF = AE + rc * rc * (Math.PI / 2.0 - Theta) + (XD + XE) * (YF - YE);
        var EF = YF + Q * Q / AF / AF / 2.0 / gUS;
        // at F, theta + omega = PI/2

        dydt = rc;
        var XL, dXLdt = -rc * Math.tan(Theta);
        dAdt = rc * rc * 2.0 + 2.0 * XD * dydt + dXLdt * (YF - YE);
        dAdy = dAdt / dydt;
        var QcF = Math.sqrt(gUS * AF * AF * AF / dAdy);
        var y;

        if (Q <= QcF) {
            tmin = 0.0;
            tmax = Math.PI / 2.0 - Theta;
            ti = 0.5 * (tmin + tmax);
            let ddXLdt, ddAdt, ddydt;

            while (Math.abs(delta) > TolAngle && Math.abs(f) > TolD) {
                XL = XD + rc * Math.cos(Theta + ti) * Math.tan(Theta);
                y = YF - rc * Math.cos(Theta + ti);
                A = AE + rc * rc * ti - rc * rc * (Math.sin(ti + Theta) - Math.cos(ti + Theta) * Math.tan(Theta)) * Math.cos(ti + Theta) + (XE + XL) * (y - YE);
                dydt = rc * Math.sin(ti + Theta);
                ddydt = rc * Math.cos(ti + Theta);
                dXLdt = -rc * Math.sin(ti + Theta) * Math.tan(Theta);
                ddXLdt = -rc * Math.cos(ti + Theta) * Math.tan(Theta);
                dAdt = rc * rc * (1.0 - Math.cos(2.0 * (ti + Theta)) - Math.sin(2.0 * (ti + Theta)) * Math.tan(Theta)) + (XE + XL) * dydt + dXLdt * (y - YE);
                dAdy = dAdt / dydt;
                ddAdt = 2.0 * rc * rc * (Math.sin(2.0 * (ti + Theta)) - Math.cos(2.0 * (ti + Theta)) * Math.tan(Theta)) + (XE + XL) * ddydt + dXLdt * dydt + ddXLdt * (y - YE) + dXLdt * ddydt;
                ddAdydt = (ddAdt * dydt - dAdt * ddydt) / dydt / dydt;
                f = gUS * A * A * A - Q * Q * dAdy;

                if (Math.abs(f) < TolD) break;

                if (f > 0)
                    tmax = Math.min(ti, tmax);
                else
                    tmin = Math.max(ti, tmin);

                df = 3.0 * gUS * A * A * dAdt - Q * Q * ddAdydt;
                delta = f / df;

                if (ti - delta <= tmin || ti - delta >= tmax) {
                    if (f > 0)
                        ti = 0.5 * (ti + tmin);
                    else
                        ti = 0.5 * (ti + tmax);
                    continue;
                }

                ti -= delta;

                count++;
                if (count > MaxCount) break;
            }

            return YF - rc * Math.cos(ti + Theta);
        }

        var XG = rt * Math.sin(Phi);
        var YG = rise - rt + rt * Math.cos(Phi);
        var AG = AF + rc * rc * (Math.PI / 2.0 - Phi) + (XD + XG) * (YG - YF);
        var EG = YG + Q * Q / AG / AG / 2.0 / gUS;
        var eta = Math.PI / 2.0 - Phi;
        dydt = rc * Math.cos(eta);
        dAdt = rc * rc + 2.0 * XD * rc * Math.cos(eta) + rc * rc * Math.cos(2.0 * eta);
        dAdy = dAdt / dydt;
        var QcG = Math.sqrt(gUS * AG * AG * AG / dAdy);

        if (Q <= QcG) {
            tmin = 0.0;
            tmax = Math.PI / 2.0 - Phi;
            ti = 0.5 * (tmin + tmax);
            let ddAdt, ddydt;


            while (Math.abs(delta) > TolAngle && Math.abs(f) > TolD && Math.abs(tmax - tmin) > TolAngle) {
                y = YF + rc * Math.sin(ti);
                A = AF + rc * rc * ti + (2.0 * XD + rc * Math.cos(ti)) * rc * Math.sin(ti);
                dydt = rc * Math.cos(ti);                                                          //y'
                ddydt = -rc * Math.sin(ti);                                                        //y''
                dAdt = rc * rc + 2.0 * XD * rc * Math.cos(ti) + rc * rc * Math.cos(2.0 * ti);      //A'
                ddAdt = -2.0 * XD * rc * Math.sin(ti) - 2.0 * rc * rc * Math.sin(2.0 * ti);         //A'' 
                dAdy = dAdt / dydt;
                ddAdydt = (ddAdt * dydt - dAdt * ddydt) / dydt / dydt;
                f = gUS * A * A * A - Q * Q * dAdy;

                if (Math.abs(f) < TolD) break;

                if (f > 0)
                    tmax = Math.min(ti, tmax);
                else
                    tmin = Math.max(ti, tmin);

                df = 3.0 * gUS * A * A * dAdt - Q * Q * ddAdydt;
                delta = f / df;

                if (ti - delta <= tmin || ti - delta >= tmax) {
                    if (f > 0)
                        ti = 0.5 * (ti + tmin);
                    else
                        ti = 0.5 * (ti + tmax);
                    continue;
                }

                ti -= delta;

                count++;
                if (count > MaxCount) break;
            }

            return YF + rc * Math.sin(ti);
        }


        var AT = AG + rt * rt * (Phi - Math.sin(Phi) * Math.cos(Phi));
        var ET = rise + Q * Q / AT / AT / 2.0 / gUS;

        tmin = 0.0;
        tmax = Phi;
        ti = 0.5 * (tmin + tmax);

        while (Math.abs(delta) > TolAngle && Math.abs(f) > TolD && Math.abs(tmax - tmin) > TolAngle) {
            A = AT - rt * rt * (ti - Math.sin(ti) * Math.cos(ti));
            dAdt = -rt * rt * (1 - Math.cos(2.0 * ti));
            dAdy = 2.0 * rt * Math.sin(ti);
            ddAdydt = 2.0 * rt * Math.cos(ti);;
            f = gUS * A * A * A - Q * Q * dAdy;

            if (Math.abs(f) < TolD) break;

            if (f < 0)
                tmax = Math.min(ti, tmax);
            else
                tmin = Math.max(ti, tmin);

            df = 3.0 * gUS * A * A * dAdt - Q * Q * ddAdydt;
            delta = f / df;

            if (ti - delta <= tmin || ti - delta >= tmax) {
                if (f < 0)
                    ti = 0.5 * (ti + tmin);
                else
                    ti = 0.5 * (ti + tmax);
                continue;
            }

            ti -= delta;

            count++;
            if (count > MaxCount) break;
        }

        return rise - rt + rt * Math.cos(ti);
    }

}

const arch = new ArchChannel(15.25, 4.9166666667, 1.25, 6.0, 0.01, 0.013, 0.5);

window.onload = function () {
    checkLocalStorage();

    document.getElementById('rb').setAttribute('value', (arch.rb * 12).toFixed(2));
    document.getElementById('rt').setAttribute('value', (arch.rt * 12).toFixed(2));
    document.getElementById('rc').setAttribute('value', (arch.rc * 12).toFixed(2));
    document.getElementById('rise').setAttribute('value', (arch.rise * 12).toFixed(2));
    document.getElementById('channelSlope').setAttribute('value', arch.cs);
    document.getElementById('manningsN').setAttribute('value', arch.mN);
    document.getElementById('normalDepth').setAttribute('value', arch.dn);
    document.getElementById('discharge').setAttribute('value', arch.Qn.toFixed(2));

    setValues();

    document.getElementById('select').addEventListener("change", respondSelect);
    document.getElementById('rb').addEventListener("change", respondrb);
    document.getElementById('rt').addEventListener("change", respondrt);
    document.getElementById('rc').addEventListener("change", respondrc);
    document.getElementById('rise').addEventListener("change", respondRise);
    document.getElementById('channelSlope').addEventListener("change", respondChannelSlope);
    document.getElementById('manningsN').addEventListener("change", respondManningsN);
    document.getElementById('normalDepth').addEventListener("change", respondNormalDepth);
    document.getElementById('discharge').addEventListener("change", respondDischarge);

    updateGraph();
}

function checkLocalStorage() {
    var tmp = localStorage.getItem("arch.rb");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                arch.rb = tmp;
            }
        }
    }

    var tmp = localStorage.getItem("arch.rt");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                arch.rt = tmp;
            }
        }
    }

    var tmp = localStorage.getItem("arch.rc");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                arch.rc = tmp;
            }
        }
    }

    var tmp = localStorage.getItem("arch.rise");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                arch.rise = tmp;
                if (arch.dn > tmp) {
                    arch.dn = tmp;
                }
            }
        }
    }

    tmp = localStorage.getItem("arch.cs");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                arch.cs = tmp;
            }
        }
    }

    tmp = localStorage.getItem("arch.mN");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                arch.mN = tmp;
            }
        }
    }

    tmp = localStorage.getItem("arch.dn");
    if (tmp !== null) {
        tmp = parseFloat(tmp);
        if (!(isNaN(tmp))) {
            if (tmp > 0) {
                if (tmp <= arch.rise) {
                    arch.dn = tmp;
                }
                else {
                    arch.dn = arch.rise;
                }
            }
        }
    }
}


function respondSelect(e) {
    var tmp = document.getElementById('select').value;
    var val = tmp.split(',');
    
    document.getElementById('rb').value = parseFloat(val[0]).toFixed(2);
    respondrb(e);
    document.getElementById('rt').value = parseFloat(val[1]).toFixed(2);
    respondrt(e);
    document.getElementById('rc').value = parseFloat(val[2]).toFixed(2);
    respondrc(e);
    document.getElementById('rise').value = parseFloat(val[3]).toFixed(2);
    respondRise(e);

    document.getElementById('select').value = '';
}


function respondrb(e) {
    var tmp = parseFloat(document.getElementById('rb').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for rb!");
        document.getElementById('rb').value = (arch.rb * 12).toFixed(2);
        return;
    }
    else if (tmp <= 0) {
            alert("Please input a positive number for rb!");
            document.getElementById('rb').value = (arch.rb * 12).toFixed(2);
            return;
    }
    else{
        arch.rb = tmp / 12.0;
        localStorage.setItem("arch.rb", arch.rb);
        setValues();
        document.getElementById('discharge').value =  arch.Qn.toFixed(2);
        updateGraph();
    }
}
function respondrt(e) {
    var tmp = parseFloat(document.getElementById('rt').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for rt!");
        document.getElementById('rt').value = (arch.rt * 12).toFixed(2);
        return;
    }
    else if (tmp <= 0) {
            alert("Please input a positive number for rt!");
            document.getElementById('rt').value = (arch.rt * 12).toFixed(2);
            return;
    }
    else{
        arch.rt = tmp / 12.0;
        localStorage.setItem("arch.rt", arch.rt);
        setValues();
        document.getElementById('discharge').value =  arch.Qn.toFixed(2);
        updateGraph();
    }
}

function respondrc(e) {
    var tmp = parseFloat(document.getElementById('rc').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for rc!");
        document.getElementById('rc').value = (arch.rc * 12).toFixed(2);
        return;
    }
    else if (tmp <= 0) {
            alert("Please input a positive number for rc!");
            document.getElementById('rc').value = (arch.rc * 12).toFixed(2);
            return;
    }
    else{
        arch.rc = tmp / 12.0;
        localStorage.setItem("arch.rc", arch.rc);
        setValues();
        document.getElementById('discharge').value =  arch.Qn.toFixed(2);
        updateGraph();
    }
}

function respondRise(e) {
    var tmp = parseFloat(document.getElementById('rise').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for rise!");
        document.getElementById('rise').value = (arch.rise * 12).toFixed(2);
        return;
    }
    else if (tmp <= 0) {
        alert("Please input a positive number for rise!");
        document.getElementById('rise').value = (arch.rise * 12).toFixed(2);
        return;
    }
    else {
        tmp /= 12.0;
        if (tmp < arch.dn) {
            alert('Normal depth is lowered to rise!');
            arch.dn = tmp;
            localStorage.setItem("arch.dn", arch.dn);
            document.getElementById('normalDepth').value = arch.dn.toFixed(2);
        }
        arch.rise = tmp;
        localStorage.setItem("arch.rise", arch.rise);
        setValues();
        document.getElementById('discharge').value = arch.Qn.toFixed(2);
        updateGraph();
    }
}

function respondChannelSlope(e) {
    var tmp = parseFloat(document.getElementById('channelSlope').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for channel slope!");
        document.getElementById('channelSlope').value = arch.cs;
        return;
    }
    else if (tmp <= 0){
        alert("Please input a positive number for channel slope!");
        document.getElementById('channelSlope').value = arch.cs;
        return;
    }
    else {
        arch.cs = tmp;
        localStorage.setItem("arch.cs", arch.cs);
        setValues();
        document.getElementById('discharge').value = arch.Qn.toFixed(2);
        updateGraph();
    }
}
function respondManningsN(e) {
    var tmp = parseFloat(document.getElementById('manningsN').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for manningsN!");
        document.getElementById('manningsN').value = arch.mN;
        return;
    } else if(tmp <= 0){
        alert("Please input a positive number for manningsN!");
        document.getElementById('manningsN').value = arch.mN;
        return;
    }
    else {
        arch.mN = tmp;
        localStorage.setItem("arch.mN", arch.mN);
        setValues();
        document.getElementById('discharge').value = arch.Qn.toFixed(2);
        updateGraph();
    }
}
function respondNormalDepth(e) {
    var tmp = parseFloat(document.getElementById('normalDepth').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for normal depth!");
        document.getElementById('normalDepth').value = arch.dn;
        return;
    } 
    else if(tmp <= 0) {
        alert("Please input a possive number for normal depth!");
        document.getElementById('normalDepth').value = arch.dn;
        return;
    }
    else if(tmp > arch.rise) {
        alert('Please input a normal depth <= rise!');
        document.getElementById('normalDepth').value = arch.dn;
        return;
    }
    else {
        arch.dn = tmp;
        localStorage.setItem("arch.dn", arch.dn);
        setValues();
        document.getElementById('discharge').value = arch.Qn.toFixed(2);
        updateGraph();
    }
}
function respondDischarge(e) {
    var tmp = parseFloat(document.getElementById('discharge').value);
    if (isNaN(tmp)) {
        alert("Please input a valid number for discharge!");
        document.getElementById('discharge').value = arch.Qn.toFixed(2);
        return;
    }
    else if(tmp <= 0) {
        alert("Please input a positive number for discharge!");
        document.getElementById('discharge').value = arch.Qn.toFixed(2);
        return;
    }
    else if(tmp >= arch.Qmax){
        alert('Please input a discharge <= ' + arch.Qmax.toFixed(2));
        document.getElementById('discharge').value = arch.Qn.toFixed(2);
        return;
    }
    else {
        arch.dn = arch.Q2Dn(tmp, arch.rb, arch.rt, arch.rc, arch.rise);
        localStorage.setItem("arch.dn", arch.dn);
        setValues();
        document.getElementById('normalDepth').value = arch.dn.toFixed(2);
        updateGraph();
    }
}

function setValues() {
    document.getElementById('area').innerHTML = arch.an.toFixed(3);
    document.getElementById('perimeter').innerHTML = arch.pn.toFixed(3);
    document.getElementById('velocity').innerHTML = arch.vn.toFixed(3);
    document.getElementById('criticalDepth').innerHTML = arch.dc.toFixed(3);
    document.getElementById('criticalVelocity').innerHTML = arch.vc.toFixed(3);
    document.getElementById('criticalSlope').innerHTML = arch.sc.toFixed(3);
    document.getElementById('froudeNumber').innerHTML = arch.fr.toFixed(3);
    document.getElementById('capacity').innerHTML = arch.Qmax.toFixed(3);
    document.getElementById('ymax').innerHTML = arch.ymax.toFixed(3);
}

function updateGraph(){
    'use strict';

    var chart = document.getElementById('chart');
    if(chart == null){
        return;
    }
      
    document.getElementById('axesRect').setAttribute('x', offsetLeft);
    document.getElementById('axesRect').setAttribute('y', offsetTop);
    document.getElementById('axesRect').setAttribute('width', chart.clientWidth- offsetLeft - offsetRight);
    document.getElementById('axesRect').setAttribute('height', chart.clientHeight - offsetTop - offsetBottom);
    
    //drawing 
    var xMin = 0;
    let xF = arch.XF;
    var xMax = 2.0 * xF;
    var yMin = 0;
    var yMax = arch.rise;

    var scaleX = (chart.clientWidth - offsetLeft - offsetRight)/ (xMax - xMin);
    var scaleY = (chart.clientHeight - offsetTop - offsetBottom) / (yMax - yMin);

    if(scaleX >= scaleY){
        scaleX = scaleY;
    }
    else{
        scaleY = scaleX;
    }
    
    var dxFs = xF * scaleX;
    var dxs = 0.5 * (-offsetLeft + chart.clientWidth - offsetRight); // - dxFs; //displacement for x to move circle to the middle
    var Theta = arch.Theta;
    var Phi = arch.Phi;
    var th = Theta / Math.PI * 180.0;
    var ph = Phi / Math.PI * 180.0;
    
    var xE = arch.XE;
    var yE = arch.YE;
    var xEs = offsetLeft + (xE - xMin) * scaleX + dxs;
    var xEns = offsetLeft + (-xE - xMin) * scaleX + dxs;
    var yEs = chart.clientHeight - offsetBottom - (yE - yMin) * scaleY;
    var rbxs = arch.rb * scaleX;
    var rbys = arch.rb * scaleY;
    
    var xG = arch.XG;
    var yG = arch.YG;
    var xGs = offsetLeft + (xG - xMin) * scaleX + dxs;
    var xGns = offsetLeft + (-xG - xMin) * scaleX + dxs;
    var yGs = chart.clientHeight - offsetBottom - (yG - yMin) * scaleY;
    var rcxs = arch.rc * scaleX;
    var rcys = arch.rc * scaleY;
    
    var rtxs = arch.rt * scaleX;
    var rtys = arch.rt * scaleY;
    
    var xnr = arch.y2T(arch.dn, arch.rb, arch.rt, arch.rc, arch.rise) / 2.0;
    var xnl = -xnr;
    var xnls = offsetLeft + (xnl - xMin) * scaleX + dxs;
    var xnrs = offsetLeft + (xnr - xMin) * scaleX + dxs;
    var yns = chart.clientHeight - offsetBottom -(arch.dn - yMin) * scaleY;


    var xcr = arch.y2T(arch.dc, arch.rb, arch.rt, arch.rc, arch.rise) / 2.0;;
    var xcl = -xcr;
    var xcls = offsetLeft + (xcl - xMin) * scaleX + dxs;
    var xcrs = offsetLeft + (xcr - xMin) * scaleX + dxs;
    var ycs = chart.clientHeight - offsetBottom - (arch.dc - yMin) * scaleY;

    
    document.getElementById('pathChan').setAttribute('d', 'M ' + xEs + ' ' + yEs + 
                                                     ' A ' + rbxs + ' ' + rbys + ' ' + (2*th) + ' 0 1 ' + xEns + ' ' + yEs + 
                                                     ' A ' + rcxs + ' ' + rcys + ' ' + (180 - th - ph) + ' 0 1 ' + xGns + ' ' + yGs + 
                                                     ' A ' + rtxs + ' ' + rtys + ' ' + (2*ph) + ' 0 1 ' + xGs + ' ' + yGs + 
                                                     ' A ' + rcxs + ' ' + rcys + ' ' + (180 - th - ph) + ' 0 1 ' + xEs + ' ' + yEs);

    document.getElementById('pathNorm').setAttribute('d', 'M' + xnls + ' ' + yns + 'L' + xnrs + ' ' + yns);
    
    document.getElementById('pathCrit').setAttribute('d', 'M' + xcls + ' ' + ycs + 'L' + xcrs + ' ' + ycs);

    //draw grid lines;
    var yInc = niceIncrement(yMin, yMax);
    var yIncDraw = yInc * scaleY;
    
    var xInc = niceIncrement(xMin, xMax);

    if(xInc < yInc){
        xInc = yInc;
    }
    var xIncDraw = xInc * scaleX;

    //draw grid lines;
    let x = 0;
    let y = chart.clientHeight - offsetBottom;
    let xmid = 0.5 * (offsetLeft + chart.clientWidth - offsetRight);
    let xDraw = xmid;
    var xGrid = '';
    var text;
    var xPos;
    var yPos = chart.clientHeight - 0.65 * offsetBottom;
    var idLabel;
    var i = 1;
    
    while (xDraw <= chart.clientWidth - offsetRight && i <= 5){
        xGrid += 'M' + xDraw + ' ' + offsetTop + 'L' + xDraw + ' ' + y;
        idLabel = 'xTick' + i;
        text = x.toString();
        if(text.length > 10) {
            text = x.toFixed(xInc.countDecimals());
        }
        document.getElementById(idLabel).setAttribute('x', xDraw);
        document.getElementById(idLabel).setAttribute('y', yPos);
        document.getElementById(idLabel).childNodes[0].textContent = text;
        xDraw += xIncDraw;
        x += xInc;
        i += 1;
    }
    
    x = 0;
    xDraw = xmid;
    while (xDraw > offsetLeft + xIncDraw && i <= 10){
        xDraw -= xIncDraw;
        xGrid += 'M' + xDraw + ' ' + offsetTop + 'L' + xDraw + ' ' + y;

        idLabel = 'xTick' + i;
        x -= xInc;
        text = x.toString();
        if(text.length > 10) {
            text = x.toFixed(xInc.countDecimals());
        }
        document.getElementById(idLabel).setAttribute('x', xDraw);
        document.getElementById(idLabel).setAttribute('y', yPos);
        document.getElementById(idLabel).childNodes[0].textContent = text;
        i += 1;
    }
        
    for (; i < 10; i++){
        idLabel = 'xTick' + i;
        document.getElementById(idLabel).childNodes[0].textContent = ' ';
    }

    document.getElementById('pathGridY').setAttribute('d', xGrid);

    let yDraw = chart.clientHeight - offsetBottom;
    var yGrid = '';
    x = chart.clientWidth - offsetRight;
    y = 0;
    i = 1;
    while (yDraw > offsetTop){
        yGrid += 'M' + offsetLeft + ' ' + yDraw + 'L' + x + ' ' + yDraw;
        xPos = 0.70*offsetLeft;
        idLabel = 'yTick' + i;
        text = y.toString();
        if(text.length > 10) {
            text = y.toFixed(yInc.countDecimals());
        }
        document.getElementById(idLabel).setAttribute("x", xPos);
        document.getElementById(idLabel).setAttribute("y", yDraw);
        document.getElementById(idLabel).childNodes[0].textContent = text;
        yDraw -= yIncDraw;
        y += yInc;
        i += 1;
    }

    for (; i < 10; i++){
        idLabel = 'yTick' + i;
        document.getElementById(idLabel).childNodes[0].textContent = ' ';
    }

    document.getElementById("pathGridX").setAttribute("d", yGrid);
    
    xPos = offsetLeft + 0.5 * (chart.clientWidth - offsetLeft - offsetRight);
    yPos = chart.clientHeight - 0.25 * offsetBottom;
    document.getElementById('xLabel').setAttribute("x", xPos);
    document.getElementById('xLabel').setAttribute("y", yPos);
    
    var xB = arch.rb * Math.sin(0.5 * Theta);
    var yB = arch.rb * (1.0 - Math.cos(0.5 * Theta));
    var xO = (arch.rb - 0.4 * arch.rise) * Math.sin(0.5 * Theta);
    var yO = arch.rb - (arch.rb - 0.4 * arch.rise) * Math.cos(0.5 * Theta);

    var xBs = offsetLeft + (xB - xMin) * scaleX + dxs;
    var yBs = chart.clientHeight - offsetBottom - (yB - yMin) * scaleY;
    var xOs = offsetLeft + (xO - xMin) * scaleX + dxs;
    var yOs = chart.clientHeight - offsetBottom - (yO - yMin) * scaleY;
 
    document.getElementById('pathRb').setAttribute('d', 'M' + xOs + ' ' + yOs + 'L' + xBs + ' ' + yBs);
    
    var RbLeft = offsetLeft + (0.5 * (xB + xO) - xMin) * scaleX + dxs + 2;
    var RbTop = chart.clientHeight - offsetBottom - (0.5 * (yB + yO) - yMin) * scaleY - 10;
    document.getElementById('rbLabel').setAttribute("x", RbLeft);
    document.getElementById('rbLabel').setAttribute("y", RbTop);

    var xT = arch.rt * Math.sin(0.5 * Phi);
    var yT = arch.rise - arch.rt + arch.rt * Math.cos(0.5 * Phi);
        xO = 0.6 * xT;
        yO = arch.rise - arch.rt + 0.6 * arch.rt * Math.cos(0.5 * Phi);
    var xTs = offsetLeft + (xT - xMin) * scaleX + dxs;
    var yTs = chart.clientHeight - offsetBottom - (yT - yMin) * scaleY;
    var xOs = offsetLeft + (xO - xMin) * scaleX + dxs;
    var yOs = chart.clientHeight - offsetBottom - (yO - yMin) * scaleY;
 
    document.getElementById('pathRt').setAttribute('d', 'M' + xOs + ' ' + yOs + 'L' + xTs + ' ' + yTs);

    var RtLeft = offsetLeft + (0.5 * (xT + xO) - xMin) * scaleX + dxs ;
    var RtTop = chart.clientHeight - offsetBottom - (0.5 * (yT + yO) - yMin) * scaleY;

    document.getElementById('rtLabel').setAttribute("x", RtLeft);
    document.getElementById('rtLabel').setAttribute("y", RtTop);

    
    var xC = arch.XD + arch.rc * Math.sin(Math.PI / 4.0);
    var yC = arch.YD - arch.rc * Math.cos(Math.PI / 4.0);
    var xCs = offsetLeft + (xC - xMin) * scaleX + dxs;
    var yCs = chart.clientHeight - offsetBottom - (yC - yMin) * scaleY;
    var xDs = offsetLeft + (arch.XD - xMin) * scaleX + dxs;
    var yDs = chart.clientHeight - offsetBottom - (arch.YD - yMin) * scaleY;

    document.getElementById('pathRc').setAttribute('d', 'M' + xDs + ' ' + yDs + 'L' + xCs + ' ' + yCs);

    var RcLeft = offsetLeft + (0.5 * (xC + arch.XD) - xMin) * scaleX + dxs ;
    var RcTop = chart.clientHeight - offsetBottom - (0.5 * (yC + arch.YD) - yMin) * scaleY - 15;
    document.getElementById('rcLabel').setAttribute("x", RcLeft);
    document.getElementById('rcLabel').setAttribute("y", RcTop);

    document.getElementById('rbLabel').childNodes[0].textContent = "Rb";
    document.getElementById('rtLabel').childNodes[0].textContent = "Rt";
    document.getElementById('rcLabel').childNodes[0].textContent = "Rc";

    document.getElementById('pathRb').setAttribute('stroke', 'black');
    document.getElementById('pathRt').setAttribute('stroke', 'black');
    document.getElementById('pathRc').setAttribute('stroke', 'black');

}

