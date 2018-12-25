class tNode {
    constructor(value) {
        this.value = value;
        
        this.leftChild = null;
        this.rightChild = null;
    }

    addNode(value, movm, comp) {
        if (value <= this.value) {
            if (this.leftChild) {
                this.leftChild.addNode(value);
            } else {
                this.leftChild = new tNode(value);
            }
        } else {
            if (this.rightChild) {
                this.rightChild.addNode(value);
            } else {
                this.rightChild = new tNode(value);
            }
        }

        comp++;
        refresh(movm, comp);
        
        return comp
    }

    get inorder() {
        let ls = [];

        if (this.leftChild)
            ls.push(...this.leftChild.inorder);
        ls.push(this.value);
        if (this.rightChild)
            ls.push(...this.rightChild.inorder);

        return ls;
    }
}

async function treeSort(a, display) {
    let movm = 0,
        comp = 0;

    let tree = new tNode(a[0]);
    for (let i = 1; i < a.length; i++) {
        comp = tree.addNode(a[i], movm, comp);
    }

    s = tree.inorder;
    for (let i = 0; i < a.length; i++) {
        a[i] = s[i];

        movm++;
        refresh(movm, comp);

        display(a);
        await sleep(glob_sleep_time);
    }

    return a;
}