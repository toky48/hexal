$(function() {

    function adjustHexGrid() {
        var hexGrid = $(".hexGrid");
        hexGrid.width("auto");
        var gridWidth = hexGrid.width();
        var hexagon = $(".hexagon");
        hexagon.removeClass("newShortRow");
        hexagon.removeClass("newLongRow");

        var hexWidth = hexagon.width();
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


        if(maxHexagonsInRow > 1) {
            hexGrid.width(maxHexagonsInRow * fullWidth);
        } else {
            var shortRowMargin =
                parseInt(newShortRowHexagon.css("margin-left"), 10);

            hexGrid.width(shortRowMargin + hexMargin + hexWidth);
        }
        hexagon.css("transform", "scale(0)");
        setTimeout(function() {
            hexagon.css("transition", "transform 0.5s");
            hexagon.css("transform", "scale(1)");
        });
    }

    adjustHexGrid();
    $(window).on("resize", adjustHexGrid);


});
