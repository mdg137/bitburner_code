/*
This is the spider class. The purpose of this class is to define objects which iterate over
the network of non-player servers in Bitburner, adding them all to a list. This is done recursively
by scanning from home, and then scanning each item in the list of servers connected
to home. It then repeats the process until the maximum depth has been achieved.

Current usage: In both basic_hacker.js and manager_launcher.js, to identify potential targets
*/
export class spider {
    constructor(depth, ns) {
        this.depth = depth //the depth at which to scan (for now, arbitrarily high depth captures all available servers)
    }
    scanarray(y, ns) { //scans the list of servers connected to home (variable y as the initial list)
        var list = []
        for (let i = 0; i < y.length; i++) {
            var x = ns.scan(y[i])
            list = list.concat(x)
        }
        for (let i = 0; i < list.length; i++) { //eliminates non-hackable servers, null lists
            if (list[i] == "home") {
                list.splice(i, 1)
                i--
            }
            else if (list[i] == "darkweb") {
                list.splice(i, 1)
                i--
            }
        }
        return list //returns the trimmed list
    }
    make_list(ns) { //function which returns a list of all servers down to a given depth
        var init_list = ns.scan("home")
        var cur_list = ns.scan("home")
        for (let i = 0; i < this.depth; i++) { //scanning deeper and deeper recursively
            init_list = this.scanarray(init_list, ns)
            for (let j = 0; j < init_list.length; j++) {//eliminating duplicates, home and darkweb servers
                if (init_list[j] == "home") {
                    init_list.splice(j, 1)
                    j--
                }
                else if (init_list[j] == "darkweb") {
                    init_list.splice(j, 1)
                    j--
                }
                else if (cur_list.includes(init_list[j])) {
                    init_list.splice(j, 1)
                    j--
                }
            }
            cur_list = cur_list.concat(init_list)//stick the now trimmed list on the end of cur_list
        }
        return cur_list //returns the completed list
    }
    recursive_killall(ns) { //kills all processes on all servers, up to the depth specified.
        var x = this.make_list(ns)
        for (let i = 0; i < x.length; i++) {
            ns.killall(x[i])
        }
    }
}