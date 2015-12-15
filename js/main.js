$(function() {
    function adjustMenu() {
        var arrWidth = $('.arrow').width();
        var winWidth = $("body").innerWidth();


        $(".leftNav").css("left", (winWidth / 2 + arrWidth / 2) + "px");
        $(".rightNav").css("right", (winWidth / 2 + arrWidth / 2) + "px")
    }

    var arrHeight = $(".arrow").height();

    $("nav").css("transform", "none");

    adjustMenu();
    $(window).on("resize", adjustMenu);

});
