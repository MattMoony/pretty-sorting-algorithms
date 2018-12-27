async function combSort(a, display) {
    let movm = 0,
        comp = 0;

    let swapped = true,
        gap = a.length;

    while (gap > 1 || swapped) {
        gap = await getGap(gap);

        swapped = false;

        for (let i = 0; i < a.length-gap; i++) {
            if (a[i]>a[i+gap]) {
                let temp = a[i];
                a[i] = a[i+gap];
                a[i+gap] = temp;

                swapped = true;

                movm += 2;

                display(a, [i, i+gap]);
                await sleep(glob_sleep_time);
            }

            comp++;
            refresh(movm, comp);
        }
    }
}

async function getGap(gap) {
    return new Promise(resolve => resolve(Math.floor(gap/1.3) >= 1 ? Math.floor(gap/1.3) : 1));
}