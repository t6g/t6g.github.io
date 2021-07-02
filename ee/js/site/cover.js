jQuery(document).ready(function(){
    const defaultSite = {
        projectName: "Gateway Apartment Homes",
        swppp: "na",
        zoning: "na", 
        feeESC: "na",
        checklist: "na",
        fullProjectName: false,
        latlong: false,
        receivingWaters: false,
        northArrow: false,
        vicinityMap: false,
        planScale: false,
        developer: false,
        revisionDate: false,
        district: false,
        impervious: false,
        engineer: false,
        owner: false
    };
    
    var site = {};
    
    $("#mynav").load("nav.html");

    let tmp = localStorage.getItem('Site'); 
    if (tmp) {
        Object.assign(site, JSON.parse(tmp));
    } else {
        Object.assign(site, defaultSite);
    }
    
    setUI();
    
    $('input[type=checkbox]').change(function(e){
        switch(e.target.id){
            case 'fullProjectName': site.fullProjectName = e.target.checked; break;
            case 'latlong': site.latlong = e.target.checked; break;
            case 'receivingWaters' : site.receivingWaters = e.target.checked; break;
            case 'northArrow': site.northArrow = e.target.checked; break;
            case 'vicinityMap': site.vicinityMap = e.target.checked; break;
            case 'planScale': site.planScale = e.target.checked; break;
            case 'developer': site.developer = e.target.checked; break;
            case 'revisionDate': site.revisionDate = e.target.checked; break;
            case 'district': site.district = e.target.checked; break;
            case 'impervious': site.impervious = e.target.checked; break;
            case 'engineer': site.engineer = e.target.checked; break;
            case 'owner': site.owner = e.target.checked; break;
        };
    });
    
    $('input[type=radio]').change(function(e){
        switch(e.target.name){
            case 'swppp': 
                site.swppp = this.value;
                break;
            case  'zoning':
                site.zoning = this.value;
                break;
            case 'feeESC':
                site.feeESC = this.value;
                break;
            case 'checklist':
                site.checklist = this.value;
                break;
        };
    });
    
                                     
    $("#btnReset").click(function() {
        Object.assign(site, defaultSite);
        setUI();
    });

    $("#btnSave").click(function() {
        site.comments = $("#comments").val();
        localStorage.setItem('Site', JSON.stringify(site));
    });

    $("#btnDownload").click(function() {
        download('site.json', JSON.stringify(site));
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
        
        if(site.swppp == 'no'){
            
            list.append('<li>' + 'Include SWPPP sheet' + '</li>');
        }
        
        if(site.zoning == 'no'){
            list.append('<li>' + 'Provide zoning or Planning Commission approval' + '</li>');
        }
        
        if(site.feeESC == 'no'){
            list.append('<li>' + 'Provide ESC program administration fee' + '</li>');
        }
        
        if(site.checklist == 'no'){
            list.append('<li>' + 'Provide checklist (filled)' + '</li>');
        }
        
        if(!site.fullProjectName){
            list.append('<li>' + 'show project name' + '</li>');
        }
        
        if(!site.latlong){
            list.append('<li>' + 'show latitude and longitude' + '</li>');
        }
        
        if(!site.receivingWaters){
            list.append('<li>' + 'show name of receiving waters' + '</li>');
        }
        
        if(!site.northArrow){
            list.append('<li>' + 'show north arrow' + '</li>');
        }
        if(!site.vicinityMap){
            list.append('<li>' + 'show a vicinity/location map with existing road names' + '</li>');
        }
        if(!site.planScale){
            list.append('<li>' + 'show plan scale' + '</li>');
        }
        if(!site.developer){
            list.append('<li>' + 'show name, walk-in address and telephone number of the owner and developer' + '</li>');
        }
        if(!site.revisionDate){
            list.append('<li>' + 'show the most recent revision date' + '</li>');
        }
        if(!site.district){
            list.append('<li>' + 'show magisterial district' + '</li>');
        }
        if(!site.impervious){
            list.append('<li>' + 'show total on-site impervious area in square feet (excluding paving within the VDOT right-of=way and gravelled areas) broken by phasesand parcels' + '</li>');
        }
        if(!site.engineer){
            list.append('<li>' + 'engineer seal' + '</li>');
        }
        if(site.owner){
            list.append('<li>' + 'For out-of-state owners, the name, "walk-in" address, and telephone number of a local registered agent representing the owner for service of process must be provided prior to issuance of a land disturbance permit' + '</li>');
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

        switch(site.swppp){
            case "yes": 
                $("#SWPPPYes").prop('checked', true);
                break;
            case "no": 
                $("#SWPPPNo").prop('checked', true);
                break;
            case "na": 
                $("#SWPPPNA").prop('checked', true);
                break;
        };
        
        switch(site.zoning){
            case "yes": 
                $("#zoningYes").prop('checked', true);
                break;
            case "no": 
                $("#zoningNo").prop('checked', true);
                break;
            case "na": 
                $("#zoningNA").prop('checked', true);
                break;
        };

        switch(site.feeESC){
            case "yes": 
                $("#feeESCYes").prop('checked', true);
                break;
            case "no": 
                $("#feeESCNo").prop('checked', true);
                break;
            case "na": 
                $("#feeESCNA").prop('checked', true);
                break;
        };
        
        switch(site.checklist){
            case "yes": 
                $("#checklistYes").prop('checked', true);
                break;
            case "no": 
                $("#checklistNo").prop('checked', true);
                break;
            case "na": 
                $("#checklistNA").prop('checked', true);
                break;
        };
        
        $("#fullProjectName").prop('checked', site.fullProjectName);
        $("#latlong").prop('checked', site.latlong);
        $("#receivingWaters").prop('checked', site.receivingWaters);
        $("#northArrow").prop('checked', site.northArrow);
        $("#vicinityMap").prop('checked', site.vicinityMap);
        $("#planScale").prop('checked', site.planScale);
        $("#developer").prop('checked', site.developer);
        $("#revisionDate").prop('checked', site.revisionDate);
        $("#district").prop('checked', site.district);
        $("#impervious").prop('checked', site.impervious);
        $("#engineer").prop('checked', site.engineer);
        $("#owner").prop('checked', site.owner);
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
    
