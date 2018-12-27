function allOccurrencesOf(a, e) {
    var indexes = [], i = -1;
    while((i=a.indexOf(e, i+1))!=-1)
        indexes.push(i);

    return indexes;
}

async function cSort(a, display) {
    let c_a = [],
        movm = 0,
        comp = 0;

    for (let i = Math.min(...a); i < Math.max(...a)+1; i++) {
        let count = 0;
        for (let j = 0; j < a.length; j++) {
            if (a[j]==i) {
                count++;
                comp++;

                refresh(movm, comp);
            }
        }

        display(a, allOccurrencesOf(a, i));
        await sleep(glob_sleep_time);

        c_a.push(count);
    }

    for (let i = 0; i < c_a.length-1; i++) {
        c_a[i+1] += c_a[i];
    }

    let e = a.slice();

    for (let i = 0; i < a.length; i++) {
        c_a[a[i]-Math.min(...a)]--;
        e[c_a[a[i]-Math.min(...a)]] = a[i];

        movm++;

        await display(e, [c_a[a[i]-Math.min(...a)], i]);
        refresh(movm, comp);

        await sleep(glob_sleep_time);
    }

    for (let i = 0; i < a.length; i++)
        a[i] = e[i];
}