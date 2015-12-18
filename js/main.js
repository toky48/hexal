$(function() {
    var arrow = $(".arrow");
    var arrowAndMask = $(".arrow, .mask");
    var nav = $("nav");
    var navEls = $("nav > *");
    var navElsNotArrowAndMask = navEls.filter(":not(.arrow):not(.mask)");
    var sections = $("section");
    var navLinks = $("nav a");
    var leftNavContainer = $(".leftNavContainer");
    var rightNavContainer = $(".rightNavContainer");

    var navHeight = nav.height();
    var arrHeight = $(".arrow").height();

    var menuVisible = false;
    var navFixed = false;
    var mobileMenu;

    setupRegularOrMobileScrolling();
    $(window).on("resize", setupRegularOrMobileScrollingOnResize);

    adjustMenu();
    $(window).on("resize", adjustMenu);

    nav.css("transform", "none");

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

            if(mobileMenu) {
                showOrHideMobileMenu();
            }

        }
    });

    function adjustMenu() {
        var arrWidth = arrow.width();
        var winWidth = $("body").innerWidth();

        leftNavContainer.css("left", (winWidth / 2 + arrWidth / 2) + "px");
        rightNavContainer.css("right", (winWidth / 2 + arrWidth / 2) + "px")
    }

    function setupMobileScrolling() {
        var navHeight = nav.height();
        nav.css("top", - navHeight - arrHeight / 2);
        arrowAndMask.css("top", navHeight + arrHeight / 2);

        arrowAndMask.on("click", showOrHideMobileMenu);
        $(window).off("scroll", scrollRegularMenu);
        $(window).on("scroll", scrollMobileMenu);

    }

    function setupRegularScrolling() {
        arrowAndMask.off("click", showOrHideMobileMenu);
        $(window).off("scroll", scrollMobileMenu);
        $(window).on("scroll", scrollRegularMenu);
    }

    function setupRegularOrMobileScrolling() {
        var screenWidth = window.outerWidth;

        if(screenWidth < 520) {
            setupMobileScrolling();
            mobileMenu = true;
        } else if(screenWidth >= 520) {
            setupRegularScrolling();
            mobileMenu = false;
        }
    }

    function setupRegularOrMobileScrollingOnResize() {
        var screenWidth = window.outerWidth;

        if(screenWidth < 520 && !mobileMenu) {
            clearNavStyle();
            setupMobileScrolling();
            fakeMobileScroll();

            mobileMenu = true;
        } else if(screenWidth >= 520 && mobileMenu) {
            clearNavStyle();
            setupRegularScrolling();
            fakeRegularScroll();

            mobileMenu = false;
            menuVisible = false;
        }
    }

    function clearNavStyle() {
        nav.attr("style", "transform: none;");
        navEls.attr("style", "");
    }

    function showOrHideMobileMenu() {
        var navHeight = nav.height();
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
        var navHeight = nav.height();

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

    function fakeMobileScroll() {
        var navHeight = nav.height();
        var scrollPos = $(window).scrollTop();

        if(scrollPos !== 0) {
            nav.css("position", "fixed");
            nav.css("top", - navHeight - arrHeight / 2);

            navFixed = true;
        }
    }

    function scrollRegularMenu() {
        var scrollPos = $(window).scrollTop();

        if(scrollPos > arrHeight && !navFixed) {
            navEls.css("top", "-" + (arrHeight * 1.5) + "px");
            navEls.css("position", "fixed");
            navElsNotArrowAndMask.css("border-bottom-style", "none");
            navEls.animate({top: "0px"}, 800);

            navFixed = true;
        }

        if(scrollPos === 0) {
            navEls.each(function(_, el) {
                el.style.removeProperty("position");
                el.style.removeProperty("border-bottom-style");
            });

            navFixed = false;
        }
    }

    function fakeRegularScroll() {
        var scrollPos = $(window).scrollTop();

        if(scrollPos !== 0) {
            navEls.css("position", "fixed");
            navElsNotArrowAndMask.css("border-bottom-style", "none");
            navEls.css("top", "0px");

            navFixed = true;
        }
    }
});
