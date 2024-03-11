/** @param {NS} ns */
/*
Most basic automated hacking script. This does not depend on the Formulas API. 
*/
import { spider } from "class_spider.js"
import { launcher } from "class_launcher.js"
export function main(ns) {
    const x = new spider(100, ns)//new spider object, depth 100 to capture all possible servers
    var server_list = x.make_list(ns) //make the list of all servers
    const y = []
    for (let i = 0; i < server_list.length; i++) { //for every server in the list, create a launcher object and attempt to hack the server with ns.args[0] amt of ram
        y[i] = new launcher(ns, server_list[i], ns.args[0])
        y[i].send_in_the_hackers(ns, server_list)
    }

}