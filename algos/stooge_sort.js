async function stoogeSort(a, l, r, display) {
    l = l || 0;
    r = r || a.length - 1;

    if (a[l] > a[r]) {
        let temp = a[l];
        a[l] = a[r];
        a[r] = temp;

        glob_movm += 2;

        display(a, [l, r]);
        await sleep(glob_sleep_time);
    }
    glob_comp++;

    refresh(glob_movm, glob_comp);

    if (r - l + 1 > 2) {
        let x = Math.floor((r - l + 1) / 3);

        await stoogeSort(a, l, r - x, display);
        await stoogeSort(a, l + x, r, display);
        await stoogeSort(a, l, r - x, display);
    }
}