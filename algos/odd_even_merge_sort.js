async function oemSort(a, l, r, threshold, display) {
    glob_comp++;
    refresh(glob_movm, glob_comp);

    if (r - l <= threshold) {
        let ra = await oemOeSort(a, l, r, display);
        return new Promise(resolve => resolve(ra.slice(l, r + 1)));
    }

    let a1 = await oemSort(a, l, Math.floor((l + r) / 2), threshold, display),
        a2 = await oemSort(a, Math.floor((l + r) / 2 + 1), r, threshold, display);

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

        display(a, [i + l]);
        await sleep(glob_sleep_time);

        i++;
    }

    a3.push(...a1);
    a3.push(...a2);

    for (let j = i; j < a3.length; j++) {
        a[j + l] = a3[j];

        display(a);
        await sleep(glob_sleep_time, [j+l]);
    }

    return new Promise(resolve => resolve(a3));
}

async function oemOeSort(a, l, r, display) {
    let sorted = false;
    while (!sorted) {
        sorted = true;

        for (let i = (l % 2 == 0 ? l + 1 : l); i < r; i += 2) {
            if (a[i] > a[i + 1]) {
                let t = a[i];
                a[i] = a[i + 1];
                a[i + 1] = t;

                sorted = false;
                glob_movm += 2;

                display(a, [i, i+1]);
                await sleep(glob_sleep_time);
            }

            glob_comp++;
            refresh(glob_movm, glob_comp);
        }

        for (let i = (l % 2 == 0 ? l : l + 1); i < r; i += 2) {
            if (a[i] > a[i + 1]) {
                let t = a[i];
                a[i] = a[i + 1];
                a[i + 1] = t;

                sorted = false;
                glob_movm += 2;

                display(a, [i, i+1]);
                await sleep(glob_sleep_time);
            }

            glob_comp++;
            refresh(glob_movm, glob_comp);
        }
    }

    return new Promise(resolve => resolve(a));
}