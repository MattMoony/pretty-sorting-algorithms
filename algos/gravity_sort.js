async function gravitySort(a, display) {
    let m = Math.max(...a);
    let g = [];

    // TO BEADS ...
    for (let i = 0; i < a.length; i++) {
        g.push([]);

        for (let j = 0; j < m; j++) {
            g[i][j] = a[i]>j ? 1 : 0;
            glob_comp++;
        }

        refresh(glob_movm, glob_comp);
    }

    // "FALLING" ...
    for (let x = 0; x < m; x++) {
        let count = 0,
            mod_idxs = [];

        for (let y = 0; y < g.length; y++) {
            if (g[y][x]==1) {
                count++;
                g[y][x] = 0;

                mod_idxs.push(y);
            }

            glob_comp++;
            refresh(glob_movm, glob_comp);
        }
        
        for (let y = g.length-1; y >= g.length-count; y--) {
            g[y][x] = 1;

            mod_idxs.push(y);
        }

        display(await beads_to_array(g), mod_idxs);
        await sleep(glob_sleep_time);
    }

    // PUTTING INTO ARRAY
    await beads_to_array(g, a);
    display(a);
}

async function beads_to_array(g, a) {
    a = a || [];

    // PUTTING INTO ARRAY
    for (let i = 0; i < g.length; i++) {
        a[i] = g[i].reduce((t, n) => t+n);

        glob_movm++;
        refresh(glob_movm, glob_comp);
    }

    return new Promise(resolve => resolve(a));
}