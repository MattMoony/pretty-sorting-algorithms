async function introSort(a, display) {
    let maxDepth = Math.floor(Math.log(a.length) * 2);
    await introSort_rec(a, 0, a.length-1, maxDepth, display);
}

async function introSort_rec(a, l, r, maxd, display) {
    let p = await quickPartition(a, l, r, display);

    if (maxd == 0) {
        let reta = await hSort_i(a.slice(l, r+1));

        for (let i = 0; i < reta.length; i++) {
            a[i+l] = reta[i];

            glob_movm++;
            refresh(glob_movm, glob_comp);

            display(a);
            await sleep(glob_sleep_time);
        }
    }
    else {
        if ((p-1)-l >= 1) {
            await introSort_rec(a, l, p-1, maxd-1, display);
        }
        if (r-(p+1) >= 1) {
            await introSort_rec(a, p+1, r, maxd-1, display);
        }
    }
}

async function quickPartition(a, l, r, display) {
    var p = r;

    while (l < r) {
        while (l < r && a[l] <= a[p]) {
            l++;
            glob_comp++;
        }
        while (r > l && a[r] >= a[p]) {
            r--;
            glob_comp++;
        }

        var t = a[l];
        a[l] = a[r];
        a[r] = t;

        glob_movm += 2;
        refresh(glob_movm, glob_comp);

        display(a, [l, r]);
        await sleep(glob_sleep_time)
    }

    t = a[l];
    a[l] = a[p];
    a[p] = t;

    display(a, [l, p]);
    await sleep(glob_sleep_time);

    return new Promise(resolve => resolve(l));
}

async function to_max_heap_rec_i(n) {
    let change = false;

    if (n.nodes[0]) {
        if (n.nodes[0].value > n.value) {
            let t = n.nodes[0].value;
            n.nodes[0].value = n.value;
            n.value = t;

            change = true;
        }

        change = await to_max_heap_rec_i(n.nodes[0]) || change;
    }
    if (n.nodes[1]) {
        if (n.nodes[1].value > n.value) {
            let t = n.nodes[1].value;
            n.nodes[1].value = n.value;
            n.value = t;

            change = true;
        }

        change = await to_max_heap_rec_i(n.nodes[1]) || change;
    }

    return new Promise(resolve => { resolve(change) });
}
async function to_max_heap_i(n) {
    while (await to_max_heap_rec_i(n)) { }
}

async function hSort_i(a) {
    for (let sorted = 0; sorted < a.length; sorted++) {
        n = to_heap(a.slice(0, a.length - sorted));
        await to_max_heap_i(n);

        a.splice(0, a.length - sorted);
        a.unshift(...to_array(n));

        let t = a[a.length - sorted - 1];
        a[a.length - sorted - 1] = a[0];
        a[0] = t;
    }

    return new Promise(resolve => resolve(a));
}