var currStep = 0;
async function rSort_i(a, display) {
    let movm = 0,
        comp = 0;
    currStep = 0;

    var max = Math.max(...a);
    var max_l = max.toString().length;
    currStep = max_l - 1;
    for (let i = 0; i < a.length; ++i) {
        var temp = a[i].toString();
        if (a[i].toString().length < max_l) {
            comp++;

            refresh(movm, comp);

            for (let j = 0; j < max_l - a[i].toString().length; ++j) {
                temp = "0" + temp;
            }
        }
        a[i] = temp;
        movm++;

        refresh(movm, comp);
        display(a, [i]);
        await sleep(glob_sleep_time);
    }


    for (let i = 0; i < max_l; ++i) {
        b = await iSortR(a, display, comp, movm);

        movm = b[0]
        comp = b[1]

        currStep -= 1;
    }

    refresh(movm, comp);
    display(a);
    await sleep(glob_sleep_time);
}
async function iSortR(a, display, comp, movm) {
    for (let i = 1; i < a.length; i++) {
        let j = i - 1,
            t = a[i],
            t1 = a[i][currStep];

        for (j = i - 1; j >= 0; --j) {
            if (a[j][currStep] > t1) {
                a[j + 1] = a[j];

                comp++;
                movm++;

                refresh(movm, comp);
                display(a, [j+1, j]);
            } else {
                break;
            }
        }
        a[j + 1] = t;

        movm++;

        refresh(movm, comp);
        display(a, [i, j+1]);
        await sleep(glob_sleep_time);
    }

    return new Promise(resolve => { resolve([movm, comp]) })
}

async function rSort_c(a, display) {
    let movm = 0,
        comp = 0;
    currStep = 0;

    var max = Math.max(...a);
    var max_l = max.toString().length;
    currStep = max_l - 1;
    for (let i = 0; i < a.length; ++i) {
        var temp = a[i].toString();
        if (a[i].toString().length < max_l) {
            comp++;

            refresh(movm, comp);

            for (let j = 0; j < max_l - a[i].toString().length; ++j) {
                temp = "0" + temp;
            }
        }
        a[i] = temp;
        movm++;

        refresh(movm, comp);
        display(a, [i]);
        await sleep(glob_sleep_time);
    }


    for (let i = 0; i < max_l; ++i) {
        b = await cSortR(a, display, comp, movm);

        movm = b[0]
        comp = b[1]

        currStep -= 1;
    }

    refresh(movm, comp);
    display(a);
    await sleep(glob_sleep_time);
}
async function cSortR(a, display, comp, movm) {
    let c_a = [];

    for (let i = 0; i < 10; i++) {
        let count = 0;
        for (let j = 0; j < a.length; j++) {
            if (parseInt(a[j][currStep])==i) {
                count++;
                comp++;

                refresh(movm, comp);
            }
        }
        c_a.push(count);

        await sleep(glob_sleep_time);
    }

    for (let i = 0; i < c_a.length-1; i++) {
        c_a[i+1] += c_a[i];
    }

    let e = a.slice();

    for (let i = a.length-1; i >= 0; i--) {
        c_a[parseInt(a[i][currStep])]--;
        e[c_a[parseInt(a[i][currStep])]] = a[i];

        movm++;

        display(e, [c_a[parseInt(a[i][currStep])], i]);
        refresh(movm, comp);
        await sleep(glob_sleep_time);
    }

    for (let i = 0; i < a.length; i++)
        a[i] = e[i];

    return new Promise(resolve => { resolve([movm, comp]) });
}