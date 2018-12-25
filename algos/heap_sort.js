class hNode {
    constructor(value, index) {
        this.value = value
        this.nodes = []
        this.index = index
    }

    addNode(n) {
        this.nodes.push(n)
    }
}

function to_heap(a, i, l) {
    i = i || 0
    l = l || 0

    let root = new hNode(a[i], i);

    if (i + Math.floor(Math.pow(2, l)) < a.length) {
        if (i % 2 == 0 && i > 0) {
            root.addNode(to_heap(a, i + Math.floor(Math.pow(2, l + 1)) - 1, l + 1));
            root.addNode(to_heap(a, i + Math.floor(Math.pow(2, l + 1)), l + 1));
        } else {
            root.addNode(to_heap(a, i + Math.floor(Math.pow(2, l)), l + 1));
            root.addNode(to_heap(a, i + Math.floor(Math.pow(2, l)) + 1, l + 1));
        }
    }

    return root
}
function to_array(n) {
    let ra = [];
    ra[n.index] = n.value;

    if (n.nodes[0]) {
        arr = to_array(n.nodes[0]);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i])
                ra[i] = arr[i];
        }
    }
    if (n.nodes[1]) {
        arr = to_array(n.nodes[1]);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i])
                ra[i] = arr[i];
        }
    }

    return ra;
}

async function to_max_heap_rec(n, display, past) {
    let change = false;

    if (n.nodes[0]) {
        let cua = to_array(n);

        if (n.nodes[0].value > n.value) {
            let t = n.nodes[0].value;
            n.nodes[0].value = n.value;
            n.value = t;

            change = true;

            glob_comp++;
            glob_movm += 2;

            refresh(glob_movm, glob_comp);
            cua = to_array(n);
            cua.push(...past);

            display(cua);
        }

        cua.splice(cua.length-past.length);
        change = await to_max_heap_rec(n.nodes[0], display, past) || change;
    }
    if (n.nodes[1]) {
        let cua = to_array(n);

        if (n.nodes[1].value > n.value) {
            let t = n.nodes[1].value;
            n.nodes[1].value = n.value;
            n.value = t;

            change = true;

            glob_comp++;
            glob_movm += 2;

            refresh(glob_movm, glob_comp);
            cua = to_array(n);
            cua.push(...past);

            display(cua);
        }

        cua.splice(cua.length-past.length);
        change = await to_max_heap_rec(n.nodes[1], display, past) || change;
    }

    return new Promise(resolve => { resolve(change) });
}

async function to_max_heap(n, display, sorted_els) {
    while (await to_max_heap_rec(n, display, sorted_els)) { }
}

async function hSort(a, display) {
    for (let sorted = 0; sorted < a.length; sorted++) {
        n = to_heap(a.slice(0, a.length - sorted));
        await to_max_heap(n, display, a.slice(a.length-sorted));

        a.splice(0, a.length - sorted);
        a.unshift(...to_array(n));

        glob_movm++;

        refresh(glob_movm, glob_comp);

        let t = a[a.length - sorted - 1];
        a[a.length - sorted - 1] = a[0];
        a[0] = t;

        glob_movm+=2;

        refresh(glob_movm, glob_comp);
        display(a);

        await sleep(glob_sleep_time);
    }
}