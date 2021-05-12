(function($){
    var activeCell = null;

    $.fn.numbertable = function(){
        $('#divYZNS').on('click', 'td', function(event){

            // if last column, bypass
            if(event.target.cellIndex === 3) {
                return;
            }
            
            //update existing active cell value to input
            if(activeCell){
                let v =  parseFloat($('#numberInput').val());
                
                if(activeCell.cellIndex === 1){
                    let rw = activeCell.parentElement;
                    let tb = rw.parentElement;
                    let zb = parseFloat(tb.rows[0].cells[1].innerHTML);
                    for (let i = 1; i< tb.rows.length; i++){
                        let tmp = parseFloat(tb.rows[i].cells[1].innerHTML);
                        if (zb > tmp) {
                            zb = tmp;
                        }
                    }
                    
                    if(v >= zb){
                        rw.cells[3].innerHTML = v - zb;
                    } else {
                        zb = v;
                        for (let i = 0; i < tb.rows.length; i++){
                            tb.rows[i].cells[3].innerHTML = parseFloat(tb.rows[i].cells[1].innerHTML) - zb;
                        }
                    }
                }
                activeCell.innerHTML = $('#numberInput').val();
                
            }

            activeCell = event.target;
            
            var position = activeCell.getBoundingClientRect();

            $('#numberInput').val(activeCell.innerHTML);

            $('#numberInput').css({
                display:'inline-block',
                top:position.y+'px',
                left:position.x+'px',
                width:position.width+'px',
                height:position.height+'px'
            }).focus();
        });

        $(document).on('keydown', function(event){
            var toActiveCell;

            switch (event.keyCode){
                case 13: // enter
                    toActiveCell = findCell(activeCell, 'DOWN');
                    break;
                case 38:
                    event.preventDefault();
                    toActiveCell = findCell(activeCell, 'UP');
                    break;
                case 37:
                    toActiveCell = findCell(activeCell, 'LEFT');
                    break;
                case 40:
                    event.preventDefault();
                    toActiveCell = findCell(activeCell, 'DOWN');
                    break;
                case 39:
                    toActiveCell = findCell(activeCell, 'RIGHT');
                    break;
            }
            if(toActiveCell){
                $(toActiveCell).trigger('click');
            }
        });
        $(window).on('resize', function(){
            if(!activeCell){
                return;
            }
            position = activeCell.getBoundingClientRect(),
            $('#numberInput').css({
                display:'inline-block',
                top:position.y+'px',
                left:position.x+'px',
                width:position.width+'px',
                height:position.height+'px'
            }).focus();
        });
    };
    //find next cell
    function findCell(cell, direction){
        var row = cell.parentElement,
            colindex = [].indexOf.call(row.children, cell);
        switch (direction){
        case 'DOWN':
            var nextrow = row.nextElementSibling;
            if(nextrow){
                return $(nextrow).children()[colindex];
            }else{
                return null;
            }
        case 'UP':
            var prevrow = row.previousElementSibling;
            if(prevrow){
                return $(prevrow).children()[colindex];
            }else{
                return null;
            }
        case 'LEFT':
            return cell.previousElementSibling;
        case 'RIGHT':
                if(colindex === 2){
                    return null;
                }
                else {
                    return cell.nextElementSibling;
                    
                }
        }

    }
    
})(jQuery);