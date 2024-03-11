/** @param {NS} ns */
/*
Launches manager scripts to hack specific targets, with threads defined by how much to weaken, how much to grow, and how much money to make.
Requires Formulas API, and A LOT of ram on your purchased servers
*/
import { spider } from "class_spider.js"
export function main(ns) {
    const x = new spider(100, ns)
    var server_list = x.make_list(ns) //make list of all the servers
    for (let i = 0; i < server_list.length; i++) { //loops over list, attempts to run manager.js targeted at server i in server_list
        if (ns.getServer(server_list[i]).purchasedByPlayer) {
            continue
        }
        if (ns.getServerMaxRam("home") - ns.getServerUsedRam("home") >= ns.getScriptRam("manager.js")) {
            ns.run("manager.js", 1, server_list[i])
        }
    }
}