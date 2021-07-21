jQuery(document).ready(function(){
    $("#mynav").load("nav.html");

    const defaultBioret = {
        tv1: "na",
        surfaceArea1: "na",
        minDepth1: "na",
        underdrain1: "na",
        flowPath1: "na",
        oneCell: "na",
        pretreatment1: "na",
        tv2: "na",
        surfaceArea2: "na",
        minDepth2: "na",
        underdrain2: "na",
        flowPath2: "na",
        twoCell: "na",
        pretreatment2: "na",
        outsideFill: "na",
        slopePercent: "na",
        slope0Lateral: "na",
        offline: "na",
        overflow: "na",
        bypass: "na",
        maxDA: "na",
        pondingDepth: "na",
        pretreatmentCell: "na",
        filterStrip: "na",
        diaphragm: "na",
        spreader: "na",
        materialSpec: "na",
        constructionNarrative: "na",
        upstreamStabilize: "na",
        areaPretreatment: "na",
        outsideLOD: "na",
        trap: "na",
        setbackBuilding: "na",
        setbackSeptic: "na",
        setbackWell: "na",
        setbackUtility: "na",
        waterTable: "na",
        soilBoring: "na",
        pretreatmentFirst: "na",
        wellObsPlan: "na",
        mediaSupply: "na",
        slopeCDA: "na",
        floodplain: "na",
        depthAggregate: "na",
        underdrainSlope: "na",
        coverTrench: "na",
        slopeLateral: "na",
        filterFabric: "na",
        chokerStone: "na",
        stoneSump: "na",
        slopeSide: "na",
        filterBed: "na",
        mulch: "na",
        wellObsProfile: "na",
        stoneStorage: "na",
        topWidthDam: "na",
        elevationLabel: "na",
        volumeLabel: "na",
        calcSA: "na",
        routing: "na",
        calcOverflow: "na",
        infiltrationRate: "na",
        nonerosive: "na",
        shortCircuit: "na", 
        plantCoverage: "na", 
        plantPonding: "na", 
        noIrrigation: "na",
        plantArea: "na",
        nativePlant: "na",
        plantSequence: "na"
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
            case 'surfaceArea1': site.surfaceArea1 = this.value; break;
            case 'minDepth1': site.minDepth1 = this.value; break;
            case 'underdrain1': site.underdrain1 = this.value; break;
            case 'flowPath1': site.flowPath1 = this.value; break;
            case 'oneCell': site.oneCell = this.value; break;
            case 'pretreatment1': site.pretreatment1 = this.value; break;
            case 'tv2': site.tv2 = this.value; break;
            case 'surfaceArea2': site.surfaceArea2 = this.value; break;
            case 'minDepth2': site.minDepth2 = this.value; break;
            case 'underdrain2': site.underdrain2 = this.value; break;
            case 'flowPath2': site.flowPath2 = this.value; break;
            case 'twoCell': site.twoCell = this.value; break;
            case 'pretreatment2': site.pretreatment2 = this.value; break;
            case 'outsideFill': site.outsideFill = this.value; break;
            case 'slopePercent': site.slopePercent = this.value; break;
            case 'slope0Lateral': site.slope0Lateral = this.value; break;
            case 'offline': site.offline = this.value; break;
            case 'overflow': site.overflow = this.value; break;
            case 'bypass': site.bypass = this.value; break;
            case 'maxDA': site.maxDA = this.value; break;
            case 'pondingDepth': site.pondingDepth = this.value; break;
            case 'pretreatmentCell': site.pretreatmentCell = this.value; break;
            case 'filterStrip': site.filterStrip = this.value; break;
            case 'diaphragm': site.diaphragm = this.value; break;
            case 'spreader': site.spreader = this.value; break;
            case 'materialSpec': site.materialSpec = this.value; break;
            case 'constructionNarrative': site.constructionNarrative = this.value; break;
            case 'upstreamStabilize': site.upstreamStabilize = this.value; break;
            case 'areaPretreatment': site.areaPretreatment = this.value; break;
            case 'outsideLOD': site.outsideLOD = this.value; break;
            case 'trap': site.trap = this.value; break;
            case 'setbackBuilding': site.setbackBuilding = this.value; break;
            case 'setbackSeptic': site.setbackSeptic = this.value; break;
            case 'setbackWell': site.setbackWell = this.value; break;
            case 'setbackUtility': site.setbackUtility = this.value; break;
            case 'waterTable': site.waterTable = this.value; break;
            case 'soilBoring': site.soilBoring = this.value; break;
            case 'pretreatmentFirst': site.pretreatmentFirst = this.value; break;
            case 'wellObsPlan': site.wellObsPlan = this.value; break;
            case 'mediaSupply': site.mediaSupply = this.value; break;
            case 'slopeCDA': site.slopeCDA = this.value; break;
            case 'floodplain': site.floodplain = this.value; break;
            case 'depthAggregate': site.depthAggregate = this.value; break;
            case 'underdrainSlope': site.underdrainSlope = this.value; break;
            case 'coverTrench': site.coverTrench = this.value; break;
            case 'slopeLateral': site.slopeLateral = this.value; break;
            case 'filterFabric': site.filterFabric = this.value; break;
            case 'chokerStone': site.chokerStone = this.value; break;
            case 'stoneSump': site.stoneSump = this.value; break;
            case 'slopeSide': site.slopeSide = this.value; break;
            case 'filterBed': site.filterBed = this.value; break;
            case 'mulch': site.mulch = this.value; break;
            case 'wellObsProfile': site.wellObsProfile = this.value; break;
            case 'stoneStorage': site.stoneStorage = this.value; break;
            case 'topWidthDam': site.topWidthDam = this.value; break;
            case 'elevationLabel': site.elevationLabel = this.value; break;
            case 'volumeLabel': site.volumeLabel = this.value; break;
            case 'calcSA': site.calcSA = this.value; break;
            case 'routing': site.routing = this.value; break;
            case 'calcOverflow': site.calcOverflow = this.value; break;
            case 'infiltrationRate': site.infiltrationRate = this.value; break;
            case 'nonerosive': site.nonerosive = this.value; break;
            case 'shortCircuit': site.shortCircuit = this.value; break; 
            case 'plantCoverage': site.plantCoverage = this.value; break;
            case 'plantPonding': site.plantPonding = this.value; break;
            case 'noIrrigation': site.noIrrigation = this.value; break;
            case 'plantArea': site.plantArea = this.value; break;
            case 'nativePlant': site.nativePlant = this.value; break;
            case 'plantSequence': site.plantSequence = this.value; break;
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
        
        switch(site.surfaceArea1){
            case "yes": 
                $("#surfaceArea1Yes").prop('checked', true);
                break;
            case "no": 
                $("#surfaceArea1No").prop('checked', true);
                break;
            case "na": 
                $("#surfaceArea1NA").prop('checked', true);
                break;
        };
        
        switch(site.minDepth1){
            case "yes": 
                $("#minDepth1Yes").prop('checked', true);
                break;
            case "no": 
                $("#minDepth1No").prop('checked', true);
                break;
            case "na": 
                $("#minDepth1NA").prop('checked', true);
                break;
        };
        
        switch(site.underdrain1){
            case "yes": 
                $("#underdrain1Yes").prop('checked', true);
                break;
            case "no": 
                $("#underdrain1No").prop('checked', true);
                break;
            case "na": 
                $("#underdrain1NA").prop('checked', true);
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
        
       switch(site.oneCell){
            case "yes": 
                $("#oneCellYes").prop('checked', true);
                break;
            case "no": 
                $("#oneCellNo").prop('checked', true);
                break;
            case "na": 
                $("#oneCellNA").prop('checked', true);
                break;
        };
        
       switch(site.pretreatment1){
            case "yes": 
                $("#pretreatment1Yes").prop('checked', true);
                break;
            case "no": 
                $("#pretreatment1No").prop('checked', true);
                break;
            case "na": 
                $("#pretreatment1NA").prop('checked', true);
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
        
       switch(site.surfaceArea2){
            case "yes": 
                $("#surfaceArea2Yes").prop('checked', true);
                break;
            case "no": 
                $("#surfaceArea2No").prop('checked', true);
                break;
            case "na": 
                $("#surfaceArea2NA").prop('checked', true);
                break;
        };
        
        switch(site.minDepth2){
            case "yes": 
                $("#minDepth2Yes").prop('checked', true);
                break;
            case "no": 
                $("#minDepth2No").prop('checked', true);
                break;
            case "na": 
                $("#minDepth2NA").prop('checked', true);
                break;
        };
        
        switch(site.underdrain2){
            case "yes": 
                $("#underdrain2Yes").prop('checked', true);
                break;
            case "no": 
                $("#underdrain2No").prop('checked', true);
                break;
            case "na": 
                $("#underdrain2NA").prop('checked', true);
                break;
        };

        switch(site.flowPath2){
            case "yes": 
                $("#flowPath2Yes").prop('checked', true);
                break;
            case "no": 
                $("#flowPath2No").prop('checked', true);
                break;
            case "na": 
                $("#flowPath2NA").prop('checked', true);
                break;
        };

        switch(site.twoCell){
            case "yes": 
                $("#twoCellYes").prop('checked', true);
                break;
            case "no": 
                $("#twoCellNo").prop('checked', true);
                break;
            case "na": 
                $("#twoCellNA").prop('checked', true);
                break;
        };
        
        switch(site.pretreatment2){
            case "yes": 
                $("#pretreatment2Yes").prop('checked', true);
                break;
            case "no": 
                $("#pretreatment2No").prop('checked', true);
                break;
            case "na": 
                $("#pretreatment2NA").prop('checked', true);
                break;
        };
        
        switch(site.outsideFill){
            case "yes": 
                $("#outsideFillYes").prop('checked', true);
                break;
            case "no": 
                $("#outsideFillNo").prop('checked', true);
                break;
            case "na": 
                $("#outsideFillNA").prop('checked', true);
                break;
        };
        
        switch(site.slopePercent){
            case "yes": 
                $("#slopePercentYes").prop('checked', true);
                break;
            case "no": 
                $("#slopePercentNo").prop('checked', true);
                break;
            case "na": 
                $("#slopePercentNA").prop('checked', true);
                break;
        };
        
        switch(site.slope0Lateral){
            case "yes": 
                $("#slope0LateralYes").prop('checked', true);
                break;
            case "no": 
                $("#slope0LateralNo").prop('checked', true);
                break;
            case "na": 
                $("#slope0LateralNA").prop('checked', true);
                break;
        };
        
        switch(site.offline){
            case "yes": 
                $("#offlineYes").prop('checked', true);
                break;
            case "no": 
                $("#offlineNo").prop('checked', true);
                break;
            case "na": 
                $("#offlineNA").prop('checked', true);
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

        switch(site.bypass){
            case "yes": 
                $("#bypassYes").prop('checked', true);
                break;
            case "no": 
                $("#bypassNo").prop('checked', true);
                break;
            case "na": 
                $("#bypassNA").prop('checked', true);
                break;
        };
        
        switch(site.maxDA){
            case "yes": 
                $("#maxDAYes").prop('checked', true);
                break;
            case "no": 
                $("#maxDANo").prop('checked', true);
                break;
            case "na": 
                $("#maxDANA").prop('checked', true);
                break;
        };
        
        
        switch(site.pondingDepth){
            case "yes": 
                $("#pondingDepthYes").prop('checked', true);
                break;
            case "no": 
                $("#pondingDepthNo").prop('checked', true);
                break;
            case "na": 
                $("#pondingDepthNA").prop('checked', true);
                break;
        };
        
        switch(site.pretreatmentCell){
            case "yes": 
                $("#pretreatmentCellYes").prop('checked', true);
                break;
            case "no": 
                $("#pretreatmentCellNo").prop('checked', true);
                break;
            case "na": 
                $("#pretreatmentCellNA").prop('checked', true);
                break;
        };
        
        switch(site.filterStrip){
            case "yes": 
                $("#filterStripYes").prop('checked', true);
                break;
            case "no": 
                $("#filterStripNo").prop('checked', true);
                break;
            case "na": 
                $("#filterStripNA").prop('checked', true);
                break;
        };

        switch(site.diaphragm){
            case "yes": 
                $("#diaphragmYes").prop('checked', true);
                break;
            case "no": 
                $("#diaphragmNo").prop('checked', true);
                break;
            case "na": 
                $("#diaphragmNA").prop('checked', true);
                break;
        };

        switch(site.spreader){
            case "yes": 
                $("#spreaderYes").prop('checked', true);
                break;
            case "no": 
                $("#spreaderNo").prop('checked', true);
                break;
            case "na": 
                $("#spreaderNA").prop('checked', true);
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

        switch(site.outsideLOD){
            case "yes": 
                $("#outsideLODYes").prop('checked', true);
                break;
            case "no": 
                $("#outsideLODNo").prop('checked', true);
                break;
            case "na": 
                $("#outsideLODNA").prop('checked', true);
                break;
        };
        
        switch(site.trap){
            case "yes": 
                $("#trapYes").prop('checked', true);
                break;
            case "no": 
                $("#trapNo").prop('checked', true);
                break;
            case "na": 
                $("#trapNA").prop('checked', true);
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

        switch(site.waterTable){
            case "yes": 
                $("#waterTableYes").prop('checked', true);
                break;
            case "no": 
                $("#waterTableNo").prop('checked', true);
                break;
            case "na": 
                $("#waterTableNA").prop('checked', true);
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

        switch(site.wellObsPlan){
            case "yes": 
                $("#wellObsPlanYes").prop('checked', true);
                break;
            case "no": 
                $("#wellObsPlanNo").prop('checked', true);
                break;
            case "na": 
                $("#wellObsPlanNA").prop('checked', true);
                break;
        };

        switch(site.mediaSupply){
            case "yes": 
                $("#mediaSupplyYes").prop('checked', true);
                break;
            case "no": 
                $("#mediaSupplyNo").prop('checked', true);
                break;
            case "na": 
                $("#mediaSupplyNA").prop('checked', true);
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

        switch(site.depthAggregate){
            case "yes": 
                $("#depthAggregateYes").prop('checked', true);
                break;
            case "no": 
                $("#depthAggregateNo").prop('checked', true);
                break;
            case "na": 
                $("#depthAggregateNA").prop('checked', true);
                break;
        };

        switch (site.underdrainSlope) {
            case "yes":
                $("#underdrainSlopeYes").prop('checked', true);
                break;
            case "no":
                $("#underdrainSlopeNo").prop('checked', true);
                break;
            case "na":
                $("#underdrainSlopeNA").prop('checked', true);
                break;
        };
        switch (site.coverTrench) {
            case "yes":
                $("#coverTrenchYes").prop('checked', true);
                break;
            case "no":
                $("#coverTrenchNo").prop('checked', true);
                break;
            case "na":
                $("#coverTrenchNA").prop('checked', true);
                break;
        };
        switch (site.slopeLateral) {
            case "yes":
                $("#slopeLateralYes").prop('checked', true);
                break;
            case "no":
                $("#slopeLateralNo").prop('checked', true);
                break;
            case "na":
                $("#slopeLateralNA").prop('checked', true);
                break;
        };
        switch (site.filterFabric) {
            case "yes":
                $("#filterFabricYes").prop('checked', true);
                break;
            case "no":
                $("#filterFabricNo").prop('checked', true);
                break;
            case "na":
                $("#filterFabricNA").prop('checked', true);
                break;
        };
        switch (site.chokerStone) {
            case "yes":
                $("#chokerStoneYes").prop('checked', true);
                break;
            case "no":
                $("#chokerStoneNo").prop('checked', true);
                break;
            case "na":
                $("#chokerStoneNA").prop('checked', true);
                break;
        };

        switch (site.stoneSump) {
            case "yes":
                $("#stoneSumpYes").prop('checked', true);
                break;
            case "no":
                $("#stoneSumpNo").prop('checked', true);
                break;
            case "na":
                $("#stoneSumpNA").prop('checked', true);
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
        switch (site.filterBed) {
            case "yes":
                $("#filterBedYes").prop('checked', true);
                break;
            case "no":
                $("#filterBedNo").prop('checked', true);
                break;
            case "na":
                $("#filterBedNA").prop('checked', true);
                break;
        };
        switch (site.mulch) {
            case "yes":
                $("#mulchYes").prop('checked', true);
                break;
            case "no":
                $("#mulchNo").prop('checked', true);
                break;
            case "na":
                $("#mulchNA").prop('checked', true);
                break;
        };
        switch (site.wellObsProfile) {
            case "yes":
                $("#wellObsProfileYes").prop('checked', true);
                break;
            case "no":
                $("#wellObsProfileNo").prop('checked', true);
                break;
            case "na":
                $("#wellObsProfileNA").prop('checked', true);
                break;
        };
        switch (site.stoneStorage) {
            case "yes":
                $("#stoneStorageYes").prop('checked', true);
                break;
            case "no":
                $("#stoneStorageNo").prop('checked', true);
                break;
            case "na":
                $("#stoneStorageNA").prop('checked', true);
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

        switch (site.calcSA) {
            case "yes":
                $("#calcSAYes").prop('checked', true);
                break;
            case "no":
                $("#calcSANo").prop('checked', true);
                break;
            case "na":
                $("#calcSANA").prop('checked', true);
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
        switch (site.infiltrationRate) {
            case "yes":
                $("#infiltrationRateYes").prop('checked', true);
                break;
            case "no":
                $("#infiltrationRateNo").prop('checked', true);
                break;
            case "na":
                $("#infiltrationRateNA").prop('checked', true);
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
        
        switch (site.shortCircuit) {
            case "yes":
                $("#shortCircuitYes").prop('checked', true);
                break;
            case "no":
                $("#shortCircuitNo").prop('checked', true);
                break;
            case "na":
                $("#shortCircuitNA").prop('checked', true);
                break;
        };
        
        switch (site.plantCoverage) {
            case "yes":
                $("#plantCoverageYes").prop('checked', true);
                break;
            case "no":
                $("#plantCoverageNo").prop('checked', true);
                break;
            case "na":
                $("#plantCoverageNA").prop('checked', true);
                break;
        };
        
        switch (site.plantPonding) {
            case "yes":
                $("#plantPondingYes").prop('checked', true);
                break;
            case "no":
                $("#plantPondingNo").prop('checked', true);
                break;
            case "na":
                $("#plantPondingNA").prop('checked', true);
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
        
        switch (site.plantSequence) {
            case "yes":
                $("#plantSequenceYes").prop('checked', true);
                break;
            case "no":
                $("#plantSequenceNo").prop('checked', true);
                break;
            case "na":
                $("#plantSequenceNA").prop('checked', true);
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

        if(site.surfaceArea1 == 'no'){
            list.append('<li>' + $("label[for='surfaceArea1']").text() + '</li>');
        }

        if(site.minDepth1 == 'no'){
            list.append('<li>' + $("label[for='minDepth1']").text() + '</li>');
        }

        if(site.underdrain1 == 'no'){
            list.append('<li>' + $("label[for='underdrain1']").text() + '</li>');
        }

        if(site.flowPath1 == 'no'){
            list.append('<li>' + $("label[for='flowPath1']").text() + '</li>');
        }

        if(site.oneCell == 'no'){
            list.append('<li>' + $("label[for='oneCell']").text() + '</li>');
        }

        if(site.benchmark == 'no'){
            list.append('<li>' + $("label[for='benchmark']").text() + '</li>');
        }

        if(site.pretreatment1 == 'no'){
            list.append('<li>' + $("label[for='pretreatment1']").text() + '</li>');
        }

        if(site.tv2 == 'no'){
            list.append('<li>' + $("label[for='tv2']").text() + '</li>');
        }

        if(site.surfaceArea2 == 'no'){
            list.append('<li>' + $("label[for='surfaceArea2']").text() + '</li>');
        }


        if(site.minDepth2 == 'no'){
            list.append('<li>' + $("label[for='minDepth2']").text() + '</li>');
        }

        if(site.underdrain2 == 'no'){
            list.append('<li>' + $("label[for='underdrain2']").text() + '</li>');
        }

        if(site.flowPath2 == 'no'){
            list.append('<li>' + $("label[for='flowPath2']").text() + '</li>');
        }

        if(site.twoCell == 'no'){
            list.append('<li>' + $("label[for='twoCell']").text() + '</li>');
        }

        if(site.pretreatment2 == 'no'){
            list.append('<li>' + $("label[for='pretreatment2']").text() + '</li>');
        }

        if(site.outsideFill == 'no'){
            list.append('<li>' + $("label[for='outsideFill']").text() + '</li>');
        }

        if(site.slopePercent == 'no'){
            list.append('<li>' + $("label[for='slopePercent']").text() + '</li>');
        }

        if(site.slope0Lateral == 'no'){
            list.append('<li>' + $("label[for='slope0Lateral']").text() + '</li>');
        }

        if(site.offline == 'no'){
            list.append('<li>' + $("label[for='offline']").text() + '</li>');
        }

        if(site.overflow == 'no'){
            list.append('<li>' + $("label[for='overflow']").text() + '</li>');
        }

        if(site.bypass == 'no'){
            list.append('<li>' + $("label[for='bypass']").text() + '</li>');
        }

        if(site.maxDA == 'no'){
            list.append('<li>' + $("label[for='maxDA']").text() + '</li>');
        }

        if(site.pondingDepth == 'no'){
            list.append('<li>' + $("label[for='pondingDepth']").text() + '</li>');
        }

        if(site.pretreatmentCell == 'no'){
            list.append('<li>' + $("label[for='pretreatmentCell']").text() + '</li>');
        }

        if(site.filterStrip == 'no'){
            list.append('<li>' + $("label[for='filterStrip']").text() + '</li>');
        }

        if(site.diaphragm == 'no'){
            list.append('<li>' + $("label[for='diaphragm']").text() + '</li>');
        }

        if(site.spreader == 'no'){
            list.append('<li>' + $("label[for='spreader']").text() + '</li>');
        }

        if(site.materialSpec == 'no'){
            list.append('<li>' + $("label[for='materialSpec']").text() + '</li>');
        }

        if(site.constructionNarrative == 'no'){
            list.append('<li>' + $("label[for='constructionNarrative']").text() + '</li>');
        }

        if(site.upstreamStabilize == 'no'){
            list.append('<li>' + $("label[for='upstreamStabilize']").text() + '</li>');
        }

        if(site.areaPretreatment == 'no'){
            list.append('<li>' + $("label[for='areaPretreatment']").text() + '</li>');
        }

        if(site.outsideLOD == 'no'){
            list.append('<li>' + $("label[for='outsideLOD']").text() + '</li>');
        }

        if(site.trap == 'no'){
            list.append('<li>' + $("label[for='trap']").text() + '</li>');
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

        if(site.waterTable == 'no'){
            list.append('<li>' + $("label[for='waterTable']").text() + '</li>');
        }

        if(site.soilBoring == 'no'){
            list.append('<li>' + $("label[for='soilBoring']").text() + '</li>');
        }

        if(site.pretreatmentFirst == 'no'){
            list.append('<li>' + $("label[for='pretreatmentFirst']").text() + '</li>');
        }

        if(site.wellObsPlan == 'no'){
            list.append('<li>' + $("label[for='wellObsPlan']").text() + '</li>');
        }

        if(site.mediaSupply == 'no'){
            list.append('<li>' + $("label[for='mediaSupply']").text() + '</li>');
        }

        if(site.slopeCDA == 'no'){
            list.append('<li>' + $("label[for='slopeCDA']").text() + '</li>');
        }

        if(site.floodplain == 'no'){
            list.append('<li>' + $("label[for='floodplain']").text() + '</li>');
        }
        if(site.depthAggregate == 'no'){
            list.append('<li>' + $("label[for='depthAggregate']").text() + '</li>');
        }
        if(site.underdrainSlope == 'no'){
            list.append('<li>' + $("label[for='underdrainSlope']").text() + '</li>');
        }
        if(site.coverTrench == 'no'){
            list.append('<li>' + $("label[for='coverTrench']").text() + '</li>');
        }
        if(site.slopeLateral == 'no'){
            list.append('<li>' + $("label[for='slopeLateral']").text() + '</li>');
        }
        if(site.filterFabric == 'no'){
            list.append('<li>' + $("label[for='filterFabric']").text() + '</li>');
        }
        if(site.chokerStone == 'no'){
            list.append('<li>' + $("label[for='chokerStone']").text() + '</li>');
        }
        if(site.stoneSump == 'no'){
            list.append('<li>' + $("label[for='stoneSump']").text() + '</li>');
        }
        if(site.slopeSide == 'no'){
            list.append('<li>' + $("label[for='slopeSide']").text() + '</li>');
        }
        if(site.filterBed == 'no'){
            list.append('<li>' + $("label[for='filterBed']").text() + '</li>');
        }
        if(site.mulch == 'no'){
            list.append('<li>' + $("label[for='mulch']").text() + '</li>');
        }
        if(site.wellObsProfile == 'no'){
            list.append('<li>' + $("label[for='wellObsProfile']").text() + '</li>');
        }
        if(site.stoneStorage == 'no'){
            list.append('<li>' + $("label[for='stoneStorage']").text() + '</li>');
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
        if(site.calcSA == 'no'){
            list.append('<li>' + $("label[for='calcSA']").text() + '</li>');
        }
        if(site.routing == 'no'){
            list.append('<li>' + $("label[for='routing']").text() + '</li>');
        }
        if(site.calcOverflow == 'no'){
            list.append('<li>' + $("label[for='calcOverflow']").text() + '</li>');
        }
        if(site.infiltrationRate == 'no'){
            list.append('<li>' + $("label[for='infiltrationRate']").text() + '</li>');
        }
        if(site.nonerosive == 'no'){
            list.append('<li>' + $("label[for='nonerosive']").text() + '</li>');
        }
        if(site.shortCircuit == 'no'){
            list.append('<li>' + $("label[for='shortCircuit']").text() + '</li>');
        }
        if(site.plantCoverage == 'no'){
            list.append('<li>' + $("label[for='plantCoverage']").text() + '</li>');
        }
        if(site.plantPonding == 'no'){
            list.append('<li>' + $("label[for='plantPonding']").text() + '</li>');
        }
        if(site.noIrrigation == 'no'){
            list.append('<li>' + $("label[for='noIrrigation']").text() + '</li>');
        }
        if(site.plantArea == 'no'){
            list.append('<li>' + $("label[for='plantArea']").text() + '</li>');
        }
        if(site.nativePlant == 'no'){
            list.append('<li>' + $("label[for='nativePlant']").text() + '</li>');
        }
        if(site.plantSequence == 'no'){
            list.append('<li>' + $("label[for='plantSequence']").text() + '</li>');
        }
        
    });
           
    $("#btnClear").click(function() {
        $("#generatedComments").empty();
    });

            
});
