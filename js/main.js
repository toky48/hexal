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

    adjustMenu();
    $(window).on("resize", adjustMenu);

});
