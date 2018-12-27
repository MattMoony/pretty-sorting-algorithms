async function slowSort(a, l, r, display) {
    if (l >= r)
        return;

    let c = Math.floor((l + r) / 2);

    await slowSort(a, l, c, display);
    await slowSort(a, c + 1, r, display);

    if (a[c] > a[r]) {
        let temp = a[c];
        a[c] = a[r];
        a[r] = temp;

        glob_movm += 2;

        display(a, [c, r]);
        await sleep(glob_sleep_time);
    }
    glob_comp++;

    refresh(glob_movm, glob_comp);

    await slowSort(a, l, r - 1, display);
}