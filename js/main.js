$(function() {
    var arrow = $(".arrow");
    var arrowAndMask = $(".arrow, .mask");
    var nav = $("nav");
    var navEls = $("nav > *");
    var navElsNotArrow = navEls.filter(":not(.arrow)");
    var sections = $("section");
    var navLinks = $("nav a");
    var leftNavContainer = $(".leftNavContainer");
    var rightNavContainer = $(".rightNavContainer");

    var navHeight = nav.height();
    var arrHeight = $(".arrow").height();

    var mobileMenu = false;
    var menuVisible = false;
    var navFixed = false;

    adjustMenu();
    $(window).on("resize", adjustMenu);

    nav.css("transform", "none");

    setupRegularOrMobileScrolling();
    $(window).on("resize", setupRegularOrMobileScrolling);

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

    navLinks.on("click", function(event) {
        event.preventDefault();
        var linkTarget = $(this).attr("href");

        var targetPos = $(linkTarget).position();
        if(targetPos !== undefined) {
            $("html, body").animate({
                scrollTop: targetPos.top - arrHeight + 1
            }, 800);
        }
    });

    function adjustMenu() {
        var arrWidth = arrow.width();
        var winWidth = $("body").innerWidth();

        leftNavContainer.css("left", (winWidth / 2 + arrWidth / 2) + "px");
        rightNavContainer.css("right", (winWidth / 2 + arrWidth / 2) + "px")
    }

    function setupRegularOrMobileScrolling() {
        var screenWidth = $("body").innerWidth();

        if(screenWidth < 510 && !mobileMenu) {
            console.log("state change");
            nav.css("top", - navHeight - arrHeight / 2);
            arrowAndMask.css("top", navHeight + arrHeight / 2);

            arrowAndMask.on("click", showOrHideMobileMenu);
            $(window).off("scroll", scrollRegularMenu);
            $(window).on("scroll", scrollMobileMenu);

            mobileMenu = true;
        } else if(screenWidth >= 510 && mobileMenu) {
            console.log("state change");
            arrowAndMask.css("top", "0px");

            arrowAndMask.off("click", showOrHideMobileMenu);
            $(window).off("scroll", scrollMobileMenu);
            $(window).on("scroll", scrollRegularMenu);

            mobileMenu = false;
        }
    }

    function showOrHideMobileMenu() {
        if(menuVisible) {
            nav.animate({"top": - navHeight - arrHeight / 2}, 800);
            var scrollPos = $(window).scrollTop();
            if(scrollPos === 0) {
                nav.css("position", "absolute");
            }

            menuVisible = false;
        } else {
            nav.animate({"top": "0px"}, 800);
            nav.css("position", "fixed");

            menuVisible = true;
        }
    }

    function scrollMobileMenu() {
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
    }

    function scrollRegularMenu() {
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
    }
});
