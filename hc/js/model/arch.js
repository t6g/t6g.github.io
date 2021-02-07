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

