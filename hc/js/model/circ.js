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
        return Math.sqrt(oc.g * this.ac / 2.0 / this.r / Math.sin(this.thetac/2.0));
    }
    get dc() {
        let A, dAdy, dAdtheta, ddAdydtheta, f = 10.0, df;
        let deltatheta = 10.0;
        let count = 0;
        let Q = this.Qn;
        //use French 1985 Table 2.1 Equation to estimate yc
        let yi = Math.min(1.01 * Math.pow(2.0 * this.r, -0.26) * Math.pow(Q * Q / oc.g, 0.25), 0.85 * 2 * this.r);

        let thetai = 2.0 * Math.acos(1.0 - yi / this.r);

        while (Math.abs(deltatheta) > oc.TolA && Math.abs(f) > oc.TolQ)
        {
            A = (thetai - Math.sin(thetai)) * this.r * this.r / 2.0;
            dAdy = 2.0 * this.r * Math.sin(thetai / 2.0);
            f = oc.g * A * A * A - Q * Q * dAdy;
            dAdtheta = 0.5 * (1.0 - Math.cos(thetai)) * this.r * this.r;
            ddAdydtheta = this.r * Math.cos(thetai / 2.0);
            df = 3.0 * oc.g * A * A * dAdtheta - Q * Q * ddAdydtheta;
            deltatheta = f / df;
            thetai -= deltatheta;
            if (thetai >= 2.0 * Math.PI) thetai = 2.0 * Math.PI;

            if(thetai < 0.0) thetai = 0.0;

            count++;
            if (count > oc.MaxCount) break;
        }

        return this.r * (1.0 - Math.cos(thetai / 2.0));
    }

    static get thetaMax() {return 5.27810713;}
    
    get Qmax(){
        let theta = CircularChannel.thetaMax;
        let A = (theta - Math.sin(theta)) * this.r * this.r / 2.0;
        let P = theta * this.r;
        let v = oc.Ku / this.mN * Math.pow(A / P, oc.X) * Math.pow(this.cs, oc.Y);
        return v * A;

    }
    get ymax(){
        return this.r * (1.0 - Math.cos(CircularChannel.thetaMax / 2.0));
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
        let tmax = CircularChannel.thetaMax;
        let count = 0;

        while (Math.abs(deltatheta) > oc.TolA && Math.abs(f) > oc.TolQ)
        {
            // A = (theta - sin(theta))r^2 / 2
            A = (thetai - Math.sin(thetai)) * this.r * this.r / 2.0;
            // A' = (1 - cos(theta))r^2 / 2
            dAdtheta = (1.0 - Math.cos(thetai)) * this.r * this.r / 2.0;
            // P = theta r
            P = thetai * this.r;
            f = oc.Ku / this.mN * Math.pow(this.cs, oc.Y) * Math.pow(A, oc.X + 1) * Math.pow(P, -oc.X) - Q;
            df = oc.Ku / this.mN * Math.pow(this.cs, oc.Y) * ((oc.X + 1) * Math.pow(A / P, oc.X) * dAdtheta - oc.X * Math.pow(A / P, oc.X + 1) * dPdtheta);

            if (f > 0)
                tmax = thetai;
            else
            {
                if(Math.abs(f) < oc.TolQ) 
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
            
            if (count > oc.MaxCount) break;
        }
            
        return this.r * (1.0 - Math.cos(thetai / 2.0));
    }
}

