// Canvas variables
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// Options
var scale = 1;
var r = 255, g = 0, b = 0, a = 255;
var dashedCount = 0;

function drawPixel(x, y) {
  if (chkDashed.checked) {
    if (dashedCount < 20) {
      ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
      ctx.fillRect(x, y, scale, scale);
    } else if (dashedCount > 40) {
      dashedCount = -1;
    }
    dashedCount++;
  } else {
    ctx.fillStyle = "rgba("+r+","+g+","+b+","+(a/255)+")";
    ctx.fillRect(x, y, scale, scale);
  }
}

function drawLine(x1, y1, x2, y2) {
  // Find m and b
  var m = (y2 - y1) / (x2 - x1);
  var b = y1 - (m * x1);
  // Set starting point
  var xPoint, xLimit, yPoint, yLimit, yPrev;
  if (x1 <= x2) {
    xPoint = x1;
    xLimit = x2;
  } else {
    xPoint = x2;
    xLimit = x1;
  }
  // Draw the line
  yPrev = m * xPoint + b;
  // Go from lower x to higher x
  for (var x = xPoint; x <= xLimit; x++) {
    yPoint = m * x + b;
    // Add vertical lines where gap is greater than 1
    if (Math.abs(yPoint - yPrev) > 1) {
      var diff = yPoint - yPrev;
      var start, end;
      if (diff < 0) {
        start = yPoint;
        end = yPrev;
      } else {
        start = yPrev;
        end = yPoint;
      }
      for (var i = start; i <= end; i++) {
        drawPixel(x, i, r, g, b, a);
      }
    }
    drawPixel(x, yPoint, r, g, b, a);
    yPrev = yPoint;
  }
  // If we have a vertical line
  if (x1 == x2) {
    if (y1 <= y2) {
      yPoint = y1;
      yLimit = y2;
    } else {
      yPoint = y2;
      yLimit = y1;
    }
    for (var i = yPoint; i <= yLimit; i++) {
      drawPixel(x1, i, r, g, b, a);
    }
  }
}

function drawRectangle(x1, y1, x2, y2) {
  drawLine(x1, y1, x2, y1);
  drawLine(x2, y1, x2, y2);
  drawLine(x2, y2, x1, y2);
  drawLine(x1, y2, x1, y1);
}

function drawCircle(x1, y1, x2, y2) {
  // Set up variables we need
  var r = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  var x = r;
  var y = 0;
  var p = 1 - r;
  // Draw the initial point
  drawPixel(x + x1, y + y1);
  // If radius is more than just a dot
  if (r > 0) {
    drawPixel(x + x1, -y + y1);
    drawPixel(y + x1, x + y1);
    drawPixel(-y + x1, x + y1);
  }

  while (x > y) {
    y++;
    if (p <= 0) {
      p = p + (2 * y) + 1;
    } else {
      x--;
      p = p + (2 * y) - (2 * x) + 1;
    }
    if (x < y) break;
    drawPixel(x + x1, y + y1);
    drawPixel(-x + x1, y + y1);
    drawPixel(x + x1, -y + y1);
    drawPixel(-x + x1, -y + y1);
    if (x != y) {
      drawPixel(y + x1, x + y1);
      drawPixel(-y + x1, x + y1);
      drawPixel(y + x1, -x + y1);
      drawPixel(-y + x1, -x + y1);
    }
  }
}

function drawEllipse(x1, y1, x2, y2) {
  var a = Math.abs(x1 - x2);
  var b = Math.abs(y1 - y2);
  var x = 0, y = b, p, dpe, dps, dpse, d2pe, d2ps, d2pse;

  p = Math.pow(b, 2) + ((Math.pow(a, 2) * (1 - 4 * b) - 2)) / 4;
  dpe = 3 * Math.pow(b, 2);
  d2pe = 2 * Math.pow(b, 2);
  dpse = dpe - (2 * Math.pow(a, 2)) * (b-1);
  d2pse = d2pe + 2 * Math.pow(a, 2);
  plotEllipse(x1, y1, x, y);
  
  while (dpse < (2 * Math.pow(a, 2)) + (3 * Math.pow(b, 2))) {
    if (p < 0) {
      p += dpe;
      dpe += d2pe;
      dpse += d2pe;
    } else {
      p += dpse;
      dpe += d2pe;
      dpse += d2pse;
      y--;
    }
    x++;
    plotEllipse(x1, y1, x, y);
  }

  p = p - ((Math.pow(a, 2) * (4 * y - 3)) + (Math.pow(b, 2) * (4 * x + 3)) + 2) / 4;
  dps = Math.pow(a, 2) * (3 - 2 * y);
  dpse = 2 * Math.pow(b, 2) + 3 * Math.pow(a, 2);
  d2ps = 2 * Math.pow(a, 2);

  while (y > 0) {
    if (p > 0) {
      p += dpe;
      dpe += d2ps;
      dpse += d2ps;
    } else {
      p += dpse;
      dpe += d2ps;
      dpse += d2pse;
      x++;
    }
    y--;
    plotEllipse(x1, y1, x, y);
  }
}

function plotEllipse(x1, y1, x2, y2) {
  drawPixel(x1 + x2, y1 + y2);
  drawPixel(x1 + x2, y1 - y2);
  drawPixel(x1 - x2, y1 + y2);
  drawPixel(x1 - x2, y1 - y2);
}