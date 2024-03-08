import {spider} from class_spider
export function main(ns) {    
    const x = new spider(100)
    var server_list = x.make_list()
    ns.print(server_list)
    for (let i = 0; i < server_list.length; i++) {
        if (ns.getServer(server_list[i]).purchasedByPlayer) {
            continue
        }
        if (ns.getServerMaxRam("home") - ns.getServerUsedRam("home") >= ns.getScriptRam("manager.js")) {
            ns.run("manager.js", 1, server_list[i])
        }
    }
}