        $( document ).ready(function() {

            $("#mynav").load("nav.html");
            
            $("#chartDIV").load("img/chart.svg", function(){
                updateChart();
            });

            $("#output").load("output.html", function(){
                setValues();
            });

            const para = new ParabolicChannel(10, 1, 0.01, 0.05, 0.5);
            let tmp = localStorage.getItem('para');
            if (tmp) {
                Object.assign(para, JSON.parse(tmp));
            }
            
            
            $("#topWidth").val(para.tw);
            $("#channelDepth").val(para.cd);
            $("#channelSlope").val(para.cs);
            $("#manningsN").val(para.mN);
            $("#normalDepth").val(para.dn.toFixed(2));
            $("#discharge").val(para.Qn.toFixed(2));

            $("#topWidth").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#topWidth").val(para.tw);
                }
                else {
                    para.tw = tmp;
                    localStorage.setItem('para', JSON.stringify(para));
                    $('#discharge').val(para.Qn.toFixed(2));
                    update();
                }
            });

            $("#channelDepth").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                    $("#channelDepth").val(para.cd);
                }
                else {
                    para.cd = tmp;
                    localStorage.setItem('para', JSON.stringify(para));
                    $('#discharge').val(para.Qn.toFixed(2));
                    update();
                }
            });

            $("#channelSlope").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                }
                else {
                    para.cs = tmp;
                    localStorage.setItem('para', JSON.stringify(para));
                    $('#discharge').val(para.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#manningsN").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                }
                else {
                    para.mN = tmp;
                    localStorage.setItem('para', JSON.stringify(para));
                    $('#discharge').val(para.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#normalDepth").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                }
                else {
                    para.dn = tmp;
                    localStorage.setItem('para', JSON.stringify(para));
                    $('#discharge').val(para.Qn.toFixed(2));
                    update();
                }
            });
            
            $("#discharge").change(function(){
                var tmp = parseFloat(this.value);
                if (isNaN(tmp) || (tmp <=0)) {
                    showMessage($('#warningMessage'), "Nonpositive values are not accepted!");
                }
                else {
                    para.dn = para.Q2Dn(tmp);
                    localStorage.setItem('para', JSON.stringify(para));
                    $("#normalDepth").val(para.dn.toFixed(2));
                    update();
                }
            });

            function update(){
                setValues();
                updateChart();
            }
            
            function setValues(){
                $("#area").html(para.an.toFixed(3));
                $("#peri").html(para.pn.toFixed(3));
                $("#velo").html(para.vn.toFixed(3));
                $("#dc").html(para.dc.toFixed(3));
                $("#vc").html(para.vc.toFixed(3));
                $("#sc").html(para.sc.toFixed(3));
                $("#fr").html(para.fr.toFixed(3));
            }

            function updateChart(){

                //drawing 
                var xMin = 0;
                var xMax = para.tw
                var yMin = 0;
                var yMax = para.cd;

                var scaleX = (ocvw.w - oc.offsetLeft - oc.offsetRight)/ (xMax - xMin);
                var scaleY = (ocvw.h - oc.offsetTop - oc.offsetBottom) / (yMax - yMin);

                var x0 = 0.0;
                var y0 = para.cd;
                var x0s = oc.offsetLeft + (x0 - xMin) * scaleX;
                var y0s = ocvw.h - oc.offsetBottom - (y0 - yMin) * scaleY;

                var x1 = 0.5 * para.tw;
                var y1 = -para.cd;
                var x1s = oc.offsetLeft + (x1 - xMin) * scaleX;
                var y1s = ocvw.h - oc.offsetBottom - (y1 - yMin) * scaleY;

                var x2 = para.tw;
                var x2s = oc.offsetLeft + (x2 - xMin) * scaleX;

                var xnl = 0.5 * para.tw - 0.5 * para.tw * Math.sqrt(para.dn / para.cd);
                var xnr = 0.5 * para.tw + 0.5 * para.tw * Math.sqrt(para.dn / para.cd);;
                var xnls = oc.offsetLeft + (xnl - xMin) * scaleX;
                var xnrs = oc.offsetLeft + (xnr - xMin) * scaleX;
                var yns = ocvw.h - oc.offsetBottom -(para.dn - yMin) * scaleY;


                var xcl = 0.5 * para.tw - 0.5 * para.tw * Math.sqrt(para.dc / para.cd);
                var xcr = 0.5 * para.tw + 0.5 * para.tw * Math.sqrt(para.dc / para.cd);;
                var xcls = oc.offsetLeft + (xcl - xMin) * scaleX;
                var xcrs = oc.offsetLeft + (xcr - xMin) * scaleX;
                var ycs = ocvw.h - oc.offsetBottom - (para.dc - yMin) * scaleY;

                $('#pathChan').attr('d', 'M' + x0s + ' ' + y0s + ' Q ' + x1s + ' ' + y1s + ' ' + x2s + ' ' + y0s);

                $('#pathNorm').attr('d', 'M' + xnls + ' ' + yns + 'L' + xnrs + ' ' + yns);

                $('#pathCrit').attr('d', 'M' + xcls + ' ' + ycs + 'L' + xcrs + ' ' + ycs);
            
                drawGrid(xMin, xMax, yMin, yMax, scaleX, scaleY);
            }

        });