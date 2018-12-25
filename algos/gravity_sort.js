async function gravitySort(a, display) {
    let movm = 0,
        comp = 0;

    let m = Math.max(...a);
    let g = [];

    // TO BEADS ...
    for (let i = 0; i < a.length; i++) {
        g.push([]);

        for (let j = 0; j < m; j++) {
            g[i][j] = a[i]>j ? 1 : 0;
            comp++;
        }

        refresh(movm, comp);
    }

    // "FALLING"
    for (let x = 0; x < m; x++) {
        let count = 0;

        for (let y = 0; y < g.length; y++) {
            if (g[y][x]==1) {
                count++;
                g[y][x] = 0;
            }

            comp++;
            refresh(movm, comp);
        }

        for (let y = g.length-1; y >= g.length-count; y--) {
            g[y][x] = 1;
        }
    }

    // PUTTING INTO ARRAY
    for (let i = 0; i < a.length; i++) {
        a[i] = g[i].reduce((t, n) => t+n);

        movm++;
        refresh(movm, comp);

        display(a);
        await sleep(glob_sleep_time);
    }
}