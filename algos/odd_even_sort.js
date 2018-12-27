async function oeSort(a, display) {
    let movm = 0,
        comp = 0;

    let sorted = false;
    while (!sorted) {
        sorted = true;

        for (let i = 1; i < a.length - 1; i += 2) {
            if (a[i] > a[i + 1]) {
                let t = a[i];
                a[i] = a[i + 1];
                a[i + 1] = t;

                sorted = false;
                movm+=2;

                display(a, [i, i+1]);
                await sleep(glob_sleep_time);
            }

            comp++;
            refresh(movm, comp);
        }

        for (let i = 0; i < a.length - 1; i += 2) {
            if (a[i] > a[i + 1]) {
                let t = a[i];
                a[i] = a[i + 1];
                a[i + 1] = t;

                sorted = false;
                movm+=2;

                display(a, [i, i+1]);
                await sleep(glob_sleep_time);
            }

            comp++;
            refresh(movm, comp);
        }
    }

    return new Promise(resolve => resolve(a));
}