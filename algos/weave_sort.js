async function weaveSort(a, l, r, threshold, display) {
    glob_comp++;
    refresh(glob_movm, glob_comp);

    if (r - l <= threshold) {
        let ra = await wiSort(a, l, r, display);
        return new Promise(resolve => resolve(ra.slice(l, r + 1)));
    }

    let a1 = await weaveSort(a, l, Math.floor((l + r) / 2), threshold, display),
        a2 = await weaveSort(a, Math.floor((l + r) / 2 + 1), r, threshold, display);

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

        display(a, [j + 1]);
        await sleep(glob_sleep_time);
    }

    return new Promise(resolve => resolve(a3));
}

async function wiSort(a, l, r, display) {
    for (let i = l + 1; i <= r; i++) {
        var cu_el = a[i],
            j = i - 1;

        for (j = i - 1; j >= l; j--) {
            if (a[j] > cu_el) {
                a[j + 1] = a[j];
            } else {
                break;
            }

            glob_comp++;
            glob_movm++;

            display(a, [j+1, j]);
            await sleep(glob_sleep_time);

            refresh(glob_movm, glob_comp);
        }

        a[j + 1] = cu_el;

        glob_movm++;
        refresh(glob_movm, glob_comp);

        display(a, [j + 1, i]);
        await sleep(glob_sleep_time);
    }

    return new Promise(resolve => resolve(a));
}