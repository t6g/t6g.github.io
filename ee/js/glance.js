jQuery(document).ready(function(){
    const defaultGlance = {
        transmittalLetter: false,
        checklistSubdivision: false, 
        zoningConditions: false,
        hasTentative: true,
        tentativeConditions: false,
        roadNameLetter: false,
        wetlandsConfirmation: false,
        RPADApproval: false,
        embellishmentLetter: false,
        VSMPDocumentation: false,
        complianceEEZoningConditions: false,
        esc: false,
        isVSMP2b: true,
        VRRM: false,
        channelProtection2b: false,
        channelProtection2c: false,
        hydrologyOnsite: false,
        hydrologyOffsite: false,
        profileRoad: false,
        profileDrainage: false,
        stationingROW: false,
        calculationDrainage: false,
        calculationFlood: false,
        scheduleStormSewer: false,
        existingStructures: false,
        CBPACompliance: false,
        streetlights: false,
        comments: ""
    };
    
    var glance = {};
    

    let tmp = localStorage.getItem('FirstGlance'); 
    if (tmp) {
        Object.assign(glance, JSON.parse(tmp));
    } else {
        Object.assign(glance, defaultGlance);
    }
    setUI();
    

    $('input[type=radio][name=hasTentative]').change(function(){
        if(this.value=='yes'){
            $("#listwTentative").show();
            $("#listwoTentative").hide();
            glance.hasTentative = true;
        }
        else if(this.value=='no'){
            $("#listwTentative").hide();
            $("#listwoTentative").show();
            glance.hasTentative = false;
        }
    });

    $('input[type=radio][name=isVSMP2b]').change(function(){
        if(this.value == "yes"){
            $("#listVSMP2b").show();
            $("#listVSMP2c").hide();
            glance.isVSMP2b = true;
        }
        else if(this.value=="no"){
            $("#listVSMP2b").hide();
            $("#listVSMP2c").show();
            glance.isVSMP2b = false;
        }
    });
    
    $('input[type=checkbox]').change(function(e){
        switch(e.target.id){
            case 'transmittalLetter': glance.transmittalLetter = e.target.checked; break;
            case 'checklistSubdivision' : glance.checklistSubdivision = e.target.checked; break;
            case 'zoningConditions' : glance.zoningConditions = e.target.checked; break;
            case 'tentativeConditions': glance.tentativeConditions = e.target.checked; break;
            case 'roadNameLetter': glance.roadNameLetter = e.target.checked; break;
            case 'wetlandsConfirmation': glance.wetlandsConfirmation = e.target.checked; break;
            case 'RPADApproval': glance.RPADApproval = e.target.checked; break;
            case 'embellishmentLetter': glance.embellishmentLetter = e.target.checked; break;
            case 'VSMPDocumentation': glance.VSMPDocumentation = e.target.checked; break;
            case 'complianceEEZoningConditions': glance.complianceEEZoningConditions = e.target.checked; break;
            case 'esc': glance.esc = e.target.checked; break;
            case 'VRRM': glance.VRRM = e.target.checked; break;
            case 'channelProtection2b': glance.channelProtection2b = e.target.checked; break;
            case 'channelProtection2c': glance.channelProtection2c = e.target.checked; break;
            case 'hydrologyOnsite': glance.hydrologyOnsite = e.target.checked; break;
            case 'hydrologyOffsite': glance.hydrologyOffsite = e.target.checked; break;
            case 'profileRoad': glance.profileRoad = e.target.checked; break;
            case 'profileDrainage': glance.profileDrainage = e.target.checked; break;
            case 'stationingROW': glance.stationingROW = e.target.checked; break;
            case 'calculationDrainage': glance.calculationDrainage = e.target.checked; break;
            case 'calculationFlood': glance.calculationFlood = e.target.checked; break;
            case 'scheduleStormSewer': glance.scheduleStormSewer = e.target.checked; break;
            case 'existingStructures': glance.existingStructures = e.target.checked; break;
            case 'CBPACompliance': glance.CBPACompliance = e.target.checked; break;
            case 'streetlights': glance.streetlights = e.target.checked; break;
        }
    });
                                     
    $("#btnReset").click(function() {
        Object.assign(glance, defaultGlance);
        setUI();
    });

    $("#btnSave").click(function() {
        glance.comments = $("#comments").val();
        localStorage.setItem('FirstGlance', JSON.stringify(glance));
    });

    $("#btnDownload").click(function() {
        download('FirstGlance.json', JSON.stringify(glance));
    });
                        
    $("#btnUpload").click(function() {
        $("#selectFile").trigger("click");
    });
           
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
        
        if(!glance.transmittalLetter){
            
            list.append('<li>' + 'Transmittal letter' + '</li>');
        }
        
        if(!glance.checklistSubdivision){
            list.append('<li>' + 'Subdivision design/review checklist' + '</li>');
        }
        
        if(!glance.zoningConditions){
            list.append('<li>' + 'Approved zoning conditions' + '</li>');
        }
        
        if(glance.hasTentative) {
            if(!glance.tentativeConditions){
                list.append('<li>' + 'Approved tentative/preliminary conditions/plats' + '</li>');
            }
        } else {
            if(!glance.roadNameLetter){
                list.append('<li>' + 'PlanRVA road name approval letter' + '</li>');
            }

            if(!glance.wetlandsConfirmation){
                list.append('<li>' + 'COE/DEQ wetlands confirmation' + '</li>');
            }
            if(!glance.RPADApproval){
                list.append('<li>' + 'Water Quality RPAD confirmation' + '</li>');
            }

            if(!glance.embellishmentLetter){
                list.append('<li>' + 'Embellishment letter' + '</li>');
            }
            if(!glance.VSMPDocumentation){
                list.append('<li>' + 'VSMP documentation for part IIB/C technical compliance' + '</li>');
            }
        }
        
        if(!glance.complianceEEZoningConditions){
            list.append('<li>' + 'Compliance with Environmental Zoning Conditions' + '</li>');
        }
        
        if(!glance.esc){
            list.append('<li>' + 'Phased erosion control plan with construction narratives, EC narrative checklist, EC notes, MS-19 table' + '</li>');
        }
        
        if(glance.isVSMP2b) {
            if(!glance.VRRM){
                list.append('<li>' + 'Part IIB VRRM spreadsheet calculations' + '</li>');
            }
            if(!glance.channelProtection2b){
                list.append('<li>' + 'Part IIB Natural channel protection from concentrated stormwater by energy balance or 1% rule' + '</li>');
            }
        } else {
            if(!glance.channelProtection2c){
                list.append('<li>' + 'Part IIC onsite/offsite MS-19 analysis (channel protection) and flood protection on all outfalls and natural drainageways' + '</li>');
            }
        }
        
        if(!glance.esc){
            list.append('<li>' + 'Phased erosion control plan with construction narratives, EC narrative checklist, EC notes, MS-19 table' + '</li>');
        }
        
        if(!glance.hydrologyOnsite){
            list.append('<li>' + 'On-site hydrology/drainage area plan' + '</li>');
        }
        if(!glance.hydrologyOffsite){
            list.append('<li>' + 'Off-site Hydrology/Drainage Area Plan' + '</li>');
        }
        if(!glance.profileRoad){
            list.append('<li>' + 'Profiles of all roads &amp; stub' + '</li>');
        }
        if(!glance.profileDrainage){
            list.append('<li>' + 'Profiles of all drainage easement outfallse' + '</li>');
        }
        if(!glance.stationingROW){
            list.append('<li>' + 'Stationing on plan view of all easements and right-of-way for correlation with profiles' + '</li>');
        }
        if(!glance.calculationDrainage){
            list.append('<li>' + '10/100 year design calculations provided for drainage improvements – culvert, storm sewer, open channel, HGL, pond routing, etc.' + '</li>');
        }
        if(!glance.calculationFlood){
            list.append('<li>' + '100 year backwaters and 100 year floodplains with section locations and elevations shown in plan view' + '</li>');
        }
        if(!glance.scheduleStormSewer){
            list.append('<li>' + 'Drainage structure schedules as applicable on each plan sheet, every pipe segment and inlet assigned structure number' + '</li>');
        }
        if(!glance.existingStructures){
            list.append('<li>' + 'Information on existing structures that affect site, e.g., ‘Existing 24” CMP invert in and out' + '</li>');
        }
        if(!glance.CBPACompliance){
            list.append('<li>' + 'CBPA compliance note on title sheet. Compliance sheets must include wetlands, RPA limits, BMP design, CBPA/MS4 table, etc.' + '</li>');
        }
        if(!glance.streetlights){
            list.append('<li>' + 'A separate, detached plan sheet must be submitted depicting all existing and proposed roads, vehicle counts, and locations of required streetlights as determined under the guidelines of the Chesterfield County Streetlight Policy as it pertains to new development' + '</li>');
        }
    });
           
    $("#btnClear").click(function() {
        $("#generatedComments").empty();
    });
    
    $("#selectFile").change(function(e){
        var reader = new FileReader();
        reader.onload = function(e){
            console.log(e.target.result);
            try {
                var obj = JSON.parse(e.target.result);

                if(obj) {
                    Object.assign(glance, obj);
                    setUI();
                };
            } catch(ex) {
                alert(ex.name + ':' + ex.message);
            };
        };
        reader.readAsText(e.target.files[0]);
    });
    
    function setUI(){
        $("#transmittalLetter").prop('checked', glance.transmittalLetter);
        $("#checklistSubdivision").prop('checked', glance.checklistSubdivision);
        $("#zoningConditions").prop('checked', glance.zoningConditions);
        $("#hasTentativeYes").prop('checked', glance.hasTentative);
        if(glance.hasTentative) {
            $("#listwTentative").show();
            $("#listwoTentative").hide();
        } else {
            $("#hasTentativeNo").prop('checked', true);
            $("#listwTentative").hide();
            $("#listwoTentative").show();
        };
        //$("#hasTentativeNo").prop('checked', !(glance.hasTentative));
        $("#tentativeConditions").prop('checked', glance.tentativeConditions);
        $("#roadNameLetter").prop('checked', glance.roadNameLetter);
        $("#wetlandsConfirmation").prop('checked', glance.wetlandsConfirmation);
        $("#RPADApproval").prop('checked', glance.RPADApproval);
        $("#embellishmentLetter").prop('checked', glance.embellishmentLetter);
        $("#VSMPDocumentation").prop('checked', glance.VSMPDocumentation);
        $("#complianceEEZoningConditions").prop('checked', glance.complianceEEZoningConditions);
        $("#isVSMP2bYes").prop('checked', glance.isVSMP2b);
        if(glance.isVSMP2b) {
            $("#listVSMP2b").show();
            $("#listVSMP2c").hide();
        } else {
            $("#isVSMP2bNo").prop('checked', true);
            $("#listVSMP2b").hide();
            $("#listVSMP2c").show();
        };
        //$("#isVSMP2bNo").prop('checked', !(glance.isVSMP2b));
        $("#esc").prop('checked', glance.esc);
        $("#VRRM").prop('checked', glance.VRRM);
        $("#channelProtection2b").prop('checked', glance.channelProtection2b);
        $("#channelProtection2c").prop('checked', glance.channelProtection2c);
        $("#hydrologyOnsite").prop('checked', glance.hydrologyOnsite);
        $("#hydrologyOffsite").prop('checked', glance.hydrologyOffsite);
        $("#profileRoad").prop('checked', glance.profileRoad);
        $("#profileDrainage").prop('checked', glance.profileDrainage);
        $("#stationingROW").prop('checked', glance.stationingROW);
        $("#calculationDrainage").prop('checked', glance.calculationDrainage);
        $("#calculationFlood").prop('checked', glance.calculationFlood);
        $("#scheduleStormSewer").prop('checked', glance.scheduleStormSewer);
        $("#existingStructures").prop('checked', glance.existingStructures);
        $("#CBPACompliance").prop('checked', glance.CBPACompliance);
        $("#streetlights").prop('checked', glance.streetlights);
        $("#comments").val(glance.comments);
    };
    
});

    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    };
    
