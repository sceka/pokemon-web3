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
const mainCanvas = document.getElementById("mainCanvas");
const mainCtx = mainCanvas.getContext("2d");
const worldImage = new Image();

function drawCanvas() {
    mainCanvas.width = 3 * plots + 4 * roads;
    mainCanvas.height = 3 * plots + 4 * roads;
    // plotCanvas.width = plots;
    // plotCanvas.height = plots;
    worldImage.src = "./statics/map.png";
    worldImage.onload = () => {
        InitializeMap();
    };
}

function drwaMapSection(ctx, originX, originY) {
    ctx.drawImage(worldImage, originX, originY);
}

function InitializeMap() {
    // updatePlotLocation();
    drwaMapSection(mainCtx, mapView.mapOffsetX, mapView.mapOffsetY);
    drawCursor(plotViewOffsets, plotViewOffsets);
    drwaMapSection(plotCtx, -1 * plotView.locationX, -1 * plotView.locationY);
    // setPlotdata();
}

function drawCursor(x, y) {
    mainCtx.strokeRect(x, y, plots, plots);
}
function updatePlotLoation() {
    plotView.locationX = -1 * mapView.mapOffsetX + plotViewOffsets;
    plotView.locationY = -1 * mapView.mapOffsetY + plotViewOffsets;
}

drawCanvas();
