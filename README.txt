Programming Assignment 1
Graphics 1 Spring 2018
Programmer: Adam Gaudreau
Due: 21 February 2018

==========
 Overview
==========
In this programming assignment, I implemented three midpoint algorithms: one for line, circle, and ellipse. Additionally, I added buttons to draw rectangles, polygons, and polylines. All of these primitives are drawn on an HTML5 canvas by using no other APIs (except for a small 1x1 rectangle to draw pixels, because canvas does not have a primitive type for pixel).

============
 How to use
============
To begin, click on any of the 6 buttons below the "Draw" title. Then, click on a single point on the canvas and move your cursor to the second point. You'll notice the nice rubberbanding, so you can see exactly how the shape will look. Click once more to place it on the canvas. Continue doing this with any other shapes.The polygon and polylines take similar approaches, but they differ slightly than the rest. Because I wanted to give the user as much freedom as possible, they may create as many points on the canvas they like. When they are satisfied with the shape, you can double click and it will automatically join the point where you double clicked and the first point to close the shape (except for polylines, where it will simply pin the last point).

On the right hand side, you'll see a list of options. Here, you may change the color and tranparency of the line, as well as it's stroke size. Click the "Dashed" checkbox to draw all lines as dashed. Furthermore, you are able to change the color of the canvas as well. Change whatever you'd like there and press "Apply" to see your changes. You can press the "Clear" button below it to empty the canvas.

==============
 "Impress me"
==============
As mentioned earlier, I implemented the nice rubberbanding technique so the user can see exactly how the primitives will look. I also implemented a dashed line feature, and enabled the user to change the color of the line, canvas, and the line size. Other than that, I just made a friendly, clear, and organized user experience to keep it as simple as possible.


================
 Known problems
================
The only problem is with the ellipse. At a certain point, the left and right edges are clipped and form straight lines. I've tweaked the algorithm for hours and came up short and just left it at that. Other than this, there are no known problems. Webpage was tested using Firefox and Chrome.

=================
 Sources of help
=================
The only thing I needed help on was the implementation of the midpoint algorithm for ellipse. I looked atthe pseudocode for it at this source and built it up from that: http://www.cpp.edu/~raheja/CS445/MEA.pdf. Other than that, all work was completed by my own knowledge.
