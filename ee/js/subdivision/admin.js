jQuery(document).ready(function(){
    const defaultAdmin = {
        applicantResposibility: true,
        developerResponsibility: true, 
        engineerResponsibility: true,
        planAsShow: true,
        siteInspection: true,
        response: true,
        roadNameLetter: true,
        adjacentNotification: true,
        vsmpCoverage: true,
        planApproval: true,
        wetlandDocument: true,
        vsmpRegistration: true,
        dbpgOffsite: true,
        vdotLandUse: true,
        swpppBooklet: true,
        planSets: true,
        autoCADFile: true,
        flagWetland: true,
        pipeRiser: true,
        bmpMaintenanceFee: true,
        vdotNotification: true,
        comments: ""
    };
    
    var admin = {};
    
    $("#mynav").load("nav.html");

    let tmp = localStorage.getItem('Firstadmin'); 
    if (tmp) {
        Object.assign(admin, JSON.parse(tmp));
    } else {
        Object.assign(admin, defaultAdmin);
    }

    setUI();
    
    $('input[type=checkbox]').change(function(e){
        switch(e.target.id){
            case 'applicantResposibility': admin.applicantResposibility = e.target.checked; break;
            case 'developerResponsibility' : admin.developerResponsibility = e.target.checked; break;
            case 'engineerResponsibility' : admin.engineerResponsibility = e.target.checked; break;
            case 'planAsShow' : admin.planAsShow = e.target.checked; break;
            case 'siteInspection': admin.siteInspection = e.target.checked; break;
            case 'response': admin.response = e.target.checked; break;
            case 'roadNameLetter': admin.roadNameLetter = e.target.checked; break;
            case 'adjacentNotification': admin.adjacentNotification = e.target.checked; break;
            case 'vsmpCoverage': admin.vsmpCoverage = e.target.checked; break;
            case 'planApproval': admin.planApproval = e.target.checked; break;
            case 'wetlandDocument': admin.wetlandDocument = e.target.checked; break;
            case 'vsmpRegistration': admin.vsmpRegistration = e.target.checked; break;
            case 'dbpgOffsite': admin.dbpgOffsite = e.target.checked; break;
            case 'vdotLandUse': admin.vdotLandUse = e.target.checked; break;
            case 'swpppBooklet': admin.swpppBooklet = e.target.checked; break;
            case 'planSets': admin.planSets = e.target.checked; break;
            case 'autoCADFile': admin.autoCADFile = e.target.checked; break;
            case 'flagWetland': admin.flagWetland = e.target.checked; break;
            case 'pipeRiser': admin.pipeRiser = e.target.checked; break;
            case 'bmpMaintenanceFee': admin.bmpMaintenanceFee = e.target.checked; break;
            case 'vdotNotification': admin.vdotNotification = e.target.checked; break;
        }
    });
                                     
    $("#btnReset").click(function() {
        Object.assign(admin, defaultadmin);
        setUI();
    });

    $("#btnSave").click(function() {
        admin.comments = $("#comments").val();
        localStorage.setItem('SubdivisionAdmin', JSON.stringify(admin));
    });

    $("#btnDownload").click(function() {
        download('SubdivisionAdmin.json', JSON.stringify(admin));
    });
                        
    $("#btnUpload").click(function() {
        $("#selectFile").trigger("click");
    });
           
    $("#btnGenerate").click(function() {
        var list = $("#generatedCommentsInput");
        if(list == null) {
            return;
        }
        
        var lines = $('#comments').val().split('\n');
        if(lines.length >=1) {
            $("#inputComment").show();
        }

        for(var i = 0;i < lines.length;i++){
            if(lines[i].length > 0){
                list.append('<li>' + lines[i] + '</li>');
            }
        }        
        
        if(admin.applicantResposibility || 
           admin.developerResponsibility ||
           admin.engineerResponsibility ||
           admin.planAsShow ||
           admin.siteInspection ||
           admin.response) {
            
            $("#standardComment").show();
                        
            list = $("#generatedCommentsStandard");
            if(admin.applicantResposibility){
                list.append('<li>' + $("#applicantResposibility").parent().text() + '</li>');
            }

            if(admin.developerResponsibility){
                list.append('<li>' + $("#developerResponsibility").parent().text() + '</li>');
            }

            if(admin.engineerResponsibility){
                list.append('<li>' + $("#engineerResponsibility").parent().text() + '</li>');
            }

            if(admin.planAsShow) {
                list.append('<li>' + $("#planAsShow").parent().text() + '</li>');
            }

            if(admin.siteInspection) {
                list.append('<li>' + $("#siteInspection").parent().text() + '</li>');
            }

            if(admin.response) {
                list.append('<li>' + $("#response").parent().text() + '</li>');
            }
        }
        
        if(admin.roadNameLetter || admin.adjacentNotification) {
            $("#approvalComment").show();
                        
            list = $("#generatedCommentsApproval");
            if(admin.roadNameLetter) {
                list.append('<li>' + $("#roadNameLetter").parent().text() + '</li>');
            }

            if(admin.adjacentNotification){
                list.append('<li>' + $("#adjacentNotification").parent().text() + '</li>');
            }
        }
        
        $("#ldpComment").show();
        
        list = $("#generatedComments");
        if(admin.vsmpCoverage){
            list.append('<li>' + $("#vsmpCoverage").parent().text() + '</li>');
        }

        if(admin.planApproval){
            list.append('<li>' + $("#planApproval").parent().text() + '</li>');
        }

        if(admin.wetlandDocument){
            list.append('<li>' + $("#wetlandDocument").parent().text() + '</li>');
        }
        
        if(admin.vsmpRegistration){
            list.append('<li>' + $("#vsmpRegistration").parent().text() + '</li>');
        }
        
        if(admin.dbpgOffsite) {
            list.append('<li>' + $("#dbpgOffsite").parent().text() + '</li>');
        }
        
        if(admin.vdotLandUse){
            list.append('<li>' + $("#vdotLandUse").parent().text() + '</li>');
        }
        
        if(admin.swpppBooklet){
            list.append('<li>' + $("#swpppBooklet").parent().text() + '</li>');
        }
        if(admin.planSets){
            list.append('<li>' + $("#planSets").parent().text() + '</li>');
        }
        if(admin.autoCADFile){
            list.append('<li>' + $("#autoCADFile").parent().text() + '</li>');
        }
        if(admin.flagWetland){
            list.append('<li>' + $("#flagWetland").parent().text() + '</li>');
        }
        if(admin.pipeRiser){
            list.append('<li>' + $("#pipeRiser").parent().text() + '</li>');
        }
        
        $("#platComment").show();
        
        list = $("#generatedCommentsPlat");
        if(admin.bmpMaintenanceFee){
            list.append('<li>' +  $("#bmpMaintenanceFee").parent().text() + '</li>');
        }
        if(admin.vdotNotification){
            list.append('<li>' + $("#vdotNotification").parent().text() + '</li>');
        }
    });
           
    $("#btnClear").click(function() {
        $("#inputComment").hide();
        $("#generatedCommentsInput").empty();
        
        $("#standardComment").hide();
        $("#generatedCommentsStandard").empty();
        
        $("#approvalComment").hide();
        $("#generatedCommentsApproval").empty();
        
        $("#ldpComment").hide();
        $("#generatedComments").empty();

        $("#platComment").hide();
        $("#generatedCommentsPlat").empty();
    });
    
    $("#selectFile").change(function(e){
        var reader = new FileReader();
        reader.onload = function(e){
            console.log(e.target.result);
            try {
                var obj = JSON.parse(e.target.result);

                if(obj) {
                    Object.assign(admin, obj);
                    setUI();
                };
            } catch(ex) {
                alert(ex.name + ':' + ex.message);
            };
        };
        reader.readAsText(e.target.files[0]);
    });
    
    function setUI(){
        $("#applicantResposibility").prop('checked', admin.applicantResposibility);
        $("#developerResponsibility").prop('checked', admin.developerResponsibility);
        $("#engineerResponsibility").prop('checked', admin.engineerResponsibility);
        $("#planAsShow").prop('checked', admin.planAsShow);
        $("#siteInspection").prop('checked', admin.siteInspection);
        $("#response").prop('checked', admin.response);
        $("#roadNameLetter").prop('checked', admin.roadNameLetter);
        $("#adjacentNotification").prop('checked', admin.adjacentNotification);
        $("#vsmpCoverage").prop('checked', admin.vsmpCoverage);
        $("#planApproval").prop('checked', admin.planApproval);
        $("#wetlandDocument").prop('checked', admin.wetlandDocument);
        $("#dbpgOffsite").prop('checked', admin.dbpgOffsite);
        $("#vsmpRegistration").prop('checked', admin.vsmpRegistration);
        $("#vdotLandUse").prop('checked', admin.vdotLandUse);
        $("#swpppBooklet").prop('checked', admin.swpppBooklet);
        $("#planSets").prop('checked', admin.planSets);
        $("#autoCADFile").prop('checked', admin.autoCADFile);
        $("#hydrologyOffsite").prop('checked', admin.hydrologyOffsite);
        $("#flagWetland").prop('checked', admin.flagWetland);
        $("#pipeRiser").prop('checked', admin.pipeRiser);
        $("#bmpMaintenanceFee").prop('checked', admin.bmpMaintenanceFee);
        $("#vdotNotification").prop('checked', admin.vdotNotification);
        $("#comments").val(admin.comments);
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
    
