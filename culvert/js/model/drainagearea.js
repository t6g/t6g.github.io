class DrainageArea {
  constructor(A, C, Tc, site) {
      this.A = A;
      this.C = C;
      this.Tc = Tc;
      this.site = site;
  };
    
    rfi(i){
        return rf.i(this.site, i, this.Tc);
    };
/* site: 
         0 chesterfield, 
         1 Hopewell, 
         2 Powhatan, 
         3 Richmond WSO airport,
         4 Richmond WB city
   interval:
         0   1-year
         1   2-year
         2   5-year
         3  10-year  1
         4  25-year  1.1
         5  50-year  1.2
         6 100-year  1.25
    tc: time of concentration minutes
*/
/*
    function Q(i){
        var qt = this.A * this.C * rfi(i);
        switch(i){
            case 0:
            case 1:
            case 2:
            case 3: return qt;
            case 4: return 1.1 * qt;
            case 5: return 1.2 * qt;
            case 6: return 1.25 * qt;
        };
    };
*/
    
    get i2(){return rf.i(this.site, 1, this.Tc);};
    get i10(){return rf.i(this.site, 3, this.Tc);};
    get i100(){return rf.i(this.site, 6, this.Tc);};

    get Q2(){return this.A * this.C * this.i2;};
    get Q10(){return this.A * this.C * this.i10;};
    get Q100(){return 1.25 * this.A * this.C * this.i100;};
};

