$(function() {
    var hexagon = $(".hexGrid > .hex");
    hexagon.add(".arrow").add(".photo").add(".hexMask")
        .append('<div class="hexagon-before"></div>')
        .append('<div class="hexagon-after"></div>');

    hexagon.each(function(i, hex) {
        var imageUrl = $(hex).attr("data-image");
        $(hex).css("background-image", "url(" + imageUrl + ")");
    });

    adjustHexGrid();
    $(window).on("resize", adjustHexGrid);

    hexagon.css("transform", "scale(0)");
    $(window).on("load", function() {
        hexagon.css("transition", "transform 0.5s");
        hexagon.css("transform", "scale(1)");
    });

    function adjustHexGrid() {
        var hexGrid = $(".hexGrid");
        hexGrid.width("auto");
        var gridWidth = hexGrid.width();
        hexagon.filter(".newShortRow").removeClass("newShortRow");
        hexagon.filter(".newLongRow").removeClass("newLongRow");

        var hexWidth = hexagon.width() + 1;
        var hexMargin = parseInt(hexagon.css("margin-left"), 10);
        var fullWidth = hexWidth + 2 * hexMargin;

        var maxHexagonsInRow = Math.floor(gridWidth / fullWidth);

        if(maxHexagonsInRow > 1) {
            var newLongRowHexagon = hexagon.filter(
                ":nth-child("+ (2 * maxHexagonsInRow - 1) + "n-" +
                                (maxHexagonsInRow - 1)+ ")"
            );

            var newShortRowHexagon = hexagon.filter(
                ":nth-child("+ (2 * maxHexagonsInRow - 1) + "n + 1)"
            );

        } else {
            var newLongRowHexagon = hexagon.filter(
                ":nth-child(2n)"
            );

            var newShortRowHexagon = hexagon.filter(
                ":nth-child(2n+1)"
            );

        }
        newShortRowHexagon.addClass("newShortRow");
        newLongRowHexagon.addClass("newLongRow");


        var sectionWidth;

        if(maxHexagonsInRow > 1) {
            hexGrid.width(maxHexagonsInRow * fullWidth);
            sectionWidth = (maxHexagonsInRow - 1) * fullWidth - 2 * hexMargin;
        } else {
            var shortRowMargin =
                parseInt(newShortRowHexagon.css("margin-left"), 10);

            hexGrid.width(shortRowMargin + hexMargin + hexWidth);
            sectionWidth = "100%";
        }

        $(".about").width(sectionWidth);
        $(".contact").width(sectionWidth);

    }

});
