        $( document ).ready(function() {

            $("#mynav").load("nav.html");
            
            $("#chartDIV").load("img/chart.svg");

            $("#output").load("output.html");

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

                var scaleX = (ocvw.w - oc.offsetLeft - oc.offsetRight)/ (xMax - xMin);
                var scaleY = (ocvw.h - oc.offsetTop - oc.offsetBottom) / (yMax - yMin);

                var x0 = 0.0;
                var y0 = tria.depth;
                var x0s = oc.offsetLeft + (x0 - xMin) * scaleX;
                var y0s = ocvw.h - oc.offsetBottom - (y0 - yMin) * scaleY;

                var x1 = tria.depth * tria.z1;
                var y1 = 0;
                var x1s = oc.offsetLeft + (x1 - xMin) * scaleX;
                var y1s = ocvw.h - oc.offsetBottom - (y1 - yMin) * scaleY;

                var x2 = tria.depth * (tria.z1 + tria.z2);
                var x2s = oc.offsetLeft + (x2 - xMin) * scaleX;

                var xnl = (tria.depth - tria.dn) * tria.z1;
                var xnr = tria.depth * tria.z1 + tria.dn * tria.z2;
                var xnls = oc.offsetLeft + (xnl - xMin) * scaleX;
                var xnrs = oc.offsetLeft + (xnr - xMin) * scaleX;
                var yns = ocvw.h - oc.offsetBottom -(tria.dn - yMin) * scaleY;


                var xcl = (tria.depth - tria.dc) * tria.z1;
                var xcr = tria.depth * tria.z1 + tria.dc * tria.z2;
                var xcls = oc.offsetLeft + (xcl - xMin) * scaleX;
                var xcrs = oc.offsetLeft + (xcr - xMin) * scaleX;
                var ycs = ocvw.h - oc.offsetBottom - (tria.dc - yMin) * scaleY;


                $('#pathChan').attr('d', 'M' + x0s + ' ' + y0s + 'L' + x1s + ' ' + y1s + 'L' + x2s + ' ' + y0s);

                $('#pathNorm').attr('d', 'M' + xnls + ' ' + yns + 'L' + xnrs + ' ' + yns);

                $('#pathCrit').attr('d', 'M' + xcls + ' ' + ycs + 'L' + xcrs + ' ' + ycs);
            
                drawGrid(xMin, xMax, yMin, yMax, scaleX, scaleY);
            }

            const onDomElementIsReady = (elementToWatch)=> {
                //create promise
                return new Promise((res, rej)=> {
                    let idInterval = setInterval(()=> {
                        //keep waiting until the element exist
                        if($(elementToWatch).length > 0) {
                            clearInterval(idInterval); //remove the interval
                            res($(elementToWatch)); //resolve the promise            
                        }
                    },100);
                });
            };
            
            //how to use it?
            onDomElementIsReady("#chartDIV").then(element => {
                updateChart();
            });
            
            onDomElementIsReady("#output").then(element => {
                setValues();
            });
        });