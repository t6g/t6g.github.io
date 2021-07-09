jQuery(document).ready(function(){
    const defaultESC = {
        twoPhase: "na",
        inletProtection1: "na",
        inletProtection2: "na",
        timbering: "na",
        sequence: "na",
        notifyEE: "na",
        rld: "na",
        crld: "na",
        stepSequence: "na",
        trapinPlace: "na",
        escLegend: "na",
        constructionEntrance: "na",
        escDA: "na",
        sedimentBasin: "na",
        infoTrap: "na",
        lengthWidthTrap: "na",
        detailTrap: "na",
        SAFTrap: "na",
        SFBreak: "na",
        //detailInlet: "na",
        escRegulation: "na",
        escHandbook: "na",
        escSymbol: "na",
        escDetail: "na",
        escMaintainance: "na",
        toESC: "na",
        moreESC: "na",
        escMS1: "na",
        grassTable: "na",
        ldLimit: "na",
        drainageEasement: "na",
        culvertDownstream: "na",
        rationalI: "na",
        criticalDuration: "na",
        tempSlopeDrain: "na",
        inletProtection: "na",
        curbInletProtection: "na",
        grateInletProtection: "na",
        ms16: "na",
        trenchDetail: "na",
        offsiteUtility: "na",
        stockpile: "na",
        blanket: "na",
        benchSlope: "na",
        numberSTB: "na",
        conversionBMP: "na",
        moreNotes: "na",
        offsiteEasement: "na",
        quitclaim: "na",
        performanceBond: "na",
        onsiteDE: "na",
        bmpBond: "na",
        bmpCertify: "na",
        bmpCertDoc: "na",
        asbuiltSurvey: "na",
        certForm: "na",
        certVolume: "na",
        certPhoto: "na",
        certStamp: "na",
        vdotLandUsePermit: "na",
        truckEnterSign: "na",
        pipeRiser: "na",
        rpaLimit: "na"
    };
    
    var site = {};
    
    $("#mynav").load("nav.html");

    let tmp = localStorage.getItem('Site'); 
    if (tmp) {
        Object.assign(site, JSON.parse(tmp));
    } else {
        Object.assign(site, defaultESC);
    }
    
    setUI();
    $('input[type=radio]').change(function(e){
        switch(e.target.name){
            case 'twoPhase': site.twoPhase = this.value; break;
            case 'inletProtection1': site.inletProtection1 = this.value; break;
            case 'inletProtection2': site.inletProtection2 = this.value; break;
            case 'timbering': site.timbering = this.value; break;
            case 'sequence': site.sequence = this.value; break;
            case 'notifyEE': site.notifyEE = this.value; break;
            case 'rld': site.rld = this.value; break;
            case 'crld': site.crld = this.value; break;
            case 'stepSequence': site.stepSequence = this.value; break;
            case 'trapinPlace': site.trapinPlace = this.value; break;
            case 'escLegend': site.escLegend = this.value; break;
            case 'constructionEntrance': site.constructionEntrance = this.value; break;
            case 'escDA': site.escDA = this.value; break;
            case 'sedimentBasin': site.sedimentBasin = this.value; break;
            case 'infoTrap': site.infoTrap = this.value; break;
            case 'lengthWidthTrap': site.lengthWidthTrap = this.value; break;
            case 'detailTrap': site.detailTrap = this.value; break;
            case 'SAFTrap': site.SAFTrap = this.value; break;
            case 'SFBreak': site.SFBreak = this.value; break;
            //case 'detailInlet': site.detailInlet = this.value; break;
            case 'escRegulation': site.escRegulation = this.value; break;
            case 'escHandbook': site.escHandbook = this.value; break;
            case 'escSymbol': site.escSymbol = this.value; break;
            case 'escDetail': site.escDetail = this.value; break;
            case 'escMaintainance': site.escMaintainance = this.value; break;
            case 'toESC': site.toESC = this.value; break;
            case 'moreESC': site.moreESC = this.value; break;
            case 'escMS1': site.escMS1 = this.value; break;
            case 'grassTable': site.grassTable = this.value; break;
            case 'ldLimit': site.ldLimit = this.value; break;
            case 'drainageEasement': site.drainageEasement = this.value; break;
            case 'culvertDownstream': site.culvertDownstream = this.value; break;
            case 'rationalI': site.rationalI = this.value; break;
            case 'criticalDuration': site.criticalDuration = this.value; break;
            case 'tempSlopeDrain': site.tempSlopeDrain = this.value; break;
            case 'inletProtection': site.inletProtection = this.value; break;
            case 'curbInletProtection': site.curbInletProtection = this.value; break;
            case 'grateInletProtection': site.grateInletProtection = this.value; break;
            case 'ms16': site.ms16 = this.value; break;
            case 'trenchDetail': site.trenchDetail = this.value; break;
            case 'offsiteUtility': site.offsiteUtility = this.value; break;
            case 'stockpile': site.stockpile = this.value; break;
            case 'blanket': site.blanket = this.value; break;
            case 'benchSlope': site.benchSlope = this.value; break;
            case 'numberSTB': site.numberSTB = this.value; break;
            case 'conversionBMP': site.conversionBMP = this.value; break;
            case 'moreNotes': site.moreNotes = this.value; break;
            case 'offsiteEasement': site.offsiteEasement = this.value; break;
            case 'quitclaim': site.quitclaim = this.value; break;
            case 'performanceBond': site.performanceBond = this.value; break;
            case 'onsiteDE': site.onsiteDE = this.value; break;
            case 'bmpBond': site.bmpBond = this.value; break;
            case 'bmpCertify': site.bmpCertify = this.value; break;
            case 'bmpCertDoc': site.bmpCertDoc = this.value; break;
            case 'asbuiltSurvey': site.asbuiltSurvey = this.value; break;
            case 'certForm': site.certForm = this.value; break;
            case 'certVolume': site.certVolume = this.value; break;
            case 'certPhoto': site.certPhoto = this.value; break;
            case 'certStamp': site.certStamp = this.value; break;
            case 'vdotLandUsePermit': site.vdotLandUsePermit = this.value; break;
            case 'truckEnterSign': site.truckEnterSign = this.value; break;
            case 'pipeRiser': site.pipeRiser = this.value; break;
            case 'rpaLimit': site.rpaLimit = this.value; break;
        };
    });
    
    function setUI(){
        switch(site.twoPhase){
            case "yes": 
                $("#twoPhaseYes").prop('checked', true);
                break;
            case "no": 
                $("#twoPhaseNo").prop('checked', true);
                break;
            case "na": 
                $("#twoPhaseNA").prop('checked', true);
                break;
        };
        
        switch(site.inletProtection1){
            case "yes": 
                $("#inletProtection1Yes").prop('checked', true);
                break;
            case "no": 
                $("#inletProtection1No").prop('checked', true);
                break;
            case "na": 
                $("#inletProtection1NA").prop('checked', true);
                break;
        };
        
        switch(site.inletProtection2){
            case "yes": 
                $("#inletProtection2Yes").prop('checked', true);
                break;
            case "no": 
                $("#inletProtection2No").prop('checked', true);
                break;
            case "na": 
                $("#inletProtection2NA").prop('checked', true);
                break;
        };
        
        switch(site.timbering){
            case "yes": 
                $("#timberingYes").prop('checked', true);
                break;
            case "no": 
                $("#timberingNo").prop('checked', true);
                break;
            case "na": 
                $("#timberingNA").prop('checked', true);
                break;
        };
        

        switch(site.sequence){
            case "yes": 
                $("#sequenceYes").prop('checked', true);
                break;
            case "no": 
                $("#sequenceNo").prop('checked', true);
                break;
            case "na": 
                $("#sequenceNA").prop('checked', true);
                break;
        };
        
       switch(site.notifyEE){
            case "yes": 
                $("#notifyEEYes").prop('checked', true);
                break;
            case "no": 
                $("#notifyEENo").prop('checked', true);
                break;
            case "na": 
                $("#notifyEENA").prop('checked', true);
                break;
        };
        
       switch(site.rld){
            case "yes": 
                $("#rldYes").prop('checked', true);
                break;
            case "no": 
                $("#rldNo").prop('checked', true);
                break;
            case "na": 
                $("#rldNA").prop('checked', true);
                break;
        };
        
       switch(site.crld){
            case "yes": 
                $("#crldYes").prop('checked', true);
                break;
            case "no": 
                $("#crldNo").prop('checked', true);
                break;
            case "na": 
                $("#crldNA").prop('checked', true);
                break;
        };
        
       switch(site.stepSequence){
            case "yes": 
                $("#stepSequenceYes").prop('checked', true);
                break;
            case "no": 
                $("#stepSequenceNo").prop('checked', true);
                break;
            case "na": 
                $("#stepSequenceNA").prop('checked', true);
                break;
        };
        
        switch(site.trapinPlace){
            case "yes": 
                $("#trapinPlaceYes").prop('checked', true);
                break;
            case "no": 
                $("#trapinPlaceNo").prop('checked', true);
                break;
            case "na": 
                $("#trapinPlaceNA").prop('checked', true);
                break;
        };
        
        switch(site.escLegend){
            case "yes": 
                $("#escLegendYes").prop('checked', true);
                break;
            case "no": 
                $("#escLegendNo").prop('checked', true);
                break;
            case "na": 
                $("#escLegendNA").prop('checked', true);
                break;
        };

        switch(site.constructionEntrance){
            case "yes": 
                $("#constructionEntranceYes").prop('checked', true);
                break;
            case "no": 
                $("#constructionEntranceNo").prop('checked', true);
                break;
            case "na": 
                $("#constructionEntranceNA").prop('checked', true);
                break;
        };

        switch(site.escDA){
            case "yes": 
                $("#escDAYes").prop('checked', true);
                break;
            case "no": 
                $("#escDANo").prop('checked', true);
                break;
            case "na": 
                $("#escDANA").prop('checked', true);
                break;
        };
        
        switch(site.sedimentBasin){
            case "yes": 
                $("#sedimentBasinYes").prop('checked', true);
                break;
            case "no": 
                $("#sedimentBasinNo").prop('checked', true);
                break;
            case "na": 
                $("#sedimentBasinNA").prop('checked', true);
                break;
        };
        
        switch(site.infoTrap){
            case "yes": 
                $("#infoTrapYes").prop('checked', true);
                break;
            case "no": 
                $("#infoTrapNo").prop('checked', true);
                break;
            case "na": 
                $("#infoTrapNA").prop('checked', true);
                break;
        };
        
        switch(site.lengthWidthTrap){
            case "yes": 
                $("#lengthWidthTrapYes").prop('checked', true);
                break;
            case "no": 
                $("#lengthWidthTrapNo").prop('checked', true);
                break;
            case "na": 
                $("#lengthWidthTrapNA").prop('checked', true);
                break;
        };
        
        switch(site.detailTrap){
            case "yes": 
                $("#detailTrapYes").prop('checked', true);
                break;
            case "no": 
                $("#detailTrapNo").prop('checked', true);
                break;
            case "na": 
                $("#detailTrapNA").prop('checked', true);
                break;
        };
        
        switch(site.SAFTrap){
            case "yes": 
                $("#SAFTrapYes").prop('checked', true);
                break;
            case "no": 
                $("#SAFTrapNo").prop('checked', true);
                break;
            case "na": 
                $("#SAFTrapNA").prop('checked', true);
                break;
        };

        switch(site.SFBreak){
            case "yes": 
                $("#SFBreakYes").prop('checked', true);
                break;
            case "no": 
                $("#SFBreakNo").prop('checked', true);
                break;
            case "na": 
                $("#SFBreakNA").prop('checked', true);
                break;
        };

        switch(site.escRegulation){
            case "yes": 
                $("#escRegulationYes").prop('checked', true);
                break;
            case "no": 
                $("#escRegulationNo").prop('checked', true);
                break;
            case "na": 
                $("#escRegulationNA").prop('checked', true);
                break;
        };
        
        switch(site.escHandbook){
            case "yes": 
                $("#escHandbookYes").prop('checked', true);
                break;
            case "no": 
                $("#escHandbookNo").prop('checked', true);
                break;
            case "na": 
                $("#escHandbookNA").prop('checked', true);
                break;
        };
        
        
        switch(site.escSymbol){
            case "yes": 
                $("#escSymbolYes").prop('checked', true);
                break;
            case "no": 
                $("#escSymbolNo").prop('checked', true);
                break;
            case "na": 
                $("#escSymbolNA").prop('checked', true);
                break;
        };
        
        switch(site.escDetail){
            case "yes": 
                $("#escDetailYes").prop('checked', true);
                break;
            case "no": 
                $("#escDetailNo").prop('checked', true);
                break;
            case "na": 
                $("#escDetailNA").prop('checked', true);
                break;
        };
        
        switch(site.escMaintainance){
            case "yes": 
                $("#escMaintainanceYes").prop('checked', true);
                break;
            case "no": 
                $("#escMaintainanceNo").prop('checked', true);
                break;
            case "na": 
                $("#escMaintainanceNA").prop('checked', true);
                break;
        };

        switch(site.toESC){
            case "yes": 
                $("#toESCYes").prop('checked', true);
                break;
            case "no": 
                $("#toESCNo").prop('checked', true);
                break;
            case "na": 
                $("#toESCNA").prop('checked', true);
                break;
        };

        switch(site.moreESC){
            case "yes": 
                $("#moreESCYes").prop('checked', true);
                break;
            case "no": 
                $("#moreESCNo").prop('checked', true);
                break;
            case "na": 
                $("#moreESCNA").prop('checked', true);
                break;
        };
        
        switch(site.escMS1){
            case "yes": 
                $("#escMS1Yes").prop('checked', true);
                break;
            case "no": 
                $("#escMS1No").prop('checked', true);
                break;
            case "na": 
                $("#escMS1NA").prop('checked', true);
                break;
        };
        
        switch(site.grassTable){
            case "yes": 
                $("#grassTableYes").prop('checked', true);
                break;
            case "no": 
                $("#grassTableNo").prop('checked', true);
                break;
            case "na": 
                $("#grassTableNA").prop('checked', true);
                break;
        };

        switch(site.ldLimit){
            case "yes": 
                $("#ldLimitYes").prop('checked', true);
                break;
            case "no": 
                $("#ldLimitNo").prop('checked', true);
                break;
            case "na": 
                $("#ldLimitNA").prop('checked', true);
                break;
        };

        switch(site.culvertDownstream){
            case "yes": 
                $("#culvertDownstreamYes").prop('checked', true);
                break;
            case "no": 
                $("#culvertDownstreamNo").prop('checked', true);
                break;
            case "na": 
                $("#culvertDownstreamNA").prop('checked', true);
                break;
        };
        
        switch(site.rationalI){
            case "yes": 
                $("#rationalIYes").prop('checked', true);
                break;
            case "no": 
                $("#rationalINo").prop('checked', true);
                break;
            case "na": 
                $("#rationalINA").prop('checked', true);
                break;
        };

        switch(site.criticalDuration){
            case "yes": 
                $("#criticalDurationYes").prop('checked', true);
                break;
            case "no": 
                $("#criticalDurationNo").prop('checked', true);
                break;
            case "na": 
                $("#criticalDurationNA").prop('checked', true);
                break;
        };

        switch(site.tempSlopeDrain){
            case "yes": 
                $("#tempSlopeDrainYes").prop('checked', true);
                break;
            case "no": 
                $("#tempSlopeDrainNo").prop('checked', true);
                break;
            case "na": 
                $("#tempSlopeDrainNA").prop('checked', true);
                break;
        };

        switch(site.inletProtection){
            case "yes": 
                $("#inletProtectionYes").prop('checked', true);
                break;
            case "no": 
                $("#inletProtectionNo").prop('checked', true);
                break;
            case "na": 
                $("#inletProtectionNA").prop('checked', true);
                break;
        };

        switch(site.curbInletProtection){
            case "yes": 
                $("#curbInletProtectionYes").prop('checked', true);
                break;
            case "no": 
                $("#curbInletProtectionNo").prop('checked', true);
                break;
            case "na": 
                $("#curbInletProtectionNA").prop('checked', true);
                break;
        };

        switch(site.grateInletProtection){
            case "yes": 
                $("#grateInletProtectionYes").prop('checked', true);
                break;
            case "no": 
                $("#grateInletProtectionNo").prop('checked', true);
                break;
            case "na": 
                $("#grateInletProtectionNA").prop('checked', true);
                break;
        };

        switch(site.ms16){
            case "yes": 
                $("#ms16Yes").prop('checked', true);
                break;
            case "no": 
                $("#ms16No").prop('checked', true);
                break;
            case "na": 
                $("#ms16NA").prop('checked', true);
                break;
        };

        switch(site.trenchDetail){
            case "yes": 
                $("#trenchDetailYes").prop('checked', true);
                break;
            case "no": 
                $("#trenchDetailNo").prop('checked', true);
                break;
            case "na": 
                $("#trenchDetailNA").prop('checked', true);
                break;
        };

        switch(site.offsiteUtility){
            case "yes": 
                $("#offsiteUtilityYes").prop('checked', true);
                break;
            case "no": 
                $("#offsiteUtilityNo").prop('checked', true);
                break;
            case "na": 
                $("#offsiteUtilityNA").prop('checked', true);
                break;
        };

        switch(site.stockpile){
            case "yes": 
                $("#stockpileYes").prop('checked', true);
                break;
            case "no": 
                $("#stockpileNo").prop('checked', true);
                break;
            case "na": 
                $("#stockpileNA").prop('checked', true);
                break;
        };

        switch(site.blanket){
            case "yes": 
                $("#blanketYes").prop('checked', true);
                break;
            case "no": 
                $("#blanketNo").prop('checked', true);
                break;
            case "na": 
                $("#blanketNA").prop('checked', true);
                break;
        };

        switch(site.benchSlope){
            case "yes": 
                $("#benchSlopeYes").prop('checked', true);
                break;
            case "no": 
                $("#benchSlopeNo").prop('checked', true);
                break;
            case "na": 
                $("#benchSlopeNA").prop('checked', true);
                break;
        };

        switch(site.numberSTB){
            case "yes": 
                $("#numberSTBYes").prop('checked', true);
                break;
            case "no": 
                $("#numberSTBNo").prop('checked', true);
                break;
            case "na": 
                $("#numberSTBNA").prop('checked', true);
                break;
        };

        switch (site.conversionBMP) {
            case "yes":
                $("#conversionBMPYes").prop('checked', true);
                break;
            case "no":
                $("#conversionBMPNo").prop('checked', true);
                break;
            case "na":
                $("#conversionBMPNA").prop('checked', true);
                break;
        };
        switch (site.moreNotes) {
            case "yes":
                $("#moreNotesYes").prop('checked', true);
                break;
            case "no":
                $("#moreNotesNo").prop('checked', true);
                break;
            case "na":
                $("#moreNotesNA").prop('checked', true);
                break;
        };
        switch (site.offsiteEasement) {
            case "yes":
                $("#offsiteEasementYes").prop('checked', true);
                break;
            case "no":
                $("#offsiteEasementNo").prop('checked', true);
                break;
            case "na":
                $("#offsiteEasementNA").prop('checked', true);
                break;
        };
        switch (site.quitclaim) {
            case "yes":
                $("#quitclaimYes").prop('checked', true);
                break;
            case "no":
                $("#quitclaimNo").prop('checked', true);
                break;
            case "na":
                $("#quitclaimNA").prop('checked', true);
                break;
        };
        switch (site.performanceBond) {
            case "yes":
                $("#performanceBondYes").prop('checked', true);
                break;
            case "no":
                $("#performanceBondNo").prop('checked', true);
                break;
            case "na":
                $("#performanceBondNA").prop('checked', true);
                break;
        };

        switch (site.onsiteDE) {
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
        switch (site.bmpBond) {
            case "yes":
                $("#bmpBondYes").prop('checked', true);
                break;
            case "no":
                $("#bmpBondNo").prop('checked', true);
                break;
            case "na":
                $("#bmpBondNA").prop('checked', true);
                break;
        };
        switch (site.bmpCertify) {
            case "yes":
                $("#bmpCertifyYes").prop('checked', true);
                break;
            case "no":
                $("#bmpCertifyNo").prop('checked', true);
                break;
            case "na":
                $("#bmpCertifyNA").prop('checked', true);
                break;
        };
        switch (site.bmpCertDoc) {
            case "yes":
                $("#bmpCertDocYes").prop('checked', true);
                break;
            case "no":
                $("#bmpCertDocNo").prop('checked', true);
                break;
            case "na":
                $("#bmpCertDocNA").prop('checked', true);
                break;
        };
        switch (site.asbuiltSurvey) {
            case "yes":
                $("#asbuiltSurveyYes").prop('checked', true);
                break;
            case "no":
                $("#asbuiltSurveyNo").prop('checked', true);
                break;
            case "na":
                $("#asbuiltSurveyNA").prop('checked', true);
                break;
        };
        switch (site.certForm) {
            case "yes":
                $("#certFormYes").prop('checked', true);
                break;
            case "no":
                $("#certFormNo").prop('checked', true);
                break;
            case "na":
                $("#certFormNA").prop('checked', true);
                break;
        };
        switch (site.certVolume) {
            case "yes":
                $("#certVolumeYes").prop('checked', true);
                break;
            case "no":
                $("#certVolumeNo").prop('checked', true);
                break;
            case "na":
                $("#certVolumeNA").prop('checked', true);
                break;
        };
        switch (site.certStamp) {
            case "yes":
                $("#certStampYes").prop('checked', true);
                break;
            case "no":
                $("#certStampNo").prop('checked', true);
                break;
            case "na":
                $("#certStampNA").prop('checked', true);
                break;
        };
        switch (site.certPhoto) {
            case "yes":
                $("#certPhotoYes").prop('checked', true);
                break;
            case "no":
                $("#certPhotoNo").prop('checked', true);
                break;
            case "na":
                $("#certPhotoNA").prop('checked', true);
                break;
        };

        switch (site.vdotLandUsePermit) {
            case "yes":
                $("#vdotLandUsePermitYes").prop('checked', true);
                break;
            case "no":
                $("#vdotLandUsePermitNo").prop('checked', true);
                break;
            case "na":
                $("#vdotLandUsePermitNA").prop('checked', true);
                break;
        };
        switch (site.certVolume) {
            case "yes":
                $("#certVolumeYes").prop('checked', true);
                break;
            case "no":
                $("#certVolumeNo").prop('checked', true);
                break;
            case "na":
                $("#certVolumeNA").prop('checked', true);
                break;
        };

        switch(site.truckEnterSign){
            case "yes": 
                $("#truckEnterSignYes").prop('checked', true);
                break;
            case "no": 
                $("#truckEnterSignNo").prop('checked', true);
                break;
            case "na": 
                $("#truckEnterSignNA").prop('checked', true);
                break;
        };

        switch (site.pipeRiser) {
            case "yes":
                $("#pipeRiserYes").prop('checked', true);
                break;
            case "no":
                $("#pipeRiserNo").prop('checked', true);
                break;
            case "na":
                $("#pipeRiserNA").prop('checked', true);
                break;
        };
        switch (site.rpaLimit) {
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
        
        if(site.twoPhase == 'no'){
            list.append('<li>' + $("label[for='twoPhase']").text() + '</li>');
        }

        if(site.inletProtection1 == 'no'){
            list.append('<li>' + $("label[for='inletProtection1']").text() + '</li>');
        }

        if(site.inletProtection2 == 'no'){
            list.append('<li>' + $("label[for='inletProtection2']").text() + '</li>');
        }

        if(site.timbering == 'no'){
            list.append('<li>' + $("label[for='timbering']").text() + '</li>');
        }

        if(site.sequence == 'no'){
            list.append('<li>' + $("label[for='sequence']").text() + '</li>');
        }

        if(site.notifyEE == 'no'){
            list.append('<li>' + $("label[for='notifyEE']").text() + '</li>');
        }

        if(site.benchmark == 'no'){
            list.append('<li>' + $("label[for='benchmark']").text() + '</li>');
        }

        if(site.rld == 'no'){
            list.append('<li>' + $("label[for='rld']").text() + '</li>');
        }

        if(site.crld == 'no'){
            list.append('<li>' + $("label[for='crld']").text() + '</li>');
        }

        if(site.stepSequence == 'no'){
            list.append('<li>' + $("label[for='stepSequence']").text() + '</li>');
        }


        if(site.trapinPlace == 'no'){
            list.append('<li>' + $("label[for='trapinPlace']").text() + '</li>');
        }

        if(site.escLegend == 'no'){
            list.append('<li>' + $("label[for='escLegend']").text() + '</li>');
        }

        if(site.constructionEntrance == 'no'){
            list.append('<li>' + $("label[for='constructionEntrance']").text() + '</li>');
        }

        if(site.escDA == 'no'){
            list.append('<li>' + $("label[for='escDA']").text() + '</li>');
        }

        if(site.sedimentBasin == 'no'){
            list.append('<li>' + $("label[for='sedimentBasin']").text() + '</li>');
        }

        if(site.infoTrap == 'no'){
            list.append('<li>' + $("label[for='infoTrap']").text() + '</li>');
        }

        if(site.lengthWidthTrap == 'no'){
            list.append('<li>' + $("label[for='lengthWidthTrap']").text() + '</li>');
        }

        if(site.detailTrap == 'no'){
            list.append('<li>' + $("label[for='detailTrap']").text() + '</li>');
        }

        if(site.SAFTrap == 'no'){
            list.append('<li>' + $("label[for='SAFTrap']").text() + '</li>');
        }

        if(site.SFBreak == 'no'){
            list.append('<li>' + $("label[for='SFBreak']").text() + '</li>');
        }

/*        if(site.detailInlet == 'no'){
            list.append('<li>' + $("label[for='detailInlet']").text() + '</li>');
        }
*/
        if(site.escRegulation == 'no'){
            list.append('<li>' + $("label[for='escRegulation']").text() + '</li>');
        }

        if(site.escHandbook == 'no'){
            list.append('<li>' + $("label[for='escHandbook']").text() + '</li>');
        }

        if(site.escSymbol == 'no'){
            list.append('<li>' + $("label[for='escSymbol']").text() + '</li>');
        }

        if(site.escDetail == 'no'){
            list.append('<li>' + $("label[for='escDetail']").text() + '</li>');
        }

        if(site.escMaintainance == 'no'){
            list.append('<li>' + $("label[for='escMaintainance']").text() + '</li>');
        }

        if(site.toESC == 'no'){
            list.append('<li>' + $("label[for='toESC']").text() + '</li>');
        }

        if(site.moreESC == 'no'){
            list.append('<li>' + $("label[for='moreESC']").text() + '</li>');
        }

        if(site.escMS1 == 'no'){
            list.append('<li>' + $("label[for='escMS1']").text() + '</li>');
        }

        if(site.grassTable == 'no'){
            list.append('<li>' + $("label[for='grassTable']").text() + '</li>');
        }

        if(site.ldLimit == 'no'){
            list.append('<li>' + $("label[for='ldLimit']").text() + '</li>');
        }

        if(site.drainageEasement == 'no'){
            list.append('<li>' + $("label[for='drainageEasement']").text() + '</li>');
        }

        if(site.culvertDownstream == 'no'){
            list.append('<li>' + $("label[for='culvertDownstream']").text() + '</li>');
        }

        if(site.rationalI == 'no'){
            list.append('<li>' + $("label[for='rationalI']").text() + '</li>');
        }

        if(site.criticalDuration == 'no'){
            list.append('<li>' + $("label[for='criticalDuration']").text() + '</li>');
        }

        if(site.tempSlopeDrain == 'no'){
            list.append('<li>' + $("label[for='tempSlopeDrain']").text() + '</li>');
        }

        if(site.inletProtection == 'no'){
            list.append('<li>' + $("label[for='inletProtection']").text() + '</li>');
        }

        if(site.curbInletProtection == 'no'){
            list.append('<li>' + $("label[for='curbInletProtection']").text() + '</li>');
        }

        if(site.grateInletProtection == 'no'){
            list.append('<li>' + $("label[for='grateInletProtection']").text() + '</li>');
        }

        if(site.ms16 == 'no'){
            list.append('<li>' + $("label[for='ms16']").text() + '</li>');
        }

        if(site.trenchDetail == 'no'){
            list.append('<li>' + $("label[for='trenchDetail']").text() + '</li>');
        }

        if(site.offsiteUtility == 'no'){
            list.append('<li>' + $("label[for='offsiteUtility']").text() + '</li>');
        }

        if(site.stockpile == 'no'){
            list.append('<li>' + $("label[for='stockpile']").text() + '</li>');
        }

        if(site.blanket == 'no'){
            list.append('<li>' + $("label[for='blanket']").text() + '</li>');
        }

        if(site.benchSlope == 'no'){
            list.append('<li>' + $("label[for='benchSlope']").text() + '</li>');
        }
        if(site.numberSTB == 'no'){
            list.append('<li>' + $("label[for='numberSTB']").text() + '</li>');
        }
        if(site.conversionBMP == 'no'){
            list.append('<li>' + $("label[for='conversionBMP']").text() + '</li>');
        }
        if(site.moreNotes == 'no'){
            list.append('<li>' + $("label[for='moreNotes']").text() + '</li>');
        }
        if(site.offsiteEasement == 'no'){
            list.append('<li>' + $("label[for='offsiteEasement']").text() + '</li>');
        }
        if(site.quitclaim == 'no'){
            list.append('<li>' + $("label[for='quitclaim']").text() + '</li>');
        }
        if(site.performanceBond == 'no'){
            list.append('<li>' + $("label[for='performanceBond']").text() + '</li>');
        }
        if(site.onsiteDE == 'no'){
            list.append('<li>' + $("label[for='onsiteDE']").text() + '</li>');
        }
        if(site.bmpBond == 'no'){
            list.append('<li>' + $("label[for='bmpBond']").text() + '</li>');
        }
        if(site.bmpCertify == 'no'){
            list.append('<li>' + $("label[for='bmpCertify']").text() + '</li>');
        }
        if(site.bmpCertDoc == 'no'){
            list.append('<li>' + $("label[for='bmpCertDoc']").text() + '</li>');
        }
        if(site.asbuiltSurvey == 'no'){
            list.append('<li>' + $("label[for='asbuiltSurvey']").text() + '</li>');
        }
        if(site.certForm == 'no'){
            list.append('<li>' + $("label[for='certForm']").text() + '</li>');
        }
        if(site.certVolume == 'no'){
            list.append('<li>' + $("label[for='certVolume']").text() + '</li>');
        }
        if(site.certPhoto == 'no'){
            list.append('<li>' + $("label[for='certPhoto']").text() + '</li>');
        }
        if(site.certStamp == 'no'){
            list.append('<li>' + $("label[for='certStamp']").text() + '</li>');
        }
        if(site.vdotLandUsePermit == 'no'){
            list.append('<li>' + $("label[for='vdotLandUsePermit']").text() + '</li>');
        }
        if(site.truckEnterSign == 'no'){
            list.append('<li>' + $("label[for='truckEnterSign']").text() + '</li>');
        }
        if(site.pipeRiser == 'no'){
            list.append('<li>' + $("label[for='pipeRiser']").text() + '</li>');
        }
        if(site.rpaLimit == 'no'){
            list.append('<li>' + $("label[for='rpaLimit']").text() + '</li>');
        }
    });
           
    $("#btnClear").click(function() {
        $("#generatedComments").empty();
    });

});
