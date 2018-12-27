async function bSort(a, display) {
    let movm = 0,
        comp = 0;

    for (let i = 0; i < a.length; i++) {
        for (let j = i+1; j < a.length; j++) {
            if (a[j] < a[i]) {
                let temp = a[i];
                a[i] = a[j];
                a[j] = temp;

                movm+=2;
                comp++;

                refresh(movm, comp);
                display(a, [i, j]);
                await sleep(glob_sleep_time);
            }
        }
    }
}