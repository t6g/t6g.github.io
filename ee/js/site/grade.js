jQuery(document).ready(function(){
    const defaultGrading = {
        contour: "na",
        daMap: "na",
        riprapChannel: "na",
        fpsChannel: "na",
        roofWater: "na",
        endWall: "na",
        benchmark: "na",
        fp100: "na",
        floodproof: "na",
        calculations: "na",
        hgl: "na",
        profileDrainage: "na",
        structureNumber: "na",
        invert: "na",
        lengthThroat: "na",
        inletShaping: "na",
        precastTee: "na",
        detailIS1: "na",
        detailInlet: "na",
        st1: "na",
        sl1: "na",
        bootConnector: "na",
        paveDitch: "na",
        pipeDitch: "na",
        topCurb: "na",
        dryGutter: "na",
        symbolDryGutter: "na",
        backslope: "na",
        ffElevation: "na",
        drainageEasement: "na",
        dbpg: "na",
        onsiteDE: "na",
        easementSheet: "na",
        roadName: "na",
        phase: "na",
        mc3A: "na",
        stipple: "na",
        xsectionPave: "na",
        radiusCurb: "na",
        carwash: "na",
        oilSpill: "na",
        fullPump: "na",
        pool2SanitarySewer: "na",
        privateUtility: "na"
    };
    
    var site = {};
    
    $("#mynav").load("nav.html");

    let tmp = localStorage.getItem('Site'); 
    if (tmp) {
        Object.assign(site, JSON.parse(tmp));
    } else {
        Object.assign(site, defaultGrading);
    }
    
    setUI();

    $('input[type=radio]').change(function(e){
        switch(e.target.name){
            case 'contour': site.contour = this.value; break;
            case 'daMap': site.daMap = this.value; break;
            case 'riprapChannel': site.riprapChannel = this.value; break;
            case 'fpsChannel': site.fpsChannel = this.value; break;
            case 'roofWater': site.roofWater = this.value; break;
            case 'endWall': site.endWall = this.value; break;
            case 'benchmark': site.benchmark = this.value; break;
            case 'fp100': site.fp100 = this.value; break;
            case 'floodproof': site.floodproof = this.value; break;
            case 'calculations': site.calculations = this.value; break;
            case 'hgl': site.hgl = this.value; break;
            case 'profileDrainage': site.profileDrainage = this.value; break;
            case 'structureNumber': site.structureNumber = this.value; break;
            case 'invert': site.invert = this.value; break;
            case 'lengthThroat': site.lengthThroat = this.value; break;
            case 'inletShaping': site.inletShaping = this.value; break;
            case 'precastTee': site.precastTee = this.value; break;
            case 'detailIS1': site.detailIS1 = this.value; break;
            case 'detailInlet': site.detailInlet = this.value; break;
            case 'st1': site.st1 = this.value; break;
            case 'sl1': site.sl1 = this.value; break;
            case 'bootConnector': site.bootConnector = this.value; break;
            case 'paveDitch': site.paveDitch = this.value; break;
            case 'pipeDitch': site.pipeDitch = this.value; break;
            case 'topCurb': site.topCurb = this.value; break;
            case 'dryGutter': site.dryGutter = this.value; break;
            case 'symbolDryGutter': site.symbolDryGutter = this.value; break;
            case 'backslope': site.backslope = this.value; break;
            case 'ffElevation': site.ffElevation = this.value; break;
            case 'drainageEasement': site.drainageEasement = this.value; break;
            case 'dbpg': site.dbpg = this.value; break;
            case 'onsiteDE': site.onsiteDE = this.value; break;
            case 'easementSheet': site.easementSheet = this.value; break;
            case 'roadName': site.roadName = this.value; break;
            case 'phase': site.phase = this.value; break;
            case 'mc3A': site.mc3A = this.value; break;
            case 'stipple': site.stipple = this.value; break;
            case 'xsectionPave': site.xsectionPave = this.value; break;
            case 'radiusCurb': site.radiusCurb = this.value; break;
            case 'carwash': site.carwash = this.value; break;
            case 'oilSpill': site.oilSpill = this.value; break;
            case 'fullPump': site.fullPump = this.value; break;
            case 'pool2SanitarySewer': site.pool2SanitarySewer = this.value; break;
            case 'privateUtility': site.privateUtility = this.value; break;
        };
    });
    
    function setUI(){
        switch(site.contour){
            case "yes": 
                $("#contourYes").prop('checked', true);
                break;
            case "no": 
                $("#contourNo").prop('checked', true);
                break;
            case "na": 
                $("#contourNA").prop('checked', true);
                break;
        };
        
        switch(site.daMap){
            case "yes": 
                $("#daMapYes").prop('checked', true);
                break;
            case "no": 
                $("#daMapNo").prop('checked', true);
                break;
            case "na": 
                $("#daMapNA").prop('checked', true);
                break;
        };
        
        switch(site.riprapChannel){
            case "yes": 
                $("#riprapChannelYes").prop('checked', true);
                break;
            case "no": 
                $("#riprapChannelNo").prop('checked', true);
                break;
            case "na": 
                $("#riprapChannelNA").prop('checked', true);
                break;
        };
        
        switch(site.fpsChannel){
            case "yes": 
                $("#fpsChannelYes").prop('checked', true);
                break;
            case "no": 
                $("#fpsChannelNo").prop('checked', true);
                break;
            case "na": 
                $("#fpsChannelNA").prop('checked', true);
                break;
        };
        

        switch(site.roofWater){
            case "yes": 
                $("#roofWaterYes").prop('checked', true);
                break;
            case "no": 
                $("#roofWaterNo").prop('checked', true);
                break;
            case "na": 
                $("#roofWaterNA").prop('checked', true);
                break;
        };
        
       switch(site.endWall){
            case "yes": 
                $("#endWallYes").prop('checked', true);
                break;
            case "no": 
                $("#endWallNo").prop('checked', true);
                break;
            case "na": 
                $("#endWallNA").prop('checked', true);
                break;
        };
        
       switch(site.benchmark){
            case "yes": 
                $("#benchmarkYes").prop('checked', true);
                break;
            case "no": 
                $("#benchmarkNo").prop('checked', true);
                break;
            case "na": 
                $("#benchmarkNA").prop('checked', true);
                break;
        };
        
       switch(site.fp100){
            case "yes": 
                $("#fp100Yes").prop('checked', true);
                break;
            case "no": 
                $("#fp100No").prop('checked', true);
                break;
            case "na": 
                $("#fp100NA").prop('checked', true);
                break;
        };
        
        
        
       switch(site.mff){
            case "yes": 
                $("#mffYes").prop('checked', true);
                break;
            case "no": 
                $("#mffNo").prop('checked', true);
                break;
            case "na": 
                $("#mffNA").prop('checked', true);
                break;
        };
        
        switch(site.floodproof){
            case "yes": 
                $("#floodproofYes").prop('checked', true);
                break;
            case "no": 
                $("#floodproofNo").prop('checked', true);
                break;
            case "na": 
                $("#floodproofNA").prop('checked', true);
                break;
        };
        
        switch(site.calculations){
            case "yes": 
                $("#calculationsYes").prop('checked', true);
                break;
            case "no": 
                $("#calculationsNo").prop('checked', true);
                break;
            case "na": 
                $("#calculationsNA").prop('checked', true);
                break;
        };

        switch(site.hgl){
            case "yes": 
                $("#hglYes").prop('checked', true);
                break;
            case "no": 
                $("#hglNo").prop('checked', true);
                break;
            case "na": 
                $("#hglNA").prop('checked', true);
                break;
        };

        switch(site.profileDrainage){
            case "yes": 
                $("#profileDrainageYes").prop('checked', true);
                break;
            case "no": 
                $("#profileDrainageNo").prop('checked', true);
                break;
            case "na": 
                $("#profileDrainageNA").prop('checked', true);
                break;
        };
        
        switch(site.structureNumber){
            case "yes": 
                $("#structureNumberYes").prop('checked', true);
                break;
            case "no": 
                $("#structureNumberNo").prop('checked', true);
                break;
            case "na": 
                $("#structureNumberNA").prop('checked', true);
                break;
        };
        
        switch(site.invert){
            case "yes": 
                $("#invertYes").prop('checked', true);
                break;
            case "no": 
                $("#invertNo").prop('checked', true);
                break;
            case "na": 
                $("#invertNA").prop('checked', true);
                break;
        };
        
        switch(site.lengthThroat){
            case "yes": 
                $("#lengthThroatYes").prop('checked', true);
                break;
            case "no": 
                $("#lengthThroatNo").prop('checked', true);
                break;
            case "na": 
                $("#lengthThroatNA").prop('checked', true);
                break;
        };
        
        switch(site.inletShaping){
            case "yes": 
                $("#inletShapingYes").prop('checked', true);
                break;
            case "no": 
                $("#inletShapingNo").prop('checked', true);
                break;
            case "na": 
                $("#inletShapingNA").prop('checked', true);
                break;
        };
        
        switch(site.precastTee){
            case "yes": 
                $("#precastTeeYes").prop('checked', true);
                break;
            case "no": 
                $("#precastTeeNo").prop('checked', true);
                break;
            case "na": 
                $("#precastTeeNA").prop('checked', true);
                break;
        };

        switch(site.detailIS1){
            case "yes": 
                $("#detailIS1Yes").prop('checked', true);
                break;
            case "no": 
                $("#detailIS1No").prop('checked', true);
                break;
            case "na": 
                $("#detailIS1NA").prop('checked', true);
                break;
        };

        switch(site.detailInlet){
            case "yes": 
                $("#detailInletYes").prop('checked', true);
                break;
            case "no": 
                $("#detailInletNo").prop('checked', true);
                break;
            case "na": 
                $("#detailInletNA").prop('checked', true);
                break;
        };
        
        switch(site.st1){
            case "yes": 
                $("#st1Yes").prop('checked', true);
                break;
            case "no": 
                $("#st1No").prop('checked', true);
                break;
            case "na": 
                $("#st1NA").prop('checked', true);
                break;
        };
        
        switch(site.sl1){
            case "yes": 
                $("#sl1Yes").prop('checked', true);
                break;
            case "no": 
                $("#sl1No").prop('checked', true);
                break;
            case "na": 
                $("#sl1NA").prop('checked', true);
                break;
        };
        
        
        switch(site.bootConnector){
            case "yes": 
                $("#bootConnectorYes").prop('checked', true);
                break;
            case "no": 
                $("#bootConnectorNo").prop('checked', true);
                break;
            case "na": 
                $("#bootConnectorNA").prop('checked', true);
                break;
        };
        
        switch(site.paveDitch){
            case "yes": 
                $("#paveDitchYes").prop('checked', true);
                break;
            case "no": 
                $("#paveDitchNo").prop('checked', true);
                break;
            case "na": 
                $("#paveDitchNA").prop('checked', true);
                break;
        };
        
        switch(site.pipeDitch){
            case "yes": 
                $("#pipeDitchYes").prop('checked', true);
                break;
            case "no": 
                $("#pipeDitchNo").prop('checked', true);
                break;
            case "na": 
                $("#pipeDitchNA").prop('checked', true);
                break;
        };

        switch(site.topCurb){
            case "yes": 
                $("#topCurbYes").prop('checked', true);
                break;
            case "no": 
                $("#topCurbNo").prop('checked', true);
                break;
            case "na": 
                $("#topCurbNA").prop('checked', true);
                break;
        };

        switch(site.dryGutter){
            case "yes": 
                $("#dryGutterYes").prop('checked', true);
                break;
            case "no": 
                $("#dryGutterNo").prop('checked', true);
                break;
            case "na": 
                $("#dryGutterNA").prop('checked', true);
                break;
        };
        
        switch(site.symbolDryGutter){
            case "yes": 
                $("#symbolDryGutterYes").prop('checked', true);
                break;
            case "no": 
                $("#symbolDryGutterNo").prop('checked', true);
                break;
            case "na": 
                $("#symbolDryGutterNA").prop('checked', true);
                break;
        };
        
        switch(site.backslope){
            case "yes": 
                $("#backslopeYes").prop('checked', true);
                break;
            case "no": 
                $("#backslopeNo").prop('checked', true);
                break;
            case "na": 
                $("#backslopeNA").prop('checked', true);
                break;
        };

        switch(site.ffElevation){
            case "yes": 
                $("#ffElevationYes").prop('checked', true);
                break;
            case "no": 
                $("#ffElevationNo").prop('checked', true);
                break;
            case "na": 
                $("#ffElevationNA").prop('checked', true);
                break;
        };

        switch(site.drainageEasement){
            case "yes": 
                $("#drainageEasementYes").prop('checked', true);
                break;
            case "no": 
                $("#drainageEasementNo").prop('checked', true);
                break;
            case "na": 
                $("#drainageEasementNA").prop('checked', true);
                break;
        };

        switch(site.dbpg){
            case "yes": 
                $("#dbpgYes").prop('checked', true);
                break;
            case "no": 
                $("#dbpgNo").prop('checked', true);
                break;
            case "na": 
                $("#dbpgNA").prop('checked', true);
                break;
        };
        
        switch(site.onsiteDE){
            case "yes": 
                $("#onsiteDEYes").prop('checked', true);
                break;
            case "no": 
                $("#onsiteDENo").prop('checked', true);
                break;
            case "na": 
                $("#onsiteDENA").prop('checked', true);
                break;
        };

        switch(site.easementSheet){
            case "yes": 
                $("#easementSheetYes").prop('checked', true);
                break;
            case "no": 
                $("#easementSheetNo").prop('checked', true);
                break;
            case "na": 
                $("#easementSheetNA").prop('checked', true);
                break;
        };

        switch(site.roadName){
            case "yes": 
                $("#roadNameYes").prop('checked', true);
                break;
            case "no": 
                $("#roadNameNo").prop('checked', true);
                break;
            case "na": 
                $("#roadNameNA").prop('checked', true);
                break;
        };

        switch(site.phase){
            case "yes": 
                $("#phaseYes").prop('checked', true);
                break;
            case "no": 
                $("#phaseNo").prop('checked', true);
                break;
            case "na": 
                $("#phaseNA").prop('checked', true);
                break;
        };

        switch(site.mc3A){
            case "yes": 
                $("#mc3AYes").prop('checked', true);
                break;
            case "no": 
                $("#mc3ANo").prop('checked', true);
                break;
            case "na": 
                $("#mc3ANA").prop('checked', true);
                break;
        };

        switch(site.stipple){
            case "yes": 
                $("#stippleYes").prop('checked', true);
                break;
            case "no": 
                $("#stippleNo").prop('checked', true);
                break;
            case "na": 
                $("#stippleNA").prop('checked', true);
                break;
        };

        switch(site.xsectionPave){
            case "yes": 
                $("#xsectionPaveYes").prop('checked', true);
                break;
            case "no": 
                $("#xsectionPaveNo").prop('checked', true);
                break;
            case "na": 
                $("#xsectionPaveNA").prop('checked', true);
                break;
        };

        switch(site.radiusCurb){
            case "yes": 
                $("#radiusCurbYes").prop('checked', true);
                break;
            case "no": 
                $("#radiusCurbNo").prop('checked', true);
                break;
            case "na": 
                $("#radiusCurbNA").prop('checked', true);
                break;
        };

        switch(site.carwash){
            case "yes": 
                $("#carwashYes").prop('checked', true);
                break;
            case "no": 
                $("#carwashNo").prop('checked', true);
                break;
            case "na": 
                $("#carwashNA").prop('checked', true);
                break;
        };

        switch(site.oilSpill){
            case "yes": 
                $("#oilSpillYes").prop('checked', true);
                break;
            case "no": 
                $("#oilSpillNo").prop('checked', true);
                break;
            case "na": 
                $("#oilSpillNA").prop('checked', true);
                break;
        };

        switch(site.fullPump){
            case "yes": 
                $("#fullPumpYes").prop('checked', true);
                break;
            case "no": 
                $("#fullPumpNo").prop('checked', true);
                break;
            case "na": 
                $("#fullPumpNA").prop('checked', true);
                break;
        };

        switch(site.pool2SanitarySewer){
            case "yes": 
                $("#pool2SanitarySewerYes").prop('checked', true);
                break;
            case "no": 
                $("#pool2SanitarySewerNo").prop('checked', true);
                break;
            case "na": 
                $("#pool2SanitarySewerNA").prop('checked', true);
                break;
        };

        switch(site.privateUtility){
            case "yes": 
                $("#privateUtilityYes").prop('checked', true);
                break;
            case "no": 
                $("#privateUtilityNo").prop('checked', true);
                break;
            case "na": 
                $("#privateUtilityNA").prop('checked', true);
                break;
        };

    };
    
});
