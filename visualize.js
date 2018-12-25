function sleep(ms) {
    return new Promise(resolve => window.setTimeout(resolve, ms));
}

function refresh(movm, comp) {
    document.getElementById('comparisons').innerHTML = comp;
    document.getElementById('movements').innerHTML = movm;
    document.getElementById('runtime').innerHTML = ((new Date()).getTime()-glob_stime)/1000.0;
}

function display_array_pillars(arr) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let scale = canvas.height/Math.max(...arr);

    for (let i = canvas.width/(arr.length-1); i < canvas.width; i+=canvas.width/(arr.length-1)) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.moveTo(i, canvas.height);
        ctx.lineTo(i, canvas.height-(arr[Math.floor(i/(canvas.width/(arr.length-1)))]*scale));
        ctx.stroke();
    }
}
function display_array_color_pillars(arr, line_weight) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let scale = canvas.height/Math.max(...arr);

    line_weight = line_weight || 2;
    let arr_max = Math.max(...arr);

    for (let i = canvas.width/(arr.length-1); i < canvas.width; i+=canvas.width/(arr.length-1)) {
        ctx.beginPath();

        ctx.strokeStyle = "hsl(" + arr[Math.floor(i/(canvas.width/(arr.length-1)))] * (360/arr_max) + ", 100%, 50%)";
        ctx.lineWidth = line_weight;

        ctx.moveTo(i, canvas.height);
        ctx.lineTo(i, canvas.height-(arr[Math.floor(i/(canvas.width/(arr.length-1)))]*scale));

        ctx.stroke();
    }
}
function display_array_pillar_spiral(arr) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 360/(arr.length-1), c = 0; i < 360; i+=360/(arr.length-1), c++) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.moveTo(canvas.width/2, canvas.height/2);
        ctx.lineTo((canvas.width/2) + arr[c] *Math.cos(Math.PI*i/180.0), (canvas.height/2) + arr[c] *Math.sin(Math.PI*i/180.0));
        ctx.stroke();
    }
}
function display_array_color_pillar_spiral(arr, line_weight) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    line_weight = line_weight || 2;
    let arr_max = Math.max(...arr);

    for (let i = 360/(arr.length-1), c = 0; i < 360; i+=360/(arr.length-1), c++) {
        ctx.beginPath();

        ctx.strokeStyle = "hsl(" + arr[c] * (360/arr_max) + ", 100%, 50%)";
        ctx.lineWidth = line_weight;

        ctx.moveTo(canvas.width/2, canvas.height/2);
        ctx.lineTo((canvas.width/2) + arr[c] *Math.cos(Math.PI*i/180.0), (canvas.height/2) + arr[c] *Math.sin(Math.PI*i/180.0));


        ctx.stroke();
    }
}
function display_array_color_circle(arr, line_weight) {
    let arr_max = Math.max(...arr);
    line_weight = line_weight || 3;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let r = canvas.width/3;

    for (let i = 360/(arr.length-1), c = 0; i < 360; i+=360/(arr.length-1), c++) {
        ctx.beginPath();

        ctx.strokeStyle = "hsl(" + arr[c] * (360/arr_max) + ", 100%, 50%)";
        ctx.lineWidth = line_weight;

        ctx.moveTo(canvas.width/2, canvas.height/2);
        ctx.lineTo((canvas.width/2) + r*Math.cos(Math.PI*i/180.0), (canvas.height/2) + r*Math.sin(Math.PI*i/180.0));
        ctx.stroke();
    }

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
}
function display_array_dots(arr, radius) {
    radius = radius || 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let scale = canvas.height/Math.max(...arr);

    for (let i = canvas.width/(arr.length-1); i < canvas.width; i+=canvas.width/(arr.length-1)) {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.ellipse(i, canvas.height-(arr[Math.floor(i/(canvas.width/(arr.length-1)))]*scale), radius, radius, 0, 0, 2*Math.PI);
        ctx.fill();
    }
}
function display_array_color_dots(arr, radius) {
    radius = radius || 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let scale = canvas.height/Math.max(...arr),
        arr_max = Math.max(...arr);

    for (let i = canvas.width/(arr.length-1); i < canvas.width; i+=canvas.width/(arr.length-1)) {
        ctx.beginPath();
        ctx.fillStyle = "hsl(" + arr[Math.floor(i/(canvas.width/(arr.length-1)))] * (360/arr_max) + ", 100%, 50%)";
        ctx.ellipse(i, canvas.height-(arr[Math.floor(i/(canvas.width/(arr.length-1)))]*scale), radius, radius, 0, 0, 2*Math.PI);
        ctx.fill();
    }
}
function display_array_dots_spiral(arr, radius) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    radius = radius || 2;

    for (let i = 360/(arr.length-1), c = 0; i < 360; i+=360/(arr.length-1), c++) {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.ellipse((canvas.width/2) + arr[c] *Math.cos(Math.PI*i/180.0), (canvas.height/2) + arr[c] *Math.sin(Math.PI*i/180.0), radius,
            radius, 0, 0, 2*Math.PI);
        ctx.fill();
    }
}
function display_array_color_dots_spiral(arr, radius) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    radius = radius || 2;
    let arr_max = Math.max(...arr);

    for (let i = 360/(arr.length-1), c = 0; i < 360; i+=360/(arr.length-1), c++) {
        ctx.beginPath();
        ctx.fillStyle = ctx.fillStyle = "hsl(" + arr[Math.floor(i/(canvas.width/(arr.length-1)))] * (360/arr_max) + ", 100%, 50%)";
        ctx.ellipse((canvas.width/2) + arr[c] *Math.cos(Math.PI*i/180.0), (canvas.height/2) + arr[c] *Math.sin(Math.PI*i/180.0), radius,
            radius, 0, 0, 2*Math.PI);
        ctx.fill();
    }
}
function display_array_color_circle_dots(arr, radius) {
    let arr_max = Math.max(...arr);
    radius = radius || 3;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let r = canvas.width/3;

    for (let i = 360/(arr.length-1), c = 0; i < 360; i+=360/(arr.length-1), c++) {
        ctx.beginPath();
        ctx.fillStyle = "hsl(" + arr[c] * (360/arr_max) + ", 100%, 50%)";

        ctx.ellipse((canvas.width/2) + r*Math.cos(Math.PI*i/180.0), (canvas.height/2) + r*Math.sin(Math.PI*i/180.0), radius,
            radius, 0, 0, 2*Math.PI);
        ctx.fill();
    }

    ctx.fillStyle = "black";
    ctx.lineWidth = 1;
}


function draw_random(amount, upper, lower, display) {
    arr = [];

    lower = lower || glob_lower;
    upper = upper || glob_upper;

    for (let i = 0; i < amount; i++)
        arr.push(lower + Math.floor(Math.random()*(upper-lower)));
    display(arr);

    return arr;
}
function draw_semi_random(amount, upper, lower, display) {
    arr = [...Array(upper).keys()].splice(lower);

    for (let i = 0; i < arr.length; i++) {
        let temp = arr[i],
            rindex = Math.floor(Math.random()*arr.length);

        arr[i] = arr[rindex];
        arr[rindex] = temp;
    }
    display(arr);

    return arr;
}

// ------------------------------ GLOBALS ------------------------------------------------------------- //

var glob_amount = 1000,
    glob_lower = 0,
    glob_upper = 150,
    glob_sleep_time = 1,
    glob_sleep_between = 1000,
    glob_display_func = display_array_color_circle,
    glob_random_func = draw_semi_random,
    glob_stime = (new Date()).getTime();

var glob_comp = 0,
    glob_movm = 0;


// ---------------------------------------------------------------------------------------------------- //

async function doCountingSort(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    // -- COUNTING SORT -- //
    document.getElementById('algorithm_div').innerHTML = "CountingSort";
    await cSort(rarr, glob_display_func);

    document.getElementById('algorithm_settings').style.display = "block";
}
async function doQuickSort(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    glob_comp = 0;
    glob_movm = 0;

    // -- QUICKSORT -- // 
    document.getElementById('algorithm_div').innerHTML = "QuickSort";
    await qSort(rarr, 0, rarr.length-1, glob_display_func);

    glob_comp = 0;
    glob_movm = 0;

    document.getElementById('algorithm_settings').style.display = "block";
}
async function doInsertionSort(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    // -- INSERTION SORT -- //
    document.getElementById('algorithm_div').innerHTML = "InsertionSort";
    await iSort(rarr, glob_display_func);

    document.getElementById('algorithm_settings').style.display = "block";
}
async function doSelectionSort(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    // -- SELECTION SORT -- //
    document.getElementById('algorithm_div').innerHTML = "SelectionSort";
    await sSort(rarr, glob_display_func);

    document.getElementById('algorithm_settings').style.display = "block";
}
async function doBubbleSort(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    // -- SELECTION SORT -- //
    document.getElementById('algorithm_div').innerHTML = "BubbleSort";
    await bSort(rarr, glob_display_func);

    document.getElementById('algorithm_settings').style.display = "block";
}
async function doHeapSort(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    glob_comp = 0;
    glob_movm = 0;

    // -- HEAPSORT -- // 
    document.getElementById('algorithm_div').innerHTML = "HeapSort";
    await hSort(rarr, glob_display_func);

    glob_comp = 0;
    glob_movm = 0;

    document.getElementById('algorithm_settings').style.display = "block";
}
async function doRadixSort_i(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    // -- RADIX SORT -- //
    document.getElementById('algorithm_div').innerHTML = "RadixSort [with InsertionSort]";
    await rSort_i(rarr, glob_display_func);

    document.getElementById('algorithm_settings').style.display = "block";
}
async function doRadixSort_c(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    // -- RADIX SORT -- //
    document.getElementById('algorithm_div').innerHTML = "RadixSort [with CountingSort]";
    await rSort_c(rarr, glob_display_func);

    document.getElementById('algorithm_settings').style.display = "block";
}
async function doBitonicSort(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    glob_comp = 0;
    glob_movm = 0;

    // -- BITONIC SORT -- //
    document.getElementById('algorithm_div').innerHTML = "BitonicSort";
    await bitSort(rarr, glob_display_func);

    glob_comp = 0;
    glob_movm = 0;

    document.getElementById('algorithm_settings').style.display = "block";
}
async function doShellSort(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    // -- SHELL SORT -- //
    document.getElementById('algorithm_div').innerHTML = "ShellSort";
    await shellSort(rarr, glob_display_func);

    document.getElementById('algorithm_settings').style.display = "block";
}
async function doMergeSort(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    glob_comp = 0;
    glob_movm = 0;

    // -- MERGE SORT -- //
    document.getElementById('algorithm_div').innerHTML = "MergeSort";
    await mergeSort(rarr, 0, rarr.length-1, glob_display_func);

    glob_comp = 0;
    glob_movm = 0;

    document.getElementById('algorithm_settings').style.display = "block";
}
async function doBogoSort(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    // -- BOGO SORT -- //
    document.getElementById('algorithm_div').innerHTML = "BogoSort";
    await bogoSort(rarr, glob_display_func);

    document.getElementById('algorithm_settings').style.display = "block";
}
async function doCocktailSort(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    // -- COCKTAIL SORT -- //
    document.getElementById('algorithm_div').innerHTML = "CocktailShaker-Sort";
    await cocktailSort(rarr, glob_display_func);

    document.getElementById('algorithm_settings').style.display = "block";
}
async function doGnomeSort(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    // -- GNOME SORT -- //
    document.getElementById('algorithm_div').innerHTML = "GnomeSort";
    await gnomeSort(rarr, glob_display_func);

    document.getElementById('algorithm_settings').style.display = "block";
}
async function doCombSort(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    // -- GNOME SORT -- //
    document.getElementById('algorithm_div').innerHTML = "CombSort";
    await combSort(rarr, glob_display_func);

    document.getElementById('algorithm_settings').style.display = "block";
}
async function doTreeSort(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    // -- TREE SORT -- //
    document.getElementById('algorithm_div').innerHTML = "TreeSort";
    await treeSort(rarr, glob_display_func);

    document.getElementById('algorithm_settings').style.display = "block";
}
async function doIntroSort(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    glob_comp = 0;
    glob_movm = 0;

    // -- INTRO SORT -- //
    document.getElementById('algorithm_div').innerHTML = "IntroSort";
    await introSort(rarr, glob_display_func);

    glob_comp = 0;
    glob_movm = 0;

    document.getElementById('algorithm_settings').style.display = "block";
}
async function doSlowSort(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    glob_comp = 0;
    glob_movm = 0;

    // -- INTRO SORT -- //
    document.getElementById('algorithm_div').innerHTML = "SlowSort";
    await slowSort(rarr, 0, rarr.length-1, glob_display_func);

    glob_comp = 0;
    glob_movm = 0;

    document.getElementById('algorithm_settings').style.display = "block";
}
async function doStoogeSort(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    glob_comp = 0;
    glob_movm = 0;

    // -- INTRO SORT -- //
    document.getElementById('algorithm_div').innerHTML = "StoogeSort";
    await stoogeSort(rarr, 0, rarr.length-1, glob_display_func);

    glob_comp = 0;
    glob_movm = 0;

    document.getElementById('algorithm_settings').style.display = "block";
}
async function doDSelectionSort(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    // -- DOUBLE SELECTION SORT -- //
    document.getElementById('algorithm_div').innerHTML = "Double SelectionSort";
    await dSelectionSort(rarr, glob_display_func);

    document.getElementById('algorithm_settings').style.display = "block";
}
async function doGravitySort(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    // -- GRAVITY SORT -- //
    document.getElementById('algorithm_div').innerHTML = "GravitySort";
    await gravitySort(rarr, glob_display_func);

    document.getElementById('algorithm_settings').style.display = "block";
}
async function doCocktailMergeSort(rarr) {
    document.getElementById('algorithm_settings').style.display = "none";

    glob_comp = 0;
    glob_movm = 0;

    // -- COCKTAIL-MERGE SORT -- //
    document.getElementById('algorithm_div').innerHTML = "Cocktail-MergeSort";
    await cmSort(rarr, 0, rarr.length-1, Math.floor(rarr.length/8), glob_display_func);

    glob_comp = 0;
    glob_movm = 0;

    document.getElementById('algorithm_settings').style.display = "block";
}


async function visualize_init(amount, upper, lower) {
    amount = amount || glob_amount;
    upper = upper || glob_upper;
    lower = lower || glob_lower;

    glob_stime = (new Date()).getTime();

    // -- PAUSE -- //
    refresh(0, 0);
    rarr = glob_random_func(amount, upper, lower, glob_display_func);
    await sleep(glob_sleep_between);

    // -- COUNTING SORT -- //
    // await doCountingSort(rarr);

    // // -- PAUSE -- //
    // await sleep(glob_sleep_between);
    // refresh(0, 0);
    // rarr = glob_random_func(amount, upper, lower, glob_display_func);
    // await sleep(glob_sleep_between);

    // // -- QUICK SORT -- //
    await doQuickSort(rarr);

    // await sleep(10000);

    // // -- PAUSE -- //
    // await sleep(glob_sleep_between);
    // refresh(0, 0);
    // rarr = glob_random_func(amount, upper, lower, glob_display_func);
    // await sleep(glob_sleep_between);

    // // -- INSERTION SORT -- //
    // await doInsertionSort(rarr);

    // // -- PAUSE -- //
    // await sleep(glob_sleep_between);
    // refresh(0, 0);
    // rarr = glob_random_func(amount, upper, lower, glob_display_func);
    // await sleep(glob_sleep_between);

    // // -- SELECTION SORT -- //
    // await doSelectionSort(rarr);
}