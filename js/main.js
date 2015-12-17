$(function() {

    function adjustMenu() {
        var arrWidth = $('.arrow').width();
        var winWidth = $("body").innerWidth();

        $(".leftNavContainer")
            .css("left", (winWidth / 2 + arrWidth / 2) + "px");
        $(".rightNavContainer")
            .css("right", (winWidth / 2 + arrWidth / 2) + "px")
    }
    adjustMenu();
    $(window).on("resize", adjustMenu);


    $("nav").css("transform", "none");

    var arrHeight = $(".arrow").height();
    var navEls = $("nav > *");
    var navElsNotArrow = navEls.filter(":not(.arrow)");
    var navFixed = false;
    $(window).on("scroll", function() {
        var scrollPos = $(window).scrollTop()

        if(scrollPos > arrHeight && !navFixed) {
            navEls.css("top", "-" + (arrHeight * 1.5) + "px");
            navEls.css("position", "fixed");
            navElsNotArrow.css("border-bottom-style", "none");

            navEls.animate({
                top: "0px"
            }, 800);

            navFixed = true;
        }

        if(scrollPos === 0) {
            navEls.css("position", "absolute");
            navElsNotArrow.css("border-bottom-style", "solid");
            navFixed = false;
        }
    });

    var sections = $("section");
    var navLinks = $("nav a");
    $(window).on("scroll", function() {
        var scrollPos = $(window).scrollTop();

        sections.each(function(i, section) {
            var sectionLink =
                navLinks.filter('[href="#' + $(section).attr("id") + '"]');

            if($(section).position().top < scrollPos + arrHeight * 1.5) {
                if(!sectionLink.hasClass("active")) {
                    navLinks.removeClass("active");
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
});
