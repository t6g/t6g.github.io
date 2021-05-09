var ocvw = {
    w: 450,
    h: 300,
    offsetLeft : 60,
    offsetTop : 0,
    offsetRight : 30,
    offsetBottom : 60
};

function showErrorFade()
{
    if( $("#errorMessage").hasClass("d-none") ) {
        $("#errorMessage").removeClass("d-none");
    }

    if(!($("#errorMessage").hasClass("d-none"))){
        setTimeout(function(){$("#errorMessage").addClass("d-none");}, 1000);
    }

}

function drawGrid(xMin, xMax, yMin, yMax, scaleX, scaleY){
    //draw grid lines;
    var xInc = niceIncrement(xMin, xMax);
    var xIncDraw = xInc * scaleX;

    //draw grid lines;
    let x = 0;
    let y = ocvw.h - oc.offsetBottom;
    let xDraw = oc.offsetLeft;
    var xGrid = '';
    var text;
    var xPos;
    var yPos;
    var idLabel;
    var i = 1;

    while (xDraw <= ocvw.w - oc.offsetRight){
        xGrid += 'M' + xDraw + ' ' + oc.offsetTop + 'L' + xDraw + ' ' + y;
        yPos = ocvw.h - 0.65 * oc.offsetBottom;
        idLabel = 'xTick' + i;
        $('#'+idLabel).attr('x', xDraw);
        $('#'+idLabel).attr('y', yPos);
        text = x.toString();
        if(text.length > 10) {
            text = x.toFixed(xInc.countDecimals());
        }
        document.getElementById(idLabel).childNodes[0].textContent = text;

        xDraw += xIncDraw;
        x += xInc;
        i += 1;
    }

    for (; i < 10; i++){
        idLabel = 'xTick' + i;
        document.getElementById(idLabel).childNodes[0].textContent = ' ';
    }

    $('#pathGridY').attr('d', xGrid);

    var yInc = niceIncrement(yMin, yMax);
    var yIncDraw = yInc * scaleY;

    let yDraw = ocvw.h - oc.offsetBottom;
    var yGrid = '';
    x = ocvw.w - oc.offsetRight;
    y = 0;
    i = 1;
    while (yDraw > oc.offsetTop){
        yGrid += 'M' + oc.offsetLeft + ' ' + yDraw + 'L' + x + ' ' + yDraw;
        xPos = 0.70*oc.offsetLeft;
        idLabel = 'yTick' + i;
        text = y.toString();
        if(text.length > 10) {
            text = y.toFixed(yInc.countDecimals());
        }
        $('#'+idLabel).attr("x", xPos);
        $('#'+idLabel).attr("y", yDraw);
        document.getElementById(idLabel).childNodes[0].textContent = text;

        yDraw -= yIncDraw;
        y += yInc;
        i += 1;
    }

    for (; i < 10; i++){
        idLabel = 'yTick' + i;
        document.getElementById(idLabel).childNodes[0].textContent = ' ';
    }

    $("#pathGridX").attr("d", yGrid);

    xPos = oc.offsetLeft + 0.5 * (ocvw.w - oc.offsetLeft - oc.offsetRight);
    yPos = ocvw.h - 0.25 * oc.offsetBottom;
    $('#xLabel').attr("x", xPos);
    $('#xLabel').attr("y", yPos);

};

