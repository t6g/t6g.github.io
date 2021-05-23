        $( document ).ready(function() {

            $("#mynav").load("nav.html");
            
            $("#chartDIV").load("img/chart.svg", function(){
                updateChart();
            });

            $("#output").load("output.html", function(){
                setValues();
            });

            const circ = new CircularChannel(24, 0.01, 0.05, 0.5);

            let tmp = localStorage.getItem('circ');
            if (tmp) {
                Object.assign(circ, JSON.parse(tmp));
            }
            
            $("#diameter").val((oc.isUSCustomary ? circ.r * oc.ft2in * 2 : circ.r * 1000 * 2).toFixed(0));
            $("#channelSlope").val(circ.cs);
            $("#manningsN").val(circ.mN);
            $("#normalDepth").val(circ.dn.toFixed(2));
            $("#discharge").val(circ.Qn.toFixed(2));

            // unit in select options is inch
            $("#select").change(function(){
                let tmp = $('#select').val();
                let tmpftm = tmp / (oc.isUSCustomary ? 12 : tmp * oc.in2mm / 1000);
                
                if(tmpftm < circ.dn){
                    showMessage($('#warningMessage'), "Selected diameter is less than normal depth. Please adjust normal depth before selecting a small diameter!");
                }
                else {
                    $('#diameter').val(tmp);
                    circ.r = tmpftm / 2;
                    localStorage.setItem('circ', JSON.stringify(circ));
                    $('#discharge').val(circ.Qn.toFixed(2));
                    update();
                }
                           
                $('#select').val('');
                
            });
            
            $("#diameter").change(function(){
                let tmp = parseFloat(this.value);
                let tmpftm = tmp / (oc.isUSCustomary ? 12 : tmp * oc.in2mm / 1000);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#diameter").val((oc.isUSCustomary ? circ.r * 12 * 2 : circ.r * 1000 * 2).toFixed(0));
                }
                else if (tmpftm < circ.dn) {
                    showMessage($('#warningMessage'), "Input diameter is less than normal depth. Please adjust normal depth before selecting a small diameter!");
                    $("#diameter").val((oc.isUSCustomary ? circ.r * 12 * 2 : circ.r * 1000 * 2).toFixed(0));
                } else {
                    circ.r = tmpftm / 2;
                    localStorage.setItem('circ', JSON.stringify(circ));
                    $('#discharge').val(circ.Qn.toFixed(2));
                    update();
                }
            });

            $("#channelSlope").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#channelSlope").val(circ.cs);
                }
                else {
                    circ.cs = tmp;
                    localStorage.setItem('circ', JSON.stringify(circ));
                    $('#discharge').val(circ.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#manningsN").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#manningsN").val(circ.mN);
                }
                else {
                    circ.mN = tmp;
                    localStorage.setItem('circ', JSON.stringify(circ));
                    $('#discharge').val(circ.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#normalDepth").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#normalDepth").val(circ.dn.toFixed(2));
                }
                else if(tmp > 2*circ.r){
                    showMessage($('#warningMessage'), "Input normal depth is greater than diameter. It is not accepted!");
                    $("#normalDepth").val(circ.dn.toFixed(2));
                } else {
                    circ.dn = tmp;
                    localStorage.setItem('circ', JSON.stringify(circ));
                    $('#discharge').val(circ.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#discharge").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#discharge").val(circ.Qn.toFixed(2));
                } else if (tmp > circ.Qmax){
                    showMessage($('#warningMessage'), "Input discharge is greater than capacity. It is not accepted!");
                    $("#discharge").val(circ.Qn.toFixed(2));
                } else {
                    circ.dn = circ.Q2Dn(tmp);
                    localStorage.setItem('circ', JSON.stringify(circ));
                    $("#normalDepth").val(circ.dn.toFixed(2));
                    update();
                }
            });

            function update(){
                setValues();
                updateChart();
            }
            
            function setValues(){
                $("#area").html(circ.an.toFixed(3));
                $("#peri").html(circ.pn.toFixed(3));
                $("#velo").html(circ.vn.toFixed(3));
                $("#dc").html(circ.dc.toFixed(3));
                $("#vc").html(circ.vc.toFixed(3));
                $("#sc").html(circ.sc.toFixed(3));
                $("#fr").html(circ.fr.toFixed(3));
                $("#capacity").html(circ.Qmax.toFixed(3));
                $("#ymax").html(circ.ymax.toFixed(3));
            }

            function updateChart(){

                //drawing 
                var xMin = 0;
                var xMax = 2 * circ.r;
                var yMin = 0;
                var yMax = 2 * circ.r;

                var scaleX = (ocvw.w - ocvw.offsetLeft - ocvw.offsetRight)/ (xMax - xMin);
                var scaleY = (ocvw.h - ocvw.offsetTop - ocvw.offsetBottom) / (yMax - yMin);

                if(scaleX >= scaleY){
                    scaleX = scaleY;
                }
                else{
                    scaleY = scaleX;
                }

                var rxs = circ.r * scaleX;
                var rys = circ.r * scaleY;

                var dxs = 0.5 * (-ocvw.offsetLeft + ocvw.w - ocvw.offsetRight) - rxs; //displacement for x to move circle to the middle

                var x0 = 0;
                var y0 = circ.r;
                var x0s = ocvw.offsetLeft + (x0 - xMin) * scaleX + dxs;
                var y0s = ocvw.h - ocvw.offsetBottom - (y0 - yMin) * scaleY;

                var xnl = circ.r * (1.0 - Math.sin(0.5 * circ.thetan));
                var xnr = circ.r * (1.0 + Math.sin(0.5 * circ.thetan));
                var xnls = ocvw.offsetLeft + (xnl - xMin) * scaleX + dxs;
                var xnrs = ocvw.offsetLeft + (xnr - xMin) * scaleX + dxs;
                var yns = ocvw.h - ocvw.offsetBottom -(circ.dn - yMin) * scaleY;


                var xcl = circ.r * (1.0 - Math.sin(0.5 * circ.thetac));
                var xcr = circ.r * (1.0 + Math.sin(0.5 * circ.thetac));

                var xcls = ocvw.offsetLeft + (xcl - xMin) * scaleX + dxs;
                var xcrs = ocvw.offsetLeft + (xcr - xMin) * scaleX + dxs;
                var ycs = ocvw.h - ocvw.offsetBottom - (circ.dc - yMin) * scaleY;


                $('#pathChan').attr('d', 'M' + x0s + ' ' + y0s + ' a ' + rxs + ' ' + rys + ' 0 1 0 ' + 2.0* rxs + ' 0 ' + ' a ' + rxs + ' ' + rys + ' 0 1 0 -' + 2.0* rxs + ' 0 ');

                $('#pathNorm').attr('d', 'M' + xnls + ' ' + yns + 'L' + xnrs + ' ' + yns);

                $('#pathCrit').attr('d', 'M' + xcls + ' ' + ycs + 'L' + xcrs + ' ' + ycs);
            
                drawGrid(xMin, xMax, yMin, yMax, scaleX, scaleY, 'chart');
            }

        });