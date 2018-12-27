async function cmSort(a, l, r, threshold, display) {
    glob_comp++;
    refresh(glob_movm, glob_comp);

    if (r - l <= threshold) {
        await cocktailmSort(a, l, r, display);
        return new Promise(resolve => resolve(a.slice(l, r + 1)));
    }

    let a1 = await cmSort(a, l, Math.floor((l + r) / 2), threshold, display),
        a2 = await cmSort(a, Math.floor((l + r) / 2 + 1), r, threshold, display),
        a3 = [];

    let i = 0;
    while (a2[0] !== undefined) {
        if (a1[0] < a2[0]) {
            a3[i] = a1.splice(0, 1)[0];
            a[i] = a3[i];
        } else {
            a3[i] = a2.splice(0, 1)[0];
            a[i] = a3[i];
        }

        glob_comp += 2;
        glob_movm++;

        refresh(glob_movm, glob_comp);

        display(a, [i]);
        await sleep(glob_sleep_time);

        i++;
    }

    a3.push(...a1);
    a3.push(...a2);

    for (let j = i; j < a3.length; j++) {
        a[j] = a3[j];

        display(a, [j]);
        await sleep(glob_sleep_time);
    }

    return new Promise(resolve => resolve(a3));
}

async function cocktailmSort(a, l, r, display) {
    while (l < r) {
        for (let i = l; i < r; i++) {
            if (a[i] > a[i + 1]) {
                let temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;

                glob_movm += 2;
                display(a, [i, i+1]);

                await sleep(glob_sleep_time);
            }

            glob_comp++;
            refresh(glob_movm, glob_comp);
        }
        r--;

        for (let i = r; i > l; i--) {
            if (a[i] < a[i - 1]) {
                let temp = a[i];
                a[i] = a[i - 1];
                a[i - 1] = temp;

                glob_movm += 2;
                display(a, [i, i-1]);

                await sleep(glob_sleep_time);
            }

            glob_comp++;
            refresh(glob_movm, glob_comp);
        }
        l++;
    }
}