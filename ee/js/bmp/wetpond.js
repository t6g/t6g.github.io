jQuery(document).ready(function(){
    $("#mynav").load("nav.html");

    const defaultBioret = {
        tv1: "na",
        cell1: "na",
        lwratio1: "na",
        flowPath1: "na",
        aquaticBench: "na",
        turf: "na",
        tv2: "na",
        cell2: "na",
        lwratio2: "na",
        flowpath2: "na",
        wetland: "na",
        aerator: "na",
        overflow: "na",
        aBenchForebay: "na",
        safetyBench: "na",
        minorInflow: "na",
        majorInflow: "na",
        separateCell: "na",
        min4ftForebay: "na",
        aBenchForebay: "na",
        volumeForebay: "na",
        rodMeter: "na",
        clayLiner: "na",
        outfall10y: "na",
        cellsFormed: "na",
        rangeCDA: "na",
        constructedWetland: "na",
        pondIrrigation: "na",
        drainPipe: "na",
        damSafety: "na",
        shade: "na",
        soilDepth: "na",
        constructionNarrative: "na",
        upstreamStabilize: "na",
        areaPretreatment: "na",
        wetlandDivert: "na",
        conversionSB: "na",
        setbackPL: "na",
        setbackWell: "na",
        setbackBuilding: "na",
        soilBoring: "na",
        pretreatmentFirst: "na",
        outsideWetland: "na",
        goose: "na",
        materialSpec: "na",
        slopeLongitudinal: "na",
        dropWetland: "na",
        topWidthDam: "na",
        elevationLabel: "na",
        volumeLabel: "na",
        maxDepthWetland: "na",
        slopeSide: "na",
        tv1ftWetland: "na",
        max5ftNWSE: "na",
        calcTV: "na",
        routing: "na",
        tvStore: "na",
        rodMeterProfile: "na", 
        halfEDVolume: "na",
        routing: "na",
        calcOverflow: "na",
        waterBalance: "na",
        nonerosive: "na",
        schedule: "na", 
        pondingPlant: "na",
        plantArea: "na", 
        turfCoverLevel1: "na", 
        turfCoverTree: "na", 
        noIrrigation: "na",
        plantBench: "na",
        grassSalt: "na",
        nativePlant: "na",
        woodyVeg: "na"
    };
    
    var site = {};
    
    $("#mynav").load("nav.html");

    let tmp = localStorage.getItem('Bioretention'); 
    if (tmp) {
        Object.assign(site, JSON.parse(tmp));
    } else {
        Object.assign(site, defaultBioret);
    }
    
    setUI();
    
    $("input[name='level']").on("change", function(){
        //console.log('change level: ' + this.value);

        if(this.value === "1")
        {
            $(".level2").hide();
            $(".level1").show();
        };
        if(this.value === "2")
        {
            $(".level1").hide();
            $(".level2").show();
        };
    });
    

    $('input[type=radio]').change(function(e){
        switch(e.target.name){
            case 'tv1': site.tv1 = this.value; break;
            case 'cell1': site.cell1 = this.value; break;
            case 'lwratio1': site.lwratio1 = this.value; break;
            case 'overflow': site.overflow = this.value; break;
            case 'flowPath1': site.flowPath1 = this.value; break;
            case 'aquaticBench': site.aquaticBench = this.value; break;
            case 'turf': site.turf = this.value; break;
            case 'aBenchForebay': site.aBenchForebay = this.value; break;
            case 'tv2': site.tv2 = this.value; break;
            case 'cell2': site.cell2 = this.value; break;
            case 'lwratio2': site.lwratio2 = this.value; break;
            case 'flowpath2': site.flowpath2 = this.value; break;
            case 'wetland': site.wetland = this.value; break;
            case 'aerator': site.aerator = this.value; break;
            case 'safetyBench': site.safetyBench = this.value; break;
            case 'minorInflow': site.minorInflow = this.value; break;
            case 'majorInflow': site.majorInflow = this.value; break;
            case 'separateCell': site.separateCell = this.value; break;
            case 'min4ftForebay': site.min4ftForebay = this.value; break;
            case 'aBenchForebay': site.aBenchForebay = this.value; break;
            case 'volumeForebay': site.volumeForebay = this.value; break;
            case 'rodMeter': site.rodMeter = this.value; break;
            case 'clayLiner': site.clayLiner = this.value; break;
            case 'outfall10y': site.outfall10y = this.value; break;
            case 'cellsFormed': site.cellsFormed = this.value; break;
            case 'rangeCDA': site.rangeCDA = this.value; break;
            case 'constructedWetland': site.constructedWetland = this.value; break;
            case 'pondIrrigation': site.pondIrrigation = this.value; break;
            case 'drainPipe': site.drainPipe = this.value; break;
            case 'damSafety': site.damSafety = this.value; break;
            case 'shade': site.shade = this.value; break;
            case 'soilDepth': site.soilDepth = this.value; break;
            case 'constructionNarrative': site.constructionNarrative = this.value; break;
            case 'upstreamStabilize': site.upstreamStabilize = this.value; break;
            case 'areaPretreatment': site.areaPretreatment = this.value; break;
            case 'wetlandDivert': site.wetlandDivert = this.value; break;
            case 'conversionSB': site.conversionSB = this.value; break;
            case 'setbackBuilding': site.setbackBuilding = this.value; break;
            case 'setbackSeptic': site.setbackSeptic = this.value; break;
            case 'setbackWell': site.setbackWell = this.value; break;
            case 'setbackUtility': site.setbackUtility = this.value; break;
            case 'setbackPL': site.setbackPL = this.value; break;
            case 'setbackWell': site.setbackWell = this.value; break;
            case 'setbackBuilding': site.setbackBuilding = this.value; break;
            case 'soilBoring': site.soilBoring = this.value; break;
            case 'pretreatmentFirst': site.pretreatmentFirst = this.value; break;
            case 'outsideWetland': site.outsideWetland = this.value; break;
            case 'goose': site.goose = this.value; break;
            case 'materialSpec': site.materialSpec = this.value; break;
            case 'slopeCDA': site.slopeCDA = this.value; break;
            case 'floodplain': site.floodplain = this.value; break;
            case 'slopeLongitudinal': site.slopeLongitudinal = this.value; break;
            case 'dropWetland': site.dropWetland = this.value; break;
            case 'topWidthDam': site.topWidthDam = this.value; break;
            case 'maxDepthWetland': site.maxDepthWetland = this.value; break;
            case 'tv1ftWetland': site.tv1ftWetland = this.value; break;
            case 'slopeSide': site.slopeSide = this.value; break;
            case 'max5ftNWSE': site.max5ftNWSE = this.value; break;
            case 'calcTV': site.calcTV = this.value; break;
            case 'routing': site.routing = this.value; break;
            case 'tvStore': site.tvStore = this.value; break;
            case 'elevationLabel': site.elevationLabel = this.value; break;
            case 'volumeLabel': site.volumeLabel = this.value; break;
            case 'rodMeterProfile': site.rodMeterProfile = this.value; break;
            case 'halfEDVolume': site.halfEDVolume = this.value; break;
            case 'routing': site.routing = this.value; break;
            case 'calcOverflow': site.calcOverflow = this.value; break;
            case 'waterBalance': site.waterBalance = this.value; break;
            case 'nonerosive': site.nonerosive = this.value; break;
            case 'schedule': site.schedule = this.value; break; 
            case 'pondingPlant': site.pondingPlant = this.value; break; 
            case 'plantArea': site.plantArea = this.value; break; 
            case 'turfCoverLevel1': site.turfCoverLevel1 = this.value; break;
            case 'turfCoverTree': site.turfCoverTree = this.value; break;
            case 'noIrrigation': site.noIrrigation = this.value; break;
            case 'plantBench': site.plantBench = this.value; break;
            case 'grassSalt': site.grassSalt = this.value; break;
            case 'nativePlant': site.nativePlant = this.value; break;
            case 'woodyVeg': site.woodyVeg = this.value; break;
        };
    });
    
    function setUI(){
        if($("#level1").prop('checked')){$(".level2").hide();};
        if($("#level2").prop('checked')){$(".level1").hide();};

        switch(site.tv1){
            case "yes": 
                $("#tv1Yes").prop('checked', true);
                break;
            case "no": 
                $("#tv1No").prop('checked', true);
                break;
            case "na": 
                $("#tv1NA").prop('checked', true);
                break;
        };
        
        switch(site.cell1){
            case "yes": 
                $("#cell1Yes").prop('checked', true);
                break;
            case "no": 
                $("#cell1No").prop('checked', true);
                break;
            case "na": 
                $("#cell1NA").prop('checked', true);
                break;
        };
        
        switch(site.lwratio1){
            case "yes": 
                $("#lwratio1Yes").prop('checked', true);
                break;
            case "no": 
                $("#lwratio1No").prop('checked', true);
                break;
            case "na": 
                $("#lwratio1NA").prop('checked', true);
                break;
        };
        
        switch(site.overflow){
            case "yes": 
                $("#overflowYes").prop('checked', true);
                break;
            case "no": 
                $("#overflowNo").prop('checked', true);
                break;
            case "na": 
                $("#overflowNA").prop('checked', true);
                break;
        };
        
        switch(site.flowPath1){
            case "yes": 
                $("#flowPath1Yes").prop('checked', true);
                break;
            case "no": 
                $("#flowPath1No").prop('checked', true);
                break;
            case "na": 
                $("#flowPath1NA").prop('checked', true);
                break;
        };
        

        switch(site.aquaticBench){
            case "yes": 
                $("#aquaticBenchYes").prop('checked', true);
                break;
            case "no": 
                $("#aquaticBenchNo").prop('checked', true);
                break;
            case "na": 
                $("#aquaticBenchNA").prop('checked', true);
                break;
        };
        
       switch(site.turf){
            case "yes": 
                $("#turfYes").prop('checked', true);
                break;
            case "no": 
                $("#turfNo").prop('checked', true);
                break;
            case "na": 
                $("#turfNA").prop('checked', true);
                break;
        };
        
       switch(site.aBenchForebay){
            case "yes": 
                $("#aBenchForebayYes").prop('checked', true);
                break;
            case "no": 
                $("#aBenchForebayNo").prop('checked', true);
                break;
            case "na": 
                $("#aBenchForebayNA").prop('checked', true);
                break;
        };
        
       switch(site.tv2){
            case "yes": 
                $("#tv2Yes").prop('checked', true);
                break;
            case "no": 
                $("#tv2No").prop('checked', true);
                break;
            case "na": 
                $("#tv2NA").prop('checked', true);
                break;
        };
        
       switch(site.cell2){
            case "yes": 
                $("#cell2Yes").prop('checked', true);
                break;
            case "no": 
                $("#cell2No").prop('checked', true);
                break;
            case "na": 
                $("#cell2NA").prop('checked', true);
                break;
        };
        
        switch(site.lwratio2){
            case "yes": 
                $("#lwratio2Yes").prop('checked', true);
                break;
            case "no": 
                $("#lwratio2No").prop('checked', true);
                break;
            case "na": 
                $("#lwratio2NA").prop('checked', true);
                break;
        };
        
        switch(site.flowpath2){
            case "yes": 
                $("#flowpath2Yes").prop('checked', true);
                break;
            case "no": 
                $("#flowpath2No").prop('checked', true);
                break;
            case "na": 
                $("#flowpath2NA").prop('checked', true);
                break;
        };

        switch(site.wetland){
            case "yes": 
                $("#wetlandYes").prop('checked', true);
                break;
            case "no": 
                $("#wetlandNo").prop('checked', true);
                break;
            case "na": 
                $("#wetlandNA").prop('checked', true);
                break;
        };

        switch(site.aerator){
            case "yes": 
                $("#aeratorYes").prop('checked', true);
                break;
            case "no": 
                $("#aeratorNo").prop('checked', true);
                break;
            case "na": 
                $("#aeratorNA").prop('checked', true);
                break;
        };
        
        switch(site.safetyBench){
            case "yes": 
                $("#safetyBenchYes").prop('checked', true);
                break;
            case "no": 
                $("#safetyBenchNo").prop('checked', true);
                break;
            case "na": 
                $("#safetyBenchNA").prop('checked', true);
                break;
        };
        
        switch(site.minorInflow){
            case "yes": 
                $("#minorInflowYes").prop('checked', true);
                break;
            case "no": 
                $("#minorInflowNo").prop('checked', true);
                break;
            case "na": 
                $("#minorInflowNA").prop('checked', true);
                break;
        };
        
        switch(site.majorInflow){
            case "yes": 
                $("#majorInflowYes").prop('checked', true);
                break;
            case "no": 
                $("#majorInflowNo").prop('checked', true);
                break;
            case "na": 
                $("#majorInflowNA").prop('checked', true);
                break;
        };
        
        switch(site.separateCell){
            case "yes": 
                $("#separateCellYes").prop('checked', true);
                break;
            case "no": 
                $("#separateCellNo").prop('checked', true);
                break;
            case "na": 
                $("#separateCellNA").prop('checked', true);
                break;
        };
        
        switch(site.min4ftForebay){
            case "yes": 
                $("#min4ftForebayYes").prop('checked', true);
                break;
            case "no": 
                $("#min4ftForebayNo").prop('checked', true);
                break;
            case "na": 
                $("#min4ftForebayNA").prop('checked', true);
                break;
        };

        switch(site.aBenchForebay){
            case "yes": 
                $("#aBenchForebayYes").prop('checked', true);
                break;
            case "no": 
                $("#aBenchForebayNo").prop('checked', true);
                break;
            case "na": 
                $("#aBenchForebayNA").prop('checked', true);
                break;
        };
        
        switch(site.volumeForebay){
            case "yes": 
                $("#volumeForebayYes").prop('checked', true);
                break;
            case "no": 
                $("#volumeForebayNo").prop('checked', true);
                break;
            case "na": 
                $("#volumeForebayNA").prop('checked', true);
                break;
        };
        
        
        switch(site.rodMeter){
            case "yes": 
                $("#rodMeterYes").prop('checked', true);
                break;
            case "no": 
                $("#rodMeterNo").prop('checked', true);
                break;
            case "na": 
                $("#rodMeterNA").prop('checked', true);
                break;
        };
        
        switch(site.clayLiner){
            case "yes": 
                $("#clayLinerYes").prop('checked', true);
                break;
            case "no": 
                $("#clayLinerNo").prop('checked', true);
                break;
            case "na": 
                $("#clayLinerNA").prop('checked', true);
                break;
        };
        
        switch(site.outfall10y){
            case "yes": 
                $("#outfall10yYes").prop('checked', true);
                break;
            case "no": 
                $("#outfall10yNo").prop('checked', true);
                break;
            case "na": 
                $("#outfall10yNA").prop('checked', true);
                break;
        };

        switch(site.cellsFormed){
            case "yes": 
                $("#cellsFormedYes").prop('checked', true);
                break;
            case "no": 
                $("#cellsFormedNo").prop('checked', true);
                break;
            case "na": 
                $("#cellsFormedNA").prop('checked', true);
                break;
        };

        switch(site.rangeCDA){
            case "yes": 
                $("#rangeCDAYes").prop('checked', true);
                break;
            case "no": 
                $("#rangeCDANo").prop('checked', true);
                break;
            case "na": 
                $("#rangeCDANA").prop('checked', true);
                break;
        };
        
        switch(site.constructedWetland){
            case "yes": 
                $("#constructedWetlandYes").prop('checked', true);
                break;
            case "no": 
                $("#constructedWetlandNo").prop('checked', true);
                break;
            case "na": 
                $("#constructedWetlandNA").prop('checked', true);
                break;
        };
        
        switch(site.pondIrrigation){
            case "yes": 
                $("#pondIrrigationYes").prop('checked', true);
                break;
            case "no": 
                $("#pondIrrigationNo").prop('checked', true);
                break;
            case "na": 
                $("#pondIrrigationNA").prop('checked', true);
                break;
        };

        switch(site.drainPipe){
            case "yes": 
                $("#drainPipeYes").prop('checked', true);
                break;
            case "no": 
                $("#drainPipeNo").prop('checked', true);
                break;
            case "na": 
                $("#drainPipeNA").prop('checked', true);
                break;
        };
        
        switch(site.damSafety){
            case "yes": 
                $("#damSafetyYes").prop('checked', true);
                break;
            case "no": 
                $("#damSafetyNo").prop('checked', true);
                break;
            case "na": 
                $("#damSafetyNA").prop('checked', true);
                break;
        };
        
        switch(site.shade){
            case "yes": 
                $("#shadeYes").prop('checked', true);
                break;
            case "no": 
                $("#shadeNo").prop('checked', true);
                break;
            case "na": 
                $("#shadeNA").prop('checked', true);
                break;
        };
        
        switch(site.soilDepth){
            case "yes": 
                $("#soilDepthYes").prop('checked', true);
                break;
            case "no": 
                $("#soilDepthNo").prop('checked', true);
                break;
            case "na": 
                $("#soilDepthNA").prop('checked', true);
                break;
        };
        
        switch(site.constructionNarrative){
            case "yes": 
                $("#constructionNarrativeYes").prop('checked', true);
                break;
            case "no": 
                $("#constructionNarrativeNo").prop('checked', true);
                break;
            case "na": 
                $("#constructionNarrativeNA").prop('checked', true);
                break;
        };
        
        switch(site.upstreamStabilize){
            case "yes": 
                $("#upstreamStabilizeYes").prop('checked', true);
                break;
            case "no": 
                $("#upstreamStabilizeNo").prop('checked', true);
                break;
            case "na": 
                $("#upstreamStabilizeNA").prop('checked', true);
                break;
        };
        

        switch(site.areaPretreatment){
            case "yes": 
                $("#areaPretreatmentYes").prop('checked', true);
                break;
            case "no": 
                $("#areaPretreatmentNo").prop('checked', true);
                break;
            case "na": 
                $("#areaPretreatmentNA").prop('checked', true);
                break;
        };
        
        switch(site.wetlandDivert){
            case "yes": 
                $("#wetlandDivertYes").prop('checked', true);
                break;
            case "no": 
                $("#wetlandDivertNo").prop('checked', true);
                break;
            case "na": 
                $("#wetlandDivertNA").prop('checked', true);
                break;
        };
        
        switch(site.conversionSB){
            case "yes": 
                $("#conversionSBYes").prop('checked', true);
                break;
            case "no": 
                $("#conversionSBNo").prop('checked', true);
                break;
            case "na": 
                $("#conversionSBNA").prop('checked', true);
                break;
        };

        switch(site.setbackBuilding){
            case "yes": 
                $("#setbackBuildingYes").prop('checked', true);
                break;
            case "no": 
                $("#setbackBuildingNo").prop('checked', true);
                break;
            case "na": 
                $("#setbackBuildingNA").prop('checked', true);
                break;
        };

        switch(site.setbackSeptic){
            case "yes": 
                $("#setbackSepticYes").prop('checked', true);
                break;
            case "no": 
                $("#setbackSepticNo").prop('checked', true);
                break;
            case "na": 
                $("#setbackSepticNA").prop('checked', true);
                break;
        };

        switch(site.setbackWell){
            case "yes": 
                $("#setbackWellYes").prop('checked', true);
                break;
            case "no": 
                $("#setbackWellNo").prop('checked', true);
                break;
            case "na": 
                $("#setbackWellNA").prop('checked', true);
                break;
        };

        switch(site.setbackUtility){
            case "yes": 
                $("#setbackUtilityYes").prop('checked', true);
                break;
            case "no": 
                $("#setbackUtilityNo").prop('checked', true);
                break;
            case "na": 
                $("#setbackUtilityNA").prop('checked', true);
                break;
        };

        switch(site.setbackPL){
            case "yes": 
                $("#setbackPLYes").prop('checked', true);
                break;
            case "no": 
                $("#setbackPLNo").prop('checked', true);
                break;
            case "na": 
                $("#setbackPLNA").prop('checked', true);
                break;
        };

        switch(site.setbackWell){
            case "yes": 
                $("#setbackWellYes").prop('checked', true);
                break;
            case "no": 
                $("#setbackWellNo").prop('checked', true);
                break;
            case "na": 
                $("#setbackWellNA").prop('checked', true);
                break;
        };

        switch(site.setbackBuilding){
            case "yes": 
                $("#setbackBuildingYes").prop('checked', true);
                break;
            case "no": 
                $("#setbackBuildingNo").prop('checked', true);
                break;
            case "na": 
                $("#setbackBuildingNA").prop('checked', true);
                break;
        };

        switch(site.soilBoring){
            case "yes": 
                $("#soilBoringYes").prop('checked', true);
                break;
            case "no": 
                $("#soilBoringNo").prop('checked', true);
                break;
            case "na": 
                $("#soilBoringNA").prop('checked', true);
                break;
        };

        switch(site.pretreatmentFirst){
            case "yes": 
                $("#pretreatmentFirstYes").prop('checked', true);
                break;
            case "no": 
                $("#pretreatmentFirstNo").prop('checked', true);
                break;
            case "na": 
                $("#pretreatmentFirstNA").prop('checked', true);
                break;
        };

        switch(site.slopeCDA){
            case "yes": 
                $("#slopeCDAYes").prop('checked', true);
                break;
            case "no": 
                $("#slopeCDANo").prop('checked', true);
                break;
            case "na": 
                $("#slopeCDANA").prop('checked', true);
                break;
        };

        switch(site.floodplain){
            case "yes": 
                $("#floodplainYes").prop('checked', true);
                break;
            case "no": 
                $("#floodplainNo").prop('checked', true);
                break;
            case "na": 
                $("#floodplainNA").prop('checked', true);
                break;
        };

        switch(site.outsideWetland){
            case "yes": 
                $("#outsideWetlandYes").prop('checked', true);
                break;
            case "no": 
                $("#outsideWetlandNo").prop('checked', true);
                break;
            case "na": 
                $("#outsideWetlandNA").prop('checked', true);
                break;
        };

        switch (site.goose) {
            case "yes":
                $("#gooseYes").prop('checked', true);
                break;
            case "no":
                $("#gooseNo").prop('checked', true);
                break;
            case "na":
                $("#gooseNA").prop('checked', true);
                break;
        };
        switch (site.slopeLongitudinal) {
            case "yes":
                $("#slopeLongitudinalYes").prop('checked', true);
                break;
            case "no":
                $("#slopeLongitudinalNo").prop('checked', true);
                break;
            case "na":
                $("#slopeLongitudinalNA").prop('checked', true);
                break;
        };
        switch (site.dropWetland) {
            case "yes":
                $("#dropWetlandYes").prop('checked', true);
                break;
            case "no":
                $("#dropWetlandNo").prop('checked', true);
                break;
            case "na":
                $("#dropWetlandNA").prop('checked', true);
                break;
        };
        switch(site.materialSpec){
            case "yes": 
                $("#materialSpecYes").prop('checked', true);
                break;
            case "no": 
                $("#materialSpecNo").prop('checked', true);
                break;
            case "na": 
                $("#materialSpecNA").prop('checked', true);
                break;
        };
        

        switch (site.maxDepthWetland) {
            case "yes":
                $("#maxDepthWetlandYes").prop('checked', true);
                break;
            case "no":
                $("#maxDepthWetlandNo").prop('checked', true);
                break;
            case "na":
                $("#maxDepthWetlandNA").prop('checked', true);
                break;
        };

        switch (site.tv1ftWetland) {
            case "yes":
                $("#tv1ftWetlandYes").prop('checked', true);
                break;
            case "no":
                $("#tv1ftWetlandNo").prop('checked', true);
                break;
            case "na":
                $("#tv1ftWetlandNA").prop('checked', true);
                break;
        };
        switch (site.slopeSide) {
            case "yes":
                $("#slopeSideYes").prop('checked', true);
                break;
            case "no":
                $("#slopeSideNo").prop('checked', true);
                break;
            case "na":
                $("#slopeSideNA").prop('checked', true);
                break;
        };
        switch (site.max5ftNWSE) {
            case "yes":
                $("#max5ftNWSEYes").prop('checked', true);
                break;
            case "no":
                $("#max5ftNWSENo").prop('checked', true);
                break;
            case "na":
                $("#max5ftNWSENA").prop('checked', true);
                break;
        };
        switch (site.calcTV) {
            case "yes":
                $("#calcTVYes").prop('checked', true);
                break;
            case "no":
                $("#calcTVNo").prop('checked', true);
                break;
            case "na":
                $("#calcTVNA").prop('checked', true);
                break;
        };
        switch (site.routing) {
            case "yes":
                $("#routingYes").prop('checked', true);
                break;
            case "no":
                $("#routingNo").prop('checked', true);
                break;
            case "na":
                $("#routingNA").prop('checked', true);
                break;
        };
        switch (site.tvStore) {
            case "yes":
                $("#tvStoreYes").prop('checked', true);
                break;
            case "no":
                $("#tvStoreNo").prop('checked', true);
                break;
            case "na":
                $("#tvStoreNA").prop('checked', true);
                break;
        };
        switch (site.topWidthDam) {
            case "yes":
                $("#topWidthDamYes").prop('checked', true);
                break;
            case "no":
                $("#topWidthDamNo").prop('checked', true);
                break;
            case "na":
                $("#topWidthDamNA").prop('checked', true);
                break;
        };
        switch (site.volumeLabel) {
            case "yes":
                $("#volumeLabelYes").prop('checked', true);
                break;
            case "no":
                $("#volumeLabelNo").prop('checked', true);
                break;
            case "na":
                $("#volumeLabelNA").prop('checked', true);
                break;
        };

        switch (site.rodMeterProfile) {
            case "yes":
                $("#rodMeterProfileYes").prop('checked', true);
                break;
            case "no":
                $("#rodMeterProfileNo").prop('checked', true);
                break;
            case "na":
                $("#rodMeterProfileNA").prop('checked', true);
                break;
        };
        switch (site.elevationLabel) {
            case "yes":
                $("#elevationLabelYes").prop('checked', true);
                break;
            case "no":
                $("#elevationLabelNo").prop('checked', true);
                break;
            case "na":
                $("#elevationLabelNA").prop('checked', true);
                break;
        };

        switch (site.halfEDVolume) {
            case "yes":
                $("#halfEDVolumeYes").prop('checked', true);
                break;
            case "no":
                $("#halfEDVolumeNo").prop('checked', true);
                break;
            case "na":
                $("#halfEDVolumeNA").prop('checked', true);
                break;
        };
        switch (site.topWidthDam) {
            case "yes":
                $("#topWidthDamYes").prop('checked', true);
                break;
            case "no":
                $("#topWidthDamNo").prop('checked', true);
                break;
            case "na":
                $("#topWidthDamNA").prop('checked', true);
                break;
        };

        switch(site.routing){
            case "yes": 
                $("#routingYes").prop('checked', true);
                break;
            case "no": 
                $("#routingNo").prop('checked', true);
                break;
            case "na": 
                $("#routingNA").prop('checked', true);
                break;
        };

        switch (site.calcOverflow) {
            case "yes":
                $("#calcOverflowYes").prop('checked', true);
                break;
            case "no":
                $("#calcOverflowNo").prop('checked', true);
                break;
            case "na":
                $("#calcOverflowNA").prop('checked', true);
                break;
        };
        switch (site.waterBalance) {
            case "yes":
                $("#waterBalanceYes").prop('checked', true);
                break;
            case "no":
                $("#waterBalanceNo").prop('checked', true);
                break;
            case "na":
                $("#waterBalanceNA").prop('checked', true);
                break;
        };
        
        switch (site.nonerosive) {
            case "yes":
                $("#nonerosiveYes").prop('checked', true);
                break;
            case "no":
                $("#nonerosiveNo").prop('checked', true);
                break;
            case "na":
                $("#nonerosiveNA").prop('checked', true);
                break;
        };
        
        switch (site.schedule) {
            case "yes":
                $("#scheduleYes").prop('checked', true);
                break;
            case "no":
                $("#scheduleNo").prop('checked', true);
                break;
            case "na":
                $("#scheduleNA").prop('checked', true);
                break;
        };
        
        switch (site.pondingPlant) {
            case "yes":
                $("#pondingPlantYes").prop('checked', true);
                break;
            case "no":
                $("#pondingPlantNo").prop('checked', true);
                break;
            case "na":
                $("#pondingPlantNA").prop('checked', true);
                break;
        };
        
        switch (site.plantArea) {
            case "yes":
                $("#plantAreaYes").prop('checked', true);
                break;
            case "no":
                $("#plantAreaNo").prop('checked', true);
                break;
            case "na":
                $("#plantAreaNA").prop('checked', true);
                break;
        };
        
        switch (site.turfCoverLevel1) {
            case "yes":
                $("#turfCoverLevel1Yes").prop('checked', true);
                break;
            case "no":
                $("#turfCoverLevel1No").prop('checked', true);
                break;
            case "na":
                $("#turfCoverLevel1NA").prop('checked', true);
                break;
        };
        
        switch (site.turfCoverTree) {
            case "yes":
                $("#turfCoverTreeYes").prop('checked', true);
                break;
            case "no":
                $("#turfCoverTreeNo").prop('checked', true);
                break;
            case "na":
                $("#turfCoverTreeNA").prop('checked', true);
                break;
        };
        
        switch (site.noIrrigation) {
            case "yes":
                $("#noIrrigationYes").prop('checked', true);
                break;
            case "no":
                $("#noIrrigationNo").prop('checked', true);
                break;
            case "na":
                $("#noIrrigationNA").prop('checked', true);
                break;
        };
        
        switch (site.plantBench) {
            case "yes":
                $("#plantBenchYes").prop('checked', true);
                break;
            case "no":
                $("#plantBenchNo").prop('checked', true);
                break;
            case "na":
                $("#plantBenchNA").prop('checked', true);
                break;
        };
        
        switch (site.grassSalt) {
            case "yes":
                $("#grassSaltYes").prop('checked', true);
                break;
            case "no":
                $("#grassSaltNo").prop('checked', true);
                break;
            case "na":
                $("#grassSaltNA").prop('checked', true);
                break;
        };
        
        switch (site.nativePlant) {
            case "yes":
                $("#nativePlantYes").prop('checked', true);
                break;
            case "no":
                $("#nativePlantNo").prop('checked', true);
                break;
            case "na":
                $("#nativePlantNA").prop('checked', true);
                break;
        };
        
        switch (site.woodyVeg) {
            case "yes":
                $("#woodyVegYes").prop('checked', true);
                break;
            case "no":
                $("#woodyVegNo").prop('checked', true);
                break;
            case "na":
                $("#woodyVegNA").prop('checked', true);
                break;
        };
        
    };
    

    $("#btnGenerate").click(function() {
        var list = $("#generatedComments");
        if(list == null) {
            return;
        }
        
        var lines = $('#comments').val().split('\n');
        for(var i = 0;i < lines.length;i++){
            if(lines[i].length > 0){
                list.append('<li>' + lines[i] + '</li>');
            }
        }        
        
        if(site.tv1 == 'no'){
            list.append('<li>' + $("label[for='tv1']").text() + '</li>');
        }

        if(site.cell1 == 'no'){
            list.append('<li>' + $("label[for='cell1']").text() + '</li>');
        }

        if(site.lwratio1 == 'no'){
            list.append('<li>' + $("label[for='lwratio1']").text() + '</li>');
        }

        if(site.flowPath1 == 'no'){
            list.append('<li>' + $("label[for='flowPath1']").text() + '</li>');
        }

        if(site.aquaticBench == 'no'){
            list.append('<li>' + $("label[for='aquaticBench']").text() + '</li>');
        }

        if(site.turf == 'no'){
            list.append('<li>' + $("label[for='turf']").text() + '</li>');
        }

        if(site.benchmark == 'no'){
            list.append('<li>' + $("label[for='benchmark']").text() + '</li>');
        }

        if(site.aBenchForebay == 'no'){
            list.append('<li>' + $("label[for='aBenchForebay']").text() + '</li>');
        }

        if(site.tv2 == 'no'){
            list.append('<li>' + $("label[for='tv2']").text() + '</li>');
        }

        if(site.cell2 == 'no'){
            list.append('<li>' + $("label[for='cell2']").text() + '</li>');
        }

        if(site.overflow == 'no'){
            list.append('<li>' + $("label[for='overflow']").text() + '</li>');
        }


        if(site.lwratio2 == 'no'){
            list.append('<li>' + $("label[for='lwratio2']").text() + '</li>');
        }

        if(site.flowpath2 == 'no'){
            list.append('<li>' + $("label[for='flowpath2']").text() + '</li>');
        }

        if(site.wetland == 'no'){
            list.append('<li>' + $("label[for='wetland']").text() + '</li>');
        }

        if(site.aerator == 'no'){
            list.append('<li>' + $("label[for='aerator']").text() + '</li>');
        }

        if(site.safetyBench == 'no'){
            list.append('<li>' + $("label[for='safetyBench']").text() + '</li>');
        }

        if(site.minorInflow == 'no'){
            list.append('<li>' + $("label[for='minorInflow']").text() + '</li>');
        }

        if(site.majorInflow == 'no'){
            list.append('<li>' + $("label[for='majorInflow']").text() + '</li>');
        }

        if(site.separateCell == 'no'){
            list.append('<li>' + $("label[for='separateCell']").text() + '</li>');
        }

        if(site.min4ftForebay == 'no'){
            list.append('<li>' + $("label[for='min4ftForebay']").text() + '</li>');
        }

        if(site.aBenchForebay == 'no'){
            list.append('<li>' + $("label[for='aBenchForebay']").text() + '</li>');
        }

        if(site.volumeForebay == 'no'){
            list.append('<li>' + $("label[for='volumeForebay']").text() + '</li>');
        }

        if(site.rodMeter == 'no'){
            list.append('<li>' + $("label[for='rodMeter']").text() + '</li>');
        }

        if(site.clayLiner == 'no'){
            list.append('<li>' + $("label[for='clayLiner']").text() + '</li>');
        }

        if(site.outfall10y == 'no'){
            list.append('<li>' + $("label[for='outfall10y']").text() + '</li>');
        }

        if(site.cellsFormed == 'no'){
            list.append('<li>' + $("label[for='cellsFormed']").text() + '</li>');
        }

        if(site.rangeCDA == 'no'){
            list.append('<li>' + $("label[for='rangeCDA']").text() + '</li>');
        }

        if(site.constructedWetland == 'no'){
            list.append('<li>' + $("label[for='constructedWetland']").text() + '</li>');
        }

        if(site.pondIrrigation == 'no'){
            list.append('<li>' + $("label[for='pondIrrigation']").text() + '</li>');
        }

        if(site.drainPipe == 'no'){
            list.append('<li>' + $("label[for='drainPipe']").text() + '</li>');
        }

        if(site.damSafety == 'no'){
            list.append('<li>' + $("label[for='damSafety']").text() + '</li>');
        }

        if(site.shade == 'no'){
            list.append('<li>' + $("label[for='shade']").text() + '</li>');
        }

        if(site.soilDepth == 'no'){
            list.append('<li>' + $("label[for='soilDepth']").text() + '</li>');
        }

        if(site.constructionNarrative == 'no'){
            list.append('<li>' + $("label[for='constructionNarrative']").text() + '</li>');
        }

        if(site.upstreamStabilize == 'no'){
            list.append('<li>' + $("label[for='upstreamStabilize']").text() + '</li>');
        }

        if(site.intervalCD == 'no'){
            list.append('<li>' + $("label[for='intervalCD']").text() + '</li>');
        }

        
        if(site.materialSpec == 'no'){
            list.append('<li>' + $("label[for='materialSpec']").text() + '</li>');
        }

        if(site.upstreamStabilize == 'no'){
            list.append('<li>' + $("label[for='upstreamStabilize']").text() + '</li>');
        }

        if(site.areaPretreatment == 'no'){
            list.append('<li>' + $("label[for='areaPretreatment']").text() + '</li>');
        }

        if(site.wetlandDivert == 'no'){
            list.append('<li>' + $("label[for='wetlandDivert']").text() + '</li>');
        }

        if(site.conversionSB == 'no'){
            list.append('<li>' + $("label[for='conversionSB']").text() + '</li>');
        }

        if(site.setbackBuilding == 'no'){
            list.append('<li>' + $("label[for='setbackBuilding']").text() + '</li>');
        }

        if(site.setbackSeptic == 'no'){
            list.append('<li>' + $("label[for='setbackSeptic']").text() + '</li>');
        }

        if(site.setbackWell == 'no'){
            list.append('<li>' + $("label[for='setbackWell']").text() + '</li>');
        }

        if(site.setbackUtility == 'no'){
            list.append('<li>' + $("label[for='setbackUtility']").text() + '</li>');
        }

        if(site.setbackPL == 'no'){
            list.append('<li>' + $("label[for='setbackPL']").text() + '</li>');
        }

        if(site.setbackWell == 'no'){
            list.append('<li>' + $("label[for='setbackWell']").text() + '</li>');
        }

        if(site.setbackBuilding == 'no'){
            list.append('<li>' + $("label[for='setbackBuilding']").text() + '</li>');
        }

        if(site.soilBoring == 'no'){
            list.append('<li>' + $("label[for='soilBoring']").text() + '</li>');
        }

        if(site.pretreatmentFirst == 'no'){
            list.append('<li>' + $("label[for='pretreatmentFirst']").text() + '</li>');
        }

        if(site.slopeCDA == 'no'){
            list.append('<li>' + $("label[for='slopeCDA']").text() + '</li>');
        }

        if(site.floodplain == 'no'){
            list.append('<li>' + $("label[for='floodplain']").text() + '</li>');
        }
        if(site.outsideWetland == 'no'){
            list.append('<li>' + $("label[for='outsideWetland']").text() + '</li>');
        }
        if(site.goose == 'no'){
            list.append('<li>' + $("label[for='goose']").text() + '</li>');
        }
        if(site.slopeLongitudinal == 'no'){
            list.append('<li>' + $("label[for='slopeLongitudinal']").text() + '</li>');
        }
        if(site.dropWetland == 'no'){
            list.append('<li>' + $("label[for='dropWetland']").text() + '</li>');
        }
        if(site.maxDepthWetland == 'no'){
            list.append('<li>' + $("label[for='maxDepthWetland']").text() + '</li>');
        }
        if(site.tv1ftWetland == 'no'){
            list.append('<li>' + $("label[for='tv1ftWetland']").text() + '</li>');
        }
        if(site.slopeSide == 'no'){
            list.append('<li>' + $("label[for='slopeSide']").text() + '</li>');
        }
        if(site.max5ftNWSE == 'no'){
            list.append('<li>' + $("label[for='max5ftNWSE']").text() + '</li>');
        }
        if(site.calcTV == 'no'){
            list.append('<li>' + $("label[for='calcTV']").text() + '</li>');
        }
        if(site.routing == 'no'){
            list.append('<li>' + $("label[for='routing']").text() + '</li>');
        }
        if(site.tvStore == 'no'){
            list.append('<li>' + $("label[for='tvStore']").text() + '</li>');
        }
        if(site.topWidthDam == 'no'){
            list.append('<li>' + $("label[for='topWidthDam']").text() + '</li>');
        }
        if(site.elevationLabel == 'no'){
            list.append('<li>' + $("label[for='elevationLabel']").text() + '</li>');
        }
        if(site.volumeLabel == 'no'){
            list.append('<li>' + $("label[for='volumeLabel']").text() + '</li>');
        }
        if(site.halfEDVolume == 'no'){
            list.append('<li>' + $("label[for='halfEDVolume']").text() + '</li>');
        }
        if(site.routing == 'no'){
            list.append('<li>' + $("label[for='routing']").text() + '</li>');
        }
        if(site.calcOverflow == 'no'){
            list.append('<li>' + $("label[for='calcOverflow']").text() + '</li>');
        }
        if(site.waterBalance == 'no'){
            list.append('<li>' + $("label[for='waterBalance']").text() + '</li>');
        }
        if(site.nonerosive == 'no'){
            list.append('<li>' + $("label[for='nonerosive']").text() + '</li>');
        }
        if(site.schedule == 'no'){
            list.append('<li>' + $("label[for='schedule']").text() + '</li>');
        }
        if(site.pondingPlant == 'no'){
            list.append('<li>' + $("label[for='pondingPlant']").text() + '</li>');
        }
        if(site.plantArea == 'no'){
            list.append('<li>' + $("label[for='plantArea']").text() + '</li>');
        }
        if(site.turfCoverLevel1 == 'no'){
            list.append('<li>' + $("label[for='turfCoverLevel1']").text() + '</li>');
        }
        if(site.turfCoverTree == 'no'){
            list.append('<li>' + $("label[for='turfCoverTree']").text() + '</li>');
        }
        if(site.noIrrigation == 'no'){
            list.append('<li>' + $("label[for='noIrrigation']").text() + '</li>');
        }
        if(site.plantBench == 'no'){
            list.append('<li>' + $("label[for='plantBench']").text() + '</li>');
        }
        if(site.nativePlant == 'no'){
            list.append('<li>' + $("label[for='nativePlant']").text() + '</li>');
        }
        if(site.woodyVeg == 'no'){
            list.append('<li>' + $("label[for='woodyVeg']").text() + '</li>');
        }
        
    });
           
    $("#btnClear").click(function() {
        $("#generatedComments").empty();
    });

            
});
