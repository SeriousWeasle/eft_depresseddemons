var drawCanvas;
var dctx;

var renderCanvas;
var rctx;

var upscaleCanvas;
var uctx;

function getCanvasCtx()
{
    //render canvas for coloring parts
    renderCanvas = document.getElementById("partRenderer");
    rctx = renderCanvas.getContext('2d');

    //get the regular draw canvas
    drawCanvas = document.getElementById("drawField");
    dctx = drawCanvas.getContext('2d');

    //get the upscaler canvas
    upscaleCanvas = document.getElementById("partUpscaler");
    uctx = upscaleCanvas.getContext('2d');
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
    //set to multiply for final pass
    rctx.globalCompositeOperation = "multiply";
    //multiply the part for shading
    rctx.drawImage(document.getElementById(part_name), 0, 0);

    //upscale part to 160 x 160 px
    let data = rctx.getImageData(0, 0, 32, 32).data;

    for (n = 0; n < Math.floor(data.length / 4); n++)
    {
        let idx = n * 4;
        let x = n % 32;
        let y = Math.floor(n / 32);
        let color = `rgba(${data[idx]}, ${data[idx + 1]}, ${data[idx + 2]}, ${data[idx + 3]})`;

        uctx.fillStyle = color;
        uctx.fillRect(x * scale, y * scale, scale, scale);
    }
    console.log(data);
    dctx.drawImage(upscaleCanvas, posx * scale, posy * scale);
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

function randRange(vmin, vmax)
{
    return vmin + (Math.random() * (vmax - vmin));
}

function randomSkinColor()
{
    let h = randRange(0, 360);
    let s = randRange(0.7, 1);
    let l = randRange(0.7, 1);

    let rgb = HSLtoRGB(h, s, l);

    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function randomEyeColor()
{
    let h = randRange(0, 360);
    let s = randRange(0.8, 1);
    let l = randRange(0.8, 1);
}

function sandbox()
{
    for (x = 0; x < (640 / 160); x++)
    {
        for (y = 0; y < (640/160); y++)
        {
            renderPart("dd_clothes", randomColor(), x * 32, y * 32, 5);
            renderPart("dd_eyes", randomEyeColor(), x * 32, y * 32, 5);
            renderPart("dd_hair", randomColor(), x * 32, y * 32, 5);
            renderPart("dd_lips", randomColor(), x * 32, y * 32, 5);
            renderPart("dd_skin", randomSkinColor(), x * 32, y * 32, 5);
        }
    }
}

window.onload = (evt) =>
{
    getCanvasCtx();
    sandbox();
}