async function qmSort(a, l, r, threshold, display) {
    if (r-l<=threshold) {
        await mergeSort(a, l, r, display);
        return;
    }

    let p = await quickPartition(a, l, r, display);

    if ((p-1)-l >= 1)
        await qmSort(a, l, p-1, threshold, display);
    if (r-(p+1) >= 1)
        await qmSort(a, p+1, r, threshold, display);
}