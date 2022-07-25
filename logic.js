//Graphics constants
// - map managment constants

const tiles = 12; //in pixels
const plots = tiles * 9; //in pixels
const roads = tiles * 2; //in pixels
const initialOffsets = 1 * (plots + roads);
const plotViewOffsets = 1 * (plots + 2 * roads);
const mapView = {
    mapOffsetX: -1 * initialOffsets,
    mapOffsetY: -1 * initialOffsets,
};
const plotView = { plotId: "", plotX: 0, plotY: 0, locationX: 0, locationY: 0 };
const plotCanvas = document.getElementById("plotCanvas");
const mainCanvas = document.getElementById("mainCanvas");
const mainCtx = mainCanvas.getContext("2d");
const plotCtx = plotCanvas.getContext("2d");
const worldImage = new Image();

function drawCanvas() {
    mainCanvas.width = 3 * plots + 4 * roads;
    mainCanvas.height = 3 * plots + 4 * roads;
    plotCanvas.width = plots;
    plotCanvas.height = plots;
    worldImage.src = "./statics/map.png";
    worldImage.onload = () => {
        InitializeMap();
    };
}

function drawMapSection(ctx, originX, originY) {
    ctx.drawImage(worldImage, originX, originY);
}

function InitializeMap() {
    updatePlotLocation();
    drawMapSection(mainCtx, mapView.mapOffsetX, mapView.mapOffsetY);
    drawCursor(plotViewOffsets, plotViewOffsets);
    drawMapSection(plotCtx, -1 * plotView.locationX, -1 * plotView.locationY);
    // setPlotdata();
}

function move(direction) {
    const validMove = validateMove(direction);
    if (validMove) {
        updateView(direction);
        drawMapSection(mainCtx, mapView.mapOffsetX, mapView.mapOffsetY);
        updatePlotLocation();
        drawCursor(plotViewOffsets, plotViewOffsets);
        drawMapSection(
            plotCtx,
            -1 * plotView.mapOffsetX,
            -1 * plotView.mapOffsetY
        );
    }
}

function updateView(direction) {
    switch (direction) {
        case "ArrowRight":
            plotView.plotX += 1;
            mapView.mapOffsetX -= plots + roads;
            // updatePlotLocation();
            break;
        case "ArrowDown":
            plotView.plotY += 1;
            mapView.mapOffsetY -= plots + roads;
            // updatePlotLocation();
            break;
        case "ArrowLeft":
            plotView.plotX -= 1;
            mapView.mapOffsetX += plots + roads;
            // updatePlotLocation();
            break;
        case "ArrowUp":
            plotView.plotY -= 1;
            mapView.mapOffsetY += plots + roads;
            // updatePlotLocation();
            break;
    }
}

function drawCursor(x, y) {
    mainCtx.strokeRect(x, y, plots, plots);
}
function updatePlotLocation() {
    plotView.locationX = -1 * mapView.mapOffsetX + plotViewOffsets;
    plotView.locationY = -1 * mapView.mapOffsetY + plotViewOffsets;
}

function validateMove(direction) {
    switch (direction) {
        case "ArrowRight":
            return !(plotView.plotX == 5);
        case "ArrowUp":
            return !(plotView.plotY == 0);
        case "ArrowLeft":
            return !(plotView.plotX == 0);
        case "ArrowDown":
            return !(plotView.plotY == 5);
    }
}

function setPlotdata() {
    const plotID = ethers.utils.id(JSON.stringify(plotView));
    document.getElementById("plotX").value = plotView.plotX;
    document.getElementById("plotY").value = plotView.plotY;
    document.getElementById("locationX").value = plotView.locationX;
    document.getElementById("locationY").value = plotView.locationY;
    document.getElementById("plotID").value = plotView.plotID;
    // isPlotAssignable(plotID);
}
drawCanvas();
window.addEventListener("keydown", (e) => {
    move(e.key);
});
