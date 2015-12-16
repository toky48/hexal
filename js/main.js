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

    $(window).on("scroll", function() {
        var scrollPos = $(window).scrollTop();

        $("section").each(function(i, section) {
            var sectionLink =
                $('nav a[href="#' + $(section).attr("id") + '"]');

            if($(section).position().top < scrollPos + arrHeight * 1.5) {
                if(!sectionLink.hasClass("active")) {
                    $("nav a").removeClass("active");
                    sectionLink.addClass("active");
                }
            }
        });

    });

    $("nav a").on("click", function(event) {
        event.preventDefault();
        var linkTarget = $(this).attr("href");

        var targetPos = $(linkTarget).position();
        if(targetPos !== undefined) {
            $("html, body").animate({
                scrollTop: targetPos.top - arrHeight + 1
            }, 800);
        }

    });

    adjustMenu();
    $(window).on("resize", adjustMenu);

});
