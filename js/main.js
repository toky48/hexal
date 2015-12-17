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

    var arrHeight = $(".arrow").height();
/////////////////////////////////////////////////////////////////
    var nav = $("nav");
    var navHeight = nav.height();
    nav.css("transform", "none");
    var menuVisible = false;
    var navFixed = false;

    if($("body").innerWidth() < 510) {
        $(function() {
            nav.css("top", - navHeight - arrHeight / 2);
            $(".arrow, .mask").css("top", navHeight + arrHeight / 2);
        });

        $(".arrow, .mask").on("click",function() {
            if(menuVisible) {
                nav.animate({"top": - navHeight - arrHeight / 2}, 800);
                var scrollPos = $(window).scrollTop();

                if(scrollPos === 0) {
                    nav.css("position", "absolute");
                    $("arrow").css("position", "absolute");
                }

                menuVisible = false;
            } else {
                nav.animate({"top": "0px"}, 800);

                nav.css("position", "fixed");
                $("arrow").css("position", "fixed");

                menuVisible = true;
            }
        });

        $(window).on("scroll", function() {
                var scrollPos = $(window).scrollTop();
                if(scrollPos > arrHeight && !navFixed && !menuVisible) {
                    nav.css("top", - navHeight - arrHeight * 2);
                    nav.css("position", "fixed");

                    nav.animate({"top": - navHeight - arrHeight / 2}, 800);

                    navFixed = true;
                }

                if(scrollPos === 0) {
                    nav.css("position", "absolute");

                    navFixed = false;
                }
        });
    } else {
        var navEls = $("nav > *");
        var navElsNotArrow = navEls.filter(":not(.arrow)");

        $(window).on("scroll", function() {
            var scrollPos = $(window).scrollTop();

            if(scrollPos > arrHeight && !navFixed) {
                navEls.css("top", "-" + (arrHeight * 1.5) + "px");
                navEls.css("position", "fixed");
                navElsNotArrow.css("border-bottom-style", "none");

                navEls.animate({top: "0px"}, 800);

                navFixed = true;
            }

            if(scrollPos === 0) {
                navEls.css("position", "absolute");
                navElsNotArrow.css("border-bottom-style", "solid");
                navFixed = false;
            }
        });
    }

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
