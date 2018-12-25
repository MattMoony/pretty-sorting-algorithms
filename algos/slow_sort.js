async function slowSort(a, l, r, display) {
    if (l>=r)
        return;

    let c = Math.floor((l+r)/2);

    slowSort(a, l, c, display);
    slowSort(a, c+1, r, display);

    if (a[c]>a[r]) {
        let temp = a[c];
        a[c] = a[r];
        a[r] = temp;

        glob_movm+=2;
    }
    glob_comp++;

    refresh(glob_movm, glob_comp);

    display(a);
    await sleep(glob_sleep_time);

    slowSort(a, l, r-1, display);
}