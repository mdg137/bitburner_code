class spider {
    constructor(depth,ns) {
        this.depth = depth
    }
    scanarray(y,ns) {
        var list = []
        for (let i = 0; i < y.length; i++) {
            var x = ns.scan(y[i])
            list = list.concat(x)
        }
        for (let i = 0; i < list.length; i++) {
            if (list[i] == "home") {
                list.splice(i, 1)
                i--
            }
            else if (list[i] == "darkweb") {
                list.splice(i, 1)
                i--
            }
            else if (list[i].length == 0) {
                list.splice(i, 1)
                i--
            }
        }
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < list.length; j++) {
                if (list[i] == list[j] && j != i) {
                    list.splice(j, 1)
                    j--
                }
            }
        }
        return list
    }
    make_list(ns) {
        var init_list = ns.scan()
        for (let i = 0; i < this.depth; i++) {
            init_list = init_list.concat(this.scanarray(init_list,ns))
        }
        for (let i = 0; i < init_list.length; i++) {
            if (init_list[i] == "home") {
                init_list.splice(i, 1)
                i--
            }
            else if (init_list[i] == "darkweb") {
                init_list.splice(i, 1)
                i--
            }
            else if (init_list[i].length == 0) {
                init_list.splice(i, 1)
                i--
            }
            for (let j = i + 1; j < init_list.length; j++) {
                if (init_list[i] == init_list[j] && i != j) {
                    init_list.splice(j, 1)
                    j--
                }
            }
        }
        return init_list
    }
    recursive_killall(ns) {
        var x = this.make_list(ns)
        for (let i = 0; i < x.length; i++) {
            ns.killall(x[i])
        }
    }
}