async function mergeSort(a, l, r, display) {
    glob_comp++;
    refresh(glob_movm, glob_comp);

    if (l == r)
        return new Promise(resolve => resolve([a[l]]));

    let a1 = await mergeSort(a, l, Math.floor((l + r) / 2), display),
        a2 = await mergeSort(a, Math.floor((l + r) / 2 + 1), r, display);
    a3 = [],
        x = 0,
        y = 0,
        len_min = a1.length < a2.length ? a1.length : a2.length;

    let i = 0;
    while (a2[0] !== undefined) {
        if (a1[0] < a2[0]) {
            a3[i] = a1.splice(0, 1)[0];
            a[i + l] = a3[i];
        } else {
            a3[i] = a2.splice(0, 1)[0];
            a[i + l] = a3[i];
        }

        glob_comp += 2;
        glob_movm++;

        refresh(glob_movm, glob_comp);

        display(a, [i + 1]);
        await sleep(glob_sleep_time);

        i++;
    }

    a3.push(...a1);
    a3.push(...a2);

    for (let j = i; j < a3.length; j++) {
        a[j + l] = a3[j];

        display(a, [j+1]);
        await sleep(glob_sleep_time);
    }

    return new Promise(resolve => resolve(a3));
}