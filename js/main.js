var drawCanvas;
var dctx;

var renderCanvas;
var rctx;

function getCanvasCtx()
{
    //render canvas for coloring parts
    renderCanvas = document.getElementById("partRenderer");
    rctx = renderCanvas.getContext('2d');

    //get the regular draw canvas
    drawCanvas = document.getElementById("drawField");
    dctx = drawCanvas.getContext('2d');
}

function renderPart(part_name, part_color, posx, posy)
{
    //set to draw overlap
    rctx.globalCompositeOperation = "source-over";

    //fill a part behind the rectangle
    rctx.fillStyle = part_color;
    rctx.fillRect(0, 0, 32, 32);
    //set to mode so part will be colored in
    rctx.globalCompositeOperation = "destination-in";
    //get the color in the shape of the part
    rctx.drawImage(document.getElementById(part_name), 0, 0);
    dctx.drawImage(renderCanvas, posx, posy);
    //set to multiply for final pass
    rctx.globalCompositeOperation = "multiply";
    //multiply the part for shading
    rctx.drawImage(document.getElementById(part_name), 0, 0);
    dctx.drawImage(renderCanvas, posx, posy);
}

function sandbox()
{
    renderPart("dd_skin", "#ff00ff", 128, 128);
    renderPart("dd_hair", "#00ff00", 128, 128);
    renderPart("dd_eyes", "#00ffff", 128, 128);
}

window.onload = (evt) =>
{
    getCanvasCtx();
    sandbox();
}