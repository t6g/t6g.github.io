// Hydraulic Calculator circ.js 1.0 2021-02-07 by GT
'use strict'

class CircularChannel extends OpenChannel {
    constructor(d, cs, mN, dn) {
        super(cs, mN, dn);
        this.r = d / 12.0 / 2.0; 
    }

    get thetan()
    {
        return 2.0 * Math.acos(1.0 - this.dn / this.r);
    }
    get an() {
        return (this.thetan - Math.sin(this.thetan)) * this.r * this.r / 2.0;
    }
    get pn() {
        return this.thetan * this.r;
    }
    get thetac()
    {
        return 2.0 * Math.acos(1.0 - this.dc / this.r);
    }
    get ac() {
        return (this.thetac - Math.sin(this.thetac)) * this.r * this.r / 2.0;
    }
    get pc() {
        return this.thetac * this.r;
    }
    get vc() {
        return Math.sqrt(gUS * this.ac / 2.0 / this.r / Math.sin(this.thetac/2.0));
    }
    get dc() {
        let A, dAdy, dAdtheta, ddAdydtheta, f = 10.0, df;
        let deltatheta = 10.0;
        let count = 0;
        let Q = this.Qn;
        //use French 1985 Table 2.1 Equation to estimate yc
        let yi = Math.min(1.01 * Math.pow(2.0 * this.r, -0.26) * Math.pow(Q * Q / gUS, 0.25), 0.85 * 2 * this.r);

        let thetai = 2.0 * Math.acos(1.0 - yi / this.r);

        while (Math.abs(deltatheta) > TolAngle && Math.abs(f) > TolQ)
        {
            A = (thetai - Math.sin(thetai)) * this.r * this.r / 2.0;
            dAdy = 2.0 * this.r * Math.sin(thetai / 2.0);
            f = gUS * A * A * A - Q * Q * dAdy;
            dAdtheta = 0.5 * (1.0 - Math.cos(thetai)) * this.r * this.r;
            ddAdydtheta = this.r * Math.cos(thetai / 2.0);
            df = 3.0 * gUS * A * A * dAdtheta - Q * Q * ddAdydtheta;
            deltatheta = f / df;
            thetai -= deltatheta;
            if (thetai >= 2.0 * Math.PI) thetai = 2.0 * Math.PI;

            if(thetai < 0.0) thetai = 0.0;

            count++;
            if (count > MaxCount) break;
        }

        return this.r * (1.0 - Math.cos(thetai / 2.0));
    }
    get Qmax(){
        let theta = ThetaMaxCircle;
        let A = (theta - Math.sin(theta)) * this.r * this.r / 2.0;
        let P = theta * this.r;
        let v = KuUS / this.mN * Math.pow(A / P, 2.0 / 3.0) * Math.sqrt(this.cs);
        return v * A;

    }
    get ymax(){
        return this.r * (1.0 - Math.cos(ThetaMaxCircle / 2.0));
    }
    
    
    Q2Dn(Q) {
        if (Q >= this.Qmax) {
            alert('Q is reduced to Qmax!');
            return this.ymax;
        }

        let A, P, dAdtheta, dPdtheta = this.r, f = 10.0, df;
        let deltatheta = 10.0;
        let thetai = Math.PI;
        let tmin = 0.0;
        let tmax = ThetaMaxCircle;
        let count = 0;

        while (Math.abs(deltatheta) > TolAngle && Math.abs(f) > TolQ)
        {
            // A = (theta - sin(theta))r^2 / 2
            A = (thetai - Math.sin(thetai)) * this.r * this.r / 2.0;
            // A' = (1 - cos(theta))r^2 / 2
            dAdtheta = (1.0 - Math.cos(thetai)) * this.r * this.r / 2.0;
            // P = theta r
            P = thetai * this.r;
            f = KuUS / this.mN * Math.sqrt(this.cs) * Math.pow(A, 5.0 / 3.0) * Math.pow(P, -2.0 / 3.0) - Q;
            df = KuUS / this.mN * Math.sqrt(this.cs) * (5.0 / 3.0 * Math.pow(A / P, 2.0 / 3.0) * dAdtheta - 2.0 / 3.0 * Math.pow(A / P, 5.0 / 3.0) * dPdtheta);

            if (f > 0)
                tmax = thetai;
            else
            {
                if(Math.abs(f) < TolQ) 
                {
                    break;
                }
                tmin = thetai;
            }

            deltatheta = f / df;
                
            if (thetai - deltatheta < tmin)
                deltatheta = 0.5 * (thetai - tmin);

            if(thetai -deltatheta > tmax)
                deltatheta = 0.5 * (thetai - tmax);
                
            thetai -= deltatheta;
            count++;
            
            if (count > MaxCount) break;
        }
            
        return this.r * (1.0 - Math.cos(thetai / 2.0));
    }
}

