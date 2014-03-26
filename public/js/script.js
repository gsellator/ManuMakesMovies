$(document).ready(function() {
    var $nav = $('#nav');
    var $nav2 = $('#nav-2');

    $nav.onePageNav();

    $nav2.on('click', 'a', function(e) {
        var currentPos = $(this).parent().prevAll().length;

        $nav.find('li').eq(currentPos).children('a').trigger('click');

        e.preventDefault();
    });

    $('.cmd-prev').click(function(e){
        var currentVid = $(this).parent().find('.current');
        var currentNum = parseInt(/vid-(\d+)/.exec(currentVid.attr("class"))[1], 10);
        var vidsLength = $(this).parent().find('.vid').length;

        if (vidsLength == 1) {
            return;
        }

        if(currentNum - 1 > 0){
            var nextVid = $(this).parent().find('.vid-' + (currentNum-1).toString());
        } else {
            var nextVid = $(this).parent().find('.vid-' + vidsLength.toString());
        }

        currentVid.removeClass('current');
        nextVid.addClass('current');

        if (!nextVid.hasClass('left')){
            nextVid.addClass('left unanimated');
            nextVid.removeClass('right');
        }

        setTimeout(function(){
            nextVid.removeClass('left unanimated');
            currentVid.addClass('right');
        }, 20);
    });

    $('.cmd-next').click(function(e){
        var currentVid = $(this).parent().find('.current');
        var currentNum = parseInt(/vid-(\d+)/.exec(currentVid.attr("class"))[1], 10);
        var vidsLength = $(this).parent().find('.vid').length;

        if (vidsLength == 1) {
            return;
        }

        if(currentNum + 1 <= vidsLength){
            var nextVid = $(this).parent().find('.vid-' + (currentNum+1).toString());
        } else {
            var nextVid = $(this).parent().find('.vid-1');
        }

        currentVid.removeClass('current');
        nextVid.addClass('current');

        if (!nextVid.hasClass('right')){
            nextVid.addClass('right unanimated');
            nextVid.removeClass('left');
        }

        setTimeout(function(){
            nextVid.removeClass('right unanimated');
            currentVid.addClass('left');
        }, 20);

        //        currentVid.addClass('left');
        //        nextVid.removeClass('right');
        //        nextVid.removeClass('left');
    });



    $('#f').click(function(e){        
        e.preventDefault();
        //        alert($('#form-name').val());
        //        alert($('#form-mail').val());
        //        alert($('#form-msg').val());
    });

    //    $(document.documentElement).keydown(function(e){
    //        //alert(e.keyCode);
    //        
    //        if (!/(37|39)/.test(e.keyCode)) {
    //            return;
    //        }
    //        
    //        if (e.keyCode == 37)
    //        {
    //            $('#section-1-toleft').click();
    //        }
    //        if (e.keyCode == 39)
    //        {
    //            $('#section-1-toright').click();
    //        }
    //        
    //        //        e.preventDefault()
    //        //        e.stopPropagation()
    //    });

});

