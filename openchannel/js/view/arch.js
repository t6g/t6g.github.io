        $( document ).ready(function() {

            $("#mynav").load("nav.html");
            
            $("#chartDIV").load("img/chart.svg", function(){
                updateChart();
            });

            $("#output").load("output.html", function(){
                setValues();
            });

            const arch = new ArchChannel(15.25, 4.91667, 1.25, 6.0, 0.01, 0.013, 0.5);
            let tmp = localStorage.getItem('arch');
            if (tmp) {
                Object.assign(arch, JSON.parse(tmp));
            }
            
            
            $("#rb").val((oc.isUSCustomary ? arch.rb * oc.ft2in : arch.rb * 1000).toFixed(0));
            $("#rt").val((oc.isUSCustomary ? arch.rt * oc.ft2in : arch.rt * 1000).toFixed(0));
            $("#rc").val((oc.isUSCustomary ? arch.rc * oc.ft2in : arch.rc * 1000).toFixed(0));
            $("#rise").val((oc.isUSCustomary ? arch.rise * oc.ft2in : arch.rise * 1000).toFixed(0));
            $("#channelSlope").val(arch.cs);
            $("#manningsN").val(arch.mN);
            $("#normalDepth").val(arch.dn.toFixed(2));
            $("#discharge").val(arch.Qn.toFixed(2));

            $("#select").change(function(){
                let tmp = $('#select').val();
                let vals = tmp.split(',');
                let rb = parseFloat(vals[0]);
                let rt = parseFloat(vals[1]);
                let rc = parseFloat(vals[2]);
                let rise = parseFloat(vals[3]);

                //validate
                let riseftm = oc.isUSCustomary ? rise / oc.ft2in : rise * oc.in2mm / 1000;

                if(riseftm < arch.dn){
                    showMessage($('#warningMessage'), "Selected rise is less than normal depth. Please adjust normal depth before selecting a small rise!");
                    $('#select').val('');
                    return;
                }
                
                $('#rb').val(oc.isUSCustomary ? rb : rb * oc.in2mm);
                arch.rb = oc.isUSCustomary ? rb / oc.ft2in : rb * oc.in2mm / 1000;
                
                $('#rt').val(oc.isUSCustomary ? rt : rt * oc.in2mm);
                arch.rt = oc.isUSCustomary ? rt / oc.ft2in : rt * oc.in2mm / 1000;
                
                $('#rc').val(oc.isUSCustomary ? rc : rc * oc.in2mm);
                arch.rc = oc.isUSCustomary ? rc / oc.ft2in : rc * oc.in2mm / 1000;
                
                $('#rise').val(oc.isUSCustomary ? rise : rise * oc.in2mm);
                arch.rise = riseftm;

                localStorage.setItem('arch', JSON.stringify(arch));
                
                $('#discharge').val(arch.Qn.toFixed(2));
                update();

                $('#select').val('');
                
            });
            
            $("#rb").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#rb").val((oc.isUSCustomary ? arch.rb * oc.ft2in : arch.rb * 1000).toFixed(0));
                } else {
                    arch.rb = oc.isUSCustomary ? tmp / oc.ft2in : tmp / 1000;
                    localStorage.setItem('arch', JSON.stringify(arch));
                    $('#discharge').val(arch.Qn.toFixed(2));
                    update();
                }
            });

            $("#rt").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#rt").val((oc.isUSCustomary ? arch.rt * oc.ft2in : arch.rt * 1000).toFixed(0));
                } else {
                    arch.rt = oc.isUSCustomary ? tmp / oc.ft2in : tmp / 1000;
                    localStorage.setItem('arch', JSON.stringify(arch));
                    $('#discharge').val(arch.Qn.toFixed(2));
                    update();
                }
            });

            $("#rc").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#rc").val((oc.isUSCustomary ? arch.rc * oc.ft2in : arch.rc * 1000).toFixed(0));
                } else {
                    arch.rc = oc.isUSCustomary ? tmp / oc.ft2in : tmp / 1000;
                    localStorage.setItem('arch', JSON.stringify(arch));
                    $('#discharge').val(arch.Qn.toFixed(2));
                    update();
                }
            });


            $("#rise").change(function(){
                var tmp = parseFloat(this.value);
                
                let riseftm = oc.isUSCustomary ? tmp / oc.ft2in : tmp / 1000;
                
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#rise").val((oc.isUSCustomary ? arch.rise * oc.ft2in : arch.b * 1000).toFixed(0));
                } else if (riseftm < arch.dn){
                    showMessage($('#warningMessage'), "Selected rise is less than normal depth. Please adjust normal depth before selecting a small rise!");
                    $("#rise").val((oc.isUSCustomary ? arch.rise * oc.ft2in : arch.b * 1000).toFixed(0));
                } else {
                    arch.rise = oc.isUSCustomary ? tmp / ocvw.ft2in : tmp / 1000;
                    localStorage.setItem('arch', JSON.stringify(arch));
                    $('#discharge').val(arch.Qn.toFixed(2));
                    update();
                }
            });


            $("#channelSlope").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#channelSlope").val(arch.cs);
                }
                else {
                    arch.cs = tmp;
                    localStorage.setItem('arch', JSON.stringify(arch));
                    $('#discharge').val(arch.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#manningsN").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#manningsN").val(arch.mN);
                }
                else {
                    arch.mN = tmp;
                    localStorage.setItem('arch', JSON.stringify(arch));
                    $('#discharge').val(arch.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#normalDepth").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#normalDepth").val(arch.dn.toFixed(2));
                } else if (tmp > 2*arch.b){
                    showMessage($('#warningMessage'), "Input normal depth is greater than diameter. It is not accepted!");
                    $("#normalDepth").val(circ.dn.toFixed(2));
                } else {
                    arch.dn = tmp;
                    localStorage.setItem('arch', JSON.stringify(arch));
                    $('#discharge').val(arch.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#discharge").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#discharge").val(arch.Qn.toFixed(2));
                }
                else if (tmp > arch.Qmax) {
                    showMessage($('#warningMessage'), "Input discharge is greater than capacity. It is not accepted!");
                    $("#discharge").val(arch.Qn.toFixed(2));
                } else {
                    arch.dn = arch.Q2Dn(tmp);
                    localStorage.setItem('arch', JSON.stringify(arch));
                    $("#normalDepth").val(arch.dn.toFixed(2));
                    update();
                }
            });

            function update(){
                setValues();
                updateChart();
            }
            
            function setValues(){
                $("#area").html(arch.an.toFixed(3));
                $("#peri").html(arch.pn.toFixed(3));
                $("#velo").html(arch.vn.toFixed(3));
                $("#dc").html(arch.dc.toFixed(3));
                $("#vc").html(arch.vc.toFixed(3));
                $("#sc").html(arch.sc.toFixed(3));
                $("#fr").html(arch.fr.toFixed(3));
                $("#capacity").html(arch.Qmax.toFixed(3));
                $("#ymax").html(arch.ymax.toFixed(3));
            }

            function updateChart(){

    //drawing 
    var xMin = 0;
    let xF = arch.XF;
    var xMax = 2.0 * xF;
    var yMin = 0;
    var yMax = arch.rise;

                var scaleX = (ocvw.w - ocvw.offsetLeft - ocvw.offsetRight)/ (xMax - xMin);
                var scaleY = (ocvw.h - ocvw.offsetTop - ocvw.offsetBottom) / (yMax - yMin);

                if(scaleX >= scaleY){
                    scaleX = scaleY;
                }
                else{
                    scaleY = scaleX;
                }
                
                //displacement for x to move archle to the middle
                var dxs = 0.5 * (-ocvw.offsetLeft + ocvw.w - ocvw.offsetRight);

    // draw arch 
    var Theta = arch.Theta;
    var Phi = arch.Phi;
    var th = Theta / Math.PI * 180.0;
    var ph = Phi / Math.PI * 180.0;
    
    var xE = arch.XE;
    var yE = arch.YE;
    var xEs = ocvw.offsetLeft + (xE - xMin) * scaleX + dxs;
    var xEns = ocvw.offsetLeft + (-xE - xMin) * scaleX + dxs;
    var yEs = ocvw.h - ocvw.offsetBottom - (yE - yMin) * scaleY;
    var rbxs = arch.rb * scaleX;
    var rbys = arch.rb * scaleY;
    
    var xG = arch.XG;
    var yG = arch.YG;
    var xGs = ocvw.offsetLeft + (xG - xMin) * scaleX + dxs;
    var xGns = ocvw.offsetLeft + (-xG - xMin) * scaleX + dxs;
    var yGs = ocvw.h - ocvw.offsetBottom - (yG - yMin) * scaleY;
    var rcxs = arch.rc * scaleX;
    var rcys = arch.rc * scaleY;
    
    var rtxs = arch.rt * scaleX;
    var rtys = arch.rt * scaleY;
    
    //normal water surface
    var xnr = arch.y2x(arch.dn, arch.rb, arch.rt, arch.rc, arch.rise);
    var xnl = -xnr;
    var xnls = ocvw.offsetLeft + (xnl - xMin) * scaleX + dxs;
    var xnrs = ocvw.offsetLeft + (xnr - xMin) * scaleX + dxs;
    var yns = ocvw.h - ocvw.offsetBottom -(arch.dn - yMin) * scaleY;

    //critical water surface
    var xcr = arch.y2x(arch.dc, arch.rb, arch.rt, arch.rc, arch.rise);
    var xcl = -xcr;
    var xcls = ocvw.offsetLeft + (xcl - xMin) * scaleX + dxs;
    var xcrs = ocvw.offsetLeft + (xcr - xMin) * scaleX + dxs;
    var ycs = ocvw.h - ocvw.offsetBottom - (arch.dc - yMin) * scaleY;

                $('#pathChan').attr('d', 'M ' + xEs + ' ' + yEs + 
                                                     ' A ' + rbxs + ' ' + rbys + ' ' + (2*th) + ' 0 1 ' + xEns + ' ' + yEs + 
                                                     ' A ' + rcxs + ' ' + rcys + ' ' + (180 - th - ph) + ' 0 1 ' + xGns + ' ' + yGs + 
                                                     ' A ' + rtxs + ' ' + rtys + ' ' + (2*ph) + ' 0 1 ' + xGs + ' ' + yGs + 
                                                     ' A ' + rcxs + ' ' + rcys + ' ' + (180 - th - ph) + ' 0 1 ' + xEs + ' ' + yEs);

                $('#pathNorm').attr('d', 'M' + xnls + ' ' + yns + 'L' + xnrs + ' ' + yns);

                $('#pathCrit').attr('d', 'M' + xcls + ' ' + ycs + 'L' + xcrs + ' ' + ycs);
            
                drawGrid(xMin, xMax, yMin, yMax, scaleX, scaleY, 'chart');

    //draw and label rb
    var xB = arch.rb * Math.sin(0.5 * Theta);
    var yB = arch.rb * (1.0 - Math.cos(0.5 * Theta));
    var xO = (arch.rb - 0.4 * arch.rise) * Math.sin(0.5 * Theta);
    var yO = arch.rb - (arch.rb - 0.4 * arch.rise) * Math.cos(0.5 * Theta);

    var xBs = ocvw.offsetLeft + (xB - xMin) * scaleX + dxs;
    var yBs = ocvw.h - ocvw.offsetBottom - (yB - yMin) * scaleY;
    var xOs = ocvw.offsetLeft + (xO - xMin) * scaleX + dxs;
    var yOs = ocvw.h - ocvw.offsetBottom - (yO - yMin) * scaleY;
 
    $('#pathRb').attr('d', 'M' + xOs + ' ' + yOs + 'L' + xBs + ' ' + yBs);
    
    var RbLeft = ocvw.offsetLeft + (0.5 * (xB + xO) - xMin) * scaleX + dxs + 2;
    var RbTop = ocvw.h - ocvw.offsetBottom - (0.5 * (yB + yO) - yMin) * scaleY - 10;
    $('#rbLabel').attr("x", RbLeft);
    $('#rbLabel').attr("y", RbTop);

    //draw and label rt
    var xT = arch.rt * Math.sin(0.5 * Phi);
    var yT = arch.rise - arch.rt + arch.rt * Math.cos(0.5 * Phi);
        xO = 0.6 * xT;
        yO = arch.rise - arch.rt + 0.6 * arch.rt * Math.cos(0.5 * Phi);
    var xTs = ocvw.offsetLeft + (xT - xMin) * scaleX + dxs;
    var yTs = ocvw.h - ocvw.offsetBottom - (yT - yMin) * scaleY;
    var xOs = ocvw.offsetLeft + (xO - xMin) * scaleX + dxs;
    var yOs = ocvw.h - ocvw.offsetBottom - (yO - yMin) * scaleY;
 
    $('#pathRt').attr('d', 'M' + xOs + ' ' + yOs + 'L' + xTs + ' ' + yTs);

    var RtLeft = ocvw.offsetLeft + (0.5 * (xT + xO) - xMin) * scaleX + dxs ;
    var RtTop = ocvw.h - ocvw.offsetBottom - (0.5 * (yT + yO) - yMin) * scaleY;

    $('#rtLabel').attr("x", RtLeft);
    $('#rtLabel').attr("y", RtTop);

    //draw and label rc
    var xC = arch.XD + arch.rc * Math.sin(Math.PI / 4.0);
    var yC = arch.YD - arch.rc * Math.cos(Math.PI / 4.0);
    var xCs = ocvw.offsetLeft + (xC - xMin) * scaleX + dxs;
    var yCs = ocvw.h - ocvw.offsetBottom - (yC - yMin) * scaleY;
    var xDs = ocvw.offsetLeft + (arch.XD - xMin) * scaleX + dxs;
    var yDs = ocvw.h - ocvw.offsetBottom - (arch.YD - yMin) * scaleY;

    $('#pathRc').attr('d', 'M' + xDs + ' ' + yDs + 'L' + xCs + ' ' + yCs);

    var RcLeft = ocvw.offsetLeft + (0.5 * (xC + arch.XD) - xMin) * scaleX + dxs ;
    var RcTop = ocvw.h - ocvw.offsetBottom - (0.5 * (yC + arch.YD) - yMin) * scaleY - 15;
    $('#rcLabel').attr("x", RcLeft);
    $('#rcLabel').attr("y", RcTop);            
            }


        });