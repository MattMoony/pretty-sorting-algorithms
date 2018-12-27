async function cocktailSort(a, display) {
    let movm = 0,
        comp = 0;

    let l = 0,
        r = a.length-1;

    while (l<r) {
        for (let i = l; i < r; i++) {
            if (a[i]>a[i+1]) {
                let temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;

                movm+=2;
                display(a, [i, i+1]);

                await sleep(glob_sleep_time);
            }

            comp++;
            refresh(movm, comp);
        }
        r--;

        for (let i = r; i > l; i--) {
            if (a[i]<a[i-1]) {
                let temp = a[i];
                a[i] = a[i-1];
                a[i-1] = temp;

                movm+=2;
                display(a, [i, i-1]);

                await sleep(glob_sleep_time);
            }

            comp++;
            refresh(movm, comp);
        }
        l++;
    }
}