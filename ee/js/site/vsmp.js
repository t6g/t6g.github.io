jQuery(document).ready(function(){
    const defaultVSMP = {
        noteVSMP: "na",
        rpad: "na",
        sheetVSMP: "na",
        tableCBPAMS4: "na",
        planBMP: "na",
        profileBMP: "na",
        manufacturedBMP: "na",
        rparmaLimit: "na",
        areaRMA: "na",
        imperviousCalculation: "na",
        bmpIncrementalDA: "na",
        bmpEasement: "na",
        sheet2bCompliance: "na",
        tableComplianceOutfall: "na",
        vrrmSpreadsheet: "na",
        ebOutfall: "na",
        landCover: "na",
        foEasement: "na",
        planBMP2b: "na",
        profileBMP2b: "na",
        manufacturedBMP2b: "na",
        bmpIncrementalDA2b: "na",
        bmpMapDA: "na",
        DAEB1010: "na",
        DA1Percent: "na",
        QPeak1Percent: "na",
        floodplain2b: "na",
        channelFloodCalculation: "na",
        bmpEasement2b: "na",
        preventCompaction: "na",
        deqSpecification: "na",
        default2c: "na",
        rpaLimit: "na",
        wetlandLetter: "na",
        rpaLineType: "na",
        rpaSheets: "na",
        rpaSign: "na",
        oosfRPA: "na",
        vehicularSafety: "na",
        rpaReestablish: "na",
        bmpInflow: "na",
        endwallSection: "na",
        swmEasement: "na",
        accessEasement: "na",
        meteboundBMP: "na",
        accessRamp: "na",
        safetyBenchorFence: "na",
        safetyBenchandFence: "na",
        vpys: "na",
        profileBMPDetail: "na",
        storageVolume: "na",
        damTopwidth: "na",
        wse: "na",
        shallowMarsh: "na",
        perforationRiser: "na",
        trashRackDetail: "na",
        freeboard: "na",
        emergencySpillway: "na",
        oringRCP: "na",
        trashRackAntiVortex: "na",
        clayCore: "na",
        gateValve: "na",
        lwRatio: "na",
        outletProtection: "na",
        lowFlow: "na", 
        bmpSideSlope: "na",
        bmp8ftDepth: "na",
        bmpConversion: "na",
        boringInfiltration: "na",
        observationInfiltration: "na",
        observeBMP: "na",
        bmpMaintenanceFee: "na",
        dcr: "na",
        damFailure: "na"
    };

    var site = {};
    
    $("#mynav").load("nav.html");

    let tmp = localStorage.getItem('Site'); 
    if (tmp) {
        Object.assign(site, JSON.parse(tmp));
    } else {
        Object.assign(site, defaultVSMP);
    }
    
    setUI();
    
    $('input[type=radio]').change(function(e){
        switch(e.target.name){
            case 'noteVSMP': site.noteVSMP = this.value; break;
            case 'rpad': site.rpad = this.value; break;
            case 'sheetVSMP': site.sheetVSMP = this.value; break;
            case 'tableCBPAMS4': site.tableCBPAMS4 = this.value; break;
            case 'planBMP': site.planBMP = this.value; break;
            case 'profileBMP': site.profileBMP = this.value; break;
            case 'manufacturedBMP': site.manufacturedBMP = this.value; break;
            case 'rparmaLimit': site.rparmaLimit = this.value; break;
            case 'areaRMA': site.areaRMA = this.value; break;
            case 'imperviousCalculation': site.imperviousCalculation = this.value; break;
            case 'bmpIncrementalDA': site.bmpIncrementalDA = this.value; break;
            case 'bmpEasement': site.bmpEasement = this.value; break;
            case 'sheet2bCompliance': site.sheet2bCompliance = this.value; break;
            case 'tableComplianceOutfall': site.tableComplianceOutfall = this.value; break;
            case 'vrrmSpreadsheet': site.vrrmSpreadsheet = this.value; break;
            case 'ebOutfall': site.ebOutfall = this.value; break;
            case 'landCover': site.landCover = this.value; break;
            case 'foEasement': site.foEasement = this.value; break;
            case 'planBMP2b': site.planBMP2b = this.value; break;
            case 'profileBMP2b': site.profileBMP2b = this.value; break;
            case 'profileBMP2b': site.profileBMP2b = this.value; break;
            case 'manufacturedBMP2b': site.manufacturedBMP2b = this.value; break;
            case 'bmpIncrementalDA2b': site.bmpIncrementalDA2b = this.value; break;
            case 'bmpMapDA': site.bmpMapDA = this.value; break;
            case 'DAEB1010': site.DAEB1010 = this.value; break;
            case 'DA1Percent': site.DA1Percent = this.value; break;
            case 'QPeak1Percent': site.QPeak1Percent = this.value; break;
            case 'floodplain2b': site.floodplain2b = this.value; break;
            case 'channelFloodCalculation': site.channelFloodCalculation = this.value; break;
            case 'bmpEasement2b': site.bmpEasement2b = this.value; break;
            case 'preventCompaction': site.preventCompaction = this.value; break;
            case 'deqSpecification': site.deqSpecification = this.value; break;
            case 'default2c': site.default2c = this.value; break;
            case 'rpaLimit': site.rpaLimit = this.value; break;
            case 'wetlandLetter': site.wetlandLetter = this.value; break;
            case 'rpaLineType': site.rpaLineType = this.value; break;
            case 'rpaSheets': site.rpaSheets = this.value; break;
            case 'rpaSign': site.rpaSign = this.value; break;
            case 'oosfRPA': site.oosfRPA = this.value; break;
            case 'vehicularSafety': site.vehicularSafety = this.value; break;
            case 'rpaReestablish': site.rpaReestablish = this.value; break;
            case 'bmpInflow': site.bmpInflow = this.value; break;
            case 'endwallSection': site.endwallSection = this.value; break;
            case 'swmEasement': site.swmEasement = this.value; break;
            case 'accessEasement': site.accessEasement = this.value; break;
            case 'meteboundBMP': site.meteboundBMP = this.value; break;
            case 'accessRamp': site.accessRamp = this.value; break;
            case 'safetyBenchorFence': site.safetyBenchorFence = this.value; break;
            case 'safetyBenchandFence': site.safetyBenchandFence = this.value; break;
            case 'vpys': site.vpys = this.value; break;
            case 'profileBMPDetail': site.profileBMPDetail = this.value; break;
            case 'storageVolume': site.storageVolume = this.value; break;
            case 'damTopwidth': site.damTopwidth = this.value; break;
            case 'wse': site.wse = this.value; break;
            case 'shallowMarsh': site.shallowMarsh = this.value; break;
            case 'trashRackDetail': site.trashRackDetail = this.value; break;
            case 'perforationRiser': site.perforationRiser = this.value; break;
            case 'freeboard': site.freeboard = this.value; break;
            case 'emergencySpillway': site.emergencySpillway = this.value; break;
            case 'oringRCP': site.oringRCP = this.value; break;
            case 'truckEnterSign': site.truckEnterSign = this.value; break;
            case 'trashRackAntiVortex': site.trashRackAntiVortex = this.value; break;
            case 'gateValve': site.gateValve = this.value; break;
            case 'lwRatio': site.lwRatio = this.value; break;
            case 'outletProtection': site.outletProtection = this.value; break;
            case 'lowFlow': site.lowFlow = this.value; break;
            case 'bmpSideSlope': site.bmpSideSlope = this.value; break;
            case 'bmp8ftDepth': site.bmp8ftDepth = this.value; break;
            case 'bmpConversion': site.bmpConversion = this.value; break;
            case 'boringInfiltration': site.boringInfiltration = this.value; break;
            case 'observationInfiltration': site.observationInfiltration = this.value; break;
            case 'observeBMP': site.observeBMP = this.value; break;
            case 'bmpMaintenanceFee': site.bmpMaintenanceFee = this.value; break;
            case 'dcr': site.dcr = this.value; break;
            case 'damFailure': site.damFailure = this.value; break;
        };
    });
    
    function setUI(){
        switch(site.noteVSMP){
            case "yes": 
                $("#noteVSMPYes").prop('checked', true);
                break;
            case "no": 
                $("#noteVSMPNo").prop('checked', true);
                break;
            case "na": 
                $("#noteVSMPNA").prop('checked', true);
                break;
        };
        
        switch(site.rpad){
            case "yes": 
                $("#rpadYes").prop('checked', true);
                break;
            case "no": 
                $("#rpadNo").prop('checked', true);
                break;
            case "na": 
                $("#rpadNA").prop('checked', true);
                break;
        };
        
        switch(site.sheetVSMP){
            case "yes": 
                $("#sheetVSMPYes").prop('checked', true);
                break;
            case "no": 
                $("#sheetVSMPNo").prop('checked', true);
                break;
            case "na": 
                $("#sheetVSMPNA").prop('checked', true);
                break;
        };
        
        switch(site.tableCBPAMS4){
            case "yes": 
                $("#tableCBPAMS4Yes").prop('checked', true);
                break;
            case "no": 
                $("#tableCBPAMS4No").prop('checked', true);
                break;
            case "na": 
                $("#tableCBPAMS4NA").prop('checked', true);
                break;
        };
        

        switch(site.planBMP){
            case "yes": 
                $("#planBMPYes").prop('checked', true);
                break;
            case "no": 
                $("#planBMPNo").prop('checked', true);
                break;
            case "na": 
                $("#planBMPNA").prop('checked', true);
                break;
        };
        
       switch(site.profileBMP){
            case "yes": 
                $("#profileBMPYes").prop('checked', true);
                break;
            case "no": 
                $("#profileBMPNo").prop('checked', true);
                break;
            case "na": 
                $("#profileBMPNA").prop('checked', true);
                break;
        };
        
       switch(site.manufacturedBMP){
            case "yes": 
                $("#manufacturedBMPYes").prop('checked', true);
                break;
            case "no": 
                $("#manufacturedBMPNo").prop('checked', true);
                break;
            case "na": 
                $("#manufacturedBMPNA").prop('checked', true);
                break;
        };
        
       switch(site.rparmaLimit){
            case "yes": 
                $("#rparmaLimitYes").prop('checked', true);
                break;
            case "no": 
                $("#rparmaLimitNo").prop('checked', true);
                break;
            case "na": 
                $("#rparmaLimitNA").prop('checked', true);
                break;
        };
        
       switch(site.areaRMA){
            case "yes": 
                $("#areaRMAYes").prop('checked', true);
                break;
            case "no": 
                $("#areaRMANo").prop('checked', true);
                break;
            case "na": 
                $("#areaRMANA").prop('checked', true);
                break;
        };
        
        switch(site.imperviousCalculation){
            case "yes": 
                $("#imperviousCalculationYes").prop('checked', true);
                break;
            case "no": 
                $("#imperviousCalculationNo").prop('checked', true);
                break;
            case "na": 
                $("#imperviousCalculationNA").prop('checked', true);
                break;
        };
        
        switch(site.bmpIncrementalDA){
            case "yes": 
                $("#bmpIncrementalDAYes").prop('checked', true);
                break;
            case "no": 
                $("#bmpIncrementalDANo").prop('checked', true);
                break;
            case "na": 
                $("#bmpIncrementalDANA").prop('checked', true);
                break;
        };

        switch(site.bmpEasement){
            case "yes": 
                $("#bmpEasementYes").prop('checked', true);
                break;
            case "no": 
                $("#bmpEasementNo").prop('checked', true);
                break;
            case "na": 
                $("#bmpEasementNA").prop('checked', true);
                break;
        };

        switch(site.sheet2bCompliance){
            case "yes": 
                $("#sheet2bComplianceYes").prop('checked', true);
                break;
            case "no": 
                $("#sheet2bComplianceNo").prop('checked', true);
                break;
            case "na": 
                $("#sheet2bComplianceNA").prop('checked', true);
                break;
        };
        
        switch(site.tableComplianceOutfall){
            case "yes": 
                $("#tableComplianceOutfallYes").prop('checked', true);
                break;
            case "no": 
                $("#tableComplianceOutfallNo").prop('checked', true);
                break;
            case "na": 
                $("#tableComplianceOutfallNA").prop('checked', true);
                break;
        };
        
        switch(site.vrrmSpreadsheet){
            case "yes": 
                $("#vrrmSpreadsheetYes").prop('checked', true);
                break;
            case "no": 
                $("#vrrmSpreadsheetNo").prop('checked', true);
                break;
            case "na": 
                $("#vrrmSpreadsheetNA").prop('checked', true);
                break;
        };
        
        switch(site.ebOutfall){
            case "yes": 
                $("#ebOutfallYes").prop('checked', true);
                break;
            case "no": 
                $("#ebOutfallNo").prop('checked', true);
                break;
            case "na": 
                $("#ebOutfallNA").prop('checked', true);
                break;
        };
        
        switch(site.landCover){
            case "yes": 
                $("#landCoverYes").prop('checked', true);
                break;
            case "no": 
                $("#landCoverNo").prop('checked', true);
                break;
            case "na": 
                $("#landCoverNA").prop('checked', true);
                break;
        };
        
        switch(site.foEasement){
            case "yes": 
                $("#foEasementYes").prop('checked', true);
                break;
            case "no": 
                $("#foEasementNo").prop('checked', true);
                break;
            case "na": 
                $("#foEasementNA").prop('checked', true);
                break;
        };

        switch(site.planBMP2b){
            case "yes": 
                $("#planBMP2bYes").prop('checked', true);
                break;
            case "no": 
                $("#planBMP2bNo").prop('checked', true);
                break;
            case "na": 
                $("#planBMP2bNA").prop('checked', true);
                break;
        };

        switch(site.profileBMP2b){
            case "yes": 
                $("#profileBMP2bYes").prop('checked', true);
                break;
            case "no": 
                $("#profileBMP2bNo").prop('checked', true);
                break;
            case "na": 
                $("#profileBMP2bNA").prop('checked', true);
                break;
        };
        
        switch(site.manufacturedBMP2b){
            case "yes": 
                $("#manufacturedBMP2bYes").prop('checked', true);
                break;
            case "no": 
                $("#manufacturedBMP2bNo").prop('checked', true);
                break;
            case "na": 
                $("#manufacturedBMP2bNA").prop('checked', true);
                break;
        };
        
        
        switch(site.bmpIncrementalDA2b){
            case "yes": 
                $("#bmpIncrementalDA2bYes").prop('checked', true);
                break;
            case "no": 
                $("#bmpIncrementalDA2bNo").prop('checked', true);
                break;
            case "na": 
                $("#bmpIncrementalDA2bNA").prop('checked', true);
                break;
        };
        
        switch(site.bmpMapDA){
            case "yes": 
                $("#bmpMapDAYes").prop('checked', true);
                break;
            case "no": 
                $("#bmpMapDANo").prop('checked', true);
                break;
            case "na": 
                $("#bmpMapDANA").prop('checked', true);
                break;
        };
        
        switch(site.DAEB1010){
            case "yes": 
                $("#DAEB1010Yes").prop('checked', true);
                break;
            case "no": 
                $("#DAEB1010No").prop('checked', true);
                break;
            case "na": 
                $("#DAEB1010NA").prop('checked', true);
                break;
        };

        switch(site.DA1Percent){
            case "yes": 
                $("#DA1PercentYes").prop('checked', true);
                break;
            case "no": 
                $("#DA1PercentNo").prop('checked', true);
                break;
            case "na": 
                $("#DA1PercentNA").prop('checked', true);
                break;
        };

        switch(site.QPeak1Percent){
            case "yes": 
                $("#QPeak1PercentYes").prop('checked', true);
                break;
            case "no": 
                $("#QPeak1PercentNo").prop('checked', true);
                break;
            case "na": 
                $("#QPeak1PercentNA").prop('checked', true);
                break;
        };
        
        switch(site.floodplain2b){
            case "yes": 
                $("#floodplain2bYes").prop('checked', true);
                break;
            case "no": 
                $("#floodplain2bNo").prop('checked', true);
                break;
            case "na": 
                $("#floodplain2bNA").prop('checked', true);
                break;
        };
        
        switch(site.channelFloodCalculation){
            case "yes": 
                $("#channelFloodCalculationYes").prop('checked', true);
                break;
            case "no": 
                $("#channelFloodCalculationNo").prop('checked', true);
                break;
            case "na": 
                $("#channelFloodCalculationNA").prop('checked', true);
                break;
        };

        switch(site.bmpEasement2b){
            case "yes": 
                $("#bmpEasement2bYes").prop('checked', true);
                break;
            case "no": 
                $("#bmpEasement2bNo").prop('checked', true);
                break;
            case "na": 
                $("#bmpEasement2bNA").prop('checked', true);
                break;
        };

        switch(site.preventCompaction){
            case "yes": 
                $("#preventCompactionYes").prop('checked', true);
                break;
            case "no": 
                $("#preventCompactionNo").prop('checked', true);
                break;
            case "na": 
                $("#preventCompactionNA").prop('checked', true);
                break;
        };

        switch(site.deqSpecification){
            case "yes": 
                $("#deqSpecificationYes").prop('checked', true);
                break;
            case "no": 
                $("#deqSpecificationNo").prop('checked', true);
                break;
            case "na": 
                $("#deqSpecificationNA").prop('checked', true);
                break;
        };
        
        switch(site.default2c){
            case "yes": 
                $("#default2cYes").prop('checked', true);
                break;
            case "no": 
                $("#default2cNo").prop('checked', true);
                break;
            case "na": 
                $("#default2cNA").prop('checked', true);
                break;
        };

        switch(site.rpaLimit){
            case "yes": 
                $("#rpaLimitYes").prop('checked', true);
                break;
            case "no": 
                $("#rpaLimitNo").prop('checked', true);
                break;
            case "na": 
                $("#rpaLimitNA").prop('checked', true);
                break;
        };

        switch(site.wetlandLetter){
            case "yes": 
                $("#wetlandLetterYes").prop('checked', true);
                break;
            case "no": 
                $("#wetlandLetterNo").prop('checked', true);
                break;
            case "na": 
                $("#wetlandLetterNA").prop('checked', true);
                break;
        };

        switch(site.rpaLineType){
            case "yes": 
                $("#rpaLineTypeYes").prop('checked', true);
                break;
            case "no": 
                $("#rpaLineTypeNo").prop('checked', true);
                break;
            case "na": 
                $("#rpaLineTypeNA").prop('checked', true);
                break;
        };

        switch(site.rpaSheets){
            case "yes": 
                $("#rpaSheetsYes").prop('checked', true);
                break;
            case "no": 
                $("#rpaSheetsNo").prop('checked', true);
                break;
            case "na": 
                $("#rpaSheetsNA").prop('checked', true);
                break;
        };

        switch(site.rpaSign){
            case "yes": 
                $("#rpaSignYes").prop('checked', true);
                break;
            case "no": 
                $("#rpaSignNo").prop('checked', true);
                break;
            case "na": 
                $("#rpaSignNA").prop('checked', true);
                break;
        };

        switch(site.oosfRPA){
            case "yes": 
                $("#oosfRPAYes").prop('checked', true);
                break;
            case "no": 
                $("#oosfRPANo").prop('checked', true);
                break;
            case "na": 
                $("#oosfRPANA").prop('checked', true);
                break;
        };

        switch(site.vehicularSafety){
            case "yes": 
                $("#vehicularSafetyYes").prop('checked', true);
                break;
            case "no": 
                $("#vehicularSafetyNo").prop('checked', true);
                break;
            case "na": 
                $("#vehicularSafetyNA").prop('checked', true);
                break;
        };

        switch(site.rpaReestablish){
            case "yes": 
                $("#rpaReestablishYes").prop('checked', true);
                break;
            case "no": 
                $("#rpaReestablishNo").prop('checked', true);
                break;
            case "na": 
                $("#rpaReestablishNA").prop('checked', true);
                break;
        };

        switch(site.bmpInflow){
            case "yes": 
                $("#bmpInflowYes").prop('checked', true);
                break;
            case "no": 
                $("#bmpInflowNo").prop('checked', true);
                break;
            case "na": 
                $("#bmpInflowNA").prop('checked', true);
                break;
        };

        switch(site.endwallSection){
            case "yes": 
                $("#endwallSectionYes").prop('checked', true);
                break;
            case "no": 
                $("#endwallSectionNo").prop('checked', true);
                break;
            case "na": 
                $("#endwallSectionNA").prop('checked', true);
                break;
        };

        switch(site.swmEasement){
            case "yes": 
                $("#swmEasementYes").prop('checked', true);
                break;
            case "no": 
                $("#swmEasementNo").prop('checked', true);
                break;
            case "na": 
                $("#swmEasementNA").prop('checked', true);
                break;
        };

        switch(site.accessEasement){
            case "yes": 
                $("#accessEasementYes").prop('checked', true);
                break;
            case "no": 
                $("#accessEasementNo").prop('checked', true);
                break;
            case "na": 
                $("#accessEasementNA").prop('checked', true);
                break;
        };

        switch (site.meteboundBMP) {
            case "yes":
                $("#meteboundBMPYes").prop('checked', true);
                break;
            case "no":
                $("#meteboundBMPNo").prop('checked', true);
                break;
            case "na":
                $("#meteboundBMPNA").prop('checked', true);
                break;
        };
        switch (site.accessRamp) {
            case "yes":
                $("#accessRampYes").prop('checked', true);
                break;
            case "no":
                $("#accessRampNo").prop('checked', true);
                break;
            case "na":
                $("#accessRampNA").prop('checked', true);
                break;
        };
        switch (site.safetyBenchorFence) {
            case "yes":
                $("#safetyBenchorFenceYes").prop('checked', true);
                break;
            case "no":
                $("#safetyBenchorFenceNo").prop('checked', true);
                break;
            case "na":
                $("#safetyBenchorFenceNA").prop('checked', true);
                break;
        };
        switch (site.safetyBenchandFence) {
            case "yes":
                $("#safetyBenchandFenceYes").prop('checked', true);
                break;
            case "no":
                $("#safetyBenchandFenceNo").prop('checked', true);
                break;
            case "na":
                $("#safetyBenchandFenceNA").prop('checked', true);
                break;
        };
        switch (site.vpys) {
            case "yes":
                $("#vpysYes").prop('checked', true);
                break;
            case "no":
                $("#vpysNo").prop('checked', true);
                break;
            case "na":
                $("#vpysNA").prop('checked', true);
                break;
        };

        switch (site.profileBMPDetail) {
            case "yes":
                $("#profileBMPDetailYes").prop('checked', true);
                break;
            case "no":
                $("#profileBMPDetailNo").prop('checked', true);
                break;
            case "na":
                $("#profileBMPDetailNA").prop('checked', true);
                break;
        };
        switch (site.storageVolume) {
            case "yes":
                $("#storageVolumeYes").prop('checked', true);
                break;
            case "no":
                $("#storageVolumeNo").prop('checked', true);
                break;
            case "na":
                $("#storageVolumeNA").prop('checked', true);
                break;
        };
        switch (site.damTopwidth) {
            case "yes":
                $("#damTopwidthYes").prop('checked', true);
                break;
            case "no":
                $("#damTopwidthNo").prop('checked', true);
                break;
            case "na":
                $("#damTopwidthNA").prop('checked', true);
                break;
        };
        switch (site.wse) {
            case "yes":
                $("#wseYes").prop('checked', true);
                break;
            case "no":
                $("#wseNo").prop('checked', true);
                break;
            case "na":
                $("#wseNA").prop('checked', true);
                break;
        };
        switch (site.shallowMarsh) {
            case "yes":
                $("#shallowMarshYes").prop('checked', true);
                break;
            case "no":
                $("#shallowMarshNo").prop('checked', true);
                break;
            case "na":
                $("#shallowMarshNA").prop('checked', true);
                break;
        };
        switch (site.trashRackDetail) {
            case "yes":
                $("#trashRackDetailYes").prop('checked', true);
                break;
            case "no":
                $("#trashRackDetailNo").prop('checked', true);
                break;
            case "na":
                $("#trashRackDetailNA").prop('checked', true);
                break;
        };
        switch (site.emergencySpillway) {
            case "yes":
                $("#emergencySpillwayYes").prop('checked', true);
                break;
            case "no":
                $("#emergencySpillwayNo").prop('checked', true);
                break;
            case "na":
                $("#emergencySpillwayNA").prop('checked', true);
                break;
        };
        switch (site.perforationRiser) {
            case "yes":
                $("#perforationRiserYes").prop('checked', true);
                break;
            case "no":
                $("#perforationRiserNo").prop('checked', true);
                break;
            case "na":
                $("#perforationRiserNA").prop('checked', true);
                break;
        };
        switch (site.freeboard) {
            case "yes":
                $("#freeboardYes").prop('checked', true);
                break;
            case "no":
                $("#freeboardNo").prop('checked', true);
                break;
            case "na":
                $("#freeboardNA").prop('checked', true);
                break;
        };

        switch (site.oringRCP) {
            case "yes":
                $("#oringRCPYes").prop('checked', true);
                break;
            case "no":
                $("#oringRCPNo").prop('checked', true);
                break;
            case "na":
                $("#oringRCPNA").prop('checked', true);
                break;
        };
        switch (site.trashRackDetail) {
            case "yes":
                $("#trashRackDetailYes").prop('checked', true);
                break;
            case "no":
                $("#trashRackDetailNo").prop('checked', true);
                break;
            case "na":
                $("#trashRackDetailNA").prop('checked', true);
                break;
        };

        switch (site.trashRackAntiVortex) {
            case "yes":
                $("#trashRackAntiVortexYes").prop('checked', true);
                break;
            case "no":
                $("#trashRackAntiVortexNo").prop('checked', true);
                break;
            case "na":
                $("#trashRackAntiVortexNA").prop('checked', true);
                break;
        };
        switch (site.clayCore) {
            case "yes":
                $("#clayCoreYes").prop('checked', true);
                break;
            case "no":
                $("#clayCoreNo").prop('checked', true);
                break;
            case "na":
                $("#clayCoreNA").prop('checked', true);
                break;
        };
        switch (site.gateValve) {
            case "yes":
                $("#gateValveYes").prop('checked', true);
                break;
            case "no":
                $("#gateValveNo").prop('checked', true);
                break;
            case "na":
                $("#gateValveNA").prop('checked', true);
                break;
        };

        switch (site.lwRatio) {
            case "yes":
                $("#lwRatioYes").prop('checked', true);
                break;
            case "no":
                $("#lwRatioNo").prop('checked', true);
                break;
            case "na":
                $("#lwRatioNA").prop('checked', true);
                break;
        };
        switch (site.outletProtection) {
            case "yes":
                $("#outletProtectionYes").prop('checked', true);
                break;
            case "no":
                $("#outletProtectionNo").prop('checked', true);
                break;
            case "na":
                $("#outletProtectionNA").prop('checked', true);
                break;
        };

        switch (site.lwRatio) {
            case "yes":
                $("#lowFlowYes").prop('checked', true);
                break;
            case "no":
                $("#lowFlowNo").prop('checked', true);
                break;
            case "na":
                $("#lowFlowNA").prop('checked', true);
                break;
        };
        switch (site.bmpSideSlope) {
            case "yes":
                $("#bmpSideSlopeYes").prop('checked', true);
                break;
            case "no":
                $("#bmpSideSlopeNo").prop('checked', true);
                break;
            case "na":
                $("#bmpSideSlopeNA").prop('checked', true);
                break;
        };
        switch (site.bmp8ftDepth) {
            case "yes":
                $("#bmp8ftDepthYes").prop('checked', true);
                break;
            case "no":
                $("#bmp8ftDepthNo").prop('checked', true);
                break;
            case "na":
                $("#bmp8ftDepthNA").prop('checked', true);
                break;
        };
        switch (site.bmpConversion) {
            case "yes":
                $("#bmpConversionYes").prop('checked', true);
                break;
            case "no":
                $("#bmpConversionNo").prop('checked', true);
                break;
            case "na":
                $("#bmpConversionNA").prop('checked', true);
                break;
        };
        switch (site.boringInfiltration) {
            case "yes":
                $("#boringInfiltrationYes").prop('checked', true);
                break;
            case "no":
                $("#boringInfiltrationNo").prop('checked', true);
                break;
            case "na":
                $("#boringInfiltrationNA").prop('checked', true);
                break;
        };
        switch (site.observationInfiltration) {
            case "yes":
                $("#observationInfiltrationYes").prop('checked', true);
                break;
            case "no":
                $("#observationInfiltrationNo").prop('checked', true);
                break;
            case "na":
                $("#observationInfiltrationNA").prop('checked', true);
                break;
        };
        switch (site.observeBMP) {
            case "yes":
                $("#observeBMPYes").prop('checked', true);
                break;
            case "no":
                $("#observeBMPNo").prop('checked', true);
                break;
            case "na":
                $("#observeBMPNA").prop('checked', true);
                break;
        };
        switch (site.bmpMaintenanceFee) {
            case "yes":
                $("#bmpMaintenanceFeeYes").prop('checked', true);
                break;
            case "no":
                $("#bmpMaintenanceFeeNo").prop('checked', true);
                break;
            case "na":
                $("#bmpMaintenanceFeeNA").prop('checked', true);
                break;
        };
        switch (site.dcr) {
            case "yes":
                $("#dcrYes").prop('checked', true);
                break;
            case "no":
                $("#dcrNo").prop('checked', true);
                break;
            case "na":
                $("#dcrNA").prop('checked', true);
                break;
        };
        switch (site.damFailure) {
            case "yes":
                $("#damFailureYes").prop('checked', true);
                break;
            case "no":
                $("#damFailureNo").prop('checked', true);
                break;
            case "na":
                $("#damFailureNA").prop('checked', true);
                break;
        };
    };
    
});
