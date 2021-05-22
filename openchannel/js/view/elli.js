        $( document ).ready(function() {

            $("#mynav").load("nav.html");
            
            $("#chartDIV").load("img/chart.svg", function(){
                updateChart();
            });

            $("#output").load("output.html", function(){
                setValues();
            });

            const elli = new EllipticalChannel(18, 12, 0.01, 0.05, 0.5);

            let tmp = localStorage.getItem('elli');
            if (tmp) {
                Object.assign(elli, JSON.parse(tmp));
            }
            
            $("#span").val((oc.isUSCustomary ? elli.a * oc.ft2in * 2 : elli.a * 2000).toFixed(0));
            $("#rise").val((oc.isUSCustomary ? elli.b * oc.ft2in * 2 : elli.b * 2000).toFixed(0));
            $("#channelSlope").val(elli.cs);
            $("#manningsN").val(elli.mN);
            $("#normalDepth").val(elli.dn.toFixed(2));
            $("#discharge").val(elli.Qn.toFixed(2));

            $("#select").change(function(){
                let tmp = $('#select').val();
                let idx = tmp.indexOf('x');

                //validate
                //span
                let span = tmp.substring(0, idx);
    
                //rise
                let rise = tmp.substring(idx+1);
                let riseftm = oc.isUSCustomary ? rise / oc.ft2in : rise * oc.in2mm / 1000;
                
                if(riseftm < elli.dn){
                    showMessage($('#warningMessage'), "Selected rise is less than normal depth. Please adjust normal depth before selecting a small rise!");
                    $('#select').val('');
                    return;
                }
                
                $('#span').val(oc.isUSCustomary ? span : span * oc.in2mm);
                elli.a = oc.isUSCustomary ? span / 12 / 2 : span * oc.in2mm / 1000 / 2;
                
                $('#rise').val(oc.isUSCustomary ? rise : rise * oc.in2mm);
                elli.b = riseftm / 2;

                localStorage.setItem('elli', JSON.stringify(elli));

                
                $('#discharge').val(elli.Qn.toFixed(2));
                update();

                $('#select').val('');
                
            });
            
            $("#span").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#span").val((oc.isUSCustomary ? elli.a * 12 * 2 : elli.a * 1000 * 2).toFixed(0));
                } else {
                    elli.a = oc.isUSCustomary ? tmp / 12 / 2 : tmp / 1000 / 2;
                    localStorage.setItem('elli', JSON.stringify(elli));
                    $('#discharge').val(elli.Qn.toFixed(2));
                    update();
                }
            });

            $("#rise").change(function(){
                var tmp = parseFloat(this.value);
                
                let riseftm = oc.isUSCustomary ? tmp / oc.ft2in : tmp / 1000;
                
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#rise").val((oc.isUSCustomary ? elli.b * 12 * 2 : elli.b * 1000 * 2).toFixed(0));
                } else if (riseftm < elli.dn){
                    showMessage($('#warningMessage'), "Selected rise is less than normal depth. Please adjust normal depth before selecting a small rise!");
                    $("#rise").val((oc.isUSCustomary ? elli.b * 12 * 2 : elli.b * 1000 * 2).toFixed(0));
                } else {
                    elli.b = oc.isUSCustomary ? tmp / 12 / 2 : tmp / 1000 / 2;
                    localStorage.setItem('elli', JSON.stringify(elli));
                    $('#discharge').val(elli.Qn.toFixed(2));
                    update();
                }
            });


            $("#channelSlope").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#channelSlope").val(elli.cs);
                }
                else {
                    elli.cs = tmp;
                    localStorage.setItem('elli', JSON.stringify(elli));
                    $('#discharge').val(elli.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#manningsN").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#manningsN").val(elli.mN);
                }
                else {
                    elli.mN = tmp;
                    localStorage.setItem('elli', JSON.stringify(elli));
                    $('#discharge').val(elli.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#normalDepth").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#normalDepth").val(elli.dn.toFixed(2));
                } else if (tmp > 2*elli.b){
                    showMessage($('#warningMessage'), "Input normal depth is greater than diameter. It is not accepted!");
                    $("#normalDepth").val(circ.dn.toFixed(2));
                } else {
                    elli.dn = tmp;
                    localStorage.setItem('elli', JSON.stringify(elli));
                    $('#discharge').val(elli.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#discharge").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#discharge").val(elli.Qn.toFixed(2));
                }
                else if (tmp > elli.Qmax) {
                    showMessage($('#warningMessage'), "Input discharge is greater than capacity. It is not accepted!");
                    $("#discharge").val(elli.Qn.toFixed(2));
                } else {
                    elli.dn = elli.Q2Dn(tmp);
                    localStorage.setItem('elli', JSON.stringify(elli));
                    $("#normalDepth").val(elli.dn.toFixed(2));
                    update();
                }
            });

            function update(){
                setValues();
                updateChart();
            }
            
            function setValues(){
                $("#area").html(elli.an.toFixed(3));
                $("#peri").html(elli.pn.toFixed(3));
                $("#velo").html(elli.vn.toFixed(3));
                $("#dc").html(elli.dc.toFixed(3));
                $("#vc").html(elli.vc.toFixed(3));
                $("#sc").html(elli.sc.toFixed(3));
                $("#fr").html(elli.fr.toFixed(3));
                $("#capacity").html(elli.Qmax.toFixed(3));
                $("#ymax").html(elli.ymax.toFixed(3));
            }

            function updateChart(){

                //drawing 
                var xMin = 0;
                var xMax = 2 * elli.a;
                var yMin = 0;
                var yMax = 2 * elli.b;

                var scaleX = (ocvw.w - oc.offsetLeft - oc.offsetRight)/ (xMax - xMin);
                var scaleY = (ocvw.h - oc.offsetTop - oc.offsetBottom) / (yMax - yMin);

                if(scaleX >= scaleY){
                    scaleX = scaleY;
                }
                else{
                    scaleY = scaleX;
                }

                var rxs = elli.a * scaleX;
                var rys = elli.b * scaleY;

                var dxs = 0.5 * (-oc.offsetLeft + ocvw.w - oc.offsetRight) - rxs; //displacement for x to move ellile to the middle

                var x0 = 0;
                var y0 = elli.b;
                var x0s = oc.offsetLeft + (x0 - xMin) * scaleX + dxs;
                var y0s = ocvw.h - oc.offsetBottom - (y0 - yMin) * scaleY;

                var xnl = elli.a * (1.0 - Math.sin(elli.alphan));
                var xnr = elli.a * (1.0 + Math.sin(elli.alphan));
                var xnls = oc.offsetLeft + (xnl - xMin) * scaleX + dxs;
                var xnrs = oc.offsetLeft + (xnr - xMin) * scaleX + dxs;
                var yns = ocvw.h - oc.offsetBottom -(elli.dn - yMin) * scaleY;


                var xcl = elli.a * (1.0 - Math.sin(elli.alphac));
                var xcr = elli.a * (1.0 + Math.sin(elli.alphac));
                var xcls = oc.offsetLeft + (xcl - xMin) * scaleX + dxs;
                var xcrs = oc.offsetLeft + (xcr - xMin) * scaleX + dxs;
                var ycs = ocvw.h - oc.offsetBottom - (elli.dc - yMin) * scaleY;

                $('#pathChan').attr('d', 'M' + x0s + ' ' + y0s + ' a ' + rxs + ' ' + rys + ' 0 1 0 ' + 2.0* rxs + ' 0 ' + ' a ' + rxs + ' ' + rys + ' 0 1 0 -' + 2.0* rxs + ' 0 ');

                $('#pathNorm').attr('d', 'M' + xnls + ' ' + yns + 'L' + xnrs + ' ' + yns);

                $('#pathCrit').attr('d', 'M' + xcls + ' ' + ycs + 'L' + xcrs + ' ' + ycs);
            
                drawGrid(xMin, xMax, yMin, yMax, scaleX, scaleY);
            }

        });