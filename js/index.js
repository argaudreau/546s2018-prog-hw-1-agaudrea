// Lables
var hintDoubleClick = document.getElementById('hint-double-click');
// Buttons
var btnDrawLine = document.getElementById('btn-draw-line');
var btnDrawCirlce = document.getElementById('btn-draw-circle');
var btnDrawEllipse = document.getElementById('btn-draw-ellipse');
var btnDrawRectangle = document.getElementById('btn-draw-rectangle');
var btnDrawPolygon = document.getElementById('btn-draw-polygon');
var btnDrawPolyline = document.getElementById('btn-draw-polyline');
var btnClear = document.getElementById('btn-clear');
var btnApplySettings = document.getElementById('btn-apply-settings');
var chkDashed = document.getElementById('chk-dashed');
// Booleans
var boolAddingLine = false;
var boolAddingCircle = false;
var boolAddingEllipse = false;
var boolAddingRectangle = false;
var boolAddingPolygon = false;
var boolAddingPolyline = false;
// Canvas items
var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
var x1 = -1, y1 = -1, x2 = -1, y2 = -1, originX = -1, originY = -1;

/*
  Event listeners
*/
btnDrawLine.addEventListener('click', function() {
  boolAddingLine = true;
  disableButtons();
});
btnDrawCirlce.addEventListener('click', function() {
  boolAddingCircle = true;
  disableButtons();
});
btnDrawEllipse.addEventListener('click', function() {
  boolAddingEllipse = true;
  disableButtons();
});
btnDrawRectangle.addEventListener('click', function() {
  boolAddingRectangle = true;
  disableButtons();
});
btnDrawPolygon.addEventListener('click', function() {
  boolAddingPolygon = true;
  hintDoubleClick.hidden = false;
  disableButtons();
});
btnDrawPolyline.addEventListener('click', function() {
  boolAddingPolyline = true;
  hintDoubleClick.hidden = false;
  disableButtons();
});
btnClear.addEventListener('click', function() {
  if (confirm('Are you sure you want to clear the canvas?')) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }
});
btnApplySettings.addEventListener('click', function() {
  r = document.getElementById('strokeR').value;
  g = document.getElementById('strokeG').value;
  b = document.getElementById('strokeB').value;
  a = document.getElementById('strokeA').value;
  scale = document.getElementById('size').value;
  document.getElementById('canvas').style.background = "rgba("
    + document.getElementById('canvasR').value + ","
    + document.getElementById('canvasG').value + ","
    + document.getElementById('canvasB').value + ","
    + document.getElementById('canvasA').value + ")";
});

function mouseClick(event) {
  var coord = getMouseCoordinates(event);
  var x = coord.x;
  var y = coord.y;
  ctx.putImageData(imageData, 0, 0);
  // Set first point
  if (x1 == -1 && y1 == -1 && (boolAddingLine || boolAddingRectangle || boolAddingCircle 
    || boolAddingEllipse || boolAddingPolygon || boolAddingPolyline)) {
    x1 = x;
    y1 = y;
  // Set second point
  } else {
    x2 = x;
    y2 = y;
    // Adding a line
    if (boolAddingLine) {
      boolAddingLine = false;
      drawLine(x1, y1, x2, y2);
      enableButtons();
      resetPoints();
    }
    // Adding a circle
    else if (boolAddingCircle) {
      boolAddingCircle = false;
      drawCircle(x1, y1, x2, y2);
      enableButtons();
      resetPoints();
    }
    // Adding an Ellipse
    else if (boolAddingEllipse) {
      boolAddingEllipse = false;
      drawEllipse(x1, y1, x2, y2);
      enableButtons();
      resetPoints();
    }
    // Adding a rectangle
    else if (boolAddingRectangle) {
      boolAddingRectangle = false;
      drawRectangle(x1, y1, x2, y2);
      enableButtons();
      resetPoints();
    }
    // Adding a polygon
    else if (boolAddingPolygon) {
      if (originX == -1 && originY == -1) {
        originX = x1;
        originY = y1;
      }
      drawLine(x1, y1, x2, y2);
      x1 = x2;
      y1 = y2;
    }
    // Adding a polyline
    else if (boolAddingPolyline) {
      if (originX == -1 && originY == -1) {
        originX = x1;
        originY = y1;
      }
      drawLine(x1, y1, x2, y2);
      x1 = x2;
      y1 = y2;
    }
    // Set new image data
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }
}
canvas.addEventListener('click', mouseClick);

function mouseDblClick() {
  if (boolAddingPolygon) {
    drawLine(x1, y1, originX, originY);
    resetPoints();
    enableButtons();
    boolAddingPolygon = false;
    imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }
  if (boolAddingPolyline) {
    resetPoints();
    enableButtons();
    boolAddingPolyline = false;
  }
  hintDoubleClick.hidden = true;
}
canvas.addEventListener('dblclick', mouseDblClick);

function rubberband(event) {
  var coord = getMouseCoordinates(event);
  var x = coord.x;
  var y = coord.y;

  if (x1 != -1 && y1 != -1) {
    x2 = x;
    y2 = y;
    if (boolAddingLine) {
      ctx.putImageData(imageData, 0, 0);
      drawLine(x1, y1, x2, y2);
    } else if (boolAddingCircle) {
      ctx.putImageData(imageData, 0, 0);
      drawCircle(x1, y1, x2, y2);
    } else if (boolAddingEllipse) {
      ctx.putImageData(imageData, 0, 0);
      drawEllipse(x1, y1, x2, y2);
    } else if (boolAddingRectangle) {
      ctx.putImageData(imageData, 0, 0);
      drawRectangle(x1, y1, x2, y2);
    } else if (boolAddingPolygon) {
      ctx.putImageData(imageData, 0, 0);
      drawLine(x1, y1, x2, y2);
    } else if (boolAddingPolyline) {
      ctx.putImageData(imageData, 0, 0);
      drawLine(x1, y1, x2, y2);
    }
  }
}
canvas.addEventListener('mousemove', rubberband);

function getMouseCoordinates(event) {
  return {x: event.offsetX, y: event.offsetY};
}

function enableButtons() {
  btnDrawLine.disabled = false;
  btnDrawCirlce.disabled = false;
  btnDrawEllipse.disabled = false;
  btnDrawRectangle.disabled = false;
  btnDrawPolygon.disabled = false;
  btnDrawPolyline.disabled = false;
  btnClear.disabled = false;
}

function disableButtons() {
  btnDrawLine.disabled = true;
  btnDrawCirlce.disabled = true;
  btnDrawEllipse.disabled = true;
  btnDrawRectangle.disabled = true;
  btnDrawPolygon.disabled = true;
  btnDrawPolyline.disabled = true;
  btnClear.disabled = true;
}

function resetPoints() {
  x1 = -1;
  x2 = -1;
  y1 = -1;
  y2 = -1;
  originX = -1;
  originY = -1;
}

// Fill canvas to div
canvas.style.width='100%';
canvas.style.height='100%';
canvas.width  = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
