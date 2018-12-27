async function sSort(a, display) {
    let movm = 0,
        comp = 0;

    for (let i = 0; i < a.length; i++) {
        var min = i;

        for (let j = i; j < a.length; j++) {
            if (a[j]<a[min]) {
                min = j;

                comp++;
                refresh(movm, comp);
            }
        }

        let t = a[i];
        a[i] = a[min];
        a[min] = t;

        movm++;
        refresh(movm, comp);
        display(a, [i, min]);
        
        await sleep(glob_sleep_time);
    }
}