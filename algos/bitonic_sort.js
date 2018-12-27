async function bitSort(a, display) {
    var x = 2;
    while (x <= a.length) {
        for (let i = 0; i < a.length; i += x) {
            await bitSort_rec(a, i, i + x - 1, display);
        }

        x*=2;
    }
}

async function bitSort_rec(a, l, r, display) {
    for (let x = l, y = r; x < y; x++, y--) {
        if (a[x]>a[y]) {
            let temp = a[x];
            a[x] = a[y];
            a[y] = temp;

            glob_comp++;
            glob_movm+=2;

            refresh(glob_movm, glob_comp);
            display(a, [x, y]);
            await sleep(glob_sleep_time);
        }
    }

    if ((r-l)>2) {
        await bitSubSort(a, l, Math.floor((l+r)/2), display)
        await bitSubSort(a, Math.floor((l+r)/2+1), r, display);
    }
}

async function bitSubSort(a, l, r, display) {
    for (let x = Math.floor((l+r)/2), y = r; x >= l; x--, y--) {
        if (arr[x] > arr[y]) {
            let temp = arr[x];
            arr[x] = arr[y];
            arr[y] = temp;

            glob_comp++;
            glob_movm+=2;

            refresh(glob_movm, glob_comp);
            display(a, [x, y]);
            await sleep(glob_sleep_time);
        }
    }

    if ((r-l) > 2) {
        await bitSubSort(a, l, Math.floor((l+r)/2), display);
        await bitSubSort(a, Math.floor((l+r)/2+1), r, display);
    }
}