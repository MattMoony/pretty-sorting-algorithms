async function bogoSort(a, display) {
    let stats = {
        movm: 0,
        comp: 0
    }

    while (! await is_sorted(a, stats)) {
        await shuffle(a, display, stats);
    }
}

async function is_sorted(a, stats) {
    for (let i = 0; i < a.length-1; i++){
        if (a[i]>a[i+1])
            return new Promise(resolve => resolve(false));

        stats.comp++;
        refresh(stats.movm, stats.comp);
    }

    return new Promise(resolve => resolve(true));
}

async function shuffle(a, display, stats) {
    for (let i = 0; i < a.length; i++) {
        let temp = a[i],
            rindex = Math.floor(Math.random()*a.length);

        a[i] = arr[rindex];
        a[rindex] = temp;


        stats.movm+=2;
        refresh(stats.movm, stats.comp);
        
        display(a, [i, rindex]);
        await sleep(glob_sleep_time);
    }
}