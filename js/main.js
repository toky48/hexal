$(function() {
    function adjustMenu() {
        var arrWidth = $('.arrow').width();
        var winWidth = $("body").innerWidth();
        console.log(arrWidth, winWidth);


        $(".leftNav").css("left", (winWidth / 2 + arrWidth / 2) + "px");
        $(".rightNav").css("right", (winWidth / 2 + arrWidth / 2) + "px")
    }

    adjustMenu();
    $(window).on("resize", adjustMenu);

});
