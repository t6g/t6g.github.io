        $( document ).ready(function() {

            $("#mynav").load("nav.html");
            
            $("#chartDIV").load("img/chart.svg", function(){
                updateChart();
            });

            $("#output").load("output.html", function(){
                setValues();
            });

            const tria = new TriangularChannel(3, 3, 0.01, 0.05, 0.5);
            
            let tmp = localStorage.getItem('tria');
            if (tmp) {
                Object.assign(tria, JSON.parse(tmp));
            }
            
            $("#leftSideSlope").val(tria.z1);
            $("#rightSideSlope").val(tria.z2);
            $("#channelSlope").val(tria.cs);
            $("#manningsN").val(tria.mN);
            $("#normalDepth").val(tria.dn.toFixed(2));
            $("#discharge").val(tria.Qn.toFixed(2));

            $("#leftSideSlope").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#leftSideSlope").val(tria.z1);
                }
                else {
                    tria.z1 = tmp;
                    localStorage.setItem('tria', JSON.stringify(tria));
                    $('#discharge').val(tria.Qn.toFixed(2));
                    update();
                }
            });

            $("#rightSideSlope").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#rightSideSlope").val(tria.z2);
                }
                else {
                    tria.z2 = tmp;
                    localStorage.setItem('tria', JSON.stringify(tria));
                    $('#discharge').val(tria.Qn.toFixed(2));
                    update();
                }
            });

            $("#channelSlope").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#channelSlope").val(tria.cs);
                }
                else {
                    tria.cs = tmp;
                    localStorage.setItem('tria', JSON.stringify(tria));
                    $('#discharge').val(tria.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#manningsN").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#manningsN").val(tria.mN);
                }
                else {
                    tria.mN = tmp;
                    localStorage.setItem('tria', JSON.stringify(tria));
                    $('#discharge').val(tria.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#normalDepth").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#normalDepth").val(tria.dn.toFixed(2));
                }
                else {
                    tria.dn = tmp;
                    localStorage.setItem('tria', JSON.stringify(tria));
                    $('#discharge').val(tria.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#discharge").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#discharge").val(tria.Qn.toFixed(2));
                }
                else {
                    tria.dn = tria.Q2Dn(tmp);
                    localStorage.setItem('tria', JSON.stringify(tria));
                    $("#normalDepth").val(tria.dn.toFixed(2));
                    update();
                }
            });

            function update(){
                setValues();
                updateChart();
            }
            
            function setValues(){
                $("#area").html(tria.an.toFixed(3));
                $("#peri").html(tria.pn.toFixed(3));
                $("#velo").html(tria.vn.toFixed(3));
                $("#dc").html(tria.dc.toFixed(3));
                $("#vc").html(tria.vc.toFixed(3));
                $("#sc").html(tria.sc.toFixed(3));
                $("#fr").html(tria.fr.toFixed(3));
            }

            function updateChart(){

                //drawing 
                var xMin = 0;
                var xMax = tria.depth * (tria.z1 + tria.z2)
                var yMin = 0;
                var yMax = tria.depth;

                var scaleX = (ocvw.w - ocvw.offsetLeft - ocvw.offsetRight)/ (xMax - xMin);
                var scaleY = (ocvw.h - ocvw.offsetTop - ocvw.offsetBottom) / (yMax - yMin);

                var x0 = 0.0;
                var y0 = tria.depth;
                var x0s = ocvw.offsetLeft + (x0 - xMin) * scaleX;
                var y0s = ocvw.h - ocvw.offsetBottom - (y0 - yMin) * scaleY;

                var x1 = tria.depth * tria.z1;
                var y1 = 0;
                var x1s = ocvw.offsetLeft + (x1 - xMin) * scaleX;
                var y1s = ocvw.h - ocvw.offsetBottom - (y1 - yMin) * scaleY;

                var x2 = tria.depth * (tria.z1 + tria.z2);
                var x2s = ocvw.offsetLeft + (x2 - xMin) * scaleX;

                var xnl = (tria.depth - tria.dn) * tria.z1;
                var xnr = tria.depth * tria.z1 + tria.dn * tria.z2;
                var xnls = ocvw.offsetLeft + (xnl - xMin) * scaleX;
                var xnrs = ocvw.offsetLeft + (xnr - xMin) * scaleX;
                var yns = ocvw.h - ocvw.offsetBottom -(tria.dn - yMin) * scaleY;


                var xcl = (tria.depth - tria.dc) * tria.z1;
                var xcr = tria.depth * tria.z1 + tria.dc * tria.z2;
                var xcls = ocvw.offsetLeft + (xcl - xMin) * scaleX;
                var xcrs = ocvw.offsetLeft + (xcr - xMin) * scaleX;
                var ycs = ocvw.h - ocvw.offsetBottom - (tria.dc - yMin) * scaleY;


                $('#pathChan').attr('d', 'M' + x0s + ' ' + y0s + 'L' + x1s + ' ' + y1s + 'L' + x2s + ' ' + y0s);

                $('#pathNorm').attr('d', 'M' + xnls + ' ' + yns + 'L' + xnrs + ' ' + yns);

                $('#pathCrit').attr('d', 'M' + xcls + ' ' + ycs + 'L' + xcrs + ' ' + ycs);
            
                drawGrid(xMin, xMax, yMin, yMax, scaleX, scaleY, 'chart');
            }

        });