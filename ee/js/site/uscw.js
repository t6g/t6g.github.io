jQuery(document).ready(function(){
    const defaultUSCW = {
        bmpFeeImpervious: "na",
        bmpFeeCondo: "na",
        redevNoBMP: "na",
        tableCBPAMS4: "na",
        moreESC: "na",
        enhancedBMP: "na",
        utilityRelocation: "na",
        escInspection: "na",
        setback: "na",
        alternativeCurbGutter: "na",
        bmpCounty: "na",
        bmpGeotech: "na",
        bmpObsTest: "na",
        damCompacted: "na",
        soilSubgrade: "na",
        soilCompaction: "na",
        reinforcement: "na",
        bmpCertify: "na",
        nameGeotech: "na",
        aerator: "na",
    };

    var site = {};
    
    $("#mynav").load("nav.html");

    let tmp = localStorage.getItem('Site'); 
    if (tmp) {
        Object.assign(site, JSON.parse(tmp));
    } else {
        Object.assign(site, defaultUSCW);
    }
    
    setUI();
    
    $('input[type=radio]').change(function(e){
        switch(e.target.name){
            case 'bmpFeeImpervious': site.bmpFeeImpervious = this.value; break;
            case 'bmpFeeCondo': site.bmpFeeCondo = this.value; break;
            case 'redevNoBMP': site.redevNoBMP = this.value; break;
            case 'tableCBPAMS4': site.tableCBPAMS4 = this.value; break;
            case 'moreESC': site.moreESC = this.value; break;
            case 'enhancedBMP': site.enhancedBMP = this.value; break;
            case 'utilityRelocation': site.utilityRelocation = this.value; break;
            case 'escInspection': site.escInspection = this.value; break;
            case 'setback': site.setback = this.value; break;
            case 'alternativeCurbGutter': site.alternativeCurbGutter = this.value; break;
            case 'bmpCounty': site.bmpCounty = this.value; break;
            case 'bmpGeotech': site.bmpGeotech = this.value; break;
            case 'bmpObsTest': site.bmpObsTest = this.value; break;
            case 'damCompacted': site.damCompacted = this.value; break;
            case 'soilSubgrade': site.soilSubgrade = this.value; break;
            case 'soilCompaction': site.soilCompaction = this.value; break;
            case 'reinforcement': site.reinforcement = this.value; break;
            case 'bmpCertify': site.bmpCertify = this.value; break;
            case 'nameGeotech': site.nameGeotech = this.value; break;
            case 'aerator': site.aerator = this.value; break;
        };
    });
    
    function setUI(){
        switch(site.bmpFeeImpervious){
            case "yes": 
                $("#bmpFeeImperviousYes").prop('checked', true);
                break;
            case "no": 
                $("#bmpFeeImperviousNo").prop('checked', true);
                break;
            case "na": 
                $("#bmpFeeImperviousNA").prop('checked', true);
                break;
        };
        
        switch(site.bmpFeeCondo){
            case "yes": 
                $("#bmpFeeCondoYes").prop('checked', true);
                break;
            case "no": 
                $("#bmpFeeCondoNo").prop('checked', true);
                break;
            case "na": 
                $("#bmpFeeCondoNA").prop('checked', true);
                break;
        };
        
        switch(site.redevNoBMP){
            case "yes": 
                $("#redevNoBMPYes").prop('checked', true);
                break;
            case "no": 
                $("#redevNoBMPNo").prop('checked', true);
                break;
            case "na": 
                $("#redevNoBMPNA").prop('checked', true);
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
        
       switch(site.enhancedBMP){
            case "yes": 
                $("#enhancedBMPYes").prop('checked', true);
                break;
            case "no": 
                $("#enhancedBMPNo").prop('checked', true);
                break;
            case "na": 
                $("#enhancedBMPNA").prop('checked', true);
                break;
        };
        
       switch(site.utilityRelocation){
            case "yes": 
                $("#utilityRelocationYes").prop('checked', true);
                break;
            case "no": 
                $("#utilityRelocationNo").prop('checked', true);
                break;
            case "na": 
                $("#utilityRelocationNA").prop('checked', true);
                break;
        };
        
       switch(site.escInspection){
            case "yes": 
                $("#escInspectionYes").prop('checked', true);
                break;
            case "no": 
                $("#escInspectionNo").prop('checked', true);
                break;
            case "na": 
                $("#escInspectionNA").prop('checked', true);
                break;
        };
        
       switch(site.setback){
            case "yes": 
                $("#setbackYes").prop('checked', true);
                break;
            case "no": 
                $("#setbackNo").prop('checked', true);
                break;
            case "na": 
                $("#setbackNA").prop('checked', true);
                break;
        };
        
        switch(site.alternativeCurbGutter){
            case "yes": 
                $("#alternativeCurbGutterYes").prop('checked', true);
                break;
            case "no": 
                $("#alternativeCurbGutterNo").prop('checked', true);
                break;
            case "na": 
                $("#alternativeCurbGutterNA").prop('checked', true);
                break;
        };
        
        switch(site.bmpCounty){
            case "yes": 
                $("#bmpCountyYes").prop('checked', true);
                break;
            case "no": 
                $("#bmpCountyNo").prop('checked', true);
                break;
            case "na": 
                $("#bmpCountyNA").prop('checked', true);
                break;
        };

        switch(site.bmpGeotech){
            case "yes": 
                $("#bmpGeotechYes").prop('checked', true);
                break;
            case "no": 
                $("#bmpGeotechNo").prop('checked', true);
                break;
            case "na": 
                $("#bmpGeotechNA").prop('checked', true);
                break;
        };

        switch(site.bmpObsTest){
            case "yes": 
                $("#bmpObsTestYes").prop('checked', true);
                break;
            case "no": 
                $("#bmpObsTestNo").prop('checked', true);
                break;
            case "na": 
                $("#bmpObsTestNA").prop('checked', true);
                break;
        };
        
        switch(site.damCompacted){
            case "yes": 
                $("#damCompactedYes").prop('checked', true);
                break;
            case "no": 
                $("#damCompactedNo").prop('checked', true);
                break;
            case "na": 
                $("#damCompactedNA").prop('checked', true);
                break;
        };
        
        switch(site.soilSubgrade){
            case "yes": 
                $("#soilSubgradeYes").prop('checked', true);
                break;
            case "no": 
                $("#soilSubgradeNo").prop('checked', true);
                break;
            case "na": 
                $("#soilSubgradeNA").prop('checked', true);
                break;
        };
        
        switch(site.soilCompaction){
            case "yes": 
                $("#soilCompactionYes").prop('checked', true);
                break;
            case "no": 
                $("#soilCompactionNo").prop('checked', true);
                break;
            case "na": 
                $("#soilCompactionNA").prop('checked', true);
                break;
        };
        
        switch(site.reinforcement){
            case "yes": 
                $("#reinforcementYes").prop('checked', true);
                break;
            case "no": 
                $("#reinforcementNo").prop('checked', true);
                break;
            case "na": 
                $("#reinforcementNA").prop('checked', true);
                break;
        };
        
        switch(site.bmpCertify){
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

        switch(site.nameGeotech){
            case "yes": 
                $("#nameGeotechYes").prop('checked', true);
                break;
            case "no": 
                $("#nameGeotechNo").prop('checked', true);
                break;
            case "na": 
                $("#nameGeotechNA").prop('checked', true);
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
        
        if(site.bmpFeeImpervious == 'no'){
            list.append('<li>' + $("label[for='bmpFeeImpervious']").text() + '</li>');
        }

        if(site.bmpFeeCondo == 'no'){
            list.append('<li>' + $("label[for='bmpFeeCondo']").text() + '</li>');
        }

        if(site.redevNoBMP == 'no'){
            list.append('<li>' + $("label[for='redevNoBMP']").text() + '</li>');
        }

        if(site.tableCBPAMS4 == 'no'){
            list.append('<li>' + $("label[for='tableCBPAMS4']").text() + '</li>');
        }

        if(site.moreESC == 'no'){
            list.append('<li>' + $("label[for='moreESC']").text() + '</li>');
        }

        if(site.enhancedBMP == 'no'){
            list.append('<li>' + $("label[for='enhancedBMP']").text() + '</li>');
        }

        if(site.utilityRelocation == 'no'){
            list.append('<li>' + $("label[for='utilityRelocation']").text() + '</li>');
        }

        if(site.escInspection == 'no'){
            list.append('<li>' + $("label[for='escInspection']").text() + '</li>');
        }

        if(site.setback == 'no'){
            list.append('<li>' + $("label[for='setback']").text() + '</li>');
        }

        if(site.alternativeCurbGutter == 'no'){
            list.append('<li>' + $("label[for='alternativeCurbGutter']").text() + '</li>');
        }


        if(site.bmpCounty == 'no'){
            list.append('<li>' + $("label[for='bmpCounty']").text() + '</li>');
        }

        if(site.bmpGeotech == 'no'){
            list.append('<li>' + $("label[for='bmpGeotech']").text() + '</li>');
        }

        if(site.bmpObsTest == 'no'){
            list.append('<li>' + $("label[for='bmpObsTest']").text() + '</li>');
        }

        if(site.damCompacted == 'no'){
            list.append('<li>' + $("label[for='damCompacted']").text() + '</li>');
        }

        if(site.soilSubgrade == 'no'){
            list.append('<li>' + $("label[for='soilSubgrade']").text() + '</li>');
        }

        if(site.soilCompaction == 'no'){
            list.append('<li>' + $("label[for='soilCompaction']").text() + '</li>');
        }

        if(site.reinforcement == 'no'){
            list.append('<li>' + $("label[for='reinforcement']").text() + '</li>');
        }

        if(site.bmpCertify == 'no'){
            list.append('<li>' + $("label[for='bmpCertify']").text() + '</li>');
        }

        if(site.nameGeotech == 'no'){
            list.append('<li>' + $("label[for='nameGeotech']").text() + '</li>');
        }

        if(site.aerator == 'no'){
            list.append('<li>' + $("label[for='aerator']").text() + '</li>');
        }

    });
           
    $("#btnClear").click(function() {
        $("#generatedComments").empty();
    });
});
