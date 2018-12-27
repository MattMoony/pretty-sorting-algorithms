async function shellSort(a, display) {
    let movm = 0,
        comp = 0;
    
    for (let gap = Math.floor(a.length/2); gap >= 1; gap=Math.floor(gap/2)) {
        for (let i = gap; i < a.length; i++) {
            let cu = i;

            while (cu-gap >= 0 && a[cu-gap]>a[cu]) {
                let temp = a[cu];
                a[cu] = a[cu-gap];
                a[cu-gap] = temp;

                movm+=2;
                refresh(movm, comp);
                display(a, [cu, cu-gap]);
                
                cu = cu-gap;
            }

            comp++; 
            refresh(movm, comp);
            await sleep(glob_sleep_time);
        }
    }

}