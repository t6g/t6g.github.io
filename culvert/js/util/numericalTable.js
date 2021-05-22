(function($){
    $.fn.numericalTable = function(){

        $('tr td[contenteditable="true"]', this).on('keydown', function(event){

            switch (event.keyCode){
                case 38:    //up
                    if(this.parentElement.previousElementSibling) {
                        $(this).parent().prev().children().eq(this.cellIndex).trigger('focus');
                    }
                    break;
                case 37:    //left
                    $(this).prev().trigger('focus');
                    break;
                case 13:    //enter
                case 40:    //down
                    if(this.parentElement.nextElementSibling) {
                        $(this).parent().next().children().eq(this.cellIndex).trigger('focus');
                    }
                    break;
                case 39:    //right
                    $(this).next().trigger('focus');
                    break;
            };
        });

        $('tr td[contenteditable="true"]', this).on('keypress', function(event){
            var x = event.charCode || event.keyCode;
            if (isNaN(String.fromCharCode(event.which)) && //numerical
                x!=46                                      //delete
                || x===32                                   //space
                || x===13                                   //enter
                || (x===46 && event.currentTarget.innerText.includes('.'))) event.preventDefault();
        });
        
        $('tr td[contenteditable="true"]', this).on('focus', function(event){
            this.data_orig = this.innerHTML;
        });

        $('tr td[contenteditable="true"]', this).on('blur', function(event){
            if(this.data_orig != this.innerHTML) {
                $(this).trigger('change');
                delete this.data_orig;
            };
        });
    };
})(jQuery);