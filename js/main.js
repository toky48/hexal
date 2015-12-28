$(function() {
    var arrow = $(".arrow");
    var arrowAndMask = $(".arrow, .mask");
    var nav = $("nav");
    var sections = $("section");
    var navLinks = $("nav a");
    var leftNavContainer = $(".leftNavContainer");
    var rightNavContainer = $(".rightNavContainer");

    var navHeight = nav.height();
    var arrHeight = $(".arrow").height();

    var mobileMode;

    setupRegularOrMobileScrolling();
    $(window).on("resize", setupRegularOrMobileScrolling);
    
    $(window).on("scroll", scrollRegularMenu);

    adjustMenu();
    $(window).on("resize", adjustMenu);

    $(window).on("scroll", actualizeActiveLinkInMenu);

    navLinks.on("click", smoothScroll);

    function actualizeActiveLinkInMenu() {
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
    }


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
        setTimeout(function() {
            nav.addClass("animatedMenu");
        });

        arrowAndMask.on("click", showOrHideMobileMenu);
    }

    function setupRegularScrolling() {
        nav.removeClass("visibleMenu");
        nav.attr("style", "");
        arrowAndMask.attr("style", "");

        arrowAndMask.off("click", showOrHideMobileMenu);
    }

    function setupRegularOrMobileScrolling() {
        var screenWidth = window.innerWidth;
        var fromRegularToMobileMode =
            screenWidth < 520 && (mobileMode === undefined || !mobileMode);
        var fromMobileToRegularMode =
            screenWidth >= 520 && (mobileMode === undefined || mobileMode);

        if(fromRegularToMobileMode) {
            setupMobileScrolling();
            mobileMode = true;
        } else if(fromMobileToRegularMode) {
            setupRegularScrolling();
            mobileMode = false;
        }
    }

    function showOrHideMobileMenu() {
        nav.toggleClass("visibleMenu");
    }

    function scrollRegularMenu() {
        var scrollPos = $(window).scrollTop();

        if(scrollPos !== 0 && !nav.hasClass("fixedMenu")) {
            nav.addClass("fixedMenu");
        }

        if(scrollPos === 0) {
            nav.removeClass("fixedMenu");
        }
    }

    function smoothScroll(event) {
        event.preventDefault();
        var linkTarget = $(this).attr("href");

        var targetPos = $(linkTarget).position();
        if(targetPos !== undefined) {
            $("html, body").animate({
                scrollTop: targetPos.top - arrHeight + 1
            }, 800);

            if(mobileMode) {
                showOrHideMobileMenu();
            }

        }
    }
});
