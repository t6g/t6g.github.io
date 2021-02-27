var rf = {
    BDEs : [
        //average of the above 4 sites for Chesterfield
        [
            [46.2425,	11.0625,	0.8400],
            [54.8875,	11.3600,	0.8350],
            [58.6225,	11.3950,	0.8025],
            [59.5250,	10.9600,	0.7750],
            [57.1850,	10.1750,	0.7325],
            [55.8800,	 9.6675,	0.7025],
            [53.7125,	 9.0650,	0.6725]
        ],
        // Hopewell
        [
            [47.07, 10.99, 0.84],
            [56.89, 11.48, 0.84],
            [59.47, 11.34, 0.80], 
            [60.39, 10.88, 0.77], 
            [58.31, 10.16, 0.73],
            [56.79,  9.60, 0.70], 
            [54.74,  8.98, 0.67]  
        ],
        // Powhatan
        [
            [45.14, 11.16, 0.84], 
            [53.84, 11.53, 0.84], 
            [57.71, 11.61, 0.81], 
            [58.65, 11.14, 0.78], 
            [55.84, 10.25, 0.74], 
            [55.12,  9.83, 0.71], 
            [53.32,  9.30, 0.68]                
        ],
        // Richmond WB City
        [
             [46.49, 11.09, 0.84],
             [54.21, 11.19, 0.83],
             [58.15, 11.23, 0.80],
             [59.29, 10.90, 0.77],
             [57.44, 10.18, 0.73],
             [55.73,  9.63, 0.70],
             [53.10,  8.97, 0.67]
        ],
        // Richmond WSO Airport
        [
            [46.27, 11.01, 0.84],
            [54.61, 11.24, 0.83],
            [59.16, 11.40, 0.80],
            [59.77, 10.92, 0.78],
            [57.15, 10.11, 0.73],
            [55.88,  9.61, 0.70],
            [53.69,  9.01, 0.67]
        ] 
    ],
}
rf.i = function (site, interval, tc) {
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
         3  10-year
         4  25-year
         5  50-year
         6 100-year
    tc: time of concentration minutes
*/
    if (site < 0) site = 0;
    if (site > 4) site = 4;
    if (interval < 0) interval = 0;
    if(interval > 6) interval = 6;
    var bde = this.BDEs[site][interval];
    return bde[0]/Math.pow(tc + bde[1], bde[2]);
};

rf.station = function (site) {
    switch (site) {
        case 0: return "Chesterfield"; 
        case 1: return "Hopewell";
        case 2: return "Powhatan";
        case 3: return "Richmond WSO Airport";
        case 4: return "Richmond WB City";
        default: return "";
    };
};