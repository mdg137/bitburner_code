/** @param {NS} ns */
/*
Simple script for auto-buying purchased servers. Buys up to the maximum number of servers with 4GB each first. Then buys upgrades for them. Halts when all servers are maximum size
*/
export async function main(ns) {
    while (ns.getPurchasedServers().length < 25) { //loop buys servers at 4GB ram each until you have 25 of them
        if (ns.getPurchasedServerCost(4) > ns.getPlayer().money) {
            continue
        }
        ns.purchaseServer("test", 4)
        await ns.sleep(100)
    }
    var list = ns.getPurchasedServers()
    while (true) { //upgrades purchased servers until all of them are at max ram
        var j = 0 //keeps track of the number of fully upgraded servers
        for (let i = 0; i < list.length; i++) {
            if (ns.getServerMaxRam(list[i]) == ns.getPurchasedServerMaxRam()) { //if server has max ram, increment j and continue
                j++
                continue
            }
            else if (ns.getPurchasedServerUpgradeCost(list[i], 2 * (ns.getServerMaxRam(list[i]))) > ns.getPlayer().money) { //if I can't afford the upgrade to double the ram, continue
                continue
            }
            else { //if both previous conditions are false, then I can upgrade the ram of the server and I can afford it, so upgrade the server
                ns.upgradePurchasedServer(list[i], 2 * (ns.getServerMaxRam(list[i])))
            }
        }
        if (j == list.length) { //if all servers are at max ram, break
            break
        }
        await ns.sleep(100)
    }
}