jQuery(document).ready(function () {
    /*
        silt fence:             $3 per linear foot
        wire-backed silt fence: $6 per linear foot
        straw bales:            $2 per foot
        sediment trap/basin:    $16 per cubic yard
        fine grading:           $2500 per acre 0 to 5 acres
                                $2000 per acre 5 to 15 acres
                                $1500 per acre 15 to 50 acres
                                $1000 per acre > 50 acres
        construction entrance:  $1500
        inlet protection:       $200
        Turbidity curtain:      $15 per linear foot
        safety fence            $5 per linear foot
    */
    const price = [3, 6, 5, 2, 16, 2500, 1500, 200, 200, 15];
    var defaultAmount = [100, 100, 100, 100, 1000, 6, 2, 10, 10, 100];
    var amount = {};
    let tmp = localStorage.getItem('ESCCalc');
    if(tmp) {
        Object.assign(amount, JSON.parse(tmp));
    } else {
        Object.assign(amount, defaultAmount);
    }
    
    var itemCost;
    var totalCost;
    
    $("#mynav").load("nav.html");
    
    $("#calcTable").numericalTable();

    var tbl = document.getElementById('calcTable');
    
    totalCost = 0;
    for (let i = 1; i < tbl.rows.length - 1; i++) {
        tbl.rows[i].cells[2].innerHTML = amount[i-1];
        if(i == 6){
            price[i - 1] = SeedingPrice(amount[i-1]);
            tbl.rows[i].cells[4].innerHTML = price[i-1];
        }
        itemCost = amount[i-1] * price[i-1];
        tbl.rows[i].cells[5].innerHTML = itemCost;
        totalCost += itemCost;
    };
    tbl.rows[11].cells[5].innerHTML = totalCost;

    
    $( '#calcTable tr td[contenteditable="true"]').on ('change', function(event){
        var row = this.parentElement.rowIndex;
        var col = this.cellIndex;

        var tmp = parseFloat(this.innerHTML);
        
        if (isNaN(tmp) || (tmp < 0)) {
            showMessage($('#warningMessage'), "Input a nonnegative number!");
            $( this ).html(amount[row-1]);
            $( this ).trigger('focus');
        } else {
            var old = amount[row-1] * price[row-1];
            amount[row - 1] = tmp;
            
            if (row == 6){
                price[row-1] = SeedingPrice(tmp);
                tbl.rows[row].cells[4].innerHTML = price[row-1];
            }
            let itemCost = amount[row-1] * price[row-1];    
            tbl.rows[row].cells[5].innerHTML = itemCost;

            tbl.rows[11].cells[5].innerHTML = (parseFloat(tbl.rows[11].cells[5].innerHTML) + itemCost - old);
        };
        
    });
    
    function SeedingPrice(acre) {
        var tprice;
        if(acre < 5){
            tprice = 2500;
        } else if(acre < 15){
            tprice = 2000;
        } else if(acre < 50){
            tprice = 1500;
        } else {
            tprice = 1000;
        }
        return tprice;
    };
    
    $("#btnSave").click(function() {
        localStorage.setItem('ESCCalc', JSON.stringify(amount));
    });



});
