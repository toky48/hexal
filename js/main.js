$(function() {
    function adjustMenu() {
        var arrWidth = $('.arrow').width();
        var winWidth = $("body").innerWidth();


        $(".leftNavContainer")
            .css("left", (winWidth / 2 + arrWidth / 2) + "px");
        $(".rightNavContainer")
            .css("right", (winWidth / 2 + arrWidth / 2) + "px")
    }

    var arrHeight = $(".arrow").height();

    $("nav").css("transform", "none");

    var navFixed = false;

    $(window).on("scroll", function() {
        var scrollPos = $(window).scrollTop()
        var nav = $("nav > *");

        if(scrollPos > arrHeight && !navFixed) {
            nav.css("top", "-" + (arrHeight * 1.5) + "px");
            nav.css("position", "fixed");
            nav.animate({
                top: "0px"
            }, 800);

            navFixed = true;
        }

        if(scrollPos === 0) {
            nav.css("position", "absolute");
            navFixed = false;
        }
    });


    adjustMenu();
    $(window).on("resize", adjustMenu);

});
