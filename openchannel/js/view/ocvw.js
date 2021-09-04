var ocvw = {
    w: 450,
    h: 300,
    offsetLeft : 60,
    offsetTop : 0,
    offsetRight : 30,
    offsetBottom : 60
};

function showMessage(element, message)
{
    element.html(message);
    
    if(element.parent().is(':hidden')) {
        element.parent().show();
    }
};

function drawGrid(xMin, xMax, yMin, yMax, scaleX, scaleY, chart){
    //draw grid lines;
    var xInc = niceIncrement(xMin, xMax);
    var xIncDraw = xInc * scaleX;

    //draw grid lines;
    let x = 0;
    let y = ocvw.h - ocvw.offsetBottom;
    let xDraw = ocvw.offsetLeft;
    var xGrid = '';
    var text;
    var xPos;
    var yPos;
    var idLabel;
    var i = 1;

    while (xDraw <= ocvw.w - ocvw.offsetRight){
        xGrid += 'M' + xDraw + ' ' + ocvw.offsetTop + 'L' + xDraw + ' ' + y;
        yPos = ocvw.h - 0.65 * ocvw.offsetBottom;
        idLabel = 'xTick' + i;
        $('#'+idLabel, '#'+chart).attr('x', xDraw);
        $('#'+idLabel, '#'+chart).attr('y', yPos);
        text = x.toString();
        if(text.length > 10) {
            text = x.toFixed(xInc.countDecimals());
        }
        
        if(i < 10) {
            document.getElementById(idLabel).childNodes[0].textContent = text;
        }

        xDraw += xIncDraw;
        x += xInc;
        i += 1;
    }

    for (; i < 10; i++){
        idLabel = 'xTick' + i;
        document.getElementById(idLabel).childNodes[0].textContent = ' ';
    }

    $('#pathGridY', '#'+chart).attr('d', xGrid);

    var yInc = niceIncrement(yMin, yMax);
    var yIncDraw = yInc * scaleY;

    let yDraw = ocvw.h - ocvw.offsetBottom;
    var yGrid = '';
    x = ocvw.w - ocvw.offsetRight;
    y = 0;
    i = 1;
    while (yDraw > ocvw.offsetTop){
        yGrid += 'M' + ocvw.offsetLeft + ' ' + yDraw + 'L' + x + ' ' + yDraw;
        xPos = 0.70*ocvw.offsetLeft;
        idLabel = 'yTick' + i;
        text = y.toString();
        if(text.length > 10) {
            text = y.toFixed(yInc.countDecimals());
        }
        $('#'+idLabel, '#'+chart).attr("x", xPos);
        $('#'+idLabel, '#'+chart).attr("y", yDraw);
        //document.getElementById(idLabel).childNodes[0].textContent = text;
        $('#'+idLabel, '#'+chart).text(text);
        
        yDraw -= yIncDraw;
        y += yInc;
        i += 1;
    }

    for (; i < 10; i++){
        idLabel = 'yTick' + i;
        //document.getElementById(idLabel).childNodes[0].textContent = ' ';
        $('#'+idLabel, '#'+chart).text(' ');
    }

    $("#pathGridX", '#'+chart).attr("d", yGrid);

    xPos = ocvw.offsetLeft + 0.5 * (ocvw.w - ocvw.offsetLeft - ocvw.offsetRight);
    yPos = ocvw.h - 0.25 * ocvw.offsetBottom;
    $('#xLabel','#'+chart).attr("x", xPos);
    $('#xLabel','#'+chart).attr("y", yPos);

};

