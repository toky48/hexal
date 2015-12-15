$(function() {
    function adjustMenu() {
        var arrWidth = $('.arrow').width();
        var winWidth = $("body").innerWidth();


        $(".leftNav").css("left", (winWidth / 2 + arrWidth / 2) + "px");
        $(".rightNav").css("right", (winWidth / 2 + arrWidth / 2) + "px")
    }

    var arrHeight = $(".arrow").height();

    $(".leftNav").css("transform", "translateY(0px)");
    $(".rightNav").css("transform", "translateY(0px)");
    $(".arrow").css("transform", "translateY(0px)");

    adjustMenu();
    $(window).on("resize", adjustMenu);

});
