Visualizing Sorting Algorithms
------------------------------

A try to make the work of sorting algorithms visible.<br/>
Although the speed may not always be a 100% accurate, 
I hope that the project itself is still quite enjoyable.

New sorting algorithms can easily be added.<br/>
The sorting algorithm's function needs to be "async" (as
otherwise, the current sleep function could not be called),
furthermore, the function gets one argument: display.
Its value will be a function that takes an array as an argument
and displays it visually in an HTML5 canvas. Also, the function
can/should keep track of its comparisons and movements, and 
can/should call the function "refresh" with said variable's values
ever so often.


Inspired by the work of: <br/>
	- Timo Bingmann (https://www.youtube.com/user/tbingmann)<br/>
	- w0rthy (https://www.youtube.com/user/carnifexV)<br/>
	
