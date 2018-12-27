async function gnomeSort(a, display) {
    let movm = 0,
        comp = 0;

    for (let i = 0; i < a.length-1; i++) {
        if (i<0)
            i=0;

        if (a[i]>a[i+1]) {
            let temp = a[i];
            a[i] = a[i+1];
            a[i+1] = temp;

            movm+=2;

            display(a, [i, i+1]);
            await sleep(glob_sleep_time);

            i-=2;
            continue;
        }

        comp++;
        refresh(movm, comp);
    }
}