async function dSelectionSort(a, display) {
    let movm = 0,
        comp = 0;

    let l = 0,
        r = a.length-1;

    while (l<r) {
        // -- MINIMUM -- //
        let min = l;

        for (let i = l; i <= r; i++) {
            if (a[i]<a[min])
                min = i;
            comp++;
        }

        let temp = a[l];
        a[l] = a[min];
        a[min] = temp;

        l++;

        movm+=2;
        refresh(movm, comp);

        display(a);
        await sleep(glob_sleep_time);

        // -- MAXMIMUM -- //
        let max = r;

        for (let i = r; i >= l; i--) {
            if (a[i]>a[max])
                max = i;
            comp++;
        }

        temp = a[r];
        a[r] = a[max];
        a[max] = temp;

        r--;

        movm+=2;
        refresh(movm, comp);

        display(a);
        await sleep(glob_sleep_time);
    }
}