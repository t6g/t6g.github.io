        $( document ).ready(function() {

            $("#mynav").load("nav.html");
            
            $("#chartDIV").load("img/chart.svg", function(){
                updateChart();
            });

            $("#output").load("output.html", function(){
                setValues();
            });

            const rect = new RectangularChannel(1, 0.01, 0.05, 0.5);
            let tmp = localStorage.getItem('rect');
            if (tmp) {
                Object.assign(rect, JSON.parse(tmp));
            }
            
            
            $("#bottomWidth").val(rect.b);
            $("#channelSlope").val(rect.cs);
            $("#manningsN").val(rect.mN);
            $("#normalDepth").val(rect.dn.toFixed(2));
            $("#discharge").val(rect.Qn.toFixed(2));

            $("#bottomWidth").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#bottomWidth").val(rect.b);
                }
                else {
                    rect.b = tmp;
                    localStorage.setItem('rect', JSON.stringify(rect));
                    $('#discharge').val(rect.Qn.toFixed(2));
                    update();
                }
            });

            $("#channelSlope").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                }
                else {
                    rect.cs = tmp;
                    localStorage.setItem('rect', JSON.stringify(rect));
                    $('#discharge').val(rect.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#manningsN").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                }
                else {
                    rect.mN = tmp;
                    localStorage.setItem('rect', JSON.stringify(rect));
                    $('#discharge').val(rect.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#normalDepth").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                }
                else {
                    rect.dn = tmp;
                    localStorage.setItem('rect', JSON.stringify(rect));
                    $('#discharge').val(rect.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#discharge").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                }
                else {
                    rect.dn = rect.Q2Dn(tmp);
                    localStorage.setItem('rect', JSON.stringify(rect));
                    $("#normalDepth").val(rect.dn.toFixed(2));
                    update();
                }
            });

            function update(){
                setValues();
                updateChart();
            }
            
            function setValues(){
                $("#area").html(rect.an.toFixed(3));
                $("#peri").html(rect.pn.toFixed(3));
                $("#velo").html(rect.vn.toFixed(3));
                $("#dc").html(rect.dc.toFixed(3));
                $("#vc").html(rect.vc.toFixed(3));
                $("#sc").html(rect.sc.toFixed(3));
                $("#fr").html(rect.fr.toFixed(3));
            }

            function updateChart(){

                //drawing 
                var xMin = 0;
                var xMax = rect.b;
                var yMin = 0;
                var yMax = rect.depth;

                var scaleX = (ocvw.w - oc.offsetLeft - oc.offsetRight)/ (xMax - xMin);
                var scaleY = (ocvw.h - oc.offsetTop - oc.offsetBottom) / (yMax - yMin);

                var x0 = 0.0;
                var y0 = rect.depth;
                var x0s = oc.offsetLeft + (x0 - xMin) * scaleX;
                var y0s = ocvw.h - oc.offsetBottom - (y0 - yMin) * scaleY;

                var x1 = rect.depth * rect.b;
                var y1 = 0;
                var x1s = oc.offsetLeft + (x1 - xMin) * scaleX;
                var y1s = ocvw.h - oc.offsetBottom - (y1 - yMin) * scaleY;

                var yns = ocvw.h - oc.offsetBottom -(rect.dn - yMin) * scaleY;

                var ycs = ocvw.h - oc.offsetBottom - (rect.dc - yMin) * scaleY;


                $('#pathChan').attr('d', 'M ' + x0s + ' ' + y0s + ' V ' + y1s + ' H' + x1s + ' V' + y0s);

                $('#pathNorm').attr('d', 'M ' + x0s + ' ' + yns + ' L ' + x1s + ' ' + yns);

                $('#pathCrit').attr('d', 'M ' + x0s + ' ' + ycs + ' L ' + x1s + ' ' + ycs);
            
                drawGrid(xMin, xMax, yMin, yMax, scaleX, scaleY);
            }

        });