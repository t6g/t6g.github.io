// Hydraulic Calculator tria.js 1.0 2021-02-07 by GT
'use strict'

const arrayColumn = (arr2d, n) => arr2d.map(x => x[n]);


class IrregularChannel extends OpenChannel {
    constructor(geometry, nMethod, cs, mN, dn) {
        super(cs, mN, dn);
        this.geometry = geometry;
        this.nMethod = nMethod;
    }
    get xs() {
        return arrayColumn(this.geometry, 0);
    }
    get ys() {
        return arrayColumn(this.geometry, 1);
    }
    get ns() {
        return arrayColumn(this.geometry, 2);
    }
    
    get yBottom() {
        return Math.min(...this.ys);
    }

    get iBottom() {
        return this.ys.indexOf(this.yBottom);
    }
    
    get yLeft() {
        return Math.max(...(this.ys.slice(0, this.iBottom)));
    }

    get iLeft() {
        return this.ys.indexOf(this.yLeft);
    }

    get yRight() {
        return Math.max(...(this.ys.slice(this.iBottom, this.geometry.length)));
    }

    get iRight() {
        return this.ys.lastIndexOf(this.yRight);
    }

    get an() {
        return this.d2A(this.dn);
    }
    get pn() {
        return this.d2P(this.dn);
    }
    get vn() {
        this.mN = this.d2N(this.dn);
        return oc.Ku / this.mN * Math.pow(this.an / this.pn, oc.X) * Math.pow(this.cs, oc.Y);
    }
    get xnLeft() {
        return this.d2xL(this.dn);
    }
    get xnRight() {
        return this.d2xR(this.dn);
    }
    get ac() {
        return this.d2A(this.dc);
    }
    get pc() {
        return this.d2P(this.dc);
    }
    get vc() {
        return Math.sqrt(oc.g * this.ac / (this.d2xR(this.dc) - this.d2xL(this.dc)));
    }
    get sc() {
        this.mN = this.d2N(this.dn);
        return Math.pow(this.vc / (oc.Ku / this.mN * Math.pow(this.ac / this.pc, oc.X)), 1.0/oc.Y);
    }
    
    get dc() {
        return this.Q2Dc(this.Qn);
    }
    get depth() {
        return Math.max(1.0, Math.min(this.yLeft, this.yRight) - this.yBottom);
    }

    get Qmax() {
        let d = Math.min(this.yLeft, this.yRight) - this.yBottom;
        return this.d2Q(d);
    }
    d2Q(depth) {
        let A = this.d2A(depth);
        let P = this.d2P(depth);
        let v = oc.Ku / this.mN * Math.pow(A / P, oc.X) * Math.pow(this.cs, oc.Y);
        return v * A;
    }

    Q2Dn(Q) {
        const depthmax = Math.min(this.yLeft, this.yRight) - this.yBottom;
        if (Q >= this.Qmax) return dmax;

        if (Q <= 0) return 0.0;

        let deltaQ = 10.0;
        let deltaD = 10.0;
        let dmin = 0.0;
        let dmax = depthmax;
        let depth = 0.5 * (dmin + dmax);
        let Qtmp;
        let count = 0;

        while (deltaQ > oc.TolQ && deltaD > oc.TolD)
        {
            Qtmp = this.d2Q(depth);
            deltaQ = Math.abs(Q - Qtmp);

            if (Qtmp === Q)
                return depth;
            else if (Qtmp < Q)
            {
                dmin = depth;
                deltaD = 0.5 * (dmax - dmin);
                depth = 0.5 * (dmax + dmin);
            }
            else
            {
                dmax = depth;
                deltaD = 0.5 * (dmax - dmin);
                depth = 0.5 * (dmax + dmin);
            }
            count++;
            if (count > oc.MaxCount) break;
        }


        return depth;    
    }
    Q2Dc(Q) {
        //E  = Q^2/2gA^2 + y
        //dE = Q^2T / gA^3 + 1 = 0
        //f  = Q^2T - gA^3 = 0

        let delta = 10.0
        let f = 10.0;
        let dmin = 0.0
        let dmax = Math.min(this.yLeft, this.yRight) - this.yBottom;
        var A, T;

        let dc = 0.5 * (dmin + dmax);
        let count = 0;

        while (delta > oc.TolD && Math.abs(f) > oc.TolQ)
        {
            A = this.d2A(dc);
            T = this.d2xR(dc) - this.d2xL(dc);
            f = Q * Q * T - oc.g * A * A * A;
            if (f === 0) return dc;
            else if(f > 0)
            {
                dmin = dc;
                delta = 0.5 * (dmax - dmin);
                dc = 0.5 * (dmin + dmax);
            }
            else
            {
                dmax = dc;
                delta = 0.5 * (dmax - dmin);
                dc = 0.5 * (dmin + dmax);
            }
            count++;
            if (count > oc.MaxCount) break;
        }

        return dc;        
    }
    d2A(depth) {
        const yb = this.yBottom;
        const y = yb + depth;
        if (y < yb) return 0;

        const yl = this.yLeft;
        const yr = this.yRight;
        const xs = this.xs;
        const ys = this.ys;
        
        if (y > Math.max(yl, yr)) return -1;
        
        var dx, dy, dx0, dy0, h1, h2, Ai;
        let area = 0.0;

        var i;
        const ib = this.iBottom;
        // to the left from iBottom
        for (i = ib; i > 0; i--){
            dx = xs[i] - xs[i - 1];
            dy = ys[i - 1] - ys[i];
            h1 = y - ys[i - 1];
            h2 = y - ys[i];

            if (y >= ys[i - 1])
                Ai = 0.5 * (h1 + h2) * dx;
            else
            {
                dy0 = y - ys[i];
                dx0 = dy0 * dx / dy;
                Ai = 0.5 * dx0 * dy0;
            }

            area += Ai;

            if (y <= ys[i - 1]) break;
        }

        //to the right from 
        for (i = ib; i < xs.length - 1; i++)
        {
            dx = xs[i + 1] - xs[i];
            dy = ys[i + 1] - ys[i];
            h1 = y - ys[i];
            h2 = y - ys[i + 1];

            if (y >= ys[i + 1])
                Ai = 0.5 * (h1 + h2) * dx;
            else
            {
                dy0 = y - ys[i];
                dx0 = dy0 * dx / dy;
                Ai = 0.5 * dx0 * dy0;
            }

            area += Ai;
            if (y <= ys[i + 1]) break;
        }

        return area;
    }
    
    d2P(depth) {
        const yb = this.yBottom;
        const y = yb + depth;
        if (y < yb) return 0;

        const yl = this.yLeft;
        const yr = this.yRight;
        const xs = this.xs;
        const ys = this.ys;
        const ns = this.ns;
        
        if (y > Math.max(yl, yr)) return -1;
        
        var dx, dy, dx0, dy0, Pi;
        let Perimeter = 0.0;

        var i;
        const ib = this.iBottom;
        // to the left from iBottom
        for (i = ib; i > 0; i--)
        {
            dx = xs[i] - xs[i - 1];
            dy = ys[i - 1] - ys[i];

            if (y >= ys[i - 1])
                Pi = Math.sqrt(dx * dx + dy * dy);
            else
            {
                dy0 = y - ys[i];
                dx0 = dy0 * dx / dy;
                Pi = Math.sqrt(dx0 * dx0 + dy0 * dy0);
            }

            Perimeter += Pi;

            if (y <= ys[i - 1]) break;
        }

        //to the right from 
        for (i = ib; i < ys.length - 1; i++)
        {
            dx = xs[i + 1] - xs[i];
            dy = ys[i + 1] - ys[i];

            if (y >= ys[i + 1])
                Pi = Math.sqrt(dx * dx + dy * dy);
            else
            {
                dy0 = y - ys[i];
                dx0 = dy0 * dx / dy;
                Pi = Math.sqrt(dx0 * dx0 + dy0 * dy0);
            }

            Perimeter += Pi;
            if (y <= ys[i + 1]) break;
        }

        return Perimeter;
    }
    
    d2xL(depth) {
        const yb = this.yBottom;
        const y = yb + depth;
        if (y <= yb) return 0;

        const yl = this.yLeft;
        const yr = this.yRight;

        const xs = this.xs;
        const ys = this.ys;
        
        if (y > Math.max(yl, yr)) return -1;
        
        var dx, dy, dx0, dy0, Pi;
        let x = 0;
        let xi = 0;

        const ib = this.iBottom;
        
        for (let i = ib; i > 0; i--){
            dx = xs[i] - xs[i - 1];
            dy = ys[i - 1] - ys[i];
            
            if (y >= ys[i - 1])
                xi = dx;
            else {
                dy0 = y - ys[i];
                dx0 = dy0 * dx / dy;
                xi = dx0;
            }

            x += xi;
            if (y <= ys[i - 1]) break;
        }
        
        return xs[ib] - x;
    }
    d2xR(depth) {
        const yb = this.yBottom;
        const y = yb + depth;
        if (y <= yb) return 0;

        const yl = this.yLeft;
        const yr = this.yRight;
        const xs = this.xs;
        const ys = this.ys;
        
        if (y > Math.max(yl, yr)) return -1;
        
        var dx, dy, dx0, dy0, Pi;
        const ib = this.iBottom;

        var x = xs[ib];
        var xi = 0;


        for (let i = ib; i < ys.length - 1; i++)
        {
            dx = xs[i + 1] - xs[i];
            dy = ys[i + 1] - ys[i];

            if (y >= ys[i + 1])
                xi = dx;
            else
            {
                dy0 = y - ys[i];
                dx0 = dy0 * dx / dy;
                xi = dx0;
            }

            x += xi;
            if (y <= ys[i + 1]) break;
        }
        
        return x; 
    }
    
    d2N(depth) {
        const yb = this.yBottom;
        const y = depth + this.yBottom;    
        if (y <= yb) return -1;

        const ib = this.iBottom;
        const yl = this.yLeft;
        const yr = this.yRight;

        const xs = this.xs;
        const ys = this.ys;
        const ns = this.ns;
        
        if (y > Math.max(yl, yr)) return -1;

        var dx, dy, dx0, dy0, h1, h2, Ai, Pi, Ti, xni;
        var area = 0.0, perimeter = 0.0, width = 0.0, xn = 0.0;
        var i;

        // to the left from iBottom
        for (i = ib; i > 0; i--)
        {
            dx = xs[i] - xs[i - 1];
            dy = ys[i - 1] - ys[i];
            h1 = y - ys[i - 1];
            h2 = y - ys[i];

            if (y >= ys[i - 1])
            {
                Ai = 0.5 * (h1 + h2) * dx;
                Pi = Math.sqrt(dx * dx + dy * dy);
                Ti = dx;
            }
            else
            {
                dy0 = y - ys[i];
                dx0 = dy0 * dx / dy;
                Ai = 0.5 * dx0 * dy0;
                Pi = Math.sqrt(dx0 * dx0 + dy0 * dy0);
                Ti = dx0;
            }

            switch (this.nMethod)
            {
                /*      Pavlovskii, // p n^2   = sum pi ni^2
                        Horton,    // p n^1.5 = sum pi ni^1.5
                        Colebatch, // A n^1.5 = sum Ai ni^1.5 
                        Cox,       // A n     = sum Ai ni
                        Lotter     // p R^5/3 = sum Pi Ri^5/3 / Ni
                */
                case 'Pavlovskii':
                    xni = Pi * ns[i] * ns[i];
                    break;
                case 'Horton':
                    xni = Pi * ns[i] * Math.sqrt(ns[i]);
                    break;
                case 'Colebatch':
                    xni = Ai * ns[i] * Math.sqrt(ns[i]);
                    break;
                case 'Cox':
                    xni = Ai * ns[i];
                    break;
                case 'Lotter':
                    xni = Pi * Math.pow(Ai / Pi, 5.0 / 3.0) / ns[i];
                    break;
                default:
                    xni = ns[i];
                    break;
            }
            area += Ai;
            perimeter += Pi;
            width += Ti;
            xn += xni;

            if (y <= ys[i - 1]) break;
        }

        //to the right from 
        for (i = ib; i < ys.length - 1; i++)
        {
            dx = xs[i + 1] - xs[i];
            dy = ys[i + 1] - ys[i];
            h1 = y - ys[i];
            h2 = y - ys[i + 1];

            if (y >= ys[i + 1])
            {
                Ai = 0.5 * (h1 + h2) * dx;
                Pi = Math.sqrt(dx * dx + dy * dy);
                Ti = dx;
            }
            else
            {
                dy0 = y - ys[i];
                dx0 = dy0 * dx / dy;
                Ai = 0.5 * dx0 * dy0;
                Pi = Math.sqrt(dx0 * dx0 + dy0 * dy0);
                Ti = dx0;
            }

            switch (this.nMethod)
            {
                /*      Pavlovskii, // p n^2   = sum pi ni^2
                        Horton,    // p n^1.5 = sum pi ni^1.5
                        Colebatch, // A n^1.5 = sum Ai ni^1.5 
                        Cox,       // A n     = sum Ai ni
                        Lotter     // p R^5/3 = sum Pi Ri^5/3 / Ni
                */
                case 'Pavlovskii':
                    xni = Pi * ns[i] * ns[i];
                    break;
                case 'Horton':
                    xni = Pi * ns[i] * Math.sqrt(ns[i]);
                    break;
                case 'Colebatch':
                    xni = Ai * ns[i] * Math.sqrt(ns[i]);
                    break;
                case 'Cox':
                    xni = Ai * ns[i];
                    break;
                case 'Lotter':
                    xni = Pi * Math.pow(Ai / Pi, 5.0 / 3.0) / ns[i];
                    break;
                default:
                    xni = ns[i];
                    break;
            }
            area = area + Ai;
            perimeter = perimeter + Pi;
            width = width + Ti;
            xn = xn + xni;

            if (y <= ys[i + 1]) break;
        }
        var Nc;  //Nc composite N
        switch (this.nMethod)
        {
            /*      Pavlovskii, // p n^2      = sum pi ni^2
                    Horton,    // p n^1.5     = sum pi ni^1.5
                    Colebatch, // A n^1.5     = sum Ai ni^1.5 
                    Cox,       // A n         = sum Ai ni
                    Lotter     // p R^5/3 / N = sum Pi Ri^5/3 / Ni
            */
            case 'Pavlovskii':
                Nc = Math.sqrt(xn / perimeter);
                break;
            case 'Horton':
                Nc = Math.pow(xn / perimeter, 2.0 / 3.0);
                break;
            case 'Colebatch':
                Nc = Math.pow(xn / area, 2.0 / 3.0);
                break;
            case 'Cox':
                Nc = xn / area;
                break;
            case 'Lotter':
                Nc = perimeter * Math.pow(area / perimeter, 5.0 / 3.0) / xn;
                break;
            default:
                Nc = xn / perimeter;
                break;
        }

        return Nc;        
    }
    
}

