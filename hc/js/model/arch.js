// Hydraulic Calculator arch.js 1.0 2021-02-07 by GT
// arch pipe cross-section

'use strict'

class ArchChannel extends OpenChannel {
    constructor(rb, rt, rc, rise, cs, mN, dn) {
        super(cs, mN, dn);
        this.rb = rb; 
        this.rt = rt; 
        this.rc = rc; 
        this.rise = rise;
    }

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
        return Math.sqrt(gUS * this.ac / this.y2x(this.dc, this.rb, this.rt, this.rc, this.rise) / 2.0);
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
    get AE() {
        return this.rb * this.rb * (this.Theta - Math.sin(this.Theta) * Math.cos(this.Theta));
    }
    get XF() {
        return this.XD + this.rc;
    }
    get AF() {
        return this.AE + this.rc * this.rc * (Math.PI / 2.0 - this.Theta) + (this.XD + this.XE) * (this.YD - this.YE);
    }
    get XG() {
        return this.rt * Math.sin(this.Phi);
    }
    get YG() {
        return this.rise - this.rt + this.rt * Math.cos(this.Phi);
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
    // calculate area given y
    y2A(y, rb, rt, rc, rise) {
        if (y <= 0) return 0.0;

        let Theta = Math.acos(((rb - rc) * (rb - rc) + (rb + rt - rise) * (rb + rt - rise) - (rt - rc) * (rt - rc)) / 2.0 / (rb - rc) / (rb + rt - rise));
        let YE = rb * (1.0 - Math.cos(Theta));
        if (y <= YE) {
            let t = Math.acos(1.0 - y / rb);
            return rb * rb * (t - Math.sin(t) * Math.cos(t));
        }

        let XD = (rb - rc) * Math.sin(Theta);
        let YD = rb - (rb - rc) * Math.cos(Theta);
        let XE = rb * Math.sin(Theta);
        let AE = rb * rb * (Theta - Math.sin(Theta) * Math.cos(Theta));

        if (y <= YD)  //YD = YF
        {
            let t = Math.acos((YD - y) / rc);
            let xl = XD + rc * Math.cos(t) * Math.tan(Theta);
            return AE + rc * rc * (t - Theta) - rc * rc * (Math.sin(t) - Math.cos(t) * Math.tan(Theta)) * Math.cos(t) + (XE + xl) * (y - YE);
        }

        let Phi = Math.acos(((rt - rc) * (rt - rc) + (rb + rt - rise) * (rb + rt - rise) - (rb - rc) * (rb - rc)) / 2.0 / (rt - rc) / (rb + rt - rise));
        let YG = rise - rt + rt * Math.cos(Phi);
        let AF = AE + rc * rc * (Math.PI / 2.0 - Theta) + (XD + XE) * (YD - YE);
        if (y <= YG) {
            let eta = Math.asin((y - YD) / rc);
            return AF + rc * rc * eta + (2.0 * XD + rc * Math.cos(eta)) * rc * Math.sin(eta);
        }

        let XG = rt * Math.sin(Phi);
        let AG = AF + rc * rc * (Math.PI / 2.0 - Phi) + (XD + XG) * (YG - YD);
        if (y >= rise) return AG + rt * rt * (Phi - Math.sin(Phi) * Math.cos(Phi));

        let yc = rise - rt;
        let tt = Math.acos((y - yc) / rt);
        return AG + rt * rt * (Phi - Math.sin(Phi) * Math.cos(Phi)) - rt * rt * (tt - Math.sin(tt) * Math.cos(tt));
    }

    // calculate wet perimeter given y
    y2P(y, rb, rt, rc, rise) {
        if (y <= 0) return 0.0;

        let Theta = Math.acos(((rb - rc) * (rb - rc) + (rb + rt - rise) * (rb + rt - rise) - (rt - rc) * (rt - rc)) / 2.0 / (rb - rc) / (rb + rt - rise));
        let YE = rb * (1.0 - Math.cos(Theta));
        if (y <= YE) return 2.0 * rb * Math.acos(1.0 - y / rb);

        let YD = rb - (rb - rc) * Math.cos(Theta); //YD = YF
        if (y <= YD) return 2.0 * rb * Theta + 2.0 * rc * (Math.acos((YD - y) / rc) - Theta);

        let Phi = Math.acos(((rt - rc) * (rt - rc) + (rb + rt - rise) * (rb + rt - rise) - (rb - rc) * (rb - rc)) / 2.0 / (rt - rc) / (rb + rt - rise));
        let YG = rise - rt + rt * Math.cos(Phi);
        if (y <= YG) {
            let eta = Math.asin((y - YD) / rc);
            return 2.0 * rb * Theta + 2.0 * rc * (Math.PI / 2.0 - Theta + eta);
        }

        if (y >= rise) return 2.0 * rb * Theta + 2.0 * rc * (Math.PI - Theta - Phi) + 2.0 * rt * Phi;

        let tt = Math.acos((y - rise + rt) / rt);
        return 2.0 * rb * Theta + 2.0 * rc * (Math.PI - Theta - Phi) + 2.0 * rt * (Phi - tt);
    }

    // calculate x (0 at center) given y
    y2x(y, rb, rt, rc, rise) {
        if (y <= 0) return 0.0;

        let Theta = Math.acos(((rb - rc) * (rb - rc) + (rb + rt - rise) * (rb + rt - rise) - (rt - rc) * (rt - rc)) / 2.0 / (rb - rc) / (rb + rt - rise));
        let YE = rb * (1.0 - Math.cos(Theta));
        if (y <= YE) return rb * Math.sin(Math.acos(1.0 - y / rb));

        let XD = (rb - rc) * Math.sin(Theta);
        let YD = rb - (rb - rc) * Math.cos(Theta);
        if (y <= YD)  XD + rc * Math.sin(Math.acos((YD - y) / rc));

        let Phi = Math.acos(((rt - rc) * (rt - rc) + (rb + rt - rise) * (rb + rt - rise) - (rb - rc) * (rb - rc)) / 2.0 / (rt - rc) / (rb + rt - rise));
        let YG = rise - rt + rt * Math.cos(Phi);
        if (y <= YG) return XD + rc * Math.cos(Math.asin((y - YD) / rc));

        if (y >= rise) return 0.0;

        return rt * Math.sin(Math.acos((y - (rise - rt)) / rt));
    }

    // for capacity calculation (assume that capacity occurs at the top arch, zeta is the angle)
    zetamax(rb, rt, rc, rise) {
        let A, P, dA, ddA, dP = -2.0 * rt, f = 100.0, df; //ddP = 0
        let dzeta = 10.0;
        let phi = Math.acos(((rt - rc) * (rt - rc) + (rb + rt - rise) * (rb + rt - rise) - (rb - rc) * (rb - rc)) / 2.0 / (rt - rc) / (rb + rt - rise));
        let zeta = 0.5 * phi, zetamin = 0.0, zetamax = phi;
        let Atotal = this.ATotal;
        let Ptotal = this.PTotal;
        let count = 0;

        while (Math.abs(dzeta) > TolAngle && Math.abs(f) > TolD) {
            A = Atotal - rt * rt * (zeta - Math.sin(zeta) * Math.cos(zeta));
            dA = -1.0 * rt * rt * (1.0 - Math.cos(2.0 * zeta));
            ddA = -2.0 * rt * rt * Math.sin(2.0 * zeta);
            P = Ptotal - 2.0 * rt * zeta;
            f = 5.0 * dA * P - 2.0 * A * dP;

            if (Math.abs(f) < TolD) break;

            df = 3.0 * dA * dP + 5.0 * ddA * P;
            dzeta = f / df;

            if (zeta - dzeta <= zetamin) {
                zeta = 0.5 * (zeta + zetamin);
                continue;
            }

            if (zeta - dzeta >= zetamax) {
                zeta = 0.5 * (zeta + zetamax);
            }

            if (f <= 0)
                zetamax = zeta;
            else
                zetamin = zeta;

            zeta -= dzeta;

            count++;
            if (count > MaxCount) break;
        }

        return zeta;
    } 
    
    //capacity
    get Qmax(){
        let zeta = this.zetamax(this.rb, this.rt, this.rc, this.rise);
        let A = this.ATotal - this.rt * this.rt * (zeta - Math.sin(zeta) * Math.cos(zeta));
        let P = this.PTotal - 2.0 * this.rt * zeta;
        let v = KuUS / this.mN * Math.pow(A / P, 2.0 / 3.0) * Math.sqrt(this.cs);
        return v * A;
    }

    get ymax(){
        let zeta = this.zetamax(this.rb, this.rt, this.rc, this.rise);
        return this.rise - this.rt + this.rt * Math.cos(zeta);
    }
    
    
    // calculate normal depth given discharge given
    Q2Dn(Q, rb, rt, rc, rise) {
        if (Q <= 0.0) return 0.0;

        if (Q >= this.Qmax) return this.yamx;

        let A, P, dA, dP, f = 100.0, df;
        let dt = 10.0, tmin, tmax;
        let count = 0;

        let Theta = Math.acos(((rb - rc) * (rb - rc) + (rb + rt - rise) * (rb + rt - rise) - (rt - rc) * (rt - rc)) / 2.0 / (rb - rc) / (rb + rt - rise));
        let ye = rb * (1.0 - Math.cos(Theta));
        let AE = rb * rb * (Theta - Math.sin(Theta) * Math.cos(Theta));
        let PE = 2.0 * rb * Theta;
        let QE = AE * KuUS / this.mN * Math.pow(AE / PE, 2.0 / 3.0) * Math.pow(this.cs, 1.0 / 2.0);

        if (Math.abs(Q - QE) < TolQ) return ye;

        if (Q <= QE) {
            tmin = 0.0;
            tmax = Theta;
            let t = 0.5 * (tmin + tmax);
            dP = 2.0 * rb;

            while (Math.abs(dt) > TolAngle && Math.abs(f) > TolQ) {
                A = rb * rb * (t - Math.sin(t) * Math.cos(t));
                dA = rb * rb * (1.0 - Math.cos(2.0 * t));
                P = 2.0 * rb * t;
                f = A * KuUS / this.mN * Math.pow(A / P, 2.0/3.0) * Math.pow(this.cs, 1.0/2.0) - Q;

                if (f <= 0) tmin = t;
                else tmax = t;

                if (Math.abs(f) < TolQ) break;

                df = KuUS / this.mN / 3.0 * Math.pow(A / P, 2.0 / 3.0) * (5.0 * dA - 2.0 * A / P * dP) * Math.pow(this.cs, 1.0 / 2.0);

                dt = f / df;

                if (t - dt <= tmin || t - dt >= tmax) {
                    if (f > 0) t = 0.5 * (t + tmin);
                    else t = 0.5 * (t + tmax);
                    continue;
                }

                t -= dt;

                count++;
                if (count > MaxCount) break;
            }

            return rb * (1.0 - Math.cos(t));
        }

        let xl, y;
        let yd = rb - (rb - rc) * Math.cos(Theta);
        let xe = rb * Math.sin(Theta);
        let xd = (rb - rc) * Math.sin(Theta);
        let AF = AE + rc * rc * (Math.PI / 2.0 - Theta) + (xd + xe) * (yd - ye);
        let PF = PE + 2.0 * rc * (Math.PI / 2.0 - Theta);
        let QF = AF * KuUS / this.mN * Math.pow(AF / PF, 2.0 / 3.0) * Math.pow(this.cs, 1.0 / 2.0);

        if (Math.abs(Q - QF) < TolQ) return yd;

        if (Q <= QF) {
            f = 100.0;
            tmin = 0.0;
            tmax = Math.PI / 2.0 - Theta;
            dP = 2.0 * rc;
            let t = 0.5 * (tmin + tmax);

            while (Math.abs(dt) > TolAngle && Math.abs(f) > TolD) {

                xl = xd + rc * Math.cos(Theta + t) * Math.tan(Theta);
                y = yd - rc * Math.cos(Theta + t);
                A = AE + rc * rc * t - rc * rc * (Math.sin(t + Theta) - Math.cos(t + Theta) * Math.tan(Theta)) * Math.cos(t + Theta) + (xe + xl) * (y - ye);
                P = PE + 2.0 * rc * t;
                dA = rc * rc * (1.0 - Math.cos(2.0 * (t + Theta)) - Math.cos(2.0 * (t + Theta)) * Math.tan(Theta))
                    + rc * (xe + xl) * Math.sin(t + Theta) + rc * (y - ye) * Math.cos(t + Theta);
                f = A * KuUS / this.mN * Math.pow(A / P, 2.0 / 3.0) * Math.pow(this.cs, 1.0/2.0) - Q;

                if (f <= 0) tmin = t;
                else tmax = t;

                if (Math.abs(f) < TolQ) break;

                df = KuUS / this.mN / 3.0 * Math.pow(A / P, 2.0 / 3.0) * (5.0 * dA - 2.0 * A / P * dP) * Math.pow(this.cs, 1.0 / 2.0);

                dt = f / df;

                if (t - dt <= tmin || t - dt >= tmax) {
                    if (f > 0) t = 0.5 * (t + tmin);
                    else t = 0.5 * (t + tmax);
                    continue;
                }

                t -= dt;

                count++;
                if (count > MaxCount) break;
            }

            return yd - rc * Math.cos(t + Theta);
        }

        let yc = rise - rt;
        let phi = Math.acos(((rt - rc) * (rt - rc) + (rb + rt - rise) * (rb + rt - rise) - (rb - rc) * (rb - rc)) / 2.0 / (rt - rc) / (rb + rt - rise));
        let XG = rt * Math.sin(phi);
        let yG = yc + rt * Math.cos(phi);
        let AG = AF + rc * rc * (Math.PI / 2.0 - phi) + (xd + XG) * (yG - yd);
        let PG = PF + 2.0 * rc * (Math.PI / 2.0 - phi);
        let QG = AG * KuUS / this.mN * Math.pow(AG / PG, 2.0/3.0) * Math.pow(this.cs, 1.0/2.0);

        if (Math.abs(Q - QG) < TolQ) return yG;

        if (Q <= QG) {
            dt = 100.0;
            f = 100.0;
            tmin = 0.0;
            tmax = Math.PI / 2.0 - phi;
            let eta = 0.5 * (tmin + tmax);
            dP = 2.0 * rc;

            while (Math.abs(dt) > TolAngle && Math.abs(f) > TolQ) {

                A = AF + rc * rc * eta + (2.0 * xd + rc * Math.cos(eta)) * rc * Math.sin(eta);
                P = PF + 2.0 * rc * eta;
                dA = rc * rc + 2.0 * xd * rc * Math.cos(eta) + rc * rc * Math.cos(2.0 * eta);
                f = A * KuUS / this.mN * Math.pow(A / P, 2.0/3.0) * Math.pow(this.cs, 1.0/2.0) - Q;

                if (f <= 0) tmin = eta;
                else tmax = eta;

                if (Math.abs(f) < TolQ) break;

                df = KuUS / this.mN / 3.0 * Math.pow(A / P, 2.0/3.0) * (5.0 * dA - 2.0 * A / P * dP) * Math.pow(this.cs, 1.0/2.0);
                dt = f / df;

                if (eta - dt <= tmin || eta - dt >= tmax) {
                    if (f > 0) eta = 0.5 * (eta + tmin);
                    else eta = 0.5 * (eta + tmax);
                    continue;
                }

                eta -= dt;

                count++;
                if (count > MaxCount) break;
            }

            return yd + rc * Math.sin(eta);
        }

        let AT = AG + rt * rt * (phi - Math.sin(phi) * Math.cos(phi));
        let PT = PG + 2.0 * rt * phi;
        let delta = 10.0;
        tmin = this.zetamax(this.rb, this.rt, this.rc, this.rise);
        tmax = phi;
        let t = 0.5 * (tmin + tmax);
        dP = -2.0 * rt;

        while (Math.abs(delta) > TolAngle && Math.abs(f) > TolQ) {
            A = AT - rt * rt * (t - Math.sin(t) * Math.cos(t));
            P = PT - 2.0 * rt * t;
            dA = -rt * rt * (1.0 - Math.cos(2.0 * t));
            f = A * KuUS / this.mN * Math.pow(A / P, 2.0/3.0) * Math.pow(this.cs, 1.0/2.0) - Q;

            if (f >= 0)
                tmin = t;
            else
                tmax = t;

            if (Math.abs(f) < TolQ) break;

            df = KuUS / this.mN / 3.0 * Math.pow(A / P, 2.0/3.0) * (5.0 * dA - 2.0 * A / P * dP) * Math.pow(this.cs, 1.0/2.0);

            delta = f / df;

            if (t - delta <= tmin) {
                delta = 0.5 * (t - tmin);
                continue;
            }

            if (t - delta >= tmax) {
                delta = 0.5 * (t - tmax);
            }

            t -= delta;

            count++;
            if (count > MaxCount) break;
        }

        return yc + rt * Math.cos(t);
    }
    // calculate critical depth
    Q2Dc(Q, rb, rt, rc, rise) {
        if (Q <= 0.0) return 0.0;

        var Theta = Math.acos(((rb - rc) * (rb - rc) + (rb + rt - rise) * (rb + rt - rise) - (rt - rc) * (rt - rc)) / 2.0 / (rb - rc) / (rb + rt - rise));
        var XE = rb * Math.sin(Theta);
        var YE = rb * (1.0 - Math.cos(Theta));
        var AE = rb * rb * (Theta - Math.sin(Theta) * Math.cos(Theta));
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

