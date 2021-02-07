// Hydraulic Calculator elli.js 1.0 2021-02-07 by GT

'use strict'

class EllipticalChannel extends OpenChannel {
    constructor(span, rise, cs, mN, dn) {
        super(cs, mN, dn);
        this.a = span / 12.0 / 2.0; 
        this.b = rise / 12.0 / 2.0;
    }

    get alphan()
    {
        return Math.acos(1.0 - this.dn / this.b);
    }
    get an() {
        return this.a * this.b * (this.alphan - Math.sin(this.alphan) * Math.cos(this.alphan));
    }
    get pn() {
        return this.alpha2Perimeter(this.alphan, this.a, this.b);
    }
    get alphac()
    {
        return Math.acos(1.0 - this.dc / this.b);
    }
    get ac() {
        return this.a * this.b * (this.alphac - Math.sin(this.alphac) * Math.cos(this.alphac));
    }
    get pc() {
        return this.alpha2Perimeter(this.alphac, this.a, this.b);
    }

    get vc() {
        return Math.sqrt(gUS * this.ac / 2.0 / this.a / Math.sin(this.alphac));
    }
    get dc() {
        let A, dAdy, dAdalpha, ddAdydalpha, f = 10.0, df;
        let deltaalpha = 10.0;
        let count = 0;
        let Q = this.Qn;
        let tmin = 0;
        let tmax = Math.PI;
        
        //use French 1985 Table 2.1 Equation to estimate yc
        let yi = this.b;

        let alphai = Math.PI / 2.0; //Math.acos(1.0 - this.dn / this.b);

        while (Math.abs(deltaalpha) > TolAngle && Math.abs(f) > TolQ)
        {
            A = this.a * this.b * (alphai - Math.sin(alphai) * Math.cos(alphai));
            dAdy = 2.0 * this.a * Math.sin(alphai);
            f = gUS * A * A * A - Q * Q * dAdy;
            
            if(f > 0) tmax = alphai;
            else tmin = alphai;
            
            dAdalpha = (1.0 - Math.cos(2.0 * alphai)) * this.a * this.b;
            ddAdydalpha = 2.0 * this.a * Math.cos(alphai);
            df = 3.0 * gUS * A * A * dAdalpha - Q * Q * ddAdydalpha;
            deltaalpha = f / df;
            
            if (alphai - deltaalpha < tmin)
                deltaalphai = 0.5 * (alphai - tmin);

            if (alphai - deltaalpha > tmax)
                deltaalphai = 0.5 * (alphai - tmax);

            alphai -= deltaalpha;

            count++;
            if (count > MaxCount) break;
        }

        return this.b * (1.0 - Math.cos(alphai));
    }

    get alphamax() {
        let alpha = 7.0 / 8.0 * Math.PI;
        let delta;
        let A, dA, ddA, P, dP, ddP, ds, f, df;
        let cnt = 0;

        do
        {
            A = this.a * this.b * (alpha - Math.sin(alpha) * Math.cos(alpha));
            dA = this.a * this.b * (1.0 - Math.cos(2.0 * alpha));
            ddA = 2.0 * this.a * this.b * Math.sin(2.0 * alpha);
            P = this.alpha2Perimeter(alpha, this.a, this.b);
            ds = Math.sqrt(this.a * this.a * Math.cos(alpha) * Math.cos(alpha) +
                           this.b * this.b * Math.sin(alpha) * Math.sin(alpha));
            dP = 2.0 * ds;
            ddP = -(this.a * this.a - this.b * this.b) * Math.sin(2.0 * alpha) / ds;
            f = 5.0 * P * dA - 2 * A * dP;

            if (Math.abs(f) < TolD) break;

            df = 3.0 * dP * dA + 5.0 * P * ddA - 2.0 * A * ddP;
            delta = f / df;

            alpha -= delta;

            cnt++;
            if (cnt > MaxCount) break;
        } while (Math.abs(delta) > TolAngle);

        return alpha;        
    } 
    
    get Qmax(){
        let alpha = this.alphamax;
        let A = this.a * this.b * (alpha - Math.sin(alpha) * Math.cos(alpha));
        let P = this.alpha2Perimeter(alpha, this.a, this.b);;
        let v = KuUS / this.mN * Math.pow(A / P, 2.0 / 3.0) * Math.sqrt(this.cs);
        return v * A;
    }

    get ymax(){
        return this.b * (1.0 - Math.cos(this.alphamax));
    }
    
    Q2Dn(Q) {
        if (Q >= this.Qmax) {
            alert('Q is reduced to Qmax!');
            return this.ymax;
        }

        let A, P, dA, dP, ds, f = 10.0, df;
        let delta = 10.0;
        let alpha = 0.5 * Math.PI;
        let tmin = 0;
        let tmax = this.alphamax;
        let count = 0;

        while (Math.abs(delta) > TolAngle && Math.abs(f) > TolQ)
        {
            A = this.a * this.b * (alpha - Math.sin(alpha) * Math.cos(alpha));
            dA = this.a * this.b * (1.0 - Math.cos(2.0 * alpha));

            P = this.alpha2Perimeter(alpha, this.a, this.b);
            ds = Math.sqrt(this.a * this.a * Math.cos(alpha) * Math.cos(alpha) +
                this.b * this.b * Math.sin(alpha) * Math.sin(alpha));
            dP = 2.0 * ds;

            f = KuUS / this.mN * Math.sqrt(this.cs) * Math.pow(A, 5.0 / 3.0) * Math.pow(P, -2.0 / 3.0) - Q;
            df = KuUS / this.mN * Math.sqrt(this.cs) * (5.0 / 3.0 * Math.pow(A / P, 2.0 / 3.0) * dA - 2.0 / 3.0 * Math.pow(A / P, 5.0 / 3.0) * dP);

            if (f > 0)
                tmax = alpha;
            else
            {
                if(Math.abs(f) < TolQ) 
                {
                    break;
                }
                tmin = alpha;
            }

            delta = f / df;
                
            if (alpha - delta < tmin)
                delta = 0.5 * (alpha - tmin);

            if(alpha - delta > tmax)
                delta = 0.5 * (alpha - tmax);
                
            alpha -= delta;
            count++;
            
            if (count > MaxCount) break;
        }

        return this.b * (1.0 - Math.cos(alpha))
    }

    alpha2Perimeter(alpha, a, b){
        let sinal = Math.sin(alpha);
        let cosal = Math.cos(alpha);
        let sinco = sinal * cosal;
        let intsc, k2, prefix, p;
        let n = 2;
        let delta;
        
        if( a <= b) {
            intsc = 0.5 * sinal * cosal + 0.5 * alpha;    // \int_0^alpha cos^2 t dt 
            k2 = 1.0 - a * a / b / b;
        }
        else {
            intsc = -0.5 * sinal * cosal + 0.5 * alpha;  // \int_0^alpha sin^2 t dt
            k2 = 1.0 - b * b / a / a;
        }
        
        //var intsc = a <= b ? 0.5 * sinal * cosal + 0.5 * alpha    // \int_0^alpha cos^2 t dt 
        //                      : -0.5 * sinal * cosal + 0.5 * alpha;  // \int_0^alpha sin^2 t dt

        //var k2 = a >= b ? 1.0 - b * b / a / a : 1.0 - a * a / b / b;

        prefix = 0.5 * k2;
        p = alpha - prefix * intsc;

        do
        {
            if (a < b)
            {
                sinco *= cosal * cosal;
                intsc = sinco / 2.0 / n + (2.0 * n - 1.0) / 2.0 / n * intsc;
            }
            else
            {
                sinco *= sinal * sinal;
                intsc = -sinco / 2.0 / n + (2.0 * n - 1.0) / 2.0 / n * intsc;
            }

            prefix *= (k2 / 2.0 / n);  //an
            delta = prefix * intsc;
            p -= delta;
            n++;

            if (n > MaxCount) break;
        } while (Math.abs(2*a*delta) > TolD);

        return 2.0 * p * Math.max(a, b);        
    }
}
