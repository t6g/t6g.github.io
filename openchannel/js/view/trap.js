        $( document ).ready(function() {

            $("#mynav").load("nav.html");
            
            $("#chartDIV").load("img/chart.svg", function(){
                updateChart();
            });

            $("#output").load("output.html", function(){
                setValues();
            });

            const trap = new TrapezoidalChannel(3, 1, 3, 0.01, 0.05, 0.5);

            let tmp = localStorage.getItem('trap');
            if (tmp) {
                Object.assign(trap, JSON.parse(tmp));
            }
            
            $("#leftSideSlope").val(trap.z1);
            $("#bottomWidth").val(trap.b);
            $("#rightSideSlope").val(trap.z2);
            $("#channelSlope").val(trap.cs);
            $("#manningsN").val(trap.mN);
            $("#normalDepth").val(trap.dn.toFixed(2));
            $("#discharge").val(trap.Qn.toFixed(2));

            $("#leftSideSlope").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#leftSideSlope").val(trap.z1);
                }
                else {
                    trap.z1 = tmp;
                    localStorage.setItem('trap', JSON.stringify(trap));
                    $('#discharge').val(trap.Qn.toFixed(2));
                    update();
                }
            });

            $("#bottomWidth").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#bottomWidth").val(trap.b);
                }
                else {
                    trap.b = tmp;
                    localStorage.setItem('trap', JSON.stringify(trap));
                    $('#discharge').val(trap.Qn.toFixed(2));
                    update();
                }
            });


            $("#rightSideSlope").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#rightSideSlope").val(trap.z2);
                }
                else {
                    trap.z2 = tmp;
                    localStorage.setItem('trap', JSON.stringify(trap));
                    $('#discharge').val(trap.Qn.toFixed(2));
                    update();
                }
            });

            $("#channelSlope").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                }
                else {
                    trap.cs = tmp;
                    localStorage.setItem('trap', JSON.stringify(trap));
                    $('#discharge').val(trap.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#manningsN").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                }
                else {
                    trap.mN = tmp;
                    localStorage.setItem('trap', JSON.stringify(trap));
                    $('#discharge').val(trap.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#normalDepth").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                }
                else {
                    trap.dn = tmp;
                    localStorage.setItem('trap', JSON.stringify(trap));
                    $('#discharge').val(trap.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#discharge").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                }
                else {
                    trap.dn = trap.Q2Dn(tmp);
                    localStorage.setItem('trap', JSON.stringify(trap));
                    $("#normalDepth").val(trap.dn.toFixed(2));
                    update();
                }
            });

            function update(){
                setValues();
                updateChart();
            }
            
            function setValues(){
                $("#area").html(trap.an.toFixed(3));
                $("#peri").html(trap.pn.toFixed(3));
                $("#velo").html(trap.vn.toFixed(3));
                $("#dc").html(trap.dc.toFixed(3));
                $("#vc").html(trap.vc.toFixed(3));
                $("#sc").html(trap.sc.toFixed(3));
                $("#fr").html(trap.fr.toFixed(3));
            }

            function updateChart(){

                //drawing 
                var xMin = 0;
                var xMax = trap.depth * (trap.z1 + trap.z2) + trap.b;
                var yMin = 0;
                var yMax = trap.depth;

                var scaleX = (ocvw.w - ocvw.offsetLeft - ocvw.offsetRight)/ (xMax - xMin);
                var scaleY = (ocvw.h - ocvw.offsetTop - ocvw.offsetBottom) / (yMax - yMin);

                var x0 = 0.0;
                var y0 = trap.depth;
                var x0s = ocvw.offsetLeft + (x0 - xMin) * scaleX;
                var y0s = ocvw.h - ocvw.offsetBottom - (y0 - yMin) * scaleY;

                var x1 = trap.depth * trap.z1;
                var y1 = 0;
                var x1s = ocvw.offsetLeft + (x1 - xMin) * scaleX;
                var y1s = ocvw.h - ocvw.offsetBottom - (y1 - yMin) * scaleY;

                var x2 = trap.depth * trap.z1 + trap.b;
                var x2s = ocvw.offsetLeft + (x2 - xMin) * scaleX;

                var x3 = trap.depth * (trap.z1 + trap.z2) + trap.b;
                var x3s = ocvw.offsetLeft + (x3 - xMin) * scaleX;

                var xnl = (trap.depth - trap.dn) * trap.z1;
                var xnr = trap.depth * trap.z1 + trap.b + trap.dn * trap.z2;
                var xnls = ocvw.offsetLeft + (xnl - xMin) * scaleX;
                var xnrs = ocvw.offsetLeft + (xnr - xMin) * scaleX;
                var yns = ocvw.h - ocvw.offsetBottom -(trap.dn - yMin) * scaleY;


                var xcl = (trap.depth - trap.dc) * trap.z1;
                var xcr = trap.depth * trap.z1 + trap.b + trap.dc * trap.z2;
                var xcls = ocvw.offsetLeft + (xcl - xMin) * scaleX;
                var xcrs = ocvw.offsetLeft + (xcr - xMin) * scaleX;
                var ycs = ocvw.h - ocvw.offsetBottom - (trap.dc - yMin) * scaleY;


                $('#pathChan').attr('d', 'M' + x0s + ' ' + y0s + ' L ' + x1s + ' ' + y1s + ' L ' + x2s + ' ' + y1s + ' L ' + x3s + ' ' + y0s);

                $('#pathNorm').attr('d', 'M' + xnls + ' ' + yns + 'L' + xnrs + ' ' + yns);

                $('#pathCrit').attr('d', 'M' + xcls + ' ' + ycs + 'L' + xcrs + ' ' + ycs);
            
                drawGrid(xMin, xMax, yMin, yMax, scaleX, scaleY, 'chart');
            }
        });