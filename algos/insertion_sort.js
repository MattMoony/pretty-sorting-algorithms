async function iSort(a, display) {
    let movm = 0,
        comp = 0;

    for (let i = 1; i < a.length; i++) {
        var cu_el = a[i],
            j = i-1;

        for (j = i-1; j >= 0; j--) {
            if (a[j]>cu_el) {
                a[j+1] = a[j];
            } else {
                break;
            }
            
            comp++;
            movm++;

            refresh(movm, comp);
        }

        a[j+1] = cu_el;

        movm++;
        refresh(movm, comp);

        display(a, [i, j+1]);
        await sleep(glob_sleep_time);
    }
}