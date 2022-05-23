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

function renderPart(part_name, part_color, posx, posy, scale)
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

function HSLtoRGB(h, s, l)
{
    let c = (1 - Math.abs((2 * l) -1)) * s;
    let x = c * (1 - Math.abs(((h - 60) % 2) - 1));
    let m = l - (c / 2);

    let ar;
    let ag;
    let ab;

    if (h >= 0 && h < 60)
    {
        ar = c; ag = x; ab = 0;
    }

    else if (h >= 60 && h < 120)
    {
        ar = x; ag = c; ab = 0;
    }

    else if (h >= 120 && h < 180)
    {
        ar = 0; ag = c; ab = x;
    }

    else if (h >= 180 && h < 240)
    {
        ar = 0; ag = x; ab = c;
    }

    else if (h >= 240 && h < 300)
    {
        ar = x; ag = 0; ab = c;
    }

    else
    {
        ar = c; ag = 0; ab = x;
    }

    return [Math.round((ar + m) * 255), Math.round((ag + m) * 255), Math.round((ab * m) * 255)];
}

function randomColor()
{
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);

    return `rgb(${r}, ${g}, ${b})`;
}

function sandbox()
{
    for (x = 0; x < (640 / 32); x++)
    {
        for (y = 0; y < (640/32); y++)
        {
            renderPart("dd_clothes", randomColor(), x * 32, y * 32, 2);
            renderPart("dd_eyes", randomColor(), x * 32, y * 32, 2);
            renderPart("dd_hair", randomColor(), x * 32, y * 32, 2);
            renderPart("dd_lips", randomColor(), x * 32, y * 32, 2);
            renderPart("dd_skin", randomColor(), x * 32, y * 32, 2);
        }
    }
}

window.onload = (evt) =>
{
    getCanvasCtx();
    sandbox();
}